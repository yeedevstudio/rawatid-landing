import React from "react";

import { CACAR_AIR_CONTENT_INSET } from "@/module/cacar-air/cacarAirLayoutClasses";

const ROWS = [
  ["Infeksi pertama VZV", "Penyebab", "Reaktivasi VZV lama"],
  ["Anak-anak (2-10 tahun)", "Usia Tersering", "Dewasa/lansia > 50 tahun"],
  ["Menyebar ke seluruh tubuh", "Ruam", "Satu sisi tubuh, mengikuti jalur saraf"],
  ["Ringan / gatal dominan", "Nyeri", "Nyeri hebat, terbakar, sebelum & sesudah ruam"],
  ["Sangat mudah menular", "Penularan", "Lebih terbatas (hanya dari ruam aktif)"],
  ["Vaksin varicella (2 dosis)", "Vaksin", "Vaksin zoster (Shingrix, 2 dosis)"],
  ["Umumnya hanya sekali seumur hidup", "Dapat Kambuh?", "Bisa kambuh, terutama jika imun lemah"],
];

const CELL_BORDER = "border border-neutral-200/90";
const BODY_SIDE = `bg-white ${CELL_BORDER} px-3 py-2.5 text-[14px] font-normal leading-snug text-neutral-800 md:px-4 md:py-3 md:text-[15px] md:leading-normal lg:text-[16px]`;
const BODY_CENTER = `bg-white ${CELL_BORDER} px-3 py-2.5 text-center text-[14px] font-semibold leading-snug text-[#038F7A] md:px-4 md:py-3 md:text-[15px] md:leading-normal lg:text-[16px]`;

export default function CacarAirPerbandinganSection() {
  return (
    <section
      id="perbandingan-sekilas"
      className="scroll-mt-24 bg-white px-5 pb-14 pt-10 md:px-12 md:pb-20 md:pt-12 lg:px-20 lg:pt-14 xl:px-24"
    >
      <div className={CACAR_AIR_CONTENT_INSET}>
        <h2 className="mb-8 text-[1.375rem] font-semibold leading-tight tracking-tight text-[#038F7A] md:mb-9 md:text-[1.5rem] lg:text-[1.625rem] xl:text-[1.6875rem]">
          Perbandingan Sekilas
        </h2>

        <div data-aos="fade-up" suppressHydrationWarning className="overflow-hidden rounded-2xl border border-neutral-200/90 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[min(100%,640px)] border-collapse lg:min-w-0">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className={`${CELL_BORDER} bg-white px-3 py-2.5 text-right text-[13px] font-semibold leading-snug text-[#038F7A] md:px-4 md:py-3 md:text-[15px] lg:text-[16px]`}
                  >
                    Varicella (Cacar Air)
                  </th>
                  <th
                    scope="col"
                    className={`${CELL_BORDER} bg-white px-3 py-2.5 text-center text-[13px] font-semibold leading-snug text-[#038F7A] md:px-4 md:py-3 md:text-[15px] lg:text-[16px]`}
                  >
                    Aspek
                  </th>
                  <th
                    scope="col"
                    className={`${CELL_BORDER} bg-white px-3 py-2.5 text-left text-[13px] font-semibold leading-snug text-[#038F7A] md:px-4 md:py-3 md:text-[15px] lg:text-[16px]`}
                  >
                    Herpes Zoster (Cacar Ular)
                  </th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map(([left, middle, right]) => (
                  <tr key={middle}>
                    <td className={`${BODY_SIDE} text-right`}>{left}</td>
                    <td className={BODY_CENTER}>{middle}</td>
                    <td className={`${BODY_SIDE} text-left`}>{right}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
