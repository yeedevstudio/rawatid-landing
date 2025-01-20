import Image from "next/image";
import React from "react";

import LinkPopuler from "./LinkPopuler";
import { cn } from "@/lib/utils";
import ContainerBlog from "@/common/components/ContainerBlog";
import ButtonCopy from "@/common/components/ButtonCopy";
import LinkArtikel from "@/module/blog/components/LinkArtikel";
import RelatedArticle from "./RelatedArticle";

export default function BlogDetail({
  post,
  allPosts,
  categories,
  author,
  postCategory,
}) {
  return (
    <ContainerBlog>
      <div className="flex items-center gap-2 md:gap-6">
        <button
          aria-label="category"
          className="text-sm md:text-base lg:text-lg border border-neutral50 p-1 px-2 rounded-lg hover:border-green hover:text-green transition-all duration-150 ease-in-out"
        >
          {post?.category?.name}
        </button>
        <span className="text-sm md:text-base lg:text-lg">
          {new Date(post?.updatedAt).toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}
        </span>
      </div>
      <article>
        <h1 className="py-6 text-xl md:text-2xl lg:text-3xl font-medium text-green tracking-wider">
          {post?.title}
        </h1>
        <div className="relative rounded-2xl overflow-hidden h-[50vh] w-full mb-20">
          <Image
            src={
              process.env.NEXT_PUBLIC_BASE_URL +
              post?.thumbnail?.formats?.thumbnail?.url
            }
            alt={post?.thumbnail?.formats?.thumbnail?.name}
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <section className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-6">
          <section className="col-span-2">
            {post?.content.map((block, index) => {
              switch (block.type) {
                case "heading": {
                  const HeadingTag = `h${block.level || 1}`;
                  return (
                    <HeadingTag
                      key={index}
                      className={cn(
                        "mt-2 font-semibold text-lg md:text-xl lg:text-2xl"
                      )}
                    >
                      {block.children.map((child, idx) => (
                        <React.Fragment key={idx}>
                          {child.text.split("\n").map((line, lineIdx) => (
                            <React.Fragment key={lineIdx}>
                              {line}
                              <br />
                            </React.Fragment>
                          ))}
                        </React.Fragment>
                      ))}
                    </HeadingTag>
                  );
                }

                case "paragraph":
                  return (
                    <p
                      key={index}
                      className="text-justify mt-2 text-sm md:text-base lg:text-lg"
                    >
                      {block.children.map((child, idx) => (
                        <React.Fragment key={idx}>
                          {child.text.split("\n").map((line, lineIdx) => (
                            <React.Fragment key={lineIdx}>
                              {line}
                              <br />
                            </React.Fragment>
                          ))}
                        </React.Fragment>
                      ))}
                    </p>
                  );

                case "list":
                  const ListTag = block.format === "ordered" ? "ol" : "ul";
                  return (
                    <ListTag key={index} className="mt-5">
                      {block.children.map((listItem, idx) => (
                        <li key={idx} className="">
                          {listItem.children.map((child, cIdx) => {
                            const lines = child.text.split("\n");
                            return (
                              <div key={cIdx}>
                                {lines.map((line, lineIdx) => (
                                  <React.Fragment key={lineIdx}>
                                    {lineIdx === 0 ? (
                                      <span className="font-medium text-base md:text-lg lg:text-xl">{`${
                                        idx + 1
                                      } . ${line}`}</span>
                                    ) : (
                                      <span className="block ml-7 text-justify text-sm md:text-base lg:text-lg">
                                        {line}
                                      </span>
                                    )}
                                    <br />
                                  </React.Fragment>
                                ))}
                              </div>
                            );
                          })}
                        </li>
                      ))}
                    </ListTag>
                  );

                case "image":
                  return (
                    <div
                      key={index}
                      className="mt-5 relative overflow-hidden border h-[40vh] rounded-sm"
                    >
                      <Image
                        src={
                          process.env.NEXT_PUBLIC_BASE_URL +
                          block.image?.formats?.thumbnail?.url
                        }
                        alt={block?.image?.formats?.thumbnail?.name}
                        fill
                        style={{ objectFit: "cover" }}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  );

                case "quote":
                  return (
                    <blockquote
                      key={index}
                      className="mt-5 italic text-neutral90 text-sm md:text-base lg:text-lg"
                    >
                      {block.children.map((child, idx) => (
                        <React.Fragment key={idx}>
                          {child.text.split("\n").map((line, lineIdx) => (
                            <React.Fragment key={lineIdx}>
                              " {line} "
                              <br />
                            </React.Fragment>
                          ))}
                        </React.Fragment>
                      ))}
                    </blockquote>
                  );

                case "code":
                  return (
                    <pre
                      key={index}
                      className="mt-5 bg-gray-800 text-white p-4 rounded overflow-x-auto text-sm md:text-base relative scrollbar-hide"
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
                        className="absolute right-5 top-5"
                        text={block.children
                          .map((child) => child.text)
                          .join("\n")}
                      />
                    </pre>
                  );

                default:
                  return null;
              }
            })}
            <section className="my-10">
              <h2 className="text-sm md:text-base lg:text-lg font-medium">
                Tags
              </h2>
              <div className="pt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-6">
                {categories?.map((data, index) => (
                  <button
                    key={index}
                    className="py-1 px-3 border rounded-md border-neutral50 text-sm md:text-base lg:text-lg"
                  >
                    # {data?.name}
                  </button>
                ))}
              </div>
            </section>
          </section>
          <section className="flex flex-col gap-2 md:gap-6">
            <LinkArtikel post={post} />
            <LinkPopuler blog={allPosts} />
          </section>
        </section>
        <section className="flex items-center gap-2 md:gap-6 rounded-2xl w-full border border-neutral50 p-6">
          <Image
            src={
              process.env.NEXT_PUBLIC_BASE_URL +
              author?.[0]?.avatar?.formats?.thumbnail?.url
            }
            alt={author?.[0]?.avatar?.formats?.thumbnail?.name}
            width={70}
            height={70}
            className="rounded-full h-[5rem] w-[5rem]"
          />

          <div>
            <h3 className="text-xs md:text-sm lg:text-base">Author</h3>
            <h2 className="text-sm md:text-base lg:text-lg font-medium">
              {post?.author?.name}
            </h2>
            <h3 className="text-xs md:text-sm lg:text-base">
              {post?.author?.job}
            </h3>
            <p className="text-neutral90 text-sm md:text-base lg:text-lg">
              {post?.author?.bio}
            </p>
          </div>
        </section>
        <section className="my-24">
          <RelatedArticle blog={postCategory} />
        </section>
      </article>
    </ContainerBlog>
  );
}
