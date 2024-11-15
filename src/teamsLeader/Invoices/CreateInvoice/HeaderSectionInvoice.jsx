import React, { useEffect, useState } from "react";
import { Button } from "antd";
import { useStateContext } from "../../../contexts/ContextProvider";
import { useNavigate, Link } from "react-router-dom"; // Import useNavigate hook
import { v4 as uuidv4 } from "uuid";
import { HiOutlineMail } from "react-icons/hi";
import { FiChevronDown, FiCheckSquare, FiDownload } from "react-icons/fi";

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
  } = useStateContext();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

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

    // Logic to update or add data goes here

    // For example, if you want to add a new row:
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

    navigate(-1); // Go back to the previous route
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
                    <Link
                      href="#"
                      className="no-underline	 flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      role="menuitem"
                    >
                      <HiOutlineMail
                        className="mr-3 h-5 w-5"
                        aria-hidden="true"
                      />
                      Save & prepare to send
                    </Link>
                    <Link
                      href="#"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 no-underline	"
                      role="menuitem"
                    >
                      <FiDownload
                        className="mr-3 h-5 w-5 mb-[0.34rem]"
                        aria-hidden="true"
                      />
                      Save & download PDF
                    </Link>

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
    </>
  );
};

export default HeaderSectionInvoice;
