"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";
import { IconInfoCircle, IconWorld, IconUser } from "@tabler/icons-react";

const JALUR_CARDS = [
  {
    image: "/image/aqua.png",
    title: "Air minum yang terkontaminasi tinja",
    text: "Ini adalah jalur penularan terbesar di daerah dengan sanitasi buruk. Sumur atau sumber air yang terkontaminasi limbah dapat menginfeksi ribuan orang sekaligus",
  },
  {
    image: "/image/makanan.webp",
    title: "Makanan yang terkontaminasi",
    text: <>Makanan yang dipersiapkan oleh penderita demam <em>tifoid</em> yang tidak mencuci tangan dengan benar, atau makanan yang disiram/dicuci dengan air yang terkontaminasi</>,
  },
  {
    image: "/image/sayur.png",
    title: "Sayuran dan buah mentah",
    text: "Sayuran dan buah mentah yang ditanam dengan pupuk tinja atau disiram air limbah",
  },
  {
    image: "/image/sate.png",
    title: "Makanan dan minuman dari pedagang kaki lima",
    text: "Makanan dan minuman dari pedagang dengan higenitas yang tidak terjamin dan sering terjangkau lalat",
  },
  {
    image: "/image/ikan.webp",
    title: <><em>Seafood</em> dan kerang-kerangaan</>,
    text: <><em>Seafood</em> dari perairan yang terkontaminasi limbah manusia</>,
  },
  {
    image: "/image/esbatu.png",
    title: "Es batu dari air tidak bersih",
    text: "Minuman es yang dibuat dari air yang tidak dimasak merupakan sumber penularan yang sering diabaikan",
  },
];

const FAKTOR_LINGKUNGAN = [
  [
    { title: "Tinggal atau bepergian ke daerah endemis", text: "Asia Selatan (India, Pakistan, Bangladesh), Asia Tenggara termasuk Indonesia, Afrika sub-Sahara, dan Amerika Selatan adalah daerah dengan risiko tinggi" },
    { title: "Akses air bersih yang buruk", text: "Menggunakan air sumur atau sumber air yang tidak terjamin kebersihannya" },
    { title: "Sanitasi lingkungan yang buruk", text: "Tidak ada jamban yang layak, pengelolaan tinja terbuka" },
  ],
  [
    { title: <>Konsumsi makanan/minuman tidak <em>higiene</em></>, text: "Jajan sembarangan, tidak memperhatikan kebersihan tempat makan" },
    { title: "Tidak mencuci tangan", text: "Setelah buang air besar atau sebelum makan" },
    { title: "Tinggal di kondisi padat penduduk", text: "Asrama, penjara, pengungsian — meningkatkan risiko penularan" },
  ],
];

const FAKTOR_INDIVIDU = [
  [
    { title: <>Belum pernah divaksin <em>tifoid</em></>, text: "Vaksin memberikan perlindungan 50–80%" },
    { title: "Usia anak-anak 5–19 tahun", text: "Kelompok usia yang paling sering terkena di daerah endemis" },
    { title: "Sistem imun lemah", text: "Penderita HIV/AIDS, pasien kemoterapi, atau mereka yang mengonsumsi imunosupresan" },
  ],
  [
    { title: "Penggunaan antasida atau obat penekan asam lambung", text: "Mengurangi pertahanan asam lambung yang seharusnya membunuh sebagian bakteri" },
    { title: "Riwayat operasi kandung empedu", text: "Meningkatkan risiko menjadi carrier" },
  ],
];

function RisikoItem({ title, text, color }) {
  const bar = color === "red" ? "bg-[#DB1A1A]" : "bg-[#038F7A]";
  const titleColor = color === "red" ? "text-[#DB1A1A]" : "text-[#038F7A]";
  return (
    <div className="flex gap-3 md:gap-4">
      <div className={`w-[3px] shrink-0 self-stretch rounded-full ${bar}`} />
      <div className="flex flex-col gap-1">
        <h5 className={`text-[14px] font-bold leading-snug md:text-[15px] ${titleColor}`}>{title}</h5>
        <p className="text-[13px] font-normal leading-relaxed text-neutral-600 md:text-[14px]">{text}</p>
      </div>
    </div>
  );
}

function JalurCard({ image, title, text }) {
  return (
    <div className="flex w-[260px] shrink-0 flex-col items-center gap-4 rounded-[16px] border border-neutral-200/90 bg-white p-5 shadow-[0px_0px_12.1px_0px_#0000001A] sm:w-[280px] md:w-[300px] md:p-6">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={image} alt="" className="h-24 w-24 shrink-0 object-contain md:h-28 md:w-28" />
      <h4 className="text-center text-[14px] font-bold leading-snug text-neutral-900 md:text-[15px]">{title}</h4>
      <p className="text-center text-[13px] font-normal leading-relaxed text-neutral-600 md:text-[14px]">{text}</p>
    </div>
  );
}

