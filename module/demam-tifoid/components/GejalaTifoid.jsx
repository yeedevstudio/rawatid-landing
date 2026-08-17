"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";
import { IconInfoCircle, IconAlertTriangle, IconTrendingUp, IconHeartPlus } from "@tabler/icons-react";

const MINGGU_ROWS = [
  {
    num: "01",
    fase: "Fase Akut Awal",
    faseIcon: "up1",
    gejala: (
      <>
        Demam naik bertahap tiap hari (<em>step-ladder fever</em>) mencapai 39–40°C di akhir minggu. Sakit kepala,
        lemas, tidak nafsu makan, nyeri otot. Sembelit lebih sering dari diare pada orang dewasa.
      </>
    ),
  },
  {
    num: "02",
    fase: "Fase Akut Penuh",
    faseIcon: "up2",
    gejala: (
      <>
        Demam tinggi menetap (39–40°C). Perut kembung, nyeri tekan perut. Muncul <em>rose spots</em> (bintik merah
        muda kecil di perut/dada). Lidah tampak kotor (berselaput putih kecoklatan di tengah, tepi merah). Denyut
        jantung melambat meskipun demam tinggi (<em>bradikardi relatif</em>). Limpa membesar.
      </>
    ),
  },
  {
    num: "03",
    fase: "Fase Kritis",
    faseIcon: "warn",
    gejala: (
      <>
        Demam terus tinggi. Risiko komplikasi tertinggi: perdarahan saluran cerna, perforasi usus. Penderita tampak
        sangat lemah dan mengantuk (<em>typhoid state</em>). Bisa muncul diare berbau busuk.
      </>
    ),
  },
  {
    num: "04",
    fase: "Fase Pemulihan",
    faseIcon: "heart",
    gejala: (
      <>
        Pada kasus tanpa komplikasi, demam mulai turun secara bertahap, kondisi umum membaik. Pemulihan total bisa
        memakan waktu beberapa minggu lagi.
      </>
    ),
  },
];

