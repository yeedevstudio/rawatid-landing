"use client";

import React from "react";
import Image from "next/image";

function StoreBadge({
  src,
  alt,
  eyebrow,
  title,
  logoClassName = "w-[24px] h-[24px]",
}) {
  return (
    <div className="h-[44px] px-3 bg-white border-2 border-black rounded-[10px] flex items-center gap-3">
      <div className="relative shrink-0">
        <Image
          src={src}
          alt={alt}
          width={28}
          height={28}
          className={`object-contain ${logoClassName}`}
        />
      </div>
      <div className="leading-none">
        <div className="text-[10px] font-medium text-black tracking-wide">
          {eyebrow}
        </div>
        <div className="text-[16px] font-semibold text-black -mt-[2px]">
          {title}
        </div>
      </div>
    </div>
  );
}

export default function RawatDiriSection() {
  return (
    <section
      data-aos="fade-up"
      suppressHydrationWarning
      className="w-full bg-[#038F7A]"
    >
      <div className="px-5 md:px-12 lg:px-20 xl:px-24 py-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-6 lg:gap-16">
          {/* Kiri: teks + badge (desktop) — satu group agar centered dengan gambar */}
          <div className="text-white text-center lg:text-left">
            <h2 className="text-[22px] sm:text-[28px] md:text-[32px] lg:text-[40px] leading-[1.2] font-semibold">
              Kelola Kesehatan dengan RawatDiri
            </h2>
            <p className="mt-3 text-[14px] sm:text-[16px] md:text-[18px] lg:text-[22px] leading-[1.5] text-white/90">
              Susun rencana diet, pantau jadwal minum obat hingga catat riwayat kesehatan dengan lebih mudah menggunakan RawatDiri
            </p>
            {/* Badge desktop — hanya tampil di lg ke atas */}
            <div className="hidden lg:flex mt-6 gap-3 flex-wrap">
              <StoreBadge src="/images/Apple.png" alt="App Store" eyebrow="Download on the" title="App Store" logoClassName="w-[24px] h-[24px]" />
              <StoreBadge src="/images/Playstore.png" alt="Google Play" eyebrow="GET IT ON" title="Google Play" logoClassName="w-[26px] h-[26px]" />
            </div>
          </div>

          {/* Kanan: gambar */}
          <div className="flex items-center justify-center lg:justify-end">
            <Image
              src="/images/phone.png"
              alt="Tampilan aplikasi RawatDiri di ponsel"
              width={640}
              height={420}
              className="w-full max-w-[520px] h-auto"
              priority={false}
            />
          </div>

          {/* Badge mobile — hanya tampil di bawah lg, setelah gambar */}
          <div className="flex lg:hidden gap-3 flex-wrap justify-center">
            <StoreBadge src="/images/Apple.png" alt="App Store" eyebrow="Download on the" title="App Store" logoClassName="w-[24px] h-[24px]" />
            <StoreBadge src="/images/Playstore.png" alt="Google Play" eyebrow="GET IT ON" title="Google Play" logoClassName="w-[26px] h-[26px]" />
          </div>
        </div>
      </div>
    </section>
  );
}

