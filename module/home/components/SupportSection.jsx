"use client";

import React from "react";
import Image from "next/image";

function CircleIcon({ src, alt }) {
  return (
    <div className="w-[64px] h-[64px] rounded-full bg-white/90 flex items-center justify-center">
      <Image
        src={src}
        alt={alt}
        width={34}
        height={34}
        className="object-contain"
      />
    </div>
  );
}

const ITEMS = [
  {
    title: "Informasi Obat",
    src: "/images/obat.png",
    alt: "Informasi Obat",
  },
  {
    title: "Informasi RS\ndan Klinik",
    src: "/images/gedung.png",
    alt: "Informasi RS dan Klinik",
  },
  {
    title: "Kalkulator BMI",
    src: "/images/timbangan.png",
    alt: "Kalkulator BMI",
  },
  {
    title: "Pengingat\nMinum Obat",
    src: "/images/jam.png",
    alt: "Pengingat Minum Obat",
  },
  {
    title: "Personal\nHealth Record",
    src: "/images/heart.png",
    alt: "Personal Health Record",
  },
  {
    title: "Rencana Diet",
    src: "/images/note.png",
    alt: "Rencana Diet",
  },
  {
    title: "Referensi Menu\nDiet",
    src: "/images/reference.png",
    alt: "Referensi Menu Diet",
  },
];

export default function SupportSection() {
  return (
    <section
      data-aos="fade-up"
      suppressHydrationWarning
      className="w-full bg-[#038F7A]"
    >
      <div className="px-5 md:px-12 lg:px-20 xl:px-24 py-10 md:py-12">
        <h2 className="text-white text-xl md:text-2xl font-semibold">
          Dukungan untuk Berbagai Kebutuhan Kesehatan
        </h2>
        <p className="text-white/90 text-sm md:text-base mt-1">
          Akses berbagai fitur untuk membantu Anda memahami obat dan memantau
          kesehatan.
        </p>

        <div className="mt-7 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-y-8 gap-x-6 items-start">
          {ITEMS.map((item) => (
            <div key={item.title} className="flex flex-col items-center text-center">
              <CircleIcon src={item.src} alt={item.alt} />
              <div className="mt-3 text-white text-sm leading-snug whitespace-pre-line">
                {item.title}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

