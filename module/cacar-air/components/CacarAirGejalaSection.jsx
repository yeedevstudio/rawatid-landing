"use client";

import {
  IconBandage,
  IconBolt,
  IconBubble,
  IconDroplet,
  IconDroplets,
  IconFlame,
  IconInfoCircle,
  IconSparkles,
  IconStretching,
  IconThermometer,
  IconTrendingDown,
  IconUser,
} from "@tabler/icons-react";
import React, { useId, useState } from "react";

import { CACAR_AIR_CARD_BOX_SHADOW, CACAR_AIR_CONTENT_INSET } from "@/module/cacar-air/cacarAirLayoutClasses";

const ICON_RING =
  "flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#038F7A]/10 text-[#038F7A] md:h-11 md:w-11";

const IconSoftCurve = IconTrendingDown;

function IconCounterArrow({ className, ...rest }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
      {...rest}
    >
      <path d="M4 17h8" />
      <path d="M8 13v8" />
      <path d="M16 11h4" />
      <path d="M18 9v4" />
    </svg>
  );
}

function Bullet({ Icon, children }) {
  return (
    <li className="flex gap-3 md:gap-4">
      <span className={ICON_RING} aria-hidden>
        <Icon className="h-[1.15rem] w-[1.15rem] shrink-0 stroke-[1.5] md:h-5 md:w-5" />
      </span>
      <span className="min-w-0 flex-1 text-[15px] font-normal leading-[1.65] text-neutral-800 md:text-[16px] md:leading-relaxed lg:text-[17px] lg:leading-[1.7]">
        {children}
      </span>
    </li>
  );
}

function PhaseHeading({ children }) {
  return <h3 className="text-base font-semibold leading-snug text-[#038F7A] md:text-lg">{children}</h3>;
}

function WarningPhnBox() {
  return (
    <div className="mt-10 rounded-2xl border border-red-300/90 bg-white px-5 py-5 md:mt-12 md:px-6 md:py-6">
      <div className="flex flex-wrap items-start gap-3 md:gap-4">
        <span
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#DC2626] text-white md:h-11 md:w-11"
          aria-hidden
        >
          <IconInfoCircle className="h-6 w-6 text-white" stroke={2} />
        </span>
        <div className="min-w-0 flex-1 space-y-3">
          <p className="text-[15px] font-semibold leading-snug text-[#DC2626] md:text-[16px] md:leading-snug lg:text-[17px]">
            Waspada: Nyeri Pasca-Herpes (Postherpetic Neuralgia / PHN)
          </p>
          <p className="text-[15px] font-normal leading-[1.65] text-neutral-900 md:text-[16px] md:leading-relaxed lg:text-[17px] lg:leading-[1.7]">
            Sekitar 10-18% penderita <em className="italic">Herpes Zoster</em> mengalami nyeri saraf yang bertahan
            selama berbulan-bulan hingga bertahun-tahun setelah ruam sembuh. Kondisi ini disebut Postherpetic Neuralgia
            (PHN) dan merupakan komplikasi yang sangat mengganggu kualitas hidup. Risiko PHN meningkat signifikan pada
            usia di atas 60 tahun.
          </p>
        </div>
      </div>
    </div>
  );
}

