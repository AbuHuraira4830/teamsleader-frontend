import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
// import Datepicker from "react-tailwindcss-datepicker";

const Testing = () => {
  const onDrop = useCallback(async (acceptedFiles) => {
    const formData = new FormData();

    acceptedFiles.forEach((file, index) => {
      formData.append("file", file); // Use 'file' as the field name
    });

    try {
      const response = await fetch("http://localhost:8888/api/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Upload successful:", data);
      } else {
        console.error("Upload failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <p>Drag 'n' drop some files here, or click to select files</p>
    </div>
  );
};

export default Testing;

// =================================

// const Testing = () => {
//   const [value, setValue] = useState({
//     startDate: new Date(),
//     endDate: new Date().setMonth(11),
//   });

//   const handleValueChange = (newValue) => {
//     console.log("newValue:", newValue);
//     setValue(newValue);
//   };

//   return <Datepicker value={value} onChange={handleValueChange} />;
// };
