import { CM_API_BASE } from "@/common/constant/api";
import {
  DUMMY_TYPE,
  DUMMY_CATEGORY,
  DUMMY_OWNERSHIP,
  dummyOf,
} from "@/common/constant/facility";

// Lapisan data faskes — HANYA dijalankan di server.
//
// /health-facilities/public/all mengembalikan 12.766 baris = 8,8 MB dan tidak
// punya paginasi. Sebelumnya browser yang mengunduh itu semua hanya untuk
// menampilkan 10 kartu per halaman. Sekarang server yang menanggungnya (sekali
// per jendela revalidate, bukan per pengunjung), lalu mengirim ke HP cuma baris
// yang benar-benar dipakai.
//
// Sekalian: nama Provinsi & Kabupaten/Kota di-resolve di sini dari master
// wilayah, jadi kedua filter itu akhirnya terisi — selama ini kosong karena API
// faskes cuma mengirim kode/ID tanpa nama.

const FACILITIES_REVALIDATE = 3600; // 1 jam
const FACILITIES_TTL_MS = FACILITIES_REVALIDATE * 1000;
const WILAYAH_REVALIDATE = 86400; // 1 hari

export const PAGE_SIZE = 10;

const str = (v) => (v == null ? "" : String(v)).trim();

const nameOf = (...cands) => {
  for (const c of cands) {
    if (!c) continue;
    if (typeof c === "string" && c.trim()) return c.trim();
    if (typeof c === "object" && (c.name || c.label)) return str(c.name || c.label);
  }
  return "";
};

// Faskes menyimpan provinceCode "73" dan cityCode "7315"; master wilayah pakai
// "73" dan "73.15". Kecamatan sengaja tidak diikutkan: districtCode memakai
// penomoran BPS 7 digit yang tidak sepadan dengan kode Kemendagri di master.
const dotted = (code) => {
  const digits = String(code ?? "").replace(/\D/g, "");
  return digits.length === 4 ? `${digits.slice(0, 2)}.${digits.slice(2)}` : digits;
};

