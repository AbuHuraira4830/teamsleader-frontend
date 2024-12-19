import React, { useState, useRef } from "react";
import { AiOutlinePlus, AiOutlineClose } from "react-icons/ai";
import { useStateContext } from "../../../contexts/ContextProvider";

const AddLogo = () => {
  const { selectedColorInvoice } = useStateContext();
  const [logo, setLogo] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("logo", file);
  
      try {
        const response = await fetch("http://localhost:8888/upload-logo", {
          method: "POST",
          body: formData,
        });
  
        if (response.ok) {
          const data = await response.json();
          setLogo(data.logoUrl); // Set saved logo URL
        } else {
          console.error("Failed to upload logo");
        }
      } catch (error) {
        console.error("Error uploading logo:", error);
      }
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
