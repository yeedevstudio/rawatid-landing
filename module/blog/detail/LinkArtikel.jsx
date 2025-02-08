"use client";
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandWhatsapp,
  IconBrandX,
} from "@tabler/icons-react";
import React from "react";
import ButtonCopy from "../../../common/components/ButtonCopy";
import { useRouter } from "next/navigation";

export default function LinkArtikel({ post }) {
  const router = useRouter();
  return (
    <div>
      <h2 className="text-sm md:text-base lg:text-lg font-medium text-green">
        Bagikan artikel
      </h2>
      <div className="flex items-center gap-4 md:gap-6 lg:gap-4 py-6">
        <IconBrandWhatsapp
          title="whatsapp"
          className="h-6 w-6 md:h-9 md:w-9  text-white bg-green rounded-md cursor-pointer"
          onClick={() =>
            window.open(
              `https://wa.me/?text=${process.env.NEXT_PUBLIC_URL}/detail/${post?.slug}`,
              "_blank",
              "noopener,noreferrer"
            )
          }
        />
        <IconBrandX
          title="twitter"
          className="h-6 w-6 md:h-9 md:w-9 text-white bg-green rounded-md cursor-pointer"
          onClick={() =>
            window.open(
              `https://twitter.com/intent/tweet?text=${process.env.NEXT_PUBLIC_URL}/detail/${post?.slug}`,
              "_blank",
              "noopener,noreferrer"
            )
          }
        />
        <IconBrandFacebook
          title="facebook"
          className="h-6 w-6 md:h-9 md:w-9 text-white bg-green rounded-md cursor-pointer"
          onClick={() =>
            window.open(
              `https://www.facebook.com/sharer/sharer.php?u=${
                (process.env.NEXT_PUBLIC_URL + "/detail/" + post?.slug,
                "_blank",
                "noopener,noreferrer")
              }`
            )
          }
        />
        <IconBrandLinkedin
          title="linkedin"
          className="h-6 w-6 md:h-9 md:w-9 text-white bg-green rounded-md cursor-pointer"
          onClick={() =>
            window.open(
              `https://www.linkedin.com/shareArticle?mini=true&url=${process.env.NEXT_PUBLIC_URL}/detail/${post?.slug}`,
              "_blank",
              "noopener,noreferrer"
            )
          }
        />
        <IconBrandInstagram
          title="instagram"
          className="h-6 w-6 md:h-9 md:w-9 text-white bg-green rounded-md cursor-pointer"
          onClick={() =>
            window.open(
              `https://www.instagram.com/direct/new/?link=${process.env.NEXT_PUBLIC_URL}/detail/${post?.slug}`,
              "_blank",
              "noopener,noreferrer"
            )
          }
        />
        <ButtonCopy
          text={process.env.NEXT_PUBLIC_URL + "/detail/" + post?.slug}
        />
      </div>
    </div>
  );
}
