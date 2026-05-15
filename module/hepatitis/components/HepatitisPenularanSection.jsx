import { IconInfoCircle } from "@tabler/icons-react";
import React from "react";

import { HEPATITIS_CONTENT_INSET } from "@/module/hepatitis/hepatitisLayoutClasses";

const JALUR_ITEMS = [
  {
    img: "/image/eat.png",
    alt: "Makanan terkontaminasi",
    title: "Makanan yang terkontaminasi",
    desc: "Ini adalah cara penularan paling umum. Ketika seseorang yang terinfeksi tidak mencuci tangan setelah ke toilet lalu menyiapkan atau menyentuh makanan, virus bisa berpindah ke makanan tersebut. Makanan yang paling sering terlibat adalah makanan mentah atau setengah matang seperti kerang, tiram, sayuran mentah, dan buah-buahan yang disiram air yang terkontaminasi.",
  },
  {
    img: "/image/aqua.png",
    alt: "Air terkontaminasi",
    title: "Air yang terkontaminasi",
    desc: "Air minum yang terkontaminasi tinja penderita dapat menyebabkan wabah massal. Ini bisa terjadi jika sumber air publik tercemar, atau jika air sumur berada terlalu dekat dengan septic tank.",
  },
  {
    img: "/image/jikjak.png",
    alt: "Kontak dekat dengan penderita",
    title: "Kontak dekat dengan penderita",
    desc: "Hidup serumah dengan penderita Hepatitis A, berbagi peralatan makan, atau merawat penderita tanpa mencuci tangan yang benar meningkatkan risiko penularan.",
  },
  {
    img: "/image/hubungan.png",
    alt: "Kontak seksual tertentu",
    title: "Kontak seksual tertentu",
    desc: "Kontak seksual yang melibatkan kontak oro-anal (mulut ke area anal) dengan penderita bisa menularkan virus.",
  },
  {
    img: "/image/peoples.png",
    alt: "Lingkungan padat sanitasi buruk",
    title: "Lingkungan padat dengan sanitasi buruk",
    desc: "Di panti asuhan, pesantren, sekolah asrama, atau fasilitas penitipan anak, satu kasus bisa dengan cepat menyebar ke banyak orang.",
  },
];

const TIDAK_MENULAR = [
  "Berjabat tangan biasa",
  "Berpelukan",
  "Batuk atau bersin (tidak menyebar lewat udara)",
  "Berbagi toilet (kecuali ada kontaminasi feses yang tidak dibersihkan)",
  "Berbagi pakaian",
  "Air susu ibu (ASI)",
];

export default function HepatitisPenularanSection() {
  return (
    <section id="cara-penularan" className="scroll-mt-24 bg-white px-5 py-12 md:px-12 md:py-16 lg:px-20 xl:px-24">
      <div data-aos="fade-up" suppressHydrationWarning className={HEPATITIS_CONTENT_INSET}>
        <div className="space-y-8 md:space-y-10">
          <h2 className="text-[1.375rem] font-semibold leading-tight tracking-tight text-[#038F7A] md:text-[1.5rem] lg:text-[1.625rem] xl:text-[1.6875rem]">
            Cara Penularan Virus Hepatitis A
          </h2>

          <p className="text-[15px] font-normal leading-relaxed text-neutral-700 md:text-[16px] lg:text-[17px]">
            Hepatitis A menular melalui jalur <em>fecal-oral</em> artinya virus yang berasal dari tinja
            (feses) penderita masuk ke mulut orang lain. Ini kedengarannya menjijikkan, tetapi terjadi
            lebih mudah dari yang kita bayangkan, terutama ketika standar kebersihan tidak dijaga dengan
            baik.
          </p>

          <div className="space-y-4">
            <h3 className="text-[15px] font-semibold leading-snug text-[#038F7A] md:text-[16px]">
              Jalur Penularan Utama
            </h3>

            <div className="space-y-4">
              {JALUR_ITEMS.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 rounded-2xl border border-neutral-200/90 bg-white px-5 py-5 md:gap-5 md:px-6 md:py-6"
                >
                  <img
                    src={item.img}
                    alt={item.alt}
                    className="h-24 w-24 shrink-0 object-contain md:h-28 md:w-28"
                  />
                  <div className="min-w-0 space-y-1.5">
                    <p className="text-[14px] font-semibold leading-snug text-[#038F7A] md:text-[15px] lg:text-[16px]">
                      {item.title}
                    </p>
                    <p className="text-[13px] leading-relaxed text-neutral-600 md:text-[14px] lg:text-[15px]">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Callout */}
          <div className="flex items-start gap-4 rounded-2xl border border-[#F5A623]/40 bg-white px-6 py-6 md:px-8 md:py-7">
            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#F5A623]/60 bg-white text-[#F5A623]">
              <IconInfoCircle className="h-5 w-5 stroke-[1.5]" aria-hidden />
            </div>
            <div className="min-w-0 space-y-2">
              <p className="text-[15px] font-semibold leading-snug text-[#D97706] md:text-[16px]">
                Penting: Hepatitis A Tidak Menular Dengan Cara Berikut!
              </p>
              <p className="text-[14px] leading-relaxed text-neutral-700 md:text-[15px]">
                Yang TIDAK Menularkan Hepatitis A — Hepatitis A TIDAK menular melalui:
              </p>
              <ul className="space-y-1">
                {TIDAK_MENULAR.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-[14px] leading-relaxed text-neutral-700 md:text-[15px]">
                    <span className="mt-[7px] h-[5px] w-[5px] shrink-0 rounded-full bg-neutral-500" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-[14px] leading-relaxed text-neutral-700 md:text-[15px]">
                Karena tidak menyebar lewat udara atau sentuhan kasual biasa, isolasi ketat seperti
                pada COVID-19 tidak diperlukan — yang terpenting adalah higiene tangan dan makanan.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
