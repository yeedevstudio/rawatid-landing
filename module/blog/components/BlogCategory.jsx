"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { CardArticleAll } from "@/common/components/CardArticle";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";

const PREVIEW_LIMIT = 6;

/**
 * Mengambil artikel dari /api/blog/posts (proxy yang sama dipakai /blog/kategori/[slug]),
 * dari browser — menghindari data hilang/pemotongan saat membawa banyak post dari server component.
 */
export default function BlogCategory({ category }) {
  const router = useRouter();
  const [selected, setSelected] = useState("");
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
          pageSize: String(Math.max(PREVIEW_LIMIT, 12)),
          sort: "updatedAt:desc",
        });

        const res = await fetch(`/api/blog/posts?${qs}`, { cache: "no-store" });
        const json = await res.json();

        if (cancelled) return;

        let raw = json?.data;
        let list = [];

        if (Array.isArray(raw)) {
          list = raw;
        } else if (raw != null && typeof raw === "object") {
          /* edge case CMS */
          list = [raw];
        }

        setPosts(list.slice(0, PREVIEW_LIMIT));
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

  const handleSelected = (index, artSlug) => {
    setSelected(index);
    router.push(`/blog/detail/${artSlug}`);
  };

  if (!slug) return null;

  if (!loading && posts.length === 0) return null;

  return (
    <div className=" my-[3rem] md:my-[6rem]">
      <div className="flex items-center justify-between">
        <h2 className="text-lg md:text-lg lg:text-xl text-green font-medium capitalize">{category?.name}</h2>
        <Link
          itemProp="button"
          href={`/blog/kategori/${slug}`}
          className="text-sm md:text-lg lg:text-xl text-green font-medium underline"
        >
          Lihat Selengkapnya
        </Link>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4 py-6">
          {[0, 1, 2].map((i) => (
            <div key={i} className="min-w-0">
              <Skeleton className="w-full h-[18rem] md:h-[20rem] lg:h-[18rem] rounded-xl" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4 py-6 transition-all duration-150 ease-in-out">
          {posts.map((article, index) => (
            <div key={article?.documentId ?? article?.slug ?? article?.id ?? index} className="min-w-0">
              <CardArticleAll
                src={article?.thumbnail?.url}
                alt={article?.thumbnail?.formats?.thumbnail?.url}
                category={article.category?.name}
                height={"h-[10rem] md:h-[12rem] lg:h-[10rem]"}
                title={article.title}
                index={index}
                selected={selected === index}
                onSelect={() => handleSelected(index, article.slug)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
