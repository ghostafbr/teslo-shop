
export const generatePaginationNumbers = ( currentPage: number, totalPages: number ) => {

    // if there are less than 7 pages, show all pages
    if ( totalPages <= 7 ) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);  // [1, 2, 3, 4, 5, 6, 7]
    }

    // If current page is between the first 3 pages
    // Show first 3, suspense dots, last 2
    if ( currentPage <= 3 ) {
        return [1, 2, 3, '...', totalPages - 1, totalPages]; // [1, 2, 3, '...', 49, 50]
    }

    // if current page is between the last 3 pages
    // Show first 2, suspense dots, last 3
    if ( currentPage > totalPages - 3 ) {
        return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages]; // [1, 2, '...', 48, 49, 50]
    }

    // if the current page is in one of the middle pages
    // Show first 2, suspense dots, current page, suspense dots, last 2
    return [1,
        '...',
        currentPage - 1,
        currentPage,
        currentPage + 1,
        '...',
        totalPages
    ]; // [1, 2, '...', 24, 25, 26, '...', 49, 50]

}
