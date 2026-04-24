import Breadcrumbs from "@/common/components/Breadcrumbs";
import Page505 from "@/common/components/Page505";

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

      <main className="max-w-6xl mx-auto px-5 md:px-12 pb-10 pt-6">
        <Page505 title="Kalkulator BMI" />
      </main>
    </div>
  );
}

