import React, { useRef } from "react";
import { useProposalsContext } from "../../../../contexts/ProposalsContext";

const ImageFieldBox = ({ onFileChange, isHovered, imageUrl, block }) => {
  const fileInputRef = useRef(null);
  const imageHeightRef = useRef(null);
  const { setClickedIds } = useProposalsContext();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const blobUrl = URL.createObjectURL(file);
      onFileChange(block.uid, blobUrl);
    }
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleImageLoad = () => {
    const newHeight =
      imageHeightRef.current?.getBoundingClientRect().height || 0;
    setClickedIds((prevIds) => {
      const existingHeight = prevIds[block.uid]?.height;

      if (existingHeight !== newHeight) {
        const newIds = prevIds.map((item) => ({ ...item })); // Copy the array of objects
        const indexToUpdate = newIds.findIndex(
          (item) => item.uid === block.uid
        ); // Find the index of the item to update

        if (indexToUpdate !== -1) {
          // If the item exists in the array
          newIds[indexToUpdate] = {
            ...newIds[indexToUpdate],
            height: newHeight,
          };
        }

        return newIds;
      }

      return prevIds;
    });
  };

  return (
    <div
      ref={imageHeightRef}
      className={`cursor-pointer w-full ${
        imageUrl ? block.height : "h-20"
      } border ${
        isHovered ? "border-gray-200" : "border-white"
      } flex items-center justify-center relative bg-gray-100`}
      onClick={handleClick}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
      {imageUrl ? (
        <img
          src={imageUrl}
          alt="Uploaded"
          className="h-full"
          onLoad={handleImageLoad}
        />
      ) : (
        <span className="cursor-pointer w-full h-full flex items-center justify-center">
          Click to upload image file
        </span>
      )}
    </div>
  );
};

export default ImageFieldBox;
