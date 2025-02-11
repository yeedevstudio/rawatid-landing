import BlogPage from "@/module/blog";
import Error from "../error";

export const metadata = {
  title: " Blog Teknologi dan Kesehatan dari Rawat.ID",
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
    const [postSlugRes, allPostRes] = await Promise.all([
      fetch(
        `${process.env.API_URL}/posts?populate=*&sort=updatedAt:desc&pagination[page]=1&pagination[pageSize]=30`
      ),
      fetch(`${process.env.API_URL}/posts?populate=*&sort=updatedAt:desc`),
    ]);

    const [postSlug, AllPost] = await Promise.all([
      postSlugRes.json(),
      allPostRes.json(),
    ]);

    const dataSlug = postSlug.data || null;
    const dataAll = AllPost.data || [];

    return <BlogPage data={dataSlug} post={dataAll} />;
  } catch (error) {
    return <Error />;
  }
}
