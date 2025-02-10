"use client";

import { useState } from "react";
import { IconSearch } from "@tabler/icons-react";

// import components
import { Input } from "@/components/ui/input";
import BlogHighlight from "./BlogHighlight";
import BlogAll from "./BlogAll";
import ContainerBlog from "@/common/components/ContainerBlog";
import BlogCategory from "./BlogCategory";
import PageBySearch from "./PageBySearch";

export default function BlogPage({ data }) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = data?.filter((item) =>
    item?.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const dataKesehatan = data?.filter(
    (item) => item?.category?.slug === "kesehatan"
  );
  const dataBerita = data?.filter((item) => item?.category?.slug === "berita");
  const dataInformasi = data?.filter(
    (item) => item?.category?.slug === "informasi-umum"
  );
  const dataTeknologi = data?.filter(
    (item) => item?.category?.slug === "teknologi"
  );

  return (
    <ContainerBlog>
      <div className="mx-5 md:mx-20 my-20 relative h-12 ">
        <Input
          className="w-full h-12 pl-12 focus:pl-12 active:pl-12"
          placeholder="Cari Artikel"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <IconSearch className="h-12 w-10 text-white bg-green p-2 absolute top-0 left-0 rounded-l-md" />
      </div>
      {searchQuery && filteredData?.length > 0 ? (
        <PageBySearch data={filteredData} />
      ) : (
        <>
          <BlogHighlight data={data} />
          <BlogAll data={data} />
          <BlogCategory
            data={dataKesehatan}
            category={dataKesehatan[0]?.category}
          />
          <BlogCategory
            data={dataTeknologi}
            category={dataTeknologi[0]?.category}
          />
          <BlogCategory data={dataBerita} category={dataBerita[0]?.category} />
          <BlogCategory
            data={dataInformasi}
            category={dataInformasi[0]?.category}
          />
        </>
      )}
    </ContainerBlog>
  );
}
