import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Authors({ post, author }) {
  return (
    <section className="flex items-center gap-2 md:gap-6 rounded-2xl w-full border border-neutral50 p-6 my-20">
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
        <h3 className="text-xs md:text-sm lg:text-base">Penulis</h3>
        <Link href={`/blog/author/${post?.author?.slug}`}>
          <h2 className="text-base md:text-lg lg:text-xl font-medium">
            {post?.author?.name}
          </h2>
        </Link>
        <p className="text-neutral90 text-sm md:text-base lg:text-lg">
          {post?.author?.bio}
        </p>
      </div>
    </section>
  );
}
