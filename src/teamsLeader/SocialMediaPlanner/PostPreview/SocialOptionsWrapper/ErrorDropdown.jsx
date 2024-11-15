import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { MdErrorOutline } from "react-icons/md";

const ErrorDropdown = ({ errors }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full p-3 bg-white border border-gray-300 rounded-md shadow-sm">
      {/* Dropdown header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full text-left text-[#364141] text-sm font-medium"
      >
        <span>{errors.length} errors</span>
        <span>{isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}</span>
      </button>

      {/* Dropdown body */}
      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden ${
          isOpen ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0"
        }`}
      >
        <div className="space-y-2">
          {errors.map((error, index) => (
            <div
              key={index}
              className="flex items-center space-x-2 text-sm text-red-600"
            >
              <MdErrorOutline className="w-4 h-4 flex-shrink-0" />
              <p className="flex-1 text-[#364141] text-[.8rem]">{error}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ErrorDropdown;
