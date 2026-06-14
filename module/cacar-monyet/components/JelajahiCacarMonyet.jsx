import {
  IconHelpCircle,
  IconInfoCircle,
  IconMedicalCross,
  IconTemperature,
  IconUsers,
} from "@tabler/icons-react";
import React from "react";

const ITEMS = [
  {
    id: "apa-itu-cacar-monyet",
    title: <>Apa Itu Cacar Monyet? <em>(Mpox)</em></>,
    description: <>Penjelasan mengenai definisi Cacar Monyet <em>(Mpox)</em>?</>,
    Icon: IconInfoCircle,
    linked: true,
  },
  {
    id: "penyebab-risiko",
    title: "Penyebab & Faktor Risiko",
    description: "Kenali penyebab & Resiko yang terjadi pada masing masing penyakit",
    Icon: IconHelpCircle,
    linked: true,
  },
  {
    id: "cara-penularan",
    title: "Cara Penularan",
    description: "Pelajari bagaimana virus menyebar dari satu orang ke orang lain",
    Icon: IconUsers,
    linked: false,
  },
  {
    id: "tanda-gejala",
    title: "Tanda & Gejala",
    description: "Kenali gejala yang muncul pada masing masing penyakit",
    Icon: IconTemperature,
    linked: false,
  },
  {
    id: "penanganan",
    title: "Penanganan",
    description: "Pelajari bagaimana virus menyebar dari satu orang ke orang lain",
    Icon: IconMedicalCross,
    linked: false,
  },
];

function ExploreCard({ item }) {
  const { Icon } = item;
  const body = (
    <>
      <div className="flex w-full shrink-0 justify-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#038F7A] text-white">
          <Icon className="h-7 w-7 stroke-[1.5]" aria-hidden />
        </div>
      </div>
      <h3 className="w-full max-w-none text-center text-[15px] font-bold leading-snug text-neutral-900 md:text-base">
        {item.title}
      </h3>
      <p className="w-full max-w-none text-center text-[13px] font-normal leading-[1.5] text-neutral-600 md:text-[14px] md:leading-relaxed">
        {item.description}
      </p>
    </>
  );

  const className =
    "flex min-h-[280px] min-w-0 md:min-h-[300px] flex-col items-stretch justify-start gap-4 rounded-[16px] bg-white px-4 py-6 md:gap-5 md:px-5 md:py-8 shadow-[0px_0px_12.1px_0px_#0000001A]";

  if (item.linked) {
    return (
      <a href={`#${item.id}`} className={`${className} cursor-pointer`}>
        {body}
      </a>
    );
  }

  return <div className={className}>{body}</div>;
}

export default function JelajahiCacarMonyet() {
  return (
    <section className="w-full bg-white px-5 py-12 md:px-12 md:py-16 lg:px-20 lg:py-20 xl:px-24">
      <h2 data-aos="fade-up" suppressHydrationWarning className="mb-8 text-xl font-bold text-[#038F7A] md:mb-10 md:text-2xl">
        Jelajahi Informasi
      </h2>
      <div data-aos="fade-up" data-aos-delay="100" suppressHydrationWarning className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 xl:gap-6">
        {ITEMS.map((item) => (
          <ExploreCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
