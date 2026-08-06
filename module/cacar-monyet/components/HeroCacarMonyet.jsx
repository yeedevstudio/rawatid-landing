import React from "react";

export default function HeroCacarMonyet() {
  return (
    <section className="w-full px-5 pb-12 pt-12 md:px-12 md:pb-16 md:pt-16 lg:px-20 lg:pb-20 lg:pt-20 xl:px-24">
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div data-aos="fade-right" suppressHydrationWarning className="flex flex-col gap-4 text-left md:gap-6">
          <h1 className="text-[32px] font-bold leading-[1.15] tracking-tight text-[#038F7A] sm:text-[40px] md:text-[48px] lg:text-[52px]">
            Cacar Monyet <em>(Mpox)</em>
          </h1>
          <p className="max-w-none text-[15px] font-normal leading-relaxed text-neutral-600 sm:text-[16px] md:text-[18px]">
            Bintik merah yang menyebar ke seluruh tubuh, lepuhan berisi cairan yang gatal dan nyeri, serta demam
            tinggi dengan pembengkakan kelenjar getah bening merupakan gejala khas Cacar Monyet. Penyakit ini
            menjadi perhatian dunia pada tahun 2022 saat wabahnya menyebar ke lebih dari 100 negara, meskipun
            virus penyebabnya telah dikenal sejak 1958 dan menginfeksi manusia di Afrika sejak 1970.
          </p>
        </div>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          data-aos="fade-left"
          suppressHydrationWarning
          src="/image/cacarmonyet.webp"
          alt="Ilustrasi Cacar Monyet"
          className="h-auto w-full max-w-lg justify-self-center lg:max-w-none"
        />
      </div>
    </section>
  );
}
