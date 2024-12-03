import React, { useState } from "react";
import { Button, Offcanvas } from "react-bootstrap";
import { IoMdClose } from "react-icons/io";
import { RxAvatar } from "react-icons/rx";
import { BsThreeDots } from "react-icons/bs";
import { FiPlus } from "react-icons/fi";
import "bootstrap/dist/css/bootstrap.min.css";
import UpdateCardInfoForm from "./UpdateCardInfoForm";

const OffCanvasBillingCard = ({
  show,
  handleClose,
  selectedCard,
  handleUpdateCard,
}) => {
  const [pageView, setPageView] = useState(1);

  return (
    <Offcanvas
      show={show}
      onHide={handleClose}
      scroll={true}
      backdrop={false}
      placement="end"
      className="custom_cardCanvas_width newTeam_ofcanvas"
    >
      <Offcanvas.Header>
        <button className="custom_closeCanvasBtn" onClick={handleClose}>
          <IoMdClose className="text-2xl" />
        </button>
      </Offcanvas.Header>
      <Offcanvas.Body className="custom-scrollbar">
        <div className="flex justify-content-between mb-4">
          <h5 className="mt-1 me-2">Update Card</h5>
          <span className="align-items-center flex">
            <RxAvatar className="fs-5" />
            <div className="vr ms-2 me-1 nav_splitter align-self-center pb-1"></div>
            <Button className="px-1 fs-4 workspace_menuBtn bgHover align-middle">
              <BsThreeDots className="fs-5" />
            </Button>
          </span>
        </div>

        <div className="main_tableBtnDiv mb-3 flex justify-content-between mb-4">
          <span>
            <span>
              <Button className="workspace-dropdown-button d-flex items-center align-self-center text-start py-1 px-2">
                <FiPlus className="me-2" />
                Update Card Information
              </Button>
            </span>
          </span>
        </div>

        <UpdateCardInfoForm
          handleClose={handleClose}
          selectedCard={selectedCard}
          handleUpdateCard={handleUpdateCard}
        />
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default OffCanvasBillingCard;
