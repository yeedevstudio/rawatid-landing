"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Pill, ChevronRight } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";
import { startRouteLoading } from "@/common/utils/routeLoading";

const PREVIEW_LIMIT = 12;

function toSlug(text) {
  return String(text || "")
    .trim()
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

function normalizeDrugIngredientResponse(json, limit = PREVIEW_LIMIT) {
  const raw = Array.isArray(json) ? json : json?.data ?? [];
  const rows = Array.isArray(raw) ? raw : [];
  return rows.slice(0, limit).map((row, idx) => {
    const name = row?.name ?? row?.ingredientName ?? row?.ingredient_name ?? row?.title ?? "";
    const id = row?.id ?? row?._id ?? `${name}-${idx}`;
    const apiSlug = row?.slug ?? row?.Slug ?? null;
    const ing_code =
      row?.ing_code ??
      row?.ingCode ??
      row?.ingredient_code ??
      row?.ingredientCode ??
      row?.code ??
      row?.Code ??
      null;

    return {
      id: String(id),
      name: String(name),
      slug: String(apiSlug || toSlug(name) || id),
      ing_code: ing_code ? String(ing_code) : "",
    };
  });
}

/** Section ringkasan Informasi Obat di /blog — data dari API yang sama dengan /informasi-kesehatan/informasi-obat */
export default function BlogInformasiObatPreview() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const params = new URLSearchParams({
          page: "1",
          perPage: String(PREVIEW_LIMIT),
          search: "",
          navigasi: "",
        });
        const res = await fetch(`/api/drug-ingredients/public?${params}`, { cache: "no-store" });
        const json = await res.json();
        if (cancelled) return;
        if (!res.ok) {
          setItems([]);
          return;
        }
        setItems(normalizeDrugIngredientResponse(json));
      } catch {
        if (!cancelled) setItems([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const cardClass =
    "block rounded-xl bg-white transition-shadow hover:brightness-[1.01] outline-none focus-visible:ring-2 focus-visible:ring-green/35 focus-visible:ring-offset-2 shadow-[0px_0px_12.1px_0px_#0000001A]";

  if (!loading && items.length === 0) return null;

  return (
    <section className="my-[3rem] md:my-[6rem]" aria-labelledby="blog-informasi-obat-heading">
      <div className="flex items-center justify-between gap-4 mb-6 md:mb-8">
        <h2 id="blog-informasi-obat-heading" className="text-lg md:text-lg lg:text-xl text-green font-medium">
          Informasi Obat
        </h2>
        <Link
          href="/informasi-kesehatan/informasi-obat"
          className="text-sm md:text-lg lg:text-xl text-green font-medium underline shrink-0"
          onClick={() => startRouteLoading()}
        >
          Lihat Selengkapnya
        </Link>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {Array.from({ length: PREVIEW_LIMIT }).map((_, i) => (
            <Skeleton key={i} className="h-[92px] w-full rounded-xl" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {items.map((o) => {
            const href = `/informasi-kesehatan/informasi-obat/${o.slug}${o.ing_code ? `?ing_code=${encodeURIComponent(o.ing_code)}` : ""}`;
            return (
              <Link
                key={o.id}
                href={href}
                className={cardClass}
                onClick={() => startRouteLoading()}
              >
                <div className="p-4 flex gap-3">
                  <div className="w-11 h-11 shrink-0 rounded-lg bg-[#EBF6F9] flex items-center justify-center">
                    <Pill className="w-5 h-5 text-green" aria-hidden />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold text-gray-900 truncate">{o.name}</div>
                    <span className="inline-flex items-center gap-1 text-green font-semibold text-sm mt-1">
                      Lihat Detail <ChevronRight className="w-4 h-4 shrink-0" aria-hidden />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
}
