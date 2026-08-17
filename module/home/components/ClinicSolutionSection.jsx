import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ClinicSolutionSection() {

  return (
    <section
      data-aos="fade-up"
      suppressHydrationWarning
      className="w-full bg-[#038F7A] px-5 md:px-12 lg:px-20 xl:px-24 py-14 md:py-20 lg:py-28"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-16 items-center">
        {/* Teks — atas di mobile, kanan di desktop */}
        <div className="flex flex-col gap-4 md:gap-5 text-center lg:text-left lg:order-2">
          <h2 className="text-[24px] sm:text-[30px] md:text-[36px] lg:text-[40px] xl:text-[44px] leading-[1.2] font-semibold text-white">
            Solusi Digital untuk Rumah Sakit &amp; Klinik
          </h2>
          <p className="text-[15px] sm:text-[18px] md:text-[22px] lg:text-[28px] xl:text-[32px] leading-[1.35] font-normal text-white/95">
            SIMRS, SIM-Klinik &amp; RME yang dirancang untuk menyederhanakan operasional faskes dan meningkatkan pengalaman pasien
          </p>
        </div>

        {/* Gambar — tengah di mobile, kiri di desktop */}
        <div className="flex items-center justify-center lg:justify-start lg:order-1">
          <Image
            src="/images/mac.webp"
            alt="Ilustrasi laptop dashboard Rawat.ID"
            width={560}
            height={420}
            priority={false}
            className="w-full max-w-[320px] sm:max-w-[420px] md:max-w-[520px] h-auto drop-shadow-xl"
          />
        </div>

        {/* Tombol — bawah di mobile (full width), bagian teks di desktop */}
        <div className="flex flex-col lg:flex-row gap-3 md:gap-[16px] lg:order-3 lg:col-start-2">
          <Button
            aria-label="Mulai Sekarang"
            className="bg-white text-[#038F7A] text-[15px] sm:text-[18px] md:text-[20px] lg:text-[24px] font-semibold border-0 shadow-none w-full lg:w-auto h-[48px] md:h-[58px] lg:h-[62px] px-4 md:px-[18px] py-2 md:py-[12px] rounded-[12px] md:rounded-[16px] hover:bg-white/90"
            asChild
          >
            <Link href="/register">Mulai Sekarang</Link>
          </Button>
          <Button
            aria-label="Lihat Fitur"
            className="bg-transparent text-white text-[15px] sm:text-[18px] md:text-[20px] lg:text-[24px] font-semibold border border-white shadow-none w-full lg:w-auto h-[48px] md:h-[58px] lg:h-[62px] px-4 md:px-[18px] py-2 md:py-[12px] rounded-[12px] md:rounded-[16px] hover:bg-white/10"
            asChild
          >
            <Link href="/fitur">Lihat Fitur</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

