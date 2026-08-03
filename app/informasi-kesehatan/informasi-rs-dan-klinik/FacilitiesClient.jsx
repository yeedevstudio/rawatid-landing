"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  IconSearch,
  IconBuildingHospital,
  IconCategory,
  IconUsers,
  IconMapPin,
  IconChevronLeft,
  IconChevronRight,
} from "@tabler/icons-react";
import { DUMMY_TYPE, DUMMY_CATEGORY, DUMMY_OWNERSHIP, dummyOf } from "@/common/constant/facility";

const PAGE_SIZE = 10;

const str = (v) => (v == null ? "" : String(v)).trim();

// Read a nested name defensively (obj.name / plain string / label).
const nameOf = (...cands) => {
  for (const c of cands) {
    if (!c) continue;
    if (typeof c === "string" && c.trim()) return c.trim();
    if (typeof c === "object" && (c.name || c.label)) return str(c.name || c.label);
  }
  return "";
};

// The API only guarantees IDs; if prod joins in relations/labels/images we use
// them, otherwise we fall back gracefully.
const normalize = (r) => {
  const provinceName = nameOf(r.province, r.provinceName);
  const cityName = nameOf(r.city, r.cityName);
  const districtName = nameOf(r.district, r.districtName);
  const villageName = nameOf(r.village, r.villageName);
  const street = str(r.addressCode || r.address);
  const seed = Number(r.id) || 0;

  const addressParts = [street, villageName, districtName && `Kec. ${districtName}`, cityName, provinceName]
    .map(str)
    .filter(Boolean);

  return {
    id: r.id ?? r.code ?? r.slug,
    name: str(r.name),
    slug: str(r.slug),
    type:
      nameOf(r.facilityType, r.type, r.facilityTypeName) ||
      dummyOf(DUMMY_TYPE, r.facilityTypeId, seed),
    ownership:
      nameOf(r.facilityOwnership, r.ownership, r.facilityOwnershipName) ||
      dummyOf(DUMMY_OWNERSHIP, r.facilityOwnershipId, seed),
    category:
      nameOf(r.facilityCategory, r.category, r.facilityCategoryName) ||
      dummyOf(DUMMY_CATEGORY, r.facilityCategoryId, seed),
    province: provinceName,
    city: cityName,
    district: districtName,
    address: addressParts.join(", "),
    image: str(r.image || r.imageUrl || r.photo || r.thumbnail || r.logo),
  };
};

const FILTERS = [
  { key: "province", label: "Provinsi" },
  { key: "city", label: "Kab/Kota" },
  { key: "district", label: "Kecamatan" },
  { key: "type", label: "Tipe Faskes" },
  { key: "category", label: "Jenis Faskes" },
  { key: "ownership", label: "Kepemilikan Fasilitas Kesehatan" },
];

function InfoRow({ icon: Icon, label, children }) {
  if (!children) return null;
  return (
    <div className="flex items-start gap-2 text-gray-600">
      <Icon size={20} className="text-green shrink-0 mt-0.5" />
      <span className="text-sm md:text-base">
        {label && <span className="text-gray-400">{label}: </span>}
        {children}
      </span>
    </div>
  );
}

