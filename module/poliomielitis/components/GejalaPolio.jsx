"use client";

import React, { useState } from "react";
import { IconInfoCircle } from "@tabler/icons-react";

const SLIDES = [
  {
    title: "Infeksi Tanpa Gejala (Inapparent/Asimtomatik) — 72% kasus",
    text: "Mayoritas orang yang terinfeksi poliovirus sama sekali tidak merasakan gejala apa pun. Namun mereka tetap menularkan virus kepada orang lain melalui tinja. Inilah sebabnya polio sulit dihentikan penyebarannya hanya dengan mengandalkan pemantauan gejala.",
  },
  {
    title: "Penyakit Minor (Abortive Poliomyelitis) — 24% kasus",
    text: "Gejala ringan seperti demam, sakit tenggorokan, mual, muntah, dan nyeri perut. Berlangsung 1–3 hari lalu sembuh sempurna. Pasien tidak mengalami keterlibatan sistem saraf.",
  },
  {
    title: "Polio Non-Paralitik (Meningitis Aseptik) — 1–5% kasus",
    text: "Virus menyerang selaput otak dan sumsum tulang belakang. Gejala: demam, nyeri kepala berat, kaku kuduk, nyeri punggung dan kaki. Berlangsung 2–10 hari dan umumnya pulih sempurna.",
  },
  {
    title: "Polio Paralitik — <1% kasus",
    text: "Bentuk paling berat. Virus menyerang sel saraf motorik di sumsum tulang belakang (spinal) atau batang otak (bulbar). Menyebabkan kelumpuhan mendadak, asimetris, dan bisa permanen. Otot pernapasan bisa ikut lumpuh dan mengancam jiwa.",
  },
];

const TAHAPAN = [
  "Fase 1 (Prodromal, hari 1–3): Demam, sakit kepala, nyeri tenggorokan, mirip flu",
  "Fase 2 (Preparalitik, hari 3–7): Gejala memburuk, muncul nyeri otot hebat dan kaku, sering disertai kejang otot",
  "Fase 3 (Paralitik, mulai hari ke-7): Kelumpuhan mendadak yang bisa terjadi dalam jam. Biasanya tidak disertai nyeri setelah kelumpuhan terbentuk. Tidak ada perubahan sensasi (tidak mati rasa)",
  "Fase 4 (Pemulihan, minggu ke 2 dst): Sebagian fungsi otot bisa kembali dalam 6–12 bulan pertama. Fungsi yang tidak pulih dalam 12–18 bulan kemungkinan besar akan permanen",
];

export default function GejalaPolio() {
  const [active, setActive] = useState(0);

  const prev = () => setActive((i) => (i === 0 ? SLIDES.length - 1 : i - 1));
  const next = () => setActive((i) => (i === SLIDES.length - 1 ? 0 : i + 1));

  const slide = SLIDES[active];

  return (
    <section className="w-full bg-white px-5 py-12 md:px-12 md:py-16 lg:px-20 lg:py-20 xl:px-24">
      <div data-aos="fade-up" suppressHydrationWarning>
        <h2 className="text-2xl font-bold text-[#038F7A] md:text-3xl lg:text-[2rem]">
          Tanda dan Gejala <em>Poliomielitis</em>
        </h2>
        <p className="mt-4 text-[15px] font-normal leading-relaxed text-neutral-700 md:text-[17px] md:leading-[1.7]">
          Polio sangat licik karena sebagian besar infeksi tidak menunjukkan gejala sama sekali. Ini yang membuat
          virus mudah menyebar tanpa terdeteksi. Berikut adalah spektrum klinis infeksi poliovirus:
        </p>

        {/* Carousel */}
        <div className="mt-6">
          <hr className="border-[#038F7A]/40" />

          <div className="relative px-10 py-8 md:px-16 md:py-10">
            {/* Tombol kiri */}
            <button
              type="button"
              onClick={prev}
              aria-label="Slide sebelumnya"
              className="absolute left-0 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full text-[#038F7A] transition-colors hover:bg-[#038F7A]/10"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {/* Tombol kanan */}
            <button
              type="button"
              onClick={next}
              aria-label="Slide berikutnya"
              className="absolute right-0 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full text-[#038F7A] transition-colors hover:bg-[#038F7A]/10"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {/* Konten slide */}
            <div className="min-h-[200px]">
              <h4 className="mb-4 text-center text-[15px] font-bold text-neutral-800 md:text-[16px] lg:text-[17px]">
                {slide.title}
              </h4>
              <p className="text-center text-[14px] font-normal leading-relaxed text-neutral-700 md:text-[15px] md:leading-[1.7]">
                {slide.text}
              </p>
            </div>

            {/* Dots */}
            <div className="mt-6 flex justify-center gap-2">
              {SLIDES.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`Slide ${i + 1}`}
                  className={`h-2.5 w-2.5 rounded-full transition-colors ${
                    i === active ? "bg-[#038F7A]" : "bg-neutral-300"
                  }`}
                />
              ))}
            </div>
          </div>

          <hr className="border-[#038F7A]/40" />
        </div>

        {/* Teal callout */}
        <aside
          className="mt-8 w-full rounded-2xl border border-[#038F7A] bg-white p-4 md:mt-10 md:p-5 lg:p-6"
          aria-label="Tahapan gejala polio paralitik"
        >
          <div className="flex gap-3 md:gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#038F7A]/10 text-[#038F7A] md:h-11 md:w-11">
              <IconInfoCircle className="h-6 w-6 stroke-[1.5] md:h-7 md:w-7" aria-hidden />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-[15px] font-bold leading-tight text-[#038F7A] md:text-base">
                Tahapan Gejala pada Polio Paralitik:
              </h3>
              <ul className="mt-3 flex flex-col gap-2">
                {TAHAPAN.map((item, i) => (
                  <li key={i} className="flex gap-2 text-[13px] leading-relaxed text-neutral-800 md:text-[14px]">
                    <span className="mt-[5px] h-[6px] w-[6px] shrink-0 rounded-full bg-[#038F7A]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
