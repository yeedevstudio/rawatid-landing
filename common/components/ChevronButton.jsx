"use client";

import { cn } from "@/lib/utils";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

export default function ChevronButton({ direction, onClick, disabled }) {
  const Icon =
    direction === "left" ? (
      <IconChevronLeft className="w-7 h-7 text-white font-medium" />
    ) : (
      <IconChevronRight className="w-7 h-7 text-white font-medium" />
    );

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "left" ? "Previous" : "Next"}
      className={cn(
        "bg-green rounded-full w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center transition-all duration-75 ease-in-out active:scale-110",
        disabled ? "opacity-0" : "opacity-100"
      )}
    >
      {Icon}
    </button>
  );
}
