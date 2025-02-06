import Image from "next/image";
import React from "react";
import Link from "next/link";

// import components
import Tags from "./Tags";
import Authors from "./Authors";
import LinkPopuler from "./LinkPopuler";
import ContainerBlog from "@/common/components/ContainerBlog";
import ButtonCopy from "@/common/components/ButtonCopy";
import LinkArtikel from "@/module/blog/detail/LinkArtikel";
import RelatedArticle from "./RelatedArticle";
import ButtonBack from "@/common/components/ButtonBack";

export default function BlogDetail({ post, allPosts, author, postCategory }) {
  const usedCategories = new Set();
  return (
    <ContainerBlog aos="fade-up">
      <ButtonBack />
      <div className="flex items-center gap-2 md:gap-6">
        <Link
          href={`/blog/kategori/${post?.category?.slug}`}
          aria-label="kategori"
          className="text-sm md:text-sm text-white bg-green px-4 py-1 rounded-lg"
        >
          {post?.category?.name}
        </Link>
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
        <div className="relative rounded-2xl overflow-hidden h-[30vh] lg:h-[50vh] w-full mb-5 md:mb-10 lg:mb-12">
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
        <section className="grid grid-cols-1 lg:grid-cols-[60%_35%] gap-2 md:gap-12">
          <section className="w-full">
            {post?.content.map((block, index) => {
              const elements = [];

              switch (block.type) {
                case "heading": {
                  const HeadingTag = `h${block.level || 2}`;
                  elements.push(
                    <HeadingTag
                      key={`heading-${index}`}
                      className="mt-2 font-semibold text-lg md:text-xl lg:text-3xl"
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
                  break;
                }

                case "paragraph":
                  elements.push(
                    <p
                      key={`paragraph-${index}`}
                      className="text-justify text-sm/8 md:text-base/8 lg:text-lg/8"
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
                  break;

                case "list":
                  const ListTag = block.format === "ordered" ? "ol" : "ul";
                  elements.push(
                    <ListTag key={`list-${index}`} className="mt-2">
                      {block.children.map((listItem, idx) => (
                        <li key={`listItem-${index}-${idx}`} className="">
                          {listItem.children.map((child, cIdx) => {
                            const lines = child.text.split("\n");
                            return (
                              <div
                                key={`listItemChild-${index}-${cIdx}`}
                                className="mb-5"
                              >
                                {lines.map((line, lineIdx) => (
                                  <div
                                    className="mt-2 text-justify"
                                    key={`listItemLine-${index}-${lineIdx}`}
                                  >
                                    {lineIdx === 0 ? (
                                      <span className="font-medium text-base md:text-lg lg:text-xl">{`${
                                        idx + 1
                                      } . ${line}`}</span>
                                    ) : (
                                      <span className="ml-5 md:ml-7 text-sm/8 md:text-base/8 lg:text-lg/8">
                                        {line}
                                      </span>
                                    )}
                                    <br />
                                  </div>
                                ))}
                              </div>
                            );
                          })}
                        </li>
                      ))}
                    </ListTag>
                  );
                  break;

                case "image":
                  elements.push(
                    <div
                      key={`image-${index}`}
                      className="relative overflow-hidden border h-[40vh] rounded-sm"
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
                  break;

                case "quote":
                  elements.push(
                    <blockquote
                      key={`quote-${index}`}
                      className="italic text-neutral90 text-sm md:text-base lg:text-lg leading-loose"
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
                  break;

                case "code":
                  elements.push(
                    <div className="relative">
                      <pre
                        key={`code-${index}`}
                        className="pt-14 pb-4 bg-gray-800 text-white p-2 rounded overflow-x-auto text-sm md:text-base scrollbar-hide leading-loose"
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
                          text={block.children
                            .map((child) => child.text)
                            .join("\n")}
                        />
                      </pre>
                    </div>
                  );
                  break;

                default:
                  break;
              }

              if ((index + 1) % 6 === 0 && postCategory?.length > 0) {
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

              if (elements.length < 6 && postCategory?.length > 0) {
                const randomIndex = Math.floor(
                  Math.random() * postCategory.length
                );
                const selectedCategory = postCategory[randomIndex];

                elements.push(
                  <div
                    key="postCategory-bottom"
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

              return elements;
            })}

            <Tags post={post} />
          </section>
          <section className="w-full flex flex-col gap-2 md:gap-6">
            <LinkArtikel post={post} />
            <LinkPopuler blog={allPosts} />
          </section>
        </section>
        <Authors post={post} author={author} />
        <RelatedArticle blog={postCategory} />
      </article>
    </ContainerBlog>
  );
}
