"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Search, Pill, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import Breadcrumbs from "@/common/components/Breadcrumbs";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { normalizeDrugRows, PAGE_SIZE } from "./normalizeDrugs";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

export default function InformasiObatClient({ initialData = null }) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [navigasi, setNavigasi] = useState("");
  const [items, setItems] = useState(initialData?.items ?? []);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [totalItems, setTotalItems] = useState(initialData?.totalItems ?? 0);
  const [totalPages, setTotalPages] = useState(initialData?.totalPages ?? 1);
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Halaman pertama sudah dirender server, jadi jangan fetch ulang saat mount.
  const skipInitialFetch = useRef(Boolean(initialData));

  useEffect(() => {
    setIsMounted(true);
    const mq = window.matchMedia("(max-width: 639px)");
    setIsMobile(mq.matches);
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (skipInitialFetch.current) {
      skipInitialFetch.current = false;
      return;
    }

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
  }, [page, query, navigasi]);

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
      <div className="px-5 md:px-12 pt-6">
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
          ]}
        />
      </div>

      <main className="max-w-6xl mx-auto px-5 md:px-12 pb-10 pt-6">
        <div className="text-center">
          <h1 className="text-green font-semibold text-lg md:text-xl">Direktori Obat Lengkap: Informasi Manfaat, Dosis &amp; Efek Samping</h1>
          <p className="text-gray-600 text-sm md:text-base mt-1">Cari obat berdasarkan nama untuk menemukan manfaat, aturan pakai, dosis anjuran, kontraindikasi hingga risiko overdosis</p>
        </div>

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
          <div className="mt-6 max-w-4xl mx-auto">
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
          </div>
        ) : null}

        <section className="mt-10">
          <div className="flex items-center justify-between">
            <h2 className="text-gray-800 font-semibold">Daftar Obat</h2>
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
      </main>
    </div>
  );
}
