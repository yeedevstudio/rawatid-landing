"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { id as idLocale } from "date-fns/locale";
import { IconChevronLeft, IconChevronRight, IconRefresh } from "@tabler/icons-react";
import { authFetch, clearSession } from "@/common/utils/auth";
import { CONTAINER_CLASS } from "@/common/constant/containerValue";
import { formatKkal, normalizeActivityLevels, num } from "../utils";

// Halaman riwayat Kalkulator TDEE / BMR: filter periode, chart, tabel, paginasi.
//
// metric       : "tdee" | "bmr" — nama field nilai kkal di record & chart
// abbr         : label singkat untuk judul/kolom ("TDEE" | "BMR")
// apiBase      : "/api/tdee" | "/api/bmr" (proxy /history & /history/chart)
// calculatorUrl: halaman kalkulator untuk tombol Cek Ulang
// resultKey    : key localStorage hasil terakhir (dihapus saat Cek Ulang)
// showActivity : tampilkan kolom Aktivitas (hanya TDEE)

// period keys dikirim apa adanya sebagai ?period= (sama seperti riwayat BMI).
const PERIODS = [
  { key: "all", label: "Semua" },
  { key: "3m", label: "3 Bulan" },
  { key: "6m", label: "6 Bulan" },
  { key: "1y", label: "1 Tahun" },
];

const PAGE_SIZE = 5;

const extractRecords = (json) => {
  if (Array.isArray(json)) return json;
  const candidates = [json?.data?.rows, json?.data?.items, json?.data?.data, json?.data, json?.rows, json?.items];
  return candidates.find((c) => Array.isArray(c)) || [];
};

// Bentuk response /history belum bisa dicek (butuh token + data), jadi field
// dibaca dari beberapa kemungkinan nama.
const normalizeRecord = (r, metric, levelsById) => {
  const rawDate = r.createdAt || r.created_at || r.date || r.updatedAt;
  const parsed = rawDate ? new Date(rawDate) : null;
  const levelId = num(r.physicalActivityLevelId, r.physical_activity_level_id);
  const level = r.physicalActivityLevel ?? r.physical_activity_level;
  return {
    id: r.id ?? rawDate,
    date: parsed && !Number.isNaN(parsed.getTime()) ? parsed : null,
    weight: num(r.weight),
    height: num(r.height),
    value: num(r[metric], r[metric.toUpperCase()]),
    activity: level?.name || r.activity_name || r.physical_activity_level_name || levelsById.get(levelId) || "-",
  };
};

const extractChartPoints = (json, metric) => {
  // Bentuk Chart.js: { chart: { labels: [...], datasets: { tdee: [...] } } }
  const chart = json?.data?.chart ?? json?.chart;
  if (chart && Array.isArray(chart.labels)) {
    const values = chart.datasets?.[metric] ?? chart.datasets?.values ?? chart[metric] ?? chart.values ?? chart.data;
    if (Array.isArray(values)) return chart.labels.map((label, i) => ({ label, [metric]: values[i] }));
  }

  const arr = [json?.data?.chart, json?.data?.points, json?.data?.rows, json?.data, json?.chart, json?.points, json].find(
    Array.isArray
  );
  if (arr) return arr;

  const d = json?.data ?? json ?? {};
  const vals = d.values ?? d.data ?? d[metric];
  if (Array.isArray(d.labels) && Array.isArray(vals)) return d.labels.map((label, i) => ({ label, [metric]: vals[i] }));
  return [];
};

const normalizeChartPoint = (p, metric) => {
  const value = num(p?.[metric], p?.value, p?.avg, p?.average, p?.y);
  const rawDate = p?.date || p?.createdAt || p?.day || p?.month || p?.period || p?.x;
  const parsed = rawDate ? new Date(rawDate) : null;
  const date = parsed && !Number.isNaN(parsed.getTime()) ? parsed : null;
  const label = p?.label || (date ? format(date, "d MMM", { locale: idLocale }) : rawDate ? String(rawDate) : "");
  return { value, date, label };
};

