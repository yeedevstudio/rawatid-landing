"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";

const BAKTERI_CARDS = [
  {
    image: "/image/tameng.png",
    title: "Kemampuan bertahan di lingkungan",
    text: "Bakteri ini bisa bertahan di air selama berminggu-minggu dan di makanan selama beberapa hari pada suhu ruang",
  },
  {
    image: "/image/lambung.png",
    title: "Resistensi terhadap asam lambung",
    text: "Sebagian bakteri mampu melewati asam lambung dan mencapai usus halus",
  },
  {
    image: "/image/sel.png",
    title: "Kemampuan hidup di dalam sel imun",
    text: <>S. Typhi bisa hidup dan berkembang biak di dalam <em>makrofag</em> (sel kekebalan tubuh) sehingga sulit dibasmi oleh sistem imun</>,
  },
  {
    image: "/image/bioflim.png",
    title: <> Pembentukan <em>biofilm</em></>,
    text: <>Bisa membentuk <em>biofilm</em> di kandung empedu pada <em>carrier</em> kronis, membuatnya sangat sulit diberantas</>,
  },
  {
    image: "/image/drug.png",
    title: "Resistensi antibiotik yang meningkat",
    text: <>Strain resisten berbagai antibiotik (MDR, XDR typhoid) semakin banyak ditemukan di Pakistan, India, dan beberapa negara Asia lainnya</>,
  },
];

function BakteriCard({ image, title, text }) {
  return (
    <div className="flex w-[320px] shrink-0 flex-row items-start gap-4 rounded-[16px] border border-neutral-200/90 bg-white p-4 shadow-[0px_0px_12.1px_0px_#0000001A] sm:w-[380px] md:w-[420px] md:gap-5 md:p-5">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={image} alt="" className="h-16 w-16 shrink-0 object-contain md:h-20 md:w-20" />
      <div className="flex flex-col gap-2">
        <h4 className="text-[14px] font-bold leading-snug text-neutral-900 md:text-[15px]">{title}</h4>
        <p className="text-[13px] font-normal leading-relaxed text-neutral-600 md:text-[14px]">{text}</p>
      </div>
    </div>
  );
}

