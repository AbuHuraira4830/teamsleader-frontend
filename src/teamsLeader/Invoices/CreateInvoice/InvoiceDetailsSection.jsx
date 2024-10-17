import React, { useState, useEffect } from "react";
import InvoiceSettings from "../InvoiceSettings";
import FromToSection from "./FromToSection";
import InvoiceBody from "./InvoiceBody";
import InvoiceDates from "./InvoiceDates";
import AddLogo from "./AddLogo";
import { HiPencil } from "react-icons/hi2";
import { BiPencil } from "react-icons/bi";
import { CiCalendar } from "react-icons/ci";
import { useStateContext } from "../../../contexts/ContextProvider";
const InvoiceDetailsSection = () => {
  const {
    selectedColorInvoice,
    setInvoiceNumber,
    invoiceNumber,
    formattedInvoiceNumber,
  } = useStateContext();
  useEffect(() => {
    setInvoiceNumber((prevNumber) => prevNumber + 1);
  }, []);

  return (
    <>
      <div className="flex pt-6">
        {/* Invoice Left Column */}
        <div
          id="invoice"
          className="transition-all invoice-container flex flex-1 flex-col shadow-lg bg-white mb-10 group relative overflow-hidden "
          // style={{ height: "11.69in", width: "8.27in" }}
        >
          <div className="px-10 pt-10 pb-3 ">
            <div className="p-0.5">
              <div className="grid grid-cols-3 gap-5 mb-5">
                <div data-highlight-id="revenueNumber">
                  <div className="flex gap-2 items-center">
                    <div className=" py-1 group-hover:border-gray-300  group-hover:block border-transparent border-b border-dashed">
                      <div className="flex w-full items-center">
                        <span
                          className="uppercase mr-1 text-sm font-bold whitespace-nowrap"
                          style={{ color: selectedColorInvoice }}
                        >
                          Invoice
                        </span>
                        <input
                          className=" bg-white placeholder-primary-400 border-none !py-0 !h-auto text-sm font-bold outline-none inline-block
                          focus:border-primary-500 p-0 w-full pr-4 pl-1  focus:ring-primary-900
                          text-main focus:ring-2 focus:ring-opacity-25 rounded-lg
                            "
                          type="text"
                          defaultValue={formattedInvoiceNumber}
                          style={{ color: selectedColorInvoice }}
                        />
                        <div>
                          <BiPencil
                            className="ml-1"
                            style={{ color: selectedColorInvoice }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/*==================Add Logo================ */}
                <AddLogo />
                <InvoiceDates />
              </div>
            </div>
            <FromToSection />
          </div>
          <InvoiceBody />
        </div>
        {/* =============================================================================== */}
        {/* Invoice Right Column */}
        <InvoiceSettings />
      </div>
    </>
  );
};

export default InvoiceDetailsSection;
