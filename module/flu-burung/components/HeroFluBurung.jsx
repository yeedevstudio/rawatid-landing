import React from "react";

export default function HeroFluBurung() {
  return (
    <section className="w-full px-5 pb-12 pt-12 md:px-12 md:pb-16 md:pt-16 lg:px-20 lg:pb-20 lg:pt-20 xl:px-24">
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div data-aos="fade-right" suppressHydrationWarning className="flex flex-col gap-4 text-left md:gap-6">
          <h1 className="text-[32px] font-bold leading-[1.15] tracking-tight text-[#038F7A] sm:text-[40px] md:text-[48px] lg:text-[52px]">
            Flu Burung <em>(Avian Influenza)</em>
          </h1>
          <p className="max-w-none text-[15px] font-normal leading-relaxed text-neutral-600 sm:text-[16px] md:text-[18px]">
            Pada tahun 1997, virus Flu Burung H5N1 pertama kali menginfeksi manusia di Hong Kong setelah menular
            langsung dari unggas. Dari 18 kasus yang terjadi, 16 di antaranya berujung kematian. Hingga lebih dari
            dua dekade kemudian, virus ini terus berevolusi, menyebar ke berbagai negara, dan masih sesekali
            menginfeksi manusia dengan tingkat kematian yang tinggi.
          </p>
        </div>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          data-aos="fade-left"
          suppressHydrationWarning
          src="/image/fluburung.webp"
          alt="Ilustrasi Flu Burung"
          className="h-auto w-full max-w-lg justify-self-center lg:max-w-none"
        />
      </div>

    </section>
  );
}
