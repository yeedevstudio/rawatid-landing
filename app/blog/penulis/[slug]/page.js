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
      `${process.env.API_URL}/authors?populate=*&filters[slug][$eq]=${slug}`
    );
    const postSlug = await postSlugRes.json();
    const dataSlug = postSlug.data?.[0] || null;

    if (dataSlug) {
      return {
        title: `Penulis Rawat.ID- ${dataSlug?.name}`,
        canonical: `${process.env.NEXT_PUBLIC_URL}/penulis/${slug}`,
        openGraph: {
          canocical: process.env.NEXT_PUBLIC_URL + "/penulis/" + slug,
          siteName: "Rawat.ID",
          type: "website",
          images: [
            {
              url: process.env.NEXT_PUBLIC_BASE_URL + dataSlug?.avatar?.url,
              width: 800,
              height: 600,
            },
            {
              url: process.env.NEXT_PUBLIC_BASE_URL + dataSlug?.avatar?.url,
              width: 1200,
              height: 630,
            },
            {
              url: process.env.NEXT_PUBLIC_BASE_URL + dataSlug?.avatar?.url,
              width: 1600,
              height: 900,
            },
          ],
        },
      };
    }

    return {
      title: "Penulis Rawat.ID - Tidak Ditemukan",
      description: "The post you are looking for could not be found.",
    };
  } catch (error) {
    return {
      title: "Penulis Rawat.ID - Kesalahan",
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
    const [postSlugRes, postAllRes, authorAllRes] = await Promise.all([
      fetch(
        `${process.env.API_URL}/posts?populate=*&filters[author][slug][$eq]=${slug}`
      ),
      fetch(`${process.env.API_URL}/posts?populate=*&sort=updatedAt:desc&pagination[page]=1&pagination[pageSize]=10`),
      fetch(
        `${process.env.API_URL}//authors?populate=*&filters[slug][$eq]=${slug}`
      ),
    ]);

    const [postSlug, postAll, author] = await Promise.all([
      postSlugRes.json(),
      postAllRes.json(),
      authorAllRes.json(),
    ]);

    const dataSlug = postSlug.data || null;
    const dataAll = postAll.data || [];
    const dataAuthor = author.data?.[0] || null;

    if (!dataSlug) {
      return <NotFound />;
    }

    return (
      <PageBy
        data={dataSlug}
        post={dataAll}
        title={"Penulis"}
        author={dataAuthor}
        slug={dataSlug?.[0]?.author?.name}
      />
    );
  } catch (error) {
    return <Error />;
  }
}
