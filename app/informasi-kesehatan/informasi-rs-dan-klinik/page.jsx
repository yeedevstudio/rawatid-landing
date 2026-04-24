import Breadcrumbs from "@/common/components/Breadcrumbs";
import Page505 from "@/common/components/Page505";

export default function InformasiRsDanKlinikPage() {
  return (
    <div className="w-full">
      <div className="px-5 md:px-12 pt-6">
        <Breadcrumbs
          items={[
            { label: "Beranda", href: "/" },
            {
              label: "Informasi Kesehatan",
              href: "/informasi-kesehatan/informasi-obat",
            },
            {
              label: "Informasi RS dan Klinik",
              href: "/informasi-kesehatan/informasi-rs-dan-klinik",
            },
          ]}
        />
      </div>

      <main className="max-w-6xl mx-auto px-5 md:px-12 pb-10 pt-6">
        <Page505 title="Informasi RS dan Klinik" />
      </main>
    </div>
  );
}

