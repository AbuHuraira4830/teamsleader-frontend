import React, { useState, useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import OffCanvasPersonal from "./OffCanvasPersonal";
import { useStateContext } from "../../../../contexts/ContextProvider";
import { v4 as uuidv4 } from "uuid";

const PersonalDetailsModal = () => {
  const { selectedColorInvoice, setPersonalDetails, personalDetails } =
    useStateContext();

  const [showCanvasPassword, setShowCanvasPassword] = useState(false);
  const closeCanvasPassword = () => setShowCanvasPassword(false);
  const toggleCanvasPassword = () => setShowCanvasPassword((s) => !s);
  const [selectedPersonalDetails, setSelectedPersonalDetails] = useState(null);

  const handleSelectPersonal = (person) => {
    setSelectedPersonalDetails(person);
    closeCanvasPassword();
  };

  const handleSavePersonalDetails = (details) => {
    setPersonalDetails((prevDetails) => [
      ...prevDetails,
      { ...details, id: uuidv4() },
    ]);
    closeCanvasPassword();
  };

  useEffect(() => {}, [personalDetails, selectedPersonalDetails]);
  return (
    <>
      {selectedPersonalDetails ? (
        <div
          className="personal_detailsInvoices text-left px-1 font-normal min-h-34 border-[#262626] border-dashed rounded-lg  text-black text-sm flex flex-col h-full "
          onClick={toggleCanvasPassword}
        >
          <span
            className="mb-2 text-sm font-bold"
            style={{ color: selectedColorInvoice }}
          >
            {selectedPersonalDetails.companyName}
          </span>
          <div className="text-xs text_customBlack text-opacity-60 flex flex-col">
            <span>{selectedPersonalDetails.address}</span>
            <span>
              {selectedPersonalDetails.postalCode}{" "}
              {selectedPersonalDetails.city}
            </span>
            <span>{selectedPersonalDetails.country}</span>
            <span className="mt-2">
              VAT: {selectedPersonalDetails.vatNumber}
            </span>
          </div>
        </div>
      ) : personalDetails && personalDetails.length > 0 ? (
        <div className="flex-1" onClick={toggleCanvasPassword}>
          <div className="w-full cursor-pointer">
            <div className="personal_detailsInvoices text-left px-1 font-normal min-h-34 border-[#262626] border-dashed rounded-lg text-black text-sm flex flex-col h-full">
              <span
                className="mb-2 text-sm font-bold"
                style={{ color: selectedColorInvoice }}
              >
                {personalDetails[personalDetails.length - 1].name}
              </span>
              <div className="text-xs text_customBlack text-opacity-60 flex flex-col">
                <span>
                  {personalDetails[personalDetails.length - 1].address}
                </span>
                <span>
                  {personalDetails[personalDetails.length - 1].postalCode}{" "}
                  {personalDetails[personalDetails.length - 1].city}
                </span>
                <span>
                  {personalDetails[personalDetails.length - 1].country}
                </span>
                {personalDetails[personalDetails.length - 1].vatNumber && (
                  <span className="mt-2">
                    VAT: {personalDetails[personalDetails.length - 1].vatNumber}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          onClick={toggleCanvasPassword}
          className=" hover:border-[#262626] w-full py-6 px-10 text-center text-white font-normal border-transparent items-center justify-center custom_borderStyle   border-dashed rounded-lg   bg-opacity-5 hover:bg-opacity-25 transition-all h-auto invert-black "
        >
          <div className="flex items-center justify-center transition-all">
            <AiOutlinePlus className="text-[#262626] mr-2" />
            <span className="normal-case text-[#262626] text-sm">
              Personal Details
            </span>
          </div>
        </div>
      )}

      <OffCanvasPersonal
        show={showCanvasPassword}
        handleClose={closeCanvasPassword}
        handleSavePersonalDetails={handleSavePersonalDetails}
        handleSelectPersonal={handleSelectPersonal}
      />
    </>
  );
};

export default PersonalDetailsModal;
