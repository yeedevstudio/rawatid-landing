"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function HeroSection() {
  const router = useRouter();
  return (
    <section className="my-8 md:my-10 w-full px-5 md:px-12 lg:px-20 xl:px-24 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
      <div
        data-aos="fade-right"
        suppressHydrationWarning
        className="flex flex-col gap-3 md:gap-6 lg:gap-8"
      >
        <h1 className="text-[28px] sm:text-[36px] md:text-[42px] lg:text-[48px] leading-[1.1] font-semibold text-[#038F7A]">Semua Kebutuhan Kesehatanmu, Dalam Satu Platform</h1>
        <h2 className="text-[16px] sm:text-[20px] md:text-[26px] lg:text-[32px] leading-[1.35] font-normal text-[#038F7A] mb-2 lg:mb-2">Dari informasi obat hingga pengingat kesehatan harian, Rawat.ID siap mendampingi kamu.</h2>
        <div className="flex flex-wrap gap-3 md:gap-[16px] w-full pt-4 md:pt-10 transition-all duration-300 ease-in-out">
          <Button aria-label="Mulai Sekarang" className="bg-[#038F7A] text-white text-[15px] sm:text-[18px] md:text-[22px] lg:text-[28px] font-semibold hover:bg-[#038F7A]/90 shadow-none flex-1 sm:flex-none sm:w-auto md:w-[298px] h-[48px] sm:h-[58px] md:h-[68px] lg:h-[79px] px-4 md:px-[26px] py-2 md:py-[18px] rounded-[12px] md:rounded-[16px]" onClick={() => router.push("/register")}>
            Mulai Sekarang
          </Button>
          <Button
            aria-label="Lihat Fitur"
            className="text-[#038F7A] text-[15px] sm:text-[18px] md:text-[22px] lg:text-[28px] font-semibold border border-[#038F7A] bg-white hover:bg-[#038F7A]/5 shadow-none flex-1 sm:flex-none h-[48px] sm:h-[58px] md:h-[68px] lg:h-[81px] px-4 md:px-[26px] py-2 md:py-[18px] rounded-[12px] md:rounded-[16px]"
            onClick={() => router.push("/fitur")}
          >
            Lihat Fitur
          </Button>
        </div>
      </div>
      <div
        data-aos="fade-left"
        suppressHydrationWarning
        className="flex items-center justify-center lg:justify-end"
      >
        <div className="relative h-[22rem] sm:h-[26rem] md:h-[32rem] lg:h-[34rem] xl:h-[38rem] w-[18rem] sm:w-[21rem] md:w-[24rem] lg:w-[30rem] xl:w-[34rem] overflow-hidden rounded-tr-[13rem] rounded-bl-[13rem] lg:rounded-tr-[18rem] lg:rounded-bl-[18rem] lg:translate-x-1 xl:translate-x-2">
          <Image src="/image/newbackground.jpg" alt="Ilustrasi halaman beranda Rawat.ID" fill sizes="(max-width: 640px) 288px, (max-width: 768px) 336px, (max-width: 1024px) 384px, (max-width: 1280px) 480px, 544px" className="object-cover object-center" priority />
        </div>
      </div>
    </section>
  );
}
