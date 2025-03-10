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
  alternates: {
    canonical: "https://www.rawat.id/blog",
  },
};

export default async function Page() {
  if (!process.env.API_URL) {
    throw new Error("API URL is not defined in environment variables.");
  }

  try {
    const [postRes, categoriesRes] = await Promise.all([
      fetch(`${process.env.API_URL}/posts?populate=*&sort=updatedAt:desc`, {
        cache: "no-store",
      }),
      fetch(`${process.env.API_URL}/categories`, { cache: "no-store" }),
    ]);

    const [postSlug, categories] = await Promise.all([
      postRes.json(),
      categoriesRes.json(),
    ]);

    const dataSlug = postSlug.data || null;
    const dataCategories = categories.data || [];

    return <BlogPage data={dataSlug} categories={dataCategories} />;
  } catch (error) {
    return <Error />;
  }
}
