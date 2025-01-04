import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

export default function CardHome({
  images,
  altImage,
  title,
  description,
  selected,
  onSelect,
}) {
  return (
    <Card
      className={cn(
        "w-[18rem] h-[28rem] md:w-[20rem] lg:w-[22rem] lg:h-[30.5rem] border-2 shadow-none cursor-pointer",
        selected && "border-green"
      )}
      onClick={onSelect}
    >
      <CardContent>
        <Image
          src={images}
          alt={altImage}
          width={300}
          height={100}
          className="my-4 w-full h-[12rem] object-cover rounded-lg"
        />
        <h1 className="text-xl font-medium">{title}</h1>
        <h2 className="text-sm md:text-normal text-neutral90 mt-2 md:mt-5">{description}</h2>
      </CardContent>
    </Card>
  );
}
