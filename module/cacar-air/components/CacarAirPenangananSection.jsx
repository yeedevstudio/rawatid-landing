"use client";

import {
  IconBandage,
  IconBath,
  IconBolt,
  IconBottle,
  IconBrain,
  IconCell,
  IconCup,
  IconPill,
  IconPills,
  IconScissors,
  IconShieldPlus,
  IconShirt,
  IconSnowflake,
} from "@tabler/icons-react";
import React, { useId, useState } from "react";

import { CACAR_AIR_CARD_BOX_SHADOW, CACAR_AIR_CONTENT_INSET } from "@/module/cacar-air/cacarAirLayoutClasses";

const TAB_BTN_L =
  "relative flex min-h-[48px] flex-1 items-center justify-center rounded-l-[10px] rounded-r-none px-2 py-3 text-center text-[12px] font-semibold leading-snug outline-none transition-all duration-300 ease-out sm:px-3 sm:text-[14px] md:px-4 md:text-[15px]";
const TAB_BTN_R =
  "relative flex min-h-[48px] flex-1 items-center justify-center rounded-r-[10px] rounded-l-none px-2 py-3 text-center text-[12px] font-semibold leading-snug outline-none transition-all duration-300 ease-out sm:px-3 sm:text-[14px] md:px-4 md:text-[15px]";
const FOCUS_RING = "focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-[#038F7A] focus-visible:ring-offset-2";

const ICON_WRAP =
  "mb-4 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#038F7A]/10 text-[#038F7A] md:mb-5 md:h-14 md:w-14";

