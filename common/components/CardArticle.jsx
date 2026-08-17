import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

// Kartu artikel dulu cuma <div onClick={router.push}>, sehingga halaman /blog
// tidak punya satu pun <a href> ke artikel — mesin pencari tidak bisa
// merayapinya. Sekarang kalau `href` diberikan, kartunya dibungkus <Link> asli
// (tetap bisa dibuka di tab baru, dan terlihat oleh crawler). `onSelect` tetap
// dipakai untuk memicu indikator loading, bukan lagi untuk navigasi.
const MaybeLink = ({ href, children, ...rest }) =>
  href ? (
    <Link href={href} className="block h-full" {...rest}>
      {children}
    </Link>
  ) : (
    children
  );

const resolveImageSrc = (src) => {
  if (!src) return "/images/logo.webp";
  if (typeof src !== "string") return "/images/logo.webp";
  if (src.startsWith("http://") || src.startsWith("https://")) return src;
  const base = process.env.NEXT_PUBLIC_BASE_URL || "";
  return `${base}${src}`;
};

export const CardArticle = ({
  src,
  alt,
  category,
  title,
  selected,
  onSelect,
  href,
  shadow = false,
}) => {
  return (
    <MaybeLink href={href}>
    <div
      className={cn(
        "h-full flex flex-col justify-between p-2 md:p-2 rounded-[20px] cursor-pointer transition-all duration-300 ease-in-out",
        shadow
          ? "bg-white transform-gpu transition-transform shadow-[0_4px_14px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 hover:shadow-[0_6px_18px_rgba(0,0,0,0.10)]"
          : "border",
        !shadow && selected && "border-green"
      )}
      onClick={onSelect}
    >
      <div className={cn("md:h-full min-h-[12rem] md:min-h-[18rem] ", "w-full", "relative rounded-2xl overflow-hidden")}>
        <Image src={resolveImageSrc(src)} alt={alt} fill style={{ objectFit: "cover", position: "absolute" }} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
      </div>
      <div className="">
        <h3 className="p-1 w-fit rounded-md text-[9px] px-5 my-2 md:my-2 text-white bg-green">{category}</h3>
        <h2 className="text-lg md:text-xl lg:text-xl font-medium tracking-wider py-2">{title}</h2>
      </div>
    </div>
    </MaybeLink>
  );
};

export const CardArticleAll = ({
  src,
  alt,
  category,
  title,
  width,
  height,
  onSelect,
  href,
  tagVariant = "filled",
  date,
  minHeightClassName = "",
}) => (
  <MaybeLink href={href}>
  <div
    className={cn(
      "h-full bg-white p-2 md:p-2 rounded-[20px] cursor-pointer shadow-[0_4px_14px_rgba(0,0,0,0.08)] transform-gpu transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-[0_6px_18px_rgba(0,0,0,0.10)] flex flex-col",
      minHeightClassName
    )}
    onClick={onSelect}
  >
    <div className={cn(height ? height : "h-full", width ? width : "w-full", "relative rounded-2xl overflow-hidden min-h-[12rem]")}>
      <Image src={resolveImageSrc(src)} alt={alt} fill style={{ objectFit: "cover", position: "absolute" }} />
    </div>
    <div className="">
      <h3
        className={cn(
          "p-1 w-fit rounded-md text-[9px] px-5 my-2",
          tagVariant === "outline"
            ? "text-green bg-white border border-green"
            : "text-white bg-green"
        )}
      >
        {category}
      </h3>
      <h2 className="text-lg md:text-xl lg:text-xl font-medium tracking-wider">
        {title}
      </h2>
      {date && (
        <p className="text-xs md:text-sm text-muted-foreground mt-2">
          {new Date(date).toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}
        </p>
      )}
    </div>
  </div>
  </MaybeLink>
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
  href,
  headline,
  shadow = false,
}) => (
  <MaybeLink href={href}>
  <div
    className={cn(
      "grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 h-full p-2 md:p-2 rounded-[20px] cursor-pointer transition-shadow duration-300",
      shadow
        ? "bg-white transform-gpu transition-transform shadow-[0_4px_14px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 hover:shadow-[0_6px_18px_rgba(0,0,0,0.10)]"
        : "border",
      !shadow && selected && "border-green"
    )}
    onClick={onSelect}
  >
    <div className={cn(height ? height : "h-full ", width ? width : "w-full", "relative rounded-2xl overflow-hidden min-h-[12rem] md:min-h-[13rem] lg:min-h-[8rem]")}>
      <Image src={resolveImageSrc(src)} alt={alt} fill style={{ objectFit: "cover", position: "absolute" }} />
    </div>
    <div>
      <h3 className="p-1 w-fit rounded-md text-[9px] px-5 my-1 md:my-1 text-white bg-green">{category}</h3>
      <h2 className="text-base md:text-lg lg:text-xl font-medium tracking-wider py-1 md:py-2 leading-snug">{title}</h2>
      {headline && (
        <p className="text-xs md:text-sm lg:text-base mt-2 lg:mt-2 font-light text-neutral90 tracking-wider text-justify">
          <span className="block md:hidden">{headline.split(" ").slice(0, 16).join(" ")}...</span>
          <span className="hidden md:block">{headline.split(" ").slice(0, 21).join(" ")}...</span>
        </p>
      )}
    </div>
  </div>
  </MaybeLink>
);

