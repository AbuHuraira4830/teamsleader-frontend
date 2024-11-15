import React, { useEffect } from "react";
import FileGallery from "./FileGallery";

const Gallery = ({   
  galleryComponents,
  setGalleryComponents,
  galleryCounter,
}) => {
  useEffect(() => {
    const newGalleryComponent = (
      <FileGallery
        key={galleryCounter}
        title={`Files Gallery ${galleryCounter}`}
      />
    );

    setGalleryComponents((prevComponents) => [
      ...prevComponents,
      newGalleryComponent,
    ]);
  }, [galleryCounter]);
  return (
    <div>
      {galleryComponents.map((gallery, index) => (
        <div key={index}>{gallery}</div>
      ))}
    </div>
  );
};

export default Gallery;
