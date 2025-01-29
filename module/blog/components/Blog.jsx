import React from "react";

// import components
import BlogHighlight from "./BlogHighlight";
import BlogAll from "./BlogAll";
import ContainerBlog from "@/common/components/ContainerBlog";
import BlogCategory from "./BlogCategory";

export default function BlogPage({ data }) {
  const dataBerita = data?.filter((item) => item?.category?.slug === "berita");
  const dataPelayanan = data?.filter(
    (item) => item?.category?.slug === "pelayanan"
  );
  const dataTeknologi = data?.filter(
    (item) => item?.category?.slug === "Teknologi"
  );

  return (
    <ContainerBlog>
      <BlogHighlight data={data} />
      <BlogAll data={data} />
      <BlogCategory data={dataBerita} category={dataBerita[0]?.category} />
      <BlogCategory
        data={dataPelayanan}
        category={dataPelayanan[0]?.category}
      />
      <BlogCategory
        data={dataTeknologi}
        category={dataTeknologi[0]?.category}
      />
    </ContainerBlog>
  );
}
