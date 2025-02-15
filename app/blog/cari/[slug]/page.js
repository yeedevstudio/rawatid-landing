import Error from "@/app/error";
import NotFound from "@/app/not-found";
import PageBySearch from "@/module/blog/components/PageBySearch";

export const metadata = {
  title: " Blog Teknologi dan Kesehatan dari Rawat.ID",
  description:
    "Blog Rawat.ID menghadirkan panduan dan artikel tentang digitalisasi kesehatan, transformasi layanan medis, serta solusi efektif untuk tenaga kesehatan, fasilitas kesehatan, berita seputaran kesehatan, informasi umum dan Teknologi.",
  keywords: [
    "Rawat.ID",
    "artikel",
    "beranda",
    "Kesehatan",
    "Informasi Umum",
    "Berita",
    "Teknologi",
    "Rekam Medis",
    "Rawat",
    "Tips tenaga kesehatan",
    "Blog Kesehatan",
    "Inovasi teknologi kesehatan",
    "blog rawat.id",
    "blog kesehatan",
  ],
  alternates: {
    canonical: "https://www.rawat.id/blog/semua",
  },
};

export default async function Page({ params, searchParams }) {
  const slug = params?.slug || "";

  if (!process.env.API_URL) {
    throw new Error("API URL is not defined in environment variables.");
  }

  const currentPage = parseInt(searchParams?.page) || 1;
  const pageSize = 9;

  try {
    const res = await fetch(
      `${process.env.API_URL}/posts?populate=*&sort=updatedAt:desc&filters[title][$containsi]=${slug}&pagination[page]=${currentPage}&pagination[pageSize]=${pageSize}`,
      { cache: "no-store" }
    );

    if (!res.ok) throw new Error("Failed to fetch data");

    const postData = await res.json();
    const dataAll = postData.data || [];
    const pagination = postData.meta.pagination || {};

    if (!dataAll.length) return <NotFound />;

    return <PageBySearch data={dataAll} pagination={pagination} slug={slug} />;
  } catch (error) {
    return <Error />;
  }
}
