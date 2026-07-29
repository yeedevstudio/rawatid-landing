"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  IconChevronDown,
  IconWheelchair,
  IconPill,
  IconFlask,
  IconStretching,
  IconToiletPaper,
  IconBuildingMosque,
  IconAirConditioning,
  IconBabyBottle,
  IconParking,
  IconBuilding,
  IconShieldPlus,
  IconCreditCard,
  IconArrowsExchange,
  IconQrcode,
  IconCash,
} from "@tabler/icons-react";
import Breadcrumbs from "@/common/components/Breadcrumbs";

// --- Static placeholder content (no endpoint yet for these sections) ---
const SERVICES = Array.from({ length: 2 }).map(() => ({
  title: "Kesehatan Saraf",
  desc: "Konsultasi saraf, injeksi intramuskular, EMG dan terapi saraf",
}));

const DOCTORS = Array.from({ length: 3 }).map(() => ({
  name: "dr. Annisa Tri Kusuma, Sp.N",
  facility: "Rumah Sakit Cempaka Lima",
  specialty: "Dokter Spesialis Neurologi",
  poli: "Poli Saraf",
  time: "10:00-12:00",
}));

const PROMOS = Array.from({ length: 3 }).map(() => ({
  title: "Promo Ramadhan Fisioterapi",
  date: "16 Feb - 31 Mar 2026",
}));

const FASILITAS = [
  { icon: IconWheelchair, label: "Kursi Roda" },
  { icon: IconPill, label: "Farmasi" },
  { icon: IconFlask, label: "Sampling Corner" },
  { icon: IconStretching, label: "Ruang Terapi" },
  { icon: IconToiletPaper, label: "Toilet" },
  { icon: IconBuildingMosque, label: "Mushola" },
  { icon: IconAirConditioning, label: "Ruangan Full AC" },
  { icon: IconBabyBottle, label: "Ruang Laktasi" },
  { icon: IconParking, label: "Tempat Parkir" },
];

const PEMBAYARAN = [
  { icon: IconBuilding, label: "Perusahaan" },
  { icon: IconShieldPlus, label: "Asuransi" },
  { icon: IconCreditCard, label: "Debit" },
  { icon: IconArrowsExchange, label: "Bank Transfer" },
  { icon: IconQrcode, label: "QRIS" },
  { icon: IconCash, label: "Cash" },
];

function SectionTitle({ children }) {
  return <h2 className="text-xl md:text-2xl font-bold text-green mb-5">{children}</h2>;
}

function Pill({ icon: Icon, label }) {
  return (
    <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-green/40 text-green">
      <Icon size={22} className="shrink-0" />
      <span className="text-sm md:text-base font-medium text-gray-600">{label}</span>
    </div>
  );
}

