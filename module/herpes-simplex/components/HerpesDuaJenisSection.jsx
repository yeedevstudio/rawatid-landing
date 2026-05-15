import { IconInfoCircle } from "@tabler/icons-react";
import React from "react";

import { HERPES_CONTENT_INSET } from "@/module/herpes-simplex/herpesLayoutClasess";

const JENIS_DATA = [
  {
    src: "/image/bibir.png",
    alt: "HSV tipe 1 - herpes oral",
    title: "HSV tipe 1 (HSV-1)",
    points: [
      <>Umumnya menyebabkan herpes oral, yaitu luka di sekitar bibir, mulut dan gusi yang sering disebut <em>cold sore</em> atau <em>fever blister</em>.</>,
      "Penularan utama melalui ciuman atau kontak mulut, bisa diderita sejak usia anak-anak.",
      <>Bisa juga menginfeksi area <em>genital</em> melalui kontak <em>oral-genital</em> (<em>seks oral</em>).</>,
    ],
  },
  {
    src: "/image/hsv.png",
    alt: "HSV tipe 2 - herpes genital",
    title: "HSV tipe 2 (HSV-2)",
    points: [
      <>Umumnya menyebabkan <em>herpes genital</em>, yaitu luka di area kelamin, bokong, dan paha.</>,
      "Penularan hampir selalu melalui kontak seksual.",
      <>Lebih sering mengalami kekambuhan dibandingkan HSV-1 <em>genital</em>.</>,
    ],
  },
];

function JenisCard({ src, alt, title, points }) {
  return (
    <div className="flex items-start gap-6 rounded-2xl border border-neutral-200/90 bg-white px-6 py-7 md:gap-8 md:px-8 md:py-8">
      <img
        src={src}
        alt={alt}
        className="h-auto w-[80px] shrink-0 rounded-full object-cover md:w-[100px] lg:w-[120px]"
      />
      <div className="min-w-0 space-y-3">
        <h3 className="text-[16px] font-semibold leading-snug text-[#038F7A] md:text-[17px] lg:text-[18px]">
          {title}
        </h3>
        <ul className="space-y-2">
          {points.map((point, i) => (
            <li key={i} className="flex items-start gap-2 text-[14px] leading-relaxed text-neutral-700 md:text-[15px] lg:text-[16px]">
              <span className="mt-[6px] h-[6px] w-[6px] shrink-0 rounded-full bg-[#038F7A]" aria-hidden />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function HerpesDuaJenisSection() {
  return (
    <section className="bg-white px-5 py-12 md:px-12 md:py-16 lg:px-20 xl:px-24">
      <div className={HERPES_CONTENT_INSET}>
        <h2 className="mb-8 text-[1.375rem] font-semibold leading-tight tracking-tight text-[#038F7A] md:mb-10 md:text-[1.5rem] lg:text-[1.625rem] xl:text-[1.6875rem]">
          Dua Jenis <em>Herpes Simplex</em> Virus
        </h2>

        <div data-aos="fade-up" suppressHydrationWarning className="space-y-5 md:space-y-6">
          {JENIS_DATA.map((item, i) => (
            <JenisCard key={i} {...item} />
          ))}

          <div className="flex items-start gap-4 rounded-2xl border border-[#F5A623]/40 bg-[#FFF8EC] px-6 py-6 md:px-8 md:py-7">
            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#F5A623]/60 bg-white text-[#F5A623]">
              <IconInfoCircle className="h-5 w-5 stroke-[1.5]" aria-hidden />
            </div>
            <div className="min-w-0 space-y-2">
              <p className="text-[15px] font-semibold leading-snug text-[#D97706] md:text-[16px]">
                Penting untuk Diketahui
              </p>
              <p className="text-[14px] font-normal leading-relaxed text-neutral-700 md:text-[15px]">
                Kedua tipe HSV sebenarnya bisa menginfeksi area tubuh manapun. HSV-1 bisa ditemukan di
                genital, dan HSV-2 bisa ditemukan di mulut. Perbedaannya hanya pada lokasi yang paling
                umum dan frekuensi kekambuhannya.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
