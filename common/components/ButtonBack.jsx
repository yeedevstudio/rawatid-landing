"use client";
import { IconArrowLeftCircle, IconCircleArrowLeft } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import React from "react";

export default function ButtonBack() {
  const router = useRouter();

  const handleBack = () => {
    router.push("/blog");
  };
  return (
    <button
      className="flex items-center gap-2 py-1 mb-5 text-green hover:text-green60 transition-all duration-200 ease-in-out active:scale-105"
      onClick={handleBack}
    >
      <IconCircleArrowLeft />
      Kembali
    </button>
  );
}
