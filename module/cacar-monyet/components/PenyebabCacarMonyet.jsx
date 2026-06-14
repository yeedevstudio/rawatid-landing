"use client";

import React, { useState } from "react";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

const SLIDES = [
  {
    title: "Penyebab Cacar Monyet, yaitu Monkeypox Virus (MPXV)",
    intro: "Mpox disebabkan oleh Monkeypox Virus, yang memiliki karakteristik unik sebagai berikut:",
    bullets: [
      {
        label: "Virus DNA berukuran besar (200–250 nm),",
        text: "termasuk virus terbesar yang dapat menginfeksi manusia.",
      },
      {
        label: "Memiliki amplop lipid ganda",
        text: "yang membuatnya relatif mudah dinonaktifkan oleh sabun, detergen, dan desinfektan umum.",
      },
      {
        label: "Lebih stabil di lingkungan dibanding Virus Influenza,",
        text: "namun kurang stabil dibanding Spora bakteri.",
      },
      {
        label: "Sangat mirip secara genetik dengan Virus Cacar,",
        text: "sehingga Vaksin Cacar (Smallpox) memberikan perlindungan silang sekitar 85% terhadap Mpox.",
      },
    ],
  },
  {
    title: "Cara Penularan dari Hewan ke Manusia (Zoonosis)",
    intro: "Penularan Mpox dari hewan ke manusia dapat terjadi melalui berbagai cara:",
    bullets: [
      {
        label: "Kontak langsung dengan hewan terinfeksi,",
        text: "menyentuh, digigit, atau dicakar hewan yang terinfeksi seperti tikus, tupai tanah, atau primata di Afrika.",
      },
      {
        label: "Mengonsumsi daging hewan liar (bushmeat)",
        text: "yang tidak dimasak matang sempurna, terutama di daerah endemis Afrika.",
      },
      {
        label: "Paparan cairan tubuh hewan,",
        text: "darah, urin, feses, atau cairan luka hewan yang terinfeksi dapat mengandung virus dalam konsentrasi tinggi.",
      },
      {
        label: "Hewan peliharaan yang terpapar,",
        text: "pada wabah 2003 di Amerika Serikat, anjing prairie yang bersentuhan dengan tikus Gambia impor menjadi perantara penularan ke manusia.",
      },
    ],
  },
  {
    title: "Cara Penularan antar Manusia",
    intro: "Penularan Mpox antar manusia terjadi melalui kontak erat dan langsung:",
    bullets: [
      {
        label: "Kontak langsung dengan lesi kulit atau selaput lendir,",
        text: "menyentuh ruam, bintik, atau luka terbuka penderita adalah jalur utama penularan antar manusia.",
      },
      {
        label: "Droplet pernapasan jarak dekat,",
        text: "berbeda dengan cacar, Mpox tidak mudah menyebar lewat udara. Penularan droplet memerlukan kontak tatap muka berkepanjangan (>3 jam).",
      },
      {
        label: "Kontak seksual dan intim,",
        text: "pada wabah 2022, mayoritas penularan terjadi melalui kontak seksual intim antar pria yang berhubungan seksual dengan pria (MSM), namun siapapun dapat terinfeksi.",
      },
      {
        label: "Benda yang terkontaminasi (fomit),",
        text: "pakaian, seprai, handuk, atau peralatan makan yang terkontaminasi cairan lesi penderita dapat menjadi sumber penularan.",
      },
    ],
  },
];

export default function PenyebabCacarMonyet() {
  const [active, setActive] = useState(0);

  const prev = () => setActive((i) => (i - 1 + SLIDES.length) % SLIDES.length);
  const next = () => setActive((i) => (i + 1) % SLIDES.length);

  const slide = SLIDES[active];

  return (
    <section
      id="penyebab-risiko"
      className="scroll-mt-24 w-full bg-white px-5 py-12 md:px-12 md:py-16 lg:px-20 lg:py-20 xl:px-24"
    >
      <div data-aos="fade-up" suppressHydrationWarning>
        <h2 className="text-[32px] font-semibold text-[#038F7A]">
          Penyebab dan Cara Penularan Cacar Monyet
        </h2>

        <hr className="mt-8 border-[#038F7A]/30 md:mt-10" />

        {/* Slider */}
        <div className="relative mt-8 md:mt-10">
          <button
            type="button"
            onClick={prev}
            aria-label="Sebelumnya"
            className="absolute -left-3 top-1/2 z-10 -translate-y-1/2 p-1 text-[#038F7A] transition hover:opacity-70 md:-left-5"
          >
            <IconChevronLeft className="h-9 w-9 stroke-[1.5]" />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Selanjutnya"
            className="absolute -right-3 top-1/2 z-10 -translate-y-1/2 p-1 text-[#038F7A] transition hover:opacity-70 md:-right-5"
          >
            <IconChevronRight className="h-9 w-9 stroke-[1.5]" />
          </button>

          <div className="px-12 md:px-16 lg:px-20">
            <h3 className="text-[16px] font-bold text-[#038F7A] md:text-[18px]">{slide.title}</h3>
            <p className="mt-3 text-[14px] leading-relaxed text-neutral-700 md:text-[15px] md:leading-[1.7]">
              {slide.intro}
            </p>

            <ul className="mt-4 space-y-3">
              {slide.bullets.map(({ label, text }, i) => (
                <li key={i} className="flex gap-2 text-[14px] leading-relaxed text-neutral-700 md:text-[15px] md:leading-[1.7]">
                  <span className="mt-[6px] h-2 w-2 shrink-0 rounded-full bg-[#038F7A]" aria-hidden />
                  <span>{label} {text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Dot indicators */}
          <div className="mt-8 flex justify-center gap-2">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Slide ${i + 1}`}
                className={`h-2.5 w-2.5 rounded-full border-2 transition-colors duration-200 ${
                  i === active ? "border-[#038F7A] bg-[#038F7A]" : "border-neutral-300 bg-transparent"
                }`}
              />
            ))}
          </div>
        </div>

        <hr className="mt-8 border-[#038F7A]/30 md:mt-10" />
      </div>
    </section>
  );
}
