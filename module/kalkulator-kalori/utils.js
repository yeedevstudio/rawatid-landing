// Helper bersama Kalkulator TDEE & BMR (form, hasil, dan riwayat).

export const num = (...vals) => {
  for (const v of vals) {
    const n = Number(v);
    if (v !== undefined && v !== null && v !== "" && !Number.isNaN(n)) return n;
  }
  return null;
};

// 1515.4 -> "1.515" (pemisah ribuan Indonesia, tanpa desimal).
export const formatKkal = (value) =>
  Number(value).toLocaleString("id-ID", { maximumFractionDigits: 0 });

// Petakan berbagai representasi gender di profil ke nilai sex API.
export const toSex = (g) => {
  const v = String(g ?? "").trim().toLowerCase();
  if (["1", "male", "laki-laki", "l", "pria"].includes(v)) return "male";
  if (["2", "female", "perempuan", "p", "wanita"].includes(v)) return "female";
  return "";
};

// Usia dalam tahun penuh dari tanggal lahir profil.
export const toAge = (birthDate) => {
  const d = new Date(birthDate);
  if (Number.isNaN(d.getTime())) return null;
  const now = new Date();
  let age = now.getFullYear() - d.getFullYear();
  if (now.getMonth() < d.getMonth() || (now.getMonth() === d.getMonth() && now.getDate() < d.getDate())) age -= 1;
  return age > 0 ? age : null;
};

export const getErrorMessage = (json, fallback) => {
  if (json?.message) return json.message;
  if (Array.isArray(json?.errors) && json.errors.length > 0) {
    return json.errors.map((e) => e.message ?? e).join(", ");
  }
  return fallback;
};

// Field tubuh (jenis kelamin, berat, tinggi, usia) sudah terisi dengan benar.
export const isBodyComplete = ({ sex, beratBadan, tinggiBadan, usia }) =>
  Boolean(sex) &&
  Number(beratBadan) > 0 &&
  Number(tinggiBadan) > 0 &&
  Number.isInteger(Number(usia)) &&
  Number(usia) > 0;

export const toBodyPayload = ({ sex, beratBadan, tinggiBadan, usia }) => ({
  age: Number(usia),
  sex,
  weight: parseFloat(beratBadan),
  height: parseFloat(tinggiBadan),
});

// Opsi Tingkat Aktivitas dari /tdee/physical-activity-levels. Bentuk item dari
// API belum final (datanya masih kosong), jadi field dibaca dari beberapa
// kemungkinan nama. `id` dipakai sebagai physicalActivityLevelId saat hitung.
export function normalizeActivityLevels(json) {
  const raw = Array.isArray(json) ? json : json?.data ?? [];
  return (Array.isArray(raw) ? raw : [])
    .map((row) => ({
      id: num(row?.id, row?.physicalActivityLevelId),
      label: String(row?.name ?? row?.label ?? row?.title ?? "").trim(),
      palValue: num(row?.pal_value, row?.palValue, row?.value, row?.multiplier, row?.factor),
    }))
    .filter((a) => a.id !== null && a.label);
}
