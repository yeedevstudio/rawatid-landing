This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

## Caching & performa

Halaman publik tidak lagi memakai `cache: "no-store"`. Umur cache diatur di
[`common/constant/revalidate.js`](common/constant/revalidate.js):

| Konten | Revalidate |
|---|---|
| Listing & detail artikel blog, artikel di beranda | 10 menit |
| Sitemap | 1 jam |
| Obat, menu diet, faskes | 1 jam |

Artikel baru dari Strapi muncul sendiri setelah jendela revalidate lewat —
tidak perlu deploy ulang, tidak perlu webhook. ISR berjalan normal karena situs
ini dilayani **Vercel** (Cloudflare hanya proxy DNS/CDN di depannya; cek dengan
`curl -I https://www.rawat.id` → header `x-vercel-cache` / `x-vercel-id`).

### Konfigurasi Cloudflare yang sudah tidak terpakai

`wrangler.toml`, script `pages:build` / `preview` / `deploy`, dan dependensi
`@cloudflare/next-on-pages` **bukan jalur deploy yang dipakai**. `npm run
pages:build` sendiri sudah gagal sejak sebelum perubahan performa ini
(diverifikasi pada commit `587aa58`: 78 route ditolak karena tidak
mendeklarasikan `export const runtime = 'edge'`).

Pilih salah satu, jangan dibiarkan menggantung:

- **Tetap di Vercel** (kondisi sekarang) → hapus `wrangler.toml`, ketiga script
  di atas, dan dependensi `@cloudflare/next-on-pages`.
- **Pindah ke Cloudflare** → jalur `next-on-pages` harus diperbaiki dulu
  (tambahkan `export const runtime = 'edge'` ke semua route non-statis), dan
  perlu diperiksa ulang: di sana ISR tidak beregenerasi di background, serta
  cache faskes di `lib/healthFacilities.js` perlu diuji terhadap batas
  memori/CPU Worker.

### Catatan aset

- Seluruh gambar di `public/` sudah WebP dan diperkecil ke ukuran tampilan
  wajar. Sebelum menambah gambar baru, kompres dulu — hindari menyimpan PNG/JPG
  mentah atau "SVG" yang isinya raster base64.
- `images.unoptimized: true` di `next.config.mjs` dipasang untuk Cloudflare.
  Karena sebenarnya jalan di Vercel, opsi ini bisa dimatikan agar gambar remote
  (thumbnail artikel dari Strapi) ikut dioptimalkan — perhatikan kuota image
  transformation Vercel sebelum mengubahnya.

### Data faskes

`/health-facilities/public/all` mengirim 11,7 MB dan tidak punya paginasi, jadi
diproses di server ([`lib/healthFacilities.js`](lib/healthFacilities.js)) dan
ditahan di memori proses. Ukuran itu melebihi batas 2 MB Data Cache Next —
warning `items over 2MB can not be cached` saat build memang diharapkan.
Solusi sebenarnya: minta backend menyediakan endpoint faskes dengan paginasi +
filter, lalu hapus cache manual tersebut.
