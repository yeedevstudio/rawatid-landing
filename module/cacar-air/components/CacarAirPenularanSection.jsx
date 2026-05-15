"use client";

import { IconInfoCircle } from "@tabler/icons-react";
import Image from "next/image";
import React, { useId, useState } from "react";

import { CACAR_AIR_CARD_BOX_SHADOW, CACAR_AIR_CONTENT_INSET } from "@/module/cacar-air/cacarAirLayoutClasses";

const TAB_BTN_L =
  "relative flex min-h-[48px] flex-1 items-center justify-center rounded-l-[10px] rounded-r-none px-2 py-3 text-center text-[12px] font-semibold leading-snug outline-none transition-all duration-300 ease-out sm:px-3 sm:text-[14px] md:px-4 md:text-[15px]";
const TAB_BTN_R =
  "relative flex min-h-[48px] flex-1 items-center justify-center rounded-r-[10px] rounded-l-none px-2 py-3 text-center text-[12px] font-semibold leading-snug outline-none transition-all duration-300 ease-out sm:px-3 sm:text-[14px] md:px-4 md:text-[15px]";
const FOCUS_RING = "focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-[#038F7A] focus-visible:ring-offset-2";

function TxCard({ src, title, children }) {
  return (
    <article
      className={`flex min-h-[280px] flex-col items-center rounded-2xl border border-neutral-200/90 bg-white px-4 py-6 text-center md:min-h-[300px] md:px-5 md:py-8 ${CACAR_AIR_CARD_BOX_SHADOW}`}
    >
      <div
        className={`flex min-h-[100px] w-full flex-1 items-center justify-center md:min-h-[112px] ${title ? "mb-5 md:mb-6" : "mb-4 md:mb-5"}`}
      >
        <Image
          src={src}
          alt=""
          width={176}
          height={140}
          className="h-auto max-h-[120px] w-auto max-w-full object-contain"
          sizes="(max-width: 768px) 45vw, 176px"
        />
      </div>
      {title ? (
        <h3 className="mb-3 text-[15px] font-semibold leading-snug text-[#038F7A] md:text-[16px] lg:text-[17px]">{title}</h3>
      ) : null}
      <div className="text-[13px] font-normal leading-[1.6] text-neutral-700 md:text-[14px] md:leading-relaxed lg:text-[15px]">{children}</div>
    </article>
  );
}

function VaricellaInfoOrange() {
  return (
    <div className="mt-10 rounded-2xl border border-orange-300/85 bg-[#FFF8F1] px-5 py-5 md:mt-11 md:px-6 md:py-6">
      <div className="flex flex-wrap items-start gap-3 md:gap-4">
        <span
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#EA580C] text-white md:h-11 md:w-11"
          aria-hidden
        >
          <IconInfoCircle className="h-6 w-6 text-white" stroke={2} />
        </span>
        <div className="min-w-0 flex-1 space-y-3">
          <p className="text-[15px] font-semibold leading-snug text-[#C2410C] md:text-[16px]">Kapan Penderita Cacar Air Menular?</p>
          <p className="text-[15px] font-normal leading-[1.65] text-neutral-900 md:text-[16px] md:leading-relaxed">
            Penderita cacar air sudah menular sejak 1-2 hari sebelum ruam muncul, hingga semua gelembung sudah mengering menjadi keropeng (biasanya 5-7 hari setelah ruam pertama muncul).
            Artinya, seseorang bisa tanpa sadar menularkan virus ke orang lain sebelum ia sendiri tahu bahwa ia sedang sakit.
          </p>
        </div>
      </div>
    </div>
  );
}

