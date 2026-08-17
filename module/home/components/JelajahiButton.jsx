"use client";

import { Button } from "@/components/ui/button";

// Dipisah dari HeroSection supaya bagian hero (elemen LCP) bisa tetap menjadi
// server component. Hanya tombol ini yang butuh JS di browser.
export default function JelajahiButton() {
  const handleJelajahi = () => {
    document.getElementById("dukungan-kesehatan")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Button
      aria-label="Jelajahi"
      className="bg-[#038F7A] text-white text-[15px] sm:text-[18px] md:text-[22px] lg:text-[28px] font-semibold hover:bg-[#038F7A]/90 shadow-none w-full h-[48px] sm:h-[58px] md:h-[68px] lg:h-[79px] px-4 md:px-[26px] py-2 md:py-[18px] rounded-[12px] md:rounded-[16px]"
      onClick={handleJelajahi}
    >
      Jelajahi
    </Button>
  );
}
