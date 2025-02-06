import BlogPage from "@/module/blog";
import Error from "../error";

export const metadata = {
  title: "Rawat.ID - Blog",
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
      fetch(`${process.env.API_URL}/posts?populate=*&sort=updatedAt:desc&pagination[page]=1&pagination[pageSize]=30`),
    ]);

    const [postSlug] = await Promise.all([postSlugRes.json()]);

    const dataSlug = postSlug.data || null;

    return <BlogPage data={dataSlug} />;
  } catch (error) {
    return <Error />;
  }
}
