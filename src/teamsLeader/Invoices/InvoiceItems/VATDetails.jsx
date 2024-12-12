import React, { useState, useEffect } from "react";
import { useStateContext } from "../../../contexts/ContextProvider";
import { BiPencil } from "react-icons/bi";

const VatDetails = () => {
  const { invoiceItems, downPayment, downPaymentAmount, setDownPaymentAmount, currency } =
    useStateContext();
  const [isEditingDownPayment, setIsEditingDownPayment] = useState(false);
  const [editDownPaymentValue, setEditDownPaymentValue] = useState("");
  const downPaymentValue = parseFloat(
    downPaymentAmount.replace(currency.symbol, "").trim()
  );

  const handleEditDownPaymentClick = () => {
    setEditDownPaymentValue(downPaymentAmount.replace(currency.symbol , "").trim()); // Remove currency symbol for editing
    setIsEditingDownPayment(true);
  };

  const handleDownPaymentChange = (event) => {
    setEditDownPaymentValue(event.target.value);
  };

  const handleDownPaymentBlur = () => {
    const numericValue = parseFloat(editDownPaymentValue) || 0;
    setDownPaymentAmount(`${currency.symbol} ${numericValue.toFixed(2)}`);
    setIsEditingDownPayment(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleDownPaymentBlur();
    }
  };

  const calculateVATDetails = (items, downPaymentAmount = 0) => {
    // Group items by VAT rate
    const groupedByVat = items.reduce((acc, item) => {
      const price = parseFloat(item.itemPrice) || 0;
      const quantity = parseInt(item.itemQuantity, 10) || 0;
      const vatRate = parseFloat(item.vatRate) || 0;

      // Calculate the subtotal for this item
      const itemTotal = price * quantity;

      // Initialize the VAT group if it does not exist
      if (!acc[vatRate]) {
        acc[vatRate] = { subtotal: 0, vatAmount: 0, total: 0 };
      }

      // Update the VAT group totals
      acc[vatRate].subtotal += itemTotal;
      acc[vatRate].vatAmount += itemTotal * (vatRate / 100);
      acc[vatRate].total += itemTotal + itemTotal * (vatRate / 100);

      return acc;
    }, {});

    // Calculate the overall totals
    const totals = {
      subtotalExcludingVAT: 0,
      totalVAT: 0,
      amountDue: 0,
      vatDetails: [],
    };

    for (const [rate, details] of Object.entries(groupedByVat)) {
      totals.subtotalExcludingVAT += details.subtotal;
      totals.totalVAT += details.vatAmount;
      totals.amountDue += details.total;
      totals.vatDetails.push({
        vatRate: rate,
        vatAmount: details.vatAmount.toFixed(2),
      });
    }
    totals.amountDue -= downPaymentAmount; // assuming downPaymentAmount is already a number

    // Format the overall totals
    totals.subtotalExcludingVAT = totals.subtotalExcludingVAT.toFixed(2);
    totals.totalVAT = totals.totalVAT.toFixed(2);
    totals.amountDue = totals.amountDue.toFixed(2);
    items.forEach((item) => {
      item.amountDue = `${currency.symbol} ${totals.amountDue}`;
    });
    return totals;
  };

  // Usage
  const vatTotals = calculateVATDetails(
    invoiceItems,
    downPayment ? downPaymentValue : 0
  );

  return (
    <div className="vat-details">
      {/* Other table rows above... */}
      <div className="flex text-right justify-end pb-2 uppercase text-xs">
        <span
          class="text-opacity-50 pr-2 font-bold tracking-[1px]"
          style={{
            color: "rgb(22, 113, 195)",
          }}
        >
          <p>Subtotal excluding VAT</p>
        </span>
        <span class="!w-24  text_customBlack text-opacity-60 whitespace-nowrap ">
          {currency.symbol} {vatTotals.subtotalExcludingVAT}
        </span>
      </div>
      {/* Dynamically generated VAT rate rows */}
      {vatTotals.vatDetails.map((vatDetail, index) => (
        <div
          key={index}
          className="flex justify-end text-right pb-3 uppercase text-xs"
        >
          <span
            className="text-opacity-50 pr-2 font-bold"
            style={{ color: "#1671c5" }}
          >
            VAT {vatDetail.vatRate}%
          </span>
          <span className="w-24 text_customBlack text-opacity-60">
          {currency.symbol}  {vatDetail.vatAmount}
          </span>
        </div>
      ))}

      <div className="flex justify-end text-right pb-3 uppercase text-xs">
        <span
          className="text-opacity-50 pr-2 font-bold"
          style={{ color: "#1671c5" }}
        >
          Total VAT
        </span>
        <span className="w-24 text_customBlack text-opacity-60">
        {currency.symbol}  {vatTotals.totalVAT}
        </span>
      </div>
      {downPayment && (
        <div className="flex justify-end text-right pb-3 uppercase text-xs">
          <span
            className="text-opacity-50 pr-2 font-bold"
            style={{ color: "#1671c5" }}
          >
            Down payment
          </span>
          <span className="w-24 text_customBlack text-opacity-60 relative">
            {isEditingDownPayment ? (
              <input
                type="text"
                value={editDownPaymentValue}
                onChange={handleDownPaymentChange}
                onBlur={handleDownPaymentBlur}
                onKeyDown={handleKeyDown}
                autoFocus
                className="text-right w-[80%]"
              />
            ) : (
              <span onClick={handleEditDownPaymentClick}>
              {currency.symbol}  {downPaymentAmount}
                <BiPencil className="inline cursor-pointer absolute right-[-20%] top-[11%]" />
              </span>
            )}
          </span>
        </div>
      )}
      <div className="flex justify-end mb-1">
        <div class="border-b border-dashed border-gray-400 w-24 custom_opacity0 group-hover:opacity-100"></div>
      </div>
      <div className="flex justify-end text-right pb-3 uppercase text-xs font-semibold">
        <span className="text-opacity-50 pr-2" style={{ color: "#1671c5" }}>
          Amount due
        </span>
        <span className="w-24 text_customBlack text-opacity-60">
        {currency.symbol}  {vatTotals.amountDue}
        </span>
      </div>

      {/* Other components or content */}
    </div>
  );
};
export default VatDetails;
