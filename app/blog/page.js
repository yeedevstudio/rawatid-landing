import BlogPage from "@/module/blog";
import Error from "../error";

function normalizeCategory(entry) {
  if (!entry) return null;
  const a = entry.attributes;
  if (a && typeof a === "object") {
    const { attributes: _omit, ...restMeta } = entry;
    return { ...restMeta, ...a };
  }
  return entry;
}

async function fetchAllPostsForHome(apiUrl) {
  const pageSize = 100;
  const qsBase = `populate=*&sort=updatedAt:desc&pagination[pageSize]=${pageSize}`;
  const firstRes = await fetch(`${apiUrl}/posts?${qsBase}&pagination[page]=1`, {
    cache: "no-store",
  });
  const firstJson = await firstRes.json();
  if (!firstRes.ok) {
    throw new Error(firstJson?.error?.message || "Posts fetch failed");
  }

  let allPosts = [...(firstJson.data || [])];
  const pageCount = firstJson.meta?.pagination?.pageCount ?? 1;

  if (pageCount <= 1) {
    return allPosts;
  }

  const restJson = await Promise.all(
    Array.from({ length: pageCount - 1 }, (_, idx) => {
      const page = idx + 2;
      return fetch(`${apiUrl}/posts?${qsBase}&pagination[page]=${page}`, {
        cache: "no-store",
      }).then((res) => res.json());
    }),
  );

  for (const chunk of restJson) {
    allPosts = allPosts.concat(chunk?.data || []);
  }

  return allPosts;
}

export const metadata = {
  title: "Temukan Berbagai Artikel, Tips dan Informasi untuk Kesehatanmu",
  description: "Blog Rawat.ID menghadirkan panduan dan artikel tentang digitalisasi kesehatan, solusi efektif untuk tenaga kesehatan, berita seputaran kesehatan, informasi umum dan Teknologi.",
  keywords: ["Rawat.ID", "artikel", "beranda", "Kesehatan", "Informasi Umum", "Berita", "Teknologi", "Rekam Medis", "Rawat", "Tips tenaga kesehatan", "Blog Kesehatan", "Inovasi teknologi kesehatan", "blog rawat.id", "blog kesehatan"],
  alternates: {
    canonical: "https://www.rawat.id/blog",
  },
};

export default async function Page() {
  if (!process.env.API_URL) {
    throw new Error("API URL is not defined in environment variables.");
  }

  try {
    const [categoriesJson, dataSlug] = await Promise.all([fetch(`${process.env.API_URL}/categories`, { cache: "no-store" }).then((r) => r.json()), fetchAllPostsForHome(process.env.API_URL)]);

    const dataCategories = (categoriesJson.data || []).map(normalizeCategory).filter(Boolean);

    return <BlogPage data={dataSlug} categories={dataCategories} />;
  } catch (error) {
    return <Error />;
  }
}
