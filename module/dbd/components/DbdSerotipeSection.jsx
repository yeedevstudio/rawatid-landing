import Image from "next/image";
import React from "react";
import { IconInfoCircle } from "@tabler/icons-react";

const TOP_CARDS = [
  {
    image: "/image/bumi.png",
    title: "Penyakit Tropis",
    text: "DBD termasuk penyakit tropis yang paling cepat menyebar di dunia.",
  },
  {
    image: "/image/nyamukhitam.png",
    title: "Ditularkan Nyamuk",
    text: "Melalui gigitan nyamuk Aedes aegypti dan Aedes albopictus yang terinfeksi.",
  },
  {
    image: "/image/indo.png",
    title: "Endemis di Indonesia",
    text: "Hampir seluruh wilayah Indonesia beresiko tinggi terkena DBD.",
  },
];

const SERO_CARDS = [
  { image: "/image/den1.png", code: "DENV-1", label: "Tipe 1" },
  { image: "/image/den2.png", code: "DENV-2", label: "Tipe 2" },
  { image: "/image/den3.png", code: "DENV-3", label: "Tipe 3" },
  { image: "/image/den4.png", code: "DENV-4", label: "Tipe 4" },
];

const cardBase =
  "flex flex-col items-stretch rounded-[16px] border border-neutral-200/90 bg-white px-4 py-6 shadow-[0px_0px_12.1px_0px_#0000001A] md:px-5 md:py-8";

function TopInfoCard({ image, title, text }) {
  return (
    <div className={`${cardBase} min-h-0 min-w-0 gap-4 md:min-h-[320px] md:gap-5`}>
      <div className="flex w-full justify-center">
        <Image
          src={image}
          alt=""
          width={160}
          height={160}
          className="h-28 w-auto max-w-[9rem] object-contain md:h-36 md:max-w-[10rem]"
        />
      </div>
      <h3 className="w-full text-center text-[15px] font-bold leading-snug text-neutral-900 md:text-base">{title}</h3>
      <p className="w-full max-w-none text-center text-[13px] font-normal leading-[1.5] text-neutral-600 md:text-[14px] md:leading-relaxed">
        {text}
      </p>
    </div>
  );
}

function SerotypeCard({ image, code, label }) {
  return (
    <div className={`${cardBase} gap-3 md:gap-4`}>
      <div className="flex w-full justify-center">
        <Image
          src={image}
          alt=""
          width={120}
          height={120}
          className="h-20 w-auto max-w-[5.5rem] object-contain md:h-24 md:max-w-[6.5rem]"
        />
      </div>
      <p className="w-full text-center text-[15px] font-bold text-neutral-900 md:text-base">{code}</p>
      <p className="w-full text-center text-[13px] text-neutral-600 md:text-sm">{label}</p>
    </div>
  );
}

function FaktaKunciCallout() {
  return (
    <aside
      className="mt-8 w-full rounded-2xl border border-[#DB8B1A] bg-white p-4 md:mt-10 md:p-5 lg:p-6"
      aria-label="Fakta kunci"
    >
      <div className="flex gap-3 md:gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#DB8B1A]/15 text-[#DB8B1A] md:h-11 md:w-11">
          <IconInfoCircle className="h-6 w-6 stroke-[1.5] md:h-7 md:w-7" aria-hidden />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-[15px] font-bold leading-tight text-[#DB8B1A] md:text-base">Fakta Kunci</h3>
          <p className="mt-2 text-left text-[13px] font-normal leading-relaxed text-neutral-800 md:mt-3 md:text-[15px] md:leading-[1.65]">
            DBD bukan sekadar &apos;demam biasa&apos;. Tanpa penanganan yang tepat, penyakit ini bisa menyebabkan
            komplikasi serius bahkan kematian. Namun dengan deteksi dini dan penanganan yang benar, angka kematian
            akibat DBD bisa ditekan di bawah 1%.
          </p>
        </div>
      </div>
    </aside>
  );
}

export default function DbdSerotipeSection() {
  return (
    <section className="w-full bg-white px-5 md:px-12 lg:px-20 xl:px-24 py-12 md:py-16 lg:py-20">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {TOP_CARDS.map((c) => (
          <TopInfoCard key={c.title} {...c} />
        ))}
      </div>

      <div className="mt-14 w-full text-center md:mt-16 lg:mt-20">
        <h2 className="text-lg font-semibold text-[#038F7A] md:text-xl">Empat Serotipe Virus Dengue</h2>
        <p className="mt-3 text-[14px] font-normal leading-relaxed text-neutral-600 md:mt-4 md:text-base">
          Inilah yang membuat seseorang bisa menderita DBD lebih dari satu kali seumur hidup.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-4 md:mt-12 lg:mt-14 lg:grid-cols-4 lg:gap-6">
        {SERO_CARDS.map((c) => (
          <SerotypeCard key={c.code} {...c} />
        ))}
      </div>

      <p className="mt-10 w-full text-center text-[13px] font-normal leading-relaxed text-neutral-600 md:mt-12 md:text-[15px] md:leading-[1.65]">
        Jika seseorang pernah terinfeksi serotipe 1, tubuhnya akan kebal terhadap serotipe tersebut seumur hidup —
        namun tetap rentan terhadap serotipe 2, 3, dan 4. Infeksi kedua justru lebih berisiko menyebabkan DBD yang
        parah.
      </p>

      <FaktaKunciCallout />
    </section>
  );
}
