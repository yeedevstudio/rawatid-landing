// Query Strapi untuk halaman yang cuma menampilkan daftar/kartu artikel.
//
// Sebelumnya semua listing memakai `populate=*`, yang ikut menarik body artikel
// lengkap: 1.031 KB untuk 78 post, 72% di antaranya field `content` yang tidak
// pernah dirender di listing (cuma dipakai module/blog/detail/BlogDetail.jsx).
// Payload itu juga ikut dikirim ulang ke browser sebagai RSC flight data, jadi
// ongkosnya kena dua kali.
//
// Versi ramping di bawah = 175 KB untuk 78 post yang sama (-83%), dengan semua
// field yang benar-benar dipakai kartu artikel tetap ada: id, documentId,
// title, slug, headline, updatedAt, publishedAt, featured, thumbnail (beserta
// formats small/medium/thumbnail), dan category.
//
// Untuk halaman detail satu artikel tetap pakai populate=* — di sana content,
// tags, dan author memang dibutuhkan.
export const POST_LIST_QUERY = [
  "fields[0]=title",
  "fields[1]=slug",
  "fields[2]=headline",
  "fields[3]=updatedAt",
  "fields[4]=publishedAt",
  "fields[5]=featured",
  "populate[thumbnail]=true",
  "populate[category]=true",
].join("&");
