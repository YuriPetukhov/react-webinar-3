import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Pagination({ totalCount, limit, currentPage, onPageChange }) {
  const totalPages = Math.ceil(totalCount / limit);

  const handleClick = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;

    if (totalPages <= 1) {
      return null;
    } else if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage === 1) {
        pages.push(1, 2, 3, '...', totalPages);
      } else if (currentPage === totalPages) {
        pages.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...');

        const startPage = Math.max(currentPage - 1, 2);
        const endPage = Math.min(currentPage + 1, totalPages - 1);

        for (let i = startPage; i <= endPage; i++) {
          pages.push(i);
        }

        pages.push('...', totalPages);
      }
    }

    return pages.map((page, index) => {
      if (page === '...' && (pages[index - 1] === 1 && pages[index + 1] === 2)) {
        return null;
      }

      return (
        <button
          key={index}
          onClick={() => handleClick(page)}
          disabled={page === currentPage || page === '...'}
          className={page === currentPage ? 'active' : ''}
        >
          {page}
        </button>
      );
    }).filter(Boolean);
  };

  return (
    <div className="pagination">
      {renderPageNumbers()}
    </div>
  );
}

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalCount: PropTypes.number.isRequired,
  limit: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
