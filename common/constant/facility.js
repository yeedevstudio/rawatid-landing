// ─── DUMMY SEMENTARA ────────────────────────────────────────────────────────
// API health-facilities hanya mengirim facilityTypeId / facilityCategoryId /
// facilityOwnershipId tanpa nama relasinya, dan backend belum punya endpoint
// master untuk kategori & kepemilikan (cek Swagger: hanya /facility-types/all
// yang ada, dan isinya tidak cocok dengan ID di tabel health_facilities).
// Peta di bawah ini placeholder supaya card, filter, dan halaman detail tidak
// kosong. ID-nya juga null di sebagian besar record, jadi kalau tidak ketemu
// kita pilih salah satu opsi secara deterministik dari id faskes.
// Hapus file ini + pemakaian dummyOf() begitu API sudah mengembalikan
// facilityType / facilityCategory / facilityOwnership.

export const DUMMY_TYPE = { 1: "Tipe A", 2: "Tipe B", 3: "Tipe C", 4: "Tipe D" };

export const DUMMY_CATEGORY = { 1: "Puskesmas", 2: "Rumah Sakit" };

export const DUMMY_OWNERSHIP = {
  1: "Pemerintah Kabupaten/Kota",
  2: "Kementerian Kesehatan",
  3: "Pemerintah Provinsi",
  4: "Pemerintah Daerah",
  5: "TNI Angkatan Darat",
  6: "TNI Angkatan Laut",
  7: "TNI Angkatan Udara",
  8: "Swasta/BUMN",
  9: "Yayasan",
  10: "Organisasi Keagamaan",
  11: "Perorangan",
};

export const dummyOf = (map, id, seed) => {
  const direct = map[id];
  if (direct) return direct;
  const opts = Object.values(map);
  return opts[Math.abs(Number(seed) || 0) % opts.length];
};
