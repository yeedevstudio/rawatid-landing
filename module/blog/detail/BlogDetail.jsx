"use client";

import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";

// import components
import Tags from "./Tags";
import Authors from "./Authors";
import LinkPopuler from "./LinkPopuler";
import ButtonCopy from "@/common/components/ButtonCopy";
import LinkArtikel from "@/module/blog/detail/LinkArtikel";
import RelatedArticle from "./RelatedArticle";
import ButtonBack from "@/common/components/ButtonBack";
import { Skeleton } from "@/components/ui/skeleton";

export default function BlogDetail({ post, allPosts, author, postCategory }) {
  const usedCategories = new Set();
  const [loading, setLoading] = useState(true);

  const imageUrl =
    process.env.NEXT_PUBLIC_BASE_URL +
    (post?.thumbnail?.formats?.large?.url ||
      post?.thumbnail?.formats?.medium?.url ||
      post?.thumbnail?.url);

  const renderedElements = post?.content?.flatMap((block, index) => {
    const elements = [];

    switch (block.type) {
      case "heading": {
        const HeadingTag = `h${block.level || 2}`;
        const headingSizes = {
          1: "text-xl md:text-2xl lg:text-3xl font-bold",
          2: "text-xl md:text-2xl lg:text-3xl font-semibold",
          3: "text-xl md:text-2xl lg:text-3xl font-medium",
          4: "text-lg md:text-xl lg:text-2xl font-medium",
          5: "text-lg md:text-xl lg:text-2xl font-light",
          6: "text-base md:text-lg lg:text-xl font-light",
        };

        elements.push(
          <HeadingTag
            key={`heading-${index}`}
            className={`${index === 0 ? "mt-0" : "mt-10"} ${
              headingSizes[block.level] || "text-xl"
            }`}
          >
            {block?.children?.map((child, idx) => (
              <React.Fragment key={idx}>
                {child.type === "link" ? (
                  <a
                    href={child.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    {child.children?.map((linkChild, linkIdx) => (
                      <React.Fragment key={linkIdx}>
                        {linkChild.text || ""}
                      </React.Fragment>
                    ))}
                  </a>
                ) : child.text ? (
                  child.text.split("\n").map((line, lineIdx, arr) => (
                    <React.Fragment key={`${idx}-${lineIdx}`}>
                      <span
                        className={`${child.bold ? "font-bold" : ""} ${
                          child.italic ? "italic" : ""
                        } ${child.underline ? "underline" : ""}`}
                      >
                        {line}
                      </span>
                      {lineIdx < arr.length - 1 && <br />}
                    </React.Fragment>
                  ))
                ) : null}
              </React.Fragment>
            ))}
          </HeadingTag>
        );
        break;
      }

      case "paragraph":
        elements.push(
          <p
            key={`paragraph-${index}`}
            className={`text-justify text-sm/8 md:text-base/8 lg:text-lg/8 ${
              index === 0 ? "mt-0" : "mt-5 md:mt-10"
            }`}
          >
            {block.children.map((child, idx) => (
              <React.Fragment key={idx}>
                {child.type === "link" && child.children ? (
                  <a
                    href={child.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    {child.children.map((linkChild, linkIdx) => (
                      <React.Fragment key={linkIdx}>
                        {linkChild.text || ""}
                      </React.Fragment>
                    ))}
                  </a>
                ) : (
                  child.text &&
                  child.text.split("\n").map((line, lineIdx, arr) => (
                    <React.Fragment key={`${idx}-${lineIdx}`}>
                      <span
                        className={`${child.bold ? "font-bold" : ""} 
                                    ${child.italic ? "italic" : ""} 
                                    ${child.underline ? "underline" : ""}`}
                      >
                        {line}
                      </span>
                      {lineIdx < arr.length - 1 && <br />}
                    </React.Fragment>
                  ))
                )}
              </React.Fragment>
            ))}
          </p>
        );
        break;

      case "list":
        const ListTag = block.format === "ordered" ? "ol" : "ul";
        elements.push(
          <ListTag
            key={`list-${index}`}
            className={`list-decimal md:list-outside ${
              index === 0 ? "mt-0" : "mt-5 md:mt-10"
            }`}
          >
            {block.children.map((listItem, idx) => (
              <li
                key={`listItem-${index}-${idx}`}
                className="flex mt-5 text-justify"
              >
                {block.format === "ordered" ? (
                  <span className="mt-0.2 md:mt-0 text-sm/8 md:text-base/8 lg:text-lg/8 mr-2">
                    {idx + 1}.
                  </span>
                ) : (
                  <span className="mt-1 md:mt-0 font-medium text-base md:text-lg lg:text-xl mr-2">
                    •
                  </span>
                )}

                <div>
                  {listItem.children.map((child, cIdx) => {
                    if (!child.text && child.type !== "link") return null;

                    if (child.type === "link" && child.children?.[0]?.text) {
                      return (
                        <a
                          key={`listItemChild-${index}-${cIdx}`}
                          href={child.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline text-blue-500 break-all"
                        >
                          {child.children[0].text}
                        </a>
                      );
                    }

                    return (
                      <span
                        key={`listItemChild-${index}-${cIdx}`}
                        className="text-justify"
                      >
                        {child.text.split("\n").map((line, lineIdx, arr) => (
                          <React.Fragment key={`${cIdx}-${lineIdx}`}>
                            <span
                              className={`text-sm/8 md:text-base/8 lg:text-lg/8 text-justify ${
                                child.bold ? "font-bold" : ""
                              } ${child.italic ? "italic" : ""} ${
                                child.underline ? "underline" : ""
                              }`}
                            >
                              {line}
                            </span>
                            {lineIdx < arr.length - 1 && <br />}
                          </React.Fragment>
                        ))}
                      </span>
                    );
                  })}
                </div>
              </li>
            ))}
          </ListTag>
        );
        break;

      case "image":
        elements.push(
          <div
            key={`image-${index}`}
            className={`relative overflow-hidden rounded-sm ${
              index === 0 ? "mt-0" : "mt-5 md:mt-10"
            }`}
          >
            <Image
              src={
                process.env.NEXT_PUBLIC_BASE_URL +
                (block.image?.formats?.large?.url ||
                  block.image?.formats?.medium?.url ||
                  block.image?.formats?.small?.url ||
                  block.image?.thumbnail?.url)
              }
              alt={block?.image?.name}
              height={post?.thumbnail?.height}
              width={post?.thumbnail?.width}
              style={{ objectFit: "cover" }}
            />
            {block?.image?.caption && (
              <span className="mt-2 block text-xs italic">
                Sumber : {block?.image?.caption}
              </span>
            )}
          </div>
        );
        break;

      case "quote":
        elements.push(
          <blockquote
            key={`quote-${index}`}
            className={`italic text-neutral-900 text-sm md:text-base lg:text-lg leading-loose text-justify ${
              index === 0 ? "mt-0" : "mt-5 md:mt-10"
            }`}
          >
            {block.children.map((child, idx) => (
              <React.Fragment key={idx}>
                {child.text.split("\n").map((line, lineIdx, arr) => (
                  <React.Fragment key={`${idx}-${lineIdx}`}>
                    {lineIdx === 0 && "“"} <span>{line}</span>
                    {lineIdx < arr.length - 1 ? <br /> : "”"}
                  </React.Fragment>
                ))}
              </React.Fragment>
            ))}
          </blockquote>
        );
        break;

      case "code":
        elements.push(
          <div className="relative">
            <pre
              key={`code-${index}`}
              className={`pt-14 pb-4 bg-gray-800 text-white p-2 rounded overflow-x-auto text-sm md:text-base scrollbar-hide leading-loose ${
                index === 0 ? "mt-0" : "mt-5 md:mt-10"
              }`}
            >
              <code>
                {block.children.map((child, idx) => (
                  <React.Fragment key={idx}>
                    {child.text}
                    <br />
                  </React.Fragment>
                ))}
              </code>
              <ButtonCopy
                className="absolute right-1 top-2 md:right-5 md:top-5"
                text={block.children.map((child) => child.text).join("\n")}
              />
            </pre>
          </div>
        );
        break;

      default:
        break;
    }

    if ((index + 1) % 12 === 0 && postCategory?.length > 0) {
      let randomIndex;

      do {
        randomIndex = Math.floor(Math.random() * postCategory.length);
      } while (
        usedCategories.has(randomIndex) &&
        usedCategories.size < postCategory.length
      );

      usedCategories.add(randomIndex);

      const selectedCategory = postCategory[randomIndex];
      elements.push(
        <div
          key={`postCategory-${index}`}
          className="w-full py-3 px-5 my-10 rounded-lg bg-green text-white"
        >
          <h3 className="text-sm md:text-base lg:text-base">
            Baca Juga :
            <Link
              href={`/blog/detail/${selectedCategory?.slug}`}
              className="underline ml-2"
            >
              {selectedCategory?.title}
            </Link>
          </h3>
        </div>
      );
    }

    return elements;
  });

  if (renderedElements.length < 6 && postCategory?.length > 0) {
    const randomIndex = Math.floor(Math.random() * postCategory.length);
    const selectedCategory = postCategory[randomIndex];

    renderedElements.push(
      <div
        key={`postCategory-end-${Date.now()}`}
        className="w-full py-3 px-5 my-5 rounded-lg bg-green text-white"
      >
        <h3 className="text-sm md:text-base lg:text-base">
          Baca Juga :
          <Link
            href={`/blog/detail/${selectedCategory?.slug}`}
            className="underline ml-2"
          >
            {selectedCategory?.title}
          </Link>
        </h3>
      </div>
    );
  }

  return (
    <div className="mx-5 md:mx-[4rem] lg:mx-[7rem] my-[2rem]" aos="fade-up">
      <ButtonBack />
      <div className="flex items-center gap-2 md:gap-6">
        <Link
          itemProp="kategori"
          href={`/blog/kategori/${post?.category?.slug}`}
          title="kategori"
          className="text-sm md:text-sm text-white bg-green px-4 py-1 rounded-lg"
        >
          {post?.category?.name}
        </Link>
        <span
          itemProp="datePublished"
          className="text-xs md:text-sm text-muted-foreground"
        >
          {new Date(post?.updatedAt).toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}
        </span>
      </div>
      <article>
        <h1 className="py-6 text-xl md:text-2xl lg:text-3xl font-semibold text-green tracking-wider">
          {post?.title}
        </h1>
        <div className="relative rounded-2xl overflow-hidden w-full mb-5 lg:mb-10 ">
          {loading && (
            <Skeleton className="w-full h-[18rem] md:h-[20rem] lg:h-[22rem] rounded-xl " />
          )}

          {imageUrl && (
            <Image
              src={imageUrl}
              height={post?.thumbnail?.formats?.small?.height}
              width={10000}
              alt={post?.thumbnail?.formats?.thumbnail?.name || "Post Image"}
              className={`w-full h-auto transition-opacity duration-500 ${
                loading ? "opacity-0" : "opacity-100"
              }`}
              onLoadingComplete={() => setLoading(false)}
            />
          )}
        </div>
        <section className="grid grid-cols-1 lg:grid-cols-[60%_35%] gap-2 md:gap-12 relative overflow-visible min-h-screen">
          <section className="w-full">
            {renderedElements}
            <Tags post={post} />
          </section>
          <aside className="w-full flex flex-col gap-2 md:gap-6 sticky top-2 h-fit">
            <LinkArtikel post={post} />
            <LinkPopuler blog={allPosts} />
          </aside>
        </section>
        <Authors post={post} author={author} />
        <RelatedArticle blog={postCategory} />
      </article>
    </div>
  );
}
