import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  totalPages?: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages = 10,
  currentPage: initialPage = 2,
  onPageChange
}) => {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      onPageChange?.(page);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex items-center gap-2 justify-center mt-5">
      {/* Previous Button */}
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className={`flex items-center gap-1.5 px-3 py-2 text-[15px] font-medium rounded-lg transition-colors ${
          currentPage === 1
            ? 'text-gray-400 cursor-not-allowed'
            : 'text-gray-700 hover:bg-gray-100'
        }`}
      >
        <ChevronLeft className="w-4 h-4" strokeWidth={2} />
        <span>Previous</span>
      </button>

      {/* Page Numbers */}
      <button
        onClick={() => handlePageChange(1)}
        className={`min-w-[40px] h-[40px] px-3 text-[15px] font-medium rounded-lg transition-colors ${
          currentPage === 1
            ? 'bg-white border border-gray-300 text-gray-700'
            : 'text-gray-700 hover:bg-gray-100'
        }`}
      >
        1
      </button>

      <button
        onClick={() => handlePageChange(2)}
        className={`min-w-[40px] h-[40px] px-3 text-[15px] font-medium rounded-lg transition-colors ${
          currentPage === 2
            ? 'bg-white border border-gray-300 text-gray-700'
            : 'text-gray-700 hover:bg-gray-100'
        }`}
      >
        2
      </button>

      <button
        onClick={() => handlePageChange(3)}
        className={`min-w-[40px] h-[40px] px-3 text-[15px] font-medium rounded-lg transition-colors ${
          currentPage === 3
            ? 'bg-white border border-gray-300 text-gray-700'
            : 'text-gray-700 hover:bg-gray-100'
        }`}
      >
        3
      </button>

      {/* Ellipsis */}
      <span className="px-2 text-[15px] text-gray-700 font-normal">...</span>

      {/* Next Button */}
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={`flex items-center gap-1.5 px-3 py-2 text-[15px] font-medium rounded-lg transition-colors ${
          currentPage === totalPages
            ? 'text-gray-400 cursor-not-allowed'
            : 'text-gray-700 hover:bg-gray-100'
        }`}
      >
        <span>Next</span>
        <ChevronRight className="w-4 h-4" strokeWidth={2} />
      </button>
    </div>
  );
};

export default Pagination;