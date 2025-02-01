import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function PaginationPage({ page, pageCount, onPageChange }) {
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= pageCount) {
      onPageChange(newPage);
    }
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className={`cursor-pointer  transition-all duration-300 ease-in-out ${
              page <= 1
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-green hover:text-white"
            }`}
            onClick={() => handlePageChange(page - 1)}
            disabled={page <= 1}
          />
        </PaginationItem>

        {Array.from({ length: pageCount }, (_, index) => (
          <PaginationItem key={index}>
            <PaginationLink
              className={`cursor-pointer  transition-all duration-300 ease-in-out hover:bg-green60  ${
                page === index + 1 ? "bg-green text-white " : ""
              }`}
              onClick={() => handlePageChange(index + 1)}
              isActive={page === index + 1}
            >
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            className={`cursor-pointer transition-all duration-300 ease-in-out ${
              page >= pageCount
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-green hover:text-white"
            }`}
            onClick={() => handlePageChange(page + 1)}
            disabled={page >= pageCount}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
