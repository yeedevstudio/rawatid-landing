import Error from "@/app/error";
import NotFound from "@/app/not-found";
import PageByClientPagination from "@/module/blog/components/PageByClientPagination";
import { redirect } from "next/navigation";
import { BLOG_REVALIDATE } from "@/common/constant/revalidate";

export async function generateMetadata({ params }) {
  const { slug = "" } = await params;

  if (!process.env.API_URL) {
    throw new Error("API URL is not defined in environment variables.");
  }

  try {
    const postSlugRes = await fetch(
      `${process.env.API_URL}/categories?populate=*&filters[slug][$eq]=${slug}`,
      { next: { revalidate: BLOG_REVALIDATE } }
    );
    const postSlug = await postSlugRes.json();
    const dataSlug = postSlug.data?.[0] || null;

    if (dataSlug) {
      // Strapi bisa mengembalikan field langsung atau terbungkus `attributes`,
      // tergantung versi/konfigurasi — keduanya ditangani. Slug jadi cadangan
      // terakhir agar title tetap unik walau `name` kosong.
      const categoryName =
        dataSlug?.attributes?.name ||
        dataSlug?.name ||
        slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

      return {
        title: `${categoryName} - Blog Teknologi dan Kesehatan dari Rawat ID`,
        alternates: {
          canonical: `${process.env.NEXT_PUBLIC_URL}/kategori/${slug}`,
        },
      };
    }

    return {
      title: "Kategori - Tidak Ditemukan",
      description: "The post you are looking for could not be found.",
    };
  } catch (error) {
    return {
      title: "Kategori - Kesalahan",
      description: "An error occurred while fetching the blog post.",
    };
  }
}

export default async function Page({ params }) {
  const { slug = "" } = await params;

  if (slug === "informasi-kesehatan") {
    redirect("/blog/kategori/informasi-obat");
  }

  if (!process.env.API_URL) {
    throw new Error("API URL is not defined in environment variables.");
  }

  try {
    // Render client-side pagination supaya request terlihat di Network browser.
    return <PageByClientPagination categorySlug={slug} />;
  } catch (error) {
    return <Error />;
  }
}
