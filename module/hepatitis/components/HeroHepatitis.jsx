import React from "react";

import { HEPATITIS_CONTENT_INSET } from "@/module/hepatitis/hepatitisLayoutClasses";

export default function HeroHepatitis() {
  return (
    <section className="w-full px-5 pb-8 pt-12 md:px-12 md:pb-10 md:pt-16 lg:px-20 lg:pb-12 lg:pt-20 xl:px-24">
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div data-aos="fade-right" suppressHydrationWarning className={`flex max-w-none flex-col gap-4 text-left md:gap-6 ${HEPATITIS_CONTENT_INSET}`}>
          <h1 className="text-[32px] font-bold leading-[1.15] tracking-tight text-[#038F7A] sm:text-[40px] md:text-[48px] lg:text-[52px]">
            Hepatitis A
          </h1>
          <p className="max-w-none text-[15px] font-normal leading-relaxed text-neutral-600 sm:text-[16px] md:text-[18px]">
            Hepatitis A disebabkan oleh infeksi virus dan bisa dicegah dengan vaksin dan hampir selalu sembuh total.
          </p>
          <p className="max-w-none text-[15px] font-normal leading-relaxed text-neutral-600 sm:text-[16px] md:text-[18px]">
            Namun tanpa pencegahan yang tepat, virus ini bisa menyebar dengan sangat cepat, terutama di lingkungan yang sanitasinya kurang baik.
          </p>
        </div>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          data-aos="fade-left"
          suppressHydrationWarning
          src="/image/hepahero.webp"
          alt="Ilustrasi Hepatitis A"
          className="h-auto w-full max-w-lg justify-self-center lg:max-w-none"
        />
      </div>
    </section>
  );
}
