import { lazy } from "react";

const CacarMonyetPage = lazy(() => import("@/module/cacar-monyet"));

export const metadata = {
  title: "Cacar Monyet (Mpox) | Rawat.ID",
  description:
    "Kenali Cacar Monyet (Mpox), penyakit infeksi virus yang ditandai bintik merah dan lepuhan. Pelajari gejala, penyebab, cara penularan, dan penanganannya.",
};

export default function CacarMonyetRoute() {
  return <CacarMonyetPage />;
}
