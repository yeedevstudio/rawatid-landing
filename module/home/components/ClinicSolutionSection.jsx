"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function ClinicSolutionSection() {
  const router = useRouter();

  return (
    <section
      data-aos="fade-up"
      suppressHydrationWarning
      className="w-full bg-[#038F7A] px-5 md:px-12 lg:px-20 xl:px-24 py-28"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <div className="flex items-center justify-center lg:justify-start">
          <Image
            src="/images/mac.svg"
            alt="Ilustrasi laptop dashboard Rawat.ID"
            width={560}
            height={420}
            priority={false}
            className="w-full max-w-[520px] h-auto drop-shadow-xl"
          />
        </div>

        <div className="flex flex-col gap-5">
          <h2 className="text-[40px] md:text-[44px] leading-[1.2] font-semibold text-white">
            Solusi Digital untuk Rumah Sakit &amp; Klinik
          </h2>
          <p className="text-[28px] md:text-[32px] leading-[1.35] font-normal text-white/95">
            Kami akan bantu Kamu migrasi data Rumah Sakit dan Klinik ke Rawat.ID,
            transisi sistem manajemen sampai sistem siap digunakan!
          </p>

          <div className="flex gap-[16px] items-center pt-2 flex-wrap">
            <Button
              aria-label="Mulai Sekarang"
              className="bg-white text-[#038F7A] text-[24px] font-semibold border-0 shadow-none h-[62px] px-[18px] py-[12px] rounded-[16px] hover:bg-white/90"
              onClick={() => router.push("/register")}
            >
              Mulai Sekarang
            </Button>
            <Button
              aria-label="Lihat Fitur"
              className="bg-transparent text-white text-[24px] font-semibold border border-white shadow-none h-[62px] px-[18px] py-[12px] rounded-[16px] hover:bg-white/10"
              onClick={() => router.push("/fitur")}
            >
              Lihat Fitur
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

