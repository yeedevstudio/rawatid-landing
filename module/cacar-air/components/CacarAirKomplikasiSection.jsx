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
        <h3 className="text-lg font-semibold leading-snug text-[#038F7A] md:text-xl">Komplikasi Varicella (Cacar Air)</h3>
        <p className="text-[15px] font-normal leading-[1.65] text-neutral-800 md:text-[16px] md:leading-relaxed lg:text-[17px]">
          Pada anak sehat, cacar air jarang menyebabkan komplikasi serius. Namun pada orang dewasa, ibu hamil, bayi, dan
          orang dengan imunitas lemah, komplikasinya bisa mengancam jiwa.
        </p>
        <h4 className="text-base font-semibold leading-snug text-[#038F7A] md:text-lg">Komplikasi Varicella yang Perlu Diwaspadai:</h4>
        <BulletList>
          <BulletItem>
            <strong className="font-semibold text-neutral-900">Infeksi bakteri sekunder pada kulit (selulitis, impetigo):</strong>{" "}
            paling sering terjadi akibat garukan.
          </BulletItem>
          <BulletItem>
            <strong className="font-semibold text-neutral-900">Pneumonia varicella:</strong> komplikasi paru-paru yang paling
            berbahaya, terutama pada orang dewasa dan perokok.
          </BulletItem>
          <BulletItem>
            <strong className="font-semibold text-neutral-900">Ensefalitis (radang otak):</strong> jarang, namun bisa menyebabkan
            kejang, gangguan koordinasi, hingga kematian.
          </BulletItem>
          <BulletItem>
            <strong className="font-semibold text-neutral-900">Varicella kongenital:</strong> Jika ibu terinfeksi saat kehamilan
            minggu ke-8-20, janin bisa lahir dengan cacat bawaan (kerusakan otak, mata, kulit, anggota gerak).
          </BulletItem>
          <BulletItem>
            <strong className="font-semibold text-neutral-900">Sindrom Reye:</strong> komplikasi otak dan hati yang serius,
            terutama jika aspirin diberikan pada anak yang sedang terkena cacar air.
          </BulletItem>
        </BulletList>
      </div>
    </div>
  );
}

function PanelHerpes({ id, labelledBy }) {
  return (
    <div id={id} role="tabpanel" aria-labelledby={labelledBy}>
      <div className="space-y-6 md:space-y-8">
        <div className="space-y-4 md:space-y-5">
          <h3 className="text-lg font-semibold leading-snug text-[#038F7A] md:text-xl">Komplikasi Herpes Zoster</h3>
          <p className="text-[15px] font-normal leading-[1.65] text-neutral-800 md:text-[16px] md:leading-relaxed lg:text-[17px]">
            Herpes Zoster memiliki potensi komplikasi yang lebih beragam dan seringkali lebih serius, terutama karena
            melibatkan saraf.
          </p>
          <h4 className="text-base font-semibold leading-snug text-[#038F7A] md:text-lg">
            Komplikasi Herpes Zoster yang Perlu Diwaspadai:
          </h4>
          <BulletList>
            <BulletItem>
              <strong className="font-semibold text-[#038F7A]">Postherpetic Neuralgia (PHN):</strong> nyeri saraf persisten
              setelah ruam sembuh, berlangsung berbulan-bulan hingga bertahun-tahun. Komplikasi paling umum, terjadi pada
              ~20% penderita, dan meningkat jadi 30-50% pada usia {'>'}60 tahun.
            </BulletItem>
            <BulletItem>
              <strong className="font-semibold text-neutral-900">Herpes zoster oftalmikus:</strong> virus menyerang saraf mata
              (cabang pertama nervus trigeminus). Dapat menyebabkan kebutaan jika tidak ditangani segera.
            </BulletItem>
            <BulletItem>
              <strong className="font-semibold text-neutral-900">Meningitis dan ensefalitis:</strong> radang pada lapisan otak
              atau jaringan otak akibat virus.
            </BulletItem>
            <BulletItem>
              <strong className="font-semibold text-neutral-900">Mielitis transversal:</strong> peradangan pada sumsum tulang
              belakang yang dapat menyebabkan kelemahan atau kelumpuhan.
            </BulletItem>
            <BulletItem>Infeksi bakteri sekunder pada kulit dan jaringan.</BulletItem>
          </BulletList>
        </div>

        <div className="space-y-4 md:space-y-5">
          <h4 className="text-base font-semibold leading-snug text-[#038F7A] md:text-lg">Segera ke IGD / Dokter jika:</h4>
          <BulletList>
            <BulletItem>Ruam atau nyeri muncul di dekat mata atau telinga.</BulletItem>
            <BulletItem>Muncul gangguan penglihatan, kelumpuhan wajah, atau gangguan pendengaran.</BulletItem>
            <BulletItem>Penderita adalah bayi, ibu hamil, atau orang dengan sistem imun lemah.</BulletItem>
            <BulletItem>Demam tinggi, kejang, kaku leher, atau penurunan kesadaran.</BulletItem>
            <BulletItem>Nyeri sangat hebat yang tidak bisa dikontrol.</BulletItem>
          </BulletList>
        </div>
      </div>
    </div>
  );
}

export default function CacarAirKomplikasiSection() {
  const uid = useId();
  const tabVarId = `${uid}-kp-v`;
  const tabHerId = `${uid}-kp-h`;
  const panelVarId = `${uid}-kp-pv`;
  const panelHerId = `${uid}-kp-ph`;

  const [tab, setTab] = useState("varicella");

  return (
    <section id="komplikasi" className="scroll-mt-24 bg-white px-5 py-12 md:px-12 md:py-16 lg:px-20 xl:px-24">
      <div data-aos="fade-up" suppressHydrationWarning className={CACAR_AIR_CONTENT_INSET}>
        <h2 className="mb-6 text-[1.375rem] font-semibold leading-tight tracking-tight text-[#038F7A] md:mb-8 md:text-[1.5rem] lg:text-[1.625rem] xl:text-[1.6875rem]">
          Komplikasi yang Dapat Terjadi
        </h2>

        <div className="mb-8 rounded-[10px] border border-neutral-200/90 p-[1px] sm:mb-10">
          <div className="flex w-full gap-0" role="tablist" aria-label="Pilih jenis komplikasi">
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
