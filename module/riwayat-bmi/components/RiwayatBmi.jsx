"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { format, isToday } from "date-fns";
import { id as idLocale } from "date-fns/locale";
import { IconRefresh, IconTrendingUp, IconTrendingDown, IconMinus } from "@tabler/icons-react";

// period keys map 1:1 to the API's ?period= values.
const PERIODS = [
  { key: "all", label: "Semua" },
  { key: "3m", label: "3 Bulan" },
  { key: "6m", label: "6 Bulan" },
  { key: "1y", label: "1 Tahun" },
];

const PAGE_SIZE = 5;

// The API returns English category labels; map them to Indonesian + colors.
const CATEGORY_COLORS = {
  kurus: { light: "bg-blue-100 text-blue-600", solid: "bg-blue-500 text-white" },
  normal: { light: "bg-green-100 text-green", solid: "bg-green text-white" },
  overweight: { light: "bg-orange-100 text-orange-600", solid: "bg-orange-500 text-white" },
  "obesitas i": { light: "bg-red-100 text-red-500", solid: "bg-red-500 text-white" },
  "obesitas ii": { light: "bg-red-100 text-red-700", solid: "bg-red-600 text-white" },
};

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

const categoryColor = (label, solid) => {
  const key = String(label || "").trim().toLowerCase();
  const mapped = (CATEGORY_MAP[key] || label || "").toLowerCase();
  const c = CATEGORY_COLORS[mapped] || { light: "bg-gray-100 text-gray-600", solid: "bg-gray-500 text-white" };
  return solid ? c.solid : c.light;
};

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

const num = (...vals) => {
  for (const v of vals) {
    const n = Number(v);
    if (v !== undefined && v !== null && v !== "" && !Number.isNaN(n)) return n;
  }
  return null;
};

const normalize = (r) => {
  const rawDate = r.createdAt || r.created_at || r.date || r.measured_at || r.updatedAt;
  const parsed = rawDate ? new Date(rawDate) : null;
  return {
    date: parsed && !Number.isNaN(parsed.getTime()) ? parsed : null,
    weight: num(r.weight, r.bb, r.berat),
    height: num(r.height, r.tb, r.tinggi),
    bmi: num(r.bmi),
    category: displayCategory(r.category || r.kategori || r.category_label),
    trend: r.trend
      ? { change: num(r.trend.change) ?? 0, direction: r.trend.direction || "stable" }
      : null,
  };
};

