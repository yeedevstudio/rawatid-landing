import Breadcrumbs from "@/common/components/Breadcrumbs";
import { CONTAINER_CLASS } from "@/common/constant/containerValue";
import KalkulatorTdeeForm from "@/module/kalkulator-tdee";

export const metadata = {
  title: "Kalkulator TDEE - Hitung Kebutuhan Kalori Harian Online",
  description:
    "Hitung perkiraan berapa banyak kalori yang dibakar per hari berdasarkan tubuh dan aktivitas fisik harian kamu dengan Kalkulator TDEE (Total Daily Energy Expenditure).",
  alternates: {
    canonical: "https://www.rawat.id/alat-kesehatan/kalkulator-tdee",
  },
};

export default function KalkulatorTdeePage() {
  return (
    <div className="w-full">
      <div className={`${CONTAINER_CLASS} pt-6`}>
        <Breadcrumbs
          items={[
            { label: "Beranda", href: "/" },
            { label: "Alat Kesehatan", href: "/alat-kesehatan/kalkulator-bmi" },
            { label: "Kalkulator TDEE", href: "/alat-kesehatan/kalkulator-tdee" },
          ]}
        />
      </div>

      <main className="w-full px-4 sm:px-8 md:px-16 lg:px-32 pb-16 pt-8">
        <KalkulatorTdeeForm />
      </main>
    </div>
  );
}
