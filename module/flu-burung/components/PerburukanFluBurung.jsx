import React from "react";
import { IconInfoCircle } from "@tabler/icons-react";

const PERBURUKAN_CARDS = [
  {
    image: "/image/perburukan1.svg",
    title: "Sesak napas progresif",
    text: "kesulitan bernapas yang semakin berat, tanda bahaya utama.",
  },
  {
    image: "/image/perburukan2.svg",
    title: "Pneumonia virus",
    text: "peradangan paru-paru yang berkembang pada mayoritas kasus H5N1 yang dirawat di rumah sakit. Rontgen dada menunjukkan infiltrat bilateral yang cepat berkembang.",
  },
  {
    image: "/image/perburukan3.svg",
    title: "Hipoksemia",
    text: "kadar oksigen dalam darah menurun drastis, menyebabkan bibir dan kuku membiru (sianosis).",
  },
  {
    image: "/image/perburukan4.svg",
    title: "Batuk berdarah (hemoptisis)",
    text: "batuk mengeluarkan darah atau dahak berwarna merah, tanda kerusakan jaringan paru yang serius.",
  },
  {
    image: "/image/perburukan5.svg",
    title: "Penurunan kesadaran",
    text: "dalam kasus berat, penderita menjadi bingung, tidak responsif.",
  },
];

const KOMPLIKASI_CARDS = [
  {
    image: "/image/komplikasi1.svg",
    title: "ARDS (Acute Respiratory Distress Syndrome)",
    text: "kegagalan pernapasan berat akibat kerusakan masif jaringan paru. Memerlukan ventilator. Terjadi pada mayoritas kasus H5N1 yang dirawat ICU.",
  },
  {
    image: "/image/komplikasi2.svg",
    title: "Ensefalitis virus",
    text: "peradangan otak menyebabkan kejang, penurunan kesadaran. Lebih sering pada anak.",
  },
  {
    image: "/image/komplikasi3.svg",
    title: "Miokarditis",
    text: "peradangan otot jantung yang dapat menyebabkan gagal jantung akut.",
  },
  {
    image: "/image/komplikasi4.svg",
    title: "Gagal ginjal akut",
    text: "kerusakan ginjal akibat badai sitokin dan hipoksia sistemik.",
  },
];

export default function PerburukanFluBurung() {
  return (
    <section className="w-full bg-white px-5 py-12 md:px-12 md:py-16 lg:px-20 lg:py-20 xl:px-24">
      <div data-aos="fade-up" suppressHydrationWarning>
        {/* Perburukan */}
        <h2 className="text-2xl font-medium text-[#038F7A]">
          Perburukan Cepat (Hari 3–7) Penderita Flu Burung
        </h2>
        <p className="mt-4 text-[15px] leading-relaxed text-neutral-700 md:text-[17px] md:leading-[1.7]">
          Ini yang membedakan Flu Burung dari flu biasa, kondisi dapat memburuk dengan sangat cepat, dalam hitungan hari bahkan jam.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5 md:gap-5">
          {PERBURUKAN_CARDS.map(({ image, title, text }) => (
            <div
              key={title}
              className="flex flex-col gap-3 rounded-[14px] bg-white p-4 shadow-[0px_0px_12.1px_0px_#0000001A] md:p-5"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={image} alt="" className="h-16 w-16 object-contain md:h-20 md:w-20" />
              <h4 className="text-[14px] font-bold leading-snug text-neutral-900 md:text-[15px]">{title}</h4>
              <p className="text-[13px] leading-relaxed text-neutral-600 md:text-[14px]">{text}</p>
            </div>
          ))}
        </div>

        {/* Komplikasi */}
        <h3 className="mt-10 text-2xl font-medium text-[#038F7A] md:mt-12">
          Komplikasi yang Muncul Cepat pada Kasus Flu Burung Berat
        </h3>

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 md:gap-5">
          {KOMPLIKASI_CARDS.map(({ image, title, text }) => (
            <div
              key={title}
              className="flex items-start gap-3 rounded-[14px] bg-white p-4 shadow-[0px_0px_12.1px_0px_#0000001A] md:gap-4 md:p-5"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={image} alt="" className="h-14 w-14 shrink-0 object-contain md:h-16 md:w-16" />
              <div className="flex flex-col gap-1.5">
                <h4 className="text-[14px] font-bold leading-snug text-neutral-900 md:text-[15px]">{title}</h4>
                <p className="text-[13px] leading-relaxed text-neutral-600 md:text-[14px]">{text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Callout */}
        <div className="mt-8 rounded-2xl p-5 shadow-[0px_0px_12.1px_0px_#0000001A] md:mt-10 md:p-6">
          <div className="flex gap-3 md:gap-4">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#DB1A1A]/10 text-[#DB1A1A] md:h-10 md:w-10">
              <IconInfoCircle className="h-5 w-5 stroke-[1.5] md:h-6 md:w-6" aria-hidden />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-[15px] font-bold leading-snug text-[#DB1A1A] md:text-base">
                Kapan Harus Segera ke Fasilitas Kesehatan?
              </h3>
              <p className="mt-2 text-[13px] leading-relaxed text-neutral-700 md:mt-3 md:text-[15px] md:leading-[1.65]">
                Segera ke IGD atau cari pertolongan medis darurat jika dalam 10 hari terakhir pernah kontak dengan
                unggas sakit atau mati mendadak, dan mengalami demam tinggi (&gt;38°C) disertai gejala pernapasan
                seperti batuk dan sesak napas. Jangan tunda. Informasikan riwayat kontak dengan unggas kepada
                petugas medis, ini informasi krusial untuk diagnosis yang tepat dan cepat.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
