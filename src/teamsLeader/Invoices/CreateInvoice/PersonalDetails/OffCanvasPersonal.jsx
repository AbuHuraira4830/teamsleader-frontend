import React, { useState, useEffect } from "react";
import { Button, Offcanvas } from "react-bootstrap";
import { FiPlus } from "react-icons/fi";
import { RxAvatar, RxMagnifyingGlass } from "react-icons/rx";
import { BsThreeDots } from "react-icons/bs";
import { useStateContext } from "../../../../contexts/ContextProvider";
import AddPersonalDetails from "./AddPersonalDetails";
import PersonalDetailsList from "./PersonalDetailsList";

const OffCanvasPersonal = ({
  show,
  handleClose,
  handleSelectPersonal,
  handleSavePersonalDetails,
}) => {
  const { personalDetails } = useStateContext();
  const [showPersonalList, setShowPersonalList] = useState(
    personalDetails && personalDetails.length > 0
  );

  const toggleAddForm = () => {
    setShowPersonalList(!showPersonalList); // This will switch to showing the AddInvoiceForm
  };

  useEffect(() => {
    setShowPersonalList(personalDetails && personalDetails.length > 0);
  }, [personalDetails]);

  return (
    <Offcanvas
      show={show}
      onHide={handleClose}
      scroll={true}
      backdrop={false}
      placement="end"
      className="w-50 newTeam_ofcanvas"
    >
      <Offcanvas.Header closeButton></Offcanvas.Header>
      <Offcanvas.Body className="custom-scrollbar">
        <div className="flex justify-content-between mb-4">
          <h5 className="mt-1 me-2">New Person</h5>
          <span className="align-items-center flex">
            <RxAvatar className="fs-5" />
            <div className="vr ms-2 me-1 nav_splitter align-self-center pb-1"></div>
            <Button className=" px-1 fs-4 workspace_menuBtn bgHover align-middle">
              <BsThreeDots className=" fs-5 " />
            </Button>
          </span>
        </div>

        <div className=" main_tableBtnDiv  flex justify-content-between mb-4">
          <span>
            <span>
              <Button
                className="workspace-dropdown-button d-flex items-center align-self-center  text-start py-1  px-2"
                onClick={toggleAddForm}
              >
                <FiPlus className="me-2 " />
                {!showPersonalList ? "Show Persons List" : "Add New Person"}
              </Button>
            </span>
          </span>
        </div>

        {showPersonalList ? (
          <PersonalDetailsList handleSelectPersonal={handleSelectPersonal} />
        ) : (
          <AddPersonalDetails
            handleClose={handleClose}
            handleSavePersonalDetails={handleSavePersonalDetails}
          />
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default OffCanvasPersonal;
