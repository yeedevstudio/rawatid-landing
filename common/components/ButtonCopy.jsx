"use client";

import React from "react";
import { toast } from "sonner";
import { IconCopy } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

const ButtonCopy = ({ text, className }) => {
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success("Text copied to clipboard", {
        duration: 3000,
        position: "top-right",
        style: { color: "green", border: "1px solid green" },
      });
    });
  };

  return (
    <button
      className={cn(
        "border border-[#595959] p-1 md:px-3 md:py-2 rounded-md text-[#595959] hover:bg-neutral-300 transition-all duration-300 ease-in-out flex items-center text-xs md:text-base",
        className
      )}
      onClick={() => copyToClipboard(text)}
      aria-label="Salin"
    >
      <IconCopy className="h-4 w-4 md:h-5 md:w-5 " /> Salin
    </button>
  );
};

export default ButtonCopy;
