"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

export default function MenuDietClient() {
  const router = useRouter();
  const sp = useSearchParams();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [items, setItems] = useState([]);
  const [meta, setMeta] = useState({ total: 0, perPage: 12, totalPages: 1 });

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [menuType, setMenuType] = useState("");
  const [basicIngredient, setBasicIngredient] = useState("");
  const page = Math.max(1, Number.parseInt(sp.get("page") || "1", 10) || 1);

  useEffect(() => {
    let cancelled = false;
    async function run() {
      try {
        setLoading(true);
        setError("");

        const qs = new URLSearchParams();
        qs.set("page", String(page));
        qs.set("perPage", String(meta.perPage));
        if (search) qs.set("search", search);
        if (category) qs.set("category", category);
        if (menuType) qs.set("menu_type", menuType);
        if (basicIngredient) qs.set("basic_ingredient", basicIngredient);
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
  }, [page, meta.perPage, search, category, menuType, basicIngredient]);

  // reset ke page 1 saat filter berubah
  useEffect(() => {
    const params = new URLSearchParams(sp.toString());
    params.set("page", "1");
    router.replace(`?${params.toString()}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, category, menuType, basicIngredient]);

  const categories = useMemo(() => {
    const set = new Set();
    items.forEach((it) => {
      const name = it?.menu_category?.name || it?.menu_category || "";
      if (name) set.add(String(name));
    });
    return Array.from(set).sort();
  }, [items]);

  const types = useMemo(() => {
    const set = new Set();
    items.forEach((it) => {
      const name = it?.menu_type?.name || it?.menu_type || "";
      if (name) set.add(String(name));
    });
    return Array.from(set).sort();
  }, [items]);

  const ingredients = useMemo(() => {
    const set = new Set();
    items.forEach((it) => {
      const name = it?.basic_ingredient?.name || it?.basic_ingredient || "";
      if (name) set.add(String(name));
    });
    return Array.from(set).sort();
  }, [items]);

  const pages = useMemo(() => {
    const total = Math.max(1, meta.totalPages || 1);
    return Array.from({ length: total }, (_, i) => i + 1);
  }, [meta.totalPages]);

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
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700">
            <option value="">Pilih Kategori</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div className="md:col-span-2">
          <select value={menuType} onChange={(e) => setMenuType(e.target.value)} className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700">
            <option value="">Pilih Jenis Makanan</option>
            {types.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
        <div className="md:col-span-3">
          <select value={basicIngredient} onChange={(e) => setBasicIngredient(e.target.value)} className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700">
            <option value="">Pilih Bahan Baku</option>
            {ingredients.map((t) => (
              <option key={t} value={t}>
                {t}
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
          const kcal = it?.calorie ?? "-";
          return (
            <Link
              key={slug || idx}
              href={slug ? `/informasi-kesehatan/informasi-menu-diet/${slug}` : "#"}
              className="group rounded-xl border border-gray-200 bg-white overflow-hidden hover:shadow-sm transition-shadow"
            >
              <div className="relative bg-gray-100 aspect-square">
                <Image
                  src="/images/dummy-nutrion.png"
                  alt={name}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
              <div className="p-3 text-center">
                <div className="font-semibold text-gray-900 truncate">{name}</div>
                <div className="mt-1 text-xs text-gray-500">{kcal} kkal</div>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="mt-6 flex items-center justify-center gap-3 text-sm text-gray-500">
        <span>{(meta.total ? `${(page - 1) * meta.perPage + 1}-${Math.min(page * meta.perPage, meta.total)}` : "0") + ` of ${meta.total}`}</span>
        <button
          type="button"
          className="px-2"
          disabled={page <= 1}
          onClick={() => {
            const params = new URLSearchParams(sp.toString());
            params.set("page", String(Math.max(1, page - 1)));
            router.push(`?${params.toString()}`);
          }}
        >
          ←
        </button>
        {pages.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => {
              const params = new URLSearchParams(sp.toString());
              params.set("page", String(p));
              router.push(`?${params.toString()}`);
            }}
            className={`w-8 h-8 rounded-md ${p === page ? "bg-gray-100 text-gray-900" : "hover:bg-gray-50"}`}
          >
            {p}
          </button>
        ))}
        <button
          type="button"
          className="px-2"
          disabled={page >= meta.totalPages}
          onClick={() => {
            const params = new URLSearchParams(sp.toString());
            params.set("page", String(Math.min(meta.totalPages, page + 1)));
            router.push(`?${params.toString()}`);
          }}
        >
          →
        </button>
      </div>
    </div>
  );
}

