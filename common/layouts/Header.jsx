"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { headerValue } from "../constant/headerValue";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { IconMenu2, IconX } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const [isSheetOpen, setSheetOpen] = useState(false);

  const handleClose = () => {
    setSheetOpen(false);
  };

  return (
    <header className="bg-grayHeader w-full h-[4rem] md:h-[6rem] px-5 md:px-12 flex items-center justify-between">
      <Link href="/">
        <Image src={"/images/logo.svg"} alt="logo" width={40} height={40} />
      </Link>
      <nav className="hidden lg:flex items-center gap-20">
        <div className="flex gap-20 text-green">
          {headerValue?.map((item, index) => (
            <Link className="font-semibold text-sm md:text-lg bg-transparent" href={item.url} key={index}>
              {item.title}
            </Link>
          ))}
        </div>
        <Link href={"/register"}>
          <Button className="bg-green text-white text-sm md:text-lg font-semibold hover:bg-green shadow-none">
            Registrasi
          </Button>
        </Link>
      </nav>
      <div className="flex lg:hidden">
        <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger asChild>
            <IconMenu2 className="w-8 h-8 text-green" />
          </SheetTrigger>
          <SheetContent side="left">
            <Link
              href="/"
              onClick={handleClose}
              className={"flex items-center gap-3 px-4 mt-7"}
            >
              <Image
                src={"/images/logo.svg"}
                alt="logo"
                width={50}
                height={50}
              />
              <SheetTitle className="text-green text-2xl">Rawat.ID</SheetTitle>
            </Link>
            <nav className="px-4 mt-10">
              <ul className="flex flex-col gap-10 text-green">
                {headerValue?.map((item, index) => (
                  <Link href={item.url} key={index} onClick={handleClose}>
                    {item.title}
                  </Link>
                ))}
              </ul>
            </nav>
            <div className="mx-4 mt-10">
              <Button
                onClick={handleClose}
                className="bg-green text-white hover:bg-green shadow-none w-full"
              >
                <Link href="/register">Registrasi</Link>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
