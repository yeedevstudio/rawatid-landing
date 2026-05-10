import React from "react";

export default function DbdHeroSection() {
  return (
    <section className="w-full px-5 md:px-12 lg:px-20 xl:px-24 py-12 md:py-16 lg:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <div className="flex flex-col gap-4 md:gap-6 text-left">
          <h1 className="text-[32px] sm:text-[40px] md:text-[48px] lg:text-[52px] font-bold leading-[1.15] text-[#DB1A1A] tracking-tight">
            <span className="block">Demam Berdarah</span>
            <span className="block">Dengue (DBD)</span>
          </h1>
          <p className="text-[16px] sm:text-[18px] md:text-[20px] leading-relaxed text-neutral-600 max-w-xl">
            <span className="block">Panduan Lengkap Berbasis Bukti Ilmiah untuk</span>
            <span className="block">Masyarakat Umum</span>
          </p>
        </div>

        {/* Gambar kanan: file apa adanya dari Figma, tanpa kelas/ukuran/background */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/image/nyamuk.png" alt="" />
      </div>
    </section>
  );
}
