"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

// import components
import {
  CardArticle,
  CardArticleSidebar,
} from "@/common/components/CardArticle";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import { startRouteLoading } from "@/common/utils/routeLoading";

export default function BlogHighlight({ data }) {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState("");
  const [loading, setLoading] = useState(!data);
  const [show, setShow] = useState(false);

  const blogFilter = data.filter((blog) => blog.featured === true);
  const blog = show ? blogFilter : blogFilter?.slice(0, 3);

  // Navigasi ditangani <Link> di dalam kartu; di sini cukup state UI + loader.
  const handleSelected = (index) => {
    setSelected(index);
    startRouteLoading();
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % blogFilter.length);
    }, 20000);

    return () => clearInterval(interval);
  }, [blogFilter.length]);

  // Dulu di sini ada setTimeout 2 detik yang menahan skeleton walaupun `data`
  // sudah tersedia sebagai prop dari server — murni penundaan buatan, dan
  // membuat konten tidak ikut ter-render di HTML. Sekarang loading langsung
  // mengikuti ada/tidaknya data.
  useEffect(() => {
    setLoading(!data);
  }, [data]);

  const currentArticle = blogFilter[currentIndex];

  if (loading) {
    return (
      <>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-sm md:text-lg lg:text-xl text-green font-medium">
            Artikel pilihan
          </h2>
          <Link
            itemProp="button"
            href="/blog/semua"
            className="text-sm md:text-lg lg:text-xl text-green font-medium underline"
          >
            Lihat Selengkapnya
          </Link>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 md:gap-4 lg:gap-6 h-full">
          <Skeleton className="hidden md:block w-full h-full min-h-[18rem] md:min-h-[25rem] lg:min-h-[15rem] max-h-full rounded-xl" />
          <div className="grid grid-cols-1 gap-2 md:gap-6">
            <Skeleton className="w-full h-[16rem] md:h-[15.5rem] lg:h-[9rem] rounded-xl " />
            <Skeleton className="w-full h-[16rem] md:h-[15.5rem] lg:h-[9rem] rounded-xl" />
            <Skeleton className="w-full h-[16rem] md:h-[15.5rem] lg:h-[9rem] rounded-xl" />
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-sm md:text-lg lg:text-xl text-green font-medium">
          Artikel pilihan
        </h2>
        <Link
          itemProp="button"
          href="/blog/semua"
          className="text-sm md:text-lg lg:text-xl text-green font-medium underline"
        >
          Lihat Selengkapnya
        </Link>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 md:gap-4 h-full">
        <div className="hidden md:block transition-all duration-300 ease-in-out">
          <CardArticle
            src={currentArticle?.thumbnail?.formats?.small?.url}
            alt={currentArticle?.title || "Artikel Rawat.ID"}
            priority
            category={currentArticle?.category?.name}
            title={currentArticle?.title}
            index={currentIndex}
            selected={true}
            shadow
            href={`/blog/detail/${currentArticle?.slug}`}
            onSelect={() => handleSelected(currentIndex)}
          />
        </div>
        <div className="grid grid-cols-1 gap-2">
          {blog.map((article, index) => (
            <div key={index}>
              <CardArticleSidebar
                src={article?.thumbnail?.formats?.small?.url || article?.thumbnail?.url}
                alt={article?.title || "Artikel Rawat.ID"}
                priority={index === 0}
                category={article.category?.name}
                title={article.title}
                index={index}
                selected={selected === index}
                shadow
                href={`/blog/detail/${article?.slug}`}
                onSelect={() => handleSelected(index)}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
