import { lazy } from "react";

const HepatitisPage = lazy(() => import("@/module/hepatitis"));

export const metadata = {
  title: "Hepatitis A | Rawat.ID",
  description:
    "Kenali Hepatitis A, infeksi virus yang bisa dicegah dengan vaksin. Pelajari gejala, penyebab, cara penularan, dan penanganannya.",
};

export default function HepatitisRoute() {
  return <HepatitisPage />;
}
