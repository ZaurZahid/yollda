import React, { useCallback } from 'react';

const Pagination = ({ itemsPerPage, setItemsPerPage, totalItems, paginate, currentPage, className }) => {
    const lastPage = Math.ceil(totalItems / itemsPerPage);

    const getPageNumbers = () => {
        const pages = [];
        if (lastPage <= 5) {
            // If there are 5 or fewer pages, display all page numbers
            for (let i = 1; i <= lastPage; i++) {
                pages.push(i);
            }
        } else {
            // For more than 5 pages
            if (currentPage > 3) pages.push(1, '...');
            for (let i = Math.max(1, currentPage - 1); i <= Math.min(currentPage + 1, lastPage); i++) {
                pages.push(i);
            }
            if (currentPage < lastPage - 2) pages.push('...', lastPage);
        }
        return pages;
    };

    const handlePageChange = useCallback(
        (page) => {
            if (page !== '...') {
                paginate(page);
            }
        },
        [paginate]
    );

    const pageNumbers = getPageNumbers();

    return (
        <div className={`flex items-center justify-center md:justify-between flex-wrap px-6 py-3 bg-gray-200 rounded-3xl ${className}`}>
            <nav>
                <ul className="flex flex-wrap justify-center -m-2">
                    {pageNumbers.map((number, index) => (
                        <React.Fragment key={index}>
                            {number === '...' ? (
                                <li className="m-2 px-3 py-1 rounded-md text-gray-500 bg-white">{number}</li>
                            ) : (
                                <li
                                    className={`m-2 rounded-md ${number === currentPage ? 'font-bold bg-blue-600 text-white pointer-events-none' : 'font-bold bg-white text-gray-500'
                                        }`}
                                >
                                    <button className='px-3 py-1' onClick={() => handlePageChange(number)}>{number}</button>
                                </li>
                            )}
                        </React.Fragment>
                    ))}
                </ul>
            </nav>
            <div className="ml-2 mt-4 md:mt-0 flex items-center space-x-2">
                <label htmlFor="pageSize">Visible row count:</label>
                <div className="relative inline-block">
                    <select
                        id="pageSize"
                        value={itemsPerPage}
                        onChange={(e) => setItemsPerPage(Number(e.target.value))}
                        className="block appearance-none bg-white border border-gray-300 text-gray-700 py-2 px-2 pr-6 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    >
                        <option value="10">10</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Pagination;
