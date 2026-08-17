import React from "react";

const KLADE_CARDS = [
  {
    image: "/image/klade1.webp",
    title: "Klade I (Congo Basin Clade)",
    text: "tersebar di Afrika Tengah, terutama Republik Demokratik Kongo. Klade ini lebih virulen dengan tingkat kematian yang lebih tinggi (1–10%). Sub-varian Clade IB yang muncul sejak 2023 memiliki kemampuan penularan antar manusia yang lebih efisien dan menjadi dasar deklarasi darurat WHO pada 2024.",
  },
  {
    image: "/image/klade2.webp",
    title: "Klade II (West African Clade)",
    text: "tersebar di Afrika Barat dan menjadi penyebab wabah global 2022. Klade IIB adalah sub-varian yang bertanggung jawab atas wabah tersebut. Tingkat kematian lebih rendah (0,1–0,3%) dibanding Klade I.",
  },
];

export default function KladeCacarMonyet() {
  return (
    <section className="w-full bg-white px-5 py-12 md:px-12 md:py-16 lg:px-20 lg:py-20 xl:px-24">
      <div data-aos="fade-up" suppressHydrationWarning>
        <h3 className="text-xl font-semibold text-[#038F7A] md:text-2xl">
          Dua Klade (Varian) Utama Mpox
        </h3>
        <p className="mt-4 text-[15px] leading-relaxed text-neutral-700 md:text-[17px] md:leading-[1.7]">
          Virus Mpox terbagi menjadi dua klade (kelompok genetik) utama yang memiliki karakteristik berbeda:
        </p>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5">
          {KLADE_CARDS.map(({ image, title, text }) => (
            <div key={title} className="flex flex-col items-center gap-4 rounded-2xl bg-white p-5 shadow-[0px_0px_12.1px_0px_#0000001A] sm:flex-row sm:items-start md:p-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={image} alt="" className="h-28 w-28 shrink-0 object-contain md:h-32 md:w-32" />
              <div className="flex flex-col gap-2 text-center sm:text-left">
                <h4 className="text-[14px] font-bold leading-snug text-neutral-900 md:text-[15px]">{title}</h4>
                <p className="text-justify text-[13px] leading-relaxed text-neutral-600 md:text-[14px]">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
