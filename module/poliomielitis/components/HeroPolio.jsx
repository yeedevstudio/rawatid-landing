import React from "react";

export default function HeroPolio() {
  return (
     <section className="w-full px-5 pb-8 pt-12 md:px-12 md:pb-10 md:pt-16 lg:px-20 lg:pb-12 lg:pt-20 xl:px-24">
         <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
           <div data-aos="fade-right" suppressHydrationWarning className="flex max-w-none flex-col gap-4 text-left md:gap-6">
             <h1 className="text-[32px] font-bold leading-[1.15] tracking-tight text-[#038F7A] sm:text-[40px] md:text-[48px] lg:text-[52px]">
              Poliomielitis
             </h1>
            
             <p className="max-w-none text-[15px] font-normal leading-relaxed text-neutral-600 sm:text-[16px] md:text-[18px]">
               Pada era 1980-an, diperkirakan lebih dari 350.000 kasus kelumpuhan terjadi setiap tahun di seluruh dunia akibat dari kasus poliomielitis.
             </p>
           </div>
   
           
           <img
             data-aos="fade-left"
             suppressHydrationWarning
             src="/image/poliomielitis.png"
             alt="Ilustrasi Poliomielitis"
             className="h-auto w-full max-w-lg justify-self-center lg:max-w-none"
           />
         </div>
       </section>
  );
}