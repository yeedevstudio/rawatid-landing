"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

// import components
import { CardArticleAll } from "@/common/components/CardArticle";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";

export default function BlogAll({ data }) {
  const router = useRouter();
  const [selected, setSelected] = useState("");
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);

  const handleSelected = (index, slug) => {
    setSelected(index);
    router.push(`/blog/detail/${slug}`);
  };

  useEffect(() => {
    const setTimeLoading = setTimeout(() => {
      if (data) {
        setLoading(false);
      } else {
        setLoading(true);
      }
    }, 2000);
    return () => clearTimeout(setTimeLoading);
  }, []);

  const blogFilter = show ? data : data?.slice(0, 6);

  return (
    <div className=" my-[3rem] md:my-[6rem]">
      <Link
        title="Artikel terbaru"
        href="/blog/semua"
        className="text-sm md:text-lg lg:text-xl text-green font-medium underline"
      >
        <h1>Artikel terbaru</h1>
      </Link>
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-6 py-6">
          {blogFilter?.map((article, index) => (
            <div key={index}>
              <Skeleton className="w-full h-[12rem] md:h-[14rem] lg:h-[25.5rem] rounded-xl " />
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-6 py-6 transition-all duration-150 ease-in-out">
            {blogFilter?.map((article, index) => (
              <div key={index} className={article.span}>
                <CardArticleAll
                  src={article?.thumbnail?.formats?.small?.url}
                  alt={article?.thumbnail?.formats?.small?.url}
                  category={article.category?.name}
                  title={article.title}
                  height={"h-[10rem] md:h-[12rem] lg:h-[14rem]"}
                  index={index}
                  selected={selected === index}
                  onSelect={() => handleSelected(index, article.slug)}
                />
              </div>
            ))}
          </div>
          {data?.length > 6 && (
            <div className="flex items-center justify-center py-5">
              <Link
                title="Lihat semua"
                href="/blog/semua"
                className=" text-xs md:text-sm lg:text-sm text-white bg-green hover:bg-green py-2 px-5 rounded-lg transition-all duration-300 ease-in-out"
              >
                Lihat semua
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  );
}
