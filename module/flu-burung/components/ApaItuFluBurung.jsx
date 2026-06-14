import React from "react";

const KARAKTERISTIK_CARDS = [
  {
    image: "/image/rus.svg",
    title: "Disebabkan oleh Influenza Tipe A",
    text: "Virus ini tergolong dalam famili Orthomyxoviridae.",
  },
  {
    image: "/image/chiken.svg",
    title: "Menginfeksi unggas liar dan unggas domestik",
    text: "Terutama burung dan unggas seperti ayam, itik, bebek. kalkun dan lainnya.",
  },
  {
    image: "/image/trepeople.svg",
    title: "Dapat menular ke manusia",
    text: "Dalam kondisi tertentu, virus dapat berpindah dari unggas ke manusia.",
  },
  {
    image: "/image/infected.svg",
    title: "Termasuk famili Orthomyxoviridae",
    text: "Memiliki kemampuan menginfeksi berbagai spesies hewan dan mamalia.",
  },
];

const BAHAYA_CARDS = [
  {
    image: "/image/tengkorak.svg",
    title: "Tingkat Kematian Tinggi",
    text: "Angka kematian (CFR) Flu Burung H5N1 pada manusia mencapai sekitar 60%, jauh lebih tinggi dari flu musiman biasa (CFR < 0,1%).",
  },
  {
    image: "/image/pandemi.svg",
    title: "Ancaman Pandemi",
    text: "Virus H5N1 menjadi salah satu ancaman pandemi paling serius yang terus dipantau WHO dan para ahli epidemiologi global.",
  },
  {
    image: "/image/realrus.svg",
    title: "Virus Terus Berevolusi",
    text: "Lebih dari dua dekade, virus ini masih terus bermutasi, menyebar ke berbagai belahan dunia, dan menginfeksi manusia.",
  },
];

const RISIKO_BARS = [
  { label: "Flu Musiman", pct: 20, color: "#038F7A" },
  { label: "Covid-19", pct: 45, color: "#E6A817" },
  { label: "Flu Burung H5N1", pct: 90, color: "#E53535" },
];

function KarakteristikCard({ image, title, text }) {
  return (
    <div className="flex flex-col items-start gap-4 rounded-[16px] bg-white p-5 shadow-[0px_0px_12.1px_0px_#0000001A] md:p-6">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={image} alt="" className="h-16 w-16 object-contain md:h-20 md:w-20" />
      <div className="flex flex-col gap-2">
        <h4 className="text-[14px] font-bold leading-snug text-neutral-900 md:text-[15px]">{title}</h4>
        <p className="text-[13px] font-normal leading-relaxed text-neutral-600 md:text-[14px]">{text}</p>
      </div>
    </div>
  );
}

function BahayaCard({ image, title, text }) {
  return (
    <div className="flex flex-col items-start gap-4 rounded-[16px] bg-white p-5 shadow-[0px_0px_12.1px_0px_#0000001A] md:p-6">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={image} alt="" className="h-14 w-14 object-contain md:h-16 md:w-16" />
      <div className="flex flex-col gap-2">
        <h4 className="text-[14px] font-bold leading-snug text-neutral-900 md:text-[15px]">{title}</h4>
        <p className="text-[13px] font-normal leading-relaxed text-neutral-600 md:text-[14px]">{text}</p>
      </div>
    </div>
  );
}

export default function ApaItuFluBurung() {
  return (
    <section
      id="apa-itu-flu-burung"
      className="scroll-mt-24 w-full bg-white px-5 py-12 md:px-12 md:py-16 lg:px-20 lg:py-20 xl:px-24"
    >
      <div data-aos="fade-up" suppressHydrationWarning>
        <h2 className="text-2xl font-bold text-[#038F7A] md:text-3xl lg:text-[2rem]">
          Definisi dan Pengertian Flu Burung
        </h2>

        <div className="mt-6 space-y-4 text-[15px] font-normal leading-relaxed text-neutral-700 md:text-[17px] md:leading-[1.7]">
          <p>
            Flu Burung atau dalam istilah medis disebut <em>Avian Influenza</em> adalah penyakit infeksi yang
            disebabkan oleh virus influenza tipe A yang secara alami menginfeksi burung dan unggas. Virus ini
            tergolong dalam famili <em>Orthomyxoviridae</em> dan memiliki kemampuan menginfeksi berbagai spesies
            hewan, termasuk, dalam kondisi tertentu, manusia dan mamalia lain.
          </p>
          <p>
            Nama Flu Burung merujuk pada fakta bahwa <em>reservoir</em> utama atau inang alami dari virus ini adalah
            burung liar, terutama unggas air migrasi seperti bebek dan angsa liar, yang umumnya membawa virus tanpa
            menunjukkan gejala sakit. Dari burung liar, virus dapat berpindah ke unggas peliharaan seperti ayam,
            itik, kalkun dan lainnya, serta dalam kasus tertentu bisa berpindah ke manusia.
          </p>
        </div>

        {/* Karakteristik cards */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 md:mt-10 md:gap-5">
          {KARAKTERISTIK_CARDS.map((card, i) => (
            <KarakteristikCard key={i} {...card} />
          ))}
        </div>

        {/* Mengapa ditakuti + Seberapa berbahaya */}
        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12 md:mt-12">
          {/* Kiri: Mengapa ditakuti */}
          <div>
            <h3 className="text-lg font-semibold text-[#038F7A] md:text-xl">
              Mengapa Flu Burung Sangat Ditakuti Dunia?
            </h3>
            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-5">
              {BAHAYA_CARDS.map((card, i) => (
                <BahayaCard key={i} {...card} />
              ))}
            </div>
          </div>

          {/* Kanan: Seberapa berbahaya - bar chart */}
          <div>
            <h3 className="text-lg font-semibold text-[#038F7A] md:text-xl">Seberapa Berbahaya?</h3>
            <div className="mt-5 space-y-5">
              {RISIKO_BARS.map(({ label, pct, color }) => (
                <div key={label}>
                  <div className="mb-2 flex items-center justify-between text-[14px] font-medium text-neutral-800 md:text-[15px]">
                    <span>{label}</span>
                    <span className="font-bold" style={{ color }}>{pct}%</span>
                  </div>
                  <div className="h-3 w-full overflow-hidden rounded-full bg-neutral-100">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${pct}%`, backgroundColor: color }}
                    />
                  </div>
                </div>
              ))}
              <p className="mt-4 text-[12px] leading-relaxed text-neutral-500 md:text-[13px]">
                *Skala risiko reltif berdasarkan tingkat fatalitas dan potensi penyebaran
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
