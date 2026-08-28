import Link from "next/link";

export const metadata = {
  title: "Sistem Faskes Panduan Penggunaan RME Rawat ID - Memberikan Solusi dan Informasi Terbaik untuk Merawat Kesehatanmu",
  alternates: {
    canonical: "https://www.rawat.id/sistem-faskes/rekam-medis-elektronik/panduan-penggunaan-rme",
  },
};

export default function Page() {
  return (
    <section className="mx-5 md:mx-12 my-10">
      <h1 className="text-2xl md:text-4xl font-semibold text-green">
        Panduan Penggunaan RME
      </h1>
      <p className="mt-3 text-gray-700 max-w-3xl">
        Halaman ini bisa diisi tautan panduan, video, FAQ, atau dokumentasi
        penggunaan RME.
      </p>
      <Link
        href="/sistem-faskes/rekam-medis-elektronik"
        className="inline-block mt-5 text-sm font-semibold text-green hover:text-greenHover transition-colors"
      >
        Kembali
      </Link>
    </section>
  );
}

