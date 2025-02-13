export default async function sitemap() {
  try {
    const [postsRes, categoriesRes, authorsRes] = await Promise.all([
      fetch(`${process.env.API_URL}/posts?populate=*&sort=updatedAt:desc`, {
        next: { revalidate: 60 },
      }),
      fetch(`${process.env.API_URL}/categories`, { next: { revalidate: 60 } }),
      fetch(`${process.env.API_URL}/authors?populate=*`, {
        next: { revalidate: 60 },
      }),
    ]);

    if (!postsRes.ok || !categoriesRes.ok || !authorsRes.ok) {
      console.error("Failed to fetch data");
      return [];
    }

    const [{ data: posts }, { data: categories }, { data: authors }] =
      await Promise.all([
        postsRes.json(),
        categoriesRes.json(),
        authorsRes.json(),
      ]);

    return [
      {
        url: "https://rawat.id",
        lastModified: new Date().toISOString(),
        changeFrequency: "monthly",
        priority: 1,
      },
      {
        url: "https://rawat.id/fitur",
        lastModified: new Date().toISOString(),
        changeFrequency: "monthly",
        priority: 0.8,
      },
      {
        url: "https://rawat.id/register",
        lastModified: new Date().toISOString(),
        changeFrequency: "weekly",
        priority: 0.8,
      },
      {
        url: "https://rawat.id/blog",
        lastModified: new Date().toISOString(),
        changeFrequency: "daily",
        priority: 1,
      },
      {
        url: "https://rawat.id/blog/semua",
        lastModified: new Date().toISOString(),
        changeFrequency: "daily",
        priority: 0.8,
      },
      {
        url: "https://rawat.id/blog/cari/",
        lastModified: new Date().toISOString(),
        changeFrequency: "daily",
        priority: 0.6,
      },
      ...categories.map((category) => ({
        url: `https://rawat.id/blog/kategori/${category?.slug}`,
        lastModified: new Date().toISOString(),
        changeFrequency: "daily",
        priority: 0.6,
      })),
      ...authors.map((author) => ({
        url: `https://rawat.id/blog/penulis/${author?.slug}`,
        lastModified: new Date().toISOString(),
        changeFrequency: "daily",
        priority: 0.6,
        images: [
          {
            loc: author?.avatar?.url
              ? `https://blog.rawat.id${author.avatar.url}`
              : "https://res.cloudinary.com/ddugt5n5v/image/upload/v1737400229/RawatID02_q8ouek.png",
            title: `Penulis Rawat.ID - ${author?.name}`,
          },
        ],
      })),
      ...posts.map((post) => ({
        url: `https://rawat.id/blog/detail/${post?.slug}`,
        lastModified: new Date(post?.updatedAt).toISOString(),
        changeFrequency: "daily",
        priority: 1,
        images: [
          {
            loc: post?.thumbnail?.url
              ? `https://blog.rawat.id${post.thumbnail.url}`
              : "https://res.cloudinary.com/ddugt5n5v/image/upload/v1737400229/RawatID02_q8ouek.png",
            title: `Penulis Rawat.ID - ${post?.title}`,
          },
        ],
      })),
    ];
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}
