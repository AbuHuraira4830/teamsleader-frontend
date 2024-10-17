import React, { useState } from "react";
import { useStateContext } from "../../../../contexts/ContextProvider";

import { BiPencil } from "react-icons/bi";

const IBANComponent = () => {
  const {
    structuredCommunication,
    generateStructuredCommunicationNumber,
    communicationNumber,
    selectedColorInvoice,
  } = useStateContext();
  const [editIban, setEditIban] = useState(false);
  const [iban, setIban] = useState(""); // default value or fetched from somewhere

  const handleIbanChange = (e) => {
    setIban(e.target.value.toUpperCase());
  };

  const toggleEditIban = () => {
    setEditIban(!editIban);
  };

  return (
    <div className="flex items-center">
      {editIban ? (
        <input
          className="bg-transparent placeholder-primary-400 border-none py-0 h-auto text-sm font-bold outline-none inline-block
                     p-0 w-full pr-4 pl-1 focus:ring-primary-900 text-main focus:ring-2 focus:ring-opacity-25 rounded-lg"
          type="text"
          value={iban}
          style={{ color: selectedColorInvoice }}
          onChange={handleIbanChange}
          onBlur={() => setEditIban(false)} // Optional: to leave edit mode when input loses focus
          autoFocus
        />
      ) : (
        <>
          <span style={{ color: selectedColorInvoice }}>{iban}</span>
          <BiPencil
            onClick={toggleEditIban}
            className="ml-1 cursor-pointer"
            style={{ color: selectedColorInvoice }}
          />
        </>
      )}
    </div>
  );
};

export default IBANComponent;
