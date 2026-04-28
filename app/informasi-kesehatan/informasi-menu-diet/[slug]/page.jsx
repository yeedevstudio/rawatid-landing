import MenuDietDetailClient from "./MenuDietDetailClient";

export default async function InformasiMenuDietDetailPage({ params }) {
  const { slug = "" } = await params;

  return (
    <div className="w-full">
      <main className="max-w-6xl mx-auto px-5 md:px-12 pb-10 pt-6">
        <MenuDietDetailClient slug={slug} />
      </main>
    </div>
  );
}

