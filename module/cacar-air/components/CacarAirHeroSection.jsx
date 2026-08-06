import React from "react";

import { CACAR_AIR_CONTENT_INSET } from "@/module/cacar-air/cacarAirLayoutClasses";

export default function CacarAirHeroSection() {
  return (
    <section className="w-full px-5 pb-8 pt-12 md:px-12 md:pb-10 md:pt-16 lg:px-20 lg:pb-12 lg:pt-20 xl:px-24">
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div data-aos="fade-right" suppressHydrationWarning className={`flex max-w-none flex-col gap-4 text-left md:gap-6 ${CACAR_AIR_CONTENT_INSET}`}>
          <h1 className="flex flex-col gap-y-2 text-[32px] font-bold leading-[1.15] tracking-tight text-[#038F7A] sm:gap-y-2.5 sm:text-[40px] md:gap-y-3 md:text-[48px] lg:text-[52px]">
            <span className="block">Cacar Air vs.</span>
            <span className="block">Cacar Ular</span>
          </h1>
          <p className="max-w-none text-[16px] font-normal leading-relaxed text-neutral-600 sm:text-[18px] md:text-[20px]">
            Dua penyakit dari satu virus yang sama, kenali perbedaannya!
          </p>
        </div>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img data-aos="fade-left" suppressHydrationWarning src="/image/cacarair.webp" alt="Ilustrasi cacar air dan cacar ular" className="h-auto w-full max-w-lg justify-self-center lg:max-w-none" />
      </div>
    </section>
  );
}
