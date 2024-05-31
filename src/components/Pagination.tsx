import React from "react";
import { Button } from "react-bootstrap";

interface PaginationProps {
  nextPage: boolean;
  previousPage: boolean;
  onNextPage: () => void;
  onPreviousPage: () => void;
  page: number;
  totalPages?: number;
}

const Pagination: React.FC<PaginationProps> = ({
  nextPage,
  previousPage,
  onNextPage,
  onPreviousPage,
  page,
  totalPages,
}) => {
  return (
    <div className="d-flex justify-content-between align-items-center mt-4">
      <div className="prev">
        <Button
          className="primary-button"
          disabled={!previousPage}
          onClick={onPreviousPage}
        >
          Previous Page
        </Button>
      </div>

      <div className="page">
        Page {page}
        {totalPages && <> of {totalPages}</>}
      </div>

      <div className="next">
        <Button
          className="primary-button"
          disabled={!nextPage}
          onClick={onNextPage}
        >
          Next Page
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
