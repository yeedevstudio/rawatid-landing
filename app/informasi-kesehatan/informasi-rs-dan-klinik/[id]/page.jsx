import FacilityDetailClient from "./FacilityDetailClient";
import { getFacilityById } from "@/lib/healthFacilities";

export default async function FacilityDetailPage({ params }) {
  const { id } = await params;
  // Detail + nama wilayah disiapkan di server; browser tidak fetch saat mount.
  const initialData = await getFacilityById(id);
  return <FacilityDetailClient id={id} initialData={initialData} />;
}
