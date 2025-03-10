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
import { toast } from "sonner";

export default function BlogPage({ data, categories }) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const [suggestion, setSuggestion] = useState("");

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length > 0) {
      const results = data?.filter((article) =>
        article.title.toLowerCase().includes(query.toLowerCase())
      );
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
      router.push(`/blog/cari/${searchQuery}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && searchQuery.trim() !== "") {
      router.push(`/blog/cari/${encodeURIComponent(searchQuery)}`);
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
      )
    );
  };

  const hasData = categories.some((category) =>
    data?.some((item) => item?.category?.slug === category.slug)
  );

  return (
    <ContainerBlog>
      <div className="mx-5 md:mx-20 my-20 relative h-12 ">
        <Input
          className="w-full h-12 pl-12 focus:pl-12 active:pl-12"
          placeholder="Cari Artikel"
          value={searchQuery}
          onChange={handleSearch}
          onKeyDown={handleKeyDown}
        />
        {suggestion && (
          <div className="absolute z-10 top-0 left-0 h-12 pl-[48.8px] pt-[1px] flex items-center pointer-events-none text-gray-200 text-sm md:text-lg max-w-xs md:max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
            {searchQuery}
            <span>{suggestion}</span>
          </div>
        )}
        <IconSearch
          onClick={handlePush}
          className="h-12 w-10 text-white bg-green hover:bg-greenHover p-2 absolute top-0 left-0 rounded-l-md transition-all duration-300 ease-in-out hover:cursor-pointer"
        />

        {filteredResults.length > 0 && (
          <ul className="absolute w-full bg-white border rounded-md shadow-md z-50 top-12">
            {filteredResults?.slice(0, 5)?.map((article) => (
              <li
                key={article.id}
                className="px-4 py-2 hover:bg-gray-200 cursor-pointer border-b text-xs/8 md:text-sm/8 lg:text-base/8"
                onClick={() =>
                  router.push(`/blog/cari/${encodeURIComponent(article.title)}`)
                }
              >
                {getHighlightedText(article.title, searchQuery)}
              </li>
            ))}
          </ul>
        )}
      </div>

      <>
        <BlogHighlight data={data} />
        <BlogAll data={data} />
        <div>
          {hasData &&
            categories.map((category) => {
              const filteredData = data?.filter(
                (item) => item?.category?.slug === category.slug
              );

              if (!filteredData || filteredData.length === 0) {
                return null;
              }

              return (
                <BlogCategory
                  key={category.id}
                  data={filteredData}
                  category={category}
                />
              );
            })}
        </div>
      </>
    </ContainerBlog>
  );
}
