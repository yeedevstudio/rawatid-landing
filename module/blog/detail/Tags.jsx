"use client";

import { useRouter } from "next/navigation";
import React from "react";

export default function Tags({ post }) {
  const router = useRouter();

  return (
    <section className="my-10">
      <h2 className="text-sm md:text-base lg:text-lg font-medium">Tags</h2>
      <div className="pt-6 flex gap-2 md:gap-4">
        {post?.tags?.map((data, index) => (
          <button
            key={index}
            onClick={() => router.push(`/blog/tags/${data?.slug}`)}
            className="p-2 text-xs md:text-sm text-left text-green"
          >
            # {data?.name} ,
          </button>
        ))}
      </div>
    </section>
  );
}
