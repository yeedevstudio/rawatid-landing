"use client";
import {
  IconBrandFacebook,
  IconBrandLinkedin,
  IconBrandWhatsapp,
  IconBrandX,
} from "@tabler/icons-react";
import React from "react";
import ButtonCopy from "../../../common/components/ButtonCopy";

export default function LinkArtikel({ post }) {
  return (
    <div>
      <h2 className="text-sm md:text-base lg:text-lg font-medium text-green">
        Bagikan artikel
      </h2>
      <div className="flex items-center gap-2 md:gap-6 py-6">
        <IconBrandWhatsapp className="h-9 w-9  text-white bg-green rounded-md cursor-pointer" />
        <IconBrandX className="h-9 w-9 text-white bg-green rounded-md cursor-pointer" />
        <IconBrandFacebook className="h-9 w-9 text-white bg-green rounded-md cursor-pointer" />
        <IconBrandLinkedin className="h-9 w-9 text-white bg-green rounded-md cursor-pointer" />
        <ButtonCopy text={process.env.NEXT_PUBLIC_URL + "/detail/" + post?.slug} />
      </div>
    </div>
  );
}
