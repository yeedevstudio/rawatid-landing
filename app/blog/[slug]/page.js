import BlogDetail from "@/module/blog/components/BlogDetail";

export default async function Page({ params }) {
  const slug = params?.slug || {};

  if (!process.env.NEXT_PUBLIC_API_URL) {
    throw new Error("API URL is not defined in environment variables.");
  }

  try {
    const [postSlugRes, postAllRes, categoryAllRes, authorAllRes] =
      await Promise.all([
        fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/posts?filters[slug][$eq]=${slug}&populate=*`
        ),
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts?populate=*`),
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`),
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/authors?populate=*`),
      ]);

    const [postSlug, postAll, categoryAll, authorAll] = await Promise.all([
      postSlugRes.json(),
      postAllRes.json(),
      categoryAllRes.json(),
      authorAllRes.json(),
    ]);

    const dataSlug = postSlug.data?.[0] || null;

    if (!dataSlug) {
      return <div>Post not found</div>;
    }

    const dataAll = postAll.data || [];
    const dataCategories = categoryAll.data || [];
    const dataAuthorAll = authorAll.data || [];
    const dataAuthorFilter = dataAuthorAll.filter(
      (author) => author.id === dataSlug?.author?.id
    );

    const postByCategoryRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/posts?filters[category][id][$eq]=${dataSlug?.category?.id}&populate=*`
    );
    const dataPostByCategories = await postByCategoryRes.json();
    const dataPostCategory = dataPostByCategories.data || [];

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
    console.error("Error fetching data:", error);
    return <div>Failed to load data. Please try again later.</div>;
  }
}
