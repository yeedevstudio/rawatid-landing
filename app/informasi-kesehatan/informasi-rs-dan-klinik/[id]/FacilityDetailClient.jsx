"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Breadcrumbs from "@/common/components/Breadcrumbs";
import SafeEmail from "@/common/components/SafeEmail";
import { DUMMY_TYPE, DUMMY_CATEGORY, DUMMY_OWNERSHIP, dummyOf } from "@/common/constant/facility";

const EMPTY = "-";

const str = (v) => (v == null ? "" : String(v)).trim();


const plain = (html) =>
  str(html)
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const buildInfo = (d) => {
  if (!d) return [];
  const seed = Number(d.id) || 0;
  return [
    ["Tipe Fasilitas Kesehatan", dummyOf(DUMMY_TYPE, d.facilityTypeId, seed)],
    ["Kategori Fasilitas Kesehatan", dummyOf(DUMMY_CATEGORY, d.facilityCategoryId, seed)],
    ["Kepemilikan Fasilitas Kesehatan", dummyOf(DUMMY_OWNERSHIP, d.facilityOwnershipId, seed)],
    ["Provinsi", str(d.provinceName)],
    ["Kabupaten/Kota", str(d.cityName)],
    ["Kecamatan", str(d.districtName)],
    ["Kelurahan/Desa", str(d.villageName)],
    ["Alamat", str(d.addressCode || d.address)],
    ["Kode Pos", str(d.postalCode)],
    ["Telepon", str(d.telephone)],
    ["Email", str(d.email)],
    ["Fax", str(d.fax)],
    ["Website", str(d.website)],
    ["Referensi", plain(d.referenced)],
  ].map(([label, value]) => [label, value && value !== "-" ? value : EMPTY]);
};

function SectionTitle({ children }) {
  return <h2 className="text-xl md:text-2xl font-bold text-green mb-5">{children}</h2>;
}

function InfoValue({ label, value }) {
  if (value === EMPTY) return <span className="text-gray-400">{EMPTY}</span>;
  if (label === "Website") {
    const href = /^https?:\/\//i.test(value) ? value : `https://${value}`;
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="text-green underline break-all">
        {value}
      </a>
    );
  }
  if (label === "Email") {
    const at = value.lastIndexOf("@");
    if (at <= 0) return <span className="break-all">{value}</span>;
    return (
      <SafeEmail
        user={value.slice(0, at)}
        domain={value.slice(at + 1)}
        className="text-green underline break-all"
      />
    );
  }
  if (label === "Telepon") {
    return (
      <a href={`tel:${value.replace(/[^\d+]/g, "")}`} className="text-green underline">
        {value}
      </a>
    );
  }
  return <span>{value}</span>;
}

export default function FacilityDetailClient({ id, initialData = null }) {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(!initialData);
  const [error, setError] = useState("");

  // Server sudah menyiapkan datanya.
  const skipInitialFetch = useRef(Boolean(initialData));

  useEffect(() => {
    if (skipInitialFetch.current) {
      skipInitialFetch.current = false;
      return;
    }

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
  const info = useMemo(() => buildInfo(data), [data]);

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
          src={data?.image || "/dummy/hospital.webp"}
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
        {/* Informasi Fasilitas Kesehatan */}
        <section>
          <SectionTitle>Informasi Fasilitas Kesehatan</SectionTitle>
          <dl className="flex flex-col">
            {info.map(([label, value]) => (
              <div
                key={label}
                className="grid grid-cols-1 sm:grid-cols-[280px_1fr] gap-x-6 gap-y-1 py-3 border-b border-gray-100 last:border-b-0"
              >
                <dt className="text-sm md:text-base text-gray-500">{label}</dt>
                <dd className="text-sm md:text-base text-gray-800 break-words">
                  <InfoValue label={label} value={value} />
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Tentang */}
        <section>
          <SectionTitle>Tentang Rumah Sakit &amp; Klinik {name}</SectionTitle>
          <p className="text-gray-600 leading-relaxed">
            {data?.description ||
              "Belum ada deskripsi untuk fasilitas kesehatan ini."}
          </p>
        </section>
      </main>
    </div>
  );
}
