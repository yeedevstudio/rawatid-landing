import Breadcrumbs from "@/common/components/Breadcrumbs";
import RmeHeroSection from "@/module/sistem-faskes/rekam-medis-elektronik/components/RmeHeroSection";
import FiturSection from "@/module/home/components/FiturSection";
import AdvertisSection from "@/module/home/components/AdvertisSection";
import ServiceSection from "@/module/home/components/ServiceSection";
import PromotionSection from "@/module/home/components/PromotionSection";

export const metadata = {
  title: "Sistem Faskes Rekam Medis Elektronik Rawat ID - Memberikan Solusi dan Informasi Terbaik untuk Merawat Kesehatanmu",
  alternates: {
    canonical: "https://www.rawat.id/sistem-faskes/rekam-medis-elektronik",
  },
};

export default function Page() {
  return (
    <div className="w-full">
      <div className="px-5 md:px-12 pt-6">
        <Breadcrumbs
          items={[
            { label: "Beranda", href: "/" },
            { label: "Sistem Faskes", href: "/sistem-faskes" },
            {
              label: "Rekam Medis Elektronik",
              href: "/sistem-faskes/rekam-medis-elektronik",
            },
          ]}
        />
      </div>

      <RmeHeroSection />

      <FiturSection />

      <AdvertisSection />

      <div className="py-10">
        <ServiceSection />
      </div>

      <PromotionSection />
    </div>
  );
}
