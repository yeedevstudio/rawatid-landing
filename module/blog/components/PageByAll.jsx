"use client";

import {
  CardArticleAll,
  CardArticleSidebar,
} from "@/common/components/CardArticle";
import ContainerBlog from "@/common/components/ContainerBlog";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import ButtonBack from "@/common/components/ButtonBack";

export default function PageByAll({ data }) {
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

  const blogFilter = show ? data : data?.slice(0, 24);

  return (
    <ContainerBlog>
      <ButtonBack />
      <h1 className="text-lg md:text-xl lg:text-2xl font-medium text-green capitalize">
        Artikel Terbaru
      </h1>

      {loading ? (
        <div className="grid grid-cols-1 gap-2 md:gap-6 py-6">
          {data?.map((article, index) => (
            <div key={index}>
              <Skeleton className="w-full h-[300px] rounded-xl " />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-6 py-6 transition-all duration-150 ease-in-out">
          {blogFilter?.map((article, index) => (
            <div key={index} className={article.span}>
              <CardArticleAll
                src={article?.thumbnail?.formats?.small?.url}
                alt={article?.thumbnail?.formats?.small?.url}
                category={article.category?.name}
                height={"h-[20rem]"}
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
    </ContainerBlog>
  );
}
