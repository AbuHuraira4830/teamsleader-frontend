import React, { useState, useRef } from "react";
import { TwitterPicker } from "react-color";
import { FaPlus, FaCheck } from "react-icons/fa";
import { GoPlus } from "react-icons/go";
import { useStateContext } from "../../contexts/ContextProvider";

const ColorPickerInvoices = () => {
  const { selectedColorInvoice, setSelectedColorInvoice } = useStateContext();
  const colors = [
    { name: "default", colorCode: "rgb(22, 113, 195)" },
    { name: "lightBlue", colorCode: "#8ecae6" },
    { name: "lightGreen", colorCode: "#219ebc" },
    { name: "beige", colorCode: "#f0efeb" },
    // { name: "peach", colorCode: "#ffb703" },
    { name: "orange", colorCode: "#fb8500" },
    // Add more colors as needed
  ];
  const customColors = [
    "#69D2E7",
    "#A7DBD8",
    "#E0E4CC",
    "#F38630",
    "#FA6900",
    "#F9D423",
    "#ECECEC",
    "#66CC99",
    "#FC913A",
    "#F9D62E",
    "#EAEAEA",
    "#78C0A8",
    "#F07818",
    "#F0A830",
    "#60B99A",
    "#D1F2A5",
    "#EFFAB4",
    "#FFC48C",
    "#FF9F80",
    "#F56991",
    "#9DE0AD",
    "#45ADA8",
    "#547980",
    "#594F4F",
    "#FE4365",
    "#FC9D9A",
    "#F9CDAD",
    "#C8C8A9",
    "#83AF9B",
    "#CFF09E",
    "#A8DBA8",
    "#79BD9A",
    "#3B8686",
    "#0B486B",
    "#EDC951", // Added color
  ];

  // const [selectedColor, setSelectedColor] = useState("#8ecae6");
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const popoverRef = useRef();
  const plusIconRef = useRef(); // Ref for the plus icon button

  const handleColorChange = (color) => {
    setSelectedColorInvoice(color.hex);
  };

  const handleToggleColorPicker = () => {
    setDisplayColorPicker(!displayColorPicker);
  };
  const calculateLeftPosition = () => {
    if (!plusIconRef.current) return 0;
    const iconWidth = plusIconRef.current.offsetWidth;
    const pickerWidth = 200; // Approximate width of the color picker, adjust as necessary
    const leftOffset = (pickerWidth - iconWidth) / 2;
    return -leftOffset + 100; // Adjust the 10 to move it more to the right as needed
  };

  const calculateTopPosition = () => {
    const topOffset = 35; // Adjust the 5 to move it more to the bottom as needed
    return topOffset;
  };
  return (
    <div>
      {/* Style section */}
      <h5 className=" text-primary-invoice  capitalize  text-3xl mb-3">
        Style
      </h5>
      <div>
        <div className="mb-3 text-sm text-primary-700">Color</div>
        <div className="flex items-center relative ml-0">
          {/* Color circles */}
          {colors.map((color) => (
            <button
              key={color.name}
              onClick={() => setSelectedColorInvoice(color.colorCode)}
              style={{
                backgroundColor: color.colorCode,
                border:
                  selectedColorInvoice === color.colorCode
                    ? "2px solid white"
                    : "none",
                display: "inline-block",
                // width: "30px",
                // height: "30px",
                borderRadius: "50%",
                margin: "0 5px",
                position: "relative",
              }}
              className="rounded-full w-10 h-10"
            >
              {selectedColorInvoice === color.colorCode && (
                <FaCheck
                  style={{
                    color: "white",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                  size={14}
                />
              )}
            </button>
          ))}

          {/* Plus icon button */}
          <button
            onClick={handleToggleColorPicker}
            ref={plusIconRef}
            style={{
              display: "flex",
              // width: "30px",
              // height: "30px",
              borderRadius: "50%",
              margin: "0 5px",
              border: "none",
              position: "relative",
            }}
            className="rounded-full flex justify-center items-center bg-revenues w-10 h-10"
          >
            <GoPlus size={20} color="#fff " />
          </button>

          {/* Color picker popover */}
          {displayColorPicker && (
            <div style={{ position: "absolute", zIndex: 2 }}>
              <div
                style={{
                  position: "fixed",
                  top: "0px",
                  right: "0px",
                  bottom: "0px",
                  left: "0px",
                }}
                onClick={handleToggleColorPicker}
              />
              <div
                style={{
                  position: "absolute",
                  left: `${calculateLeftPosition()}px`, // Adjusted left position
                  top: `calc(100% + ${calculateTopPosition()}px)`, // Adjusted top position
                }}
              >
                <TwitterPicker
                  color={selectedColorInvoice}
                  colors={customColors}
                  onChangeComplete={handleColorChange}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ColorPickerInvoices;
