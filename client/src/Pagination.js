import React, { useEffect, useState } from "react";
import Button from "../Button/Button";
import "./Pagination.css";
import {
  FiChevronsLeft,
  FiChevronsRight,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
// import { BsChevronExpand } from "react-icons/bs";
import { Icon } from "@iconify/react";

function getPageNumbers(current, max = 1) {
  if (max === 1) return [];
  if (current === 1) {
    return max >= 3 ? [1, 2, 3] : [1, 2];
  } else if (current === max) {
    return max >= 3
      ? [current - 2, current - 1, current]
      : [current - 1, current];
  } else {
    return [current - 1, current, current + 1];
  }
}

export default function Pagination({
  allItems,
  renderedItems,
  setRenderedItems,
}) {
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [showDropdown, setShowDropdown] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    setTotalPages(Math.ceil(allItems?.length / rowsPerPage));
  }, [allItems, rowsPerPage]);
  useEffect(() => {
    setRenderedItems(allItems?.slice(0, rowsPerPage));
  }, [allItems, rowsPerPage]);

  if (totalPages <= 1) {
    return <></>;
  }

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setRenderedItems(
      allItems?.slice((page - 1) * rowsPerPage, page * rowsPerPage)
    );
    console.warn("pagechange", page);
  };

  // const middleButtons = getPageNumbers(currentPage, totalPages).map(
  //   (pageNumber) => {
  //     return (
  //       <button
  //         key={pageNumber}
  //         className={
  //           "pagination-btn" + (pageNumber === currentPage ? " active" : "")
  //         }
  //         onClick={() => handlePageChange(pageNumber)}
  //       >
  //         {pageNumber}
  //       </button>
  //     );
  //   }
  // );

  const handleDropdownClick = (value) => {
    setRowsPerPage(value);
    setShowDropdown(false);
  };

  return (
    <div className="pagination">
      <div className="pagination-buttons">
        <div className="rows-per-page-box">
          <span>rows per page</span>
          <div
            className="dropdown"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <button
              className="dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              aria-haspopup="true"
              aria-expanded={showDropdown ? "true" : "false"}
            >
              <span id="selected-value">{rowsPerPage}</span>
              <Icon
                icon="heroicons:chevron-up-down-solid"
                width="14"
                height="14"
                style={{ color: "#3D434E" }}
              />
            </button>
            {showDropdown && (
              <div
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton"
              >
                {[5, 10, 25, 50].map((value) => (
                  <div
                    key={value}
                    className="dropdown-item"
                    onClick={() => handleDropdownClick(value)}
                  >
                    {value}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        {/* {middleButtons} */}
        <span className="page-list">
          page {currentPage} of {totalPages}
        </span>
        <Button
          variant="secondary"
          onClick={() => handlePageChange(1)}
          disabled={currentPage <= 1}
        >
          <FiChevronsLeft />
        </Button>
        <Button
          variant="secondary"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage <= 1}
        >
          <FiChevronLeft />
        </Button>
        {/* {currentPage != 1 && (
          <Button
            variant="secondary"
            onClick={() => handlePageChange(currentPage - 1)}
            // disabled={currentPage <= 1}
            style={{ width: "3rem" }}
          >
            {currentPage - 1}
          </Button>
        )}
        <Button
          variant="secondary"
          onClick={() => handlePageChange(currentPage)}
          // disabled={currentPage <= 1}
          style={{ width: "3rem" }}
        >
          {currentPage}
        </Button>
        {currentPage != totalPages && (
          <Button
            variant="secondary"
            onClick={() => handlePageChange(currentPage + 1)}
            // disabled={currentPage <= 1}
            style={{ width: "3rem" }}
          >
            {currentPage + 1}
          </Button>
        )} */}
        <Button
          variant="secondary"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
        >
          <FiChevronRight />
        </Button>
        <Button
          variant="secondary"
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage >= totalPages}
        >
          <FiChevronsRight />
        </Button>
      </div>
    </div>
  );
}