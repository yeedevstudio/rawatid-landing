"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

// import components
import { CardArticleAll } from "@/common/components/CardArticle";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import { startRouteLoading } from "@/common/utils/routeLoading";

export default function BlogAll({ data, maxItems }) {
  const router = useRouter();
  const [loading, setLoading] = useState(!data);
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 3;

  // Navigasi kini ditangani <Link> di dalam kartu (lihat CardArticle.jsx),
  // jadi di sini cukup memunculkan indikator loading.
  const handleSelected = () => {
    startRouteLoading();
  };

  // Dulu di sini ada setTimeout 2 detik yang menahan skeleton walaupun `data`
  // sudah tersedia sebagai prop dari server — murni penundaan buatan, dan
  // membuat konten tidak ikut ter-render di HTML. Sekarang loading langsung
  // mengikuti ada/tidaknya data.
  useEffect(() => {
    setLoading(!data);
  }, [data]);

  const raw = Array.isArray(data) ? data : [];
  const articles =
    typeof maxItems === "number" && maxItems > 0 ? raw.slice(0, maxItems) : raw;
  const totalPages = Math.max(1, Math.ceil(articles.length / pageSize));
  const safePage = Math.min(currentPage, totalPages - 1);
  const pageStart = safePage * pageSize;
  const visible = articles.slice(pageStart, pageStart + pageSize);

  const goPrev = () => setCurrentPage((p) => Math.max(0, p - 1));
  const goNext = () => setCurrentPage((p) => Math.min(totalPages - 1, p + 1));

  return (
    <section className="my-[3rem] md:my-[6rem]">
      <div className="bg-[#EBF6F9] rounded-[28px] px-5 md:px-10 lg:px-12 py-8 md:py-10">
        <div className="flex items-center justify-between">
          <h2 className="text-sm md:text-lg lg:text-xl text-green font-medium">Artikel terbaru</h2>
          <Link itemProp="button" href="/blog/semua" className="text-sm md:text-lg lg:text-xl text-green font-medium underline">
            Lihat Selengkapnya
          </Link>
        </div>
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 py-6">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index}>
                <Skeleton className="w-full h-[18rem] md:h-[20rem] lg:h-[22rem] rounded-xl " />
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="relative py-6">
              <button
                type="button"
                aria-label="Sebelumnya"
                onClick={goPrev}
                disabled={safePage === 0}
                className={`absolute left-[-10px] md:left-[-18px] top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-11 md:h-11 rounded-full bg-white shadow-[0_6px_18px_rgba(0,0,0,0.12)] flex items-center justify-center transition-opacity ${
                  safePage === 0 ? "opacity-0 pointer-events-none" : "opacity-100"
                }`}
              >
                <IconChevronLeft className="w-6 h-6 text-neutral-700" />
              </button>

              <button
                type="button"
                aria-label="Berikutnya"
                onClick={goNext}
                disabled={safePage >= totalPages - 1}
                className={`absolute right-[-10px] md:right-[-18px] top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-11 md:h-11 rounded-full bg-white shadow-[0_6px_18px_rgba(0,0,0,0.12)] flex items-center justify-center transition-opacity ${
                  safePage >= totalPages - 1 ? "opacity-0 pointer-events-none" : "opacity-100"
                }`}
              >
                <IconChevronRight className="w-6 h-6 text-neutral-700" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 transition-all duration-150 ease-in-out">
                {visible?.map((article, index) => (
                  <div key={article?.slug || index} className={article?.span}>
                    <CardArticleAll
                      src={article?.thumbnail?.formats?.medium?.url || article?.thumbnail?.url}
                      alt={article?.title || "Artikel Rawat.ID"}
                      category={article.category?.name}
                      title={article.title}
                      date={article?.updatedAt}
                      height={"h-[18rem] md:h-[20rem] lg:h-[18rem]"}
                      minHeightClassName="min-h-[400px]"
                      tagVariant="outline"
                      // Kartu pertama berada di viewport awal pada mobile.
                      priority={safePage === 0 && index === 0}
                      href={`/blog/detail/${article.slug}`}
                      onSelect={handleSelected}
                    />
                  </div>
                ))}
              </div>
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 pb-2">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button key={i} type="button" aria-label={`Halaman ${i + 1}`} onClick={() => setCurrentPage(i)} className={`h-2 w-2 rounded-full transition-all ${i === safePage ? "bg-green w-2.5" : "bg-neutral-300"}`} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
