import React from "react";
import InvoiceStatus from "../InvoiceStatus";

const StatusPreview = () => {
  return (
    <div>
      <div className="mb-3 text-sm text-primary-700">Status</div>
      <InvoiceStatus />
    </div>
  );
};

export default StatusPreview;
