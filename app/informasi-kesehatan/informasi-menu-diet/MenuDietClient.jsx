"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

export default function MenuDietClient({ initialData = null }) {
  const router = useRouter();

  // Dulu halaman aktif dibaca lewat useSearchParams(). Hook itu memaksa Suspense
  // bailout saat render statis, jadi HTML yang sampai ke HP cuma skeleton —
  // konten baru muncul setelah JS jalan. Sekarang page disimpan sebagai state
  // biasa dan URL cukup disinkronkan satu arah, sehingga halaman ini benar-benar
  // ter-render di server.
  const [page, setPage] = useState(1);

  const syncUrl = (nextPage) => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    params.set("page", String(nextPage));
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  // Hormati ?page= kalau user membuka/berbagi tautan langsung.
  useEffect(() => {
    const fromUrl = Number.parseInt(
      new URLSearchParams(window.location.search).get("page") || "1",
      10
    );
    if (fromUrl > 1) setPage(fromUrl);
  }, []);

  const [loading, setLoading] = useState(!initialData);
  const [error, setError] = useState("");
  const [items, setItems] = useState(initialData?.items ?? []);
  const [meta, setMeta] = useState(initialData?.meta ?? { total: 0, perPage: 12, totalPages: 1 });

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(""); // legacy (tidak dipakai)
  const [menuTypeCode, setMenuTypeCode] = useState("");
  const [menuCatCode, setMenuCatCode] = useState("");
  const [basicIngredientCode, setBasicIngredientCode] = useState("");

  const [menuTypes, setMenuTypes] = useState(initialData?.menuTypes ?? []);
  const [menuCategories, setMenuCategories] = useState(initialData?.menuCategories ?? []);
  const [basicIngredients, setBasicIngredients] = useState(initialData?.basicIngredients ?? []);

  // Server sudah mengirim daftar awal + semua opsi filter.
  const skipInitialFetch = useRef(Boolean(initialData));

  useEffect(() => {
    if (initialData) return;

    let cancelled = false;
    async function run() {
      try {
        // Proxy via Next API routes supaya request dari browser konsisten ke /api
        const [tRes, cRes, bRes] = await Promise.all([
          fetch("/api/menu-types/public/all", { cache: "no-store" }),
          fetch("/api/menu-categories/public/all", { cache: "no-store" }),
          fetch("/api/basic-ingredients/public/all", { cache: "no-store" }),
        ]);

        const [tJson, cJson, bJson] = await Promise.all([tRes.json().catch(() => null), cRes.json().catch(() => null), bRes.json().catch(() => null)]);

        if (cancelled) return;
        setMenuTypes(Array.isArray(tJson?.data) ? tJson.data : Array.isArray(tJson) ? tJson : []);
        setMenuCategories(Array.isArray(cJson?.data) ? cJson.data : Array.isArray(cJson) ? cJson : []);
        setBasicIngredients(Array.isArray(bJson?.data) ? bJson.data : Array.isArray(bJson) ? bJson : []);
      } catch {
        if (!cancelled) {
          setMenuTypes([]);
          setMenuCategories([]);
          setBasicIngredients([]);
        }
      }
    }
    run();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (skipInitialFetch.current) {
      skipInitialFetch.current = false;
      return;
    }

    let cancelled = false;
    async function run() {
      try {
        setLoading(true);
        setError("");

        const qs = new URLSearchParams();
        qs.set("page", String(page));
        qs.set("perPage", String(meta.perPage));
        if (search) qs.set("search", search);
        if (menuTypeCode) qs.set("menu_type_code", menuTypeCode);
        if (menuCatCode) qs.set("menu_cat_code", menuCatCode);
        if (basicIngredientCode) qs.set("basic_ingredient_code", basicIngredientCode);
        qs.set("_", String(Date.now()));

        const res = await fetch(`/api/menu-nutritions/public?${qs.toString()}`, { cache: "no-store" });
        const j = await res.json().catch(() => null);
        if (!res.ok) throw new Error(j?.error || "Gagal memuat menu diet");

        if (cancelled) return;
        const arr = Array.isArray(j?.data) ? j.data : Array.isArray(j) ? j : [];
        setItems(arr);
        setMeta({
          total: Number(j?.total || 0),
          perPage: Number(j?.perPage || 10),
          totalPages: Number(j?.totalPages || 1),
        });
      } catch (e) {
        if (!cancelled) {
          setError(e?.message || "Terjadi kesalahan");
          setItems([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    run();
    return () => {
      cancelled = true;
    };
  }, [page, meta.perPage, search, menuTypeCode, menuCatCode, basicIngredientCode]);

  // reset ke page 1 saat filter berubah
  useEffect(() => {
    setPage(1);
    syncUrl(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, menuTypeCode, menuCatCode, basicIngredientCode]);

  const normalizeOptions = (arr) => {
    const raw = Array.isArray(arr) ? arr : [];
    return raw
      .map((it) => ({
        code: String(it?.code || it?.Code || it?.menu_type_code || it?.menu_cat_code || it?.basic_ingredient_code || it?.id || it?._id || "").trim(),
        name: String(it?.name || it?.menu_name || it?.title || it?.label || "").trim(),
      }))
      .filter((x) => x.code && x.name);
  };

  const typeOptions = useMemo(() => normalizeOptions(menuTypes), [menuTypes]);
  const categoryOptions = useMemo(() => normalizeOptions(menuCategories), [menuCategories]);
  const ingredientOptions = useMemo(() => normalizeOptions(basicIngredients), [basicIngredients]);

  const totalPages = Math.max(1, Number(meta.totalPages) || 1);
  const safePage = clamp(page, 1, totalPages);

  const paginationNumbers = useMemo(() => {
    const maxButtons = 5;
    if (totalPages <= maxButtons) {
      return Array.from({ length: totalPages }).map((_, i) => i + 1);
    }
    const start = clamp(safePage - 2, 1, totalPages - (maxButtons - 1));
    return Array.from({ length: maxButtons }).map((_, i) => start + i);
  }, [safePage, totalPages]);

  const goToPage = (p) => {
    const next = clamp(p, 1, totalPages);
    setPage(next);
    syncUrl(next);
  };

  const getMenuImageSrc = (menu) => {
    const first = Array.isArray(menu?.images) ? menu.images[0] : null;
    const path = first?.file_path;
    if (!path) return "/images/dummy-nutrion.png";
    if (typeof path !== "string") return "/images/dummy-nutrion.png";
    if (path.startsWith("http://") || path.startsWith("https://")) return path;
    // file_path dari API umumnya berbentuk "/uploads/xxx.jpg"
    return new URL(path, "https://cm-api.rawat.id").toString();
  };

  const formatNumberLike = (value) => {
    if (value === null || value === undefined) return "-";
    const s = String(value).trim();
    if (!s) return "-";
    // Hapus trailing 0 di bagian desimal: "214.0000" -> "214", "90.50" -> "90.5"
    if (s.includes(".")) {
      const out = s
        .replace(/(\.\d*?[1-9])0+$/g, "$1")
        .replace(/\.0+$/g, "")
        .replace(/\.$/g, "");
      return out || "-";
    }
    return s;
  };

  return (
    <div className="py-10">
      <div className="text-center">
        <h1 className="text-xl md:text-2xl font-semibold text-green">Temukan Referensi Menu Diet</h1>
        <p className="mt-2 text-sm md:text-base text-gray-500">Cari berdasarkan nama atau filter berdasarkan kategori, jenis makanan dan bahan baku</p>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-12 gap-3">
        <div className="md:col-span-5">
          <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2">
            <span className="text-green text-sm">⌕</span>
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Cari menu..." className="w-full bg-transparent outline-none text-sm" />
          </div>
        </div>
        <div className="md:col-span-2">
          <select value={menuTypeCode} onChange={(e) => setMenuTypeCode(e.target.value)} className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700">
            <option value="">Pilih Jenis Makanan</option>
            {typeOptions.map((t) => (
              <option key={t.code} value={t.code}>
                {t.name}
              </option>
            ))}
          </select>
        </div>
        <div className="md:col-span-2">
          <select value={menuCatCode} onChange={(e) => setMenuCatCode(e.target.value)} className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700">
            <option value="">Pilih Kategori</option>
            {categoryOptions.map((c) => (
              <option key={c.code} value={c.code}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div className="md:col-span-3">
          <select value={basicIngredientCode} onChange={(e) => setBasicIngredientCode(e.target.value)} className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700">
            <option value="">Pilih Bahan Baku</option>
            {ingredientOptions.map((t) => (
              <option key={t.code} value={t.code}>
                {t.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {error ? <div className="mt-6 text-sm text-red-600">{error}</div> : null}

      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {(loading ? Array.from({ length: 8 }) : items).map((it, idx) => {
          if (loading) return <div key={idx} className="rounded-xl border border-gray-200 bg-gray-50 aspect-[4/5]" />;
          const slug = it?.slug;
          const name = it?.menu_name || "-";
          const kcal = formatNumberLike(it?.calorie);
          const imgSrc = getMenuImageSrc(it);
          return (
            <Link key={slug || idx} href={slug ? `/informasi-kesehatan/informasi-menu-diet/${slug}` : "#"} className="group rounded-xl border border-gray-200 bg-white overflow-hidden hover:shadow-sm transition-shadow">
              <div className="relative bg-gray-100 aspect-square">
                <Image src={imgSrc} alt={name} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover" />
              </div>
              <div className="p-3 text-center">
                <div className="font-semibold text-gray-900 truncate">{name}</div>
                <div className="mt-1 text-xs text-gray-500">{kcal} kkal</div>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="mt-8 space-y-4">
        <div className="text-center text-sm text-gray-500">
          {meta.total
            ? `${(safePage - 1) * meta.perPage + 1}-${Math.min(safePage * meta.perPage, meta.total)} dari ${meta.total}`
            : "0 data"}
        </div>
        <Pagination>
          <PaginationContent className="flex-wrap justify-center gap-1">
            <PaginationItem>
              <PaginationPrevious
                href="#"
                aria-disabled={safePage <= 1}
                className={safePage <= 1 ? "pointer-events-none opacity-40" : undefined}
                onClick={(e) => {
                  e.preventDefault();
                  if (safePage > 1) goToPage(safePage - 1);
                }}
              />
            </PaginationItem>

            {paginationNumbers.map((n) => (
              <PaginationItem key={n}>
                <PaginationLink
                  href="#"
                  isActive={n === safePage}
                  onClick={(e) => {
                    e.preventDefault();
                    goToPage(n);
                  }}
                >
                  {n}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                href="#"
                aria-disabled={safePage >= totalPages}
                className={safePage >= totalPages ? "pointer-events-none opacity-40" : undefined}
                onClick={(e) => {
                  e.preventDefault();
                  if (safePage < totalPages) goToPage(safePage + 1);
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
