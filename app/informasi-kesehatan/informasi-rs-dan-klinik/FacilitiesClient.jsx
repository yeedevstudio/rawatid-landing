"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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

const PAGE_SIZE = 10;

const FILTERS = [
  { key: "province", label: "Provinsi" },
  { key: "city", label: "Kab/Kota" },
  { key: "type", label: "Tipe Fasilitas Kesehatan" },
  { key: "category", label: "Jenis Fasilitas Kesehatan" },
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

export default function FacilitiesClient({ initialData = null, options = null }) {
  const [rows, setRows] = useState(initialData?.data ?? []);
  const [total, setTotal] = useState(initialData?.total ?? 0);
  const [totalPages, setTotalPages] = useState(initialData?.totalPages ?? 1);
  const [page, setPage] = useState(initialData?.page ?? 1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [queryInput, setQueryInput] = useState("");
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({});

  // Halaman pertama sudah dirender server — jangan fetch ulang saat mount.
  const skipInitialFetch = useRef(Boolean(initialData));

  // Mengetik tidak boleh memicu satu request per huruf.
  useEffect(() => {
    const t = setTimeout(() => setQuery(queryInput), 350);
    return () => clearTimeout(t);
  }, [queryInput]);

  const load = useCallback(async (signal) => {
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams({
        page: String(page),
        perPage: String(PAGE_SIZE),
        search: query,
      });
      for (const { key } of FILTERS) if (filters[key]) params.set(key, filters[key]);

      const res = await fetch(`/api/health-facilities/public/list?${params}`, { signal });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.message || "Gagal memuat data fasilitas.");

      setRows(json.data || []);
      setTotal(json.total || 0);
      setTotalPages(json.totalPages || 1);
    } catch (e) {
      if (e?.name !== "AbortError") setError(e?.message || "Terjadi kesalahan.");
    } finally {
      setLoading(false);
    }
  }, [page, query, filters]);

  useEffect(() => {
    if (skipInitialFetch.current) {
      skipInitialFetch.current = false;
      return;
    }
    const controller = new AbortController();
    load(controller.signal);
    return () => controller.abort();
  }, [load]);

  // Pilihan Kab/Kota mengikuti Provinsi yang sedang dipilih.
  const cityOptions = useMemo(() => {
    if (!options) return [];
    const p = filters.province;
    if (p && options.citiesByProvince?.[p]) return options.citiesByProvince[p];
    return options.city || [];
  }, [options, filters.province]);

  const optionsFor = (key) => (key === "city" ? cityOptions : options?.[key] || []);

  const setFilter = (key) => (e) => {
    const value = e.target.value;
    setPage(1);
    setFilters((prev) => {
      const next = { ...prev, [key]: value };
      if (!value) delete next[key];
      // Ganti provinsi -> kota lama bisa jadi tidak relevan lagi.
      if (key === "province") delete next.city;
      return next;
    });
  };

  const start = (page - 1) * PAGE_SIZE;

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
          value={queryInput}
          onChange={(e) => {
            setQueryInput(e.target.value);
            setPage(1);
          }}
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
            {optionsFor(f.key).map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        ))}
      </div>

      {/* List */}
      {error ? (
        <div className="py-24 text-center text-red-500">{error}</div>
      ) : rows.length === 0 ? (
        <div className="py-20 text-center text-gray-400">
          {loading ? "Memuat fasilitas..." : "Tidak ada fasilitas yang cocok."}
        </div>
      ) : (
        <>
          <div className={`flex flex-col gap-5 transition-opacity ${loading ? "opacity-50" : ""}`}>
            {rows.map((f) => (
              <Link
                key={f.id}
                href={`/informasi-kesehatan/informasi-rs-dan-klinik/${f.id}`}
                className="rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.05)] bg-white p-4 md:p-5 flex flex-col sm:flex-row gap-4 md:gap-6 hover:shadow-[0_6px_28px_rgba(0,0,0,0.10)] transition-shadow"
              >
                <div className="relative w-full sm:w-48 h-40 sm:h-32 shrink-0 rounded-xl overflow-hidden bg-gray-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={f.image || "/dummy/hospital.webp"}
                    alt={f.name}
                    loading="lazy"
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
              {start + 1}-{Math.min(start + PAGE_SIZE, total)} of {total}
            </span>
            <PageBtn
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              aria-label="Sebelumnya"
            >
              <IconChevronLeft size={16} />
            </PageBtn>
            {buildPageList(page, totalPages).map((p) => (
              <PageBtn key={p} active={p === page} onClick={() => setPage(p)}>
                {p}
              </PageBtn>
            ))}
            <PageBtn
              disabled={page === totalPages}
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
  const end = Math.min(total, start + 4);
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
