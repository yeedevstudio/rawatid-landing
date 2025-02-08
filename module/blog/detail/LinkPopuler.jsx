"use client";

import { useState } from "react";
import { CardArticlePopuler } from "@/common/components/CardArticle";
import { useRouter } from "next/navigation";

export default function LinkPopuler({ blog }) {
  const router = useRouter();
  const [selected, setSelected] = useState("");

  const handleSelected = (index, slug) => {
    setSelected(index);
    router.push(`/blog/detail/${slug}`);
  };

  const blogFilter = blog.filter((blog) => blog.featured === true).slice(0, 4);

  return (
    <div>
      <h2 className="text-sm md:text-base lg:text-lg font-medium text-green">
        Artikel terpopuler
      </h2>
      <div className="py-6 grid grid-cols-1 gap-2 md:gap-6">
        {blogFilter?.map((article, index) => (
          <div key={index}>
            <CardArticlePopuler
              src={article?.thumbnail?.formats?.small?.url}
              alt={article.thumbnail.formats?.small.url}
              category={article.category?.name}
              height={"h-[11rem] md:h-[16rem] lg:h-[11rem]"}
              title={article.title}
              index={index}
              selected={selected === index}
              onSelect={() => handleSelected(index, article.slug)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
