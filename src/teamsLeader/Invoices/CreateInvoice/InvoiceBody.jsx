import React from "react";
import { useStateContext } from "../../../contexts/ContextProvider";
import { BiPencil } from "react-icons/bi";
import InvoiceItems from "../InvoiceItems/InvoiceItems";
const InvoiceBody = () => {
  const { selectedColorInvoice, clientDetails } = useStateContext();

  function isColorLight(hex) {
    // Convert hex color to RGB
    const hexColor = hex.replace("#", "");
    const r = parseInt(hexColor.substr(0, 2), 16);
    const g = parseInt(hexColor.substr(2, 2), 16);
    const b = parseInt(hexColor.substr(4, 2), 16);

    // Using the formula for luminance to calculate brightness
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 155;
  }

  const textColor = isColorLight(selectedColorInvoice) ? "#000000" : "#FFFFFF";

  return (
    <>
      {" "}
      {/* <div className="flex-1 flex flex-col px-10 relative" id="invoice-body"> */}
      {/* <div className="w-full mt-3">
          <div
            className="rounded-md font-bold text-xs uppercase "
            style={{ backgroundColor: selectedColorInvoice, color: textColor }}
          >
            <div className="flex py-1.5 px-2 border-b mb-2">
              <div className="flex-1">description</div>
              <div className="w-1/5 whitespace-nowrap">Price (excl. VAT)</div>
              <div className="w-[10%] whitespace-nowrap text-center">
                Quantity
              </div>
              <div className="w-[10%] whitespace-nowrap text-right">Total</div>
            </div>
          </div>
        </div> */}
      {/* Placeholder for Line Items */}
      {/* You can repeat the above placeholder for each item in the invoice */}
      {/* <div className="my-2">
          <div className="flex justify-between items-center border-b py-2">
            <div className="flex-1">Item Description</div>
            <div className="w-1/5">€0.00</div>
            <div className="w-[10%] text-center">1</div>
            <div className="w-[10%] text-right">€0.00</div>
          </div>
        </div> */}
      {/* =================================No Client Selected============================= */}
      <InvoiceItems textColor={textColor} />
      {/* )} */}
      {/* Total Amount Due */}
      {/* </div> */}
    </>
  );
};

export default InvoiceBody;