export default function FacilityDetailClient({ id }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const res = await fetch(`/api/health-facilities/${id}`, { cache: "no-store" });
        const json = await res.json();
        if (!res.ok) throw new Error(json?.message || "Gagal memuat data fasilitas.");
        if (active) setData(json?.data ?? json ?? null);
      } catch (e) {
        if (active) setError(e.message || "Terjadi kesalahan.");
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [id]);

  const name = (data?.name || "").trim() || "Fasilitas Kesehatan";

  if (loading) {
    return <div className="py-24 text-center text-gray-400">Memuat detail fasilitas...</div>;
  }
  if (error) {
    return <div className="py-24 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="w-full">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 pt-6">
        <Breadcrumbs
          items={[
            { label: "Beranda", href: "/" },
            { label: "Informasi Kesehatan", href: "/informasi-kesehatan/informasi-obat" },
            { label: "Informasi RS dan Klinik", href: "/informasi-kesehatan/informasi-rs-dan-klinik" },
            { label: name, href: `/informasi-kesehatan/informasi-rs-dan-klinik/${id}` },
          ]}
        />
      </div>

      {/* Hero */}
      <div className="relative w-full h-[300px] md:h-[440px] mt-8 md:mt-10 overflow-hidden bg-gradient-to-br from-green/80 to-green">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={data?.image || "/dummy/hospital.png"}
          alt={name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/25" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 text-white">
          <p className="tracking-[0.2em] text-sm md:text-base font-semibold">SELAMAT DATANG DI</p>
          <h1 className="mt-2 text-3xl md:text-5xl font-bold">{name}</h1>
        </div>
      </div>

      <main className="max-w-[1400px] mx-auto px-4 md:px-8 py-10 flex flex-col gap-12">
        {/* Tentang */}
        <section>
          <SectionTitle>Tentang Rumah Sakit &amp; Klinik {name}</SectionTitle>
          <p className="text-gray-600 leading-relaxed">
            {data?.description ||
              "Belum ada deskripsi untuk fasilitas kesehatan ini."}
          </p>
        </section>

        {/* Layanan Kami */}
        <section>
          <SectionTitle>Layanan Kami</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SERVICES.map((s, i) => (
              <div
                key={i}
                className="relative rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.06)] bg-white p-6 min-h-[210px] overflow-hidden"
              >
                {/* right illustration */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/dummy/layanan.png"
                  alt=""
                  aria-hidden="true"
                  className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 h-[85%] w-1/2 object-contain object-right"
                />
                {/* brain icon */}
                <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-greenImage">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/dummy/otak.png" alt="" aria-hidden="true" className="w-9 h-9 object-contain" />
                </div>
                {/* text */}
                <div className="relative mt-14 max-w-[62%]">
                  <h3 className="text-lg md:text-xl font-semibold text-gray-800">{s.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <Link href="#" className="inline-block mt-4 text-green font-semibold underline">
            Semua Layanan
          </Link>
        </section>

        {/* Jadwal Praktik Hari Ini */}
        <section>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
            <SectionTitle>Jadwal Praktik Hari Ini</SectionTitle>
            <div className="relative">
              <select className="appearance-none px-4 py-2.5 pr-10 rounded-xl border border-gray-200 text-sm text-gray-600 outline-none focus:border-green bg-white">
                <option>Spesialis</option>
              </select>
              <IconChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {DOCTORS.map((d, i) => (
              <div key={i} className="w-full max-w-[380px] mx-auto rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.06)] bg-white p-5">
                <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/dummy/dokter.png"
                    alt={d.name}
                    className="h-24 w-24 rounded-full object-cover shrink-0"
                  />
                  <div className="min-w-0">
                    <p className="font-semibold text-gray-800 text-sm">{d.name}</p>
                    <p className="text-xs text-gray-500">{d.facility}</p>
                    <p className="text-xs text-gray-500">{d.specialty}</p>
                    <p className="text-xs text-gray-500">{d.poli}</p>
                  </div>
                </div>
                <p className="text-green text-sm mt-4">Jadwal praktik hari ini</p>
                <p className="text-gray-800 font-medium">{d.time}</p>
                <div className="grid grid-cols-2 gap-3 mt-4">
                  <button className="py-2.5 rounded-xl border border-green text-green text-sm font-semibold hover:bg-green/5 transition-colors">
                    Jadwal
                  </button>
                  <button className="py-2.5 rounded-xl border border-green text-green text-sm font-semibold hover:bg-green/5 transition-colors">
                    Lihat Profil
                  </button>
                </div>
              </div>
            ))}
          </div>
          <Link href="#" className="inline-block mt-4 text-green font-semibold underline">
            Semua Tenaga Medis
          </Link>
        </section>

        {/* Promo Terbaru */}
        <section>
          <SectionTitle>Promo Terbaru</SectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROMOS.map((p, i) => (
              <div key={i} className="w-full max-w-[380px] mx-auto rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.06)] bg-white overflow-hidden flex flex-col">
                <div className="p-3 pb-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/dummy/promo.png"
                    alt={p.title}
                    className="h-44 w-full object-cover rounded-xl"
                  />
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-lg font-semibold text-gray-800">{p.title}</h3>
                  <p className="text-sm text-gray-500 mt-1 mb-4">{p.date}</p>
                  <button className="mt-auto w-full py-3 rounded-xl bg-green text-white font-semibold text-sm hover:bg-greenHover transition-colors">
                    Lihat Promo
                  </button>
                </div>
              </div>
            ))}
          </div>
          <Link href="#" className="inline-block mt-4 text-green font-semibold underline">
            Semua Promo
          </Link>
        </section>

        {/* Fasilitas & Pembayaran */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <SectionTitle>Fasilitas</SectionTitle>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {FASILITAS.map((f, i) => (
                <Pill key={i} icon={f.icon} label={f.label} />
              ))}
            </div>
          </div>
          <div>
            <SectionTitle>Pembayaran</SectionTitle>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {PEMBAYARAN.map((p, i) => (
                <Pill key={i} icon={p.icon} label={p.label} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
