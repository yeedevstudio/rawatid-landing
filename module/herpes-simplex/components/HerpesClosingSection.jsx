import { IconInfoCircle } from "@tabler/icons-react";
import React from "react";

import { HERPES_CONTENT_INSET } from "@/module/herpes-simplex/herpesLayoutClasess";

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

export default function HerpesClosingSection() {
  return (
    <section className="bg-white px-5 py-12 md:px-12 md:py-16 lg:px-20 xl:px-24">
      <div className={HERPES_CONTENT_INSET}>
        <div data-aos="fade-up" suppressHydrationWarning className="space-y-12 md:space-y-16">
          
          <div className="flex items-start gap-4 rounded-2xl border border-[#00C3D0] bg-white px-6 py-6 md:px-8 md:py-7">
            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#038F7A]/40 bg-[#038F7A]/5 text-[#038F7A]">
              <IconInfoCircle className="h-5 w-5 stroke-[1.5]" aria-hidden />
            </div>
            <div className="min-w-0 space-y-2">
              <p className="text-[15px] font-semibold leading-snug text-[#00C3D0] md:text-[16px]">
                Pesan Penting untuk Penderita <em>Herpes Simplex</em>
              </p>
              <p className="text-[14px] font-normal leading-relaxed text-neutral-700 md:text-[15px]">
                Didiagnosis <em>Herpes Simplex</em> bukan akhir dari segalanya, dengan pengobatan yang
                tepat dan gaya hidup sehat, penderita <em>Herpes Simplex</em> bisa menjalani kehidupan
                normal termasuk hubungan seksual yang sehat dan kehamilan yang aman. Konsultasikan
                keluhan secara jujur dengan dokter, patuh pada pengobatan dan berkomunikasi terbuka
                dengan pasangan.
              </p>
            </div>
          </div>

          {/* Credit cards */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 md:gap-6">
            {CREDITS.map(({ role, names }) => (
              <div
                key={role}
                className="flex flex-col items-center justify-center rounded-2xl border border-neutral-200/90 bg-white px-6 py-8 text-center"
              >
                <p className="mb-3 text-[15px] font-bold leading-snug text-neutral-900 md:text-[16px]">
                  {role}
                </p>
                <div className="space-y-1">
                  {names.map((name) => (
                    <p key={name} className="text-[14px] font-normal leading-relaxed text-neutral-600 md:text-[15px]">
                      {name}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
