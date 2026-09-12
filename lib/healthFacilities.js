import { CM_API_BASE } from "@/common/constant/api";

// Lapisan data faskes — HANYA dijalankan di server.
//
// /health-facilities/all mengembalikan 12.766 baris = 8,8 MB dan tidak
// punya paginasi. Sebelumnya browser yang mengunduh itu semua hanya untuk
// menampilkan 10 kartu per halaman. Sekarang server yang menanggungnya (sekali
// per jendela revalidate, bukan per pengunjung), lalu mengirim ke HP cuma baris
// yang benar-benar dipakai.
//
// Sekalian: nama Provinsi & Kabupaten/Kota di-resolve di sini dari master
// wilayah, jadi kedua filter itu akhirnya terisi — selama ini kosong karena API
// faskes cuma mengirim kode/ID tanpa nama. Hal yang sama untuk Tipe, Jenis, dan
// Kepemilikan: namanya diambil dari /health-facility-types|categories|ownerships
// /all, dan filternya memakai ID (facilityTypeId / facilityCategoryId /
// facilityOwnershipId) — bukan lagi string nama hasil dummy.

const FACILITIES_REVALIDATE = 3600; // 1 jam
const FACILITIES_TTL_MS = FACILITIES_REVALIDATE * 1000;
const WILAYAH_REVALIDATE = 86400; // 1 hari
const MASTER_REVALIDATE = 86400; // 1 hari

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
const digits = (v) => String(v ?? "").replace(/\D/g, "");

// Kode wilayah pada data faskes: 2.517 baris memakai districtCode 0 untuk
// "tidak diketahui", jadi nol diperlakukan sama dengan kosong.
const code = (v) => {
  const d = digits(v);
  return d && Number(d) !== 0 ? d : "";
};

