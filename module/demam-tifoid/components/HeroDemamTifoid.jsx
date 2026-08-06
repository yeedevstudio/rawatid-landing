import React from "react";
import { IconInfoCircle } from "@tabler/icons-react";

export default function HeroDemamTifoid() {
  return (
    <section className="w-full px-5 pb-12 pt-12 md:px-12 md:pb-16 md:pt-16 lg:px-20 lg:pb-20 lg:pt-20 xl:px-24">
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div data-aos="fade-right" suppressHydrationWarning className="flex flex-col gap-4 text-left md:gap-6">
          <h1 className="text-[32px] font-bold leading-[1.15] tracking-tight text-[#038F7A] sm:text-[40px] md:text-[48px] lg:text-[52px]">
            Demam <em>Tifoid</em>
          </h1>
          <p className="max-w-none text-[15px] font-normal leading-relaxed text-neutral-600 sm:text-[16px] md:text-[18px]">
            Demam <em>Tifoid</em> atau Tipes adalah salah satu penyakit infeksi paling umum di dunia yang hampir
            selalu terjadi karena buruknya sanitasi.
          </p>
        </div>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          data-aos="fade-left"
          suppressHydrationWarning
          src="/image/tifoid.webp"
          alt="Ilustrasi Demam Tifoid"
          className="h-auto w-full max-w-lg justify-self-center lg:max-w-none"
        />
      </div>

      {/* Callout card */}
      <aside
        data-aos="fade-up"
        suppressHydrationWarning
        className="mt-10 w-full rounded-2xl border border-neutral-200/90 bg-white p-4 shadow-[0px_0px_12.1px_0px_#0000001A] md:mt-12 md:p-5 lg:p-6"
      >
        <div className="flex gap-3 md:gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#038F7A]/10 text-[#038F7A] md:h-11 md:w-11">
            <IconInfoCircle className="h-6 w-6 stroke-[1.5] md:h-7 md:w-7" aria-hidden />
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="text-[15px] font-bold leading-tight text-[#038F7A] md:text-base">
              Demam <em>Tifoid</em>
            </h2>
            <p className="mt-2 text-[13px] font-normal leading-relaxed text-neutral-800 md:mt-3 md:text-[15px] md:leading-[1.65]">
              Demam <em>Tifoid</em> yang akrab disebut sebagai tipes oleh masyarakat Indonesia adalah salah satu
              penyakit infeksi yang paling sering kita dengar namun paling banyak disalahpahami. Hampir semua
              orang pernah mengalaminya atau mengenal seseorang yang pernah sakit tipes, namun mitos seputar
              penyakit ini masih sangat banyak beredar.
            </p>
          </div>
        </div>
      </aside>
    </section>
  );
}