export default function RiwayatBmi() {
  const router = useRouter();
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [period, setPeriod] = useState("all");
  const [page, setPage] = useState(1);
  const [dataVersion, setDataVersion] = useState(0);

  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token) {
      router.replace("/signin");
      return;
    }

    let active = true;
    setLoading(true);
    setError("");
    (async () => {
      try {
        const res = await fetch(`/api/bmi/history?period=${period}`, {
          cache: "no-store",
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
        setDataVersion((v) => v + 1); // replay chart animation on fresh data
      } catch (e) {
        if (active) setError(e.message || "Terjadi kesalahan.");
      } finally {
        if (active) setLoading(false);
      }
    })();

    return () => {
      active = false;
    };
  }, [router, period]);

  useEffect(() => setPage(1), [period]);

  // Only blank the page on the very first load; on filter changes we keep the
  // previous data visible (dimmed) so sections don't disappear.
  const isInitial = loading && records.length === 0;
  const refreshing = loading && records.length > 0;

  const totalPages = Math.max(1, Math.ceil(records.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * PAGE_SIZE;
  const pageRows = records.slice(start, start + PAGE_SIZE);

  // Line-chart points in chronological order (oldest → newest).
  const chart = useMemo(() => {
    const asc = [...records].sort((a, b) => a.date - b.date);
    if (asc.length === 0) return null;

    const values = asc.map((r) => r.bmi);
    const dataMin = Math.min(...values);
    const dataMax = Math.max(...values);
    const yMin = Math.floor(dataMin - 0.3);
    const yMax = Math.ceil(dataMax + 0.3);
    const span = yMax - yMin || 1;

    const gridlines = [];
    for (let g = yMin; g <= yMax; g += 1) gridlines.push(g);

    // left inset clears the y-axis label gutter; right inset keeps the last
    // point's value label from overflowing the card.
    const insetLeft = 12;
    const insetRight = 5;
    const usableX = 100 - insetLeft - insetRight;
    const xPct = (i) => (asc.length === 1 ? 50 : insetLeft + (i * usableX) / (asc.length - 1));
    // map bmi to a % from the top; keep 15% headroom top & bottom for labels
    const yPct = (bmi) => 15 + ((yMax - bmi) / span) * 70;

    const maxIndex = values.indexOf(dataMax);
    const newestIndex = asc.length - 1;

    const points = asc.map((r, i) => ({
      x: xPct(i),
      y: yPct(r.bmi),
      bmi: r.bmi,
      label: format(r.date, "d MMM", { locale: idLocale }),
      isMax: i === maxIndex,
      isNewest: i === newestIndex,
    }));

    return {
      points,
      gridlines: gridlines.map((g) => ({ value: g, y: yPct(g) })),
      polyline: points.map((p) => `${p.x},${p.y}`).join(" "),
    };
  }, [records]);

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

      {isInitial ? (
        <div className="py-24 text-center text-gray-400">Memuat riwayat...</div>
      ) : error && records.length === 0 ? (
        <div className="py-24 text-center text-red-500">{error}</div>
      ) : records.length === 0 ? (
        <div className="rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.06)] bg-white py-20 text-center text-gray-400">
          Belum ada riwayat BMI untuk periode ini.
        </div>
      ) : (
        <div className={`transition-opacity duration-300 ${refreshing ? "opacity-50 pointer-events-none" : "opacity-100"}`}>
          {/* Line chart */}
          <div className="rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.06)] bg-white p-6 mb-6">
            <div key={dataVersion} className="relative w-full h-72">
              {/* gridlines + y-axis labels (labels kept inside a fixed left gutter) */}
              {chart?.gridlines.map((g) => (
                <div key={g.value}>
                  <span
                    className="absolute left-0 w-9 -translate-y-1/2 pr-2 text-right text-sm text-gray-500"
                    style={{ top: `${g.y}%` }}
                  >
                    {g.value}
                  </span>
                  <div
                    className="absolute right-0 border-t border-dashed border-gray-200"
                    style={{ top: `${g.y}%`, left: "2.75rem" }}
                  />
                </div>
              ))}

              {/* connecting line */}
              <svg
                className="absolute inset-0 w-full h-full overflow-visible"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                <polyline
                  className="bmi-line"
                  points={chart?.polyline}
                  fill="none"
                  stroke="#038F7A"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>

              {/* dots + value labels */}
              {chart?.points.map((p, i) => {
                const color = p.isMax ? "#EF4444" : "#038F7A";
                const labelColor = p.isMax ? "text-red-500" : p.isNewest ? "text-green" : "text-gray-700";
                const delay = `${0.25 + i * 0.08}s`;
                return (
                  <div key={i}>
                    <span
                      className={`bmi-fade absolute -translate-x-1/2 text-sm font-semibold ${labelColor}`}
                      style={{
                        left: `${p.x}%`,
                        top: `${p.y}%`,
                        transform: "translate(-50%, -190%)",
                        animationDelay: delay,
                      }}
                    >
                      {p.bmi.toFixed(2)}
                    </span>
                    <span
                      className="bmi-point absolute w-3 h-3 rounded-full border-2 border-white"
                      style={{
                        left: `${p.x}%`,
                        top: `${p.y}%`,
                        backgroundColor: color,
                        transform: "translate(-50%, -50%)",
                        animationDelay: delay,
                      }}
                    />
                    <span
                      className="bmi-fade absolute -translate-x-1/2 text-sm text-gray-600 whitespace-nowrap"
                      style={{ left: `${p.x}%`, top: "100%", transform: "translate(-50%, 8px)", animationDelay: delay }}
                    >
                      {p.label}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="h-8" />
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
                      <tr key={i} className={`border-t border-gray-100 ${isNew ? "bg-greenImage/40" : ""}`}>
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
                          <TrendCell trend={r.trend} />
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
              {records.length === 0 ? 0 : start + 1}–{Math.min(start + PAGE_SIZE, records.length)} dari{" "}
              {records.length}
            </span>
            <PageBtn disabled={currentPage === 1} onClick={() => setPage((p) => Math.max(1, p - 1))} aria-label="Sebelumnya">
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
        </div>
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

function TrendCell({ trend }) {
  if (!trend || trend.direction === "stable") {
    return (
      <span className="flex items-center justify-center gap-1 text-gray-500">
        <IconMinus size={16} /> ±0
      </span>
    );
  }
  // BMI going down is a positive (green) trend; going up is red.
  const down = trend.direction === "down";
  const value = Number(trend.change);
  return (
    <span className={`flex items-center justify-center gap-1 font-medium ${down ? "text-green" : "text-red-500"}`}>
      {down ? <IconTrendingDown size={16} /> : <IconTrendingUp size={16} />}
      {value > 0 ? `+${value}` : value}
    </span>
  );
}

function PageBtn({ children, active, disabled, onClick, ...rest }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`min-w-9 h-9 px-3 rounded-lg border text-sm font-medium transition-colors ${
        active ? "bg-green text-white border-green" : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
      } ${disabled ? "opacity-40 cursor-not-allowed" : ""}`}
      {...rest}
    >
      {children}
    </button>
  );
}
