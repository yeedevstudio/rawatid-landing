import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default function PromotionSection() {
  return (
    <section data-aos="zoom-in" className="w-full lg:my-20 relative">
      <div className="bg-hero-image bg-cover bg-center w-full h-[80vh] flex items-center px-5 lg:px-12">
        <div className="flex flex-col gap-6 md:gap-10">
          <h2 className="text-xl md:text-2xl font-normal text-green lg:w-[60%]">
            Yuk, gunakan Rawat.ID di Rumah Sakit atau Klinik kamu. Kami akan
            bantu dampingi implementasi sampai bisa, dan gratis biaya untuk 1
            tahun pertama kalau kamu daftar sekarang!
          </h2>
          <Link href="/register" passHref itemProp="button">
            <Button
              aria-label="Registrasi Sekarang"
              className="bg-green text-white hover:bg-greenHover shadow-none w-[50%] md:w-[40%] lg:w-[20%] h-[2.5rem] md:h-[3rem] rounded-lg transition-all duration-300 ease-in-out"
            >
              Registrasi Sekarang
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
