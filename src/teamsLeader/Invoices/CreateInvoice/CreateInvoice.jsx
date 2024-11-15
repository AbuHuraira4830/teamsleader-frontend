import React, { useState } from "react";
import "../createInvoice.css";
import HeaderSectionInvoice from "./HeaderSectionInvoice";
import InvoiceDetailsSection from "./InvoiceDetailsSection";
import { useStateContext } from "../../../contexts/ContextProvider";
import { AiOutlineWarning } from "react-icons/ai";

const CreateInvoice = () => {
  const { validationErrors, setValidationErrors } = useStateContext();
  return (
    <div
      id="LAYOUT_CONTENT"
      className="py-14 bg-no-repeat bg-[60%_-120px] bg-[length:273px_auto] px-8 bg-primary-25 font_arial"
    >
      <HeaderSectionInvoice />
      {/* {validationErrors.length > 0 && (
        <div
          className="bg-pink-100 border-l-4 border-pink-500 text-pink-700 p-4 text-sm"
          role="alert"
        >
          
          <p className="font-bold">There were some errors with your invoice:</p>
          <ul className="list-disc	 mb-0 text-[0.8rem] ">
            {validationErrors.map((error, index) => (
              <li key={index} className="py-[0.2rem]">
                {error}
              </li>
            ))}
          </ul>
        </div>
      )} */}
      {validationErrors.length > 0 && (
        <div
          className="bg-pink-100 border-l-4 border-pink-500 text-pink-700 p-4 flex items-start"
          role="alert"
        >
          <AiOutlineWarning className="text-pink-700 mr-3 " size="1.3em" />
          <div>
            <p className="font-bold">
              There were some errors with your invoice:
            </p>
            <ul className="list-disc	 mb-0 text-[0.8rem] ">
              {validationErrors.map((error, index) => (
                <li key={index} className="py-[0.2rem]">
                  {error}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      <InvoiceDetailsSection />
    </div>
  );
};

export default CreateInvoice;
