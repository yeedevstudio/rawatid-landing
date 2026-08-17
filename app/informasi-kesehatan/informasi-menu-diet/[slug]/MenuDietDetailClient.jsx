"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  IconBrandFacebook,
  IconBrandLinkedin,
  IconBrandWhatsapp,
  IconBrandX,
  IconCheck,
  IconCircleDot,
  IconLink,
  IconToolsKitchen2,
  IconWorld,
} from "@tabler/icons-react";
import Link from "next/link";
import Breadcrumbs from "@/common/components/Breadcrumbs";
import { Skeleton } from "@/components/ui/skeleton";

function toNumber(v) {
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

function fmtGram(v) {
  const n = toNumber(v);
  return n == null ? "-" : `${n}g`;
}

function fmtMg(v) {
  const n = toNumber(v);
  return n == null ? "-" : `${n}mg`;
}

function fmtPlain(v) {
  const n = toNumber(v);
  return n == null ? "-" : `${n}`;
}

function normalizeDetail(json) {
  return json?.data || json;
}

function splitToList(value) {
  if (!value) return [];
  if (typeof value === "number" || typeof value === "boolean") return [];
  if (Array.isArray(value)) return value.map((x) => String(x)).filter(Boolean);
  const s = String(value);
  return s
    .split(/\r?\n+/)
    .map((x) => x.trim())
    .filter(Boolean)
    .map((x) => x.replace(/^[-•*]\s*/, ""));
}

export default function MenuDietDetailClient({ slug, initialData = null }) {
  const [loading, setLoading] = useState(!initialData);
  const [error, setError] = useState("");
  const [data, setData] = useState(initialData?.detail ?? null);
  const [copied, setCopied] = useState(false);
  const [otherMenus, setOtherMenus] = useState(initialData?.otherMenus ?? []);

  // Server sudah mengirim detail + menu lainnya.
  const skipInitialFetch = useRef(Boolean(initialData));
  const [activeImage, setActiveImage] = useState(0);

  const getMenuImageSrc = (menu, index = 0) => {
    const imgs = Array.isArray(menu?.images) ? menu.images : [];
    const item = imgs[index] || imgs[0] || null;
    const path = item?.file_path;
    if (!path) return "/images/dummy-nutrion.webp";
    if (typeof path !== "string") return "/images/dummy-nutrion.webp";
    if (path.startsWith("http://") || path.startsWith("https://")) return path;
    return new URL(path, "https://cm-api.rawat.id").toString();
  };

  const formatNumberLike = (value) => {
    if (value === null || value === undefined) return "-";
    const s = String(value).trim();
    if (!s) return "-";
    if (s.includes(".")) {
      const out = s
        .replace(/(\.\d*?[1-9])0+$/g, "$1")
        .replace(/\.0+$/g, "")
        .replace(/\.$/g, "");
      return out || "-";
    }
    return s;
  };

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
        const res = await fetch(`/api/menu-nutritions/public/slug/${encodeURIComponent(slug)}?_=${Date.now()}`, { cache: "no-store" });
        const j = await res.json().catch(() => null);
        if (!res.ok) throw new Error(j?.error || "Gagal memuat detail menu");
        if (cancelled) return;
        setData(normalizeDetail(j));
        setActiveImage(0);
      } catch (e) {
        if (!cancelled) setError(e?.message || "Terjadi kesalahan");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    run();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  useEffect(() => {
    if (initialData) return;

    let cancelled = false;
    async function run() {
      try {
        const res = await fetch(`/api/menu-nutritions/public?page=1&perPage=12&_=${Date.now()}`, { cache: "no-store" });
        const j = await res.json().catch(() => null);
        if (!res.ok) return;
        const arr = Array.isArray(j?.data) ? j.data : [];
        const filtered = arr.filter((m) => m?.slug && m.slug !== slug).slice(0, 6);
        if (!cancelled) setOtherMenus(filtered);
      } catch {
        // ignore
      }
    }
    run();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="pt-2">
          <Skeleton className="h-4 w-80 max-w-full" />
        </div>

        <section className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          <div className="md:col-span-6">
            <Skeleton className="w-full rounded-2xl aspect-[4/3]" />
            <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-16 w-16 shrink-0 rounded-lg" />
              ))}
            </div>
          </div>

          <div className="md:col-span-6">
            <Skeleton className="h-9 w-3/4" />
            <div className="mt-4 flex flex-wrap gap-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-8 w-24 rounded-xl" />
              ))}
            </div>

            <div className="mt-4 flex items-end gap-3">
              <Skeleton className="h-14 w-28" />
              <Skeleton className="h-6 w-28" />
            </div>

            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className="flex items-center gap-4">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-5 w-40" />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 space-y-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Skeleton className="h-8 w-8 rounded-lg" />
                  <Skeleton className="h-5 w-full" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {Array.from({ length: 2 }).map((_, i) => (
          <section
            key={i}
            className="rounded-2xl bg-white p-5 md:p-6 shadow-[0_0_12.1px_rgba(0,0,0,0.1)]"
          >
            <Skeleton className="h-6 w-48" />
            <div className="mt-4 space-y-3">
              {Array.from({ length: 6 }).map((__, j) => (
                <Skeleton key={j} className="h-5 w-full" />
              ))}
            </div>
          </section>
        ))}
      </div>
    );
  }
  if (error) return <div className="text-sm text-red-600">{error}</div>;
  if (!data) return <div className="text-sm text-gray-500">Data tidak ditemukan.</div>;

  const title = data?.menu_name || slug;
  const kcal = toNumber(data?.calorie);
  const portion = toNumber(data?.portion);
  const images = Array.isArray(data?.images) ? data.images : [];
  const heroImg = getMenuImageSrc(data, activeImage);

  const jenisMakanan = String(data?.menu_type?.name || data?.menu_type || "-");
  const kategori = String(data?.menu_category?.name || data?.menu_category || "-");

  // Chip & checklist harus berasal dari data API (tidak statis).
  const chips = [data?.menu_type?.name || data?.menu_type, data?.menu_category?.name || data?.menu_category, data?.basic_ingredient?.name || data?.basic_ingredient]
    .map((x) => String(x || "").trim())
    .filter(Boolean)
    .map((label, i) => ({
      label,
      cls: ["bg-[#EAF6FF] text-[#1E7AB7]", "bg-[#FFECEC] text-[#B42318]", "bg-[#FFF1DB] text-[#B76A00]"][i % 3],
    }));

  const checklist = splitToList(data?.highlights || data?.recommendations || data?.menu_guideline_text || data?.menu_guideline);

  const ingredients = splitToList(data?.ingredients || data?.menu_ingredients_list || data?.menu_ingredients || data?.menuIngredients);
  const steps = splitToList(data?.guideline || data?.menu_guideline_list || data?.menu_guideline || data?.menuGuideline || data?.how_to_make);

  const shareUrl = typeof window !== "undefined" ? window.location?.href || "" : "";
  const shareTitle = `Baca informasi menu diet: ${data?.menu_name || slug || "Rawat.ID"}`;

  const openShare = (url) => {
    if (!url) return;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleCopyLink = async () => {
    try {
      if (!shareUrl) return;
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } catch {
      // ignore
    }
  };

  return (
    <div className="space-y-6">
      <div className="pt-2">
        <Breadcrumbs
          items={[
            { label: "Beranda", href: "/" },
            { label: "Informasi Kesehatan", href: "/informasi-kesehatan/informasi-obat" },
            { label: "Informasi Menu Diet", href: "/informasi-kesehatan/informasi-menu-diet" },
            { label: title, href: `/informasi-kesehatan/informasi-menu-diet/${slug}` },
          ]}
        />
      </div>
      <section className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        <div className="md:col-span-6">
          <div className="relative w-full overflow-hidden rounded-2xl aspect-[4/3] bg-gray-100">
            <Image src={heroImg} alt={title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
          </div>
          {images.length > 1 ? (
            <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
              {images.map((img, idx) => {
                const src = getMenuImageSrc(data, idx);
                const isActive = idx === activeImage;
                return (
                  <button
                    key={img?.id ?? idx}
                    type="button"
                    onClick={() => setActiveImage(idx)}
                    className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border ${isActive ? "border-green" : "border-gray-200"} bg-gray-100`}
                    aria-label={`Gambar ${idx + 1}`}
                  >
                    <Image src={src} alt={`${title} ${idx + 1}`} fill className="object-cover" sizes="64px" />
                  </button>
                );
              })}
            </div>
          ) : null}
        </div>

        <div className="md:col-span-6">
          <h1 className="text-2xl md:text-3xl font-semibold text-green leading-[1.1]">{title}</h1>

          {chips?.length ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {chips.map((c) => (
                <span key={c.label} className={`rounded-xl px-3 py-1.5 text-xs font-medium ${c.cls}`}>
                  {c.label}
                </span>
              ))}
            </div>
          ) : (
            <div className="mt-4 text-sm text-gray-400">-</div>
          )}

          <div className="mt-4 flex items-end gap-2 text-gray-900">
            <div className="text-4xl md:text-5xl font-semibold leading-none">{kcal ?? formatNumberLike(data?.calorie)}</div>
            <div className="pb-1 text-lg md:text-xl text-gray-700">kkal/porsi</div>
          </div>

          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-green/10 flex items-center justify-center text-green">
                <IconWorld className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm text-gray-400">Jenis Makanan</div>
                <div className="text-base font-semibold text-green">{jenisMakanan}</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-green/10 flex items-center justify-center text-green">
                <IconToolsKitchen2 className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm text-gray-400">Kategori</div>
                <div className="text-base font-semibold text-green">{kategori}</div>
              </div>
            </div>
          </div>

          {checklist.length ? (
            <div className="mt-5 space-y-3">
              {checklist.map((t) => (
                <div key={t} className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-[#BBE0DE] flex items-center justify-center text-[#038F7A]">
                    <IconCheck className="w-5 h-5" stroke={3} />
                  </span>
                  <div className="text-sm md:text-base text-gray-800">{t}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-5 text-sm text-gray-400">-</div>
          )}
        </div>
      </section>

      <section className="rounded-2xl bg-white p-5 md:p-6 shadow-[0_0_12.1px_rgba(0,0,0,0.1)]">
        <h2 className="text-base md:text-lg font-semibold text-green">Informasi Nutrisi</h2>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-10 text-sm md:text-base">
          {[
            // Makro
            ["Kalori", `${formatNumberLike(data?.calorie)} kkal`],
            ["Porsi", portion == null ? "-" : `${portion}g`],
            ["Karbohidrat", fmtGram(data?.total_carbohydrates)],
            ["Protein", fmtGram(data?.protein)],
            ["Total Lemak", fmtGram(data?.total_fat)],
            ["Lemak Jenuh", fmtGram(data?.saturated_fat)],
            ["Lemak Trans", fmtGram(data?.trans_fat)],
            ["Total Gula", fmtGram(data?.total_sugar)],
            ["Serat", fmtGram(data?.total_fiber)],

            // Mineral & lain-lain
            ["Kolesterol", fmtMg(data?.cholesterol)],
            ["Sodium", fmtMg(data?.sodium)],
            ["Kalsium", fmtMg(data?.calcium)],
            ["Zat Besi", fmtMg(data?.iron)],
            ["Kalium", fmtMg(data?.potassium)],

            // Vitamin
            ["Vitamin A", fmtMg(data?.vit_a)],
            ["Vitamin C", fmtMg(data?.vit_c)],
            ["Vitamin B1", fmtMg(data?.vit_b1)],
            ["Vitamin B2", fmtMg(data?.vit_b2)],
            ["Vitamin B3", fmtMg(data?.vit_b3)],
            ["Vitamin B5", fmtMg(data?.vit_b5)],
            ["Vitamin B6", fmtMg(data?.vit_b6)],
            ["Vitamin B7", fmtMg(data?.vit_b7)],
            ["Vitamin B9", fmtMg(data?.vit_b9)],
            ["Vitamin B12", fmtMg(data?.vit_b12)],
            ["Vitamin D", fmtMg(data?.vit_d)],
            ["Vitamin E", fmtMg(data?.vit_e)],
            ["Vitamin K", fmtMg(data?.vit_k)],
          ]
            .filter(([_, v]) => v !== "-" && v !== "- kkal" && v !== "-g" && v !== "-mg")
            .map(([k, v]) => (
            <div key={k} className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-lg bg-[#BBE0DE] flex items-center justify-center text-[#038F7A] shrink-0">
                <IconCheck className="w-5 h-5" stroke={3} />
              </span>
              <div className="text-gray-700">
                {k} <span className="text-gray-700">{v}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl bg-white p-5 md:p-6 shadow-[0_0_12.1px_rgba(0,0,0,0.1)]">
        <h2 className="text-base md:text-lg font-semibold text-green">Bahan-bahan (1 Porsi)</h2>
        {ingredients.length ? (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-700">
            {ingredients.map((it, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <IconCircleDot className="h-4 w-4 text-green mt-0.5" />
                <div className="leading-relaxed">{it}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-4 text-sm text-gray-400">-</div>
        )}
      </section>

      <section className="rounded-2xl bg-white p-5 md:p-6 shadow-[0_0_12.1px_rgba(0,0,0,0.1)]">
        <h2 className="text-base md:text-lg font-semibold text-green">Cara Membuat</h2>
        {steps.length ? (
          <div className="mt-4 space-y-4">
            {steps.map((it, idx) => (
              <div key={idx} className="flex gap-4">
                <div className="w-10 text-center text-green font-semibold text-lg leading-none">{String(idx + 1).padStart(2, "0")}</div>
                <div className="text-sm md:text-base text-gray-700 leading-relaxed">{it}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-4 text-sm text-gray-400">-</div>
        )}
      </section>

      {/* SHARE */}
      <section className="pt-2">
        <div className="text-sm font-semibold text-green">Bagikan artikel</div>
        <div className="mt-4 flex items-center gap-4">
          <button
            type="button"
            className="text-green hover:opacity-80 transition-opacity"
            aria-label="Bagikan ke WhatsApp"
            onClick={() => openShare(`https://wa.me/?text=${encodeURIComponent(shareUrl || "")}`)}
          >
            <IconBrandWhatsapp className="h-8 w-8" />
          </button>
          <button
            type="button"
            className="text-green hover:opacity-80 transition-opacity"
            aria-label="Bagikan ke X"
            onClick={() => openShare(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(shareUrl || "")}`)}
          >
            <IconBrandX className="h-8 w-8" />
          </button>
          <button
            type="button"
            className="text-green hover:opacity-80 transition-opacity"
            aria-label="Bagikan ke Facebook"
            onClick={() => openShare(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl || "")}`)}
          >
            <IconBrandFacebook className="h-8 w-8" />
          </button>
          <button
            type="button"
            className="text-green hover:opacity-80 transition-opacity"
            aria-label="Bagikan ke LinkedIn"
            onClick={() => openShare(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl || "")}`)}
          >
            <IconBrandLinkedin className="h-8 w-8" />
          </button>

          <button
            type="button"
            className="ml-1 inline-flex items-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-500 hover:bg-gray-50 transition-colors"
            aria-label="Salin tautan"
            onClick={handleCopyLink}
          >
            <IconLink className="h-4 w-4" />
            <span>{copied ? "Tersalin" : "Salin"}</span>
          </button>
        </div>
      </section>

      {/* MENU LAINNYA */}
      {otherMenus?.length ? (
        <section className="pt-4">
          <h2 className="text-base md:text-lg font-semibold text-green">Menu Lainnya</h2>
          <div className="mt-4 overflow-x-auto">
            <div className="flex gap-4 min-w-max pb-2">
              {otherMenus.map((m) => (
                <Link
                  key={m.slug}
                  href={`/informasi-kesehatan/informasi-menu-diet/${m.slug}`}
                  className="w-[150px] rounded-xl border border-gray-200 bg-white overflow-hidden shadow-sm hover:shadow transition-shadow"
                >
                  <div className="relative h-[90px] bg-gray-100">
                    <Image src={getMenuImageSrc(m, 0)} alt={m?.menu_name || m.slug} fill className="object-cover" sizes="150px" />
                  </div>
                  <div className="p-2 text-center">
                    <div className="text-sm font-semibold text-gray-900 truncate">{m?.menu_name || "-"}</div>
                    <div className="mt-0.5 text-xs text-gray-500">{formatNumberLike(m?.calorie)} kkal</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
}
