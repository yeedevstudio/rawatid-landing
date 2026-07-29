import FacilityDetailClient from "./FacilityDetailClient";

export default async function FacilityDetailPage({ params }) {
  const { id } = await params;
  return <FacilityDetailClient id={id} />;
}
