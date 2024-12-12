import React, { useState, useEffect } from "react";
import { useStateContext } from "../../../contexts/ContextProvider";
import OffCanvasItems from "./OffCanvasItems";
import { BiPencil, BiTrash } from "react-icons/bi";
import { v4 as uuidv4 } from "uuid";
import VatDetails from "./VATDetails";
import NotesComments from "../CreateInvoice/FooterSection/NotesComments";

const InvoiceItems = ({ textColor }) => {
  const { selectedColorInvoice, invoiceItems, setInvoiceItems, clientDetails, currency } =
    useStateContext();

  const [selectedItemDetails, setSelectedItemDetails] = useState(null);

  const [showCanvasPassword, setShowCanvasPassword] = useState(false);
  const closeCanvasPassword = () => setShowCanvasPassword(false);
  const toggleCanvasPassword = () => setShowCanvasPassword((s) => !s);

  const handleSelectItems = (item) => {
    setInvoiceItems(item);
    closeCanvasPassword();
  };

  const handleSaveItemDetails = (details) => {
    console.log("ItemDetails", details);
    setInvoiceItems((prevDetails) => [
      ...prevDetails,
      { ...details, id: uuidv4() },
    ]);

    closeCanvasPassword();
  };

  const calculateAmountDue = (items) => {
    // Initialize totals
    let subtotalExcludingVAT = 0;
    let totalVAT = 0;

    // Iterate over each item to calculate the totals
    items.forEach((item) => {
      // Parse the numeric values from strings
      const price = parseFloat(item.itemPrice) || 0; // Parse item price as float
      const quantity = parseInt(item.itemQuantity, 10) || 0; // Parse item quantity as integer
      const vatRate = parseFloat(item.vatRate) / 100 || 0; // Parse VAT rate as float and convert percentage to decimal

      // Calculate totals
      const totalItemPrice = price * quantity; // Total price for the item
      subtotalExcludingVAT += totalItemPrice;
      totalVAT += totalItemPrice * vatRate;
    });

    // Calculate amount due by adding subtotal and total VAT
    const amountDue = subtotalExcludingVAT + totalVAT;
    return amountDue; // Convert the result to a string with two decimal places
  };

  // Usage
  const amountDue = calculateAmountDue(invoiceItems); // Assuming invoiceItems is an array of item objects
  console.log(`Amount due: € ${amountDue}`);
  const handleDeleteItem = (itemId) => {
    // Filter out the item with the matching id
    const updatedItems = invoiceItems.filter((item) => item.id !== itemId);
    // Update state with the filtered items array
    setInvoiceItems(updatedItems);
  };

  useEffect(() => {}, [invoiceItems, selectedItemDetails]); // Dependencies

  return (
    <>
      <div className="flex-1 flex flex-col px-10 relative" id="invoice-body">
        <div className="flex-1 invoiceItemsTable">
          <table className="w-full mt-3">
            <thead>
              <tr
                className="rounded-md invoiceItemRow font-bold text-xs text-left flex py-1.5 px-2 uppercase border-b mb-2 text-white"
                style={{
                  backgroundColor: `${selectedColorInvoice} `,
                  color: `${textColor} `,
                }}
              >
                <td className="flex-1 text-left">Description</td>
                <td className="w-1/5 whitespace-nowrap">Price (excl. VAT)</td>
                <td className="w-1/5 whitespace-nowrap text-center">
                  VAT rate
                </td>
                <td
                  className={`whitespace-nowrap text-center ${
                    invoiceItems.some((item) => item.itemDiscount)
                      ? "w-[10%]"
                      : "w-1/5"
                  }`}
                >
                  Quantity
                </td>
                {invoiceItems.some((item) => item.itemDiscount) && ( // Check if any item has a discount
                  <td className="w-1/5 whitespace-nowrap text-center">
                    Discount
                  </td>
                )}

                <td className="w-[10%] whitespace-nowrap pr-1 text-right">
                  Total
                </td>
              </tr>
            </thead>
            <tbody>
              {invoiceItems.map((item, index) => (
                <div className="group relative">
                  <div
                    className=" rounded-item-row hover:bg-neutral-50 px-1.5 border-[1.5px] border-transparent border-t-[1.5px] border-t-primary-100 hover:!border-neutral hover:!border-dashed hover:rounded-lg hover:border-[1.5px] flex items-center w-full item-row relative text-opacity-60"
                    onClick={toggleCanvasPassword}
                  >
                    <button className="disabled:cursor-not-allowed flex items-center justify-center  rounded-full  focus:outline-none focus-visible:ring-1 focus-visible:ring-offset-2 focus-visible:ring-primary  px-0 !py-0 text-xs  flex-1 peer  ">
                      <tr
                        key={index}
                        className="flex-1 flex text_customBlack  text-left leading-tight py-[0.6rem]  text-xs"
                      >
                        <td className="flex-1 break-words pr-2 whitespace-pre-wrap">
                          <div
                            className="font-semibold text-left"
                            style={{ color: selectedColorInvoice }}
                          >
                            {item.name}
                          </div>
                          {item.itemDescription && (
                            <div className="break-word">
                              {item.itemDescription}
                            </div>
                          )}
                        </td>
                        <td className="w-1/5 whitespace-nowrap text-left">{`${currency.symbol} ${ item.itemPrice}`}</td>
                        <td className="w-1/5 whitespace-nowrap text-center">{`${item.vatRate} %`}</td>
                        <td className="w-[10%] whitespace-nowrap text-center truncate-wrap">
                          {item.itemQuantity}
                        </td>
                        {/* {item.itemDiscount && ( 
                          <td className="w-1/5 whitespace-nowrap text-center">{`${item.itemDiscount}%`}</td>
                        )} */}
                        <td className="w-1/5 text-center">
                          {item.itemDiscount ? `${item.itemDiscount}%` : "-"}
                        </td>
                        {/* <td className="w-1/5 whitespace-nowrap">{`${item.itemDiscount}`}</td> */}
                        <td className="w-[10%] whitespace-nowrap text-right">{`${currency.symbol} ${(
                          item.itemPrice * item.itemQuantity
                        ).toFixed(2)}`}</td>
                      </tr>
                    </button>
                  </div>
                  {item.itemDescription ? (
                    <div className="w-6 absolute z-10 top-[0.7rem] -right-[1.5rem] custom_opacity0   ">
                      <BiTrash
                        className="text-blue-500 hover:text-blue-600 cursor-pointer ml-2"
                        // onClick={() => handleDeleteItem(item.id)}
                      />
                    </div>
                  ) : (
                    <div className="w-6 absolute z-10 top-[0.5rem] -right-[1.5rem] custom_opacity0   ">
                      <BiTrash
                        className="text-blue-500 hover:text-blue-600 cursor-pointer ml-2"
                        onClick={() => handleDeleteItem(item.id)}
                      />
                    </div>
                  )}
                </div>
              ))}
            </tbody>
          </table>
          {!clientDetails.length > 0 ? (
            // {clientDetails.length > 0 ? (
            <div className="my-3">
              <button
                type="button"
                disabled
                className="disabled:cursor-not-allowed inline-flex custom_opacity0 group-hover:opacity-50 items-center justify-center font-semibold rounded-full focus:outline-none w-full py-2.5  border-opacity-25 "
                style={{
                  borderWidth: "1px",
                  borderColor: "rgb(22, 113, 195)",
                  color: "rgb(22, 113, 195)",
                }}
              >
                <span className="text-sm">First, select a client</span>
              </button>
            </div>
          ) : (
            <>
              {/* Table Headers */}

              <div className="my-3">
                <button
                  type="button"
                  className=" inline-flex cursor-pointer custom_opacity0 group-hover:opacity-100 items-center justify-center font-semibold rounded-full focus:outline-none w-full py-2.5 border-opacity-25 "
                  style={{
                    borderWidth: "1px",
                    borderColor: "rgb(22, 113, 195)",
                    color: "rgb(22, 113, 195)",
                  }}
                  onClick={toggleCanvasPassword}
                >
                  <BiPencil className="mr-2" />
                  <span className="text-sm font-normal">Add a new item</span>
                </button>
              </div>

              <OffCanvasItems
                show={showCanvasPassword}
                handleClose={closeCanvasPassword}
                handleSaveItemDetails={handleSaveItemDetails}
                // pass other necessary props
              />
            </>
          )}
          <div className="text-right mt-2">
            <VatDetails />
          </div>
        </div>
      </div>
      {/* Notes and Comments */}
      <NotesComments />
    </>
  );
};

export default InvoiceItems;
