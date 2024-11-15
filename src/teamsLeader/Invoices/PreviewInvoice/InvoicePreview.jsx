import React from "react";
import OfCanvasPreview from "./OfCanvasPreview";

const InvoicePreview = ({ show, handleClose }) => {
  return (
    <div>
      <OfCanvasPreview handleClose={handleClose} show={show} />
    </div>
  );
};

export default InvoicePreview;
