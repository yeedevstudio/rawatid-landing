"use client";

import { useEffect, useState } from "react";

// import components
import {
  CardArticle,
  CardArticleSidebar,
} from "@/common/components/CardArticle";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";

export default function BlogHighlight({ data }) {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState("");
  const [loading, setLoading] = useState(true);

  const blogFilter = data.filter((blog) => blog.featured === true);

  const handleSelected = (index, slug) => {
    setSelected(index);
    router.push(`/blog/detail/${slug}`);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % blogFilter.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [blogFilter.length]);

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

  const currentArticle = blogFilter[currentIndex];

  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-2 md:gap-6 md:my-[6rem] h-full">
        <Skeleton className="w-full h-full max-h-full rounded-xl" />
        <div className="grid grid-cols-1 gap-2 md:gap-6">
          <Skeleton className="w-full h-[200px] rounded-xl " />
          <Skeleton className="w-full h-[200px] rounded-xl" />
          <Skeleton className="w-full h-[200px] rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-6 h-full">
      <div className="transition-all duration-300 ease-in-out">
        <CardArticle
          src={currentArticle?.thumbnail?.formats?.small?.url}
          alt={currentArticle?.thumbnail?.formats?.small?.url}
          category={currentArticle?.category?.name}
          title={currentArticle?.title}
          index={currentIndex}
          selected={true}
          onSelect={() => handleSelected(currentIndex, currentArticle.slug)}
        />
      </div>
      <div className="grid grid-cols-1 gap-2 md:gap-6">
        {blogFilter.map((article, index) => (
          <div key={index}>
            <CardArticleSidebar
              src={article?.thumbnail?.formats?.small?.url}
              alt={article.thumbnail.formats?.small.url}
              category={article.category?.name}
              title={article.title}
              height={"h-[200px]"}
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
