import React from "react";

import { HEPATITIS_CONTENT_INSET } from "@/module/hepatitis/hepatitisLayoutClasses";

const CREDITS = [
  {
    role: "Medical Writer",
    names: ["dr. Iffah Rizki Hasanah"],
  },
  {
    role: "Visual & Development",
    names: ["Sitti Tsarwa Akin", "Raisulwathan", "Khalil Maulana"],
  },
  {
    role: "Pengarah Produksi",
    names: ["Yaumil Ikhsan"],
  },
];

export default function HepatitisClosingSection() {
  return (
    <section className="bg-white px-5 py-12 md:px-12 md:py-16 lg:px-20 xl:px-24">
      <div data-aos="fade-up" suppressHydrationWarning className={HEPATITIS_CONTENT_INSET}>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-6">
          {CREDITS.map(({ role, names }) => (
            <div
              key={role}
              className="flex flex-col items-center gap-3 rounded-2xl border border-neutral-200/90 bg-white px-6 py-7 text-center"
            >
              <p className="text-[14px] font-semibold text-neutral-800 md:text-[15px]">{role}</p>
              <div className="space-y-1">
                {names.map((name) => (
                  <p key={name} className="text-[14px] leading-relaxed text-neutral-600 md:text-[15px]">
                    {name}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
