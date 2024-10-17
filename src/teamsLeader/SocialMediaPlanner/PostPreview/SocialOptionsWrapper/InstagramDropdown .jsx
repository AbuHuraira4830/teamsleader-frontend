// InstagramDropdown.js
import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const InstagramDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full p-3 bg-white border border-gray-300 rounded-md shadow-sm">
      {/* Dropdown header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full text-left text-[#364141] text-sm font-medium"
      >
        <span>Instagram Options</span>
        <span>{isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}</span>
      </button>

      {/* Dropdown body */}
      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden ${
          isOpen ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0"
        }`}
      >
        <div className="mb-4">
          <label
            htmlFor="first-comment"
            className="block text-sm text-[#364141] font-medium"
          >
            Instagram First Comment
          </label>
          <textarea
            id="first-comment"
            className="insta_textarea w-full p-2 mt-1 border border-[#6e797a] rounded-[8px] "
            rows="3"
            placeholder="Write a comment..."
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default InstagramDropdown;
