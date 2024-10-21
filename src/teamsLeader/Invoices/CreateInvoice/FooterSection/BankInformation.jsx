import React, { useState, useEffect } from "react";
import { useStateContext } from "../../../../contexts/ContextProvider";
import { BiPencil } from "react-icons/bi";
import IBANComponent from "./IBANComponent";
const BankInformation = () => {
  const {
    structuredCommunication,
    generateStructuredCommunicationNumber,
    communicationNumber,
    selectedColorInvoice,
  } = useStateContext();
  const [editIban, setEditIban] = useState(false);
  const [iban, setIban] = useState("");
  const [showBankInfo, setShowBankInfo] = useState(false);

  const handleIbanChange = (e) => {
    setIban(e.target.value.toUpperCase()); // Assuming IBAN is typically uppercase
  };
  return (
    <>
      <div
        className="flex justify-between p-4 my-10 text-black font-bold rounded-lg"
        style={{
          backgroundColor: "rgba(0,0,0,0.1)",
        }}
      >
        <div className="flex-1">
          <div>
            <div className="cursor-pointer">
              <div
                className="flex flex-col p-1 font-normal text-black text-xs border-[#262626] text-center items-start border-dashed rounded-lg transition-all"
                onMouseEnter={() => setEditIban(true)}
                onMouseLeave={() => setEditIban(false)}
              >
                <div className="flex gap-4 items-center w-full">
                  <div className="flex flex-col w-full leading-tight font-bold text-black tracking-[1px]">
                    {/* {!showBankInfo ? (
                      <div
                        className="flex flex-col  p-1 font-normal text-black text-xs custom_opacity0 custom_borderStyle  
                   group-hover:opacity-100 border-[#262626]  text-center  items-start    border-dashed rounded-lg    transition-all  "
                        onClick={() => setShowBankInfo(true)}
                      >
                        <div className="flex gap-4 items-center w-full">
                          <div className="flex flex-col w-full leading-tight font-bold text-black tracking-[1px]">
                            <span className="block w-full text-center">
                              + Add Banking Information
                            </span>
                          </div>
                        </div>
                      </div>
                    ) : ( */}
                    <>
                      {/* <span className="block w-full text-left">
                        IBAN:
                        {editIban ? (
                          <input
                            type="text"
                            value={iban}
                            onChange={handleIbanChange}
                            className=" inline  bg-white placeholder-primary-400 border-none text-xs font-bold outline-none
                          focus:border-primary-500 px-1  focus:ring-primary-900
                          focus:ring-2 focus:ring-opacity-25 rounded-lg"
                            autoFocus
                            style={{ color: selectedColorInvoice }}
                          />
                        ) : (
                          iban
                        )}
                      </span> */}

                      <div className=" py-1 group-hover:border-[#262626]   group-hover:block border-transparent border-b border-dashed">
                        <div className="flex w-full items-center">
                          <div
                            className="uppercase mr-1 text-sm font-bold whitespace-nowrap flex items-center"
                            style={{ color: selectedColorInvoice }}
                          >
                            IBAN:
                            <IBANComponent />
                          </div>
                        </div>
                      </div>

                      {/* ================================================================== */}
                      {structuredCommunication && communicationNumber && (
                        <span className="text-left text-opacity-100 mt-1">
                          Communication: {communicationNumber}
                        </span>
                      )}
                    </>
                    {/* )} */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-11"></div>
        <div className="flex-1">
          <div
            className="flex flex-col text-right w-full relative p-1 transition-all !uppercase custom_borderStyle hover:border-[#262626] 
           rounded-lg border-dashed  !font-bold leading-tight text-black text-xs   tracking-[1px] cursor-pointer   "
          >
            {/* <div className="flex flex-col text-right w-full relative p-1 custom_borderStyle text-black text-xs custom_opacity0 leading-tight hover:opacity-100 border-[#262626] !font-bold   items-start    border-dashed rounded-lg    transition-all "> */}
            <span className="text-right">tait.marine14@gmail.com</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default BankInformation;
