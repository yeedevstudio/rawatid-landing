"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Search, Pill, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import Breadcrumbs from "@/common/components/Breadcrumbs";
import { CONTAINER_CLASS } from "@/common/constant/containerValue";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { normalizeDrugRows, PAGE_SIZE } from "./normalizeDrugs";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

export default function InformasiObatClient({ category }) {
  const categoryCode = category?.code ?? "";
  const categoryName = category?.name ?? "";
  const categoryDescription = category?.description ?? "";
  // Deskripsi dari BE bisa berupa HTML (seperti description pada obat) atau
  // teks biasa; teks biasa dipecah per baris kosong menjadi paragraf.
  const isDescriptionHtml = /<[a-z][\s\S]*>/i.test(categoryDescription);
  const descriptionParagraphs = isDescriptionHtml
    ? []
    : categoryDescription.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
  const categoryTags = category?.tags ?? [];
  const categoryReferences = category?.references ?? [];
  const categoryReferencesHtml = category?.referencesHtml ?? "";
  const hasReferences = categoryReferences.length > 0 || Boolean(categoryReferencesHtml);
  const containerClass = CONTAINER_CLASS;
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [navigasi, setNavigasi] = useState("");
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const mq = window.matchMedia("(max-width: 639px)");
    setIsMobile(mq.matches);
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Data obat diambil dari browser (terlihat di tab Network), termasuk halaman
  // pertama saat halaman dibuka.
  useEffect(() => {
    const controller = new AbortController();
    async function fetchDrugIngredients() {
      try {
        setIsLoading(true);
        setError("");

        const params = new URLSearchParams();
        params.set("page", String(page));
        params.set("perPage", String(PAGE_SIZE));
        params.set("search", query);
        params.set("navigasi", navigasi);
        // Tanpa kategori (halaman utama) = semua obat.
        if (categoryCode) params.set("drug_category_code", categoryCode);

        const res = await fetch(
          `/api/drug-ingredients/public?${params.toString()}`,
          { signal: controller.signal }
        );
        const json = await res.json();

        if (!res.ok) {
          throw new Error(json?.error || "Gagal memuat data obat");
        }

        const normalized = normalizeDrugRows(json);
        setItems(normalized.items);
        setTotalItems(normalized.totalItems);
        setTotalPages(normalized.totalPages);
      } catch (e) {
        if (e?.name !== "AbortError") {
          setError(e?.message || "Gagal memuat data obat");
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchDrugIngredients();
    return () => {
      controller.abort();
    };
  }, [page, query, navigasi, categoryCode]);

  const safePage = clamp(page, 1, Math.max(1, totalPages));

  const paginationNumbers = useMemo(() => {
    const maxButtons = isMobile ? 3 : 5;
    if (totalPages <= maxButtons) {
      return Array.from({ length: totalPages }).map((_, i) => i + 1);
    }
    const half = Math.floor(maxButtons / 2);
    const start = clamp(safePage - half, 1, totalPages - (maxButtons - 1));
    return Array.from({ length: maxButtons }).map((_, i) => start + i);
  }, [safePage, totalPages, isMobile]);

  return (
    <div className="w-full">
      <div className={`${containerClass} pt-6`}>
        <Breadcrumbs
          items={[
            { label: "Beranda", href: "/" },
            {
              label: "Informasi Kesehatan",
              href: "/informasi-kesehatan/informasi-obat",
            },
            {
              label: "Informasi Obat",
              href: "/informasi-kesehatan/informasi-obat",
            },
            ...(category
              ? [
                  {
                    label: "Kategori Obat",
                    href: "/informasi-kesehatan/informasi-obat/kategori",
                  },
                  {
                    label: categoryName,
                    href: `/informasi-kesehatan/informasi-obat/kategori/${category.slug}`,
                  },
                ]
              : []),
          ]}
        />
      </div>

      <main className={`${containerClass} pb-12 pt-10 md:pt-16`}>
        {!category ? (
          <div className="text-center">
            <h1 className="text-green font-semibold text-lg md:text-xl">Direktori Obat Lengkap: Informasi Manfaat, Dosis &amp; Efek Samping</h1>
            <p className="text-gray-600 text-sm md:text-base mt-1">Cari obat berdasarkan nama untuk menemukan manfaat, aturan pakai, dosis anjuran, kontraindikasi hingga risiko overdosis</p>
          </div>
        ) : (
          <div>
            <h1 className="text-green font-semibold text-lg md:text-xl">{categoryName}</h1>
            {isDescriptionHtml ? (
              <div
                className="text-gray-600 text-sm md:text-base mt-1 leading-relaxed [&_p]:mb-4 [&_p:last-child]:mb-0 [&_ol]:ml-5 [&_ol]:list-decimal [&_ul]:ml-5 [&_ul]:list-disc [&_a]:text-green"
                dangerouslySetInnerHTML={{ __html: categoryDescription }}
              />
            ) : descriptionParagraphs.length ? (
              <div className="text-gray-600 text-sm md:text-base mt-1 leading-relaxed space-y-4">
                {descriptionParagraphs.map((p, idx) => (
                  <p key={idx} className="whitespace-pre-line">{p}</p>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 text-sm md:text-base mt-1">-</p>
            )}
          </div>
        )}

        <div className="mt-6 max-w-2xl mx-auto">
          <div className="flex items-stretch">
            <div className="w-11 flex items-center justify-center rounded-l-md bg-green text-white border border-green">
              <Search className="w-4 h-4" />
            </div>
            <Input
              id="Cari nama obat"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
                setNavigasi("");
              }}
              placeholder="Cari nama obat"
              className="rounded-l-none border-l-0 h-11"
            />
          </div>
        </div>

        {isMounted ? (
          <div className="mt-6">
            <div className="text-gray-800 font-semibold text-sm mb-3">
              Alphabet Filter
            </div>
            <div className="flex flex-wrap gap-2">
              {ALPHABET.map((ch) => {
                const isActive = navigasi === ch;
                return (
                  <button
                    key={ch}
                    type="button"
                    onClick={() => {
                      setPage(1);
                      setNavigasi((prev) => (prev === ch ? "" : ch));
                      setQuery("");
                    }}
                    className={
                      isActive
                        ? "w-9 h-9 rounded-md bg-green text-white border border-green font-semibold text-sm"
                        : "w-9 h-9 rounded-md bg-white text-green border border-green/40 hover:border-green hover:bg-green/5 font-semibold text-sm transition-colors"
                    }
                    aria-pressed={isActive}
                    aria-label={`Filter ${ch}`}
                  >
                    {ch}
                  </button>
                );
              })}
            </div>
            {!category ? (
              <Link
                href="/informasi-kesehatan/informasi-obat/kategori"
                className="group inline-block mt-4 text-sm md:text-base text-gray-500"
              >
                Atau cari Obat berdasarkan{" "}
                <span className="font-bold text-green group-hover:text-greenHover transition-colors">
                  Kategori
                </span>{" "}
                atau{" "}
                <span className="font-bold text-green group-hover:text-greenHover transition-colors">
                  Golongan
                </span>
              </Link>
            ) : null}
          </div>
        ) : null}

        <section className="mt-10">
          <div className="flex items-center justify-between">
            <h2 className="text-gray-800 font-semibold">
              {category ? `Daftar Obat Kategori ${categoryName}` : "Daftar Obat"}
            </h2>
            <div className="text-sm text-gray-500">
              {totalItems
                ? `${(safePage - 1) * PAGE_SIZE + 1}-${Math.min(
                    safePage * PAGE_SIZE,
                    totalItems
                  )} dari ${totalItems}`
                : "0 data"}
            </div>
          </div>

          {isLoading ? (
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-black/5 bg-white shadow-sm"
                >
                  <div className="p-4 flex gap-3">
                    <Skeleton className="w-10 h-10 rounded-lg" />
                    <div className="min-w-0 flex-1">
                      <Skeleton className="h-5 w-4/5" />
                      <Skeleton className="h-4 w-24 mt-2" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="mt-6 text-sm text-red-600">{error}</div>
          ) : !items.length ? (
            <div className="mt-6 text-sm text-gray-500">
              {category ? "Belum ada obat pada kategori ini." : "Obat tidak ditemukan."}
            </div>
          ) : null}

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {items.map((o) => (
              <div key={o.id} className="rounded-xl border border-black/5 bg-white shadow-sm hover:shadow-md transition-shadow">
                <div className="p-4 flex gap-3">
                  <div className="w-10 h-10 rounded-lg bg-green/10 flex items-center justify-center">
                    <Pill className="w-5 h-5 text-green" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold text-gray-900 truncate">{o.name}</div>
                    <Link
                      href={`/informasi-kesehatan/informasi-obat/${o.slug}`}
                      className="inline-flex items-center gap-1 text-green font-semibold text-sm mt-1 hover:text-greenHover transition-colors"
                    >
                      Lihat Detail <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col items-center gap-2">
            <p className="text-xs text-gray-500 sm:hidden">
              Halaman {safePage} dari {totalPages}
            </p>
            <Pagination>
              <PaginationContent className="gap-0.5 sm:gap-1">
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    className={`h-9 px-2 sm:px-3 transition-all duration-300 ease-in-out ${
                      safePage <= 1
                        ? "opacity-50 pointer-events-none"
                        : "hover:bg-green hover:text-white"
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      setPage((p) => clamp(p - 1, 1, totalPages));
                    }}
                  />
                </PaginationItem>

                {paginationNumbers.map((n) => (
                  <PaginationItem key={n}>
                    <PaginationLink
                      href="#"
                      isActive={n === safePage}
                      className={`h-9 w-9 transition-all duration-300 ease-in-out hover:bg-green hover:text-white ${
                        n === safePage ? "bg-green text-white border-green" : ""
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        setPage(n);
                      }}
                    >
                      {n}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                <PaginationItem>
                  <PaginationNext
                    href="#"
                    className={`h-9 px-2 sm:px-3 transition-all duration-300 ease-in-out ${
                      safePage >= totalPages
                        ? "opacity-50 pointer-events-none"
                        : "hover:bg-green hover:text-white"
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      setPage((p) => clamp(p + 1, 1, totalPages));
                    }}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </section>

        {category ? (
          <>
            <section className="mt-12">
              <h2 className="text-gray-800 font-medium text-base md:text-lg">Tags</h2>
              {categoryTags.length ? (
                <div className="mt-3 flex flex-wrap gap-3 md:gap-5">
                  {categoryTags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-green px-2.5 py-0.5 text-sm md:text-base text-green"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="mt-3 text-sm md:text-base text-gray-600">-</p>
              )}
            </section>

            <section className="mt-12">
              <h2 className="text-gray-800 font-medium text-base md:text-lg">Referensi</h2>
              {!hasReferences ? (
                <p className="mt-3 text-sm md:text-base text-gray-600">-</p>
              ) : categoryReferences.length ? (
                <ul className="mt-3 space-y-2">
                  {categoryReferences.map((ref, idx) => (
                    <li key={`${ref.url}-${idx}`}>
                      <a
                        href={ref.url}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className="text-sm md:text-base text-green break-all hover:text-greenHover hover:underline transition-colors"
                      >
                        {ref.label}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <div
                  className="mt-3 text-sm md:text-base text-gray-700 leading-relaxed [&_p]:mb-2 [&_ol]:ml-5 [&_ol]:list-decimal [&_ul]:ml-5 [&_ul]:list-disc [&_li]:mb-2 [&_a]:text-green [&_a]:break-all hover:[&_a]:underline"
                  dangerouslySetInnerHTML={{ __html: categoryReferencesHtml }}
                />
              )}
            </section>
          </>
        ) : null}
      </main>
    </div>
  );
}