const GEJALA_KHAS_CARDS = [
  {
    image: "/image/tameng.png",
    title: <>Pola demam tangga (<em>step-ladder fever</em>)</>,
    text: "Demam naik bertahap setiap hari selama minggu pertama, hari pertama 37,5°C, hari kedua 38°C, dan seterusnya hingga 39–40°C, berbeda dari flu yang demamnya langsung tinggi.",
  },
  {
    image: "/image/lambung.webp",
    title: <><em>Bradikardi</em> relatif (<em>Faget's sign</em>)</>,
    text: <>Denyut nadi yang lambat tidak sesuai dengan tingginya suhu tubuh, pada suhu 40°C, denyut nadi seharusnya cepat, namun pada Demam <em>Tifoid</em> sering normal atau bahkan lambat. Ini tanda yang cukup khas.</>,
  },
  {
    image: "/image/sel.webp",
    title: <><em>Rose spots</em></>,
    text: "Bintik-bintik merah muda kecil yang muncul di perut dan dada pada minggu kedua, sangat khas untuk demam tifoid meskipun tidak selalu mudah terlihat.",
  },
  {
    image: "/image/bioflim.webp",
    title: <>Lidah berlapis (<em>coated tongue</em>)</>,
    text: "Lidah tampak kotor berselaput putih kecoklatan di tengah dengan tepi merah, tanda khas yang sering ditemukan saat pemeriksaan fisik.",
  },
  {
    image: "/image/drug.png",
    title: <><em>Typhoid state</em></>,
    text: "Penderita tampak sangat mengantuk, linglung, dan lemah pada minggu ketiga, tanda bahwa bakteri telah menyerang sistem saraf pusat.",
  },
];

const GEJALA_ANAK = [
  "Diare lebih sering terjadi (berbeda dari orang dewasa yang cenderung sembelit)",
  "Demam bisa lebih mendadak dan tinggi",
  "Muntah lebih sering",
  "Gejala pernapasan (batuk, pilek) bisa muncul bersamaan",
  "Kejang demam bisa terjadi pada anak kecil",
  "Rose spots dan bradikardi relatif lebih jarang terlihat pada anak",
];

const TANDA_BAHAYA = [
  "Perut tiba-tiba sangat kaku dan nyeri hebat di seluruh perut (tanda perforasi usus)",
  "BAB atau muntah berwarna merah atau hitam (perdarahan saluran cerna)",
  "Kesadaran menurun drastis, sulit dibangunkan, atau tidak mengenal orang sekitar",
  "Demam sangat tinggi (>40°C) disertai kejang",
  "Sesak napas berat",
  "Kulit sangat pucat, dingin, dan berkeringat (tanda syok)",
];

function FaseIcon({ type }) {
  if (type === "up1") {
    return (
      <div className="flex h-14 w-14 items-end justify-center gap-[3px] rounded-xl bg-orange-50 p-2 md:h-16 md:w-16">
        <div className="w-3 rounded-t bg-yellow-400" style={{ height: "30%" }} />
        <div className="w-3 rounded-t bg-orange-400" style={{ height: "55%" }} />
        <div className="w-3 rounded-t bg-orange-500" style={{ height: "75%" }} />
      </div>
    );
  }
  if (type === "up2") {
    return (
      <div className="flex h-14 w-14 items-end justify-center gap-[3px] rounded-xl bg-orange-50 p-2 md:h-16 md:w-16">
        <div className="w-3 rounded-t bg-yellow-400" style={{ height: "40%" }} />
        <div className="w-3 rounded-t bg-orange-400" style={{ height: "65%" }} />
        <div className="w-3 rounded-t bg-orange-500" style={{ height: "90%" }} />
      </div>
    );
  }
  if (type === "warn") {
    return (
      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-red-50 text-[#DB1A1A] md:h-16 md:w-16">
        <IconAlertTriangle className="h-8 w-8 stroke-[1.5]" aria-hidden />
      </div>
    );
  }
  return (
    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#038F7A]/10 text-[#038F7A] md:h-16 md:w-16">
      <IconHeartPlus className="h-8 w-8 stroke-[1.5]" aria-hidden />
    </div>
  );
}

function GejalaKhasCard({ image, title, text }) {
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

export default function GejalaTifoid() {
  const scrollerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const updateActive = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const cardWidth = el.firstElementChild?.children[0]?.offsetWidth ?? 380;
    const index = Math.round(el.scrollLeft / (cardWidth + 20));
    setActiveIndex(Math.min(index, GEJALA_KHAS_CARDS.length - 1));
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
      id="tanda-gejala"
      className="scroll-mt-24 w-full bg-white px-5 py-12 md:px-12 md:py-16 lg:px-20 lg:py-20 xl:px-24"
    >
      <div data-aos="fade-up" suppressHydrationWarning>
        <h2 className="text-2xl font-bold text-[#038F7A] md:text-3xl lg:text-[2rem]">
          Tanda &amp; Gejala Demam <em>Tifoid</em> atau Tipes
        </h2>

        <p className="mt-5 text-[15px] font-normal leading-relaxed text-neutral-700 md:text-[17px] md:leading-[1.7]">
          Gejala Demam <em>Tifoid</em> berkembang secara bertahap dan khas mengikuti pola minggu demi minggu. Memahami
          pola ini sangat penting agar tidak salah menilai perkembangan penyakit. Masa inkubasi atau waktu dari paparan
          bakteri hingga gejala pertama muncul adalah 6–30 hari, rata-rata 8–14 hari.
        </p>

        {/* Table */}
        <h3 className="mt-10 text-lg font-semibold text-[#038F7A] md:mt-12 md:text-xl">
          Perjalanan Penyakit Minggu per Minggu
        </h3>

        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[600px] border-collapse rounded-[16px] overflow-hidden border border-neutral-200/90 shadow-[0px_0px_12.1px_0px_#0000001A]">
            <thead>
              <tr>
                <th className="w-[130px] bg-red-50 px-4 py-3 text-center text-[14px] font-bold text-[#DB1A1A] md:w-[150px] md:text-[15px]">
                  Minggu
                </th>
                <th className="w-[150px] bg-[#EBF6F9] px-4 py-3 text-center text-[14px] font-bold text-[#038F7A] md:w-[170px] md:text-[15px]">
                  Fase
                </th>
                <th className="bg-[#EBF6F9] px-5 py-3 text-left text-[14px] font-bold text-[#038F7A] md:text-[15px]">
                  Gejala Utama
                </th>
              </tr>
            </thead>
            <tbody>
              {MINGGU_ROWS.map((row, i) => (
                <tr key={i} className="border-t border-neutral-200/90">
                  <td className="px-4 py-5 text-center align-middle">
                    <div className="flex flex-col items-center gap-2">
                      <div className="flex h-14 w-14 flex-col overflow-hidden rounded-xl border border-neutral-200 md:h-16 md:w-16">
                        <div className="flex h-4 items-center justify-center bg-[#038F7A]">
                          <div className="flex gap-1">
                            <div className="h-1.5 w-1.5 rounded-full bg-white/70" />
                            <div className="h-1.5 w-1.5 rounded-full bg-white/70" />
                          </div>
                        </div>
                        <div className="flex flex-1 items-center justify-center bg-white">
                          <span className="text-lg font-bold text-neutral-800 md:text-xl">{row.num}</span>
                        </div>
                      </div>
                      <span className="text-[12px] font-medium text-neutral-600 md:text-[13px]">Minggu {parseInt(row.num)}</span>
                    </div>
                  </td>
                  <td className="px-4 py-5 text-center align-middle">
                    <div className="flex flex-col items-center gap-2">
                      <FaseIcon type={row.faseIcon} />
                      <span className="text-[12px] font-medium text-neutral-700 md:text-[13px]">{row.fase}</span>
                    </div>
                  </td>
                  <td className="px-5 py-5 align-middle text-[13px] font-normal leading-relaxed text-neutral-700 md:text-[14px] md:leading-[1.7]">
                    {row.gejala}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Gejala Khas */}
        <h3 className="mt-10 text-lg font-semibold text-[#038F7A] md:mt-12 md:text-xl">
          Gejala Khas yang Membedakan Demam <em>Tifoid</em> atau Tipes dari Demam Biasa
        </h3>
        <p className="mt-3 text-[15px] font-normal leading-relaxed text-neutral-700 md:text-[17px] md:leading-[1.7]">
          Beberapa tanda dan gejala tifoid yang relatif khas dan perlu diketahui:
        </p>

        <div className="mt-6">
          <div ref={scrollerRef} className="overflow-x-auto scrollbar-hide scroll-smooth">
            <div className="flex gap-4 pb-2 md:gap-5">
              {GEJALA_KHAS_CARDS.map((card, i) => (
                <GejalaKhasCard key={i} {...card} />
              ))}
            </div>
          </div>
          <div className="mt-4 flex justify-center gap-2">
            {GEJALA_KHAS_CARDS.map((_, i) => (
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

        {/* Perbedaan Anak & Dewasa */}
        <h3 className="mt-10 text-lg font-semibold text-[#038F7A] md:mt-12 md:text-xl">
          Perbedaan Gejala Demam <em>Tifoid</em> atau Tipes pada Anak dan Dewasa
        </h3>

        <div className="mt-5 flex flex-col gap-4">
          {/* Teal callout - anak */}
          <div className="rounded-[16px] border border-[#038F7A] bg-white p-5 md:p-6">
            <div className="flex gap-3 md:gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#038F7A]/10 text-[#038F7A] md:h-11 md:w-11">
                <IconInfoCircle className="h-6 w-6 stroke-[1.5] md:h-7 md:w-7" aria-hidden />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="text-[15px] font-bold leading-tight text-[#038F7A] md:text-base">
                  Gejala Demam <em>Tifoid</em> pada Anak Bisa Berbeda:
                </h4>
                <p className="mt-3 text-[13px] font-normal leading-relaxed text-neutral-700 md:text-[15px] md:leading-[1.65]">
                  Pada anak-anak, terutama di bawah 5 tahun, gejala demam <em>tifoid</em> bisa tidak khas dan lebih
                  mirip <em>gastroenteritis</em> biasa:
                </p>
                <ul className="mt-2 flex flex-col gap-1">
                  {GEJALA_ANAK.map((item, i) => (
                    <li key={i} className="text-[13px] font-normal leading-relaxed text-neutral-700 md:text-[15px] md:leading-[1.65]">
                      - {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-[13px] font-normal leading-relaxed text-neutral-700 md:text-[15px] md:leading-[1.65]">
                  Inilah sebabnya diagnosis tifoid pada anak seringkali lebih sulit dan memerlukan pemeriksaan
                  laboratorium yang teliti.
                </p>
              </div>
            </div>
          </div>

          {/* Red callout - tanda bahaya */}
          <div className="rounded-[16px] border border-[#DB1A1A] bg-white p-5 md:p-6">
            <div className="flex gap-3 md:gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#DB1A1A]/10 text-[#DB1A1A] md:h-11 md:w-11">
                <IconInfoCircle className="h-6 w-6 stroke-[1.5] md:h-7 md:w-7" aria-hidden />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="text-[15px] font-bold leading-tight text-[#DB1A1A] md:text-base">
                  Tanda Bahaya — Segera ke UGD Rumah Sakit:
                </h4>
                <ul className="mt-3 flex flex-col gap-1">
                  {TANDA_BAHAYA.map((item, i) => (
                    <li key={i} className="text-[13px] font-normal leading-relaxed text-neutral-700 md:text-[15px] md:leading-[1.65]">
                      - {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-[13px] font-normal leading-relaxed text-neutral-700 md:text-[15px] md:leading-[1.65]">
                  Komplikasi seperti perforasi dan perdarahan usus bisa terjadi tiba-tiba pada minggu ketiga dan harus
                  ditangani sebagai kedaruratan bedah.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
