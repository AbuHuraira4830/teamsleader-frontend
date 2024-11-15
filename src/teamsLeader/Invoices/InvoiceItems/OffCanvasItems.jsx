import React, { useState, useEffect } from "react";
import { Button, Offcanvas } from "react-bootstrap";
import { FiPlus } from "react-icons/fi";
import { RxAvatar, RxMagnifyingGlass } from "react-icons/rx";
import { BsThreeDots } from "react-icons/bs";
import AddItemForm from "./AddItemForm";
import InvoiceItemsList from "./InvoiceItemsList";
import { useStateContext } from "../../../contexts/ContextProvider";
const OffCanvasItems = ({
  show,
  handleClose,
  handleSelectItems,
  handleSaveItemDetails,
}) => {
  const { invoiceItems } = useStateContext();
  const [showItemsList, setShowItemsList] = useState(
    invoiceItems && invoiceItems.length > 0
  );

  const toggleAddForm = () => {
    setShowItemsList(!showItemsList); // This will switch to showing the AddInvoiceForm
  };

  useEffect(() => {
    setShowItemsList(invoiceItems && invoiceItems.length > 0);
  }, [invoiceItems]);

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
          <h5 className="mt-1 me-2">New Item</h5>
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
                {"Add New Item"}
              </Button>
            </span>
          </span>
        </div>

        <AddItemForm
          handleClose={handleClose}
          handleSaveItemDetails={handleSaveItemDetails}
        />
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default OffCanvasItems;
