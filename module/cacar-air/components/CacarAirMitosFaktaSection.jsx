import React from "react";

import { CACAR_AIR_CONTENT_INSET } from "@/module/cacar-air/cacarAirLayoutClasses";

const MYTH_ROWS = [
  {
    mitos: "Cacar Air hanya sekali seumur hidup, jadi tidak perlu vaksin.",
    salah: (
      <>
        Meski jarang, Cacar Air bisa terjadi dua kali pada orang dengan imunitas lemah, dan virus tetap bisa reaktivasi
        menjadi <em className="italic">Herpes Zoster</em>.
      </>
    ),
    fakta: (
      <>
        Vaksin tidak hanya mencegah Cacar Air, tapi juga mengurangi risiko <em className="italic">Herpes Zoster</em> di
        kemudian hari.
      </>
    ),
  },
  {
    mitos: "Cacar Ular bisa menular seperti Cacar Air.",
    salah: (
      <>
        <em className="italic">Herpes Zoster</em> tidak menyebar melalui udara.
      </>
    ),
    fakta: (
      <>
        Penularannya hanya melalui kontak langsung cairan <em className="italic">vesikel</em> aktif, dan orang yang
        tertular akan mengalami Cacar Air, bukan Cacar Ular.
      </>
    ),
  },
  {
    mitos: "Cacar Ular hanya menyerang orang tua.",
    salah: "Tidak sepenuhnya benar.",
    fakta: (
      <>
        Siapapun yang pernah terkena cacar air bisa mengalami <em className="italic">Herpes Zoster</em> atau Cacar Ular.
      </>
    ),
  },
  {
    mitos: "Cacar Air tidak berbahaya, cukup didiamkan saja.",
    salah: "Pada anak sehat memang ringan, tapi tidak berlaku untuk semua orang.",
    fakta: (
      <>
        Pada orang dewasa, ibu hamil, dan orang dengan imunitas lemah, Cacar Air bisa menyebabkan{" "}
        <em className="italic">pneumonia</em>, <em className="italic">ensefalitis</em>, dan bahkan kematian.
      </>
    ),
  },
];

const CELL =
  "border border-neutral-200/90 bg-white px-3 py-3 text-left text-[14px] font-normal leading-[1.6] text-neutral-800 md:px-4 md:py-4 md:text-[15px] md:leading-relaxed";

const CREDITS = [
  {
    title: "Medical Writer",
    lines: ["dr. Iffah Rizki Hasanah"],
  },
  {
    title: "Visual & Development",
    lines: ["Sitti Tsarwa Akin", "Raisulwathan", "Khalil Maulana"],
  },
  {
    title: "Pengarah Produksi",
    lines: ["Yaumil Ikhsan"],
  },
];

export default function CacarAirMitosFaktaSection() {
  return (
    <section className="scroll-mt-24 bg-white px-5 pb-16 pt-12 md:px-12 md:pb-20 md:pt-16 lg:px-20 xl:px-24">
      <div className={CACAR_AIR_CONTENT_INSET}>
        <h2
          id="mitos-dan-fakta"
          className="mb-6 text-[1.375rem] font-semibold leading-tight tracking-tight text-[#038F7A] md:mb-8 md:text-[1.5rem] lg:text-[1.625rem] xl:text-[1.6875rem]"
        >
          Mitos dan Fakta Cacar Air dan Cacar Ular
        </h2>

        <div className="overflow-x-auto rounded-2xl border border-neutral-200/90">
          <table className="w-full min-w-[640px] border-collapse md:min-w-0">
            <thead>
              <tr>
                <th className="border border-neutral-200/90 bg-sky-100 px-3 py-3 text-center text-[13px] font-semibold uppercase tracking-wide text-sky-900 md:px-4 md:py-3.5 md:text-sm">
                  MITOS
                </th>
                <th className="border border-neutral-200/90 bg-rose-100 px-3 py-3 text-center text-[13px] font-semibold uppercase tracking-wide text-rose-900 md:px-4 md:py-3.5 md:text-sm">
                  YANG SALAH
                </th>
                <th className="border border-neutral-200/90 bg-teal-100 px-3 py-3 text-center text-[13px] font-semibold uppercase tracking-wide text-teal-900 md:px-4 md:py-3.5 md:text-sm">
                  FAKTA
                </th>
              </tr>
            </thead>
            <tbody>
              {MYTH_ROWS.map((row, i) => (
                <tr key={i}>
                  <td className={CELL}>{row.mitos}</td>
                  <td className={CELL}>{row.salah}</td>
                  <td className={CELL}>{row.fakta}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:mt-14 md:mt-16 md:grid-cols-3 md:gap-5 lg:gap-6">
          {CREDITS.map((card) => (
            <div
              key={card.title}
              className="flex flex-col items-center justify-center rounded-xl border border-neutral-200/90 bg-white px-4 py-6 text-center shadow-none md:px-5 md:py-8"
            >
              <p className="text-[15px] font-semibold text-neutral-900 md:text-base">{card.title}</p>
              <div className="mt-3 space-y-1 text-[14px] font-normal leading-relaxed text-neutral-700 md:text-[15px]">
                {card.lines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
