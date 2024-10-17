import React, { useState } from "react";
import "../../../assets/css/Login.css";
import { useForm, Controller } from "react-hook-form";
import { Button, Form, InputGroup } from "react-bootstrap";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";
import IMAGES from "../../../assets/images/Images";
import { useStateContext } from "../../../contexts/ContextProvider";
import { useNavigate } from "react-router-dom";
import { FaRegCopy } from "react-icons/fa";
import { IoChevronDownSharp } from "react-icons/io5";
import { GoPlus } from "react-icons/go";

const InviteTeam = () => {
  const [data, setData] = useState();
  const navigate = useNavigate();

  return (
    <div className="signup_form w-100">
      <div
        className="login_header d-flex align-items-center border-bottom px-3 mb-5 "
        style={{ height: "65px", backgroundColor: "#F7F7F7" }}
      >
        <h5 className="align-self-center mb-0">TEAMSLEADER</h5>
        <img
          src={IMAGES.LEAF}
          alt=""
          className="align-self-center leaf_icon "
        />
      </div>

      <div className="mx-auto " style={{ width: "530px" }}>
        <div>
          <p
            className="mb-0 text-center"
            style={{ fontSize: "30px", marginTop: "24px" }}
          >
            Who else is on your team?
          </p>
          <p className="email_label mb-4 text-center">
            Invite with link (anyone with a @ email)
          </p>
        </div>

        {/* <div className="d-flex justify-content-center pt-3 gray_text d-flex-wrap fs_14">
          <InputGroup className="mb-3 ">
            <Form.Control
              className="shadow-none fs_14"
              //   disabled
              placeholder="www.teamsleader.com/dummy-invite-link "
            />
            <Button
              className="workspace-dropdown-button border align-items-center justify-content-center d-flex fw-normal  fs_14  py-1  px-3 "
              style={{
                height: "40px",
                width: "120px",
              }}
              // onClick={() => navigate("/signup5")}
            >
              <FaRegCopy className="me-2 fs-6" />
              Copy
            </Button>
          </InputGroup>
        </div> */}
        <InputGroup className="mb-3">
          <Form.Control
            className="shadow-none fs_14"
            value=""
            placeholder="Add email here"
          />
          <Button
            className="social_loginBtn text-dark bg-transparent border justify-content-between align-items-center d-flex fw-normal  fs_14  py-1  ps-3 pe-2 "
            style={{
              height: "40px",
              width: "120px",
            }}
          >
            Admin
            <Button
              className="ms-1 px-1 fs-4 workspace_menuBtn bgHover d-flex justify-content-center align-items-center"
              style={{
                width: "32px",
                height: "32px",
              }}
            >
              <IoChevronDownSharp
                className=""
                style={{
                  width: "15px",
                  height: "auto",
                }}
              />
            </Button>
          </Button>
        </InputGroup>
        <InputGroup className="mb-3">
          <Form.Control
            className="shadow-none fs_14"
            value=""
            placeholder="Add email here"
          />
          <Button
            className="social_loginBtn text-dark bg-transparent border justify-content-between align-items-center d-flex fw-normal  fs_14  py-1  ps-3 pe-2 "
            style={{
              height: "40px",
              width: "120px",
            }}
          >
            Admin
            <Button
              className="ms-1 px-1 fs-4 workspace_menuBtn bgHover d-flex justify-content-center align-items-center"
              style={{
                width: "32px",
                height: "32px",
              }}
            >
              <IoChevronDownSharp
                className=""
                style={{
                  width: "15px",
                  height: "auto",
                }}
              />
            </Button>
          </Button>
        </InputGroup>

        <Button
          className="workspace-dropdown-button  align-items-center d-flex fw-normal    py-1  px-3 "
          style={{
            height: "40px",
          }}
          //   onClick={() => navigate("/signup5")}
        >
          <GoPlus className="me-2" />
          Add another
        </Button>
        <div className="d-flex justify-content-evenly mt-5 mb-5">
          <Button
            className="workspace-dropdown-button border align-items-center d-flex fw-normal    py-1  px-3 "
            style={{
              height: "40px",
            }}
            onClick={() => navigate("/home-customization")}
          >
            Remind me later
          </Button>
          <Button
            // onClick={() => navigate("/signup5")}
            type="submit"
            className="rounded-1 d-flex  justify-content-end  align-items-center green_btn border-0 "
            // style={{ width: "126px" }}
          >
            Invite your team
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InviteTeam;
