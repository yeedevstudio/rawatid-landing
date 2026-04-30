"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

function CircleIcon({ src, alt }) {
  return (
    <div className="w-[64px] h-[64px] rounded-full bg-white/90 flex items-center justify-center transition duration-200 motion-reduce:transition-none group-hover:bg-white group-hover:scale-[1.06] group-active:scale-95 group-focus-visible:ring-2 group-focus-visible:ring-white/90 group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-[#038F7A]">
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
    href: "/informasi-kesehatan/informasi-obat",
  },
  {
    title: "Informasi RS\ndan Klinik",
    src: "/images/gedung.png",
    alt: "Informasi RS dan Klinik",
    href: "/informasi-kesehatan/informasi-rs-dan-klinik",
  },
  {
    title: "Kalkulator BMI",
    src: "/images/timbangan.png",
    alt: "Kalkulator BMI",
    href: "/alat-kesehatan/kalkulator-bmi",
  },
  {
    title: "Pengingat\nMinum Obat",
    src: "/images/jam.png",
    alt: "Pengingat Minum Obat",
    href: "/alat-kesehatan/pengingat-minum-obat",
  },
  {
    title: "Personal\nHealth Record",
    src: "/images/heart.png",
    alt: "Personal Health Record",
    href: "/alat-kesehatan/personal-health-record",
  },
  {
    title: "Rencana Diet",
    src: "/images/note.png",
    alt: "Rencana Diet",
    href: "/alat-kesehatan/rencana-diet",
  },
  {
    title: "Referensi Menu\nDiet",
    src: "/images/reference.png",
    alt: "Referensi Menu Diet",
    href: "/informasi-kesehatan/informasi-menu-diet",
  },
  {
    title: "Tenaga\nKesehatan",
    src: "/images/heart.png",
    alt: "Tenaga Kesehatan",
    href: "/blog/kategori/tenaga-kesehatan",
  },
  {
    title: "Fasilitas\nKesehatan",
    src: "/images/gedung.png",
    alt: "Fasilitas Kesehatan",
    href: "/blog/kategori/fasilitas-kesehatan",
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

        <div className="mt-7 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-9 gap-y-8 gap-x-4 lg:gap-x-5 items-start">
          {ITEMS.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              aria-label={item.alt}
              className="group flex flex-col items-center text-center select-none"
            >
              <CircleIcon src={item.src} alt={item.alt} />
              <div className="mt-3 text-white text-sm leading-snug whitespace-pre-line">
                {item.title}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

