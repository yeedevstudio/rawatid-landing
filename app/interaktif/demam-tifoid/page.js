import { lazy } from "react";

const DemamTifoidPage = lazy(() => import("@/module/demam-tifoid"));

export const metadata = {
  title: "Demam Tifoid | Rawat.ID",
  description:
    "Kenali Demam Tifoid, infeksi bakteri yang umum di daerah dengan sanitasi buruk. Pelajari gejala, penyebab, cara penularan, dan penanganannya.",
};

export default function DemamTifoidInteraktifRoute() {
  return <DemamTifoidPage />;
}
