import { cn } from "@/lib/utils";
import Image from "next/image";

export const CardArticle = ({
  src,
  alt,
  category,
  title,
  selected,
  onSelect,
}) => {
  return (
    <div
      className={cn(
        "h-full flex flex-col justify-between border p-2 md:p-3 rounded-[20px] cursor-pointer transition-all duration-300 ease-in-out",
        selected && "border-green"
      )}
      onClick={onSelect}
    >
      <div
        className={cn(
          "h-[12rem] md:h-full min-h-[12rem] md:min-h-[15rem]",
          "w-full",
          "relative rounded-2xl overflow-hidden"
        )}
      >
        <Image
          src={process.env.NEXT_PUBLIC_BASE_URL + src}
          alt={alt}
          fill
          style={{ objectFit: "cover", position: "absolute" }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="">
        <h2 className="p-1 w-fit rounded-md text-xs px-4 my-2 md:my-4 text-white bg-green">
          {category}
        </h2>
        <h1 className="text-lg md:text-xl lg:text-2xl font-medium tracking-wider py-5">
          {title}
        </h1>
      </div>
    </div>
  );
};

export const CardArticleAll = ({
  src,
  alt,
  category,
  title,
  width,
  height,
  selected,
  onSelect,
}) => (
  <div
    className={cn(
      "h-full border p-2 md:p-3 rounded-[20px] cursor-pointer",
      selected && "border-green"
    )}
    onClick={onSelect}
  >
    <div
      className={cn(
        height ? height : "h-full",
        width ? width : "w-full",
        "relative rounded-2xl overflow-hidden min-h-[12rem]"
      )}
    >
      <Image
        src={process.env.NEXT_PUBLIC_BASE_URL + src}
        alt={alt}
        fill
        style={{ objectFit: "cover", position: "absolute" }}
      />
    </div>
    <div className="">
      <h2 className="p-1 w-fit rounded-md text-xs px-4 my-2 md:my-4 text-white bg-green">
        {category}
      </h2>
      <h1 className="text-lg md:text-xl lg:text-2xl font-medium tracking-wider py-5 ">
        {title}
      </h1>
    </div>
  </div>
);

export const CardArticleSidebar = ({
  src,
  alt,
  category,
  title,
  height,
  width,
  selected,
  onSelect,
  headline,
}) => (
  <div
    className={cn(
      "grid grid-cols-2 gap-2 md:gap-6 h-full border p-2 md:p-3 rounded-[20px] cursor-pointer",
      selected && "border-green"
    )}
    onClick={onSelect}
  >
    <div
      className={cn(
        height ? height : "h-full ",
        width ? width : "w-full",
        "relative rounded-2xl overflow-hidden min-h-[25rem]"
      )}
    >
      <Image
        src={process.env.NEXT_PUBLIC_BASE_URL + src}
        alt={alt}
        fill
        style={{ objectFit: "cover", position: "absolute" }}
      />
    </div>
    <div>
      <h2 className="p-1 w-fit rounded-md text-xs px-4 my-2 md:my-4 text-white bg-green">
        {category}
      </h2>
      <h1 className="text-lg md:text-xl lg:text-2xl font-medium tracking-wider py-5">
        {title}
      </h1>
      {headline && (
        <p className="text-xs md:text-sm lg:text-base mt-5 font-light text-neutral90 tracking-wider text-justify">
          {headline.split(" ").slice(0, 50).join(" ")}
        </p>
      )}
    </div>
  </div>
);
