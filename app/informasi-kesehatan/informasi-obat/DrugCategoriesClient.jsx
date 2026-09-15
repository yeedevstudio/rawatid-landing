"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Droplet, ChevronRight } from "lucide-react";
import Breadcrumbs from "@/common/components/Breadcrumbs";
import { CONTAINER_CLASS } from "@/common/constant/containerValue";
import PaginationPage from "@/common/components/PaginationPage";
import { Skeleton } from "@/components/ui/skeleton";
import { normalizeCategories, CATEGORY_PAGE_SIZE } from "./normalizeDrugs";

export default function DrugCategoriesClient() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [pageCount, setPageCount] = useState(1);
  const containerClass = CONTAINER_CLASS;

  // Kategori diambil per halaman dari browser (terlihat di tab Network).
  // Paginasi dari API: { data, total, page, perPage, totalPages }.
  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      try {
        setIsLoading(true);
        setError("");
        const res = await fetch(
          `/api/drug-categories/public?page=${page}&perPage=${CATEGORY_PAGE_SIZE}`,
          { signal: controller.signal }
        );
        const json = await res.json();
        if (!res.ok) {
          throw new Error(json?.error || "Gagal memuat kategori obat");
        }
        setCategories(normalizeCategories(json));
        setTotalItems(Number(json?.total) || 0);
        setPageCount(Math.max(1, Number(json?.totalPages) || 1));
      } catch (e) {
        if (e?.name !== "AbortError") {
          setError(e?.message || "Gagal memuat kategori obat");
        }
      } finally {
        setIsLoading(false);
      }
    })();

    return () => controller.abort();
  }, [page]);

  const start = (page - 1) * CATEGORY_PAGE_SIZE;

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
            {
              label: "Kategori Obat",
              href: "/informasi-kesehatan/informasi-obat/kategori",
            },
          ]}
        />
      </div>

      <main className={`${containerClass} pb-12 pt-10 md:pt-16`}>
        <div>
          <h1 className="text-green font-semibold text-lg md:text-xl">
            Temukan Obat Berdasarkan Kategori
          </h1>
          <p className="text-gray-600 text-sm md:text-base mt-1">
            Temukan manfaat, aturan pakai, dosis anjuran, kontraindikasi hingga
            risiko overdosis obat berdasarkan kategori
          </p>
        </div>

        <section className="mt-8">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: CATEGORY_PAGE_SIZE }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-black/5 bg-white shadow-sm p-4"
                >
                  <Skeleton className="w-6 h-6 rounded-md" />
                  <Skeleton className="h-5 w-3/4 mt-3" />
                  <Skeleton className="h-4 w-28 mt-3" />
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-sm text-red-600">{error}</div>
          ) : !categories.length ? (
            <div className="text-sm text-gray-500">
              Belum ada kategori obat.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories.map((c) => (
                <div
                  key={c.id}
                  className="rounded-xl border border-black/5 bg-white shadow-sm hover:shadow-md transition-shadow p-4"
                >
                  <Droplet className="w-6 h-6 text-green" />
                  <h2 className="font-semibold text-gray-900 text-base md:text-lg mt-3">
                    {c.name}
                  </h2>
                  <Link
                    href={`/informasi-kesehatan/informasi-obat/kategori/${c.slug}`}
                    className="inline-flex items-center gap-1 text-green font-semibold text-sm md:text-base mt-2 hover:text-greenHover transition-colors"
                  >
                    Lihat Kategori <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              ))}
            </div>
          )}

          {!isLoading && !error && totalItems > 0 ? (
            <div className="mt-8 flex flex-col items-center gap-2">
              <p className="text-sm text-gray-500">
                {start + 1}-{start + categories.length}{" "}
                dari {totalItems}
              </p>
              <PaginationPage
                page={page}
                pageCount={pageCount}
                onPageChange={setPage}
              />
            </div>
          ) : null}
        </section>
      </main>
    </div>
  );
}
