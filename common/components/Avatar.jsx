import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function AvatarSection({ src, alt }) {
  return (
    <Avatar className="h-24 w-24 md:h-24 md:w-24 lg:h-32 lg:w-32 border">
      <AvatarImage src={src} alt={alt} />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
}
