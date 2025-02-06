"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { footerBlogLinks, footerLinks } from "../constant/footerValue";
import { usePathname } from "next/navigation";

const Footer = () => {
  const router = usePathname();
  const pageName = router.split("/")[1];

  const blogPage = pageName === "blog" || router.startsWith("/blog/");

  return (
    <footer className="flex flex-col bg-green">
      {!blogPage ? (
        <div>
          <nav className="flex max-md:flex-col flex-wrap justify-between gap-5 px-5 md:px-12 py-10">
            <Link
              href="/"
              className="flex flex-col justify-start items-start gap-6 cursor-pointer scroll-smooth"
            >
              <Image
                src="/images/logo.svg"
                alt="logo"
                width={48}
                height={48}
                className="object-contain bg-white p-1 rounded-full"
              />
              <p className="text-md md:text-lg text-white">
                Rawat.ID Digitalisasi Rekam Medis Anda
              </p>
            </Link>
            <div className="footer__links">
              {footerLinks?.map((link) => (
                <div key={link?.title} className="footer__link">
                  <h3 className="text-md md:text-lg font-medium text-white">
                    {link?.title}
                  </h3>
                  {link?.links.map((item) => (
                    <Link
                      passHref
                      target="_blank"
                      rel="noopener noreferrer"
                      href={item?.url}
                      className="text-sm md:text-lg font-normal text-white"
                      key={item?.title}
                    >
                      {item?.title}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </nav>
          <div className="flex justify-between items-center flex-wrap border-t border-gray-100 sm:mx-12 mx-5 py-5">
            <p className="text-md md:text-lg font-normal text-white">
              &copy; 2024 Rawat ID
            </p>
          </div>
        </div>
      ) : (
        <div>
          <nav className="flex max-md:flex-col flex-wrap justify-between gap-5 px-5 md:px-12 py-10">
            <Link
              href="/"
              className="flex flex-col justify-start items-start gap-6 cursor-pointer scroll-smooth"
            >
              <Image
                src="/images/logo.svg"
                alt="logo"
                width={48}
                height={48}
                className="object-contain bg-white p-1 rounded-full"
              />
              <p className="text-md md:text-lg text-white">
               Blog Rawat.ID Sumber Informasi Terkini
              </p>
            </Link>
            <div className="footer__links">
              {footerBlogLinks?.map((link) => (
                <div key={link?.title} className="footer__link">
                  <h3 className="text-md md:text-lg font-medium text-white">
                    {link?.title}
                  </h3>
                  {link?.links.map((item) => (
                    <Link
                      passHref
                      target="_blank"
                      rel="noopener noreferrer"
                      href={item?.url}
                      className="text-sm md:text-lg font-normal text-white"
                      key={item?.title}
                    >
                      {item?.title}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </nav>
          <div className="flex justify-between items-center flex-wrap border-t border-gray-100 sm:mx-12 mx-5 py-5">
            <p className="text-md md:text-lg font-normal text-white">
              &copy; 2024 Blog Rawat ID
            </p>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
