"use client";

import { useCallback, useEffect, useState } from "react";
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

// key = nama parameter yang dikirim ke /api/health-facilities/list. Semuanya
// mengirim kode/ID, bukan nama.
//
// Sumber isinya: `url` untuk master yang berdiri sendiri (diambil sekali saat
// mount), `urlFor(parentValue)` untuk yang isinya menyempit mengikuti filter
// lain — Kab/Kota ikut Provinsi, Kecamatan ikut Kab/Kota. Keduanya di-fetch dari
// browser supaya request-nya terlihat di tab Network.
//
// value/label memetakan bentuk respons masing-masing master: wilayah pakai
// code/name, master faskes pakai id/nama. Kode wilayah dikirim apa adanya dalam
// bentuk bertitik seperti di master ("11", "11.11", "11.11.07"); sisi server
// membandingkannya dalam bentuk digit saja.
const FILTERS = [
  {
    key: "provinceCode",
    label: "Provinsi",
    url: "/api/provinces/all",
    value: (r) => r.code,
    label_: (r) => r.name,
  },
  {
    key: "cityCode",
    label: "Kab/Kota",
    parent: "provinceCode",
    urlFor: (provinceCode) =>
      provinceCode
        ? `/api/cities/province/${encodeURIComponent(provinceCode)}`
        : "/api/cities/all",
    value: (r) => r.code,
    label_: (r) => r.name,
  },
  {
    key: "districtCode",
    label: "Kecamatan",
    parent: "cityCode",
    urlFor: (cityCode) =>
      cityCode
        ? `/api/districts/city/${encodeURIComponent(cityCode)}`
        : "/api/districts/all",
    value: (r) => r.code,
    label_: (r) => r.name,
  },
  {
    key: "facilityTypeId",
    label: "Tipe Fasilitas Kesehatan",
    url: "/api/health-facility-types/all",
    value: (r) => String(r.id ?? ""),
    label_: (r) => r.nama,
  },
  {
    key: "facilityCategoryId",
    label: "Jenis Fasilitas Kesehatan",
    url: "/api/health-facility-categories/all",
    value: (r) => String(r.id ?? ""),
    label_: (r) => r.nama,
  },
  {
    key: "facilityOwnershipId",
    label: "Kepemilikan Fasilitas Kesehatan",
    url: "/api/health-facility-ownerships/all",
    value: (r) => String(r.id ?? ""),
    label_: (r) => r.nama,
  },
];

// Satu master -> [{ value, label }], dibersihkan & diurutkan menurut nama.
const toOptions = (rows, f) =>
  (Array.isArray(rows) ? rows : [])
    .filter((r) => r.status == null || String(r.status) === "1")
    .map((r) => ({ value: f.value(r), label: String(f.label_(r) ?? "").trim() }))
    .filter((o) => o.value && o.label)
    .sort((a, b) => a.label.localeCompare(b.label, "id"));

// Dropdown yang isinya bergantung filter lain, beserta induknya.
const DEPENDENT = FILTERS.filter((f) => f.urlFor);

// Mengisi satu dropdown yang sumbernya ikut nilai filter induknya. Dipanggil
// sekali per filter dependen, jadi ganti Provinsi tidak ikut menarik ulang
// daftar Kecamatan yang URL-nya belum berubah.
function useDependentOptions(filter, parentValue, setOptions) {
  useEffect(() => {
    const controller = new AbortController();

    (async () => {
      const put = (list) =>
        setOptions((prev) => ({ ...prev, [filter.key]: list }));
      try {
        const res = await fetch(filter.urlFor(parentValue), {
          signal: controller.signal,
        });
        const json = res.ok ? await res.json() : null;
        if (!controller.signal.aborted) put(toOptions(json?.data ?? json, filter));
      } catch {
        if (!controller.signal.aborted) put([]);
      }
    })();

    return () => controller.abort();
  }, [filter, parentValue, setOptions]);
}

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

export default function FacilitiesClient({ initialData = null }) {
  const [rows, setRows] = useState(initialData?.data ?? []);
  const [total, setTotal] = useState(initialData?.total ?? 0);
  const [totalPages, setTotalPages] = useState(initialData?.totalPages ?? 1);
  const [page, setPage] = useState(initialData?.page ?? 1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [queryInput, setQueryInput] = useState("");
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({});
  const [options, setOptions] = useState({});

  // Mengetik tidak boleh memicu satu request per huruf.
  useEffect(() => {
    const t = setTimeout(() => setQuery(queryInput), 350);
    return () => clearTimeout(t);
  }, [queryInput]);

  // Isi dropdown: master diambil paralel dari browser, sekali saat mount.
  // Kab/Kota dikecualikan — sumbernya ikut Provinsi, ditangani effect di bawah.
  // Satu master gagal tidak boleh mengosongkan yang lain, jadi hasilnya
  // dikumpulkan per filter dan yang gagal cuma jadi daftar kosong.
  useEffect(() => {
    const controller = new AbortController();

    (async () => {
      const entries = await Promise.all(
        FILTERS.filter((f) => f.url).map(async (f) => {
          try {
            const res = await fetch(f.url, { signal: controller.signal });
            if (!res.ok) return [f.key, []];
            const json = await res.json();
            return [f.key, toOptions(json?.data ?? json, f)];
          } catch {
            return [f.key, []];
          }
        })
      );
      if (!controller.signal.aborted) setOptions(Object.fromEntries(entries));
    })();

    return () => controller.abort();
  }, []);

  // Kab/Kota ikut Provinsi, Kecamatan ikut Kab/Kota. Tanpa induk yang dipilih,
  // keduanya memakai master penuh (/cities/all, /districts/all); begitu induknya
  // dipilih, daftarnya diambil ulang per-wilayah dari server.
  useDependentOptions(DEPENDENT[0], filters[DEPENDENT[0].parent], setOptions);
  useDependentOptions(DEPENDENT[1], filters[DEPENDENT[1].parent], setOptions);

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

      const res = await fetch(`/api/health-facilities/list?${params}`, { signal });
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

  // Data server dipakai untuk render awal (SEO), lalu tetap diambil ulang dari
  // /api/health-facilities/list saat mount.
  useEffect(() => {
    const controller = new AbortController();
    load(controller.signal);
    return () => controller.abort();
  }, [load]);

  const optionsFor = (key) => options[key] || [];

  const setFilter = (key) => (e) => {
    const value = e.target.value;
    setPage(1);
    setFilters((prev) => {
      const next = { ...prev, [key]: value };
      if (!value) delete next[key];
      // Ganti induk -> pilihan turunannya bisa jadi tidak relevan lagi.
      if (key === "provinceCode") {
        delete next.cityCode;
        delete next.districtCode;
      }
      if (key === "cityCode") delete next.districtCode;
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
              <option key={opt.value} value={opt.value}>
                {opt.label}
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
