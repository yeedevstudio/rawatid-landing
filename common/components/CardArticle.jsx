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
        <h2 className="p-1 w-fit rounded-md border border-neutral50 text-xs md:text-sm lg:text-base my-2 md:my-4">
          {category}
        </h2>
        <h1 className="text-sm md:text-base lg:text-lg font-medium tracking-wider">
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
      "grid grid-cols-1 h-full border p-2 md:p-3 rounded-[20px] cursor-pointer relative",
      selected && "border-green"
    )}
    onClick={onSelect}
  >
    <div
      className={cn(
        height ? height : "h-full min-h-[15rem]",
        width ? width : "w-full",
        "relative rounded-2xl overflow-hidden"
      )}
    >
      <Image
        src={process.env.NEXT_PUBLIC_BASE_URL + src}
        alt={alt}
        fill
        style={{ objectFit: "cover", position: "absolute" }}
        // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
    <div>
      <h2 className="p-1 w-fit rounded-md border border-neutral50 text-xs md:text-sm lg:text-base my-2 md:my-4">
        {category}
      </h2>
    </div>
    <h1 className="text-sm md:text-base lg:text-lg font-medium tracking-wider">
      {title}
    </h1>
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
      "grid grid-cols-2  gap-2 md:gap-6 h-full border p-2 md:p-3 rounded-[20px] cursor-pointer relative",
      selected && "border-green"
    )}
    onClick={onSelect}
  >
    <div
      className={cn(
        height ? height : "h-full min-h-[12rem]",
        width ? width : "w-full",
        "relative rounded-2xl overflow-hidden"
      )}
    >
      <Image
        src={process.env.NEXT_PUBLIC_BASE_URL + src}
        alt={alt}
        fill
        style={{ objectFit: "cover", position: "absolute" }}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 40vw, 30vw"
      />
    </div>
    <div>
      <h2 className="p-1 w-fit rounded-md border border-neutral50 text-xs md:text-sm lg:text-base my-2 md:my-4">
        {category}
      </h2>
      <h1 className="text-sm md:text-base lg:text-lg font-medium tracking-wider">
        {title}
      </h1>
      {headline && (
        <p className="text-xs md:text-sm lg:text-base mt-5 font-light text-neutral90">
          {headline}
        </p>
      )}
    </div>
  </div>
);
