import { IconInfoCircle } from "@tabler/icons-react";
import React from "react";

import { HERPES_CONTENT_INSET } from "@/module/herpes-simplex/herpesLayoutClasess";

const JALUR_DATA = [
  {
    src: "/image/shake.png",
    alt: "kontak kulit",
    title: "Kontak kulit ke kulit secara langsung",
    description: "Menyentuh, mencium, atau berpelukan dengan area yang sedang aktif ada lukanya. Ini jalur utama penularan HSV-1.",
  },
  {
    src: "/image/hubungan.png",
    alt: "hubungan seksual",
    title: "Hubungan seksual",
    description: (
      <>
        Baik penetrasi <em>vaginal</em> atau <em>anal</em>, maupun <em>seks</em> oral dapat menularkan
        HSV-2 maupun HSV-1. Kondom mengurangi risiko tetapi tidak menghilangkannya 100%.
      </>
    ),
  },
  {
    src: "/image/cleaning.png",
    alt: "berbagi benda pribadi",
    title: "Berbagi benda pribadi saat luka aktif",
    description: "Berbagi lipstik, gelas minum, sendok garpu atau handuk wajah dengan penderita HSV-1 yang sedang aktif dapat menularkan virus.",
  },
  {
    src: "/image/pragnance.png",
    alt: "ibu ke bayi",
    title: "Dari ibu ke bayi saat persalinan",
    description: (
      <>
        Jika ibu memiliki <em>herpes genital</em> aktif saat melahirkan, bayi bisa terinfeksi saat
        melewati jalan lahir. Kondisi ini disebut herpes neonatal dan sangat berbahaya.
      </>
    ),
  },
  {
    src: "/image/virus.png",
    alt: "penularan asimtomatik",
    title: (
      <>
        Penularan <em>asimtomatik</em> (tanpa gejala)
      </>
    ),
    description: "Ini jalur yang paling sering tidak disadari. Virus bisa keluar melalui kulit dan menular meskipun penderita tidak merasakan gejala apapun dan tidak ada luka yang terlihat. Diperkirakan sebagian besar penularan HSV-2 terjadi melalui jalur ini.",
  },
];

function JalurCard({ src, alt, title, description }) {
  return (
    <div className="flex items-center gap-5 rounded-2xl border border-neutral-200/90 bg-white px-5 py-5 md:gap-7 md:px-7 md:py-6">
      <div className="flex h-[80px] w-[80px] shrink-0 items-center justify-center rounded-full border border-neutral-200/90 bg-neutral-50 md:h-[96px] md:w-[96px]">
        <img
          src={src}
          alt={alt}
          className="h-auto w-[52px] object-contain md:w-[62px]"
        />
      </div>
      <div className="min-w-0 space-y-1.5">
        <h3 className="text-[15px] font-semibold leading-snug text-[#038F7A] md:text-[16px] lg:text-[17px]">
          {title}
        </h3>
        <p className="text-[13px] font-normal leading-relaxed text-neutral-700 md:text-[14px] lg:text-[15px]">
          {description}
        </p>
      </div>
    </div>
  );
}

export default function HerpesPenularanSection() {
  return (
    <section id="cara-penularan" className="scroll-mt-24 bg-white px-5 py-12 md:px-12 md:py-16 lg:px-20 xl:px-24">
      <div className={HERPES_CONTENT_INSET}>
        <div data-aos="fade-up" suppressHydrationWarning className="space-y-6 md:space-y-8">
          <h2 className="text-[1.375rem] font-semibold leading-tight tracking-tight text-[#038F7A] md:text-[1.5rem] lg:text-[1.625rem] xl:text-[1.6875rem]">
            Cara Penularan <em>Herpes Simplex</em>
          </h2>

          <p className="text-[15px] font-normal leading-relaxed text-neutral-700 md:text-[16px] lg:text-[17px]">
            <em>Herpes Simplex</em> menular melalui kontak langsung antara kulit atau selaput lendir
            yang sehat dengan kulit atau selaput lendir yang terinfeksi. Perlu dipahami bahwa penularan
            bisa terjadi bahkan ketika tidak ada luka yang terlihat, ini yang membuat <em>herpes</em>{" "}
            mudah menyebar tanpa disadari.
          </p>

          <div className="space-y-4 md:space-y-5">
            <h3 className="text-[16px] font-semibold leading-snug text-[#038F7A] md:text-[17px]">
              Jalur Penularan Utama <em>Herpes Simplex</em>
            </h3>
            <div className="space-y-4 md:space-y-5">
              {JALUR_DATA.map((item, i) => (
                <JalurCard key={i} {...item} />
              ))}
            </div>
          </div>

          <div className="flex items-start gap-4 rounded-2xl border border-[#F5D7A1] px-6 py-6 md:px-8 md:py-7">
            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#F5A623]/60 bg-white text-[#F5A623]">
              <IconInfoCircle className="h-5 w-5 stroke-[1.5]" aria-hidden />
            </div>
            <div className="min-w-0 space-y-2">
              <p className="text-[15px] font-semibold italic leading-snug text-[#D97706] md:text-[16px]">
                <em>Herpes Simplex</em> Tidak Menular dengan Cara Ini
              </p>
              <p className="text-[14px] font-normal leading-relaxed text-neutral-700 md:text-[15px]">
                <em>Herpes Simplex</em> tidak menular melalui toilet umum, kolam renang, berbagi
                pakaian (selama tidak ada kontak langsung dengan luka), bersalaman, berpelukan biasa
                (tanpa kontak dengan area infeksi), atau udara. Virus HSV tidak bisa bertahan lama di
                luar tubuh dan tidak menyebar melalui <em>droplet</em> pernapasan seperti flu.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
