"use client";

import React, { useId, useState } from "react";

import { CACAR_AIR_CARD_BOX_SHADOW, CACAR_AIR_CONTENT_INSET } from "@/module/cacar-air/cacarAirLayoutClasses";

const TAB_BTN_L =
  "relative flex min-h-[48px] flex-1 items-center justify-center rounded-l-[10px] rounded-r-none px-2 py-3 text-center text-[12px] font-semibold leading-snug outline-none transition-all duration-300 ease-out sm:px-3 sm:text-[14px] md:px-4 md:text-[15px]";
const TAB_BTN_R =
  "relative flex min-h-[48px] flex-1 items-center justify-center rounded-r-[10px] rounded-l-none px-2 py-3 text-center text-[12px] font-semibold leading-snug outline-none transition-all duration-300 ease-out sm:px-3 sm:text-[14px] md:px-4 md:text-[15px]";
const FOCUS_RING = "focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-[#038F7A] focus-visible:ring-offset-2";

function BulletItem({ children }) {
  return (
    <li className="flex gap-3 md:gap-3.5">
      <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#038F7A] md:mt-2.5 md:h-2.5 md:w-2.5" aria-hidden />
      <span className="min-w-0 flex-1 text-[15px] font-normal leading-[1.65] text-neutral-800 md:text-[16px] md:leading-relaxed lg:text-[17px]">
        {children}
      </span>
    </li>
  );
}

function BulletList({ children }) {
  return <ul className="flex list-none flex-col gap-4 pl-0 md:gap-5">{children}</ul>;
}

function PanelVaricella({ id, labelledBy }) {
  return (
    <div id={id} role="tabpanel" aria-labelledby={labelledBy}>
      <div className="space-y-5 md:space-y-6">
        <h3 className="text-lg font-semibold leading-snug text-[#038F7A] md:text-xl">Pencegahan Varicella</h3>
        <p className="text-[15px] font-normal leading-[1.65] text-neutral-800 md:text-[16px] md:leading-relaxed lg:text-[17px]">
          Cara terbaik dan paling efektif mencegah cacar air adalah vaksinasi. Vaksin varicella telah terbukti aman dan
          efektif dalam menurunkan kasus cacar air secara dramatis di negara-negara yang menerapkan program vaksinasi
          nasional.
        </p>

        <div className="space-y-4 md:space-y-5">
          <h4 className="text-base font-semibold leading-snug text-[#038F7A] md:text-lg">Vaksin Varicella:</h4>
          <BulletList>
            <BulletItem>
              Direkomendasikan untuk semua anak usia 12-15 bulan (dosis pertama) dan 4-6 tahun (dosis kedua).
            </BulletItem>
            <BulletItem>
              Orang dewasa yang belum pernah terkena cacar air dan belum divaksinasi juga sangat dianjurkan untuk
              mendapatkan 2 dosis vaksin.
            </BulletItem>
            <BulletItem>Efektivitas: 2 dosis vaksin memberikan perlindungan ~98% terhadap cacar air berat.</BulletItem>
            <BulletItem>
              TIDAK dianjurkan untuk: ibu hamil, orang dengan alergi berat terhadap komponen vaksin, dan orang dengan
              imunodefisiensi berat.
            </BulletItem>
          </BulletList>
        </div>

        <div className="space-y-4 md:space-y-5">
          <h4 className="text-base font-semibold leading-snug text-[#038F7A] md:text-lg">
            Langkah Pencegahan Penularan (selain vaksin):
          </h4>
          <BulletList>
            <BulletItem>
              Isolasi penderita: jauhkan dari sekolah, tempat kerja, dan kerumunan hingga semua ruam mengering.
            </BulletItem>
            <BulletItem>Cuci tangan dengan sabun secara rutin.</BulletItem>
            <BulletItem>Hindari kontak dengan pakaian atau benda yang terkontaminasi cairan dari vesikel.</BulletItem>
            <BulletItem>
              Varicella-Zoster Immunoglobulin (VZIG) dapat diberikan dalam 96 jam setelah paparan pada kelompok berisiko
              tinggi (ibu hamil, bayi, dan immunocompromised) yang belum tervaksinasi.
            </BulletItem>
          </BulletList>
        </div>
      </div>
    </div>
  );
}

