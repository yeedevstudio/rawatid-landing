import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Authors({ post, author }) {
  return (
    <section className="flex flex-col md:flex-row items-center gap-2 md:gap-6 lg:gap-10 rounded-2xl w-full py-6 px-1 md:px-12 lg:px-24 my-20  border  hover:border-green transition-all duration-300 ease-in-out">
      <div className="relative w-[5rem] h-[5rem] md:h-[7rem] md:w-[7rem] lg:h-[10rem] lg:w-[10rem] rounded-full overflow-hidden border">
        <Image
          src={
            process.env.NEXT_PUBLIC_BASE_URL +
            author?.[0]?.avatar?.formats?.thumbnail?.url
          }
          alt={author?.[0]?.avatar?.formats?.thumbnail?.name}
          fill
          style={{ objectFit: "cover", position: "absolute" }}
        />
      </div>

      <div className="flex flex-col items-center justify-cente md:items-start md:justify-start">
        <span itemProp="author" className="text-xs md:text-sm lg:text-base">
          Penulis
        </span>
        <Link href={`/blog/penulis/${post?.author?.slug}`} title="Penulis">
          <h2 className=" text-base/8 md:text-xl/8 lg:text-2xl/8 font-semibold capitalize mt-2">
            {post?.author?.name}
          </h2>
        </Link>
        <p className=" text-xs md:text-sm lg:text-sm text-center md:text-justify text-neutral90">
          <span itemProp="qoute" className="font-semibold text-lg mr-1">
            "
          </span>
          {post?.author?.bio.split(" ").slice(0, 50).join(" ")}
          <span itemProp="qoute" className="font-semibold text-lg ml-1">
            "
          </span>
        </p>
      </div>
    </section>
  );
}
