"use client";

import { CardArticleAll } from "@/common/components/CardArticle";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import PaginationPage from "@/common/components/PaginationPage";
import ContainerBlog from "@/common/components/ContainerBlog";
import Breadcrumbs from "@/common/components/Breadcrumbs";

export default function PageBySearch({ data, pagination, slug }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selected, setSelected] = useState("");
  const [loading, setLoading] = useState(!data);

  const currentPage = parseInt(searchParams.get("page")) || 1;

  const handleSelected = (index, slug) => {
    setSelected(index);
    router.push(`/blog/detail/${slug}`);
  };

  // Dulu di sini ada setTimeout 2 detik yang menahan skeleton walaupun `data`
  // sudah tersedia sebagai prop dari server — murni penundaan buatan, dan
  // membuat konten tidak ikut ter-render di HTML. Sekarang loading langsung
  // mengikuti ada/tidaknya data.
  useEffect(() => {
    setLoading(!data);
  }, [data]);

  return (
    <ContainerBlog>
      <div className="mb-4 md:mb-6">
        <Breadcrumbs
          items={[
            { label: "Beranda", href: "/" },
            { label: "Artikel", href: "/blog/semua" },
            {
              label: `Cari: ${decodeURIComponent(slug)}`,
              href: `/blog/cari/${slug}`,
            },
          ]}
        />
      </div>
      <h1 className="text-lg md:text-xl lg:text-2xl font-medium text-green capitalize md:gap-4">
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