const dotted = (v) => {
  const d = digits(v);
  return d.length === 4 ? `${d.slice(0, 2)}.${d.slice(2)}` : d;
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

// Master Tipe / Jenis / Kepemilikan faskes. Responsnya berbentuk
// { data: [{ id, kode, nama, status }] } — perhatikan field-nya "nama", bukan
// "name" seperti master wilayah. Kunci di objek ini sengaja memakai nama
// parameter yang dikirim ke API (facilityTypeId dkk) supaya satu key dipakai
// dari dropdown sampai query string tanpa pemetaan tambahan.
const MASTER_ENDPOINTS = {
  facilityTypeId: "/health-facility-types/all",
  facilityCategoryId: "/health-facility-categories/all",
  facilityOwnershipId: "/health-facility-ownerships/all",
};

// Tiga filter yang dicocokkan lewat ID master; wilayah dicocokkan lewat
// provinceCode/cityCode (lihat FILTER_KEYS).
const ID_FILTER_KEYS = Object.keys(MASTER_ENDPOINTS);

const masterOptions = async (path) => {
  const json = await getJson(path, MASTER_REVALIDATE);
  const rows = Array.isArray(json?.data) ? json.data : [];
  return rows
    .filter((r) => r.status == null || String(r.status) === "1")
    .map((r) => ({ value: str(r.id), label: nameOf(r.nama, r.name, r.label) }))
    .filter((o) => o.value && o.label)
    .sort((a, b) => a.label.localeCompare(b.label, "id"));
};

// { facilityTypeId: [{value,label}], ... } — dipakai untuk isi dropdown sekaligus
// sebagai kamus ID -> nama saat memetakan baris faskes.
async function loadMasters() {
  const entries = await Promise.all(
    ID_FILTER_KEYS.map(async (key) => [key, await masterOptions(MASTER_ENDPOINTS[key])])
  );
  return Object.fromEntries(entries);
}

const labelMaps = (masters) =>
  Object.fromEntries(
    ID_FILTER_KEYS.map((key) => [
      key,
      new Map((masters[key] || []).map((o) => [o.value, o.label])),
    ])
  );

const labelOf = (maps, key, id) => maps[key].get(str(id)) || "";

// Respons /health-facilities/all berukuran 11,7 MB — di atas batas 2 MB
// Data Cache Next, jadi write ke Data Cache ditolak (build memunculkan warning
// "items over 2MB can not be cached"). revalidate-nya tetap dipasang supaya
// halaman ini masih bisa diperlakukan statis/ISR, dan hasil olahannya ditahan
// di memori proses dengan TTL sendiri. Efeknya: paginasi & filter tidak menarik
// ulang 11,7 MB tiap request.
//
// Ini penambal, bukan solusi akhir: yang benar adalah backend menyediakan
// endpoint faskes yang mendukung paginasi + filter.
let cache = { rows: null, masters: null, at: 0, inflight: null };

async function fetchAll() {
  const [facilitiesJson, provincesJson, citiesJson, masters] = await Promise.all([
    getJson("/health-facilities/all", FACILITIES_REVALIDATE),
    getJson("/provinces/all", WILAYAH_REVALIDATE),
    getJson("/cities/all", WILAYAH_REVALIDATE),
    loadMasters(),
  ]);

  const raw = Array.isArray(facilitiesJson?.data) ? facilitiesJson.data : [];
  const provinces = indexBy(Array.isArray(provincesJson?.data) ? provincesJson.data : []);
  const cities = indexBy(Array.isArray(citiesJson?.data) ? citiesJson.data : []);
  const maps = labelMaps(masters);

  const rows = raw
    .map((r) => {
      const province = nameOf(r.province, r.provinceName) || lookup(provinces, r.provinceCode, r.provinceId);
      const city = nameOf(r.city, r.cityName) || lookup(cities, r.cityCode, r.cityId);
      const street = str(r.addressCode || r.address);

      return {
        id: r.id ?? r.code ?? r.slug,
        name: str(r.name),
        // Kode/ID mentah ikut dikirim: itu yang dicocokkan saat filter, sedangkan
        // field nama di bawahnya cuma untuk ditampilkan di kartu.
        provinceCode: code(r.provinceCode),
        cityCode: code(r.cityCode),
        districtCode: code(r.districtCode),
        facilityTypeId: str(r.facilityTypeId),
        facilityCategoryId: str(r.facilityCategoryId),
        facilityOwnershipId: str(r.facilityOwnershipId),
        type: nameOf(r.facilityType, r.type) || labelOf(maps, "facilityTypeId", r.facilityTypeId),
        category: nameOf(r.facilityCategory, r.category) || labelOf(maps, "facilityCategoryId", r.facilityCategoryId),
        ownership: nameOf(r.facilityOwnership, r.ownership) || labelOf(maps, "facilityOwnershipId", r.facilityOwnershipId),
        province,
        city,
        address: [street, city, province].filter(Boolean).join(", "),
        image: str(r.image || r.imageUrl || r.photo || r.thumbnail || r.logo),
      };
    })
    .filter((f) => f.name);

  return { rows, masters };
}

async function loadAll() {
  const now = Date.now();
  if (cache.rows && now - cache.at < FACILITIES_TTL_MS) {
    return { rows: cache.rows, masters: cache.masters };
  }
  // Beberapa request bersamaan saat cache dingin cukup menunggu satu fetch.
  if (!cache.inflight) {
    cache.inflight = fetchAll()
      .then((result) => {
        cache = { ...result, at: Date.now(), inflight: null };
        return result;
      })
      .catch((e) => {
        cache.inflight = null;
        // pakai data lama daripada gagal
        if (cache.rows) {
          return { rows: cache.rows, masters: cache.masters };
        }
        throw e;
      });
  }
  return cache.inflight;
}

// Melengkapi satu record faskes dengan nama Tipe / Jenis / Kepemilikan dari
// master. Dipakai halaman detail (server) dan /api/health-facilities/[id].
export async function withFacilityMasterNames(facility) {
  if (!facility) return facility;
  const maps = labelMaps(await loadMasters());
  return {
    ...facility,
    facilityTypeName: labelOf(maps, "facilityTypeId", facility.facilityTypeId),
    facilityCategoryName: labelOf(maps, "facilityCategoryId", facility.facilityCategoryId),
    facilityOwnershipName: labelOf(maps, "facilityOwnershipId", facility.facilityOwnershipId),
  };
}

// Detail tetap memakai varian /public/: /health-facilities/{id} membalas 401
// (namespace non-public butuh auth), sedangkan /health-facilities/all —
// yang dipakai daftar di atas — masih terbuka tanpa token.
//
// Detail satu faskes, dipakai halaman [id] agar tidak perlu fetch dari browser.
// Endpoint detail upstream cuma mengirim ID tanpa nama relasi, jadi nama
// Provinsi & Kabupaten/Kota — plus Tipe/Jenis/Kepemilikan — di-resolve di sini
// seperti pada daftar.
export async function getFacilityById(id) {
  const target = String(id ?? "").trim();
  if (!target) return null;

  const [detailJson, provincesJson, citiesJson, masters] = await Promise.all([
    getJson(`/health-facilities/public/${encodeURIComponent(target)}`, FACILITIES_REVALIDATE),
    getJson("/provinces/all", WILAYAH_REVALIDATE),
    getJson("/cities/all", WILAYAH_REVALIDATE),
    loadMasters(),
  ]);

  const d = detailJson?.data || detailJson;
  if (!d || !d.id) return null;

  const provinces = indexBy(Array.isArray(provincesJson?.data) ? provincesJson.data : []);
  const cities = indexBy(Array.isArray(citiesJson?.data) ? citiesJson.data : []);
  const maps = labelMaps(masters);

  return {
    ...d,
    provinceName: lookup(provinces, d.provinceCode, d.provinceId),
    cityName: lookup(cities, d.cityCode, d.cityId),
    facilityTypeName: labelOf(maps, "facilityTypeId", d.facilityTypeId),
    facilityCategoryName: labelOf(maps, "facilityCategoryId", d.facilityCategoryId),
    facilityOwnershipName: labelOf(maps, "facilityOwnershipId", d.facilityOwnershipId),
  };
}

// Nama key = nama parameter query yang dikirim client ke
// /api/health-facilities/list. Semuanya berbasis kode/ID, bukan nama.
const WILAYAH_CODE_KEYS = ["provinceCode", "cityCode", "districtCode"];

export const FILTER_KEYS = [...WILAYAH_CODE_KEYS, ...ID_FILTER_KEYS];

// Kode wilayah dibandingkan dalam bentuk digit saja, supaya parameter boleh
// datang bertitik seperti kode master ("11.11", "11.11.07") maupun tanpa titik
// seperti yang tersimpan di data faskes ("1111").
const normalizers = Object.fromEntries(
  FILTER_KEYS.map((k) => [k, WILAYAH_CODE_KEYS.includes(k) ? digits : str])
);

export async function getFacilities({
  page = 1,
  perPage = PAGE_SIZE,
  search = "",
  filters = {},
} = {}) {
  const { rows: all } = await loadAll();

  const q = String(search || "").trim().toLowerCase();
  const active = FILTER_KEYS.filter((k) => str(filters[k]))
    .map((k) => [k, normalizers[k](filters[k])]);

  const matched = all.filter((f) => {
    if (q && !f.name.toLowerCase().includes(q)) return false;
    return active.every(([k, value]) => normalizers[k](f[k]) === value);
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
  };
}
