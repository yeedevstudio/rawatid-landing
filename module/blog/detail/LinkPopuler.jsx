"use client";

import { useState } from "react";
import { CardArticleSidebar } from "@/common/components/CardArticle";
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
        Terpopuler
      </h2>
      <div className="py-6 grid grid-cols-1 gap-2 md:gap-6">
        {blogFilter?.map((article, index) => (
          <div key={index}>
            <CardArticleSidebar
              src={article?.thumbnail?.formats?.small?.url}
              alt={article.thumbnail.formats?.small.url}
              category={article.category?.name}
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
