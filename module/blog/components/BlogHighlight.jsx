"use client";

import { useEffect, useState } from "react";

// import components
import {
  CardArticle,
  CardArticleSidebar,
} from "@/common/components/CardArticle";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";

export default function BlogHighlight() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [blogAll, setBlogAll] = useState([]);
  const [selected, setSelected] = useState("");
  const [loading, setLoading] = useState(true);

  const blogFilter = blogAll.filter((blog) => blog.featured === true);
  const handleSelected = (index, slug) => {
    setSelected(index);
    router.push(`/blog/${slug}`);
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/posts?populate=*`
        );
        const data = await res.json();
        setBlogAll(data.data);
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % blogFilter.length);
    }, 30000);

    return () => clearInterval(interval);
  }, [blogFilter.length]);

  const currentArticle = blogFilter[currentIndex];

  if (loading) {
    return (
      <div className="grid grid-rows-2 grid-flow-col gap-2 md:gap-6 md:my-[6rem] h-full">
        <Skeleton className="w-full h-[330px] max-h-full rounded-xl row-span-2 col-span-2" />
        <Skeleton className="w-full h-[150px] rounded-xl col-span-1 row-span-1" />
        <Skeleton className="w-full h-[150px] rounded-xl col-span-1 row-span-1" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-6 h-full">
      <div className="transition-all duration-300 ease-in-out">
        <CardArticle
          src={
            process.env.NEXT_PUBLIC_BASE_URL +
            currentArticle?.thumbnail?.formats?.small?.url
          }
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
              src={
                process.env.NEXT_PUBLIC_BASE_URL +
                article?.thumbnail?.formats?.small?.url
              }
              alt={article.thumbnail.formats?.small.url}
              category={article.category?.name}
              title={article.title}
              width={article.width}
              height={article.height}
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
