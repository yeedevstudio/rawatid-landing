import React from "react";

const ORGAN_ITEMS = [
  { bold: "Hati (liver):", text: <> peradangan hati (<em>hepatitis dengue</em>) adalah komplikasi yang cukup umum, biasanya ringan dan pulih sendiri, tetapi bisa berat pada sebagian kasus.</> },
  { bold: "Jantung:", text: <> gangguan irama jantung atau <em>miokarditis</em> bisa terjadi meskipun jarang.</> },
  { bold: "Otak (ensefalopati dengue):", text: " sangat jarang, biasanya pada kasus berat. Menyebabkan kebingungan, kejang, atau penurunan kesadaran." },
  { bold: "Ginjal:", text: " gangguan fungsi ginjal bisa terjadi pada kasus dengan syok berkepanjangan." },
];

export default function DbdKomplikasiSection() {
  return (
    <section
      id="komplikasi"
      className="scroll-mt-24 w-full bg-white px-5 py-12 md:px-12 md:py-16 lg:px-20 lg:py-20 xl:px-24"
    >
      <div data-aos="fade-up" suppressHydrationWarning>
        <div className="space-y-8 md:space-y-10">
          <h2 className="text-[1.375rem] font-semibold leading-tight tracking-tight text-[#038F7A] md:text-[1.5rem] lg:text-[1.625rem] xl:text-[1.6875rem]">
            Komplikasi Demam Berdarah <em>Dengue</em> (DBD)
          </h2>

          <p className="text-[15px] font-normal leading-relaxed text-neutral-700 md:text-[16px] lg:text-[17px]">
            Komplikasi DBD terjadi terutama saat fase kritis tidak ditangani dengan baik. Berikut adalah
            komplikasi yang paling penting untuk diketahui:
          </p>

          <div className="space-y-5">
            {/* DSS */}
            <div className="flex items-start gap-5 rounded-2xl border border-neutral-200/90 bg-white px-5 py-6 md:gap-6 md:px-7 md:py-7">
              <img src="/image/nyamukkeren.png" alt="Dengue Shock Syndrome" className="h-28 w-28 shrink-0 object-contain md:h-32 md:w-32" />
              <div className="min-w-0 space-y-2">
                <p className="text-[14px] font-semibold leading-snug text-[#038F7A] md:text-[15px] lg:text-[16px]">
                  <em>Dengue Shock Syndrome</em> (DSS) — Syok <em>Dengue</em>
                </p>
                <p className="text-[13px] leading-relaxed text-neutral-600 md:text-[14px] lg:text-[15px]">
                  Komplikasi paling berbahaya dan paling umum pada DBD. Terjadi ketika kebocoran plasma
                  sangat masif sehingga volume darah yang beredar turun drastis, dan tekanan darah tidak
                  bisa dipertahankan. Tanda-tandanya adalah tekanan darah turun atau menyempit, nadi cepat
                  dan lemah, kulit dingin dan pucat, penderita tampak gelisah atau justru lemas sekali.
                  Tanpa penanganan cairan yang segera dan agresif, DSS bisa menyebabkan kegagalan organ
                  dan kematian dalam hitungan jam.
                </p>
              </div>
            </div>

            {/* Perdarahan Berat */}
            <div className="flex items-start gap-5 rounded-2xl border border-neutral-200/90 bg-white px-5 py-6 md:gap-6 md:px-7 md:py-7">
              <img src="/image/darah.png" alt="Perdarahan berat" className="h-28 w-28 shrink-0 object-contain md:h-32 md:w-32" />
              <div className="min-w-0 space-y-2">
                <p className="text-[14px] font-semibold leading-snug text-[#038F7A] md:text-[15px] lg:text-[16px]">
                  Perdarahan Berat
                </p>
                <p className="text-[13px] leading-relaxed text-neutral-600 md:text-[14px] lg:text-[15px]">
                  Meskipun lebih jarang dari yang banyak orang kira, perdarahan berat bisa terjadi pada
                  kasus yang berat, terutama jika pasien juga mengalami syok. Bentuknya bisa berupa
                  pendarahan pada saluran cerna, misalnya muntah darah atau BAB hitam, perdarahan otak,
                  atau perdarahan masif dari gusi, hidung, atau area kulit.
                </p>
              </div>
            </div>

            {/* Gangguan Organ */}
            <div className="flex items-start gap-5 rounded-2xl border border-neutral-200/90 bg-white px-5 py-6 md:gap-6 md:px-7 md:py-7">
              <img src="/image/beef.png" alt="Gangguan organ" className="h-28 w-28 shrink-0 object-contain md:h-32 md:w-32" />
              <div className="min-w-0 space-y-3">
                <p className="text-[14px] font-semibold leading-snug text-[#038F7A] md:text-[15px] lg:text-[16px]">
                  Gangguan Organ
                </p>
                <ul className="space-y-2">
                  {ORGAN_ITEMS.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-[13px] leading-relaxed text-neutral-600 md:text-[14px] lg:text-[15px]">
                      <span className="mt-[7px] h-[5px] w-[5px] shrink-0 rounded-full bg-neutral-400" aria-hidden />
                      <span>
                        <strong className="font-semibold text-neutral-700">{item.bold}</strong>
                        {item.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
