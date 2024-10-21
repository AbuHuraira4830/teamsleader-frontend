import React from "react";
import Button from "@mui/material/Button";

const TeamsPagination = ({ totalPages, currentPage, handlePageChange }) => {
  return (
    <div className="flex justify-center mt-4">
      {Array.from({ length: totalPages }).map((_, index) => (
        <Button
          key={index + 1}
          variant="outlined"
          size="small"
          onClick={() => handlePageChange(index + 1)}
          style={{
            margin: "0 0.5rem",
            fontSize: "0.8rem",
            padding: "0.2rem 0.5rem",
          }}
          disabled={currentPage === index + 1}
        >
          {index + 1}
        </Button>
      ))}
    </div>
  );
};

export default TeamsPagination;
