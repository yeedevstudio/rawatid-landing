import DrugDetailClient from "./DrugDetailClient";

export default async function Page({ params, searchParams }) {
  const { slug } = await params;
  const resolvedSearchParams =
    searchParams && typeof searchParams.then === "function"
      ? await searchParams
      : searchParams;
  const ing_code = resolvedSearchParams?.ing_code || resolvedSearchParams?.ingCode || "";
  return <DrugDetailClient slug={slug} ing_code={ing_code} />;
}
