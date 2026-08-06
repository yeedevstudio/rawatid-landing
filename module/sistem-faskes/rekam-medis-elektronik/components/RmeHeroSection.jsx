"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function RmeHeroSection() {
  const router = useRouter();

  return (
    <section className="my-10 w-full px-5 md:px-12 lg:px-20 xl:px-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <div
          data-aos="fade-right"
          suppressHydrationWarning
          className="flex flex-col gap-3 md:gap-6 lg:gap-8"
        >
          <h1 className="text-[40px] md:text-[48px] leading-[1.1] font-semibold text-[#038F7A]">
            Digitalisasi Rekam Medis
            <br />
            dengan Rawat.ID
          </h1>
          <h2 className="text-[22px] md:text-[28px] leading-[1.35] font-normal text-[#038F7A]">
            Pekerjaan nakes jadi lebih mudah, pelayanan jadi lebih berkualitas,
            faskes jadi lebih untung!
          </h2>

          <div className="flex gap-[16px] w-full pt-6 md:pt-10 transition-all duration-300 ease-in-out">
            <Button
              aria-label="Registrasi Sekarang"
              className="bg-[#038F7A] text-white text-[28px] font-semibold hover:bg-[#038F7A]/90 shadow-none w-[298px] h-[79px] px-[26px] py-[18px] rounded-[16px]"
              onClick={() => router.push("/register")}
            >
              Registrasi Sekarang
            </Button>
            <Button
              aria-label="Lihat Fitur"
              className="text-[#038F7A] text-[28px] font-semibold border border-[#038F7A] bg-white hover:bg-[#038F7A]/5 shadow-none h-[81px] px-[26px] py-[18px] rounded-[16px]"
              onClick={() => router.push("/fitur")}
            >
              Lihat Fitur
            </Button>
          </div>
        </div>

        <div
          data-aos="fade-left"
          suppressHydrationWarning
          className="flex items-center justify-center lg:justify-end"
        >
          <Image
            src={"/images/berandafaskes.webp"}
            alt="Ilustrasi Rekam Medis Elektronik Rawat.ID"
            width={900}
            height={900}
            sizes="(max-width: 768px) 320px, (max-width: 1024px) 520px, 720px"
            className="w-[20rem] md:w-[32rem] lg:w-[38rem] xl:w-[42rem] h-auto"
            priority={false}
          />
        </div>
      </div>
    </section>
  );
}

