"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { CardArticleRow } from "@/common/components/CardArticle";
import { Skeleton } from "@/components/ui/skeleton";
import { startRouteLoading } from "@/common/utils/routeLoading";

/** Urutan kolom di layar besar: Tenaga Kesehatan | Fasilitas Kesehatan */
const PAIR_SLUGS = ["tenaga-kesehatan", "fasilitas-kesehatan"];

const PAIR_PREVIEW = 3;

function CategoryColumn({ category }) {
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const slug = typeof category?.slug === "string" ? category.slug.trim() : "";

  useEffect(() => {
    if (!slug) {
      setPosts([]);
      setLoading(false);
      return;
    }

    let cancelled = false;

    (async () => {
      try {
        setLoading(true);
        const qs = new URLSearchParams({
          categorySlug: slug,
          page: "1",
          pageSize: String(Math.max(PAIR_PREVIEW, 12)),
          sort: "updatedAt:desc",
        });

        const res = await fetch(`/api/blog/posts?${qs}`, { cache: "no-store" });
        const json = await res.json();

        if (cancelled) return;

        let raw = json?.data;
        let arr = [];

        if (Array.isArray(raw)) {
          arr = raw;
        } else if (raw != null && typeof raw === "object") {
          arr = [raw];
        }

        setPosts(arr.slice(0, PAIR_PREVIEW));
      } catch {
        if (!cancelled) setPosts([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (!slug) return null;

  if (!loading && posts.length === 0) return null;

  return (
    <div className="min-w-0">
      <div className="flex items-center justify-between gap-4 mb-4 md:mb-5">
        <h2 className="text-base md:text-lg lg:text-xl text-green font-medium capitalize truncate">{category?.name}</h2>
        <Link href={`/blog/kategori/${slug}`} className="text-xs md:text-sm lg:text-xl text-green font-medium underline shrink-0">
          Lihat Selengkapnya
        </Link>
      </div>

      {loading ? (
        <div className="flex flex-col gap-3 md:gap-4">
          {[0, 1, 2].map((i) => (
            <Skeleton key={i} className="h-[88px] w-full rounded-[20px]" />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-3 md:gap-4">
          {posts.map((article, index) => (
            <CardArticleRow
              key={article?.documentId ?? article?.slug ?? article?.id ?? index}
              src={article?.thumbnail?.url}
              alt={article?.thumbnail?.formats?.thumbnail?.url || article?.title}
              category={article?.category?.name}
              title={article?.title}
              date={article?.updatedAt}
              tagVariant="outline"
              onSelect={() => {
                startRouteLoading();
                router.push(`/blog/detail/${article?.slug}`);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * Dua kategori berdampingan (lg+), kartu horizontal bertumpuk per kolom — sesuai referensi desain beranda blog.
 */
export default function BlogCategoryFeaturedPair({ categories }) {
  const list = Array.isArray(categories) ? categories : [];

  const columns = PAIR_SLUGS.map((s) => list.find((c) => (c?.slug || "").trim() === s)).filter(Boolean);

  if (columns.length === 0) return null;

  return (
    <div className="my-[3rem] md:my-[6rem] grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 xl:gap-16">
      {columns.map((cat) => (
        <CategoryColumn key={cat.documentId ?? cat.id ?? cat.slug} category={cat} />
      ))}
    </div>
  );
}
