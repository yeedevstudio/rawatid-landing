import {
  IconInfoCircle,
  IconQuestionMark,
  IconUsersGroup,
  IconTemperature,
  IconCirclePlus,
} from "@tabler/icons-react";
import React from "react";

import { HEPATITIS_CARD_BOX_SHADOW, HEPATITIS_CONTENT_INSET } from "@/module/hepatitis/hepatitisLayoutClasses";

const ITEMS = [
  {
    id: "apa-itu",
    title: "Apa Itu Hepatitis A?",
    description: "Penjelasan mengenai definisi hepatitis A",
    Icon: IconInfoCircle,
    hrefId: "apa-itu",
  },
  {
    id: "penyebab",
    title: "Penyebab & Faktor Risiko",
    description: "Kenali penyebab & Resiko yang terjadi pada masing masing penyakit",
    Icon: IconQuestionMark,
    hrefId: "penyebab",
  },
  {
    id: "cara-penularan",
    title: "Cara Penularan",
    description: "Pelajari bagaimana virus menyebar dari satu orang ke orang lain",
    Icon: IconUsersGroup,
    hrefId: "cara-penularan",
  },
  {
    id: "tanda-gejala",
    title: "Tanda & Gejala",
    description: "Kenali gejala yang muncul pada masing masing penyakit",
    Icon: IconTemperature,
    hrefId: "tanda-gejala",
  },
  {
    id: "penanganan",
    title: "Penanganan",
    description: "Pelajari bagaimana virus menyebar dari satu orang ke orang lain",
    Icon: IconCirclePlus,
    hrefId: "penanganan",
  },
];

function ExploreCard({ item }) {
  const { Icon } = item;
  const body = (
    <>
      <div className="flex w-full shrink-0 justify-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#038F7A] text-white md:h-[3.625rem] md:w-[3.625rem]">
          <Icon className="h-7 w-7 stroke-[1.5] md:h-[1.875rem] md:w-[1.875rem]" aria-hidden />
        </div>
      </div>
      <h3 className="w-full max-w-none text-center text-[15px] font-semibold leading-snug text-neutral-900 md:text-[16px] md:leading-snug lg:text-[17px]">
        {item.title}
      </h3>
      <p className="w-full max-w-none text-center text-[12px] font-normal leading-[1.52] tracking-[0.01em] text-neutral-600 md:text-[13px] md:leading-[1.55] lg:text-[14px] lg:leading-relaxed">
        {item.description}
      </p>
    </>
  );

  return (
    <a
      href={`#${item.hrefId}`}
      className={`flex min-h-[240px] min-w-0 flex-col items-stretch justify-start gap-4 rounded-[16px] border border-neutral-200/90 bg-white px-5 py-7 ${HEPATITIS_CARD_BOX_SHADOW} cursor-pointer md:min-h-[268px] md:gap-[1.125rem] md:px-5 md:py-8 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#038F7A]`}
    >
      {body}
    </a>
  );
}

export default function HepatitisExploreSection() {
  return (
    <section className="w-full bg-white px-5 py-12 md:px-12 md:py-16 lg:px-20 xl:px-24">
      <div className={HEPATITIS_CONTENT_INSET}>
        <h2 data-aos="fade-up" suppressHydrationWarning className="mb-7 text-[1.375rem] font-semibold leading-tight tracking-tight text-[#038F7A] md:mb-9 md:text-[1.5rem] lg:mb-10 lg:text-[1.625rem] xl:text-[1.6875rem]">
          Jelajahi Informasi
        </h2>
        <div data-aos="fade-up" data-aos-delay="100" suppressHydrationWarning className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 lg:gap-6 xl:gap-7">
          {ITEMS.map((item) => (
            <ExploreCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
