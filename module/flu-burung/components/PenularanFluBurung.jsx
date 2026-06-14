"use client";

import React, { useState } from "react";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

const SLIDES = [
  {
    title: "Penularan Flu Burung dari Unggas ke Manusia",
    intro: "Ini adalah jalur penularan yang paling umum dan terdokumentasi dengan baik. Manusia umumnya terinfeksi melalui:",
    bullets: [
      {
        label: "Kontak langsung dengan unggas terinfeksi,",
        text: "dengan menyentuh, memegang, menyembelih, atau mencabut bulu unggas yang sakit atau mati akibat Flu Burung tanpa perlindungan tangan.",
      },
      {
        label: "Menghirup droplet atau aerosol,",
        text: "percikan lendir, air liur, atau partikel feses unggas yang terinfeksi yang melayang di udara, terutama di kandang yang berventilasi buruk.",
      },
      {
        label: "Kontak dengan feses, cairan tubuh, atau sekresi unggas.",
        text: "Virus ditemukan dalam konsentrasi tinggi di feses dan sekresi pernapasan unggas yang terinfeksi. Tangan yang terkontaminasi lalu menyentuh mata, hidung, atau mulut dapat memindahkan virus.",
      },
      {
        label: "Lingkungan yang terkontaminasi.",
        text: "Air, tanah, kandang, peralatan atau permukaan yang terkontaminasi feses unggas dan kemudian disentuh manusia.",
      },
      {
        label: "Konsumsi unggas, produk unggas mentah atau setengah matang.",
        text: "Meskipun virus mati dengan pemanasan yang cukup, mengonsumsi daging, darah, atau telur unggas mentah atau setengah matang dari unggas terinfeksi berpotensi menularkan virus.",
      },
    ],
    callout: {
      title: "Daging dan Telur yang Dimasak Matang Aman Dikonsumsi",
      text: "Virus Flu Burung sangat sensitif terhadap panas. Virus mati pada suhu 70°C atau lebih dalam hitungan detik. Memasak daging unggas hingga matang sempurna dan merebus telur hingga kuning telur mengeras sepenuhnya adalah cara yang efektif menghilangkan virus. Produk unggas yang dimasak dengan benar aman untuk dikonsumsi.",
    },
  },
  {
    title: "Penularan antar Manusia",
    intro: "Penularan Flu Burung dari manusia ke manusia masih sangat terbatas dan tidak efisien. Ini adalah salah satu alasan utama mengapa Flu Burung belum menjadi pandemi.",
    bullets: [
      {
        label: "Penularan terbatas dalam klaster keluarga,",
        text: "beberapa kasus penularan antar manusia telah terdokumentasi, hampir semuanya terjadi setelah kontak erat dan berkepanjangan dengan pasien, seperti saat merawat anggota keluarga yang sakit.",
      },
      {
        label: "Tidak ada penularan komunitas yang berkelanjutan,",
        text: "hingga saat ini tidak ada bukti bahwa virus H5N1 atau subtipe lain dapat menyebar secara efisien dari manusia ke manusia dalam komunitas luas.",
      },
      {
        label: "Risiko bagi tenaga kesehatan,",
        text: "petugas medis yang merawat pasien Flu Burung tanpa APD memadai memiliki risiko terpapar, meskipun dokumentasi penularan ke nakes masih sangat jarang.",
      },
    ],
    callout: {
      title: "Mengapa Belum Menjadi Pandemi?",
      text: "Untuk menjadi pandemi, virus harus mampu menyebar efisien antar manusia. H5N1 sangat mematikan tetapi buruk dalam penularan antar manusia. Para ilmuwan khawatir mutasi atau reassortment bisa mengubah ini kapan saja, itulah mengapa surveilans ketat terus dilakukan secara global.",
    },
  },
  {
    title: "Faktor Lingkungan yang Mempercepat Penularan",
    intro: "Selain jalur biologis, kondisi lingkungan sangat memengaruhi seberapa cepat dan luas Flu Burung dapat menyebar:",
    bullets: [
      {
        label: "Pasar unggas hidup (wet market),",
        text: "lingkungan padat dengan berbagai spesies unggas dalam satu tempat menciptakan kondisi ideal untuk penyebaran dan mutasi virus. Hampir semua kasus H7N9 di China ditelusuri ke paparan di pasar unggas hidup.",
      },
      {
        label: "Jalur migrasi burung liar,",
        text: "burung migrasi membawa dan menyebarkan virus ke wilayah yang sangat jauh. Wabah HPAI H5N1 global sebagian besar mengikuti jalur migrasi burung dari Asia Tengah ke Eropa dan Afrika.",
      },
      {
        label: "Perdagangan unggas ilegal,",
        text: "transportasi unggas sakit atau terinfeksi tanpa pemeriksaan kesehatan hewan menyebarkan virus ke daerah baru yang sebelumnya bebas Flu Burung.",
      },
      {
        label: "Sanitasi peternakan yang buruk,",
        text: "kandang yang kotor, kepadatan unggas yang tinggi, dan tidak adanya biosekuriti memudahkan virus menyebar dalam satu peternakan dan ke peternakan sekitar.",
      },
    ],
    callout: null,
  },
];

