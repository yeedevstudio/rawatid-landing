import React from "react";

export default function DbdHeroSection() {
  return (
    <section className="w-full px-5 md:px-12 lg:px-20 xl:px-24 py-12 md:py-16 lg:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <div data-aos="fade-right" suppressHydrationWarning className="flex flex-col gap-4 md:gap-6 text-left">
          <h1 className="text-[32px] sm:text-[40px] md:text-[48px] lg:text-[52px] font-bold leading-[1.15] text-[#DB1A1A] tracking-tight">
            <span className="block">Demam Berdarah</span>
            <span className="block"><em>Dengue</em> (DBD)</span>
          </h1>
          <p className="text-[16px] sm:text-[18px] md:text-[20px] leading-relaxed text-neutral-600 max-w-xl">
            <span className="block">Indonesia adalah salah satu negara <em>endemis </em> Demam Berdarah Dengue. Hampir seluruh wilayah Indonesia berisiko, dan wabah besar kerap terjadi setiap tahunnya.</span>
           
          </p>
        </div>

       
        <img data-aos="fade-left" suppressHydrationWarning src="/image/nyamuk.webp" alt="" />
      </div>
    </section>
  );
}
