import React, { useState, useEffect } from "react";
import { IoPerson, IoLocationOutline } from "react-icons/io5";
import { MdOutlineTitle, MdContentCopy } from "react-icons/md";
import { BsEnvelope } from "react-icons/bs";
import { GoGift } from "react-icons/go";
import { FaPhoneAlt } from "react-icons/fa";
import { Form, Tooltip, OverlayTrigger } from "react-bootstrap";
import CopyToClipboard from "react-copy-to-clipboard";
import { useStateContext } from "../../../contexts/ContextProvider";
import "./admin.css";

const PersonalInfo = ({ user, isEditable, setEditableUserData }) => {
  const [data, setData] = useState({
    title: user.title || "",
    name: user.name || "",
    email: user.email || "",
    phone: user.phone || "",
    location: user.location || "",
    birthday: user.birthday || "",
    id: user.id || "",
  });
  const [toolTip, setToolTip] = useState(false);

  useEffect(() => {
    // Whenever localData changes, we update the parent state
    if (isEditable) {
      setEditableUserData(data);
    }
  }, [data, isEditable, setEditableUserData]);

  const handleToolTip = () => {
    setToolTip(true);
    setTimeout(() => {
      setToolTip(false);
    }, 1000);
  };

  const editableFields = Object.entries(data).filter(
    ([field]) => field !== "id"
  );

  const copyIcon = (field) => {
    return (
      <OverlayTrigger
        placement="top"
        delay={{ show: 250, hide: 400 }}
        overlay={
          toolTip ? <Tooltip id={`tooltip-${field}`}>Copied!</Tooltip> : <></>
        }
      >
        <CopyToClipboard
          text={data[field] || ""}
          onCopy={() => handleToolTip()}
        >
          <MdContentCopy className="cursor_pointer" />
        </CopyToClipboard>
      </OverlayTrigger>
    );
  };

  return (
    <div
      className="grayText infoSection py-4 fs_15 mx-auto"
      style={{ maxWidth: "300px" }} // Set a max-width to keep elements aligned
    >
      <p className="" style={{ fontSize: "18px" }}>
        Overview
      </p>
      {/* Use flex-column for vertical alignment */}
      <Form className="d-flex flex-column gap-3">
        {editableFields.map(([field, value]) => (
          <Form.Group
            key={field}
            className="manage_teams_info d-flex align-items-center gap-2"
          >
            <Form.Label className="infoIcon mb-0 rounded-[50%] ">
              {field === "title" && <MdOutlineTitle />}
              {field === "name" && <IoPerson />}
              {field === "email" && <BsEnvelope />}
              {field === "phone" && <FaPhoneAlt />}
              {field === "location" && <IoLocationOutline />}
              {field === "birthday" && <GoGift />}
            </Form.Label>
            {!isEditable ? (
              <div
                className="fs_14 transparent_bg grayText"
                style={{ flexGrow: 1 }}
              >
                {value ||
                  `${
                    field.charAt(0).toUpperCase() + field.slice(1)
                  } not provided yet`}
              </div>
            ) : (
              <Form.Control
                className="rounded-1 shadow-none workspace_searchInput fs_14 transparent_bg grayText"
                placeholder={`${
                  field.charAt(0).toUpperCase() + field.slice(1)
                } not provided yet`}
                value={value}
                onChange={(e) => setData({ ...data, [field]: e.target.value })}
                type="text"
                style={{ flexGrow: 1 }}
              />
            )}
            {value && isEditable && copyIcon(field)}
          </Form.Group>
        ))}
      </Form>
    </div>
  );
};

export default PersonalInfo;
