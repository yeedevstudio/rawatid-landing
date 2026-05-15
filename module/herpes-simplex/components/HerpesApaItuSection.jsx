import {
  IconUsersGroup,
  IconUser,
  IconRefresh,
  IconShield,
} from "@tabler/icons-react";
import React from "react";

import { HERPES_CONTENT_INSET } from "@/module/herpes-simplex/herpesLayoutClasess";

const STAT_CARDS = [
  {
    Icon: IconUsersGroup,
    title: "3,7 Mliar",
    description: "Orang di bawah usia 50 tahun diperkirakan sudah terinfeksi HSV tipe 1 (67% populasi dunia)",
  },
  {
    Icon: IconUser,
    title: "491 Juta",
    description: "Orang berusia 15-49 tahun hidup dengan HSV tipe 2 (13% populasi dunia).",
  },
  {
    Icon: IconRefresh,
    title: "Seumur Hidup",
    description: "Virus dapat aktif kembali sewaktu-waktu, terutama saat daya tahan tubuh menurun.",
  },
  {
    Icon: IconShield,
    title: "Tidak Bisa Disembuhkan Total",
    description: "Setelah masuk ke tubuh, virus akan bersembunyi di dalam sel saraf.",
  },
];

function StatCard({ Icon, title, description }) {
  return (
    <div className="flex items-start gap-4 rounded-2xl border border-neutral-200/90 bg-white px-5 py-5 md:px-6 md:py-5">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#038F7A] text-white md:h-12 md:w-12">
        <Icon className="h-5 w-5 stroke-[1.5] md:h-6 md:w-6" aria-hidden />
      </div>
      <div className="min-w-0">
        <p className="text-[16px] font-bold leading-snug text-neutral-900 md:text-[17px]">{title}</p>
        <p className="mt-1 text-[13px] font-normal leading-[1.55] text-neutral-600 md:text-[14px]">{description}</p>
      </div>
    </div>
  );
}

export default function HerpesApaItuSection() {
  return (
    <section id="apa-itu" className="scroll-mt-24 bg-white px-5 py-12 md:px-12 md:py-16 lg:px-20 xl:px-24">
      <div className={HERPES_CONTENT_INSET}>
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-16">
          <div data-aos="fade-right" suppressHydrationWarning className="space-y-5">
            <h2 className="text-[1.375rem] font-semibold leading-tight tracking-tight text-[#038F7A] md:text-[1.5rem] lg:text-[1.625rem] xl:text-[1.6875rem]">
              Apa Itu <em>Herpes Simplex</em>?
            </h2>
            <p className="text-[15px] font-normal leading-relaxed text-neutral-700 md:text-[16px] lg:text-[17px]">
              <em>Herpes Simplex</em> adalah penyakit infeksi yang disebabkan oleh{" "}
              <em>Herpes Simplex Virus</em> (HSV). Virus ini menyerang kulit dan selaput lendir,
              menimbulkan luka lepuh kecil yang terasa nyeri.
            </p>
            <p className="text-[15px] font-normal leading-relaxed text-neutral-700 md:text-[16px] lg:text-[17px]">
              <em>Herpes Simplex</em> unik karena sifatnya yang tidak bisa disembuhkan total setelah
              masuk ke tubuh, virus akan bersembunyi di dalam sel saraf dan bisa aktif kembali
              sewaktu-waktu, terutama saat daya tahan tubuh sedang menurun.
            </p>
            <p className="text-[15px] font-normal leading-relaxed text-neutral-700 md:text-[16px] lg:text-[17px]">
              <em>Herpes Simplex</em> termasuk salah satu infeksi virus paling umum di dunia. Menurut
              WHO, diperkirakan 3,7 miliar orang atau sekitar 67% penduduk dunia sudah terinfeksi HSV
              tipe 1.
            </p>
            <p className="text-[15px] font-normal leading-relaxed text-neutral-700 md:text-[16px] lg:text-[17px]">
              Sementara itu, sekitar 491 juta orang atau 13% populasi dunia hidup dengan HSV tipe 2.
              Ini membuat <em>Herpes Simplex</em> jauh lebih umum dari yang dikira dan mayoritas
              penderitanya tidak menyadari diri mereka terinfeksi.
            </p>
          </div>

          <div data-aos="fade-left" suppressHydrationWarning className="space-y-4">
            {STAT_CARDS.map((card, i) => (
              <StatCard key={i} {...card} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
