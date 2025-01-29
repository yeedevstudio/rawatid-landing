import PageTags from "@/module/blog/Tags/PageTags";

export async function generateMetadata({ params }) {
  const slug = params?.slug || "";

  if (!process.env.API_URL) {
    throw new Error("API URL is not defined in environment variables.");
  }

  try {
    const postSlugRes = await fetch(
      `${process.env.API_URL}/posts?populate=*&filters[tags][slug][$eq]=${slug}`
    );
    const postSlug = await postSlugRes.json();
    const dataSlug = postSlug.data?.[0] || null;

    if (dataSlug) {
      return {
        title: `Tags | ${slug}`,
        description: dataSlug?.headline,
        canonical: `${process.env.NEXT_PUBLIC_URL}/author/${slug}`,
        openGraph: {
          article: {
            publishedTime: dataSlug?.publishedAt,
            modifiedTime: dataSlug?.publishedAt,
            authors: [dataSlug?.author?.name, dataSlug?.author?.job],
          },
          title: dataSlug?.title,
          description: dataSlug?.headline,
          type: "article",
          images: [
            {
              url: dataSlug?.thumbnail?.url,
              width: 800,
              height: 600,
            },
            {
              url: dataSlug?.thumbnail?.url,
              width: 1200,
              height: 630,
            },
            {
              url: dataSlug?.thumbnail?.url,
              width: 1600,
              height: 900,
            },
          ],
        },
      };
    }

    return {
      title: "Rawat ID | Not Found",
      description: "The post you are looking for could not be found.",
    };
  } catch (error) {
    console.error("Error generating metadata:", error);

    return {
      title: "Rawat ID | Error",
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
        `${process.env.API_URL}/posts?populate=*&filters[tags][slug][$eq]=${slug}`
      ),
      fetch(`${process.env.API_URL}/posts?populate=*&sort=updatedAt:desc`),
    ]);

    const [postSlug, postAll] = await Promise.all([
      postSlugRes.json(),
      postAllRes.json(),
    ]);

    const dataSlug = postSlug.data || null;
    const dataAll = postAll.data || [];

    if (!dataSlug) {
      return <div>Post not found</div>;
    }

    return <PageTags data={dataSlug} post={dataAll} slug={slug} />;
  } catch (error) {
    return <div>Failed to load data. Please try again later.</div>;
  }
}
