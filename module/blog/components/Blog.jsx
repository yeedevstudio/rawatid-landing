"use client";

import { useState } from "react";
import { IconSearch } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

// import components
import { Input } from "@/components/ui/input";
import BlogHighlight from "./BlogHighlight";
import BlogAll from "./BlogAll";
import ContainerBlog from "@/common/components/ContainerBlog";
import BlogCategory from "./BlogCategory";
import BlogCategoryFeaturedPair from "./BlogCategoryFeaturedPair";
import BlogInformasiObatPreview from "./BlogInformasiObatPreview";
import { toast } from "sonner";
import { startRouteLoading } from "@/common/utils/routeLoading";
import { CardArticleAll } from "@/common/components/CardArticle";
import InteractiveKontenSection from "@/module/home/components/InteractiveKontenSection";

const FEATURED_PAIR_SLUGS = new Set(["tenaga-kesehatan", "fasilitas-kesehatan"]);

const BLOG_SINGLE_CATEGORY_ORDER = ["kesehatan", "informasi-umum", "bioteknologi", "teknologi"];

function BlogCategoryIfPresent({ categories, slug }) {
  const list = Array.isArray(categories) ? categories : [];
  const category = list.find((c) => (typeof c?.slug === "string" ? c.slug.trim() : "") === slug);
  if (!category) return null;
  return <BlogCategory category={category} />;
}

export default function BlogPage({ data, categories }) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const [suggestion, setSuggestion] = useState("");

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length > 0) {
      const results = data?.filter((article) => article.title.toLowerCase().includes(query.toLowerCase()));
      setFilteredResults(results);

      const match = results?.[0];
      if (match) {
        const suggestionText = match.title.slice(query.length);
        setSuggestion(suggestionText);
      } else {
        setSuggestion("");
      }
    } else {
      setFilteredResults([]);
      setSuggestion("");
    }
  };

  const handlePush = () => {
    if (!searchQuery.trim()) {
      toast.error("Masukkan Kata Kunci", {
        duration: 3000,
        position: "top-right",
        style: { color: "green", border: "1px solid green" },
      });
    } else {
      startRouteLoading();
      router.push(`/blog/cari/${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleKeyDown = (e) => {
    const liveValue = e?.currentTarget?.value ?? searchQuery;
    const liveQuery = typeof liveValue === "string" ? liveValue.trim() : "";

    if (e.key === "Enter" && liveQuery !== "") {
      startRouteLoading();
      router.push(`/blog/cari/${encodeURIComponent(liveQuery)}`);
    }
    if (e.key === "ArrowRight" && suggestion) {
      setSearchQuery(searchQuery + suggestion);
      setSuggestion("");
    }
  };

  const getHighlightedText = (text, query) => {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, "gi");
    return text.split(regex).map((part, index) =>
      regex.test(part) ? (
        <span key={index} className="bg-green60 rounded-[2px]">
          {part}
        </span>
      ) : (
        part
      ),
    );
  };

  const isSearching = searchQuery.trim().length > 0;

  return (
    <ContainerBlog>
      <div className="mx-5 md:mx-20 my-20 relative h-12 ">
        <Input className="w-full h-12 pl-12 focus:pl-12 active:pl-12" placeholder="Cari Artikel" value={searchQuery} onChange={handleSearch} onKeyDown={handleKeyDown} />
        {suggestion && (
          <div className="absolute z-10 top-0 left-0 h-12 pl-[48.8px] pt-[1px] flex items-center pointer-events-none text-gray-200 text-sm md:text-lg max-w-xs md:max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
            {searchQuery}
            <span>{suggestion}</span>
          </div>
        )}
        <IconSearch onClick={handlePush} className="h-12 w-10 text-white bg-green hover:bg-greenHover p-2 absolute top-0 left-0 rounded-l-md transition-all duration-300 ease-in-out hover:cursor-pointer" />

        {filteredResults.length > 0 && (
          <ul className="absolute w-full bg-white border rounded-md shadow-md z-50 top-12">
            {filteredResults?.slice(0, 5)?.map((article) => (
              <li
                key={article?.id ?? article?.slug ?? article?.title}
                className="px-4 py-2 hover:bg-gray-200 cursor-pointer border-b text-xs/8 md:text-sm/8 lg:text-base/8"
                onClick={() => {
                  startRouteLoading();
                  router.push(`/blog/detail/${article?.slug}`);
                }}
              >
                {getHighlightedText(article.title, searchQuery)}
              </li>
            ))}
          </ul>
        )}
      </div>

      {isSearching ? (
        <section className="mx-5 md:mx-20 -mt-10 mb-10">
          <h2 className="text-sm md:text-lg lg:text-xl text-green font-medium">
            Hasil pencarian: <span className="font-semibold break-all">"{searchQuery.trim()}"</span>
          </h2>

          {filteredResults.length === 0 ? (
            <p className="mt-4 text-sm md:text-base text-neutral-600">Tidak ada artikel yang cocok.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4 py-6 transition-all duration-150 ease-in-out">
              {filteredResults.map((article, index) => (
                <div key={article?.slug || index} className={article?.span}>
                  <CardArticleAll
                    src={article?.thumbnail?.url}
                    alt={article?.thumbnail?.url}
                    category={article?.category?.name}
                    height={"h-[10rem] md:h-[12rem] lg:h-[10rem]"}
                    title={article?.title}
                    index={index}
                    selected={false}
                    onSelect={() => {
                      startRouteLoading();
                      router.push(`/blog/detail/${article?.slug}`);
                    }}
                    headline={article?.headline}
                  />
                </div>
              ))}
            </div>
          )}
        </section>
      ) : (
        <>
          <BlogHighlight data={data} />
          <BlogAll data={data} maxItems={9} />
          <BlogCategoryIfPresent categories={categories} slug="kesehatan" />
          <InteractiveKontenSection variant="blog" />
          <BlogCategoryIfPresent categories={categories} slug="informasi-umum" />
          <BlogCategoryFeaturedPair categories={categories} />
          <BlogCategoryIfPresent categories={categories} slug="bioteknologi" />
          <BlogInformasiObatPreview />
          <BlogCategoryIfPresent categories={categories} slug="teknologi" />
          {(categories || [])
            .filter((category) => {
              const slug = typeof category?.slug === "string" ? category.slug.trim() : "";
              if (!slug || FEATURED_PAIR_SLUGS.has(slug)) return false;
              return !BLOG_SINGLE_CATEGORY_ORDER.includes(slug);
            })
            .map((category) => (
              <BlogCategory key={category.id ?? category.slug} category={category} />
            ))}
        </>
      )}
    </ContainerBlog>
  );
}
