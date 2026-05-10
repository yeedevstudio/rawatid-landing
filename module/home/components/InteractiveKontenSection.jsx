"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

const SOURCES = [
  "/image/alergii.png",
  "/image/lips.png",
  "/image/jantung.png",
];

export default function InteractiveKontenSection() {
  return (
    <section className="w-full px-5 md:px-12 lg:px-20 xl:px-24 py-12 md:py-16 lg:py-20">
      <h2 className="text-xl md:text-2xl font-semibold text-[#038F7A] text-left mb-6 md:mb-8">
        Interaktif Konten
      </h2>

      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex w-max mx-auto">
          {SOURCES.map((src, i) =>
            i === 0 ? (
              <Link key={src} href="/dbd" className="shrink-0 block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#038F7A]">
                <Image
                  src={src}
                  alt=""
                  width={428}
                  height={546}
                  className="shrink-0"
                  priority
                />
              </Link>
            ) : (
              <Image
                key={src}
                src={src}
                alt=""
                width={428}
                height={546}
                className="shrink-0"
                priority={false}
              />
            ),
          )}
        </div>
      </div>
    </section>
  );
}
