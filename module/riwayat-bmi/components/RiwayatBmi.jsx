"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { format, subMonths, isAfter, isToday } from "date-fns";
import { id as idLocale } from "date-fns/locale";
import { IconRefresh, IconTrendingUp, IconTrendingDown, IconMinus } from "@tabler/icons-react";

const PERIODS = [
  { key: "all", label: "Semua", months: null },
  { key: "3m", label: "3 Bulan", months: 3 },
  { key: "6m", label: "6 Bulan", months: 6 },
  { key: "1y", label: "1 Tahun", months: 12 },
];

const PAGE_SIZE = 5;

// Colors per BMI category label (best-effort match to the calculator).
const CATEGORY_COLORS = {
  kurus: { light: "bg-blue-100 text-blue-600", solid: "bg-blue-500 text-white" },
  normal: { light: "bg-green-100 text-green", solid: "bg-green text-white" },
  overweight: { light: "bg-orange-100 text-orange-600", solid: "bg-orange-500 text-white" },
  "obesitas i": { light: "bg-red-100 text-red-500", solid: "bg-red-500 text-white" },
  "obesitas ii": { light: "bg-red-100 text-red-700", solid: "bg-red-600 text-white" },
};

const categoryColor = (label, solid) => {
  const key = String(label || "").trim().toLowerCase();
  const c = CATEGORY_COLORS[key] || { light: "bg-gray-100 text-gray-600", solid: "bg-gray-500 text-white" };
  return solid ? c.solid : c.light;
};

// Best-effort extraction of the records array from unknown API response shapes.
const extractRecords = (json) => {
  if (Array.isArray(json)) return json;
  const candidates = [
    json?.data?.rows,
    json?.data?.items,
    json?.data?.data,
    json?.data,
    json?.rows,
    json?.items,
    json?.result,
    json?.results,
  ];
  return candidates.find((c) => Array.isArray(c)) || [];
};

// The API returns English category labels; map them to the calculator's
// Indonesian labels + color scheme.
const CATEGORY_MAP = {
  underweight: "Kurus",
  "healthy weight": "Normal",
  "normal weight": "Normal",
  normal: "Normal",
  overweight: "Overweight",
  obesity: "Obesitas I",
  obese: "Obesitas I",
  "obese class 1": "Obesitas I",
  "obesity class 1": "Obesitas I",
  "obese class 2": "Obesitas II",
  "obesity class 2": "Obesitas II",
};

const displayCategory = (label) => {
  const key = String(label || "").trim().toLowerCase();
  return CATEGORY_MAP[key] || label || "-";
};

const num = (...vals) => {
  for (const v of vals) {
    const n = Number(v);
    if (v !== undefined && v !== null && v !== "" && !Number.isNaN(n)) return n;
  }
  return null;
};

const normalize = (r) => {
  const rawDate = r.created_at || r.createdAt || r.date || r.measured_at || r.measuredAt || r.updated_at || r.updatedAt;
  const parsed = rawDate ? new Date(rawDate) : null;
  return {
    date: parsed && !Number.isNaN(parsed.getTime()) ? parsed : null,
    weight: num(r.weight, r.bb, r.berat),
    height: num(r.height, r.tb, r.tinggi),
    bmi: num(r.bmi),
    category: displayCategory(r.category || r.kategori || r.category_label),
  };
};

