import Breadcrumbs from "@/common/components/Breadcrumbs";
import { CONTAINER_CLASS } from "@/common/constant/containerValue";
import RiwayatBmr from "@/module/riwayat-bmr";

export const metadata = {
  title: "Riwayat BMR | Rawat.id",
  description: "Pantau perkembangan BMR (Basal Metabolic Rate) kamu dari waktu ke waktu.",
};

export default function RiwayatBmrPage() {
  return (
    <div className="min-h-[calc(100vh-85px)] bg-white">
      <div className={`${CONTAINER_CLASS} pt-6`}>
        <Breadcrumbs
          items={[
            { label: "Beranda", href: "/" },
            { label: "Alat Kesehatan", href: "/alat-kesehatan/kalkulator-bmi" },
            { label: "Kalkulator BMR", href: "/alat-kesehatan/kalkulator-bmr" },
            { label: "Riwayat", href: "/alat-kesehatan/kalkulator-bmr/riwayat-bmr" },
          ]}
        />
      </div>

      <RiwayatBmr />
    </div>
  );
}
