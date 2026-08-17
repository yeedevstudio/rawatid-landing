"use client";

import React from "react";
import Image from "next/image";

function MulaiButton({ className = "" }) {
  return (
    <a
      href="https://diri.rawat.id"
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center h-[48px] px-7 rounded-[10px] bg-white text-[#038F7A] font-semibold text-[16px] hover:bg-white/90 transition-colors ${className}`}
    >
      Mulai Rawat Kesehatan Sekarang
    </a>
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
          {/* Kiri: teks + tombol (desktop) */}
          <div className="text-white text-center lg:text-left">
            <h2 className="text-[22px] sm:text-[28px] md:text-[32px] lg:text-[40px] leading-[1.2] font-semibold">
              Kelola Kesehatan dengan RawatDiri
            </h2>
            <p className="mt-3 text-[14px] sm:text-[16px] md:text-[18px] lg:text-[22px] leading-[1.5] text-white/90">
              Susun rencana diet, pantau jadwal minum obat hingga catat riwayat kesehatan dengan lebih mudah menggunakan RawatDiri
            </p>
            {/* Tombol desktop — hanya tampil di lg ke atas */}
            <div className="hidden lg:flex mt-6">
              <MulaiButton />
            </div>
          </div>

          {/* Kanan: gambar */}
          <div className="flex items-center justify-center lg:justify-end">
            <Image
              src="/images/phone.webp"
              alt="Tampilan aplikasi RawatDiri di ponsel"
              width={640}
              height={420}
              className="w-full max-w-[520px] h-auto"
              priority={false}
            />
          </div>

          {/* Tombol mobile — hanya tampil di bawah lg, setelah gambar */}
          <div className="flex lg:hidden justify-center">
            <MulaiButton />
          </div>
        </div>
      </div>
    </section>
  );
}
