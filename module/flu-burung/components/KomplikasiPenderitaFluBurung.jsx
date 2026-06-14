"use client";

import React, { useState } from "react";
import { IconChevronLeft, IconChevronRight, IconInfoCircle } from "@tabler/icons-react";

const SLIDES = [
  {
    title: "Komplikasi Pada Paru dan Pernapasan",
    bullets: [
      {
        label: "Pneumonia virus primer berat.",
        text: "Tidak seperti Pneumonia Influenza musiman yang sering ringan, pneumonia H5N1 berkembang cepat menjadi bilateral atau kedua paru dan luas. Ini berbeda dari Pneumonia bakteri sekunder yang lazim pada flu biasa.",
      },
      {
        label: "ARDS (Acute Respiratory Distress Syndrome).",
        text: "Kegagalan pernapasan berat yang terjadi pada 70–80% kasus H5N1 yang dirawat di rumah sakit. ARDS pada Flu Burung sering refrakter atau sulit diatasi terhadap pengobatan konvensional.",
      },
      {
        label: "Pneumothoraks.",
        text: "Kebocoran udara ke rongga Pleura akibat kerusakan jaringan paru atau barotrauma akibat ventilator.",
      },
      {
        label: "Fibrosis paru.",
        text: "Pada penyintas ARDS berat, jaringan paru yang rusak dapat tergantikan oleh jaringan ikat (fibrosis), menyebabkan gangguan pernapasan permanen.",
      },
    ],
  },
  {
    title: "Komplikasi Pada Sistem Saraf",
    bullets: [
      {
        label: "Ensefalitis.",
        text: "Peradangan otak yang dapat menyebabkan kejang, penurunan kesadaran, hingga koma. Lebih sering dilaporkan pada anak-anak yang terinfeksi H5N1.",
      },
      {
        label: "Ensefalopati.",
        text: "Disfungsi otak akibat hipoksia berat, badai sitokin, atau efek langsung virus pada jaringan saraf pusat.",
      },
      {
        label: "Neuropati perifer.",
        text: "Kerusakan saraf tepi yang dapat menyebabkan kelemahan otot dan gangguan sensorik sebagai komplikasi jangka panjang.",
      },
      {
        label: "Stroke iskemik.",
        text: "Pada kasus berat dengan koagulopati dan gangguan hemodinamik, risiko stroke meningkat secara signifikan.",
      },
    ],
  },
  {
    title: "Komplikasi Pada Jantung dan Pembuluh Darah",
    bullets: [
      {
        label: "Miokarditis.",
        text: "Peradangan otot jantung akibat infeksi virus langsung atau respons imun berlebih, dapat menyebabkan gagal jantung akut dan aritmia yang mengancam jiwa.",
      },
      {
        label: "Syok septik.",
        text: "Kegagalan sirkulasi akibat respons inflamasi sistemik masif (badai sitokin), menyebabkan penurunan perfusi ke seluruh organ.",
      },
      {
        label: "Koagulopati intravaskular diseminata (DIC).",
        text: "Gangguan pembekuan darah menyeluruh yang dapat menyebabkan perdarahan masif sekaligus pembentukan bekuan darah di pembuluh kecil.",
      },
      {
        label: "Hipotensi refrakter.",
        text: "Tekanan darah rendah yang sulit ditangani dengan terapi standar, memerlukan vasopressor dan penanganan ICU intensif.",
      },
    ],
  },
  {
    title: "Komplikasi Multiorgan dan Lainnya",
    bullets: [
      {
        label: "Gagal ginjal akut.",
        text: "Kerusakan ginjal akibat hipoksia sistemik, badai sitokin, dan efek langsung virus, sering memerlukan hemodialisis.",
      },
      {
        label: "Gagal hati.",
        text: "Peningkatan enzim hati dan disfungsi hati ditemukan pada sebagian kasus H5N1, mencerminkan keterlibatan multiorgan.",
      },
      {
        label: "Rabdomiolisis.",
        text: "Kerusakan jaringan otot rangka yang melepaskan mioglobin ke aliran darah, dapat memperparah kerusakan ginjal.",
      },
      {
        label: "Multiple Organ Dysfunction Syndrome (MODS).",
        text: "Kegagalan lebih dari dua organ secara bersamaan adalah penyebab utama kematian pada kasus Flu Burung H5N1 yang berat.",
      },
    ],
  },
];

export default function KomplikasiPenderitaFluBurung() {
  const [active, setActive] = useState(0);

  const prev = () => setActive((i) => (i - 1 + SLIDES.length) % SLIDES.length);
  const next = () => setActive((i) => (i + 1) % SLIDES.length);

  const slide = SLIDES[active];

  return (
    <section className="w-full bg-white px-5 py-12 md:px-12 md:py-16 lg:px-20 lg:py-20 xl:px-24">
      <div data-aos="fade-up" suppressHydrationWarning>
        <h2 className="text-2xl font-bold text-[#038F7A] md:text-3xl lg:text-[2rem]">
          Komplikasi pada Penderita Flu Burung
        </h2>
        <p className="mt-5 text-[15px] leading-relaxed text-neutral-700 md:text-[17px] md:leading-[1.7]">
          Flu burung H5N1 dan subtipe HPAI lainnya memiliki kemampuan merusak yang jauh melampaui influenza biasa.
          Kompleksitas komplikasinya mencerminkan kemampuan virus merusak hampir setiap sistem organ tubuh.
        </p>

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

            <ul className="mt-4 space-y-3">
              {slide.bullets.map(({ label, text }, i) => (
                <li key={i} className="flex gap-2 text-[14px] leading-relaxed text-neutral-700 md:text-[15px] md:leading-[1.7]">
                  <span className="mt-[6px] h-2 w-2 shrink-0 rounded-full bg-[#038F7A]" aria-hidden />
                  <span>
                    <strong>{label}</strong> {text}
                  </span>
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

        {/* Pesan Akhir */}
        <div className="mt-8 rounded-2xl p-5 shadow-[0px_0px_12.1px_0px_#0000001A] md:mt-10 md:p-6">
          <div className="flex gap-3 md:gap-4">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#038F7A]/10 text-[#038F7A] md:h-10 md:w-10">
              <IconInfoCircle className="h-5 w-5 stroke-[1.5] md:h-6 md:w-6" aria-hidden />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-[24px] font-semibold leading-snug text-[#038F7A]">
                Pesan Akhir
              </h3>
              <p className="mt-2 tracking-[0] text-[20px] font-medium leading-relaxed text-neutral-800 md:mt-3 md:leading-[1.65]">
                Flu Burung adalah ancaman kesehatan nyata yang memerlukan kewaspadaan, bukan kepanikan.
                Lindungi diri dengan menghindari kontak langsung dengan unggas sakit atau mati, selalu mencuci
                tangan setelah menyentuh unggas, memasak unggas dan telur hingga matang sempurna, dan segera
                ke dokter jika mengalami demam setelah kontak dengan unggas.
              </p>
              <p className="mt-3 tracking-[0] text-[20px] font-medium leading-relaxed text-neutral-800 md:leading-[1.65]">
                Peternak unggas wajib menggunakan APD dan melaporkan unggas yang mati mendadak ke Dinas
                Peternakan setempat. Kewaspadaan bersama adalah kunci mencegah Flu Burung berkembang menjadi
                ancaman pandemi global.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
