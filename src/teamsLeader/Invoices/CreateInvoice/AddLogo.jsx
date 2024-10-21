import React, { useState, useRef } from "react";
import { AiOutlinePlus, AiOutlineClose } from "react-icons/ai";
import { useStateContext } from "../../../contexts/ContextProvider";

const AddLogo = () => {
  const { selectedColorInvoice } = useStateContext();
  const [logo, setLogo] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogo(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddLogoClick = () => {
    fileInputRef.current.click(); // Manually click the hidden file input
  };

  const removeLogo = () => {
    setLogo(null);
  };

  return (
    <div className="group relative">
      {logo ? (
        <div className="relative flex justify-between items-center p-4 border border-[#262626] rounded-lg">
          <img src={logo} alt="Uploaded Logo" className="max-h-40" />
          <button onClick={removeLogo}>
            <AiOutlineClose
              className="text-[#262626] absolute top-2 left-2"
              style={{ color: selectedColorInvoice }}
            />
          </button>
        </div>
      ) : (
        <button
          onClick={handleAddLogoClick}
          className="text-white py-12 px-10 transition-all font-normal w-full custom_borderStyle border-dashed border-transparent rounded-lg p-6 text-center hover:border-[#262626]"
        >
          <div className="transition-all">
            <div className="items-center flex text-[#262626] justify-center">
              {/* <AiOutlinePlus className="mr-2" />
              <span>Add your logo</span> */}
              <div className="mr-2">
                <AiOutlinePlus className="text-[#262626]   " />
              </div>
              <span className="text-nowrap  ">Add your logo</span>
            </div>
          </div>
        </button>
      )}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        hidden
      />
    </div>
  );
};

export default AddLogo;
