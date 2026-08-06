import Error from "@/app/error";
import NotFound from "@/app/not-found";
import { POST_LIST_QUERY } from "@/common/constant/blogQuery";
import PageBySearch from "@/module/blog/components/PageBySearch";
import { BLOG_REVALIDATE } from "@/common/constant/revalidate";

export const metadata = {
  title: " Blog Teknologi dan Kesehatan dari Rawat.ID",
  description:
    "Blog Rawat.ID menghadirkan panduan dan artikel tentang digitalisasi kesehatan, transformasi layanan medis, serta solusi efektif untuk tenaga kesehatan, fasilitas kesehatan, berita seputaran kesehatan, informasi umum dan Teknologi.",
  keywords: ["Rawat.ID", "artikel", "beranda", "Kesehatan", "Informasi Umum", "Berita", "Teknologi", "Rekam Medis", "Rawat", "Tips tenaga kesehatan", "Blog Kesehatan", "Inovasi teknologi kesehatan", "blog rawat.id", "blog kesehatan"],
  alternates: {
    canonical: "https://www.rawat.id/blog/semua",
  },
};

export default async function Page({ params, searchParams }) {
  const resolvedParams = params && typeof params.then === "function" ? await params : params;
  const rawSlug = resolvedParams?.slug || "";
  const slug = typeof rawSlug === "string" ? rawSlug : "";

  if (!process.env.API_URL) {
    throw new Error("API URL is not defined in environment variables.");
  }

  const resolvedSearchParams = searchParams && typeof searchParams.then === "function" ? await searchParams : searchParams;
  const currentPage = parseInt(resolvedSearchParams?.page) || 1;
  const pageSize = 9;

  try {
    const encodedSlug = encodeURIComponent(slug);
    const res = await fetch(`${process.env.API_URL}/posts?${POST_LIST_QUERY}&sort=updatedAt:desc&filters[title][$containsi]=${encodedSlug}&pagination[page]=${currentPage}&pagination[pageSize]=${pageSize}`, { next: { revalidate: BLOG_REVALIDATE } });

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
