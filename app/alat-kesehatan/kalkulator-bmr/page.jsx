import Breadcrumbs from "@/common/components/Breadcrumbs";
import { CONTAINER_CLASS } from "@/common/constant/containerValue";
import KalkulatorBmrForm from "@/module/kalkulator-bmr";

export const metadata = {
  title: "Kalkulator BMR - Hitung Kalori Minimum Tubuh Saat Istirahat Online",
  description:
    "Hitung jumlah minimum kalori yang dibakar tubuh saat istirahat untuk mempertahankan fungsi-fungsi penting tubuh dengan Kalkulator BMR (Basal Metabolic Rate).",
  alternates: {
    canonical: "https://www.rawat.id/alat-kesehatan/kalkulator-bmr",
  },
};

export default function KalkulatorBmrPage() {
  return (
    <div className="w-full">
      <div className={`${CONTAINER_CLASS} pt-6`}>
        <Breadcrumbs
          items={[
            { label: "Beranda", href: "/" },
            { label: "Alat Kesehatan", href: "/alat-kesehatan/kalkulator-bmi" },
            { label: "Kalkulator BMR", href: "/alat-kesehatan/kalkulator-bmr" },
          ]}
        />
      </div>

      <main className="w-full px-4 sm:px-8 md:px-16 lg:px-32 pb-16 pt-8">
        <KalkulatorBmrForm />
      </main>
    </div>
  );
}
