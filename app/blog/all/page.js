import Error from "@/app/error";
import NotFound from "@/app/not-found";
import PageByAll from "@/module/blog/components/PageByAll";

export const metadata = {
  title: "Rawat ID | Blog",
  description:
    "Blog Rawat.ID menghadirkan panduan dan artikel tentang digitalisasi kesehatan, transformasi layanan medis, serta solusi efektif untuk tenaga kesehatan, fasilitas kesehatan dan Teknologi.",
  keywords:
    "Rawat.Id, faskes, Sistem Informasi Manajemen Kesehatan, Kesehatan, Rekam Medis, Rawat.ID, Tips tenaga kesehatan, Blog Kesehatan, Inovasi teknologi kesehatan, blog rawat.id, blog kesehatan",
};

export default async function Page({ searchParams }) {
  if (!process.env.API_URL) {
    throw new Error("API URL is not defined in environment variables.");
  }

  console.log(searchParams.page);
  const currentPage = parseInt(searchParams?.page) || 1;
  const pageSize = 8;

  try {
    const res = await fetch(
      `${process.env.API_URL}/posts?populate=*&sort=updatedAt:desc&pagination[page]=${currentPage}&pagination[pageSize]=${pageSize}`,
      { cache: "no-store" }
    );

    if (!res.ok) throw new Error("Failed to fetch data");

    const postData = await res.json();
    const dataAll = postData.data || [];
    const pagination = postData.meta.pagination || {};

    if (!dataAll.length) return <NotFound />;

    return <PageByAll data={dataAll} pagination={pagination} />;
  } catch (error) {
    return <Error />;
  }
}
