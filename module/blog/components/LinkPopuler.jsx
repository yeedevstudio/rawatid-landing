"use client";

import { useState } from "react";
import { CardArticleSidebar } from "@/common/components/CardArticle";
import { useRouter } from "next/navigation";

export default function LinkPopuler({ blog }) {
  const router = useRouter();
  const [selected, setSelected] = useState("");

  const handleSelected = (index, slug) => {
    setSelected(index);
    router.push(`/blog/${slug}`);
  };

  const blogFilter = blog.filter((blog) => blog.featured === true);

  return (
    <div>
      <h2 className="text-sm md:text-base lg:text-lg font-medium text-green">
        Terpopuler
      </h2>
      <div className="py-6 grid grid-cols-1 gap-2 md:gap-6">
        {blogFilter?.map((article, index) => (
          <div key={index}>
            <CardArticleSidebar
              src={
                process.env.NEXT_PUBLIC_BASE_URL +
                article?.thumbnail?.formats?.small?.url
              }
              alt={article.thumbnail.formats?.small.url}
              category={article.category?.name}
              title={article.title}
              // width={50}
              height={60}
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
