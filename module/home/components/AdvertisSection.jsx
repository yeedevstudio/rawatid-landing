import Image from "next/image";
import React from "react";

export default function AdvertisSection() {
  return (
    <section data-aos="zoom-in" className="my-20 bg-green60 w-full py-20 flex flex-col md:flex-row items-center gap-[1rem] px-5 md:px-12">
      <Image
        src={"/images/laptop.svg"}
        alt="laptop_image"
        width={400}
        height={400}
        className="w-full md:w-[20rem] lg:w-[70%]"
      />
      <div className="flex flex-col gap-4 w-full text-white">
        <h2 className=" text-xl md:text-2xl lg:text-3xl font-medium">
          Ribet Pindah dari Sistem Lama? Kami Bantu Sampai Selesai!
        </h2>
        <h3 className="text-base md:text-xl lg:text-2xl font-normal">
          Kami akan bantu Kamu migrasi data Rumah Sakit dan Klinik ke Rawat.ID,
          transisi sistem manajemen sampai sistem siap digunakan!
        </h3>
      </div>
    </section>
  );
}