export default function PenyebabTifoid() {
  const scrollerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const updateActive = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const cardWidth = el.firstElementChild?.children[0]?.offsetWidth ?? 280;
    const index = Math.round(el.scrollLeft / (cardWidth + 20));
    setActiveIndex(Math.min(index, JALUR_CARDS.length - 1));
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateActive, { passive: true });
    return () => el.removeEventListener("scroll", updateActive);
  }, [updateActive]);

  const scrollTo = (i) => {
    const el = scrollerRef.current;
    const card = el?.firstElementChild?.children[i];
    if (!el || !card) return;
    el.scrollTo({ left: card.offsetLeft, behavior: "smooth" });
  };

  return (
    <section
      id="penyebab-risiko"
      className="scroll-mt-24 w-full bg-white px-5 py-12 md:px-12 md:py-16 lg:px-20 lg:py-20 xl:px-24"
    >
      <div data-aos="fade-up" suppressHydrationWarning>
        <h2 className="text-2xl font-bold text-[#038F7A] md:text-3xl lg:text-[2rem]">
          Penyebab &amp; Faktor Risiko Demam <em>Tifoid</em> atau Tipes
        </h2>

        <h3 className="mt-8 text-lg font-semibold text-[#038F7A] md:text-xl">
          Bagaimana Penularan Terjadi?
        </h3>
        <p className="mt-3 text-[15px] font-normal leading-relaxed text-neutral-700 md:text-[17px] md:leading-[1.7]">
          Demam <em>Tifoid</em> ditularkan melalui rute <em>fekal-oral</em>, bakteri keluar bersama tinja dan urin penderita,
          lalu masuk ke tubuh orang lain melalui mulut dengan perantara makanan atau air yang terkontaminasi. Bakteri
          tidak menular melalui kontak langsung seperti berjabat tangan, berpelukan, atau berbagi pakaian.
        </p>

        <h3 className="mt-10 text-lg font-semibold text-[#038F7A] md:mt-12 md:text-xl">
          Jalur Penularan Utama
        </h3>

        <div className="mt-6">
          <div ref={scrollerRef} className="overflow-x-auto scrollbar-hide scroll-smooth">
            <div className="flex gap-4 pb-2 md:gap-5">
              {JALUR_CARDS.map((card, i) => (
                <JalurCard key={i} {...card} />
              ))}
            </div>
          </div>

          <div className="mt-4 flex justify-center gap-2">
            {JALUR_CARDS.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => scrollTo(i)}
                aria-label={`Kartu ${i + 1}`}
                className={`h-2.5 w-2.5 rounded-full transition-colors ${
                  i === activeIndex ? "bg-[#038F7A]" : "bg-neutral-300"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Orange callout */}
        <div className="mt-10 rounded-[16px] border border-[#DB8B1A] bg-white p-5 md:mt-12 md:p-6">
          <div className="flex gap-3 md:gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#DB8B1A]/10 text-[#DB8B1A] md:h-11 md:w-11">
              <IconInfoCircle className="h-6 w-6 stroke-[1.5] md:h-7 md:w-7" aria-hidden />
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="text-[15px] font-bold leading-tight text-[#DB8B1A] md:text-base">
                Peran Orang yang Sudah Terinfeksi Bakteri dalam Penularan Demam <em>Tifoid</em>
              </h4>
              <p className="mt-3 text-[13px] font-normal leading-relaxed text-neutral-700 md:text-[15px] md:leading-[1.65]">
                Sekitar 1–6% penderita demam <em>tifoid</em> yang sudah sembuh menjadi <em>carrier kronis</em>, mereka
                tetap membawa bakteri di kandung empedu dan mengeluarkannya bersama tinja selama berbulan-bulan hingga
                bertahun-tahun tanpa merasa sakit.
              </p>
              <p className="mt-3 text-[13px] font-normal leading-relaxed text-neutral-700 md:text-[15px] md:leading-[1.65]">
                <em>Carrier kronis</em> adalah sumber penularan yang berbahaya karena tidak terdeteksi. Kasus terkenal
                dalam sejarah, yaitu <em>Typhoid Mary</em> di Amerika Serikat awal abad ke-20, seorang koki yang menjadi{" "}
                <em>carrier kronis</em> dan menginfeksi puluhan orang.
              </p>
            </div>
          </div>
        </div>
        {/* Faktor Risiko */}
        <h3 className="mt-10 text-lg font-semibold text-[#038F7A] md:mt-12 md:text-xl">
          Faktor Risiko Terkena Demam <em>Tifoid</em> atau Tipes
        </h3>

        <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10">
          {/* Faktor Lingkungan */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#038F7A]/10 text-[#038F7A]">
                <IconWorld className="h-5 w-5 stroke-[1.5]" aria-hidden />
              </div>
              <h4 className="text-[15px] font-semibold text-[#038F7A] md:text-base">Faktor Lingkungan dan Perilaku</h4>
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
              {FAKTOR_LINGKUNGAN.map((col, ci) => (
                <div key={ci} className="flex flex-col gap-5">
                  {col.map((item, ii) => (
                    <RisikoItem key={ii} {...item} color="teal" />
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Faktor Individu */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#DB1A1A]/10 text-[#DB1A1A]">
                <IconUser className="h-5 w-5 stroke-[1.5]" aria-hidden />
              </div>
              <h4 className="text-[15px] font-semibold text-[#DB1A1A] md:text-base">Faktor Individu</h4>
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
              {FAKTOR_INDIVIDU.map((col, ci) => (
                <div key={ci} className="flex flex-col gap-5">
                  {col.map((item, ii) => (
                    <RisikoItem key={ii} {...item} color="red" />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
