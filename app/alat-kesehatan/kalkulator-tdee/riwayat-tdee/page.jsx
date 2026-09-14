import Breadcrumbs from "@/common/components/Breadcrumbs";
import { CONTAINER_CLASS } from "@/common/constant/containerValue";
import RiwayatTdee from "@/module/riwayat-tdee";

export const metadata = {
  title: "Riwayat TDEE | Rawat.id",
  description: "Pantau perkembangan TDEE (Total Daily Energy Expenditure) kamu dari waktu ke waktu.",
};

export default function RiwayatTdeePage() {
  return (
    <div className="min-h-[calc(100vh-85px)] bg-white">
      <div className={`${CONTAINER_CLASS} pt-6`}>
        <Breadcrumbs
          items={[
            { label: "Beranda", href: "/" },
            { label: "Alat Kesehatan", href: "/alat-kesehatan/kalkulator-bmi" },
            { label: "Kalkulator TDEE", href: "/alat-kesehatan/kalkulator-tdee" },
            { label: "Riwayat", href: "/alat-kesehatan/kalkulator-tdee/riwayat-tdee" },
          ]}
        />
      </div>

      <RiwayatTdee />
    </div>
  );
}
