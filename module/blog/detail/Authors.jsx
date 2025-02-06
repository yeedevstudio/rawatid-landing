import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Authors({ post, author }) {
  return (
    <section className="flex flex-col md:flex-row items-center gap-2 md:gap-6 lg:gap-10 rounded-2xl w-full py-6 px-1 md:px-12 lg:px-24 my-20 bg-green border border-white hover:border-black transition-all duration-300 ease-in-out">
      <div className="relative w-[5rem] h-[5rem] md:h-[10rem] md:w-[10rem] rounded-full overflow-hidden">
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

      <div className="w-[70%] flex flex-col items-center justify-cente md:items-start md:justify-start">
        <h3 className="text-white text-xs md:text-sm lg:text-base">Penulis</h3>
        <Link href={`/blog/author/${post?.author?.slug}`}>
          <h2 className="text-white text-base/8 md:text-xl/8 lg:text-2xl/8 font-medium capitalize">
            {post?.author?.name}
          </h2>
        </Link>
        <p className="text-white text-xs md:text-base lg:text-lg text-center md:text-justify">
          {post?.author?.bio}
        </p>
      </div>
    </section>
  );
}
