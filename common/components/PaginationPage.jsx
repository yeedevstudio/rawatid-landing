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

        {Array.from({ length: pageCount }, (_, index) => {
          const pageNum = index + 1;

          if (pageNum === 1 || pageNum === pageCount) {
            return (
              <PaginationItem key={pageNum}>
                <PaginationLink
                  className={`cursor-pointer transition-all duration-300 ease-in-out hover:bg-greenHover hover:text-white ${
                    page === pageNum ? "bg-green text-white " : ""
                  }`}
                  onClick={() => handlePageChange(pageNum)}
                  isActive={page === pageNum}
                >
                  {pageNum}
                </PaginationLink>
              </PaginationItem>
            );
          }

          if (pageNum >= page - 1 && pageNum <= page + 1) {
            return (
              <PaginationItem key={pageNum}>
                <PaginationLink
                  className={`cursor-pointer transition-all duration-300 ease-in-out hover:bg-greenHover hover:text-white ${
                    page === pageNum ? "bg-green text-white " : ""
                  }`}
                  onClick={() => handlePageChange(pageNum)}
                  isActive={page === pageNum}
                >
                  {pageNum}
                </PaginationLink>
              </PaginationItem>
            );
          }

          if (pageNum === pageCount - 1 && page < pageCount - 2) {
            return (
              <PaginationItem key="ellipsis-end">
                <span className="px-2">...</span>
              </PaginationItem>
            );
          }

          if (pageNum === 2 && page > 3) {
            return (
              <PaginationItem key="ellipsis-start">
                <span className="px-2">...</span>
              </PaginationItem>
            );
          }

          return null;
        })}

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