function HerpesRisikoBox() {
  return (
    <div className="mt-10 rounded-2xl border border-amber-300/85 bg-[#FFFAF5] px-5 py-5 md:mt-11 md:px-6 md:py-6">
      <div className="flex flex-wrap items-start gap-3 md:gap-4">
        <span
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#D97706] text-white md:h-11 md:w-11"
          aria-hidden
        >
          <IconInfoCircle className="h-6 w-6 text-white" stroke={2} />
        </span>
        <div className="min-w-0 flex-1 space-y-3">
          <p className="text-[15px] font-semibold leading-snug text-[#B45309] md:text-[16px]">
            Siapa yang Berisiko Tertular dari Penderita Herpes Zoster?
          </p>
          <ul className="list-disc space-y-2 pl-[1.1rem] text-[15px] font-normal leading-[1.65] text-neutral-900 marker:text-neutral-600 md:text-[16px] md:leading-relaxed md:marker:text-neutral-700">
            <li>Orang yang belum pernah terkena cacar air seumur hidupnya.</li>
            <li>Orang yang belum mendapatkan vaksin cacar air.</li>
            <li>
              Ibu hamil, bayi baru lahir, dan orang dengan imunitas lemah (penderita HIV, kanker, atau yang sedang
              menjalani kemoterapi/imunosupresan).
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function PanelVaricella({ id, labelledBy }) {
  return (
    <div id={id} role="tabpanel" aria-labelledby={labelledBy}>
      <div className="space-y-4 md:space-y-5">
        <h3 className="text-lg font-semibold leading-snug text-[#038F7A] md:text-xl">Varicella — Sangat Mudah Menular</h3>
        <p className="text-[15px] font-normal leading-[1.65] text-neutral-800 md:text-[16px] md:leading-relaxed lg:text-[17px]">
          Cacar air adalah salah satu penyakit paling menular yang dikenal dalam dunia medis. Tingkat penularannya
          (secondary attack rate) mencapai 90% pada anggota keluarga yang belum pernah terinfeksi atau belum
          divaksinasi.
        </p>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          <TxCard src="/image/airborne.png" title="Melalui udara (airborne)">
            Virus menyebar melalui droplet pernapasan atau partikel udara yang dilepaskan saat penderita batuk, bersin,
            atau berbicara. Inilah rute penularan utama.
          </TxCard>
          <TxCard src="/image/hand.png" title="Kontak langsung dengan ruam">
            Menyentuh cairan dari gelembung (vesikel) yang pecah.
          </TxCard>
          <TxCard src="/image/pintu.png" title="Kontak tidak langsung">
            Menyentuh benda atau permukaan yang terkontaminasi cairan dari vesikel.
          </TxCard>
          <TxCard src="/image/pragnance.png" title="Dari ibu ke janin">
            Ibu hamil yang terkena cacar air bisa menularkan virus ke janin (varicella kongenital) atau ke bayi baru lahir
            (varicella neonatal) yang sangat berbahaya.
          </TxCard>
        </div>

        <VaricellaInfoOrange />
      </div>
    </div>
  );
}

function PanelHerpes({ id, labelledBy }) {
  return (
    <div id={id} role="tabpanel" aria-labelledby={labelledBy}>
      <div className="space-y-4 md:space-y-5">
        <h3 className="text-lg font-semibold leading-snug text-[#038F7A] md:text-xl">Herpes Zoster — Penularan Lebih Terbatas</h3>
        <p className="text-[15px] font-normal leading-[1.65] text-neutral-800 md:text-[16px] md:leading-relaxed lg:text-[17px]">
          Berbeda dengan cacar air, penyakit ini tidak menular melalui udara secara luas. Penularan hanya bisa terjadi
          secara terbatas melalui kontak langsung dengan cairan dari vesikel kepada orang yang belum pernah mengalami
          cacar air atau yang belum mendapatkan vaksin varicella.
        </p>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
          <TxCard src="/image/hand.png">
            Kontak langsung dengan cairan dari Vesikel Herpes Zoster yang masih aktif (belum mengering).
          </TxCard>
          <TxCard src="/image/noairborne.png">Tidak menular melalui udara seperti cacar air.</TxCard>
          <TxCard src="/image/sembuh.png">Tidak menular lagi setelah semua ruam telah mengering dan mengeras.</TxCard>
        </div>

        <HerpesRisikoBox />
      </div>
    </div>
  );
}

export default function CacarAirPenularanSection() {
  const uid = useId();
  const tabVarId = `${uid}-cp-v`;
  const tabHeroId = `${uid}-cp-h`;
  const panelVarId = `${uid}-cp-pv`;
  const panelHeroId = `${uid}-cp-ph`;

  const [tab, setTab] = useState("varicella");

  return (
    <section id="cara-penularan" className="scroll-mt-24 bg-white px-5 py-12 md:px-12 md:py-16 lg:px-20 xl:px-24">
      <div data-aos="fade-up" suppressHydrationWarning className={CACAR_AIR_CONTENT_INSET}>
        <h2 className="mb-6 text-[1.375rem] font-semibold leading-tight tracking-tight text-[#038F7A] md:mb-8 md:text-[1.5rem] lg:text-[1.625rem] xl:text-[1.6875rem]">
          Cara Penularan
        </h2>

        <div className="mb-8 flex w-full gap-0 sm:mb-10" role="tablist" aria-label="Pilih cara penularan penyakit">
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
            id={tabHeroId}
            type="button"
            role="tab"
            aria-selected={tab === "herpes"}
            aria-controls={panelHeroId}
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

        <div aria-hidden={tab !== "varicella"} className={tab !== "varicella" ? "hidden" : undefined}>
          <PanelVaricella id={panelVarId} labelledBy={tabVarId} />
        </div>
        <div aria-hidden={tab !== "herpes"} className={tab !== "herpes" ? "hidden" : undefined}>
          <PanelHerpes id={panelHeroId} labelledBy={tabHeroId} />
        </div>
      </div>
    </section>
  );
}
