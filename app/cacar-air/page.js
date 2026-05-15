import { lazy } from "react";

const CacarAirPage = lazy(() => import("@/module/cacar-air"));

export const metadata = {
  title: "Cacar Air vs. Cacar Ular | Rawat.ID",
  description:
    "Kenali perbedaan cacar air (varicella) dan cacar ular (herpes zoster) dari virus VZV yang sama, gejala, dan pentingnya penanganan yang tepat.",
};

export default function CacarAirRoute() {
  return <CacarAirPage />;
}
