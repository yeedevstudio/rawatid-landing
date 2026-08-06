// Dipakai bersama oleh page.jsx (server, untuk render awal) dan
// InformasiObatClient.jsx (client, saat user ganti halaman/cari/filter huruf),
// supaya bentuk datanya persis sama dan tidak ada kedip saat hydrate.
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
