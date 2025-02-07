import Error from "@/app/error";
import NotFound from "@/app/not-found";
import PageByAll from "@/module/blog/components/PageByAll";


export default async function Page({ searchParams }) {
  if (!process.env.API_URL) {
    throw new Error("API URL is not defined in environment variables.");
  }


  const currentPage = parseInt(searchParams?.page) || 1;
  const pageSize = 8;

  try {
    const res = await fetch(
      `${process.env.API_URL}/posts?populate=*&sort=updatedAt:desc&pagination[page]=${currentPage}&pagination[pageSize]=${pageSize}`,
      { cache: "no-store" }
    );

    if (!res.ok) throw new Error("Failed to fetch data");

    const postData = await res.json();
    const dataAll = postData.data || [];
    const pagination = postData.meta.pagination || {};

    if (!dataAll.length) return <NotFound />;

    return <PageByAll data={dataAll} pagination={pagination} />;
  } catch (error) {
    return <Error />;
  }
}