export default function PenularanFluBurung() {
  const [active, setActive] = useState(0);

  const prev = () => setActive((i) => (i - 1 + SLIDES.length) % SLIDES.length);
  const next = () => setActive((i) => (i + 1) % SLIDES.length);

  const slide = SLIDES[active];

  return (
    <section
      id="cara-penularan"
      className="scroll-mt-24 w-full bg-white px-5 py-12 md:px-12 md:py-16 lg:px-20 lg:py-20 xl:px-24"
    >
      <div data-aos="fade-up" suppressHydrationWarning>
        <h2 className="text-2xl font-bold text-[#038F7A] md:text-3xl lg:text-[2rem]">
          Bagaimana Cara Penularan Flu Burung
        </h2>
        <p className="mt-5 text-[15px] leading-relaxed text-neutral-700 md:text-[17px] md:leading-[1.7]">
          Memahami cara penularan Flu Burung sangat penting, baik untuk melindungi diri maupun untuk menghindari
          kepanikan yang tidak perlu. Penularan Flu Burung berbeda secara fundamental dari flu biasa.
        </p>

        <hr className="mt-8 border-[#038F7A]/30 md:mt-10" />

        {/* Slider */}
        <div className="relative mt-8 md:mt-10">
          {/* Nav arrows */}
          <button
            type="button"
            onClick={prev}
            aria-label="Sebelumnya"
            className="absolute -left-3 top-1/2 z-10 -translate-y-1/2 p-1 text-[#038F7A] transition hover:opacity-70 md:-left-5"
          >
            <IconChevronLeft className="h-9 w-9 stroke-[1.5]" />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Selanjutnya"
            className="absolute -right-3 top-1/2 z-10 -translate-y-1/2 p-1 text-[#038F7A] transition hover:opacity-70 md:-right-5"
          >
            <IconChevronRight className="h-9 w-9 stroke-[1.5]" />
          </button>

          {/* Slide content */}
          <div className="px-12 md:px-16 lg:px-20">
            <h3 className="text-[16px] font-bold text-[#038F7A] md:text-[18px]">{slide.title}</h3>
            <p className="mt-3 text-[14px] leading-relaxed text-neutral-700 md:text-[15px] md:leading-[1.7]">
              {slide.intro}
            </p>

            <ul className="mt-4 space-y-3">
              {slide.bullets.map(({ label, text }, i) => (
                <li key={i} className="flex gap-2 text-[14px] leading-relaxed text-neutral-700 md:text-[15px] md:leading-[1.7]">
                  <span className="mt-[6px] h-2 w-2 shrink-0 rounded-full bg-[#038F7A]" aria-hidden />
                  <span>
                    <strong>{label}</strong> {text}
                  </span>
                </li>
              ))}
            </ul>

            {slide.callout && (
              <div className="mt-6 rounded-xl bg-neutral-100 px-5 py-4 md:px-6 md:py-5">
                <h4 className="text-[14px] font-semibold text-[#038F7A] md:text-[15px]">{slide.callout.title}</h4>
                <p className="mt-2 text-[13px] leading-relaxed text-neutral-700 md:text-[14px] md:leading-[1.65]">
                  {slide.callout.text}
                </p>
              </div>
            )}
          </div>

          {/* Dot indicators */}
          <div className="mt-8 flex justify-center gap-2">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Slide ${i + 1}`}
                className={`h-2.5 w-2.5 rounded-full border-2 transition-colors duration-200 ${
                  i === active ? "border-[#038F7A] bg-[#038F7A]" : "border-neutral-300 bg-transparent"
                }`}
              />
            ))}
          </div>
        </div>

        <hr className="mt-8 border-[#038F7A]/30 md:mt-10" />
      </div>
    </section>
  );
}