function VaricellaPanel({ id, labelledBy }) {
  return (
    <div id={id} role="tabpanel" aria-labelledby={labelledBy}>
      <div className="space-y-8 md:space-y-10">
        <div className="space-y-4">
          <PhaseHeading>Fase 1 — Gejala Awal (1-2 hari sebelum ruam muncul):</PhaseHeading>
          <ul className="flex list-none flex-col gap-4 pl-0 md:gap-5">
            <Bullet Icon={IconThermometer}>Demam ringan hingga sedang (37,5 - 38,9°C).</Bullet>
            <Bullet Icon={IconUser}>Sakit kepala, kelelahan, dan rasa tidak enak badan.</Bullet>
            <Bullet Icon={IconSoftCurve}>Nafsu makan menurun.</Bullet>
            <Bullet Icon={IconDroplet}>
              Pada anak kecil, gejala <em className="italic">prodromal</em> ini sering ringan atau bahkan tidak ada.
            </Bullet>
          </ul>
        </div>

        <div className="space-y-4">
          <PhaseHeading>Fase 2 — Ruam Kulit (berlangsung 5-7 hari):</PhaseHeading>
          <p className="text-[15px] font-normal leading-[1.65] text-neutral-800 md:text-[16px] md:leading-relaxed lg:text-[17px] lg:leading-[1.7]">
            Ruam cacar air sangat khas karena melalui beberapa tahap dalam waktu yang hampir bersamaan:
          </p>
          <ul className="flex list-none flex-col gap-4 pl-0 md:gap-5">
            <Bullet Icon={IconThermometer}>
              Bercak merah (<em className="italic">makula</em>) → benjolan kecil (<em className="italic">papula</em>) →
              gelembung berisi cairan bening (<em className="italic">vesikel</em>) → pecah → mengering menjadi keropeng (
              <em className="italic">krusta</em>).
            </Bullet>
            <Bullet Icon={IconUser}>
              Ruam pertama muncul di wajah, kulit kepala, atau dada, lalu menyebar ke seluruh tubuh termasuk bagian
              dalam mulut, kelopak mata, dan alat kelamin.
            </Bullet>
            <Bullet Icon={IconSoftCurve}>Jumlah gelembung bisa mencapai 250-500 buah.</Bullet>
            <Bullet Icon={IconDroplet}>
              Terasa sangat gatal (<em className="italic">pruritus</em>), terutama saat fase <em className="italic">vesikel</em>.
            </Bullet>
            <Bullet Icon={IconDroplets}>
              Ciri khas: dalam satu waktu bisa ditemukan semua tahap ruam (ada yang masih merah, ada yang sudah jadi
              gelembung, ada yang sudah keropeng), disebut &quot;bintang di langit&quot; (
              <em className="italic">pleomorfik</em>).
            </Bullet>
          </ul>
        </div>
      </div>
    </div>
  );
}

