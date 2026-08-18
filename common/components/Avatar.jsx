import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function AvatarSection({ src, alt }) {
  return (
    <Avatar className="h-24 w-24 md:h-24 md:w-24 lg:h-32 lg:w-32 border">
      {/* Avatar ini dirender 96-128 px dan letaknya jauh di bawah lipatan.
          loading="lazy" mencegahnya berebut bandwidth dengan gambar LCP. */}
      <AvatarImage src={src} alt={alt} loading="lazy" decoding="async" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
}