/** Kartu artikel mendatar: gambar kiri, judul & tanggal — untuk grid dua kategori di /blog */
export const CardArticleRow = ({
  src,
  alt,
  category,
  title,
  date,
  onSelect,
  tagVariant = "outline",
}) => (
  <div
    className={cn(
      "flex flex-row gap-3 md:gap-4 p-2 md:p-3 rounded-[20px] cursor-pointer bg-white border border-gray-100",
      "shadow-[0px_0px_12.1px_0px_#0000001A] transition-shadow duration-300"
    )}
    onClick={onSelect}
  >
    <div className="relative w-[92px] md:w-[112px] shrink-0 h-[72px] md:h-[84px] rounded-xl overflow-hidden">
      <Image
        src={resolveImageSrc(src)}
        alt={alt || ""}
        fill
        style={{ objectFit: "cover", position: "absolute" }}
        sizes="(max-width: 768px) 92px, 112px"
      />
    </div>
    <div className="min-w-0 flex-1 flex flex-col justify-center gap-0.5 py-0.5">
      <h3
        className={cn(
          "p-1 w-fit rounded-md text-[9px] px-3",
          tagVariant === "outline" ? "text-green bg-white border border-green" : "text-white bg-green"
        )}
      >
        {category}
      </h3>
      <h2 className="text-sm md:text-base font-semibold text-gray-900 leading-snug line-clamp-2 tracking-tight">{title}</h2>
      {date ? (
        <p className="text-xs text-gray-500 mt-0.5">
          {new Date(date).toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}
        </p>
      ) : null}
    </div>
  </div>
);

export const CardArticlePopuler = ({ src, alt, category, title, height, width, selected, onSelect, headline }) => (
  <div className={cn("grid grid-cols-2 gap-2 md:gap-6 h-full border p-2 md:p-3 rounded-[20px] cursor-pointer", selected && "border-green")} onClick={onSelect}>
    <div className={cn(height ? height : "h-full ", width ? width : "w-full", "relative rounded-2xl overflow-hidden lg:min-h-[10rem]")}>
      <Image src={resolveImageSrc(src)} alt={alt} fill style={{ objectFit: "cover", position: "absolute" }} />
    </div>
    <div>
      <h3 className="p-1 w-fit rounded-md text-xs px-5 my-2 md:my-4 text-white bg-green">{category}</h3>
      <h2 className="text-sm md:text-base lg:text-lg font-medium hidden lg:block">{title.split(" ").slice(0, 7).join(" ")}...</h2>
      <h2 className="text-sm md:text-base lg:text-lg font-medium block lg:hidden">{title}</h2>
      {headline && <p className="text-xs md:text-sm lg:text-base mt-5 font-light text-neutral90 tracking-wider text-justify">{headline.split(" ").slice(0, 50).join(" ")}</p>}
    </div>
  </div>
);
