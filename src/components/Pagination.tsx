import React from "react";

interface PaginationProps {
  totalItems: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / 10); // Assuming 10 items per page

  const handlePageChange = (page: number) => {
    onPageChange(page);
  };

  // pagination algorithm
  const generatePagination = (current: number, last: number) => {
    const delta = 2;
    const left = current - delta;
    const right = current + delta + 1;
    const range = [];
    const rangeWithDots = [];
    let l;

    for (let i = 1; i <= last; i++) {
      if (i === 1 || i === last || (i >= left && i < right)) {
        range.push(i);
      }
    }

    for (let i of range) {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push("...");
        }
      }
      rangeWithDots.push(i);
      l = i;
    }

    return rangeWithDots;
  };

  const renderPageLink = (page: number | string, isCurrent: boolean) => (
    <li
      className={`cursor-pointer flex items-center justify-center px-3 py-2 text-sm leading-tight ${
        isCurrent
          ? "z-10 text-primary-600 bg-primary-50 border-primary-300 hover:bg-primary-100 hover:text-primary-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
          : typeof page === "number"
          ? "text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          : "text-white"
      }`}
      onClick={() => (typeof page === "number" ? handlePageChange(page) : null)}
      key={page.toString()}
    >
      {page}
    </li>
  );

  return (
    <div>
      <nav
        className="bg-gray-700 flex flex-col items-start justify-between p-4 space-y-3 md:flex-row md:items-center md:space-y-0"
        aria-label="Table navigation"
      >
        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
          Showing <span> </span>
          <span className="font-semibold text-gray-900 dark:text-white">
            {currentPage * 10 - 9}
          </span>
          -
          <span className="font-semibold text-gray-900 dark:text-white">
            {currentPage * 10}
          </span>
          of
          <span className="font-semibold text-gray-900 dark:text-white">
            {totalItems}
          </span>
        </span>

        <ul className="inline-flex items-stretch -space-x-px">
          <li
            onClick={() => {
              if (currentPage === 1) return;
              handlePageChange(currentPage - 1);
            }}
            className="cursor-pointer flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <span className="sr-only">Previous</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </li>

          {generatePagination(currentPage, totalPages).map((page) =>
            renderPageLink(page, page === currentPage)
          )}

          <li
            onClick={() => {
              if (currentPage === totalPages) return;
              handlePageChange(currentPage + 1);
            }}
            className="cursor-pointer flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <span className="sr-only">Next</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10l-3.293-3.293a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
