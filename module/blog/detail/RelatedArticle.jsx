"use client";

import { CardArticleAll } from "@/common/components/CardArticle";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RelatedArticle({ blog }) {
  const router = useRouter();
  const [selected, setSelected] = useState("");

  const handleSelected = (index, slug) => {
    setSelected(index);
    router.push(`/blog/detail/${slug}`);
  };

  const blogFilter = blog?.slice(0, 6) || [];

  return (
    <section className="my-24">
      <Link
        href="/"
        className="text-sm md:text-lg lg:text-xl text-green font-medium underline"
      >
        Artikel terkait
      </Link>
      {!blog ? (
        <div className="grid grid-cols-3 gap-2 md:gap-6 py-6">
          <Skeleton className="w-full h-[300px] max-h-full rounded-xl " />
          <Skeleton className="w-full h-[300px] rounded-xl  " />
          <Skeleton className="w-full h-[300px] rounded-xl " />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-6 py-6 transition-all duration-150 ease-in-out">
          {blogFilter?.map((article, index) => (
            <div key={index} className={article.span}>
              <CardArticleAll
                src={article?.thumbnail?.formats?.small?.url}
                alt={article?.thumbnail?.formats?.small?.url}
                category={article.category?.name}
                height={"h-[180px]"}
                title={article.title}
                index={index}
                selected={selected === index}
                onSelect={() => handleSelected(index, article.slug)}
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
