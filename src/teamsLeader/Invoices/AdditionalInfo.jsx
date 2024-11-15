import React from "react";
import InvoiceStatus from "./InvoiceStatus";
import RevenuePayment from "./RevenuePayment";
import VATDeclaration from "./VATDeclaration";
const AdditionalInfo = () => {
  return (
    <div>
      {/* Style section */}
      <h5 className=" text-primary-invoice  capitalize  text-3xl mb-3 mt-7">
        Information
      </h5>
      <InvoiceStatus />
      <RevenuePayment />
      {/* <VATDeclaration /> */}
    </div>
  );
};

export default AdditionalInfo;