const getJson = async (path, revalidate) => {
  try {
    const res = await fetch(`${CM_API_BASE}${path}`, {
      headers: { "Content-Type": "application/json" },
      next: { revalidate },
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
};

const indexBy = (rows) => {
  const byCode = new Map();
  const byId = new Map();
  for (const r of rows) {
    const c = dotted(r.code);
    if (c) byCode.set(c, r.name);
    if (r.id != null) byId.set(String(r.id), r.name);
  }
  return { byCode, byId };
};

const lookup = (idx, code, id) =>
  idx.byCode.get(dotted(code)) || idx.byId.get(String(id ?? "")) || "";

// Respons /health-facilities/public/all berukuran 11,7 MB — di atas batas 2 MB
// Data Cache Next, jadi write ke Data Cache ditolak (build memunculkan warning
// "items over 2MB can not be cached"). revalidate-nya tetap dipasang supaya
// halaman ini masih bisa diperlakukan statis/ISR, dan hasil olahannya ditahan
// di memori proses dengan TTL sendiri. Efeknya: paginasi & filter tidak menarik
// ulang 11,7 MB tiap request.
//
// Ini penambal, bukan solusi akhir: yang benar adalah backend menyediakan
// endpoint faskes yang mendukung paginasi + filter.
let cache = { rows: null, at: 0, inflight: null };

async function fetchAll() {
  const [facilitiesJson, provincesJson, citiesJson] = await Promise.all([
    getJson("/health-facilities/public/all", FACILITIES_REVALIDATE),
    getJson("/provinces/all", WILAYAH_REVALIDATE),
    getJson("/cities/all", WILAYAH_REVALIDATE),
  ]);

  const raw = Array.isArray(facilitiesJson?.data) ? facilitiesJson.data : [];
  const provinces = indexBy(Array.isArray(provincesJson?.data) ? provincesJson.data : []);
  const cities = indexBy(Array.isArray(citiesJson?.data) ? citiesJson.data : []);

  return raw
    .map((r) => {
      const seed = Number(r.id) || 0;
      const province = nameOf(r.province, r.provinceName) || lookup(provinces, r.provinceCode, r.provinceId);
      const city = nameOf(r.city, r.cityName) || lookup(cities, r.cityCode, r.cityId);
      const street = str(r.addressCode || r.address);

      return {
        id: r.id ?? r.code ?? r.slug,
        name: str(r.name),
        type: nameOf(r.facilityType, r.type) || dummyOf(DUMMY_TYPE, r.facilityTypeId, seed),
        category: nameOf(r.facilityCategory, r.category) || dummyOf(DUMMY_CATEGORY, r.facilityCategoryId, seed),
        ownership: nameOf(r.facilityOwnership, r.ownership) || dummyOf(DUMMY_OWNERSHIP, r.facilityOwnershipId, seed),
        province,
        city,
        address: [street, city, province].filter(Boolean).join(", "),
        image: str(r.image || r.imageUrl || r.photo || r.thumbnail || r.logo),
      };
    })
    .filter((f) => f.name);
}

async function loadAll() {
  const now = Date.now();
  if (cache.rows && now - cache.at < FACILITIES_TTL_MS) return cache.rows;
  // Beberapa request bersamaan saat cache dingin cukup menunggu satu fetch.
  if (!cache.inflight) {
    cache.inflight = fetchAll()
      .then((rows) => {
        cache = { rows, at: Date.now(), inflight: null };
        return rows;
      })
      .catch((e) => {
        cache.inflight = null;
        if (cache.rows) return cache.rows; // pakai data lama daripada gagal
        throw e;
      });
  }
  return cache.inflight;
}

// Detail satu faskes, dipakai halaman [id] agar tidak perlu fetch dari browser.
// Endpoint detail upstream cuma mengirim ID tanpa nama relasi, jadi nama
// Provinsi & Kabupaten/Kota di-resolve di sini seperti pada daftar.
export async function getFacilityById(id) {
  const target = String(id ?? "").trim();
  if (!target) return null;

  const [detailJson, provincesJson, citiesJson] = await Promise.all([
    getJson(`/health-facilities/public/${encodeURIComponent(target)}`, FACILITIES_REVALIDATE),
    getJson("/provinces/all", WILAYAH_REVALIDATE),
    getJson("/cities/all", WILAYAH_REVALIDATE),
  ]);

  const d = detailJson?.data || detailJson;
  if (!d || !d.id) return null;

  const provinces = indexBy(Array.isArray(provincesJson?.data) ? provincesJson.data : []);
  const cities = indexBy(Array.isArray(citiesJson?.data) ? citiesJson.data : []);

  return {
    ...d,
    provinceName: lookup(provinces, d.provinceCode, d.provinceId),
    cityName: lookup(cities, d.cityCode, d.cityId),
  };
}

export const FILTER_KEYS = ["province", "city", "type", "category", "ownership"];

// Dikirim sekali saat render awal; dropdown tidak perlu seluruh dataset lagi.
// citiesByProvince dipakai client untuk mempersempit pilihan Kab/Kota begitu
// Provinsi dipilih.
function buildOptions(rows) {
  const sets = { province: new Set(), city: new Set(), type: new Set(), category: new Set(), ownership: new Set() };
  const cityMap = new Map();

  for (const r of rows) {
    for (const k of FILTER_KEYS) if (r[k]) sets[k].add(r[k]);
    if (r.province && r.city) {
      if (!cityMap.has(r.province)) cityMap.set(r.province, new Set());
      cityMap.get(r.province).add(r.city);
    }
  }

  return {
    province: [...sets.province].sort(),
    city: [...sets.city].sort(),
    type: [...sets.type].sort(),
    category: [...sets.category].sort(),
    ownership: [...sets.ownership].sort(),
    citiesByProvince: Object.fromEntries(
      [...cityMap].map(([p, s]) => [p, [...s].sort()])
    ),
  };
}

export async function getFacilities({
  page = 1,
  perPage = PAGE_SIZE,
  search = "",
  filters = {},
  withOptions = false,
} = {}) {
  const all = await loadAll();

  const q = String(search || "").trim().toLowerCase();
  const active = FILTER_KEYS.filter((k) => filters[k]);

  const matched = all.filter((f) => {
    if (q && !f.name.toLowerCase().includes(q)) return false;
    return active.every((k) => f[k] === filters[k]);
  });

  const total = matched.length;
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const current = Math.min(Math.max(1, Number(page) || 1), totalPages);
  const start = (current - 1) * perPage;

  return {
    data: matched.slice(start, start + perPage),
    page: current,
    perPage,
    total,
    totalPages,
    ...(withOptions ? { options: buildOptions(all) } : {}),
  };
}