/** Satu baris: border luar tipis, pemisah vertikal, tanpa box-shadow */
function CareStrip({ items }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-neutral-200/90 bg-white [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <div className="flex min-w-[720px] divide-x divide-neutral-200/90 md:min-w-0 md:grid md:grid-cols-6">
        {items.map(({ Icon, text }, i) => (
          <div
            key={i}
            className="flex min-w-[120px] flex-1 flex-col items-center px-3 py-5 text-center md:min-w-0 md:px-3 md:py-6 lg:px-4"
          >
            <span className={ICON_WRAP} aria-hidden>
              <Icon className="h-6 w-6 stroke-[1.5] md:h-7 md:w-7" />
            </span>
            <p className="text-[12px] font-normal leading-[1.55] text-neutral-700 md:text-[13px] md:leading-relaxed lg:text-[14px]">
              {text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

const VARICELLA_TIPS = [
  {
    Icon: IconBath,
    text: "Mandi air hangat yang dicampur sedikit oatmeal koloid atau baking soda untuk mengurangi gatal.",
  },
  {
    Icon: IconBottle,
    text: "Oleskan losion calamine atau krim antihistamin topikal untuk mengurangi rasa gatal.",
  },
  {
    Icon: IconScissors,
    text: "Potong kuku dan hindari menggaruk untuk mencegah infeksi bakteri dan bekas luka.",
  },
  {
    Icon: IconCup,
    text: "Minum banyak cairan untuk mencegah dehidrasi.",
  },
  {
    Icon: IconPill,
    text: "Untuk demam dan nyeri: gunakan paracetamol.",
  },
  {
    Icon: IconShirt,
    text: "Gunakan pakaian longgar dan lembut dari bahan katun.",
  },
];

const HERPES_ANTIVIRAL_CARDS = [
  {
    Icon: IconBandage,
    text: "Mempercepat penyembuhan ruam.",
  },
  {
    Icon: IconBolt,
    text: "Mengurangi keparahan nyeri saat fase akut.",
  },
  {
    Icon: IconCell,
    text: "Mengurangi risiko terjadinya Postherpetic Neuralgia (PHN).",
  },
];

const HERPES_PAIN_CARDS = [
  {
    Icon: IconPills,
    text: "Analgesik (pereda nyeri) seperti paracetamol, ibuprofen, atau kombinasi, sesuai resep dokter",
  },
  {
    Icon: IconBrain,
    text: "Untuk nyeri sedang-berat: dokter mungkin meresepkan obat antikonvulsan (gabapentin, pregabalin), antidepresan trisiklik, atau opioid lemah.",
  },
  {
    Icon: IconSnowflake,
    text: "Kompres dingin atau basah pada area ruam untuk meredakan nyeri dan gatal.",
  },
  {
    Icon: IconShieldPlus,
    text: "Jaga area ruam tetap bersih dan kering; gunakan perban longgar jika perlu.",
  },
];

function HerpesIconCard({ Icon, children }) {
  return (
    <article className="flex min-h-[200px] flex-col items-center rounded-xl border border-neutral-200/90 bg-white px-3 py-5 text-center shadow-none md:min-h-[220px] md:px-4 md:py-6">
      <span className={ICON_WRAP} aria-hidden>
        <Icon className="h-6 w-6 stroke-[1.5] md:h-7 md:w-7" />
      </span>
      <p className="text-[12px] font-normal leading-[1.55] text-neutral-700 md:text-[13px] md:leading-relaxed lg:text-[14px]">
        {children}
      </p>
    </article>
  );
}

function PanelVaricella({ id, labelledBy }) {
  return (
    <div id={id} role="tabpanel" aria-labelledby={labelledBy}>
      <div className="space-y-4 md:space-y-5">
        <h3 className="text-lg font-semibold leading-snug text-[#038F7A] md:text-xl">Penanganan Varicella (Cacar Air)</h3>
        <p className="text-[15px] font-normal leading-[1.65] text-neutral-800 md:text-[16px] md:leading-relaxed lg:text-[17px]">
          Pada anak-anak yang sehat, cacar air umumnya sembuh sendiri dalam 7-10 hari. Penanganan difokuskan pada
          meredakan gejala dan mencegah infeksi sekunder.
        </p>
        <h4 className="text-base font-semibold leading-snug text-[#038F7A] md:text-lg">
          Penanganan Umum (dapat dilakukan di rumah):
        </h4>
        <CareStrip items={VARICELLA_TIPS} />
      </div>
    </div>
  );
}

function PanelHerpes({ id, labelledBy }) {
  return (
    <div id={id} role="tabpanel" aria-labelledby={labelledBy}>
      <div className="space-y-8 md:space-y-10">
        <div className="space-y-4 md:space-y-5">
          <h3 className="text-lg font-semibold leading-snug text-[#038F7A] md:text-xl">Penanganan Herpes Zoster (Cacar Ular)</h3>
          <p className="text-[15px] font-normal leading-[1.65] text-neutral-800 md:text-[16px] md:leading-relaxed lg:text-[17px]">
            Herpes zoster umumnya membutuhkan penanganan medis yang lebih aktif dibanding cacar air, terutama karena
            disertai nyeri yang sangat hebat serta risiko komplikasi yang lebih tinggi, khususnya pada lansia.
          </p>
        </div>

        <div className="space-y-4 md:space-y-5">
          <h4 className="text-base font-semibold leading-snug text-[#038F7A] md:text-lg">
            Obat Antivirus (sangat penting, segera ke dokter!):
          </h4>
          <p className="text-[15px] font-normal leading-[1.65] text-neutral-800 md:text-[16px] md:leading-relaxed lg:text-[17px]">
            Mulailah terapi antivirus oral (misalnya Acyclovir, Valacyclovir, atau Famciclovir) dalam 72 jam pertama
            sejak ruam muncul agar manfaat klinis optimal. Segera konsultasikan ke tenaga kesehatan.
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-4 md:gap-5">
            {HERPES_ANTIVIRAL_CARDS.map(({ Icon, text }, i) => (
              <HerpesIconCard key={i} Icon={Icon}>
                {text}
              </HerpesIconCard>
            ))}
          </div>
        </div>

        <div className="space-y-4 md:space-y-5">
          <h4 className="text-base font-semibold leading-snug text-[#038F7A] md:text-lg">Penanganan Nyeri Herpes Zoster.</h4>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4 xl:gap-5">
            {HERPES_PAIN_CARDS.map(({ Icon, text }, i) => (
              <HerpesIconCard key={i} Icon={Icon}>
                {text}
              </HerpesIconCard>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CacarAirPenangananSection() {
  const uid = useId();
  const tabVarId = `${uid}-pn-v`;
  const tabHerId = `${uid}-pn-h`;
  const panelVarId = `${uid}-pn-pv`;
  const panelHerId = `${uid}-pn-ph`;

  const [tab, setTab] = useState("varicella");

  return (
    <section id="penanganan" className="scroll-mt-24 bg-white px-5 py-12 md:px-12 md:py-16 lg:px-20 xl:px-24">
      <div className={CACAR_AIR_CONTENT_INSET}>
        <h2 className="mb-6 text-[1.375rem] font-semibold leading-tight tracking-tight text-[#038F7A] md:mb-8 md:text-[1.5rem] lg:text-[1.625rem] xl:text-[1.6875rem]">
          Penanganan
        </h2>

        <div className="mb-8 flex w-full gap-0 sm:mb-10" role="tablist" aria-label="Pilih jenis penanganan">
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
