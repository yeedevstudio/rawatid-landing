import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Authors({ post, author }) {
  return (
    <section className="flex items-center gap-2 md:gap-6 lg;gap-10 rounded-2xl w-full py-6 px-6 md:px-12 my-20 bg-green border border-white hover:border-black transition-all duration-300 ease-in-out">
      <Image
        src={
          process.env.NEXT_PUBLIC_BASE_URL +
          author?.[0]?.avatar?.formats?.thumbnail?.url
        }
        alt={author?.[0]?.avatar?.formats?.thumbnail?.name}
        width={60}
        height={60}
        className="rounded-full h-[5rem] w-[5rem]"
      />

      <div>
        <h3 className="text-white text-xs md:text-sm lg:text-base">Penulis</h3>
        <Link href={`/blog/author/${post?.author?.slug}`}>
          <h2 className="text-white text-sm/8 md:text-xl/8 lg:text-2xl/8 font-medium">
            {post?.author?.name}
          </h2>
        </Link>
        <p className="text-white text-xs md:text-base lg:text-lg">
          {post?.author?.bio}
        </p>
      </div>
    </section>
  );
}
