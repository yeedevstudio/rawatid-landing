import { lazy } from "react";

const HerpesSimplexPage = lazy(() => import("@/module/herpes-simplex"));

export const metadata = {
  title: "Herpes Simplex | Rawat.ID",
  description:
    "Kenali Herpes Simplex, infeksi virus yang umum dan bersifat seumur hidup. Pelajari gejala, penyebab, cara penularan, dan penanganannya.",
};

export default function HerpesSimplexInteraktifRoute() {
  return <HerpesSimplexPage />;
}
