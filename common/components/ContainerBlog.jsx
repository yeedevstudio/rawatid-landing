import React from "react";

export default function ContainerBlog({ children, aos }) {
  return (
    <section data-aos={aos} className="mx-5 md:mx-[7rem] my-[3rem] md:my-[6rem]">
      {children}
    </section>
  );
}
