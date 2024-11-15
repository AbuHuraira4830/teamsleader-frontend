// TikTokDropdown.js
import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { Form } from "react-bootstrap";

const TikTokDropdown = () => {
  const [isOpen, setIsOpen] = useState(true);

  // State for each TikTok option
  const [allowComments, setAllowComments] = useState(true);
  const [allowDuets, setAllowDuets] = useState(true);
  const [allowStitches, setAllowStitches] = useState(true);

  return (
    <div className="w-full p-3 bg-white border border-gray-300 rounded-md shadow-sm">
      {/* Dropdown header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full text-left text-[#364141] text-sm font-medium"
      >
        <span>TikTok Options</span>
        <span>{isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}</span>
      </button>

      {/* Dropdown body */}
      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden ${
          isOpen ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0"
        }`}
      >
        <div className="mb-4 space-y-2">
          <Form.Check
            type="checkbox"
            label="Allow comments"
            checked={allowComments}
            onChange={(e) => setAllowComments(e.target.checked)}
            className="text-sm text-[#364141] font-medium"
          />
          <Form.Check
            type="checkbox"
            label="Allow duets"
            checked={allowDuets}
            onChange={(e) => setAllowDuets(e.target.checked)}
            className="text-sm text-[#364141] font-medium"
          />
          <Form.Check
            type="checkbox"
            label="Allow stitches"
            checked={allowStitches}
            onChange={(e) => setAllowStitches(e.target.checked)}
            className="text-sm text-[#364141] font-medium"
          />
        </div>
      </div>
    </div>
  );
};

export default TikTokDropdown;
