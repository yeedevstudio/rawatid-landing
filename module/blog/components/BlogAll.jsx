"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

// import components
import { CardArticleAll } from "@/common/components/CardArticle";
import { Skeleton } from "@/components/ui/skeleton";

export default function BlogAll() {
  const [blogAll, setBlogAll] = useState([]);
  const [selected, setSelected] = useState("");
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);

  const handleSelected = (index) => {
    setSelected(index);
  };

  const blogFilter = show ? blogAll : blogAll.slice(0, 6);

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

  return (
    <div className=" my-[3rem] md:my-[6rem]">
      <Link
        href="/fitur"
        className="text-sm md:text-lg lg:text-xl text-green font-medium underline"
      >
        Artikel terbaru
      </Link>
      {loading ? (
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
                src={
                  process.env.NEXT_PUBLIC_BASE_URL +
                  article?.thumbnail?.formats?.small?.url
                }
                alt={article?.thumbnail?.formats?.small?.url}
                category={article.category?.name}
                height={'h-[300px]'}
                title={article.title}
                index={index}
                selected={selected === index}
                onSelect={() => handleSelected(index)}
              />
            </div>
          ))}
        </div>
      )}
      {/* <div className="flex items-center justify-center transition-all duration-150 ease-in-out">
        <Button
          className="bg-transparent hover:bg-transparent active:underline text-green border-none shadow-none"
          onClick={() => setShow(!show)}
        >
          Lihat Semua
        </Button>
      </div> */}
    </div>
  );
}
