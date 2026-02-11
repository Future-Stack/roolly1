import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange
}) => {
  const [pages, setPages] = useState<(number | string)[]>([]);

  useEffect(() => {
    const generatePages = () => {
      const pagesArray: (number | string)[] = [];
      const maxVisiblePages = 5;
      
      if (totalPages <= maxVisiblePages) {
        // Show all pages if less than or equal to maxVisiblePages
        for (let i = 1; i <= totalPages; i++) {
          pagesArray.push(i);
        }
      } else {
        // Always show first page
        pagesArray.push(1);
        
        if (currentPage > 3) {
          pagesArray.push('...');
        }
        
        // Show pages around current page
        let start = Math.max(2, currentPage - 1);
        let end = Math.min(totalPages - 1, currentPage + 1);
        
        // Adjust if we're near the start
        if (currentPage <= 3) {
          end = 4;
        }
        
        // Adjust if we're near the end
        if (currentPage >= totalPages - 2) {
          start = totalPages - 3;
        }
        
        for (let i = start; i <= end; i++) {
          if (i > 1 && i < totalPages) {
            pagesArray.push(i);
          }
        }
        
        if (currentPage < totalPages - 2) {
          pagesArray.push('...');
        }
        
        // Always show last page
        if (totalPages > 1) {
          pagesArray.push(totalPages);
        }
      }
      
      setPages(pagesArray);
    };

    generatePages();
  }, [currentPage, totalPages]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex items-center gap-1">
      {/* Previous Button */}
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className={`flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors rounded-md ${
          currentPage === 1
            ? 'text-gray-400 cursor-not-allowed bg-gray-50'
            : 'text-gray-700 hover:bg-gray-100 bg-white border border-gray-300'
        }`}
      >
        <ChevronLeft className="w-4 h-4" strokeWidth={2} />
        <span>Previous</span>
      </button>

      {/* Page Numbers */}
      {pages.map((page, index) => {
        if (page === '...') {
          return (
            <span 
              key={`ellipsis-${index}`} 
              className="px-3 py-2 text-sm text-gray-400"
            >
              ...
            </span>
          );
        }

        return (
          <button
            key={page}
            onClick={() => handlePageChange(page as number)}
            className={`px-3 py-2 text-sm font-medium transition-colors rounded-md min-w-[40px] ${
              currentPage === page
                ? 'bg-blue-600 text-white border border-blue-600'
                : 'text-gray-700 hover:bg-gray-100 bg-white border border-gray-300'
            }`}
          >
            {page}
          </button>
        );
      })}

      {/* Next Button */}
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={`flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors rounded-md ${
          currentPage === totalPages
            ? 'text-gray-400 cursor-not-allowed bg-gray-50'
            : 'text-gray-700 hover:bg-gray-100 bg-white border border-gray-300'
        }`}
      >
        <span>Next</span>
        <ChevronRight className="w-4 h-4" strokeWidth={2} />
      </button>
    </div>
  );
};

export default Pagination;