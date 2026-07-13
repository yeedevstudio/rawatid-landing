import Breadcrumbs from "@/common/components/Breadcrumbs";
import RiwayatBmi from "@/module/riwayat-bmi";

export const metadata = {
  title: "Riwayat BMI | Rawat.id",
  description: "Pantau perkembangan indeks massa tubuh (BMI) kamu dari waktu ke waktu.",
};

export default function RiwayatBmiPage() {
  return (
    <div className="min-h-[calc(100vh-85px)] bg-gray-50">
      <div className="px-5 md:px-12 pt-6">
        <Breadcrumbs
          items={[
            { label: "Beranda", href: "/" },
            { label: "Alat Kesehatan", href: "/alat-kesehatan/kalkulator-bmi" },
            { label: "Kalkulator BMI", href: "/alat-kesehatan/kalkulator-bmi" },
            { label: "Riwayat", href: "/alat-kesehatan/kalkulator-bmi/riwayat-bmi" },
          ]}
        />
      </div>

      <RiwayatBmi />
    </div>
  );
}
