// Umur cache halaman publik.
//
// Sebelumnya semua fetch konten memakai `cache: "no-store"`, yang membuat 72 dari
// 119 route jadi ƒ Dynamic — tiap pengunjung memaksa server menunggu API blog
// merespons sebelum HTML pertama keluar. Di HP itu penalti TTFB yang paling
// terasa. Dengan revalidate, halaman disajikan dari hasil render yang sudah jadi.
//
// PENTING soal Cloudflare Pages (@cloudflare/next-on-pages): route ISR di sana
// diperlakukan sebagai prerendered saat build, tanpa regenerasi di background.
// Artinya artikel baru dari Strapi TIDAK muncul sampai ada deploy ulang.
// Sambungkan webhook Strapi ke Cloudflare Deploy Hook — lihat README bagian
// "Konten baru tidak muncul".
//
// Di runtime Next standar (node/Vercel), angka di bawah bekerja seperti ISR biasa.

export const BLOG_REVALIDATE = 600; // 10 menit — listing & detail artikel
export const SITEMAP_REVALIDATE = 3600; // 1 jam — sitemap tidak perlu real-time