export default function RiwayatBmi() {
  const router = useRouter();
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [period, setPeriod] = useState("all");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token) {
      router.replace("/signin");
      return;
    }

    let active = true;
    (async () => {
      try {
        const res = await fetch("/api/bmi/history", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const json = await res.json();

        if (res.status === 401 || /token/i.test(json?.message || "")) {
          localStorage.removeItem("token");
          router.replace("/signin");
          return;
        }
        if (!res.ok) throw new Error(json?.message || "Gagal memuat riwayat.");

        if (!active) return;
        const list = extractRecords(json)
          .map(normalize)
          .filter((r) => r.date && r.bmi !== null)
          .sort((a, b) => b.date - a.date); // newest first
        setRecords(list);
      } catch (e) {
        if (active) setError(e.message || "Terjadi kesalahan.");
      } finally {
        if (active) setLoading(false);
      }
    })();

    return () => {
      active = false;
    };
  }, [router]);

  // Apply period filter.
  const filtered = useMemo(() => {
    const cfg = PERIODS.find((p) => p.key === period);
    if (!cfg?.months) return records;
    const cutoff = subMonths(new Date(), cfg.months);
    return records.filter((r) => isAfter(r.date, cutoff));
  }, [records, period]);

  // Attach chronological trend (BMI delta vs the previous-in-time record).
  const withTrend = useMemo(() => {
    const asc = [...filtered].sort((a, b) => a.date - b.date);
    const deltaByTime = new Map();
    asc.forEach((r, i) => {
      deltaByTime.set(r, i === 0 ? null : Number((r.bmi - asc[i - 1].bmi).toFixed(1)));
    });
    return filtered.map((r) => ({ ...r, delta: deltaByTime.get(r) }));
  }, [filtered]);

  useEffect(() => setPage(1), [period]);

  const totalPages = Math.max(1, Math.ceil(withTrend.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * PAGE_SIZE;
  const pageRows = withTrend.slice(start, start + PAGE_SIZE);

  // Chart: latest BMI per month, last 6 months present in the filtered set.
  const chart = useMemo(() => {
    const byMonth = new Map();
    [...withTrend]
      .sort((a, b) => a.date - b.date)
      .forEach((r) => {
        const key = format(r.date, "yyyy-MM");
        byMonth.set(key, { date: r.date, bmi: r.bmi }); // keep latest of the month
      });
    const months = Array.from(byMonth.values()).slice(-6);
    if (months.length === 0) return [];
    const values = months.map((m) => m.bmi);
    const min = Math.min(...values);
    const max = Math.max(...values);
    return months.map((m, i) => {
      const ratio = max === min ? 0.5 : (m.bmi - min) / (max - min);
      return {
        label: format(m.date, "MMM", { locale: idLocale }),
        bmi: m.bmi,
        height: 40 + ratio * 60, // percentage of chart area
        shade: i / Math.max(1, months.length - 1),
      };
    });
  }, [withTrend]);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-8 py-10">
      <h1 className="text-2xl md:text-3xl font-bold text-green mb-1">Riwayat BMI kamu</h1>
      <p className="text-green/70 mb-6">Pantau perkembangan indeks massa tubuh kamu dari waktu ke waktu.</p>

      {/* Period filter */}
      <div className="flex flex-wrap gap-3 mb-6">
        {PERIODS.map((p) => {
          const active = p.key === period;
          return (
            <button
              key={p.key}
              onClick={() => setPeriod(p.key)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors ${
                active ? "bg-green text-white" : "bg-greenImage/60 text-green hover:bg-greenImage"
              }`}
            >
              {p.label}
            </button>
          );
        })}
      </div>

      {loading ? (
        <div className="py-24 text-center text-gray-400">Memuat riwayat...</div>
      ) : error ? (
        <div className="py-24 text-center text-red-500">{error}</div>
      ) : withTrend.length === 0 ? (
        <div className="rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.06)] bg-white py-20 text-center text-gray-400">
          Belum ada riwayat BMI untuk periode ini.
        </div>
      ) : (
        <>
          {/* Chart */}
          <div className="rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.06)] bg-white p-6 mb-6">
            <div className="flex items-end justify-between gap-3 sm:gap-6 h-56">
              {chart.map((c, i) => (
                <div key={i} className="flex-1 flex flex-col items-center justify-end h-full">
                  <div
                    className="w-full rounded-2xl"
                    style={{
                      height: `${c.height}%`,
                      backgroundColor: "#038F7A",
                      opacity: 0.2 + c.shade * 0.8,
                    }}
                    title={`BMI ${c.bmi.toFixed(2)}`}
                  />
                  <span className="mt-3 text-sm text-gray-500">{c.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.06)] bg-white overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] text-left">
                <thead>
                  <tr className="bg-gray-100 text-gray-600 text-sm">
                    <th className="px-6 py-4 font-semibold">Tanggal</th>
                    <th className="px-6 py-4 font-semibold">BB (kg)</th>
                    <th className="px-6 py-4 font-semibold">TB (cm)</th>
                    <th className="px-6 py-4 font-semibold">BMI</th>
                    <th className="px-6 py-4 font-semibold">Kategori</th>
                    <th className="px-6 py-4 font-semibold text-center">Tren</th>
                  </tr>
                </thead>
                <tbody>
                  {pageRows.map((r, i) => {
                    const isNew = isToday(r.date);
                    return (
                      <tr
                        key={i}
                        className={`border-t border-gray-100 ${isNew ? "bg-greenImage/40" : ""}`}
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-gray-800">
                              {format(r.date, "d MMM yyyy", { locale: idLocale })}
                            </span>
                            {isNew && (
                              <span className="px-2 py-0.5 rounded-md bg-green text-white text-xs font-semibold">
                                Baru
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-800">{r.weight ?? "-"} kg</td>
                        <td className="px-6 py-4 text-gray-800">{r.height ?? "-"} cm</td>
                        <td className="px-6 py-4 text-gray-800">{r.bmi.toFixed(2)}</td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${categoryColor(
                              r.category,
                              isNew
                            )}`}
                          >
                            {r.category}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <TrendCell delta={r.delta} />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          <div className="flex flex-wrap items-center justify-end gap-2 mt-4 text-sm">
            <span className="text-gray-500 mr-2">
              {withTrend.length === 0 ? 0 : start + 1}–{Math.min(start + PAGE_SIZE, withTrend.length)} dari{" "}
              {withTrend.length}
            </span>
            <PageBtn
              disabled={currentPage === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              aria-label="Sebelumnya"
            >
              ‹
            </PageBtn>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <PageBtn key={p} active={p === currentPage} onClick={() => setPage(p)}>
                {p}
              </PageBtn>
            ))}
            <PageBtn
              disabled={currentPage === totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              aria-label="Berikutnya"
            >
              ›
            </PageBtn>
          </div>
        </>
      )}

      <button
        onClick={() => router.push("/alat-kesehatan/kalkulator-bmi")}
        className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white shadow-[0_4px_16px_rgba(0,0,0,0.08)] text-green font-semibold hover:bg-gray-50 transition-colors"
      >
        <IconRefresh size={20} />
        Cek Ulang
      </button>
    </div>
  );
}

function TrendCell({ delta }) {
  if (delta === null || delta === undefined) {
    return <span className="flex items-center justify-center text-gray-400">—</span>;
  }
  if (delta === 0) {
    return (
      <span className="flex items-center justify-center gap-1 text-gray-500">
        <IconMinus size={16} /> ±0
      </span>
    );
  }
  // BMI going down is a positive (green) trend; going up is red.
  const down = delta < 0;
  return (
    <span className={`flex items-center justify-center gap-1 font-medium ${down ? "text-green" : "text-red-500"}`}>
      {down ? <IconTrendingDown size={16} /> : <IconTrendingUp size={16} />}
      {delta > 0 ? `+${delta}` : delta}
    </span>
  );
}

function PageBtn({ children, active, disabled, onClick, ...rest }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`min-w-9 h-9 px-3 rounded-lg border text-sm font-medium transition-colors ${
        active
          ? "bg-green text-white border-green"
          : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
      } ${disabled ? "opacity-40 cursor-not-allowed" : ""}`}
      {...rest}
    >
      {children}
    </button>
  );
}
