// Helper normalisasi data obat & kategori, dipakai server component
// (getDrugCategories.js) maupun komponen client.
//
// PAGE_SIZE wajib tinggal di modul ini, bukan di InformasiObatClient.jsx:
// mengimpor nilai biasa dari modul "use client" ke server component tidak
// menghasilkan angkanya, melainkan client reference — akibatnya perPage terkirim
// tidak valid dan API balik ke default 10 item.

export const PAGE_SIZE = 40;

export function toSlug(text) {
  return String(text || "")
    .trim()
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

export function normalizeDrugRows(json) {
  const raw = Array.isArray(json) ? json : json?.data ?? [];
  const items = (Array.isArray(raw) ? raw : []).map((row, idx) => {
    const name =
      row?.name ??
      row?.ingredientName ??
      row?.ingredient_name ??
      row?.title ??
      "";
    const id = row?.id ?? row?._id ?? `${name}-${idx}`;
    const apiSlug = row?.slug ?? row?.Slug ?? null;
    const ing_code =
      row?.ing_code ??
      row?.ingCode ??
      row?.ingredient_code ??
      row?.ingredientCode ??
      row?.code ??
      row?.Code ??
      null;
    return {
      id: String(id),
      name: String(name),
      slug: String(apiSlug || toSlug(name) || id),
      ing_code: ing_code ? String(ing_code) : "",
      raw: row,
    };
  });

  return {
    items,
    totalItems: Number(json?.total) || 0,
    totalPages: Number(json?.totalPages) || 1,
  };
}

export const CATEGORY_PAGE_SIZE = 12;

// Obat bisa dikelompokkan per kategori atau per golongan. Keduanya punya bentuk
// API yang sama ({ id, code, name, description, tags, ... }), jadi halaman
// daftar & halaman detailnya memakai komponen yang sama dengan konfigurasi ini.
export const DRUG_GROUPS = {
  kategori: {
    label: "Kategori",
    apiPath: "drug-categories",
    filterParam: "drug_category_code",
    href: "/informasi-kesehatan/informasi-obat/kategori",
  },
  golongan: {
    label: "Golongan",
    apiPath: "drug-classes",
    filterParam: "drug_class_code",
    href: "/informasi-kesehatan/informasi-obat/golongan",
  },
};

// Tags kategori: terima array (string / { name }) atau string dipisah koma/baris.
function toTagList(value) {
  const arr = Array.isArray(value) ? value : String(value ?? "").split(/[\n,]/);
  const names = arr.map((t) => String((t && typeof t === "object" ? t.name : t) ?? "").trim());
  return Array.from(new Set(names.filter(Boolean)));
}

// Referensi kategori: terima array (string URL / { title, url }). Kalau API
// mengirim HTML seperti field `referenced` pada obat, dikembalikan lewat
// referencesHtml.
function toReferenceList(value) {
  if (!Array.isArray(value)) return [];
  return value
    .map((r) => {
      const isObj = r && typeof r === "object";
      const url = String((isObj ? r.url ?? r.link ?? r.href : r) ?? "").trim();
      const label = String((isObj ? r.title ?? r.name ?? r.label : "") || url).trim();
      return { url, label };
    })
    .filter((r) => r.url);
}

// /drug-categories/public/all mengembalikan semua kategori sekaligus (tanpa paginasi)
// dengan bentuk { id, code, name }. Slug diturunkan dari nama karena API tidak
// menyediakan slug; nama kategori saat ini unik sehingga slug-nya juga unik.
//
// description, tags & references belum dikirim API; sudah disiapkan supaya
// deskripsi, section Tags, dan Referensi di halaman kategori langsung tampil
// begitu backend menambahkannya.
export function normalizeCategories(json) {
  const raw = Array.isArray(json) ? json : json?.data ?? [];
  return (Array.isArray(raw) ? raw : [])
    .map((row) => {
      const name = String(row?.name ?? "").trim();
      const code = String(row?.code ?? "").trim();
      const refs = row?.references ?? row?.referenced;
      return {
        id: String(row?.id ?? code),
        code,
        name,
        slug: toSlug(name),
        description: String(row?.description ?? "").trim(),
        tags: toTagList(row?.tags),
        references: toReferenceList(refs),
        referencesHtml: typeof refs === "string" ? refs.trim() : "",
      };
    })
    .filter((c) => c.code && c.name && c.slug);
}
