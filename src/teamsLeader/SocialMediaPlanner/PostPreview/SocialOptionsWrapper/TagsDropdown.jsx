// TagsDropdown.js
import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { BsFillTagsFill, BsX } from "react-icons/bs";
import { Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const TagsDropdown = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [availableLabels, setAvailableLabels] = useState([
    "video",
    "announcement",
    "thought leadership",
  ]);
  const [selectedLabels, setSelectedLabels] = useState([]);
  const [newLabel, setNewLabel] = useState("");

  const toggleLabel = (label) => {
    setSelectedLabels((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };

  const addLabel = () => {
    if (newLabel && !selectedLabels.includes(newLabel)) {
      setSelectedLabels([...selectedLabels, newLabel]);
      setNewLabel("");
    }
  };

  const removeLabel = (label) => {
    setSelectedLabels((prev) => prev.filter((item) => item !== label));
  };

  // Trigger adding a label when the Enter key is pressed
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent form submission if the input is inside a form
      addLabel();
    }
  };

  return (
    <div className="w-full p-3 bg-white border border-gray-300 rounded-md shadow-sm">
      {/* Dropdown header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full text-left text-[#364141] text-sm font-medium"
      >
        <span>Teamsleader Tags</span>
        <span>{isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}</span>
      </button>

      {/* Dropdown body */}
      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden ${
          isOpen ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0"
        }`}
      >
        <div className="space-y-4">
          {/* Add Labels */}
          <Form.Group controlId="addLabels">
            <Form.Label className="text-sm text-[#364141] font-medium">
              Add labels
            </Form.Label>
            <div className="flex items-center space-x-2">
              <Form.Control
                type="text"
                value={newLabel}
                onChange={(e) => setNewLabel(e.target.value)}
                onKeyDown={handleKeyDown}
                className="text-sm shadow-none focus:border-[#00854d]"
                placeholder="Add labels"
              />
              <button
                onClick={addLabel}
                className="px-2 py-1 bg-[#00854d] text-white text-xs rounded-md"
              >
                Add
              </button>
            </div>
          </Form.Group>

          {/* Selected Labels */}
          <div className="flex flex-wrap gap-2">
            {selectedLabels.map((label) => (
              <div
                key={label}
                className="flex items-center space-x-1 px-2 py-1 bg-gray-200 text-xs rounded-md planner_customTags"
              >
                <BsFillTagsFill className="mr-1 text-[#fff]" />
                <span className="text-[#fff]">{label}</span>
                <BsX
                  className="cursor-pointer text-[#fff] text-sm hover:text-red-500"
                  onClick={() => removeLabel(label)}
                />
              </div>
            ))}
          </div>

          {/* Predefined Labels */}
          <div className="flex space-x-2">
            {availableLabels.map((label) => (
              <button
                key={label}
                onClick={() => toggleLabel(label)}
                className={`flex items-center px-2 py-1 text-xs font-medium rounded-md transition ease-in-out planner_customTags ${
                  selectedLabels.includes(label)
                    ? "bg-blue-500 text-[#fff]"
                    : "bg-gray-200 text-[#fff]"
                }`}
              >
                <BsFillTagsFill className="mr-1" />
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TagsDropdown;
