"use client";

import React, { useState } from "react";

import { HEPATITIS_CONTENT_INSET } from "@/module/hepatitis/hepatitisLayoutClasses";

const FAKTOR_KIRI = [
  { label: "Tinggal/Bepergian ke Wilayah Endemis", desc: "Wilayah dengan sanitasi buruk atau akses air bersih terbatas.", weight: 35 },
  { label: "Kontak Langsung dengan Penderita", desc: "Kontak dekat dengan orang yang sedang terinfeksi Hepatitis A.", weight: 25 },
  { label: "Perilaku Seksual Tertentu", desc: "Aktivitas seksual tertentu yang meningkatkan risiko penularan (oro-anal).", weight: 20 },
  { label: "Penggunaan Narkoba", desc: "Penggunaan narkoba suntik atau jenis apa pun yang melibatkan berbagi peralatan.", weight: 20 },
];

const FAKTOR_KANAN = [
  { label: "Konsumsi Air & Makanan Tak Bersih", desc: "Mengonsumsi air/makanan yang tercemar HAV atau tidak dimasak benar.", weight: 25 },
  { label: "Sanitasi Lingkungan Buruk", desc: "Kepadatan penghuni, sanitasi buruk, atau kurangnya kebiasaan cuci tangan.", weight: 20 },
  { label: "Gangguan Sistem Imun", desc: "Sistem imun lemah mengurangi kemampuan tubuh melawan infeksi.", weight: 20 },
  { label: "Bekerja dengan Primata", desc: "Menangani hewan primata (kera, simpanse) yang bisa membawa virus serupa.", weight: 10 },
];

const DETAIL_ITEMS = [
  { label: "Tinggal atau bepergian ke wilayah endemis Hepatitis A:", desc: "Tinggal atau bepergian ke daerah dengan sanitasi buruk dan akses air bersih yang terbatas, termasuk sebagian wilayah di Asia, Afrika, Amerika Tengah, dan Selatan." },
  { label: "Konsumsi air dan makanan yang tidak bersih:", desc: "Mengonsumsi air yang tidak dimasak dengan benar atau makanan yang terkontaminasi air yang tercemar HAV." },
  { label: "Kontak langsung dengan penderita Hepatitis A:", desc: "Berkontak dekat dengan orang yang sedang terinfeksi Hepatitis A, baik dalam satu rumah maupun satu fasilitas perawatan." },
  { label: "Kondisi sanitasi lingkungan yang buruk:", desc: "Kepadatan penghuni, sanitasi yang buruk, dan kebiasaan cuci tangan yang tidak memadai mempermudah penyebaran virus." },
  { label: "Perilaku seksual tertentu:", desc: "Karena virus bisa ditularkan melalui kontak oro-anal, aktivitas seksual tertentu (terutama pada pria yang berhubungan seks dengan pria/LSL) meningkatkan risiko." },
  { label: "Memiliki gangguan sistem imun:", desc: "Karena sistem imun yang lemah mengurangi kemampuan tubuh melawan infeksi." },
  { label: "Penggunaan narkoba:", desc: "Penggunaan narkoba suntik atau narkoba jenis apapun yang melibatkan berbagi peralatan meningkatkan risiko paparan." },
  { label: "Bekerja dengan primata:", desc: "Menangani hewan primata (kera, simpanse) yang bisa membawa virus serupa juga meningkatkan risiko." },
];

const RADIUS = 45;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function getRiskLevel(pct) {
  if (pct === 0) return { label: "RENDAH", color: "#16a34a", ring: "#16a34a" };
  if (pct <= 40) return { label: "SEDANG", color: "#d97706", ring: "#ef4444" };
  if (pct <= 70) return { label: "TINGGI", color: "#dc2626", ring: "#dc2626" };
  return { label: "SANGAT TINGGI", color: "#991b1b", ring: "#991b1b" };
}

