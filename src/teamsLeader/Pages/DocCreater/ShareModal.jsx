import React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import IMAGES from "../../../assets/images/Images";
import { PiCrownSimpleFill } from "react-icons/pi";
import { RxCross2 } from "react-icons/rx";
import { Popover } from "antd";
import { useState } from "react";
import { BsEnvelope } from "react-icons/bs";
const ShareModal = ({ handleClose, show }) => {
  const [members, setMembers] = useState([
    { id: "1", symbol: "JD", color: "#FFCC00", name: "John Doe" },
    { id: "2", symbol: "AH", color: "#0073EA", name: "Ali Hamza" },
    { id: "3", symbol: "AA", color: "#A457D1", name: "Amir Ali" },
  ]);
  const [addedMember, setAddedMember] = useState([
    {
      id: "4",
      symbol: "UH",
      color: "#ff642a",
      name: "Usman Haider",
      owner: true,
    },
  ]);
  const [open, setOpen] = useState(false);
  const hide = () => {
    setOpen(false);
  };
  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };

  const addMember = (item) => {
    setAddedMember([...addedMember, item]);
    setMembers(members.filter((member) => member.id !== item.id));
    setOpen(false);
  };

  const deleteMember = (memberIdToDelete) => {
    const memberToDelete = addedMember.find(
      (member) => member.id === memberIdToDelete
    );
    setAddedMember(
      addedMember.filter((member) => member.id !== memberIdToDelete)
    );
    if (memberToDelete && !memberToDelete.owner) {
      setMembers([...members, memberToDelete]);
    }
  };

  return (
    <div>
      <Modal show={show} onHide={handleClose} className="DocShare-modal">
        <Modal.Header closeButton>
          <Modal.Title className="mShare-heading">Share</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="fs_14 m-0">
            Choose who will have access and get notifications about this doc
          </p>

          <Popover
            content={
              <div className="p-2" style={{ width: "494px" }}>
                <div>
                  <span
                    className="fs_14 fw-bold ps-1"
                    style={{ fontWeight: 700, color: "#676879" }}
                  >
                    People
                  </span>

                  {members.map((item) => (
                    <div
                      key={item.id}
                      className="flex cursor_pointer share-person mb-2 p-1 rounded-1"
                      onClick={() => addMember(item)}
                    >
                      <span
                        className="person-avatar rounded-circle centerIt  text-white justify-content-center fs_14   me-3"
                        style={{
                          width: "26px",
                          height: "26px",
                          backgroundColor: item.color,
                        }}
                      >
                        {item.symbol}
                      </span>
                      <p className="m-0 centerIt fs_15">{item.name}</p>
                    </div>
                  ))}
                  <div>
                    {/* <span
                      className="fs_14 fw-bold ps-1"
                      style={{ fontWeight: 700, color: "#676879" }}
                    >
                      Teams
                    </span> */}
                    <p className="centerIt px-2" style={{ color: "#025231" }}>
                      <BsEnvelope className="fs-5 me-2" /> Invite a new member
                      by email
                    </p>
                  </div>
                </div>
              </div>
            }
            trigger="click"
            open={open}
            onOpenChange={handleOpenChange}
            className="share-Peoples"
          >
            <Form.Control
              type="text"
              className=""
              placeholder="Search by name or email"
            />
          </Popover>

          <div className="d-flex my-4">
            <div className="share-icon centerIt ms-1 me-3">
              <img src={IMAGES.LEAF} alt="" />
            </div>
            <p className="m-0 fs_15">
              {" "}
              Anyone at <strong>account</strong> can find and access this Doc
            </p>
          </div>
          <div className=" mb-5 pb-3 ">
            {addedMember.map((member) => (
              <div
                className="centerIt justify-content-between mb-3"
                key={member.id}
              >
                <div className="flex">
                  <span
                    className="person-avatar rounded-circle centerIt  text-white px-1   me-3"
                    style={{ backgroundColor: member.color }}
                  >
                    {member.symbol}
                  </span>
                  <p className="m-0 centerIt fs_15">{member.name}</p>
                </div>

                <span className="d-flex">
                  {member.owner && (
                    <span className="centerIt">
                      <div className="icon-crown centerIt justify-content-center text-white ">
                        <PiCrownSimpleFill style={{ fontSize: "12px" }} />{" "}
                      </div>
                    </span>
                  )}
                  <Button
                    className="px-2 py-1 workspace-dropdown-button ms-3"
                    disabled={member.owner}
                    style={{ fontSize: "14px" }}
                    onClick={() => deleteMember(member.id)}
                  >
                    <RxCross2 style={{ fontSize: "16px" }} />
                  </Button>
                </span>
              </div>
            ))}
          </div>
          <div className="border-top py-4 mb-2">
            <h5 className="share-headings">Who can edit this Doc</h5>

            <div className="centerIt ">
              <Form.Check
                className="cursor_pointer pe-3"
                type="radio"
                aria-label="radio 1"
                name="role"
              />
              <div className="m-0 fs_14 d-flex">
                Only doc owners{" "}
                <div className="icon-crown centerIt justify-content-center text-white ms-3">
                  <PiCrownSimpleFill style={{ fontSize: "12px" }} />{" "}
                </div>
              </div>
            </div>
            <div className="centerIt ">
              <Form.Check
                className="cursor_pointer pe-3"
                type="radio"
                aria-label="radio 1"
                name="role"
              />
              <p className="m-0 fs_14">Everyone who have access to this doc</p>
            </div>
          </div>
          <div className="border-top py-4 ">
            <div className="centerIt justify-content-between">
              <h5 className="share-headings">Share Docpublicaly</h5>
              <Form.Check
                className="cursor_pointer pe-3"
                type="switch"
                aria-label="radio 1"
                name="role"
              />
            </div>
            <p className="fs_14">
              {" "}
              Create a link wit a view-only access to share with anyone on the
              web
            </p>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ShareModal;
