"use client";

import {
  IconBuildingSkyscraper,
  IconClock,
  IconCloudRain,
  IconDroplet,
  IconPalette,
  IconShieldOff,
  IconTemperatureMinus,
  IconTrash,
  IconUser,
  IconUsersGroup,
  IconVirus,
  IconWorld,
} from "@tabler/icons-react";
import React, { useState } from "react";

const shadowCard = "shadow-[0px_0px_12.1px_0px_#0000001A]";

const RADIUS = 45;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const TRANSMISI_ITEMS = [
  {
    title: "Warna Tubuh",
    text: "Hitam dengan bintik-bintik putih khas di seluruh tubuh.",
    Icon: IconPalette,
  },
  {
    title: "Waktu Aktif",
    text: "Pagi (08:00-10:00) dan sore hari (16:00-18:00). Bukan malam hari.",
    Icon: IconClock,
  },
  {
    title: "Tempat Berkembang Biak",
    text: "Air bersih tergenang (bak mandi, vas, ban bekas, talang atap).",
    Icon: IconDroplet,
  },
  {
    title: "Jarak Terbang",
    text: "Relatif pendek, biasanya dalam radius 100-200 meter.",
    Icon: IconWorld,
  },
];

const FAKTOR_LINGKUNGAN = [
  { title: "Musim Hujan", desc: "Genangan air meningkat drastis, menyediakan tempat berkembang biak nyamuk.", Icon: IconCloudRain, weight: 15 },
  { title: "Kepadatan Penduduk", desc: "Semakin padat area pemukiman, semakin mudah nyamuk berpindah antar rumah.", Icon: IconUsersGroup, weight: 10 },
  { title: "Sanitasi Buruk", desc: "Tumpukan barang bekas dan kurangnya penutup pada penampungan air.", Icon: IconTrash, weight: 10 },
  { title: "Daerah Tropis", desc: "Iklim panas dan lembab mendukung perkembangbiakan nyamuk sepanjang tahun.", Icon: IconTemperatureMinus, weight: 10 },
];

const FAKTOR_INDIVIDU = [
  { title: "Usia 5-15 Tahun", desc: "Kelompok yang paling sering terkena DBD parah di daerah endemis.", Icon: IconUser, weight: 20 },
  { title: "Infeksi Sebelumnya", desc: "Berisiko mengalami DBD parah pada infeksi kedua dengan serotipe berbeda.", Icon: IconVirus, weight: 20 },
  { title: "Sistem Imun Lemah", desc: "Penderita penyakit kronis atau gangguan imun lebih rentan.", Icon: IconShieldOff, weight: 10 },
  { title: "Tidak Ada Imunitas", desc: "Pendatang baru ke daerah endemis tanpa riwayat infeksi sebelumnya.", Icon: IconBuildingSkyscraper, weight: 5 },
];

function getRiskLevel(pct) {
  if (pct === 0) return { label: "RENDAH", color: "#16a34a", ring: "#16a34a" };
  if (pct <= 40) return { label: "SEDANG", color: "#d97706", ring: "#ef4444" };
  if (pct <= 70) return { label: "TINGGI", color: "#dc2626", ring: "#dc2626" };
  return { label: "SANGAT TINGGI", color: "#991b1b", ring: "#991b1b" };
}

