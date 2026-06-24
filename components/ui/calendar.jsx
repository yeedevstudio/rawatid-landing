"use client";

import * as React from "react";
import { DayPicker } from "react-day-picker";
import { cn } from "@/lib/utils";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

export function Calendar({ className, classNames, showOutsideDays = true, ...props }) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-4 select-none w-[320px]", className)}
      classNames={{
        months: "flex flex-col gap-4",
        month: "flex flex-col gap-3",
        month_caption: "flex justify-center items-center relative h-10 mb-1",
        caption_label: "text-sm font-semibold text-gray-800",
        nav: "flex items-center absolute inset-x-0 top-0 justify-between",
        button_previous:
          "h-8 w-8 flex items-center justify-center rounded-md border border-gray-200 hover:bg-gray-100 transition-colors text-gray-600",
        button_next:
          "h-8 w-8 flex items-center justify-center rounded-md border border-gray-200 hover:bg-gray-100 transition-colors text-gray-600",
        month_grid: "w-full border-collapse",
        weekdays: "flex mb-1",
        weekday:
          "text-gray-400 text-xs font-medium w-10 h-10 flex items-center justify-center",
        weeks: "flex flex-col gap-1",
        week: "flex",
        day: "w-10 h-10 p-0 flex items-center justify-center",
        day_button: cn(
          "w-9 h-9 text-sm rounded-full font-normal transition-colors flex items-center justify-center",
          "hover:bg-gray-100 cursor-pointer",
          "disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent"
        ),
        today: "border border-green text-green font-semibold",
        outside: "text-gray-300 opacity-40",
        hidden: "invisible",
        selected:
          "[&>button]:bg-green [&>button]:text-white [&>button]:hover:bg-greenHover",
        dropdowns: "flex items-center gap-2",
        dropdown:
          "text-sm border border-gray-200 rounded-lg px-2 py-1 outline-none cursor-pointer bg-white focus:ring-1 focus:ring-green text-gray-700",
        dropdown_root: "relative",
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation }) =>
          orientation === "left" || orientation === "up" ? (
            <IconChevronLeft size={15} />
          ) : (
            <IconChevronRight size={15} />
          ),
      }}
      {...props}
    />
  );
}
