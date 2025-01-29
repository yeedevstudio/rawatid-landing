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
        "border border-neutral50 p-1 md:px-3 md:py-2 rounded-md text-neutral50 hover:bg-neutral-200 transition-all duration-300 ease-in-out flex items-center text-sm md:text-base",
        className
      )}
      onClick={() => copyToClipboard(text)}
    >
      <IconCopy className="h-5 w-5 " /> Salin
    </button>
  );
};

export default ButtonCopy;
