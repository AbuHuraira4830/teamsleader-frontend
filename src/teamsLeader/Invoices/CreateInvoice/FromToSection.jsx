import React, { useState, useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import PersonalDetailsModal from "./PersonalDetails/PersonalDetailsModal";
import OffCanvasInvoice from "./ClientDetails/OffCanvasInvoice";
import { useStateContext } from "../../../contexts/ContextProvider";
import { v4 as uuidv4 } from "uuid";

const FromToSection = () => {
  const { selectedColorInvoice, clientDetails, setClientDetails } =
    useStateContext();
  const [selectedClientDetails, setSelectedClientDetails] = useState(null);

  const [showCanvasPassword, setShowCanvasPassword] = useState(false);
  const closeCanvasPassword = () => setShowCanvasPassword(false);
  const toggleCanvasPassword = () => setShowCanvasPassword((s) => !s);

  const handleSelectClient = (client) => {
    setSelectedClientDetails(client);
    closeCanvasPassword();
  };

  const handleSaveClientDetails = (details) => {
    console.log("DetailsClient", details);
    setClientDetails((prevDetails) => [
      ...prevDetails,
      { ...details, id: uuidv4() },
    ]);
    closeCanvasPassword();
  };
  console.log("ClientDetails", clientDetails);

  useEffect(() => {}, [clientDetails, selectedClientDetails]);

  return (
    <>
      <div
        className="p-4 rounded-lg"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.02)" }}
      >
        {/* "From" Section */}
        <div className="text-xs">
          <div className="flex gap-4 items-center mb-2 text-black text-opacity-60">
            <span className="flex-1 px-1">From</span>
            <span className="flex-1 px-1">To</span>
          </div>
        </div>
        <div className="flex justify-between gap-4 min-h-[110px]">
          <div className="flex-1 flex flex-col text-sm">
            <div className="block w-full cursor-pointer">
              <PersonalDetailsModal />
            </div>
          </div>
          {/* ============Client INfo================ */}
          {selectedClientDetails ? (
            <div className="flex-1" onClick={toggleCanvasPassword}>
              <div className="w-full cursor-pointer">
                <div className="personal_detailsInvoices text-left px-1 font-normal min-h-34 border-[#262626] border-dashed rounded-lg text-black text-sm flex flex-col h-full">
                  <span
                    className="mb-2 text-sm font-bold"
                    style={{ color: selectedColorInvoice }}
                  >
                    {selectedClientDetails.name}
                  </span>
                  <div className="text-xs text_customBlack text-opacity-60 flex flex-col">
                    <span>{selectedClientDetails.address}</span>
                    <span>
                      {selectedClientDetails.postalCode}{" "}
                      {selectedClientDetails.city}
                    </span>
                    <span>{selectedClientDetails.country}</span>
                    {selectedClientDetails.vatNo && (
                      <span className="mt-2">
                        VAT: {selectedClientDetails.vatNo}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : clientDetails && clientDetails.length > 0 ? (
            <div className="flex-1" onClick={toggleCanvasPassword}>
              <div className="w-full cursor-pointer">
                <div className="personal_detailsInvoices text-left px-1 font-normal min-h-34 border-[#262626] border-dashed rounded-lg text-black text-sm flex flex-col h-full">
                  <span
                    className="mb-2 text-sm font-bold"
                    style={{ color: selectedColorInvoice }}
                  >
                    {clientDetails[clientDetails.length - 1].name}
                  </span>
                  <div className="text-xs text_customBlack text-opacity-60 flex flex-col">
                    <span>
                      {clientDetails[clientDetails.length - 1].address}
                    </span>
                    <span>
                      {clientDetails[clientDetails.length - 1].postalCode}{" "}
                      {clientDetails[clientDetails.length - 1].city}
                    </span>
                    <span>
                      {clientDetails[clientDetails.length - 1].country}
                    </span>
                    {clientDetails[clientDetails.length - 1].vatNo && (
                      <span className="mt-2">
                        VAT: {clientDetails[clientDetails.length - 1].vatNo}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div
              className="flex-1  transition-all  "
              onClick={toggleCanvasPassword}
            >
              <div className="w-full cursor-pointer">
                <div className="w-full py-6 px-10 text-center text-[#262626] font-normal flex items-center  justify-center  border-transparent border-dashed custom_borderStyle  rounded-lg transition-all hover:border-[#262626]">
                  <div className="flex items-center justify-center ">
                    <AiOutlinePlus className="mr-2" />
                    <span className="normal-case text-sm">
                      Add client information
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <OffCanvasInvoice
          show={showCanvasPassword}
          handleClose={closeCanvasPassword}
          handleSaveClientDetails={handleSaveClientDetails}
          handleSelectClient={handleSelectClient}
        />
      </div>
    </>
  );
};

export default FromToSection;
