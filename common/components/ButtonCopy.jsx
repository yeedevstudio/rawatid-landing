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
        "border border-neutral50 px-3 py-2 rounded-md text-neutral50 hover:bg-neutral-200 transition-all duration-300 ease-in-out flex items-center gap-2",
        className
      )}
      onClick={() => copyToClipboard(text)}
    >
      <IconCopy /> Salin
    </button>
  );
};

export default ButtonCopy;
