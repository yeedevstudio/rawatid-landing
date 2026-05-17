import { lazy } from "react";

const PoliomielitisPage = lazy(() => import("@/module/poliomielitis"));

export const metadata = {
  title: "Poliomielitis | Rawat.ID",
  description:
    "Kenali Poliomielitis, infeksi virus yang umum dan bersifat seumur hidup. Pelajari gejala, penyebab, cara penularan, dan penanganannya.",
};

export default function PoliomielitisInteraktifRoute() {
  return <PoliomielitisPage />;
}
