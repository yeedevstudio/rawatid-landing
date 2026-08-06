import Error from "@/app/error";
import NotFound from "@/app/not-found";
import { POST_LIST_QUERY } from "@/common/constant/blogQuery";
import PageBy from "@/module/blog/components/PageBy";
import { BLOG_REVALIDATE } from "@/common/constant/revalidate";

export async function generateMetadata({ params }) {
  const { slug = "" } = await params;

  if (!process.env.API_URL) {
    throw new Error("API URL is not defined in environment variables.");
  }

  try {
    const postSlugRes = await fetch(
      `${process.env.API_URL}/posts?${POST_LIST_QUERY}&filters[tags][slug][$eq]=${slug}`,
      {
        next: { revalidate: BLOG_REVALIDATE },
      }
    );
    const postSlug = await postSlugRes.json();
    const dataSlug = postSlug.data?.[0] || null;

    if (dataSlug) {
      return {
        title: `Tag Rawat.ID - ${slug}`,
        alternates: {
          canonical: `${process.env.NEXT_PUBLIC_URL}/tag/${slug}`,
        },
      };
    }

    return {
      title: "Tag Rawat.ID - Tidak Ditemukan",
      description: "The post you are looking for could not be found.",
    };
  } catch (error) {
    return {
      title: "Tag Rawat.ID - Kesalahan",
      description: "An error occurred while fetching the blog post.",
    };
  }
}

export default async function Page({ params }) {
  const { slug = "" } = await params;

  if (!process.env.API_URL) {
    throw new Error("API URL is not defined in environment variables.");
  }

  try {
    const [postSlugRes, postAllRes] = await Promise.all([
      fetch(
        `${process.env.API_URL}/posts?${POST_LIST_QUERY}&sort=updatedAt:desc&filters[tags][slug][$eq]=${slug}`,
        { next: { revalidate: BLOG_REVALIDATE } }
      ),
      fetch(
        `${process.env.API_URL}/posts?${POST_LIST_QUERY}&sort=updatedAt:desc&pagination[page]=1&pagination[pageSize]=10`,
        {
          next: { revalidate: BLOG_REVALIDATE },
        }
      ),
    ]);

    const [postSlug, postAll] = await Promise.all([
      postSlugRes.json(),
      postAllRes.json(),
    ]);

    const dataSlug = postSlug.data || null;
    const dataAll = postAll.data || [];

    let filteredTags = null;
    if (dataSlug.length !== 0) {
      filteredTags =
        dataSlug?.[0]?.tags?.filter((tag) => tag.slug === slug) || [];
    }

    if (!dataSlug) {
      return <NotFound />;
    }

    return (
      <PageBy
        data={dataSlug}
        post={dataAll}
        slug={filteredTags?.[0]?.name}
        title={"Tag"}
      />
    );
  } catch (error) {
    return <Error />;
  }
}
