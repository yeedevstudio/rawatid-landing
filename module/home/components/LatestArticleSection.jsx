import Link from "next/link";
import { CardArticleAll } from "@/common/components/CardArticle";

async function getLatestArticles() {
  if (!process.env.API_URL) return [];

  const res = await fetch(`${process.env.API_URL}/posts?populate=*&sort=updatedAt:desc&pagination[page]=1&pagination[pageSize]=3`, { cache: "no-store" });

  if (!res.ok) return [];
  const postData = await res.json();
  return postData?.data || [];
}

export default async function LatestArticleSection() {
  const data = await getLatestArticles();
  if (!data?.length) return null;

  return (
    <section className="w-full px-5 md:px-12 lg:px-20 xl:px-24 py-20 md:py-28">
      <div className="flex items-center justify-between">
        <h2 className="text-[24px] md:text-[28px] font-medium text-[#038F7A]">Artikel terbaru</h2>
        <Link href="/blog/semua" className="text-[14px] md:text-[16px] text-[#038F7A] underline underline-offset-4">
          Lihat Selengkapnya
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
        {data.map((article) => (
          <Link key={article?.slug} href={`/blog/detail/${article?.slug}`} className="block">
            <CardArticleAll
              src={article?.thumbnail?.formats?.small?.url || article?.thumbnail?.url}
              alt={article?.title || "Artikel Rawat.ID"}
              category={article?.category?.name || "Artikel"}
              title={article?.title || ""}
              height="h-[12rem] md:h-[14rem] lg:h-[14rem]"
              selected={false}
            />
          </Link>
        ))}
      </div>
    </section>
  );
}
