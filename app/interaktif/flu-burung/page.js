import { lazy } from "react";

const FluBurungPage = lazy(() => import("@/module/flu-burung"));

export const metadata = {
  title: "Flu Burung (Avian Influenza) | Rawat.ID",
  description:
    "Kenali Flu Burung (Avian Influenza), penyakit infeksi yang disebabkan virus influenza dari unggas. Pelajari gejala, penyebab, cara penularan, dan penanganannya.",
};

export default function FluBurungRoute() {
  return <FluBurungPage />;
}
