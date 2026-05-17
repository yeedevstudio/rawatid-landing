import React from "react";

// Urutan diatur agar grid 2 kolom mengisi: kiri=brain,paru,paruhitam | kanan=ISK,tidur
const KOMPLIKASI_AKUT = [
  {
    image: "/image/brain.png",
    title: "Kelumpuhan permanen",
    text: (
      <>
        Komplikasi yang paling dikenal dan paling ditakuti. Otot yang kehilangan pasokan saraf motoriknya akan
        lumpuh dan perlahan mengecil (<em>atrofi</em>). Kelumpuhan paling sering mengenai tungkai bawah, tetapi
        bisa juga mengenai lengan, otot pernapasan, atau otot wajah
      </>
    ),
  },
  {
    image: "/image/kemih.png",
    title: "Infeksi saluran kemih",
    text: "Akibat gangguan fungsi kandung kemih atau pemasangan kateter urin",
  },
  {
    image: "/image/paru.png",
    title: "Gagal napas",
    text: (
      <>
        Pada polio <strong><em>bulbar/bulbospinal</em></strong>, otot pernapasan bisa lumpuh. Tanpa bantuan
        ventilator, kondisi ini fatal. Di era sebelum ventilasi modern, penderita dimasukkan ke dalam{" "}
        <em>iron lung</em> (paru-paru besi), sebuah tabung besar yang membantu pernapasan secara mekanis
      </>
    ),
  },
  {
    image: "/image/tidur.png",
    title: "Ulkus dekubitus (luka baring)",
    text: "Pada penderita yang harus berbaring lama dan tidak dapat bergerak",
  },
  {
    image: "/image/paruhitam.png",
    title: "Pneumonia aspirasi",
    text: "Sisa makanan atau cairan yang masuk ke paru-paru akibat gangguan menelan pada polio bulbar. Bisa menyebabkan infeksi paru yang serius",
  },
];

function KomplikasiCard({ image, title, text }) {
  return (
    <div className="flex gap-4 rounded-[16px] border border-neutral-200/90 bg-white p-4 shadow-[0px_0px_12.1px_0px_#0000001A] md:gap-5 md:p-5">
      {image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={image} alt="" className="h-24 w-24 shrink-0 self-center object-contain md:h-28 md:w-28" />
      )}
      <div className="flex flex-col gap-2 justify-center">
        <h4 className="text-[14px] font-semibold text-[#038F7A] md:text-[15px]">{title}</h4>
        <p className="text-[13px] font-normal leading-relaxed text-neutral-700 md:text-[14px]">{text}</p>
      </div>
    </div>
  );
}

export default function KomplikasiPolio() {
  return (
    <section className="w-full bg-white px-5 py-12 md:px-12 md:py-16 lg:px-20 lg:py-20 xl:px-24">
      <div data-aos="fade-up" suppressHydrationWarning>
        <h2 className="text-2xl font-bold text-[#038F7A] md:text-3xl lg:text-[2rem]">
          Komplikasi <em>Poliomielitis</em>
        </h2>
        <p className="mt-4 text-[15px] font-normal leading-relaxed text-neutral-700 md:text-[17px] md:leading-[1.7]">
          Polio dapat menyebabkan berbagai komplikasi, baik yang terjadi segera setelah infeksi, maupun yang
          muncul puluhan tahun kemudian.
        </p>

        <h3 className="mt-8 text-lg font-semibold text-[#038F7A] md:mt-10 md:text-xl">
          Komplikasi Akut <em>Poliomielitis</em>
        </h3>
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 md:mt-6">
          {KOMPLIKASI_AKUT.map((item, i) => (
            <KomplikasiCard key={i} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
