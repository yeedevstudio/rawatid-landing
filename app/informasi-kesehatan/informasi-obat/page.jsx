"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, Pill, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import Breadcrumbs from "@/common/components/Breadcrumbs";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

const PAGE_SIZE = 12;

const OBAT = Array.from({ length: 52 }).map((_, i) => {
  const name = i % 7 === 0 ? "Abacavir" : i % 7 === 1 ? "Abbotic" : i % 7 === 2 ? "Abacavir" : i % 7 === 3 ? "Abacavir" : i % 7 === 4 ? "Abacavir" : i % 7 === 5 ? "Abacavir" : "Abacavir";
  return {
    id: `obat-${i + 1}`,
    name,
    slug: `${name}-${i + 1}`.toLowerCase().replace(/\s+/g, "-"),
  };
});

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

export default function InformasiObatPage() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return OBAT;
    return OBAT.filter((o) => o.name.toLowerCase().includes(q));
  }, [query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = clamp(page, 1, totalPages);

  const pageItems = useMemo(() => {
    const start = (safePage - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, safePage]);

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
              }}
              placeholder="Cari nama obat"
              className="rounded-l-none border-l-0 h-11"
            />
          </div>
        </div>

        <section className="mt-10">
          <div className="flex items-center justify-between">
            <h2 className="text-gray-800 font-semibold">Daftar Obat</h2>
            <div className="text-sm text-gray-500">
              {(safePage - 1) * PAGE_SIZE + 1}-{Math.min(safePage * PAGE_SIZE, filtered.length)} dari {filtered.length}
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {pageItems.map((o) => (
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
