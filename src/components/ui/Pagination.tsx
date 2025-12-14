import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  totalPages?: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages = 10,
  currentPage: initialPage = 1,
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
    <div className="flex items-center gap-1">
      {/* Previous Button */}
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className={`flex items-center gap-1 px-2 py-1.5 text-base font-semibold transition-colors ${
          currentPage === 1
            ? 'text-gray-400 cursor-not-allowed'
            : 'text-gray-700 hover:bg-gray-100'
        }`}
      >
        <ChevronLeft className="w-5 h-5" strokeWidth={2} />
        <span>Previous</span>
      </button>

      {/* Page Numbers */}
      <button
        onClick={() => handlePageChange(1)}
        className={`min-w-[32px] h-[32px] px-2 text-base font-semibold rounded transition-colors ${
          currentPage === 1
            ? 'bg-white border border-gray-300 text-gray-900'
            : 'text-gray-700 hover:bg-gray-100'
        }`}
      >
        1
      </button>

      <button
        onClick={() => handlePageChange(2)}
        className={`min-w-[32px] h-[32px] px-2 text-base rounded transition-colors font-semibold ${
          currentPage === 2
            ? 'bg-white border border-gray-300 text-gray-900'
            : 'text-gray-700 hover:bg-gray-100'
        }`}
      >
        2
      </button>

      <button
        onClick={() => handlePageChange(3)}
        className={`min-w-[32px] h-[32px] px-2 text-base font-normal rounded transition-colors font-semibold${
          currentPage === 3
            ? 'bg-white border border-gray-300 text-gray-900'
            : 'text-gray-700 hover:bg-gray-100'
        }`}
      >
        3
      </button>

      {/* Ellipsis */}
      <span className="px-1.5 text-[14px] text-gray-700 font-normal">...</span>

      {/* Next Button */}
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={`flex items-center gap-1 px-2 py-1.5 text-base transition-colors font-semibold ${
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