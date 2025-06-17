import ArrowDown from './icons/ArrowDown';

export default function Pagination({
    currentPage,
    totalPages,
    onPageChange,
    className = ''
}) {
    const getVisiblePages = () => {
        const delta = 1; // Number of pages to show on each side of current page
        const range = [];
        const rangeWithDots = [];

        // Calculate the range of pages to show
        const start = Math.max(2, currentPage - delta);
        const end = Math.min(totalPages - 1, currentPage + delta);

        for (let i = start; i <= end; i++) {
            range.push(i);
        }

        // Always show first page
        if (start > 2) {
            rangeWithDots.push(1);
            if (start > 3) {
                rangeWithDots.push('...');
            }
        } else if (start === 2) {
            rangeWithDots.push(1);
        } else {
            rangeWithDots.push(1);
        }

        // Add the main range
        rangeWithDots.push(...range);

        // Always show last page
        if (end < totalPages - 1) {
            if (end < totalPages - 2) {
                rangeWithDots.push('...');
            }
            rangeWithDots.push(totalPages);
        } else if (end === totalPages - 1) {
            rangeWithDots.push(totalPages);
        } else if (totalPages > 1) {
            rangeWithDots.push(totalPages);
        }

        return rangeWithDots;
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

    const handlePageClick = (page) => {
        if (typeof page === 'number') {
            onPageChange(page);
        }
    };

    if (totalPages <= 1) return null;

    const visiblePages = getVisiblePages();

    return (
        <div className={`flex items-center justify-center space-x-1 sm:space-x-2 ${className}`}>
            {/* Previous Button */}
            <button
                onClick={handlePrevious}
                disabled={currentPage === 1}
                className={`p-2 sm:p-3 rounded-full transition-all duration-200 ${currentPage === 1
                    ? 'text-gray-300 cursor-not-allowed'
                    : 'text-gray-600 hover:text-green-dark hover:bg-gray-200'
                    }`}
                aria-label="Previous page"
            >
                <ArrowDown strokeColor={`stroke-gray-600`} className={`w-3 font-bold transition-transform duration-200 rotate-90`} />
            </button>

            {/* Page Numbers */}
            <div className="flex items-center space-x-1 sm:space-x-2">
                {visiblePages.map((page, index) => {
                    if (page === '...') {
                        return (
                            <span
                                key={`dots-${index}`}
                                className="px-2 py-2 text-gray-400 text-span-responsive"
                            >
                                ...
                            </span>
                        );
                    }

                    const pageNumber = page;
                    const isActive = pageNumber === currentPage;

                    return (
                        <button
                            key={pageNumber}
                            onClick={() => handlePageClick(pageNumber)}
                            className={`min-w-[30px] sm:min-w-[34px] h-8 sm:h-8 rounded-xl text-span-responsive font-medium transition-all duration-200 ${isActive
                                ? 'bg-light-secondary-green text-white shadow-lg scale-110 font-semibold'
                                : 'text-gray-400 hover:text-gray-500 hover:bg-gray-200'
                                }`}
                        >
                            {pageNumber}
                        </button>
                    );
                })}
            </div>

            {/* Next Button */}
            <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className={`p-2 sm:p-3 rounded-full transition-all duration-200 ${currentPage === totalPages
                    ? 'text-gray-300 cursor-not-allowed'
                    : 'text-gray-600 hover:text-green-dark hover:bg-gray-200'
                    }`}
                aria-label="Next page"
            >
                <ArrowDown strokeColor={`stroke-gray-600`} className={`w-3 font-bold transition-transform duration-200 -rotate-90`} />
            </button>
        </div>
    );
}