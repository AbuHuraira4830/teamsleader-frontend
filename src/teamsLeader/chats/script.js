import { useChatsContext } from "../../contexts/ChatsContext";

export function isEmailValid(email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  return emailRegex.test(email) && !email.includes("..");
}
export function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { month: "long", day: "numeric", year: "numeric" };
  return date.toLocaleDateString("en-US", options);
}

export function extractEmails(arr) {
  // Map over the array and extract the "text" property from each object
  const emails = arr.map(obj => obj.text);

  // Filter out empty strings
  return emails.filter(email => email.trim() !== '');
}
export function getEmailFirstPart(email) {
  const atIndex = email?.indexOf("@");
  if (atIndex !== -1) {
    return email?.slice(0, atIndex);
  }
  return email; // Return the full email if "@" is not found
}
// Function to upload images and calculate real-time response time percentage

export const uploadImagesAndCalculateRealTimePercentage = (
  formData,
  uploadingProgress,
  setUploadingProgress,
  setSelectedFiles,
  setUploadedFiles
) => {
  setUploadingProgress(0);

  const xhr = new XMLHttpRequest();

  xhr.open(
    "POST",
    "https://coursedashboard.mikegeerinck.com/teamleader/uploadfiles.php"
  );

  xhr.upload.onprogress = (event) => {
    if (event.lengthComputable) {
      const progress = Math.round((event.loaded / event.total) * 100);
      setUploadingProgress(progress);
      console.log("Current progress:", progress + "%"); // Update UI logic as needed
    }
  };

  xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        const responseData = JSON.parse(xhr.responseText);
        console.log("Upload completed!");
        console.log("Response data:", responseData);
        // Update uploadedFiles state with API response
    setUploadedFiles((prevFiles) => [...prevFiles, ...responseData]);
        setSelectedFiles([]); // Clear selected files array
      } else {
        console.error("Error uploading images:", xhr.statusText);
      }
    }
  };

  xhr.send(formData);
};