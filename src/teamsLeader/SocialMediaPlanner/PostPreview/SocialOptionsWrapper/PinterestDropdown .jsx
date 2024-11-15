// PinterestDropdown.js
import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const PinterestDropdown = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [pinTitle, setPinTitle] = useState("");
  const [destinationURL, setDestinationURL] = useState("");

  return (
    <div className="w-full p-3 bg-white border border-gray-300 rounded-md shadow-sm">
      {/* Dropdown header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full text-left text-[#364141] text-sm font-medium"
      >
        <span>Pinterest Options</span>
        <span>{isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}</span>
      </button>

      {/* Dropdown body */}
      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden ${
          isOpen ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0"
        }`}
      >
        <div className="space-y-4">
          {/* Pin Title */}
          <Form.Group controlId="pinTitle">
            <Form.Label className="text-sm text-[#364141] font-medium">
              Pin Title
            </Form.Label>
            <Form.Control
              type="text"
              value={pinTitle}
              onChange={(e) => setPinTitle(e.target.value)}
              className="text-sm   shadow-none focus:border-[#00854d]"
              placeholder="Pin Title"
            />
          </Form.Group>

          {/* Pin to (Board) */}
          <Form.Group controlId="pinBoard">
            <Form.Label className="text-sm text-[#364141] font-medium">
              Pin to
            </Form.Label>
            <Form.Control
              as="select"
              className="text-sm shadow-none focus:border-[#00854d]"
            >
              <option className="">Choose Board (required)</option>
              <option>Board 1</option>
              <option>Board 2</option>
            </Form.Control>
          </Form.Group>

          {/* Destination URL */}
          <Form.Group controlId="destinationURL">
            <Form.Label className="text-sm text-[#364141] font-medium ">
              Destination URL
            </Form.Label>
            <Form.Control
              type="url"
              value={destinationURL}
              onChange={(e) => setDestinationURL(e.target.value)}
              className="text-sm  shadow-none focus:border-[#00854d]"
              placeholder="https://..."
            />
          </Form.Group>
        </div>
      </div>
    </div>
  );
};

export default PinterestDropdown;
