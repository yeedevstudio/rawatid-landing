"use client";

import React, { useState } from "react";

const FASES = [
  {
    title: "Fase 1: Demam (Hari ke-1 sampai ke-3)",
    items: [
      { bold: "Demam tinggi mendadak:", text: " suhu tubuh bisa mencapai 39–40°C, muncul tiba-tiba" },
      { bold: "Nyeri kepala berat:", text: <> terutama di area belakang mata (<em>retro-orbital headache</em>)</> },
      { bold: "Nyeri otot dan sendi yang hebat:", text: <> sehingga DBD sering disebut <em>breakbone fever</em> atau demam tulang patah</> },
      { bold: "Mual dan muntah:", text: " bisa disertai hilangnya nafsu makan" },
      { bold: "Ruam kemerahan:", text: " bisa muncul di awal, menyebar dari tubuh ke wajah dan anggota badan" },
      { bold: "Wajah kemerahan:", text: " tampak memerah (flushing) terutama pada anak-anak" },
    ],
  },
  {
    title: "Fase 2: Kritis (Hari ke-4 sampai ke-5)",
    items: [
      { bold: "Demam turun tiba-tiba:", text: " banyak yang mengira sudah sembuh, padahal ini fase paling berbahaya" },
      { bold: "Kebocoran plasma:", text: " plasma darah merembes keluar dari pembuluh darah ke jaringan sekitar" },
      { bold: "Perdarahan:", text: " mimisan, gusi berdarah, bintik merah di kulit (petekia), atau muntah darah" },
      { bold: "Nyeri perut hebat:", text: " terutama di area perut kanan atas atau seluruh perut" },
      { bold: "Muntah terus-menerus:", text: " lebih dari 3 kali dalam 24 jam" },
      { bold: "Penurunan trombosit drastis:", text: " bisa turun di bawah 100.000 sel/μL" },
    ],
  },
  {
    title: "Fase 3: Pemulihan (Hari ke-6 sampai ke-7)",
    items: [
      { bold: "Demam kembali naik:", text: " namun ini tanda pemulihan, bukan perburukan" },
      { bold: "Ruam khas DBD:", text: <> bintik-bintik putih pada latar merah yang khas (<em>white islands in a sea of red</em>)</> },
      { bold: "Trombosit meningkat kembali:", text: " tubuh mulai memproduksi trombosit baru" },
      { bold: "Nafsu makan kembali:", text: " tanda bahwa kondisi membaik" },
      { bold: "Denyut jantung melambat:", text: " bradikardia umum terjadi pada fase pemulihan" },
      { bold: "Peningkatan produksi urin:", text: " ginjal kembali berfungsi normal" },
    ],
  },
];

export default function DbdGejalaSection() {
  const [active, setActive] = useState(0);

  const prev = () => setActive((i) => (i === 0 ? FASES.length - 1 : i - 1));
  const next = () => setActive((i) => (i === FASES.length - 1 ? 0 : i + 1));

  const fase = FASES[active];

  return (
    <section
      id="tanda-gejala"
      className="scroll-mt-24 w-full bg-white px-5 py-12 md:px-12 md:py-16 lg:px-20 lg:py-20 xl:px-24"
    >
      <div data-aos="fade-up" suppressHydrationWarning>
        <div className="space-y-6">
          <h2 className="text-[1.375rem] font-semibold leading-tight tracking-tight text-[#038F7A] md:text-[1.5rem] lg:text-[1.625rem] xl:text-[1.6875rem]">
            Tanda &amp; Gejala Demam Berdarah <em>Dengue</em> (DBD)
          </h2>

          <div className="space-y-3">
            <h3 className="text-[15px] font-semibold leading-snug text-[#038F7A] md:text-[16px] lg:text-[17px]">
              Bagaimana Gejala Berkembang?
            </h3>
            <p className="text-[15px] font-normal leading-relaxed text-neutral-700 md:text-[16px] lg:text-[17px]">
              Gejala DBD biasanya muncul 4–10 hari setelah gigitan nyamuk yang terinfeksi. Perjalanan
              penyakit DBD terbagi dalam 3 fase yang khas, memahami fase ini sangat penting agar tidak
              salah dalam menilai kondisi pasien.
            </p>
          </div>

          {/* Carousel */}
          <div className="mt-4">
            <hr className="border-[#038F7A]/40" />

            <div className="relative px-10 py-8 md:px-16 md:py-10">
              {/* Arrows */}
              <button
                type="button"
                onClick={prev}
                aria-label="Fase sebelumnya"
                className="absolute left-0 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full text-[#038F7A] transition-colors hover:bg-[#038F7A]/10"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              <button
                type="button"
                onClick={next}
                aria-label="Fase berikutnya"
                className="absolute right-0 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full text-[#038F7A] transition-colors hover:bg-[#038F7A]/10"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {/* Slide content */}
              <div className="min-h-[280px]">
                <h4 className="mb-5 text-center text-[15px] font-bold text-neutral-800 md:text-[16px] lg:text-[17px]">
                  {fase.title}
                </h4>
                <ul className="space-y-3">
                  {fase.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-[14px] leading-relaxed text-neutral-700 md:text-[15px]">
                      <span className="mt-[7px] h-[6px] w-[6px] shrink-0 rounded-full bg-[#038F7A]" aria-hidden />
                      <span>
                        <strong className="font-semibold">{item.bold}</strong>
                        {item.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Dots */}
              <div className="mt-6 flex justify-center gap-2">
                {FASES.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActive(i)}
                    aria-label={`Fase ${i + 1}`}
                    className={`h-2.5 w-2.5 rounded-full transition-colors ${
                      i === active ? "bg-[#038F7A]" : "bg-neutral-300"
                    }`}
                  />
                ))}
              </div>
            </div>

            <hr className="border-[#038F7A]/40" />
          </div>
        </div>
      </div>
    </section>
  );
}
