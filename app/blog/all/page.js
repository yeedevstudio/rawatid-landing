import Error from "@/app/error";
import NotFound from "@/app/not-found";
import PageByAll from "@/module/blog/components/PageByAll";

export const metadata = {
  title: "Rawat ID | Blog",
  description:
    "Blog Rawat.ID menghadirkan panduan dan artikel tentang digitalisasi kesehatan, transformasi layanan medis, serta solusi efektif untuk tenaga kesehatan, fasilitas kesehatan dan Teknologi.",
  keywords:
    "Rawat.Id, faskes, Sistem Informasi Manajemen Kesehatan, Kesehatan, Rekam Medis, Rawat.ID, Tips tenaga kesehatan, Blog Kesehatan, Inovasi teknologi kesehatan",
};

export default async function Page() {
  if (!process.env.API_URL) {
    throw new Error("API URL is not defined in environment variables.");
  }

  try {
    const [postSlugRes] = await Promise.all([
      fetch(`${process.env.API_URL}/posts?populate=*&sort=updatedAt:desc`),
    ]);

    const [postAll] = await Promise.all([postSlugRes.json()]);

    const dataAll = postAll.data || [];

    if (!dataAll) {
      return <NotFound />;
    }

    return <PageByAll data={dataAll} />;
  } catch (error) {
    return <Error />;
  }
}