function CheckItem({ item, checked, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`flex w-full items-start gap-3 rounded-lg border px-3 py-3 text-left transition-colors duration-150 ${
        checked
          ? "border-l-4 border-[#038F7A] bg-[#038F7A]/5"
          : "border-neutral-200/90 bg-white hover:bg-neutral-50"
      }`}
    >
      <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 transition-colors ${
        checked ? "border-[#038F7A] bg-[#038F7A]" : "border-neutral-300 bg-white"
      }`}>
        {checked && (
          <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 12 12" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M2 6l3 3 5-5" />
          </svg>
        )}
      </span>
      <div className="min-w-0">
        <p className={`text-[13px] font-semibold leading-snug md:text-[14px] ${checked ? "text-[#038F7A]" : "text-neutral-800"}`}>
          {item.label}
        </p>
        <p className="mt-0.5 text-[12px] leading-relaxed text-neutral-500 md:text-[13px]">{item.desc}</p>
      </div>
    </button>
  );
}

export default function HepatitisPenyebabSection() {
  const ALL_ITEMS = [...FAKTOR_KIRI, ...FAKTOR_KANAN];
  const [checked, setChecked] = useState(Array(ALL_ITEMS.length).fill(false));

  const toggle = (i) => setChecked((prev) => prev.map((v, idx) => (idx === i ? !v : v)));

  const reset = () => setChecked(Array(ALL_ITEMS.length).fill(false));

  const percent = Math.min(
    ALL_ITEMS.reduce((sum, item, i) => sum + (checked[i] ? item.weight : 0), 0),
    100
  );

  const risk = getRiskLevel(percent);
  const offset = CIRCUMFERENCE * (1 - percent / 100);

  return (
    <section id="penyebab" className="scroll-mt-24 bg-white px-5 py-12 md:px-12 md:py-16 lg:px-20 xl:px-24">
      <div data-aos="fade-up" suppressHydrationWarning className={HEPATITIS_CONTENT_INSET}>
        <div className="space-y-8 md:space-y-10">
          <h2 className="text-[1.375rem] font-semibold leading-tight tracking-tight text-[#038F7A] md:text-[1.5rem] lg:text-[1.625rem] xl:text-[1.6875rem]">
            Penyebab &amp; Faktor Risiko dari Hepatitis A
          </h2>

          {/* Penyebab HAV */}
          <div className="space-y-3">
            <h3 className="text-[15px] font-semibold leading-snug text-[#038F7A] md:text-[16px] lg:text-[17px]">
              Penyebab Hepatitis A Virus (HAV)
            </h3>
            <p className="text-[15px] font-normal leading-relaxed text-neutral-700 md:text-[16px] lg:text-[17px]">
              Hepatitis A disebabkan oleh <em>Hepatitis A Virus</em> (HAV), sebuah virus RNA kecil yang
              sangat tahan terhadap kondisi lingkungan. HAV bisa bertahan hidup di luar tubuh manusia
              selama berjam-jam pada tangan, dan hingga berbulan-bulan di air dan tanah. Virus ini
              sangat stabil, bisa bertahan pada suhu beku, dan hanya mati jika dipanaskan di atas 85ºC
              selama setidaknya 1 menit, atau dengan disinfektan seperti <em>klorin</em>.
            </p>
          </div>

          {/* Faktor Risiko Interactive */}
          <div className="space-y-4">
            <h3 className="text-[15px] font-semibold leading-snug text-[#038F7A] md:text-[16px]">
              Faktor Risiko dari Hepatitis A
            </h3>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-5">
              {/* Kolom kiri */}
              <div className="space-y-3">
                {FAKTOR_KIRI.map((item, i) => (
                  <CheckItem key={i} item={item} checked={checked[i]} onToggle={() => toggle(i)} />
                ))}
              </div>

              {/* Kolom tengah */}
              <div className="space-y-3">
                {FAKTOR_KANAN.map((item, i) => (
                  <CheckItem key={i} item={item} checked={checked[i + 4]} onToggle={() => toggle(i + 4)} />
                ))}
              </div>

              {/* Kolom kanan - Status Risiko */}
              <div className="flex flex-col items-center justify-between rounded-2xl border border-neutral-200/90 bg-white px-6 py-6 text-center md:px-7 md:py-7">
                <p className="mb-4 text-[14px] font-semibold text-neutral-800 md:text-[15px]">
                  Status Risiko Saat Ini
                </p>

                <div className="relative flex items-center justify-center">
                  <svg width="120" height="120" viewBox="0 0 100 100" className="-rotate-90">
                    <circle cx="50" cy="50" r={RADIUS} fill="none" stroke="#e5e7eb" strokeWidth="10" />
                    <circle
                      cx="50"
                      cy="50"
                      r={RADIUS}
                      fill="none"
                      stroke={risk.ring}
                      strokeWidth="10"
                      strokeLinecap="round"
                      strokeDasharray={CIRCUMFERENCE}
                      strokeDashoffset={offset}
                      style={{ transition: "stroke-dashoffset 0.5s ease, stroke 0.3s ease" }}
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center">
                    <span className="text-[22px] font-bold leading-none text-neutral-900">{percent}%</span>
                    <span className="mt-1 text-[11px] font-bold tracking-wide" style={{ color: risk.color }}>
                      {risk.label}
                    </span>
                  </div>
                </div>

                <p className="mt-4 text-[12px] leading-relaxed text-neutral-500 md:text-[13px]">
                  {percent === 0
                    ? "Centang faktor risiko yang sesuai dengan kondisi Anda."
                    : "Risiko terdeteksi berdasarkan faktor yang Anda pilih."}
                </p>

                <button
                  type="button"
                  onClick={reset}
                  className="mt-4 w-full rounded-xl bg-[#038F7A] px-5 py-2.5 text-[14px] font-semibold text-white transition-opacity hover:opacity-90 active:opacity-80"
                >
                  Cek Ulang
                </button>
              </div>
            </div>
          </div>

          {/* Detail list */}
          <div className="space-y-3">
            <p className="text-[15px] font-normal leading-relaxed text-neutral-700 md:text-[16px]">
              Siapa pun bisa terkena Hepatitis A, tetapi beberapa kondisi meningkatkan risiko seseorang
              secara signifikan:
            </p>
            <ul className="space-y-3">
              {DETAIL_ITEMS.map(({ label, desc }, i) => (
                <li key={i} className="flex items-start gap-2.5 text-[14px] leading-relaxed text-neutral-700 md:text-[15px]">
                  <span className="mt-[7px] h-[6px] w-[6px] shrink-0 rounded-full bg-neutral-400" aria-hidden />
                  <span>
                    <strong className="font-semibold text-[#038F7A]">{label}</strong>{" "}
                    {desc}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