function PanelHerpes({ id, labelledBy }) {
  return (
    <div id={id} role="tabpanel" aria-labelledby={labelledBy}>
      <div className="space-y-5 md:space-y-6">
        <h3 className="text-lg font-semibold leading-snug text-[#038F7A] md:text-xl">Pencegahan Herpes Zoster</h3>
        <p className="text-[15px] font-normal leading-[1.65] text-neutral-800 md:text-[16px] md:leading-relaxed lg:text-[17px]">
          Karena <em className="italic">Herpes Zoster</em> terjadi akibat reaktivasi virus yang sudah ada di dalam tubuh,
          pencegahan utamanya adalah menjaga sistem kekebalan tubuh tetap kuat dan mendapatkan vaksinasi.
        </p>

        <div className="space-y-4 md:space-y-5">
          <h4 className="text-base font-semibold leading-snug text-[#038F7A] md:text-lg">Vaksin Zoster (Shingrix):</h4>
          <BulletList>
            <BulletItem>
              <em className="italic">Shingrix</em> adalah vaksin <em className="italic">zoster</em> generasi terbaru yang
              direkomendasikan oleh WHO dan CDC untuk orang berusia 50 tahun ke atas, diberikan dalam 2 dosis (jarak 2-6
              bulan).
            </BulletItem>
            <BulletItem>
              Efektivitas <em className="italic">Shingrix</em> mencapai {'>'}90% dalam mencegah Herpes Zoster atau Cacar Ular dan{' '}
              {'>'}89% dalam mencegah <em className="italic">Postherpetic Neuralgia</em> (PHN).
            </BulletItem>
            <BulletItem>
              Direkomendasikan bahkan bagi orang yang sebelumnya sudah pernah terkena Herpes Zoster atau Cacar Ular.
            </BulletItem>
            <BulletItem>
              Di Indonesia, vaksin ini tersedia di klinik dan rumah sakit swasta (masih berbayar mandiri).
            </BulletItem>
          </BulletList>
        </div>

        <div className="space-y-4 md:space-y-5">
          <h4 className="text-base font-semibold leading-snug text-[#038F7A] md:text-lg">Cara Lain Mencegah Herpes Zoster:</h4>
          <BulletList>
            <BulletItem>
              Jaga daya tahan tubuh: tidur cukup, makan bergizi, olahraga teratur, dan kelola stres.
            </BulletItem>
            <BulletItem>
              Hindari kontak dengan penderita Cacar Air atau Herpes Zoster aktif, terutama bagi yang belum pernah
              divaksinasi.
            </BulletItem>
            <BulletItem>
              Pantau kondisi kesehatan secara rutin, terutama jika memiliki penyakit kronis seperti diabetes, HIV, atau
              kanker.
            </BulletItem>
          </BulletList>
        </div>
      </div>
    </div>
  );
}

export default function CacarAirPencegahanSection() {
  const uid = useId();
  const tabVarId = `${uid}-pg-v`;
  const tabHerId = `${uid}-pg-h`;
  const panelVarId = `${uid}-pg-pv`;
  const panelHerId = `${uid}-pg-ph`;

  const [tab, setTab] = useState("varicella");

  return (
    <section id="pencegahan" className="scroll-mt-24 bg-white px-5 py-12 md:px-12 md:py-16 lg:px-20 xl:px-24">
      <div data-aos="fade-up" suppressHydrationWarning className={CACAR_AIR_CONTENT_INSET}>
        <h2 className="mb-6 text-[1.375rem] font-semibold leading-tight tracking-tight text-[#038F7A] md:mb-8 md:text-[1.5rem] lg:text-[1.625rem] xl:text-[1.6875rem]">
          Pencegahan
        </h2>

        <div className="mb-8 rounded-[10px] border border-neutral-200/90 p-[1px] sm:mb-10">
          <div className="flex w-full gap-0" role="tablist" aria-label="Pilih jenis pencegahan">
            <button
              id={tabVarId}
              type="button"
              role="tab"
              aria-selected={tab === "varicella"}
              aria-controls={panelVarId}
              className={[
                TAB_BTN_L,
                tab === "varicella"
                  ? "z-[1] bg-[#038F7A] text-white shadow-none hover:brightness-[1.06] active:brightness-95"
                  : `z-0 bg-white text-neutral-600 ${CACAR_AIR_CARD_BOX_SHADOW} hover:-translate-y-px hover:brightness-[1.02] active:brightness-[0.99]`,
                FOCUS_RING,
              ].join(" ")}
              onClick={() => setTab("varicella")}
            >
              Varicella (Cacar Air)
            </button>
            <button
              id={tabHerId}
              type="button"
              role="tab"
              aria-selected={tab === "herpes"}
              aria-controls={panelHerId}
              className={[
                TAB_BTN_R,
                tab === "herpes"
                  ? "z-[1] bg-[#038F7A] text-white shadow-none hover:brightness-[1.06] active:brightness-95"
                  : `z-0 bg-white text-neutral-600 ${CACAR_AIR_CARD_BOX_SHADOW} hover:-translate-y-px hover:brightness-[1.02] active:brightness-[0.99]`,
                FOCUS_RING,
              ].join(" ")}
              onClick={() => setTab("herpes")}
            >
              Herpes Zoster (Cacar Ular)
            </button>
          </div>
        </div>

        <div aria-hidden={tab !== "varicella"} className={tab !== "varicella" ? "hidden" : undefined}>
          <PanelVaricella id={panelVarId} labelledBy={tabVarId} />
        </div>
        <div aria-hidden={tab !== "herpes"} className={tab !== "herpes" ? "hidden" : undefined}>
          <PanelHerpes id={panelHerId} labelledBy={tabHerId} />
        </div>
      </div>
    </section>
  );
}
