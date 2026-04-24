"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Search, Pill, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import Breadcrumbs from "@/common/components/Breadcrumbs";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

const PAGE_SIZE = 12;
const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function toSlug(text) {
  return String(text || "")
    .trim()
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

export default function InformasiObatPage() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [navigasi, setNavigasi] = useState("");
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

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

        const res = await fetch(
          `/api/drug-ingredients/public?${params.toString()}`,
          { signal: controller.signal }
        );
        const json = await res.json();

        if (!res.ok) {
          throw new Error(json?.error || "Gagal memuat data obat");
        }

        const raw = Array.isArray(json) ? json : json?.data ?? [];
        const normalized = (Array.isArray(raw) ? raw : []).map((row, idx) => {
          const name =
            row?.name ??
            row?.ingredientName ??
            row?.ingredient_name ??
            row?.title ??
            "";
          const id = row?.id ?? row?._id ?? `${name}-${idx}`;
          const apiSlug = row?.slug ?? row?.Slug ?? null;
          return {
            id: String(id),
            name: String(name),
            slug: String(apiSlug || toSlug(name) || id),
            raw: row,
          };
        });

        setItems(normalized);
        setTotalItems(Number(json?.total) || 0);
        setTotalPages(Number(json?.totalPages) || 1);
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
    const maxButtons = 5;
    if (totalPages <= maxButtons) {
      return Array.from({ length: totalPages }).map((_, i) => i + 1);
    }
    const start = clamp(safePage - 2, 1, totalPages - (maxButtons - 1));
    return Array.from({ length: maxButtons }).map((_, i) => start + i);
  }, [safePage, totalPages]);

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
          <h1 className="text-green font-semibold text-lg md:text-xl">Temukan Obat dengan Mudah & Cepat</h1>
          <p className="text-gray-600 text-sm md:text-base mt-1">Cari berdasarkan nama</p>
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
            <div className="mt-6 text-sm text-gray-600">Memuat data...</div>
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
                    <Link href={`/informasi-kesehatan/informasi-obat/${o.slug}`} className="inline-flex items-center gap-1 text-green font-semibold text-sm mt-1 hover:text-greenHover transition-colors">
                      Lihat Detail <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
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
