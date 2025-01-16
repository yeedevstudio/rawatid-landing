"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function HeroSection() {
  const router = useRouter();
  return (
    <section
      data-aos=""
      className="my-10 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 mx-5 md:mx-12 "
    >
      <div data-aos="fade-right" className="flex flex-col gap-3 md:gap-6 lg:gap-8 ml-0 md:ml-7">
        <h1 className="text-2xl md:text-4xl font-semibold text-green leading-tight md:leading-relaxed">
          Digitalisasi Rekam Medis dengan Rawat.ID
        </h1>
        <h2 className=" text-lg md:text-2xl font-normal text-green mb-4 lg:mb-2">
          Pekerjaan nakes jadi lebih mudah, pelayanan jadi lebih berkualitas,
          faskes jadi lebih untung!
        </h2>
        <div className="flex justify-between w-full">
          <Button
            aria-label="Registrasi Sekarang"
            className="bg-green text-white text-sm md:text-lg font-semibold hover:bg-green shadow-none w-[60%] h-[2.5rem] md:h-[3rem] rounded-lg"
            onClick={() => router.push("/register")}
          >
            Registrasi Sekarang
          </Button>
          <Button
            aria-label="Lihat Fitur"
            className="text-green text-sm md:text-lg font-semibold border border-green bg-white hover:bg-white shadow-none w-[35%] h-[2.5rem] md:h-[3rem] rounded-lg"
            onClick={() => router.push("/fitur")}
          >
            Lihat Fitur
          </Button>
        </div>
      </div>
      <div data-aos="fade-left" className="flex items-center justify-end">
        <Image
          src={"/images/hero_image.svg"}
          alt="hero_image"
          width={900}
          height={900}
          className=" w-[20rem] h-[20rem]  md:w-[32rem] md:h-[30rem] lg:w-[39rem] lg:h-[29rem] rounded-tr-[12rem] rounded-bl-[12rem] lg:rounded-tr-[15rem] lg:rounded-bl-[15rem] "
        />
      </div>
    </section>
  );
}
