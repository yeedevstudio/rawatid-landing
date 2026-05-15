import { IconInfoCircle } from "@tabler/icons-react";
import React from "react";

import { CACAR_AIR_CARD_BOX_SHADOW, CACAR_AIR_CONTENT_INSET } from "@/module/cacar-air/cacarAirLayoutClasses";

export default function CacarAirKenapaPentingSection() {
  return (
    <section
      id="kenapa-penting"
      className="scroll-mt-24 bg-white px-5 pb-14 pt-8 md:px-12 md:pt-10 md:pb-20 lg:px-20 lg:pt-12 xl:px-24"
    >
      <div
        data-aos="fade-up"
        suppressHydrationWarning
        className={`w-full rounded-2xl border border-neutral-200/90 bg-white py-6 pl-4 pr-4 ${CACAR_AIR_CARD_BOX_SHADOW} sm:py-7 sm:pl-5 sm:pr-5 md:py-8 md:pl-6 md:pr-6 lg:pl-6 lg:pr-6 xl:pl-7 xl:pr-7 ${CACAR_AIR_CONTENT_INSET}`}
      >
        <div className="flex flex-wrap items-start gap-2.5 sm:gap-3 md:gap-3.5">
          <IconInfoCircle className="mt-0.5 h-7 w-7 shrink-0 text-[#038F7A] sm:h-8 sm:w-8 md:h-8 md:w-8" stroke={1.5} aria-hidden />
          <div className="min-w-0 flex-1 space-y-4">
            <h2 className="text-xl font-bold text-[#038F7A] md:text-2xl">Kenapa Penting untuk Dibedakan?</h2>
            <p className="text-left text-[15px] font-normal leading-[1.65] text-neutral-600 md:text-[17px] md:leading-[1.7]">
              Banyak orang masih bingung membedakan cacar air (varicella) dengan cacar ular (herpes zoster). Keduanya
              disebabkan oleh virus yang sama, yaitu Varicella-Zoster Virus (VZV), namun merupakan dua kondisi yang
              berbeda, menyerang kelompok usia berbeda, dan memerlukan penanganan yang berbeda pula. Pahami
              perbedaannya untuk membantu mengenali gejala lebih awal, mencegah penularan, dan mendapatkan pertolongan
              yang tepat.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
