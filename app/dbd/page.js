import { lazy } from "react";

const DbdPage = lazy(() => import("@/module/dbd"));

export const metadata = {
  title: "Demam Berdarah Dengue (DBD) | Rawat.ID",
  description:
    "Panduan lengkap berbasis bukti ilmiah tentang Demam Berdarah Dengue (DBD) untuk masyarakat umum.",
};

export default function DbdRoute() {
  return <DbdPage />;
}
