import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col items-center gap-5">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-medium text-neutral90">
          Error 404
        </h1>
        <h2 className="text-lg md:text-xl lg:text-2xl font-medium text-neutral90">
          Halaman tidak ditemukan
        </h2>
        <p className="text-xs md:text-sm lg:text-base text-neutral90 text-center px-5 md:px-0">
          Sepertinya Anda salah alamat, atau halaman ini telah dihapus. Silahkan
          coba eksplor halaman lainnya
        </p>
      </div>

      <div className="flex items-center justify-center gap-2 md:gap-6 mt-10">
        <Link
          href={"/blog"}
          className="bg-green text-white hover:bg-green60 transition-all duration-300 ease-in-out py-2 px-4 rounded-md"
        >
          Cari Blog Lainnya
        </Link>
        <Link
          href={"/"}
          className="bg-green text-white hover:bg-green60 transition-all duration-300 ease-in-out py-2 px-4 rounded-md"
        >
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}
