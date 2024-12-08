import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon} from "lucide-react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    // Calculate the range of pages to display
    const startPage = Math.max(currentPage - 2, 1);
    const endPage = Math.min(currentPage + 2, totalPages);
    const pageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

    return (
        <div className="flex items-center justify-center mt-4">
            <button
                className={`px-3 flex items-center justify-center py-2 rounded-l-md ${
                    currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'bg-white'
                }`}
                onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                <ChevronLeftIcon size={23}/>
                <span>
                 Previous
                </span>
            </button>

            {pageNumbers.map((page) => (
                <button
                    key={page}
                    className={`px-3 rounded-lg py-2 ${
                        page === currentPage
                            ? 'border-2 bg-white'
                            : 'bg-white hover:bg-gray-100 '
                    }`}
                    onClick={() => onPageChange(page)}
                >
                    {page}
                </button>
            ))}

            <button
                className={`px-3 py-2 flex items-center justify-center rounded-r-md ${
                    currentPage === totalPages
                        ? 'text-gray-400 cursor-not-allowed'
                        : 'bg-white'
                }`}
                onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                <span>
                     Next
                </span>
                <ChevronRightIcon size={23}/>
            </button>
        </div>
    );
};

export default Pagination;