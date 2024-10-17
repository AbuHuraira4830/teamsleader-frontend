import React from "react";
import BankInformation from "./BankInformation";

const NotesComments = () => {
  return (
    <div className="px-10">
      <div>
        <div
          className="mt-10 transition-all custom_opacity0 border-[#262626] group-hover:opacity-100"
          style={{
            borderBottom: "1px dashed",
          }}
        >
          <label
            className="text-xs font-bold uppercase"
            style={{ color: "rgb(22, 113, 195)" }}
          >
            Notes & comments
          </label>
          <textarea
            rows="1"
            placeholder="Add notes & comments"
            className="block w-full  outline-none placeholder-opacity-50 placeholder-gray-400 my-2 h-6 px-0 text-sm border-x-0 border-t-0  border-dashed py-2"
            maxLength="10000"
            style={{ height: "auto" }}
          />
        </div>
        <div
          className="mt-10 transition-all custom_opacity0 border-[#262626] group-hover:opacity-100 border-dashed  "
          style={{
            borderBottom: "1px dashed",
          }}
        >
          <label
            className="text-xs font-bold uppercase"
            style={{ color: "rgb(22, 113, 195)" }}
          >
            Terms & Conditions
          </label>
          <textarea
            rows="1"
            placeholder="Add terms & conditions"
            className="block w-full outline-none placeholder-opacity-50 placeholder-gray-400 my-2 h-6 px-0 text-sm border-x-0 border-t-0 border-b-transparent border-dashed py-2"
            maxLength="10000"
            style={{ height: "auto" }}
          />
        </div>
      </div>
      <BankInformation />

      {/* ... More content */}
    </div>
  );
};

export default NotesComments;