function CheckItem({ item, checked, onToggle, accent = "teal" }) {
  const { Icon } = item;
  const color = accent === "red" ? "#9B1C1C" : "#038F7A";
  const borderActive = accent === "red" ? "border-[#9B1C1C]" : "border-[#038F7A]";
  const bgActive = accent === "red" ? "bg-[#9B1C1C]/5" : "bg-[#038F7A]/5";
  const iconBg = accent === "red" ? "bg-[#9B1C1C]/10" : "bg-[#038F7A]/10";

  return (
    <button
      type="button"
      onClick={onToggle}
      className={`flex w-full items-start gap-3 rounded-lg border px-3 py-3 text-left transition-colors duration-150 ${
        checked ? `border-l-4 ${borderActive} ${bgActive}` : "border-neutral-200/90 bg-white hover:bg-neutral-50"
      }`}
    >
      <div className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md ${iconBg}`} style={{ color }}>
        <Icon className="h-4 w-4 stroke-[1.5]" aria-hidden />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[13px] font-semibold leading-snug md:text-[14px]" style={{ color }}>
          {item.title}
        </p>
        <p className="mt-0.5 text-[12px] leading-relaxed text-neutral-500 md:text-[13px]">{item.desc}</p>
      </div>
      <span
        className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 transition-colors"
        style={checked ? { borderColor: color, backgroundColor: color } : { borderColor: "#d1d5db", backgroundColor: "#fff" }}
      >
        {checked && (
          <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 12 12" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M2 6l3 3 5-5" />
          </svg>
        )}
      </span>
    </button>
  );
}

function TransmisiCard({ title, text, Icon }) {
  return (
    <article className="flex h-full min-h-[220px] min-w-0 flex-col items-start rounded-[14px] bg-[#EBF6F9] p-5 md:min-h-[240px] md:p-6">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-white text-[#038F7A]">
        <Icon className="h-5 w-5 stroke-[1.5]" aria-hidden />
      </div>
      <h3 className="mt-3 w-full text-left text-[14px] font-bold leading-snug text-[#038F7A] md:mt-4 md:text-[15px]">
        {title}
      </h3>
      <p className="mt-2 w-full flex-1 text-left text-[12px] font-normal leading-relaxed text-neutral-600 md:text-[13px]">
        {text}
      </p>
    </article>
  );
}

export default function DbdPenyebabRisikoSection() {
  const ALL_ITEMS = [...FAKTOR_LINGKUNGAN, ...FAKTOR_INDIVIDU];
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
    <section
      id="penyebab-risiko"
      className="scroll-mt-24 w-full bg-white px-5 py-12 md:px-12 md:py-16 lg:px-20 lg:py-20 xl:px-24"
    >
      <div data-aos="fade-up" suppressHydrationWarning>
        <div className="space-y-10 md:space-y-12">
          <h2 className="text-[1.375rem] font-semibold leading-tight tracking-tight text-[#038F7A] md:text-[1.5rem] lg:text-[1.625rem] xl:text-[1.6875rem]">
            Penyebab &amp; Faktor Risiko Demam Berdarah <em>Dengue</em> (DBD)
          </h2>

          {/* Bagaimana Penularan Terjadi */}
          <div className="space-y-4">
            <h3 className="text-[15px] font-semibold leading-snug text-[#038F7A] md:text-[16px] lg:text-[17px]">
              Bagaimana Penularan Terjadi?
            </h3>
            <p className="text-[15px] font-normal leading-relaxed text-neutral-700 md:text-[16px] lg:text-[17px]">
              Nyamuk <em>Aedes Aegypti</em> adalah vektor utama penularan DBD. Nyamuk betina yang menggigit
              penderita DBD akan menghisap virus bersama darahnya. Selama 8–12 hari masa inkubasi ekstrinsik,
              virus berkembang biak di dalam tubuh nyamuk. Setelah itu, nyamuk tersebut menjadi infektif dan
              bisa menularkan virus ke manusia lain melalui gigitannya.
            </p>
            <p className="text-[15px] font-semibold text-neutral-800 md:text-[15px]">
              Ciri khas nyamuk Aedes Aegypti yang perlu diketahui:
            </p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
              {TRANSMISI_ITEMS.map((item) => (
                <TransmisiCard key={item.title} {...item} />
              ))}
            </div>
          </div>

          {/* Faktor Risiko Interactive */}
          <div className="space-y-4">
            <h3 className="text-[15px] font-semibold leading-snug text-[#038F7A] md:text-[16px] lg:text-[17px]">
              Faktor Risiko yang Meningkatkan Kemungkinan Tertular Demam Berdarah Dengue (DBD)
            </h3>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-5">
              {/* Faktor Lingkungan */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-[#038F7A]">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[#038F7A]/10">
                    <IconBuildingSkyscraper className="h-4 w-4 stroke-[1.5]" aria-hidden />
                  </span>
                  <p className="text-[14px] font-semibold md:text-[15px]">Faktor Lingkungan</p>
                </div>
                {FAKTOR_LINGKUNGAN.map((item, i) => (
                  <CheckItem key={i} item={item} checked={checked[i]} onToggle={() => toggle(i)} />
                ))}
              </div>

              {/* Faktor Individu */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-[#9B1C1C]">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[#9B1C1C]/10">
                    <IconUser className="h-4 w-4 stroke-[1.5]" aria-hidden />
                  </span>
                  <p className="text-[14px] font-semibold md:text-[15px]">Faktor Individu</p>
                </div>
                {FAKTOR_INDIVIDU.map((item, i) => (
                  <CheckItem key={i} item={item} checked={checked[i + 4]} onToggle={() => toggle(i + 4)} accent="red" />
                ))}
              </div>

              {/* Status Risiko */}
              <div className="flex flex-col items-center justify-between rounded-2xl border border-neutral-200/90 bg-white px-6 py-6 text-center md:px-7 md:py-7">
                <p className="mb-4 text-[14px] font-semibold text-neutral-800 md:text-[15px]">
                  Status Risiko Saat Ini
                </p>

                <div className="relative flex items-center justify-center">
                  <svg width="120" height="120" viewBox="0 0 100 100" className="-rotate-90">
                    <circle cx="50" cy="50" r={RADIUS} fill="none" stroke="#e5e7eb" strokeWidth="10" />
                    <circle
                      cx="50" cy="50" r={RADIUS} fill="none"
                      stroke={risk.ring} strokeWidth="10" strokeLinecap="round"
                      strokeDasharray={CIRCUMFERENCE} strokeDashoffset={offset}
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
        </div>
      </div>
    </section>
  );
}
