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
          disabled={!previousPage}
          onClick={onPreviousPage}
          variant="light"
        >
          Previous Page
        </Button>
      </div>

      <div className="page">
        Page {page}
        {totalPages && <>/{totalPages}</>}
      </div>

      <div className="next">
        <Button disabled={!nextPage} onClick={onNextPage} variant="light">
          Next Page
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
