import React from "react";

// import components
import BlogHighlight from "./BlogHighlight";
import BlogAll from "./BlogAll";
import ContainerBlog from "@/common/components/ContainerBlog";

export default function BlogPage() {
  return (
    <ContainerBlog>
      <BlogHighlight />
      <BlogAll />
    </ContainerBlog>
  );
}
