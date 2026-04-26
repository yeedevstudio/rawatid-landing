"use client";

import ContainerBlog from "@/common/components/ContainerBlog";
import Breadcrumbs from "@/common/components/Breadcrumbs";
import { CardArticleSidebar } from "@/common/components/CardArticle";
import BlogAll from "@/module/blog/components/BlogAll";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function PageByClientPagination({ categorySlug }) {
  const router = useRouter();
  const sp = useSearchParams();

  const page = Math.max(1, Number.parseInt(sp.get("page") || "1", 10) || 1);
  const pageSize = 10;

  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [meta, setMeta] = useState(null);
  const [latest, setLatest] = useState([]);
  const [categoryName, setCategoryName] = useState(categorySlug);

  const title = "Kategori";

  useEffect(() => {
    let cancelled = false;
    async function run() {
      try {
        setLoading(true);

        const qs = new URLSearchParams();
        qs.set("categorySlug", categorySlug);
        qs.set("page", String(page));
        qs.set("pageSize", String(pageSize));
        qs.set("kind", "category");
        qs.set("_", String(Date.now()));

        const resCategory = await fetch(`/api/blog/posts?${qs.toString()}`, { cache: "no-store" });

        const jsonCategory = await resCategory.json().catch(() => null);

        if (cancelled) return;

        const catItems = jsonCategory?.data || [];
        setItems(Array.isArray(catItems) ? catItems : []);
        setMeta(jsonCategory?.meta?.pagination || null);
        setCategoryName(catItems?.[0]?.category?.name || categorySlug);

        fetch(`/api/blog/posts?kind=latest&page=1&pageSize=10&_=${Date.now()}`, { cache: "no-store" })
          .then((r) => r.json())
          .then((j) => {
            if (cancelled) return;
            const latestItems = j?.data || [];
            setLatest(Array.isArray(latestItems) ? latestItems : []);
          })
          .catch(() => {});
      } catch {
        if (!cancelled) {
          setItems([]);
          setMeta(null);
          setLatest([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [categorySlug, page]);

  const pageCount = Number(meta?.pageCount || 1);
  const total = Number(meta?.total || 0);

  useEffect(() => {
    if (!meta?.pageCount) return;
    if (page > meta.pageCount) {
      const params = new URLSearchParams(sp.toString());
      params.set("page", String(meta.pageCount));
      router.replace(`/blog/kategori/${categorySlug}?${params.toString()}`);
    }
  }, [meta?.pageCount, page, router, sp, categorySlug]);

  const goToPage = (p) => {
    const next = Math.min(Math.max(1, p), pageCount || 1);
    const params = new URLSearchParams(sp.toString());
    params.set("page", String(next));
    router.push(`/blog/kategori/${categorySlug}?${params.toString()}`);
  };

  const pageButtons = useMemo(() => {
    if (pageCount <= 1) return [];
    const start = Math.max(1, page - 2);
    const end = Math.min(pageCount, page + 2);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }, [pageCount, page]);

  return (
    <ContainerBlog>
      <div className="mb-4 md:mb-6">
        <Breadcrumbs
          items={[
            { label: "Beranda", href: "/" },
            { label: "Artikel", href: "/blog/semua" },
            { label: `${title} - ${categoryName}`.trim(), href: "#" },
          ]}
        />
      </div>

      <h1 className="mt-2 md:mt-3 text-lg md:text-xl lg:text-2xl font-medium text-green capitalize">
        {title} : {categoryName}
      </h1>

      {loading ? (
        <div className="grid grid-cols-1 gap-2 md:gap-4 py-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index}>
              <Skeleton className="w-full h-[16rem] md:h-[16rem] lg:h-[19rem] rounded-xl " />
            </div>
          ))}
        </div>
      ) : (
        <>
          {total === 0 ? <div className="py-10 text-sm md:text-base text-gray-600">Kategori tidak ditemukan atau belum memiliki artikel.</div> : null}

          <div className="grid grid-cols-1 md:grid-cols-1 gap-2 md:gap-4 py-6 transition-all duration-150 ease-in-out">
            {items?.map((article, index) => (
              <div key={article?.slug || index} className={article?.span}>
                <CardArticleSidebar
                  src={article?.thumbnail?.formats?.small?.url}
                  alt={article?.thumbnail?.formats?.small?.url}
                  category={article?.category?.name}
                  title={article?.title}
                  height={"h-[12rem] md:h-[14rem] lg:h-[18rem]"}
                  index={index}
                  selected={false}
                  onSelect={() => router.push(`/blog/detail/${article?.slug}`)}
                  headline={article?.headline}
                />
              </div>
            ))}
          </div>

          {pageCount > 1 && (
            <div className="flex items-center justify-center gap-2 pt-2 pb-6">
              <button type="button" onClick={() => goToPage(page - 1)} disabled={page <= 1} className={`px-3 py-2 rounded-md border text-sm ${page <= 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-50"}`}>
                Sebelumnya
              </button>

              {pageButtons.map((p) => {
                const active = p === page;
                return (
                  <button
                    key={p}
                    type="button"
                    onClick={() => goToPage(p)}
                    className={`w-9 h-9 rounded-md border text-sm ${active ? "bg-green text-white border-green" : "hover:bg-gray-50 text-gray-700"}`}
                    aria-current={active ? "page" : undefined}
                  >
                    {p}
                  </button>
                );
              })}

              <button type="button" onClick={() => goToPage(page + 1)} disabled={page >= pageCount} className={`px-3 py-2 rounded-md border text-sm ${page >= pageCount ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-50"}`}>
                Berikutnya
              </button>
            </div>
          )}
        </>
      )}

      <BlogAll data={latest} />
    </ContainerBlog>
  );
}
