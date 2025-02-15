import Error from "@/app/error";
import NotFound from "@/app/not-found";
import PageBy from "@/module/blog/components/PageBy";

export async function generateMetadata({ params }) {
  const slug = params?.slug || "";

  if (!process.env.API_URL) {
    throw new Error("API URL is not defined in environment variables.");
  }

  try {
    const postSlugRes = await fetch(
      `${process.env.API_URL}/categories?populate=*&filters[slug][$eq]=${slug}`,
      { cache: "no-store" }
    );
    const postSlug = await postSlugRes.json();
    const dataSlug = postSlug.data?.[0] || null;

    if (dataSlug) {
      return {
        title: "Blog Teknologi dan Kesehatan dari Rawat.ID",
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
  const slug = params?.slug || {};

  if (!process.env.API_URL) {
    throw new Error("API URL is not defined in environment variables.");
  }

  try {
    const [postSlugRes, postAllRes] = await Promise.all([
      fetch(
        `${process.env.API_URL}/posts?populate=*&sort=updatedAt:desc&filters[category][slug][$eq]=${slug}`,
        { cache: "no-store" }
      ),
      fetch(
        `${process.env.API_URL}/posts?populate=*&sort=updatedAt:desc&pagination[page]=1&pagination[pageSize]=10`,
        { cache: "no-store" }
      ),
    ]);

    const [postSlug, postAll] = await Promise.all([
      postSlugRes.json(),
      postAllRes.json(),
    ]);

    const dataSlug = postSlug.data || null;
    const dataAll = postAll.data || [];

    if (!dataSlug) {
      return <NotFound />;
    }

    return (
      <PageBy
        data={dataSlug}
        post={dataAll}
        slug={dataSlug?.[0]?.category?.name}
        title={"Kategori"}
      />
    );
  } catch (error) {
    return <Error />;
  }
}
