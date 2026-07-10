import Breadcrumbs from "@/common/components/Breadcrumbs";
import PerbaruiAkun from "@/module/perbarui-akun";

export const metadata = {
  title: "Perbarui Akun | Rawat.id",
  description: "Kelola informasi akun dan data pribadi kamu.",
};

export default function PerbaruiAkunPage() {
  return (
    <div className="min-h-[calc(100vh-85px)] bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 pt-6">
        <Breadcrumbs
          items={[
            { label: "Beranda", href: "/" },
            { label: "Akun saya", href: "/perbarui-akun" },
            { label: "Perbarui akun", href: "/perbarui-akun" },
          ]}
        />
      </div>

      <PerbaruiAkun />
    </div>
  );
}
