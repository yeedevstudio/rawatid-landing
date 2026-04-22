"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { blogSubnavGroups, headerValueBlog } from "../constant/headerValue";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { IconChevronRight, IconMenu2 } from "@tabler/icons-react";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isSheetOpen, setSheetOpen] = useState(false);
  const router = usePathname();

  const handleClose = () => {
    setSheetOpen(false);
  };

  const blogNavLinkClassName = (isActive) => (isActive ? "text-sm md:text-lg text-green font-semibold transition-all duration-300 ease-in-out" : "text-sm md:text-lg text-gray-700 hover:text-green transition-all duration-300 ease-in-out");

  const activeBlogGroup = blogSubnavGroups?.find((g) => g.matchPrefixes?.some((p) => router.startsWith(p))) || null;

  const activeBlogSubItem = activeBlogGroup?.items?.find((it) => router === it.url || router.startsWith(`${it.url}/`));

  return (
    <div className="w-full">
      <header className="bg-white w-full h-[3.5rem] md:h-[5rem] px-5 md:px-12 flex items-center justify-between border-b border-black/5">
        <Link href="/" title="beranda">
          <Image src={"/images/logo.webp"} alt="logo" width={50} height={50} priority={true} quality={90} decoding="sync" />
        </Link>

        <nav className="hidden lg:flex items-center gap-16">
          <div className="flex gap-16">
            {headerValueBlog?.map((item, index) => {
              const isActive = item.url === "/" ? router === "/" : router === item.url || router.startsWith(`${item.url}/`);
              return (
                <Link href={item.url} key={index} itemProp="button">
                  <h2 className={blogNavLinkClassName(isActive)}>{item.title}</h2>
                </Link>
              );
            })}
          </div>
        </nav>

        <div className="flex lg:hidden">
          <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <button aria-label="Menu">
                <IconMenu2 className="w-8 h-8 text-green" role="button" />
              </button>
            </SheetTrigger>
            <SheetContent side="left">
              <Link title="Rawat.ID" href="/" onClick={handleClose} className={"flex items-center gap-1 px-1 mt-7"}>
                <Image src={"/images/logo.webp"} alt="logo" width={50} height={50} priority={true} quality={90} decoding="sync" />
                <SheetTitle className="text-green text-xl">Rawat.ID</SheetTitle>
              </Link>
              <nav className="px-4 mt-10">
                <ul className="flex flex-col gap-8">
                  {headerValueBlog?.map((item, index) => (
                    <Link itemProp="button" href={item.url} key={index} onClick={handleClose}>
                      <h2 className="text-base text-gray-800 hover:text-green transition-all duration-300 ease-in-out">{item.title}</h2>
                    </Link>
                  ))}

                  {activeBlogGroup?.items?.length ? (
                    <div className="pt-2 mt-2 border-t border-black/10">
                      <div className="text-sm font-semibold text-gray-500 mb-3">{activeBlogGroup.groupTitle}</div>
                      <div className="flex flex-col gap-5">
                        {activeBlogGroup.items.map((it) => (
                          <Link key={it.url} href={it.url} onClick={handleClose}>
                            <div className={router === it.url || router.startsWith(`${it.url}/`) ? "text-green font-semibold" : "text-gray-800 hover:text-green"}>{it.title}</div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </ul>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {activeBlogGroup ? (
        <div className="w-full bg-[#EBF6F9] border-b border-black/5">
          <div className="px-5 md:px-12 flex items-center gap-6">
            <div className="hidden md:flex items-center gap-3 min-w-[16rem]">
              <Link href={activeBlogGroup.groupUrl} className="text-gray-800 font-semibold hover:text-green transition-all">
                {activeBlogGroup.groupTitle}
              </Link>
              <IconChevronRight
                className="w-7 h-6 text-gray-500"
                aria-hidden="true"
                suppressHydrationWarning
              />
            </div>

            <nav className="flex items-stretch gap-8 md:gap-10 overflow-x-auto whitespace-nowrap">
              {activeBlogGroup.items.map((it) => {
                const isActive = router === it.url || router.startsWith(`${it.url}/`);
                return (
                  <Link key={it.url} href={it.url}>
                    <div
                      className={
                        isActive ? "flex items-center text-green font-semibold border-b-2 border-green px-1 py-3 md:py-4" : "flex items-center text-gray-800 hover:text-green transition-all px-1 py-3 md:py-4 border-b-2 border-transparent"
                      }
                    >
                      {it.title}
                    </div>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      ) : null}
    </div>
  );
}
