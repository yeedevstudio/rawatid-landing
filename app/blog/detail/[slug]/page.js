import Error from "@/app/error";
import NotFound from "@/app/not-found";
import BlogDetail from "@/module/blog/detail/BlogDetail";

export async function generateMetadata({ params }) {
  const { slug } = params;

  if (!process.env.API_URL) {
    throw new Error("API URL is not defined in environment variables.");
  }

  try {
    const postSlugRes = await fetch(
      `${process.env.API_URL}/posts?filters[slug][$eq]=${slug}&populate=*`
    );
    const postSlug = await postSlugRes.json();
    const dataSlug = postSlug.data?.[0] || null;

    if (dataSlug) {
      return {
        title: `Rawat.ID - ${dataSlug?.title}`,
        description: dataSlug?.headline,
        alternates: {
          canonical: `${process.env.NEXT_PUBLIC_URL}/detail/${slug}`,
        },
        canonical: `${process.env.NEXT_PUBLIC_URL}/detail/${slug}`,
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
              url: process.env.NEXT_PUBLIC_BASE_URL + dataSlug?.thumbnail?.url,
              width: 800,
              height: 600,
            },
            {
              url: process.env.NEXT_PUBLIC_BASE_URL + dataSlug?.thumbnail?.url,
              width: 1200,
              height: 630,
            },
            {
              url: process.env.NEXT_PUBLIC_BASE_URL + dataSlug?.thumbnail?.url,
              width: 1600,
              height: 900,
            },
          ],
        },
      };
    }

    return {
      title: "Rawat.ID | Tidak Ditemukan",
      description: "The post you are looking for could not be found.",
    };
  } catch (error) {
    return {
      title: "Rawat.ID | Kesalahan",
      description: "An error occurred while fetching the blog post.",
    };
  }
}

export default async function Page({ params }) {
  const { slug } = params;

  if (!process.env.API_URL) {
    throw new Error("API URL is not defined in environment variables.");
  }

  try {
    const [postSlugRes, postAllRes, categoryAllRes, authorAllRes] =
      await Promise.all([
        fetch(
          `${process.env.API_URL}/posts?filters[slug][$eq]=${slug}&populate=*`
        ),
        fetch(`${process.env.API_URL}/posts?populate=*&sort=updatedAt:desc`),
        fetch(`${process.env.API_URL}/categories`),
        fetch(`${process.env.API_URL}/authors?populate=*`),
      ]);

    const [postSlug, postAll, categoryAll, authorAll] = await Promise.all([
      postSlugRes.json(),
      postAllRes.json(),
      categoryAllRes.json(),
      authorAllRes.json(),
    ]);

    const dataSlug = postSlug.data?.[0] || null;

    if (!dataSlug) {
      return <NotFound />;
    }

    const dataAll = postAll.data || [];
    const dataCategories = categoryAll.data || [];
    const dataAuthorAll = authorAll.data || [];
    const dataAuthorFilter = dataAuthorAll.filter(
      (author) => author.id === dataSlug?.author?.id
    );

    let dataPostCategory = [];

    if (dataSlug?.category?.id) {
      const postByCategoryRes = await fetch(
        `${process.env.API_URL}/posts?filters[category][id][$eq]=${dataSlug?.category?.id}&populate=*`
      );
      const dataPostByCategories = await postByCategoryRes.json();
      dataPostCategory = dataPostByCategories.data || [];
    }

    return (
      <BlogDetail
        post={dataSlug}
        allPosts={dataAll}
        categories={dataCategories}
        author={dataAuthorFilter}
        postCategory={dataPostCategory}
      />
    );
  } catch (error) {
    return <Error />;
  }
}
