"use client";

import { CardArticleSidebar } from "@/common/components/CardArticle";
import ContainerBlog from "@/common/components/ContainerBlog";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";
import BlogAll from "../components/BlogAll";
import Link from "next/link";
import Image from "next/image";
import ButtonBack from "@/common/components/ButtonBack";

export default function PageBy({ data, post, slug, title, author }) {
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
      <ButtonBack />
      <h1 className="text-lg md:text-xl lg:text-2xl font-medium text-green capitalize">
        {title} : {slug}
      </h1>

      {author && (
        <section className="flex flex-col items-center gap-2 md:gap-6 rounded-2xl w-full border border-neutral50 p-6 my-20">
          <Image
            src={process.env.NEXT_PUBLIC_BASE_URL + author?.avatar?.url}
            alt={author?.avatar?.name}
            width={60}
            height={60}
            className="rounded-full h-[8rem] w-[8rem]"
          />
          <div className="flex flex-col items-center justify-center">
            <h3 className="text-xs md:text-sm lg:text-base">Penulis</h3>
            <h2 className="text-base md:text-lg lg:text-xl font-medium capitalize">
              {author?.name}
            </h2>
            <p className="text-neutral90 text-sm md:text-base lg:text-lg text-center pt-2">
              {author?.bio}
            </p>
          </div>
        </section>
      )}

      {loading ? (
        <div className="grid grid-cols-1 gap-2 md:gap-6 py-6">
          {data?.map((article, index) => (
            <div key={index}>
              <Skeleton className="w-full h-[25rem] rounded-xl " />
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
