import React from "react";
import RevenuePayment from "../RevenuePayment";
const AdditionalInfoPreview = () => {
  return (
    <div>
      {/* Style section */}
      <h5 className=" text-primary-invoice  capitalize  text-xl  mt-3">
        Information
      </h5>
      <RevenuePayment />
      {/* <VATDeclaration /> */}
    </div>
  );
};

export default AdditionalInfoPreview;