function HerpesPanel({ id, labelledBy }) {
  return (
    <div id={id} role="tabpanel" aria-labelledby={labelledBy}>
      <div className="space-y-8 md:space-y-10">
        <p className="text-[15px] font-normal leading-[1.65] text-neutral-800 md:text-[16px] md:leading-relaxed lg:text-[17px] lg:leading-[1.7]">
          Gejala <em className="italic">Herpes Zoster</em> atau Cacar Ular berbeda secara signifikan dari Cacar Air,
          terutama karena disertai nyeri yang sangat khas dan intens.
        </p>

        <div className="space-y-4">
          <PhaseHeading>Fase 1 — Sebelum Ruam Muncul (1-5 hari sebelumnya)</PhaseHeading>
          <ul className="flex list-none flex-col gap-4 pl-0 md:gap-5">
            <Bullet Icon={IconFlame}>
              Nyeri, rasa terbakar, atau kesemutan di area tertentu pada kulit, ini seringkali disalahartikan sebagai
              nyeri otot atau saraf biasa.
            </Bullet>
            <Bullet Icon={IconSparkles}>
              Kulit terasa sangat sensitif bahkan terhadap sentuhan ringan (<em className="italic">alodinia</em>).
            </Bullet>
            <Bullet Icon={IconThermometer}>Demam ringan, sakit kepala, dan rasa lelah.</Bullet>
          </ul>
        </div>

        <div className="space-y-4">
          <PhaseHeading>Fase 2 — Ruam Aktif (berlangsung 7-10 hari)</PhaseHeading>
          <ul className="flex list-none flex-col gap-4 pl-0 md:gap-5">
            <Bullet Icon={IconBubble}>
              Ruam muncul sebagai kumpulan gelembung berisi cairan yang berkelompok, seperti untaian buah anggur.
            </Bullet>
            <Bullet Icon={IconBandage}>
              Ciri khas paling penting: ruam hanya muncul di satu sisi tubuh (tidak menyeberang ke sisi lain), mengikuti
              jalur satu saraf, biasanya berbentuk seperti sabuk atau pita memanjang.
            </Bullet>
            <Bullet Icon={IconStretching}>
              Lokasi tersering ada pada dada, perut/pinggang, dan wajah (terutama sekitar mata yang berbahaya).
            </Bullet>
            <Bullet Icon={IconBolt}>Nyeri terasa sangat hebat, seperti ditusuk, dibakar, atau tersengat listrik.</Bullet>
            <Bullet Icon={IconCounterArrow}>Jumlah gelembung bisa mencapai 250-500 buah.</Bullet>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function CacarAirGejalaSection() {
  const uid = useId();
  const tabVaricellaId = `${uid}-t-v`;
  const tabHerpesId = `${uid}-t-h`;
  const panelVaricellaId = `${uid}-p-v`;
  const panelHerpesId = `${uid}-p-h`;

  const [tab, setTab] = useState("varicella");

  return (
    <section id="tanda-gejala" className="scroll-mt-24 bg-white px-5 py-12 md:px-12 md:py-16 lg:px-20 xl:px-24">
      <div data-aos="fade-up" suppressHydrationWarning className={CACAR_AIR_CONTENT_INSET}>
        <h2 className="mb-6 font-semibold leading-tight tracking-tight text-[#038F7A] text-[1.375rem] md:mb-8 md:text-[1.5rem] lg:text-[1.625rem] xl:text-[1.6875rem]">
          Tanda & Gejala
        </h2>

        <div className="mb-8 flex w-full max-w-none gap-0 sm:mb-10" role="tablist" aria-label="Pilih penyakit untuk gejala">
          <button
            id={tabVaricellaId}
            type="button"
            role="tab"
            aria-selected={tab === "varicella"}
            aria-controls={panelVaricellaId}
            className={[
              "relative flex min-h-[48px] flex-1 items-center justify-center rounded-l-[10px] rounded-r-none px-2 py-3 text-center text-[12px] font-semibold leading-snug outline-none transition-all duration-300 ease-out sm:px-3 sm:text-[14px] md:px-4 md:text-[15px]",
              tab === "varicella"
                ? "z-[1] bg-[#038F7A] text-white shadow-none hover:brightness-[1.06] active:brightness-95"
                : `z-0 bg-white text-neutral-600 ${CACAR_AIR_CARD_BOX_SHADOW} hover:-translate-y-px hover:brightness-[1.02] active:brightness-[0.99]`,
              "focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-[#038F7A] focus-visible:ring-offset-2",
            ].join(" ")}
            onClick={() => setTab("varicella")}
          >
            Varicella (Cacar Air)
          </button>
          <button
            id={tabHerpesId}
            type="button"
            role="tab"
            aria-selected={tab === "herpes"}
            aria-controls={panelHerpesId}
            className={[
              "relative flex min-h-[48px] flex-1 items-center justify-center rounded-r-[10px] rounded-l-none px-2 py-3 text-center text-[12px] font-semibold leading-snug outline-none transition-all duration-300 ease-out sm:px-3 sm:text-[14px] md:px-4 md:text-[15px]",
              tab === "herpes"
                ? "z-[1] bg-[#038F7A] text-white shadow-none hover:brightness-[1.06] active:brightness-95"
                : `z-0 bg-white text-neutral-600 ${CACAR_AIR_CARD_BOX_SHADOW} hover:-translate-y-px hover:brightness-[1.02] active:brightness-[0.99]`,
              "focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-[#038F7A] focus-visible:ring-offset-2",
            ].join(" ")}
            onClick={() => setTab("herpes")}
          >
            Herpes Zoster (Cacar Ular)
          </button>
        </div>

        <div aria-hidden={tab !== "varicella"} className={tab !== "varicella" ? "hidden" : undefined}>
          <VaricellaPanel id={panelVaricellaId} labelledBy={tabVaricellaId} />
        </div>
        <div aria-hidden={tab !== "herpes"} className={tab !== "herpes" ? "hidden" : undefined}>
          <HerpesPanel id={panelHerpesId} labelledBy={tabHerpesId} />
        </div>

        <WarningPhnBox />
      </div>
    </section>
  );
}
