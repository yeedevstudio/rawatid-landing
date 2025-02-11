"use client";

import { CardArticleAll } from "@/common/components/CardArticle";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import PaginationPage from "@/common/components/PaginationPage";
import ContainerBlog from "@/common/components/ContainerBlog";

export default function PageBySearch({ data, pagination, slug }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selected, setSelected] = useState("");
  const [loading, setLoading] = useState(true);

  const currentPage = parseInt(searchParams.get("page")) || 1;

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

  return (
    <ContainerBlog>
      <h1 className="text-lg md:text-xl lg:text-2xl font-medium text-green capitalize  md:gap-4">
        Pencarian Berdasarkan :
        <span className="ml-2 font-semibold break-all">"{decodeURIComponent(slug)}"</span>
      </h1>
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4 py-6">
          {data?.map((article, index) => (
            <div key={index}>
              <Skeleton className="w-full h-[18rem] md:h-[20rem] lg:h-[22rem] rounded-xl " />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4 py-6 transition-all duration-150 ease-in-out">
          {data?.map((article, index) => (
            <div key={index} className={article.span}>
              <CardArticleAll
                src={article?.thumbnail?.formats?.small?.url}
                alt={article?.thumbnail?.formats?.small?.url}
                category={article.category?.name}
                height={"h-[10rem] md:h-[12rem] lg:h-[14rem]"}
                title={article.title}
                index={index}
                selected={selected === index}
                onSelect={() => handleSelected(index, article.slug)}
                headline={article.headline}
              />
            </div>
          ))}
        </div>
      )}
      <PaginationPage
        page={currentPage}
        pageCount={pagination.pageCount}
        onPageChange={(newPage) =>
          router.push(`/blog/cari/${slug}?page=${newPage}`)
        }
      />
    </ContainerBlog>
  );
}
