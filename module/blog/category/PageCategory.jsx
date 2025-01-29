"use client";

import { CardArticleSidebar } from "@/common/components/CardArticle";
import ContainerBlog from "@/common/components/ContainerBlog";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";
import BlogAll from "../components/BlogAll";

export default function PageCategory({ data, post }) {
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
    <ContainerBlog>
      <h1 className="text-lg md:text-xl lg:text-2xl font-medium text-green">
        Category : {data?.[0]?.category?.name}
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
        <div className="grid grid-cols-1 md:grid-cols-1 gap-2 md:gap-6 py-6 transition-all duration-150 ease-in-out">
          {blogFilter?.map((article, index) => (
            <div key={index} className={article.span}>
              <CardArticleSidebar
                src={article?.thumbnail?.formats?.small?.url}
                alt={article?.thumbnail?.formats?.small?.url}
                category={article.category?.name}
                height={"h-[25rem]"}
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

      <BlogAll data={post} />
    </ContainerBlog>
  );
}