// Jarak garis bantu sumbu Y yang "bulat" untuk rentang nilai kkal.
const niceStep = (range) => [100, 200, 250, 500, 1000].find((s) => s >= range / 2) ?? 1000;

export default function RiwayatKalori({ metric, abbr, apiBase, calculatorUrl, resultKey, showActivity = false }) {
  const router = useRouter();
  const [records, setRecords] = useState([]);
  const [chartPoints, setChartPoints] = useState([]);
  const [levelsById, setLevelsById] = useState(() => new Map());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [period, setPeriod] = useState("all");
  const [page, setPage] = useState(1);
  const [dataVersion, setDataVersion] = useState(0);

  // Nama tingkat aktivitas untuk kolom "Aktivitas" kalau record hanya membawa id.
  useEffect(() => {
    if (!showActivity) return;
    let active = true;
    fetch("/api/tdee/physical-activity-levels")
      .then((res) => (res.ok ? res.json() : null))
      .then((json) => {
        if (active && json) setLevelsById(new Map(normalizeActivityLevels(json).map((a) => [a.id, a.label])));
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, [showActivity]);

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
        // Ambil semua halaman untuk periode ini supaya tabel & paginasi
        // bekerja di atas data lengkap (pola yang sama dengan riwayat BMI).
        let all = [];
        let apiPage = 1;
        let totalPages = 1;
        do {
          const res = await authFetch(`${apiBase}/history?period=${period}&page=${apiPage}`, { cache: "no-store" });
          const json = await res.json();

          if (res.status === 401 || /token/i.test(json?.message || "")) {
            clearSession();
            router.replace("/signin");
            return;
          }
          if (!res.ok) throw new Error(json?.message || "Gagal memuat riwayat.");

          all = all.concat(extractRecords(json));
          totalPages = Number(json?.data?.totalPages ?? json?.totalPages) || 1;
          apiPage += 1;
        } while (apiPage <= totalPages && apiPage <= 50);

        if (!active) return;
        const seen = new Set();
        const rows = all.filter((r) => {
          const key = r?.id ?? JSON.stringify(r);
          if (seen.has(key)) return false;
          seen.add(key);
          return true;
        });
        setRecords(rows);
        setDataVersion((v) => v + 1);
      } catch (e) {
        if (active) setError(e.message || "Terjadi kesalahan.");
      } finally {
        if (active) setLoading(false);
      }
    })();

    return () => {
      active = false;
    };
  }, [router, period, apiBase]);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const res = await authFetch(`${apiBase}/history/chart?period=${period}`, { cache: "no-store" });
        if (!res.ok) {
          if (active) setChartPoints([]);
          return;
        }
        const json = await res.json();
        const pts = extractChartPoints(json, metric)
          .map((p) => normalizeChartPoint(p, metric))
          .filter((p) => p.value !== null);
        if (!active) return;
        setChartPoints(pts);
        setDataVersion((v) => v + 1);
      } catch {
        if (active) setChartPoints([]);
      }
    })();
    return () => {
      active = false;
    };
  }, [period, apiBase, metric]);

  useEffect(() => setPage(1), [period]);

  const list = useMemo(
    () =>
      records
        .map((r) => normalizeRecord(r, metric, levelsById))
        .filter((r) => r.date && r.value !== null)
        .sort((a, b) => b.date - a.date),
    [records, metric, levelsById]
  );

  const isInitial = loading && list.length === 0;
  const refreshing = loading && list.length > 0;

  const totalPages = Math.max(1, Math.ceil(list.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * PAGE_SIZE;
  const pageRows = list.slice(start, start + PAGE_SIZE);

  // Titik chart urut kronologis. Sumber utama endpoint chart; kalau kosong,
  // pakai data tabel.
  const chart = useMemo(() => {
    let pts = chartPoints;
    if (!pts.length) {
      pts = [...list].reverse().map((r) => ({
        value: r.value,
        date: r.date,
        label: format(r.date, "d MMM", { locale: idLocale }),
      }));
    }
    if (!pts.length) return null;

    const asc = pts.every((p) => p.date) ? [...pts].sort((a, b) => a.date - b.date) : pts;
    const values = asc.map((p) => p.value);
    const dataMin = Math.min(...values);
    const dataMax = Math.max(...values);
    const step = niceStep(dataMax - dataMin);
    let yMin = Math.floor(dataMin / step) * step;
    let yMax = Math.ceil(dataMax / step) * step;
    // Minimal tiga garis bantu (seperti mockup) walau nilainya berdekatan.
    while ((yMax - yMin) / step < 2) yMin -= step;
    const span = yMax - yMin;

    const gridlines = [];
    for (let g = yMax; g >= yMin; g -= step) gridlines.push(g);

    const insetX = 6;
    const xPct = (i) => (asc.length === 1 ? 50 : insetX + (i * (100 - insetX * 2)) / (asc.length - 1));
    const yPct = (v) => 10 + ((yMax - v) / span) * 80;

    const points = asc.map((p, i) => ({
      x: xPct(i),
      y: yPct(p.value),
      value: p.value,
      label: p.label || (p.date ? format(p.date, "d MMM", { locale: idLocale }) : ""),
      isNewest: i === asc.length - 1,
    }));

    return {
      points,
      gridlines: gridlines.map((g) => ({ value: g, y: yPct(g) })),
      polyline: points.map((p) => `${p.x},${p.y}`).join(" "),
    };
  }, [chartPoints, list]);

  return (
    <div className={`${CONTAINER_CLASS} pt-10 md:pt-14 pb-16`}>
      <h1 className="text-xl md:text-2xl font-semibold text-green">Riwayat {abbr} kamu</h1>
      <p className="mt-2 text-base md:text-lg text-green">Pantau perkembangan {abbr} kamu dari waktu ke waktu.</p>

      <div className="flex flex-wrap gap-3 md:gap-5 mt-5 mb-6">
        {PERIODS.map((p) => {
          const isActive = p.key === period;
          return (
            <button
              key={p.key}
              type="button"
              onClick={() => setPeriod(p.key)}
              className={`px-2.5 py-0.5 rounded-full text-base md:text-lg transition-colors ${
                isActive ? "bg-green text-white" : "bg-greenImage/60 text-green hover:bg-greenImage"
              }`}
            >
              {p.label}
            </button>
          );
        })}
      </div>

      {isInitial ? (
        <div className="py-24 text-center text-gray-400">Memuat riwayat...</div>
      ) : error && list.length === 0 ? (
        <div className="py-24 text-center text-red-500">{error}</div>
      ) : list.length === 0 ? (
        <div className="rounded-xl border border-gray-200 bg-white py-20 text-center text-gray-400">
          Belum ada riwayat {abbr} untuk periode ini.
        </div>
      ) : (
        <div className={`transition-opacity duration-300 ${refreshing ? "opacity-50 pointer-events-none" : ""}`}>
          {/* Chart */}
          <div className="rounded-xl border border-gray-200 bg-white px-4 md:px-10 py-8 mb-6">
            <div key={dataVersion} className="flex">
              <div className="relative w-12 h-56 shrink-0">
                {chart?.gridlines.map((g) => (
                  <span
                    key={g.value}
                    className="absolute right-3 -translate-y-1/2 text-sm text-gray-700"
                    style={{ top: `${g.y}%` }}
                  >
                    {g.value}
                  </span>
                ))}
              </div>

              <div className="flex-1 overflow-x-auto pb-2">
                <div className="relative min-w-full" style={{ width: `max(100%, ${(chart?.points.length || 1) * 110}px)` }}>
                  <div className="relative h-56">
                    {chart?.gridlines.map((g) => (
                      <div
                        key={g.value}
                        className="absolute left-0 right-0 border-t border-dashed border-gray-200"
                        style={{ top: `${g.y}%` }}
                      />
                    ))}

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

                    {chart?.points.map((p, i) => {
                      const delay = `${0.25 + i * 0.08}s`;
                      return (
                        <div key={i}>
                          {p.isNewest ? (
                            <span
                              className="bmi-fade absolute whitespace-nowrap text-sm text-green"
                              style={{ left: `${p.x}%`, top: `${p.y}%`, transform: "translate(-50%, -170%)", animationDelay: delay }}
                            >
                              {formatKkal(p.value)}
                            </span>
                          ) : null}
                          <span
                            className="bmi-point absolute w-2.5 h-2.5 rounded-full bg-green"
                            style={{ left: `${p.x}%`, top: `${p.y}%`, transform: "translate(-50%, -50%)", animationDelay: delay }}
                          />
                        </div>
                      );
                    })}
                  </div>

                  <div className="relative h-6 mt-6">
                    {chart?.points.map((p, i) => (
                      <span
                        key={i}
                        className="bmi-fade absolute -translate-x-1/2 whitespace-nowrap text-sm text-gray-700"
                        style={{ left: `${p.x}%`, animationDelay: `${0.25 + i * 0.08}s` }}
                      >
                        {p.label}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabel */}
          <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] text-left">
                <thead>
                  <tr className="bg-gray-100 text-gray-800 text-base md:text-lg">
                    <th className="px-6 py-4 font-normal">Tanggal</th>
                    <th className="px-6 py-4 font-normal">BB (kg)</th>
                    <th className="px-6 py-4 font-normal">TB (cm)</th>
                    {showActivity ? <th className="px-6 py-4 font-normal">Aktivitas</th> : null}
                    <th className="px-6 py-4 font-normal">{abbr}</th>
                    <th className="px-6 py-4 font-normal">
                      <span className="sr-only">Keterangan</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {pageRows.map((r, i) => {
                    const isNewest = start + i === 0;
                    return (
                      <tr key={r.id ?? i} className="border-t border-gray-100 text-base md:text-lg">
                        <td className="px-6 py-4 font-medium text-green">
                          {format(r.date, "d MMM yyyy", { locale: idLocale })}
                        </td>
                        <td className="px-6 py-4 text-gray-800">{r.weight ?? "-"} kg</td>
                        <td className="px-6 py-4 text-gray-800">{r.height ?? "-"} cm</td>
                        {showActivity ? <td className="px-6 py-4 text-gray-800">{r.activity}</td> : null}
                        <td className="px-6 py-4 text-gray-800">{formatKkal(r.value)} kkal</td>
                        <td className="px-6 py-4 text-center">
                          {isNewest ? (
                            <span className="px-2 py-0.5 rounded-full bg-green text-white text-sm">Terbaru</span>
                          ) : null}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Paginasi */}
          <div className="flex flex-wrap items-center justify-end gap-2 mt-4 text-base md:text-lg">
            <span className="text-gray-700 mr-4">
              {start + 1}–{Math.min(start + PAGE_SIZE, list.length)} dari {list.length}
            </span>
            <PageBtn disabled={currentPage === 1} onClick={() => setPage((p) => Math.max(1, p - 1))} aria-label="Sebelumnya">
              <IconChevronLeft size={16} />
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
              <IconChevronRight size={16} />
            </PageBtn>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => {
          // Hapus hasil tersimpan supaya kalkulator terbuka di form, bukan hasil lama.
          localStorage.removeItem(resultKey);
          router.push(calculatorUrl);
        }}
        className="mt-10 inline-flex items-center gap-2 h-12 px-8 rounded-md border border-green text-green hover:bg-green/5 transition-colors"
      >
        <IconRefresh size={18} />
        Cek Ulang
      </button>
    </div>
  );
}

function PageBtn({ children, active, disabled, onClick, ...rest }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center justify-center min-w-8 h-8 px-2 rounded-md border transition-colors ${
        active ? "bg-green text-white border-green" : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
      } ${disabled ? "opacity-40 cursor-not-allowed" : ""}`}
      {...rest}
    >
      {children}
    </button>
  );
}