export default function FacilitiesClient() {
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({});
  const [page, setPage] = useState(1);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const res = await fetch("/api/health-facilities/public/all", { cache: "no-store" });
        const json = await res.json();
        if (!res.ok) throw new Error(json?.message || "Gagal memuat data fasilitas.");
        const rows = Array.isArray(json?.data) ? json.data : Array.isArray(json) ? json : [];
        if (active) setFacilities(rows.map(normalize).filter((f) => f.name));
      } catch (e) {
        if (active) setError(e.message || "Terjadi kesalahan.");
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  // Build dropdown options from the distinct values present in the data.
  const options = useMemo(() => {
    const acc = Object.fromEntries(FILTERS.map((f) => [f.key, new Set()]));
    facilities.forEach((f) => FILTERS.forEach(({ key }) => f[key] && acc[key].add(f[key])));
    return Object.fromEntries(FILTERS.map((f) => [f.key, [...acc[f.key]].sort()]));
  }, [facilities]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return facilities.filter((f) => {
      if (q && !f.name.toLowerCase().includes(q)) return false;
      return FILTERS.every(({ key }) => !filters[key] || f[key] === filters[key]);
    });
  }, [facilities, query, filters]);

  useEffect(() => setPage(1), [query, filters]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * PAGE_SIZE;
  const pageRows = filtered.slice(start, start + PAGE_SIZE);

  const setFilter = (key) => (e) => {
    const value = e.target.value;
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-green">Informasi Rumah Sakit &amp; Klinik</h1>
        <p className="text-green/80 mt-1 text-sm md:text-base">
          Cari dan temukan fasilitas kesehatan di wilayah Anda
        </p>
      </div>

      {/* Search */}
      <div className="flex items-stretch rounded-xl border border-gray-200 overflow-hidden mb-4">
        <div className="flex items-center justify-center w-12 bg-green text-white shrink-0">
          <IconSearch size={20} />
        </div>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cari nama rumah sakit atau klinik"
          className="flex-1 px-4 py-3 text-sm md:text-base outline-none"
        />
      </div>

      {/* Filters */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
        {FILTERS.map((f) => (
          <select
            key={f.key}
            value={filters[f.key] || ""}
            onChange={setFilter(f.key)}
            className="px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-600 outline-none focus:border-green bg-white"
          >
            <option value="">{f.label}</option>
            {options[f.key].map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        ))}
      </div>

      {/* List */}
      {loading ? (
        <div className="py-24 text-center text-gray-400">Memuat fasilitas...</div>
      ) : error ? (
        <div className="py-24 text-center text-red-500">{error}</div>
      ) : filtered.length === 0 ? (
        <div className="py-20 text-center text-gray-400">Tidak ada fasilitas yang cocok.</div>
      ) : (
        <>
          <div className="flex flex-col gap-5">
            {pageRows.map((f) => (
              <Link
                key={f.id}
                href={`/informasi-kesehatan/informasi-rs-dan-klinik/${f.id}`}
                className="rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.05)] bg-white p-4 md:p-5 flex flex-col sm:flex-row gap-4 md:gap-6 hover:shadow-[0_6px_28px_rgba(0,0,0,0.10)] transition-shadow"
              >
                <div className="relative w-full sm:w-48 h-40 sm:h-32 shrink-0 rounded-xl overflow-hidden bg-gray-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={f.image || "/dummy/hospital.png"}
                    alt={f.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-lg md:text-2xl font-bold text-gray-800 mb-2">{f.name}</h2>
                  <div className="flex flex-col gap-1.5">
                    <InfoRow icon={IconBuildingHospital} label="Tipe Fasilitas Kesehatan">
                      {f.type}
                    </InfoRow>
                    <InfoRow icon={IconCategory} label="Jenis Fasilitas Kesehatan">
                      {f.category}
                    </InfoRow>
                    <InfoRow icon={IconUsers} label="Kepemilikan Fasilitas Kesehatan">
                      {f.ownership}
                    </InfoRow>
                    <InfoRow icon={IconMapPin}>{f.address}</InfoRow>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8 text-sm">
            <span className="text-gray-500 mr-3">
              {start + 1}-{Math.min(start + PAGE_SIZE, filtered.length)} of {filtered.length}
            </span>
            <PageBtn
              disabled={currentPage === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              aria-label="Sebelumnya"
            >
              <IconChevronLeft size={16} />
            </PageBtn>
            {buildPageList(currentPage, totalPages).map((p, i) =>
              p === "..." ? (
                <span key={`e${i}`} className="px-2 text-gray-400">
                  …
                </span>
              ) : (
                <PageBtn key={p} active={p === currentPage} onClick={() => setPage(p)}>
                  {p}
                </PageBtn>
              )
            )}
            <PageBtn
              disabled={currentPage === totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              aria-label="Berikutnya"
            >
              <IconChevronRight size={16} />
            </PageBtn>
          </div>
        </>
      )}
    </div>
  );
}

// Show up to 5 page numbers around the current page.
function buildPageList(current, total) {
  if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1);
  let start = Math.max(1, current - 2);
  let end = Math.min(total, start + 4);
  start = Math.max(1, end - 4);
  const pages = [];
  for (let i = start; i <= end; i++) pages.push(i);
  return pages;
}

function PageBtn({ children, active, disabled, onClick, ...rest }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`min-w-9 h-9 px-3 rounded-lg border text-sm font-medium transition-colors flex items-center justify-center ${
        active ? "bg-green text-white border-green" : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
      } ${disabled ? "opacity-40 cursor-not-allowed" : ""}`}
      {...rest}
    >
      {children}
    </button>
  );
}
