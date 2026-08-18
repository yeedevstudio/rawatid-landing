"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Phone, Mail } from "lucide-react";
import { footerColumns, footerLegalLinks } from "../constant/footerValue";

const Footer = () => {
  const date = new Date().getFullYear();

  return (
    <footer className="flex flex-col bg-green">
      <div>
        <nav className="flex flex-col md:flex-row md:flex-nowrap justify-between gap-8 px-5 md:px-12 py-10">
          <div className="flex flex-col justify-between md:max-w-[260px] md:min-h-[280px]">
            <Link
              href="/"
              prefetch={false}
              className="flex flex-col justify-start items-start gap-6 cursor-pointer scroll-smooth"
              itemProp="button"
            >
              <Image
                src="/images/logo.webp"
                alt="logo"
                width={48}
                height={48}
                className="object-contain bg-white p-1 rounded-full"
              />
              <h2 className="text-base md:text-lg text-white">
                Memberikan solusi dan informasi terbaik untuk merawat kesehatanmu
              </h2>
            </Link>

            <div className="flex flex-col gap-3 mt-10 md:mt-0">
              <a
                href="tel:0881-1998-854"
                className="flex items-center gap-2 text-sm md:text-base text-white/90 hover:text-white transition-colors"
              >
                <Phone size={16} className="shrink-0" />
                <span>0881-1998-854</span>
              </a>
              <a
                href="mailto:halo@rawat.id"
                className="flex items-center gap-2 text-sm md:text-base text-white/90 hover:text-white transition-colors"
              >
                <Mail size={16} className="shrink-0" />
                <span>halo@rawat.id</span>
              </a>
            </div>
          </div>

          <div className="mt-6 md:mt-0 flex-1 min-w-0 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 lg:gap-16 items-start">
            {footerColumns?.map((col) => (
              <div key={col?.title} className="flex flex-col gap-4 text-base min-w-0">
                <h2 className="text-lg md:text-xl font-semibold text-white whitespace-pre-line leading-snug mb-3">
                  {col?.title}
                </h2>
                {col?.links.map((item) => (
                  item?.url ? (
                    <Link
                      passHref
                      href={item?.url}
                      className="text-sm md:text-lg font-normal text-white/90 hover:text-white transition-colors"
                      key={`${col?.title}-${item?.title}`}
                      itemProp="button"
                      target={
                        typeof item?.url === "string" &&
                        (item.url.startsWith("http://") ||
                          item.url.startsWith("https://"))
                          ? "_blank"
                          : undefined
                      }
                      rel={
                        typeof item?.url === "string" &&
                        (item.url.startsWith("http://") ||
                          item.url.startsWith("https://"))
                          ? "noopener noreferrer"
                          : undefined
                      }
                    >
                      <h3>{item?.title}</h3>
                    </Link>
                  ) : (
                    <div
                      className="text-sm md:text-lg font-normal text-white/90 cursor-default"
                      key={`${col?.title}-${item?.title}`}
                    >
                      <h3>{item?.title}</h3>
                    </div>
                  )
                ))}
              </div>
            ))}
          </div>
        </nav>

        <div className="border-t border-white/20 sm:mx-12 mx-5" />

        <div className="px-5 md:px-12 py-6">
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-white/90">
            {footerLegalLinks.map((item, idx) => (
              <React.Fragment key={item.title}>
                <Link
                  href={item.url}
                  className="text-sm md:text-base hover:text-white transition-colors"
                >
                  {item.title}
                </Link>
                {idx !== footerLegalLinks.length - 1 ? (
                  <span className="text-white/70" aria-hidden="true">
                    •
                  </span>
                ) : null}
              </React.Fragment>
            ))}
          </div>

          <p className="mt-6 text-xs md:text-sm font-normal text-white/90 text-center">
            &copy; {date}, Rawat ID. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