export default function ApaItuTifoid() {
  const scrollerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const updateActive = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const cardWidth = el.firstElementChild?.children[0]?.offsetWidth ?? 300;
    const index = Math.round(el.scrollLeft / (cardWidth + 20));
    setActiveIndex(Math.min(index, BAKTERI_CARDS.length - 1));
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
      id="apa-itu-tifoid"
      className="scroll-mt-24 w-full bg-white px-5 py-12 md:px-12 md:py-16 lg:px-20 lg:py-20 xl:px-24"
    >
      <div data-aos="fade-up" suppressHydrationWarning>
        {/* Heading + dua kolom */}
        <h2 className="text-2xl font-bold text-[#038F7A] md:text-3xl lg:text-[2rem]">
          Apa Itu Demam <em>Tifoid</em> atau Tipes?
        </h2>

        <div className="mt-6 flex flex-col gap-8 md:flex-row md:items-center md:gap-12">
          <div className="flex-1 space-y-4 text-[15px] font-normal leading-relaxed text-neutral-700 md:text-[17px] md:leading-[1.7]">
            <p>
              Demam <em>Tifoid</em> adalah infeksi bakteri sistemik yang menyebar ke seluruh tubuh melalui aliran
              darah yang disebabkan oleh <em>Salmonella Enterica Serotipe Typhi</em> (<em>S. Typhi</em>). Berbeda
              dari keracunan makanan biasa yang hanya menyerang saluran cerna, bakteri <em>tifoid</em> masuk ke
              dalam aliran darah dan menyerang hampir seluruh organ tubuh.
            </p>
            <p>
              Penyakit ini dikenal dengan berbagai nama: demam <em>tifoid</em>, <em>tifus abdominalis</em>,{" "}
              <em>enteric fever</em>, dan yang paling populer di masyarakat awam Indonesia adalah tipes.
            </p>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/image/usus.png"
            alt=""
            className="h-auto w-full max-w-[260px] shrink-0 self-center object-contain md:max-w-[300px] lg:max-w-[340px]"
          />
        </div>

        {/* Tipes vs Tifus card */}
        <div className="mt-8 rounded-[16px] border border-neutral-200/90 bg-white p-5 shadow-[0px_0px_12.1px_0px_#0000001A] md:mt-10 md:p-6">
          <h3 className="text-[15px] font-bold text-[#038F7A] md:text-base">Tipes vs. Tifus: Apakah Sama?</h3>
          <p className="mt-3 text-[13px] leading-relaxed text-neutral-700 md:text-[14px]">
            Di Indonesia, kata tipes dan tifus sering digunakan bergantian untuk menyebut demam <em>tifoid</em>.
            Namun dalam dunia medis, tifus sebenarnya merujuk pada dua penyakit berbeda:
          </p>

          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex gap-4 md:gap-5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/image/tifus.png" alt="" className="h-24 w-24 shrink-0 object-contain md:h-28 md:w-28" />
              <div>
                <h4 className="text-[13px] font-bold text-neutral-900 md:text-[14px]">
                  <em>Tifus Murin / Epidemic Typhus</em>
                </h4>
                <p className="mt-1 text-[13px] leading-relaxed text-neutral-600 md:text-[14px]">
                  Disebabkan bakteri Rickettsia, ditularkan melalui gigitan kutu atau tungau. Ini penyakit yang
                  berbeda.
                </p>
              </div>
            </div>
            <div className="flex gap-4 border-neutral-200/90 sm:border-l sm:pl-4 md:gap-5 md:pl-5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/image/tifoidvirus.png" alt="" className="h-24 w-24 shrink-0 object-contain md:h-28 md:w-28" />
              <div>
                <h4 className="text-[13px] font-bold text-neutral-900 md:text-[14px]">
                  Demam <em>Tifoid</em> (<em>Typhoid Fever</em>)
                </h4>
                <p className="mt-1 text-[13px] leading-relaxed text-neutral-600 md:text-[14px]">
                  Disebabkan <em>S. Typhi</em>, ditularkan melalui makanan/minuman terkontaminasi.
                </p>
              </div>
            </div>
          </div>

          <p className="mt-5 text-[13px] leading-relaxed text-neutral-700 md:text-[14px]">
            Dalam artikel ini, demam <em>tifoid</em> atau tipes merujuk pada <em>Typhoid Fever</em> yang disebabkan{" "}
            <em>S. Typhi.</em>
          </p>
        </div>

        {/* Bakteri penyebab */}
        <h3 className="mt-10 text-lg font-semibold text-[#038F7A] md:mt-12 md:text-xl">
          Bakteri Penyebab Demam <em>Tifoid</em> atau Tipes: <em>Salmonella Typhi</em>
        </h3>
        <div className="mt-4 space-y-4 text-[15px] font-normal leading-relaxed text-neutral-700 md:text-[17px] md:leading-[1.7]">
          <p>
            <em>Salmonella Typhi</em> adalah bakteri berbentuk batang atau basil yang hanya menginfeksi manusia,
            tidak ditemukan secara alami pada hewan. Ini menjadikan manusia sebagai satu-satunya <em>reservoir</em>{" "}
            atau sumber bakteri ini di alam.
          </p>
          <p>Keunikan <em>S. Typhi</em> yang membuatnya sangat berbahaya:</p>
        </div>

        {/* Carousel */}
        <div className="mt-6">
          <div
            ref={scrollerRef}
            className="overflow-x-auto scrollbar-hide scroll-smooth"
          >
            <div className="flex gap-4 pb-2 md:gap-5">
              {BAKTERI_CARDS.map((card, i) => (
                <BakteriCard key={i} {...card} />
              ))}
            </div>
          </div>

          <div className="mt-4 flex justify-center gap-2">
            {BAKTERI_CARDS.map((_, i) => (
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
      </div>
    </section>
  );
}
