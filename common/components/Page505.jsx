import Link from "next/link";

export default function Page505({ title }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 md:py-24">
      <div className="flex flex-col items-center gap-5 text-center">
        <h2 className="text-lg md:text-xl lg:text-2xl font-medium text-neutral90">{title ? `${title} — Sedang Dalam Pengembangan` : "Sedang Dalam Pengembangan"}</h2>
        <p className="text-xs md:text-sm lg:text-base text-neutral90 px-5 md:px-0">Halaman ini belum tersedia. Silakan kembali lagi nanti atau eksplor halaman lainnya.</p>
      </div>

      <div className="flex items-center justify-center gap-2 md:gap-6 mt-10 text-sm md:text-base lg:text-lg">
        <Link href={"/"} className="bg-green text-white hover:bg-green60 transition-all duration-300 ease-in-out py-2 px-4 rounded-md">
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}
