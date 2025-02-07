"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CardArticleAll } from "@/common/components/CardArticle";
import { Skeleton } from "@/components/ui/skeleton";
import ContainerBlog from "@/common/components/ContainerBlog";
import ButtonBack from "@/common/components/ButtonBack";
import PaginationPage from "@/common/components/PaginationPage";

export default function PageByAll({ data, pagination }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selected, setSelected] = useState("");
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);

  const currentPage = parseInt(searchParams.get("page")) || 1;

  const handleSelected = (index, slug) => {
    setSelected(index);
    router.push(`/blog/detail/${slug}`);
  };

  useEffect(() => {
    setLoading(false);
  }, [data]);

  const blogFilter = show ? data : data?.slice(0, 24);

  return (
    <ContainerBlog>
      <ButtonBack />
      <h1 className="text-lg md:text-xl lg:text-2xl font-medium text-green capitalize">
        Artikel Terbaru
      </h1>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-6 py-6">
          {data?.map((_, index) => (
            <div key={index}>
              <Skeleton className="w-full h-[12rem] md:h-[14rem] lg:h-[25.5rem] rounded-xl " />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-6 py-6 transition-all duration-150 ease-in-out">
          {blogFilter?.map((article, index) => (
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
        onPageChange={(newPage) => router.push(`/blog/semua?page=${newPage}`)}
      />
    </ContainerBlog>
  );
}
