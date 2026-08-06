"use client";

import { CardArticleSidebar } from "@/common/components/CardArticle";
import ContainerBlog from "@/common/components/ContainerBlog";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter, useSearchParams } from "next/navigation";

import { useEffect, useState } from "react";
import BlogAll from "../components/BlogAll";
import Link from "next/link";
import Image from "next/image";
import { AvatarSection } from "@/common/components/Avatar";
import Breadcrumbs from "@/common/components/Breadcrumbs";

export default function PageBy({ data, post, slug, title, author, pagination, currentPage }) {
  const router = useRouter();
  const sp = useSearchParams();
  const [selected, setSelected] = useState("");
  const [loading, setLoading] = useState(!data);

  const handleSelected = (index, slug) => {
    setSelected(index);
    router.push(`/blog/detail/${slug}`);
  };

  // Dulu di sini ada setTimeout 2 detik yang menahan skeleton walaupun `data`
  // sudah tersedia sebagai prop dari server — murni penundaan buatan, dan
  // membuat konten tidak ikut ter-render di HTML. Sekarang loading langsung
  // mengikuti ada/tidaknya data.
  useEffect(() => {
    setLoading(!data);
  }, [data]);

  const blogFilter = data || [];

  const page = Number(currentPage || pagination?.page || sp?.get("page") || 1);
  const pageCount = Number(pagination?.pageCount || 1);

  const goToPage = (p) => {
    const next = Math.min(Math.max(1, p), pageCount || 1);
    const params = new URLSearchParams(sp?.toString() || "");
    params.set("page", String(next));
    router.push(`?${params.toString()}`);
  };

  return (
    <ContainerBlog>
      <Breadcrumbs
        items={[
          { label: "Beranda", href: "/" },
          { label: "Artikel", href: "/blog/semua" },
          { label: `${title} ${slug ? `- ${slug}` : ""}`.trim(), href: "#" },
        ]}
      />
      <h1 className="text-lg md:text-xl lg:text-2xl font-medium text-green">
        {title} : {slug}
      </h1>

      {author && (
        <section className="flex flex-col  items-center gap-2 md:gap-6 lg:gap-10 rounded-2xl w-full py-6 px-1 md:px-12 lg:px-24 my-20 border">
          <AvatarSection
            src={
              process.env.NEXT_PUBLIC_BASE_URL +
              (author?.avatar?.formats?.large?.url ||
                author?.avatar?.medium?.url ||
                author?.avatar?.url)
            }
            alt={
              author?.avatar?.alternativeText ||
              author?.avatar?.name ||
              author?.avatar?.hash
            }
          />
          <div className="flex flex-col items-center justify-center ">
            <span itemProp="author" className="text-xs md:text-sm lg:text-base">
              Penulis
            </span>

            <h2 className=" text-base/8 md:text-xl/8 lg:text-2xl/8 font-semibold py-2 md:py-4">
              {author?.name}
            </h2>

            <p className=" text-xs md:text-sm lg:text-sm text-center  text-neutral90 px-12">
              <span
                itemProp="qoute"
                className="md:font-semibold md:text-lg mr-1"
              >
                "
              </span>
              {author?.bio.split(" ").slice(0, 50).join(" ")}
              <span
                itemProp="qoute"
                className="md:font-semibold md:text-lg ml-1"
              >
                "
              </span>
            </p>
          </div>
        </section>
      )}

      {loading ? (
        <div className="grid grid-cols-1 gap-2 md:gap-4 py-6">
          {data?.map((article, index) => (
            <div key={index}>
              <Skeleton className="w-full h-[16rem] md:h-[16rem] lg:h-[19rem] rounded-xl " />
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-1 gap-2 md:gap-4 py-6 transition-all duration-150 ease-in-out">
            {blogFilter?.map((article, index) => (
              <div key={article?.slug || index} className={article.span}>
                <CardArticleSidebar
                  src={article?.thumbnail?.formats?.small?.url}
                  alt={article?.thumbnail?.formats?.small?.url}
                  category={article.category?.name}
                  title={article.title}
                  height={"h-[12rem] md:h-[14rem] lg:h-[18rem]"}
                  index={index}
                  selected={selected === index}
                  onSelect={() => handleSelected(index, article.slug)}
                  headline={article.headline}
                />
              </div>
            ))}
          </div>

          {pageCount > 1 && (
            <div className="flex items-center justify-center gap-2 pt-2 pb-6">
              <button
                type="button"
                onClick={() => goToPage(page - 1)}
                disabled={page <= 1}
                className={`px-3 py-2 rounded-md border text-sm ${page <= 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-50"}`}
              >
                Sebelumnya
              </button>

              {Array.from({ length: pageCount }).slice(Math.max(0, page - 3), Math.min(pageCount, page + 2)).map((_, i, arr) => {
                const start = Math.max(1, page - 2);
                const p = start + i;
                const active = p === page;
                return (
                  <button
                    key={p}
                    type="button"
                    onClick={() => goToPage(p)}
                    className={`w-9 h-9 rounded-md border text-sm ${active ? "bg-green text-white border-green" : "hover:bg-gray-50 text-gray-700"}`}
                    aria-current={active ? "page" : undefined}
                  >
                    {p}
                  </button>
                );
              })}

              <button
                type="button"
                onClick={() => goToPage(page + 1)}
                disabled={page >= pageCount}
                className={`px-3 py-2 rounded-md border text-sm ${page >= pageCount ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-50"}`}
              >
                Berikutnya
              </button>
            </div>
          )}
        </>
      )}

      <BlogAll data={post} />
    </ContainerBlog>
  );
}
