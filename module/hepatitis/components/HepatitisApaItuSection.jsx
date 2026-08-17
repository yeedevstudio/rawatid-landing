import { IconInfoCircle } from "@tabler/icons-react";
import React from "react";

import { HEPATITIS_CONTENT_INSET } from "@/module/hepatitis/hepatitisLayoutClasses";

const PERBEDAAN_ITEMS = [
  "Hepatitis A: menular lewat makanan/air yang terkontaminasi, tidak menjadi kronis, bisa dicegah dengan vaksin.",
  "Hepatitis B: menular lewat darah dan cairan tubuh, bisa menjadi kronis, bisa dicegah dengan vaksin.",
  "Hepatitis C: menular lewat darah, sering menjadi kronis, belum ada vaksin. Ketiganya menyerang hati tetapi disebabkan virus yang berbeda dan memiliki cara penularan yang berbeda pula.",
];

export default function HepatitisApaItuSection() {
  return (
    <section id="apa-itu" className="scroll-mt-24 bg-white px-5 py-12 md:px-12 md:py-16 lg:px-20 xl:px-24">
      <div className={HEPATITIS_CONTENT_INSET}>
        <div className="space-y-8 md:space-y-10">
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-14">
            {/* Left: text */}
            <div data-aos="fade-right" suppressHydrationWarning className="space-y-4 md:space-y-5">
              <h2 className="text-[1.375rem] font-semibold leading-tight tracking-tight text-[#038F7A] md:text-[1.5rem] lg:text-[1.625rem] xl:text-[1.6875rem]">
                Apa Itu Hepatitis A?
              </h2>
              <p className="text-[15px] font-normal leading-relaxed text-neutral-700 md:text-[16px] lg:text-[17px]">
                Hepatitis A adalah infeksi akut pada hati yang disebabkan oleh{" "}
                <em>Hepatitis A Virus</em> (HAV). Infeksi ini sebagai infeksi akut karena berlangsung
                dalam jangka waktu tertentu dan umumnya sembuh sendiri tidak seperti Hepatitis B atau C
                yang bisa menjadi kronis.
              </p>
              <p className="text-[15px] font-normal leading-relaxed text-neutral-700 md:text-[16px] lg:text-[17px]">
                Hati adalah organ vital yang bertugas menyaring racun dari darah, memproduksi protein
                penting, dan membantu pencernaan. Ketika virus Hepatitis A menyerang, semua fungsi ini
                menjadi terganggu dan menyebabkan berbagai gejala.
              </p>
              <h3 className="text-[15px] font-semibold leading-snug text-[#038F7A] md:text-[16px] lg:text-[17px]">
                Seberapa Umum Hepatitis A?
              </h3>
              <p className="text-[15px] font-normal leading-relaxed text-neutral-700 md:text-[16px] lg:text-[17px]">
                Menurut WHO, terdapat sekitar 1,4 juta kasus Hepatitis A yang dilaporkan setiap
                tahunnya di seluruh dunia, meskipun jumlah sebenarnya diperkirakan jauh lebih tinggi
                karena banyak kasus tidak terdeteksi.
              </p>
              <p className="text-[15px] font-normal leading-relaxed text-neutral-700 md:text-[16px] lg:text-[17px]">
                Di Indonesia, Hepatitis A masih menjadi masalah kesehatan masyarakat yang cukup
                signifikan, terutama di daerah dengan akses sanitasi dan air bersih yang terbatas.
              </p>
            </div>

            {/* Right: organ image */}
            <img
              data-aos="fade-left"
              suppressHydrationWarning
              src="/image/organ.webp"
              alt="Ilustrasi organ hati dan fungsinya"
              className="h-auto w-full object-contain"
            />
          </div>

          {/* Callout */}
          <div data-aos="fade-up" suppressHydrationWarning className="flex items-start gap-4 rounded-2xl border border-[#F5A623]/40 bg-white px-6 py-6 md:px-8 md:py-7">
            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#F5A623]/60 bg-white text-[#F5A623]">
              <IconInfoCircle className="h-5 w-5 stroke-[1.5]" aria-hidden />
            </div>
            <div className="min-w-0 space-y-2">
              <p className="text-[15px] font-semibold leading-snug text-[#D97706] md:text-[16px]">
                Penting untuk Diketahui : Perbedaan Hepatitis A, B, dan C
              </p>
              <ul className="space-y-1.5">
                {PERBEDAAN_ITEMS.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-[14px] leading-relaxed text-neutral-700 md:text-[15px]">
                    <span className="mt-[7px] h-[5px] w-[5px] shrink-0 rounded-full bg-neutral-500" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
