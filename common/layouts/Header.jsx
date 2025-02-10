"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { headerValue, headerValueBlog } from "../constant/headerValue";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { IconMenu2 } from "@tabler/icons-react";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isSheetOpen, setSheetOpen] = useState(false);
  const router = usePathname();
  const pageName = router.split("/")[1];

  const blogPage = pageName === "blog" || router.startsWith("/blog/");

  const handleClose = () => {
    setSheetOpen(false);
  };

  return (
    <>
      {!blogPage ? (
        <header className="bg-grayHeader w-full h-[3.5rem] md:h-[5rem] px-5 md:px-12 flex items-center justify-between">
          <Link href="/" title="Rawat.ID">
            <Image
              src={"/images/logo.webp"}
              alt="logo"
              width={50}
              height={50}
              priority={true}
              quality={90}
              decoding="sync"
            />
          </Link>
          <nav className="hidden lg:flex items-center gap-20">
            <div className="flex gap-20 ">
              {headerValue?.map((item, index) => (
                <Link href={item.url} key={index} itemProp="button">
                  <h2 className="text-sm md:text-lg text-green hover:text-greenHover transition-all duration-300 ease-in-out">
                    {item.title}
                  </h2>
                </Link>
              ))}
            </div>
            <Link href={"/register"} itemProp="button" passHref>
              <Button
                className="bg-green text-white text-sm md:text-lg  hover:bg-greenHover shadow-none transition-all duration-300 ease-in-out"
                aria-label="Registrasi Sekarang"
              >
                Registrasi EMR
              </Button>
            </Link>
          </nav>
          <div className="flex lg:hidden">
            <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
              <SheetTrigger asChild>
                <button aria-label="Menu">
                  <IconMenu2
                    className="w-8 h-8 text-green"
                    role="button"
                    tabIndex="0"
                  />
                </button>
              </SheetTrigger>
              <SheetContent side="left">
                <Link
                  title="Rawat.ID"
                  href="/"
                  onClick={handleClose}
                  className={"flex items-center gap-3 px-4 mt-7"}
                >
                  <Image
                    src={"/images/logo.webp"}
                    alt="logo"
                    width={50}
                    height={50}
                    priority={true}
                    quality={90}
                    decoding="sync"
                  />
                  <SheetTitle className="text-green text-2xl">
                    Rawat.ID
                  </SheetTitle>
                </Link>
                <nav className="px-4 mt-10">
                  <ul className="flex flex-col gap-10">
                    {headerValue?.map((item, index) => (
                      <Link
                        itemProp="button"
                        href={item.url}
                        key={index}
                        onClick={handleClose}
                      >
                        <h2 className="text-sm md:text-lg text-green hover:text-greenHover transition-all duration-300 ease-in-out">
                          {item.title}
                        </h2>
                      </Link>
                    ))}
                  </ul>
                </nav>
                <div className="mx-4 mt-10">
                  <Link href="/register" passHref itemProp="button">
                    <Button
                      onClick={handleClose}
                      className="bg-green text-white hover:bg-greenHover shadow-none w-full transition-all duration-300 ease-in-out"
                      aria-label="Registrasi Sekarang"
                    >
                      Registrasi EMR
                    </Button>
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </header>
      ) : (
        <header className="bg-grayHeader w-full h-[3.5rem] md:h-[5rem] px-5 md:px-12 flex items-center justify-between">
          <Link href="/" title="beranda">
            <Image
              src={"/images/logo.webp"}
              alt="logo"
              width={50}
              height={50}
              priority={true}
              quality={90}
              decoding="sync"
            />
          </Link>
          <nav className="hidden lg:flex items-center gap-20">
            <div className="flex gap-20">
              {headerValueBlog?.map((item, index) => (
                <Link href={item.url} key={index} itemProp="button">
                  <h2 className="text-sm md:text-lg text-green hover:text-greenHover transition-all duration-300 ease-in-out">
                    {item.title}
                  </h2>
                </Link>
              ))}
            </div>
            <Link href={"/register"} itemProp="button">
              <Button
                className="bg-green text-white text-sm md:text-lg hover:bg-greenHover shadow-none transition-all duration-300 ease-in-out"
                aria-label="Registrasi Sekarang"
              >
                Registrasi EMR
              </Button>
            </Link>
          </nav>
          <div className="flex lg:hidden">
            <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
              <SheetTrigger asChild>
                <button aria-label="Menu">
                  <IconMenu2
                    className="w-8 h-8 text-green"
                    role="button"
                    tabIndex="0"
                  />
                </button>
              </SheetTrigger>
              <SheetContent side="left">
                <Link
                  title="Blog Rawat.ID"
                  href="/"
                  onClick={handleClose}
                  className={"flex items-center gap-1 px-1 mt-7"}
                >
                  <Image
                    src={"/images/logo.webp"}
                    alt="logo"
                    width={50}
                    height={50}
                    priority={true}
                    quality={90}
                    decoding="sync"
                  />
                  <SheetTitle className="text-green text-xl">
                    Blog Rawat.ID
                  </SheetTitle>
                </Link>
                <nav className="px-4 mt-10">
                  <ul className="flex flex-col gap-10">
                    {headerValueBlog?.map((item, index) => (
                      <Link
                        itemProp="button"
                        href={item.url}
                        key={index}
                        onClick={handleClose}
                      >
                        <h2 className="text-sm md:text-lg text-green hover:text-greenHover transition-all duration-300 ease-in-out">
                          {item.title}
                        </h2>
                      </Link>
                    ))}
                  </ul>
                </nav>
                <div className="mx-4 mt-10">
                  <Link href="/register" passHref itemProp="button">
                    <Button
                      onClick={handleClose}
                      className="bg-green text-white hover:bg-greenHover shadow-none w-full transition-all duration-300 ease-in-out"
                      aria-label="Registrasi Sekarang"
                    >
                      Registrasi EMR
                    </Button>
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </header>
      )}
    </>
  );
}
