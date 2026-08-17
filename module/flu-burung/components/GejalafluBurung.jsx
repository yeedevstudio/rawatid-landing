import React from "react";
const SUMMARY_CARDS = [
  {
    image: "/image/tanda1.webp",
    title: "Gejala bervariasi",
    desc: "Dari tanpa gejala hingga berat",
  },
  {
    image: "/image/tanda2.webp",
    title: "Dipengaruhi oleh",
    desc: "Subtipe virus, dosis paparan & imunitas",
  },
  {
    image: "/image/tanda3.webp",
    title: "Waspada dini",
    desc: "Kenali gejala untuk penanganan cepat",
  },
];

const GEJALA_AWAL = [
  {
    image: "/image/gejalaawal1.webp",
    title: "Demam tinggi mendadak",
    text: "Suhu tubuh umumnya di atas 38°C, sering kali mencapai 39–41°C. Demam adalah gejala yang hampir selalu ada pada infeksi H5N1.",
  },
  {
    image: "/image/gejalaawal2.webp",
    title: "Menggigil dan nyeri otot hebat (mialgia)",
    text: "Nyeri otot pada flu burung sering lebih berat dibanding flu biasa.",
  },
  {
    image: "/image/gejalaawal3.webp",
    title: "Sakit kepala berat",
    text: "Nyeri kepala yang intens, sering disertai rasa tidak nyaman di belakang mata.",
  },
  {
    image: "/image/gejalaawal4.webp",
    title: "Batuk kering",
    text: "Biasanya muncul bersamaan atau segera setelah demam.",
  },
  {
    image: "/image/gejalaawal5.webp",
    title: "Nyeri tenggorokan",
    text: "Rasa perih atau gatal di tenggorokan.",
  },
  {
    image: "/image/gejalaawal6.webp",
    title: "Lemas dan kelelahan ekstrim",
    text: "Badan terasa sangat lemah dan tidak bertenaga.",
  },
  {
    image: "/image/gejalaawal7.webp",
    title: "Gejala saluran cerna",
    text: "Pada H5N1, diare, mual, muntah, dan nyeri perut lebih sering terjadi dibanding flu biasa, ditemukan pada sekitar 30–70% kasus.",
  },
];

function GejalaCard({ image, title, text }) {
  return (
    <div className="flex items-start gap-4 rounded-[14px] bg-white p-4 shadow-[0px_0px_12.1px_0px_#0000001A] md:p-5">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={image} alt="" className="h-20 w-20 shrink-0 object-contain md:h-24 md:w-24" />
      <div className="flex flex-col gap-1.5">
        <h4 className="text-[14px] font-bold leading-snug text-neutral-900 md:text-[15px]">{title}</h4>
        <p className="text-[13px] leading-relaxed text-neutral-600 md:text-[14px]">{text}</p>
      </div>
    </div>
  );
}

export default function GejalafluBurung() {
  return (
    <section
      id="tanda-gejala"
      className="scroll-mt-24 w-full bg-white px-5 py-12 md:px-12 md:py-16 lg:px-20 lg:py-20 xl:px-24"
    >
      <div data-aos="fade-up" suppressHydrationWarning>
        <h2 className="text-2xl font-bold text-[#038F7A] md:text-3xl lg:text-[2rem]">
          Tanda-Tanda dan Gejala Flu Burung
        </h2>

        <p className="mt-5 text-[15px] leading-relaxed text-neutral-700 md:text-[17px] md:leading-[1.7]">
          Gejala Flu Burung pada manusia sangat bervariasi, dari infeksi tanpa gejala, gejala ringan seperti flu
          biasa, hingga penyakit berat yang mengancam jiwa. Pola gejala bervariasi tergantung subtipe virus, dosis
          paparan, dan kondisi sistem imun penderita.
        </p>

        {/* Summary 3 cards */}
        <div className="mt-6 flex flex-col overflow-hidden rounded-[16px] bg-white shadow-[0px_0px_12.1px_0px_#0000001A] sm:flex-row sm:items-stretch">
          {SUMMARY_CARDS.map(({ image, title, desc }, i) => (
            <React.Fragment key={title}>
              <div className="flex flex-1 items-center gap-4 px-5 py-5 md:px-6 md:py-6">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={image} alt="" className="h-16 w-16 shrink-0 object-contain md:h-20 md:w-20" />
                <div>
                  <p className="text-[14px] font-bold text-neutral-900 md:text-[15px]">{title}</p>
                  <p className="mt-0.5 text-[13px] leading-snug text-neutral-500 md:text-[14px]">{desc}</p>
                </div>
              </div>
              {i < SUMMARY_CARDS.length - 1 && (
                <div className="hidden h-10 w-px self-center bg-neutral-200 sm:block" />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Masa Inkubasi */}
        <h3 className="mt-10 text-lg font-semibold text-[#038F7A] md:mt-12 md:text-xl">
          Masa Inkubasi Penderita Flu Burung
        </h3>

        <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-[1fr_auto] lg:gap-8 lg:items-start">
          {/* Left */}
          <div className="space-y-4">
            <p className="text-[15px] leading-relaxed text-neutral-700 md:text-[17px] md:leading-[1.7]">
              Masa inkubasi atau waktu antara paparan dan munculnya gejala pertama untuk Flu Burung H5N1 adalah 2–8
              hari, dengan rata-rata sekitar 5 hari. Beberapa laporan mencatat masa inkubasi hingga 17 hari.
            </p>
            <div className="flex items-start gap-3 rounded-xl bg-[#EBF6F9] px-4 py-3 shadow-[0px_0px_12.1px_0px_#0000001A] md:px-5 md:py-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/image/calender.svg.webp" alt="" className="mt-0.5 h-6 w-6 shrink-0 object-contain text-[#038F7A]" />
              <div>
                <p className="text-[13px] font-semibold text-[#038F7A] md:text-[14px]">
                  Masa inkubasi yang lebih panjang dari flu biasa yang hanya 1–4 hari.
                </p>
                <p className="mt-1 text-[13px] leading-relaxed text-neutral-600 md:text-[14px]">
                  Masa inkubasi yang panjang ini penting untuk keperluan karantina dan pemantauan kontak.
                </p>
              </div>
            </div>
          </div>

          {/* Right: stat card */}
          <div className="flex items-center justify-center rounded-[16px] bg-white p-5 shadow-[0px_0px_12.1px_0px_#0000001A] lg:min-w-[200px]">
            <div className="flex flex-col items-start gap-2">
              <p className="text-[13px] font-medium text-neutral-500 md:text-[14px]">Rata-rata Inkubasi</p>
              <div className="flex items-end gap-3">
                <p className="text-[42px] font-bold leading-none text-[#038F7A] md:text-[48px]">5 hari</p>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/image/calender.svg.webp" alt="" className="mb-1 h-14 w-14 object-contain md:h-16 md:w-16" />
              </div>
              <p className="text-[13px] text-neutral-500 md:text-[14px]">Rentang 2–8 hari</p>
            </div>
          </div>
        </div>

        {/* Gejala Awal */}
        <h3 className="mt-10 text-lg font-semibold text-[#038F7A] md:mt-12 md:text-xl">
          Gejala Awal Hari 1–3 Penderita Flu Burung
        </h3>

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 md:gap-5">
          {GEJALA_AWAL.map((item, i) => (
            <div key={i} className={i === GEJALA_AWAL.length - 1 ? "sm:col-span-2 lg:col-span-3" : ""}>
              <GejalaCard {...item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
