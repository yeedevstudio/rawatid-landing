"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { footerColumns, footerLegalLinks } from "../constant/footerValue";

const Footer = () => {
  const date = new Date().getFullYear();

  return (
    <footer className="flex flex-col bg-green">
      <div>
        <nav className="flex max-md:flex-col flex-wrap justify-between gap-8 px-5 md:px-12 py-10">
          <Link
            href="/"
            className="flex flex-col justify-start items-start gap-6 cursor-pointer scroll-smooth md:max-w-[260px]"
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
              Mendukung Digitalisasi Rekam Medis Anda
            </h2>
          </Link>

          <div className="footer__links">
            {footerColumns?.map((col) => (
              <div key={col?.title} className="footer__link">
                <h2 className="text-base md:text-lg font-medium text-white">
                  {col?.title}
                </h2>
                {col?.links.map((item) => (
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

          <p className="mt-6 text-xs md:text-sm font-normal text-white/90">
            &copy; {date} Rawat.ID
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
