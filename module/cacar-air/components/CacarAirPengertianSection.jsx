import React from "react";

import { CACAR_AIR_CARD_BOX_SHADOW, CACAR_AIR_CONTENT_INSET } from "@/module/cacar-air/cacarAirLayoutClasses";

const CARD_BODY =
  "space-y-4 text-[15px] font-normal leading-[1.65] text-neutral-700 md:text-[17px] md:leading-[1.7]";
const CARD_TITLE = "mb-4 text-[1.125rem] font-semibold leading-snug text-[#038F7A] md:text-xl";

export default function CacarAirPengertianSection() {
  return (
    <section
      id="pengertian-dan-definisi"
      className="scroll-mt-24 bg-white px-5 py-12 md:px-12 md:py-16 lg:px-20 xl:px-24"
    >
      <div className={CACAR_AIR_CONTENT_INSET}>
        <h2 className="mb-8 text-[1.375rem] font-semibold leading-tight tracking-tight text-[#038F7A] md:mb-9 md:text-[1.5rem] lg:text-[1.625rem] xl:text-[1.6875rem]">
          Pengertian dan Definisi
        </h2>

        <div data-aos="fade-up" suppressHydrationWarning className="grid grid-cols-1 gap-5 md:gap-6 lg:grid-cols-2 lg:gap-7 xl:gap-8">
          <article
            className={`rounded-[16px] border border-neutral-200/90 bg-white px-5 py-7 md:px-6 md:py-8 ${CACAR_AIR_CARD_BOX_SHADOW}`}
          >
            <h3 className={CARD_TITLE}>Varicella (Cacar Air)</h3>
            <div className={CARD_BODY}>
              <p>
                Varicella atau yang lebih dikenal dengan cacar air adalah infeksi akut yang sangat menular akibat
                infeksi pertama kali oleh Varicella-Zoster Virus (VZV). Penyakit ini sangat umum terjadi pada
                anak-anak, meskipun orang dewasa pun bisa terinfeksi dengan gejala yang lebih berat.
              </p>
              <p>
                Setelah seseorang sembuh dari cacar air, virus VZV tidak benar-benar hilang dari tubuh. Virus tersebut
                bersembunyi dan tidak aktif (<em className="italic">dormant</em>) di dalam sel-sel saraf (
                <em className="italic">ganglia</em>) untuk waktu yang sangat lama, bahkan seumur hidup.
              </p>
            </div>
          </article>

          <article
            className={`rounded-[16px] border border-neutral-200/90 bg-white px-5 py-7 md:px-6 md:py-8 ${CACAR_AIR_CARD_BOX_SHADOW}`}
          >
            <h3 className={CARD_TITLE}>Herpes Zoster (Cacar Ular / Dompo)</h3>
            <div className={CARD_BODY}>
              <p>
                Herpes Zoster adalah penyakit yang terjadi ketika virus VZV yang sudah lama{" "}
                <em className="italic">dormant</em> tersebut aktif kembali. Ini bukan infeksi baru, melainkan kebangkitan virus
                lama yang pernah menyebabkan cacar air di masa lalu.
              </p>
              <p>
                Reaktivasi ini umumnya dipicu oleh melemahnya sistem kekebalan tubuh, misalnya karena faktor usia, stres
                berkepanjangan, penyakit kronis atau penggunaan obat-obatan tertentu yang menekan imunitas.
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
