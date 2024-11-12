import React from 'react';
import styles from './paging.module.scss';

const Pagination = ({ currentPage, totalPages, onPageChange, itemsPerPage, totalItems }) => {
    const pages = [];
    const maxVisiblePages = 5; // Maximum number of visible pages

    if (totalPages <= maxVisiblePages) {
        for (let i = 1; i <= totalPages; i++) {
            pages.push(i);
        }
    } else {
        let startPage = Math.max(1, currentPage - 2);
        let endPage = Math.min(totalPages, currentPage + 2);

        if (currentPage > totalPages - 2) {
            startPage = totalPages - 4;
            endPage = totalPages;
        } else if (currentPage < 3) {
            startPage = 1;
            endPage = 5;
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        if (startPage > 1) {
            pages.unshift(1, '...');
        }
        if (endPage < totalPages) {
            pages.push('...', totalPages);
        }
    }

    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);

    return (
        <div className={styles.paginationContainer}>
            <div className={styles.pageControls}>
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={styles.paginationButton}
                >
                    &#9654;
                </button>
                {pages.map((page, index) => (
                    <button
                        key={index}
                        onClick={() => typeof page === 'number' && onPageChange(page)}
                        className={`${styles.paginationButton} ${currentPage === page ? styles.active : ''}`}
                        disabled={page === '...'}
                    >
                        {page}
                    </button>
                ))}
                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={styles.paginationButton}
                >
                    &#9664;
                </button>
            </div>
            <div className={styles.recordCount}>
                نمایش {startItem} تا {endItem} از {totalItems}
            </div>
        </div>
    );
};

export default Pagination;