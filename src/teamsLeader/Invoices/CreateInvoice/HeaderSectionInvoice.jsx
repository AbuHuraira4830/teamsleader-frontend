import React, { useEffect, useState } from "react";
import { Button } from "antd";
import { useStateContext } from "../../../contexts/ContextProvider";
import { useNavigate, Link } from "react-router-dom"; // Import useNavigate hook
import { v4 as uuidv4 } from "uuid";
import { HiOutlineMail } from "react-icons/hi";
import { FiChevronDown, FiCheckSquare, FiDownload } from "react-icons/fi";
import OffCanvasEmail from "../OffCanvasEmail/OffCanvasEmail";
const HeaderSectionInvoice = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  const {
    setRowsInvoices,
    rowsInvoices,
    selectedClientDetails,
    clientDetails,
    invoiceNumber,
    formattedInvoiceNumber,
    invoiceItems,
    selectedStatus,
    tableHiddenPassword,
    setTableHiddenPassword,
    validationErrors,
    setValidationErrors,
    personalDetails,
    issuedDate,
    dueDate,
    setInvoiceNumber,
    manualInvoiceNumber,
    setManualInvoiceNumber,
  } = useStateContext();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [showCanvasEmail, setShowCanvasEmail] = useState(false);
  const closeCanvasEmail = () => setShowCanvasEmail(false);
  const toggleCanvasEmail = () => setShowCanvasEmail((s) => !s);
  const [pdfUrl, setPdfUrl] = useState("");

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const getStatusBackgroundColor = (statusText) => {
    switch (statusText) {
      case "Not Sent":
        return "#fdab3d";
      case "Unpaid":
        return "#e2445c";
      case "Paid":
        return "#00c875";
      // Add more cases as needed for other status texts
      default:
        return "#ffffff"; // Default background color
    }
  };

  const handleSaveButtonClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
    const errors = [];

    // Replace with your actual condition to check if client details are filled
    if (clientDetails.length === 0) {
      errors.push("Client is required");
    }
    if (personalDetails.length === 0) {
      errors.push("Personal info is required");
    }

    // Replace with your actual condition to check if items data are filled
    if (!invoiceItems || invoiceItems.length === 0) {
      errors.push("At least one item is required");
    }

    // If there are errors, update the state and stop the function
    if (errors.length > 0) {
      setValidationErrors(errors);
      return; // Stop further execution
    }
    const currentDate = new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
    console.log("invoiceItems", invoiceItems);

    const clientName = selectedClientDetails
      ? selectedClientDetails.name
      : clientDetails && clientDetails.length > 0
      ? clientDetails[clientDetails.length - 1].name
      : ""; // Use selected client's name as task
    console.log("amountbefore", invoiceItems[0].amountDue);
    const newRow = {
      id: uuidv4().replace(/[^\d]/g, ""),
      selected: false,
      task: clientName,
      status: {
        text: selectedStatus,
        backgroundColor: getStatusBackgroundColor(selectedStatus), // Get background color dynamically
      },
      type: "New Type",
      number: formattedInvoiceNumber,
      date: currentDate, // Use current date
      totalAmount: invoiceItems[0].amountDue,
    };

    setRowsInvoices([...rowsInvoices, newRow]);
    setTableHiddenPassword(false);
    setValidationErrors([]);

    navigate(-1);
  };
  const handleSaveAndDownloadPDF = async () => {
    setIsDropdownOpen(!isDropdownOpen);
    // alert(issuedDate);
    // Assuming you gather all the invoice data into an object
    const invoiceData = {
      clientDetails,
      personalDetails,
      invoiceItems,
      issuedDate,
      dueDate,
      // invoiceNumber: formattedInvoiceNumber,
      invoiceNumber: manualInvoiceNumber || formattedInvoiceNumber, // Prioritize manual number

      // ... any other relevant data
    };

    try {
      const response = await fetch(
        "http://localhost:8888/create-pdf?action=download",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(invoiceData),
        }
      );
      console.log("response", response);
      if (response.ok) {
        const blob = await response.blob();
        const downloadUrl = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = downloadUrl;
        // link.download = "invoice.pdf";
        link.download = `invoice-${manualInvoiceNumber || formattedInvoiceNumber}.pdf`;

        document.body.appendChild(link);
        link.click();
        link.remove();
        if (!manualInvoiceNumber) {
          setInvoiceNumber((prevNumber) => prevNumber + 1);
        }
      } else {
        console.error("Failed to generate PDF");
      }
    } catch (error) {
      console.error("Error in generating PDF:", error);
    }
  };

  const handleSaveAndPrepareToSend = async () => {
    setIsDropdownOpen(!isDropdownOpen);
    toggleCanvasEmail();

    const invoiceData = {
      clientDetails,
      personalDetails,
      invoiceItems,
      issuedDate,
      dueDate,
      invoiceNumber: formattedInvoiceNumber,
      // ... any other relevant data
    };

    try {
      const response = await fetch(
        "http://localhost:8888/create-pdf?action=prepare",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(invoiceData),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("data", data);
        if (data) {
          setPdfUrl(data.pdfUrl); // Update the state with the received URL
        }
      } else {
        console.error("Failed to generate PDF");
      }
    } catch (error) {
      console.error("Error in generating PDF:", error);
    }
  };

  return (
    <>
      {/* Header section */}
      {/* <div className="bg-primary-25 sticky z-30 top-0 right-0 pl-14 -ml-14"> */}
      <div className="bg-primary-25  z-30 top-0 right-0 pl-14 -ml-14">
        <div className="flex items-center justify-between pt-6 border-b border-b-primary-100 pb-1">
          <div>
            <h3 className=" text-primary-invoice   text-4xl ">New Invoice</h3>
          </div>
          <div className="flex items-center mb-1">
            <Button
              className=" mr-2 workspace-dropdown-button position-relative fw-normal align-self-center  text-start py-1  px-3 "
              style={{
                height: "40px",
                fontSize: ".8rem",
              }}
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>
            <div className="relative">
              <Button
                type="text"
                className={`inline-flex w-full justify-center items-center px-4  workspace_addBtn border-0 bg-[#025231] ${
                  isButtonDisabled ? "opacity-100	" : "opacity-50"
                }`}
                style={{
                  height: "40px",
                  fontSize: ".8rem",
                }}
                onClick={toggleDropdown}
              >
                Continue
                <FiChevronDown
                  className="-mr-1 ml-2 h-4 w-4 mt-[0.15rem]"
                  aria-hidden="true"
                />
              </Button>
              {isDropdownOpen && (
                <div
                  className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  <div className="py-1" role="none">
                    <div
                      className="no-underline cursor-pointer	 flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      role="menuitem"
                      onClick={handleSaveAndPrepareToSend}
                    >
                      <HiOutlineMail
                        className="mr-3 h-5 w-5"
                        aria-hidden="true"
                      />
                      Save & prepare to send
                    </div>
                    <div
                      className="flex cursor-pointer items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 no-underline	"
                      role="menuitem"
                      onClick={handleSaveAndDownloadPDF}
                    >
                      <FiDownload
                        className="mr-3 h-5 w-5 mb-[0.34rem]"
                        aria-hidden="true"
                      />
                      Save & download PDF
                    </div>

                    <Link
                      href="#"
                      className="no-underline	 flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      role="menuitem"
                      onClick={handleSaveButtonClick}
                    >
                      <FiCheckSquare
                        className="mr-3 h-5 w-5"
                        aria-hidden="true"
                      />
                      Save & quit
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <OffCanvasEmail
        show={showCanvasEmail}
        handleClose={closeCanvasEmail}
        pdfUrl={pdfUrl}
      />
    </>
  );
};

export default HeaderSectionInvoice;
