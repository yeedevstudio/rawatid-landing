import BlogPage from "@/module/blog";
import Error from "../error";

export const metadata = {
  title: "Rawat.ID - Blog Kesehatan, Teknologi dan Informasi Umum",
  description:
    "Blog Rawat.ID menghadirkan panduan dan artikel tentang digitalisasi kesehatan, solusi efektif untuk tenaga kesehatan, berita seputaran kesehatan, informasi umum dan Teknologi.",
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
  canonical: "https://rawat.id/blog",
  alternates: {
    canonical: "https://rawat.id/blog",
  },
};

export default async function Page() {
  if (!process.env.API_URL) {
    throw new Error("API URL is not defined in environment variables.");
  }

  try {
    const [postSlugRes] = await Promise.all([
      fetch(
        `${process.env.API_URL}/posts?populate=*&sort=updatedAt:desc&pagination[page]=1&pagination[pageSize]=30`
      ),
    ]);

    const [postSlug] = await Promise.all([postSlugRes.json()]);

    const dataSlug = postSlug.data || null;

    return <BlogPage data={dataSlug} />;
  } catch (error) {
    return <Error />;
  }
}
