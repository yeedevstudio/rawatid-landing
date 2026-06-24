import Breadcrumbs from "@/common/components/Breadcrumbs";
import KalkulatorBmiForm from "@/module/kalkulator-bmi";

export const metadata = {
  title: "Kalkulator BMI - Hitung Indeks Massa Tubuh Anda | Rawat.id",
  description:
    "Hitung Indeks Massa Tubuh (BMI) Anda secara mudah dan cepat. Ketahui apakah berat badan Anda ideal berdasarkan tinggi dan berat badan.",
};

export default function KalkulatorBmiPage() {
  return (
    <div className="w-full">
      <div className="px-5 md:px-12 pt-6">
        <Breadcrumbs
          items={[
            { label: "Beranda", href: "/" },
            { label: "Alat Kesehatan", href: "/alat-kesehatan/kalkulator-bmi" },
            { label: "Kalkulator BMI", href: "/alat-kesehatan/kalkulator-bmi" },
          ]}
        />
      </div>

      <main className="max-w-full mx-32 px-5 md:px-12 pb-16 pt-8">
        <KalkulatorBmiForm />
      </main>
    </div>
  );
}
