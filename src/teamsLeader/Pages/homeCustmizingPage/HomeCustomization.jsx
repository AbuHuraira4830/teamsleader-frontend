import React, { useState } from "react";
import IMAGES from "../../../assets/images/Images";
import { Button, Form, Table } from "react-bootstrap";
import { MdChevronRight } from "react-icons/md";
import { useStateContext } from "../../../contexts/ContextProvider";
import { set } from "date-fns";
import { FaPlus } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { postAPI } from "../../../helpers/apis";
import { CircularProgress } from "@mui/material";

const HomeCustomization = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { tableTeamName, setTableTeamName, userEmail } = useStateContext();
  const handleChange = (e) => {
    setTableTeamName(e.target.value);
  };
  const line = () => {
    return (
      <div className="  py-2 d-flex">
        <span
          style={{
            width: "35%",
            margin: "auto",
            height: "4px",
            backgroundColor: "#c3c6d4",
            borderRadius: "8px",
          }}
        ></span>
      </div>
    );
  };

  const tableContent = [
    {
      content: line(),
    },
    {
      content: line(),
    },
  ];

  const updateTeamName = async () => {
    if (!tableTeamName) {
       navigate("/home-customization2");
      return;
    }
    setIsLoading(true);
    try {
      await postAPI("/api/team-name/update", {
        name: tableTeamName,
        email: userEmail,
      });
      setIsLoading(false);
      navigate("/home-customization2");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
    // className="container w-100 m-0"
    >
      <div
        className="login_header d-flex align-items-center border-bottom px-3 "
        style={{ height: "65px", backgroundColor: "#F7F7F7" }}
      >
        <h5 className="align-self-center mb-0">TEAMSLEADER</h5>
        <img
          src={IMAGES.LEAF}
          alt=""
          className="align-self-center leaf_icon "
        />
      </div>
      <div className="d-flex align-items-center " style={{ height: "89.3vh" }}>
        <div className="w-50 ">
          <div style={{ width: "440px" }} className="mx-auto">
            <p
              className="mb-4 "
              style={{ fontSize: "24px", marginTop: "24px" }}
            >
              Let's start working together
            </p>
            <p className=" mb-1 fs_14">
              Give your team a name, e.g. marketing plan, sales pipeline,
              quarterly roadmap...
            </p>

            <Form.Control
              className="rounded-1 shadow-none workspace_searchInput fs_14 transparent_bg w-100"
              placeholder="My first team"
              onChange={handleChange}
              type="text"
              style={{ height: "40px" }}
            />

            <div
              className="p-4 mt-5 rounded-3 fs_14"
              style={{ backgroundColor: "#F6F7FB" }}
            >
              In teamsleader.com, "boards" are the place where all your content
              lives.
            </div>
            <div className="mt-5">
              <Button
                onClick={updateTeamName}
                type="button"
                className="rounded-1 d-flex  justify-content-end mt-4 align-items-center green_btn border-0 float-end "
                style={{ width: "126px" }}
              >
                {isLoading ? (
                  <CircularProgress size={24} className="text-white" />
                ) : (
                  <>
                    Continue <MdChevronRight className="ms-2 fs-5" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>

        <div
          className="w-50 rounded-3  py-2 "
          style={{
            backgroundColor: "#F4F6FB",
            height: "100%",
          }}
        >
          <div
            className=" h-100 ps-4 float-end"
            style={{
              backgroundColor: "#FFFFFF",
              width: "90%",
              boxShadow: "-20px 0px 56px -35px #579BFC",
            }}
          >
            <Button
              className="ms-1 px-1 fs-4 workspace_menuBtn bgHover d-flex justify-content-center align-items-center float-end"
              style={{
                width: "40px",
                height: "40px",
              }}
              onClick={() => navigate("/home-customization2")}
            >
              <RxCross2 />
            </Button>
            <div className="w-100 d-flex" style={{ height: "40px" }}>
              {tableTeamName ? (
                <h2
                  className="m-0 "
                  style={{ color: "#676879", fontWeight: 600 }}
                >
                  {tableTeamName}
                </h2>
              ) : (
                <span
                  style={{
                    width: "30%",
                    height: "8px",
                    backgroundColor: "#c3c6d4",
                    borderRadius: "8px",
                  }}
                ></span>
              )}
            </div>
            <div className=" mt-5 pb-4 d-flex">
              <span
                style={{
                  width: "20%",
                  height: "6px",
                  backgroundColor: "#579BFC",
                  borderRadius: "8px",
                }}
              ></span>
            </div>
            <div>
              <Table
                responsive
                bordered
                className="border-bottom-0"
                style={{ borderColor: "var(--border-color) !important" }}
              >
                <thead className="rounded-top rounded-2 overflow-hidden">
                  <tr>
                    <th>{line()}</th>
                    <th>{line()}</th>
                    <th>{line()}</th>
                    <th>{line()}</th>
                    <th className="p-0">
                      <span
                        style={{
                          fontSize: "30px",
                          lineHeight: "9px",
                          color: "#c3c6d4",
                        }}
                      >
                        +
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {tableContent.map((item, index) => (
                    <tr key={index}>
                      <td>{item.content}</td>
                      <td className=" ">{item.content}</td>
                      <td>{item.content}</td>
                      <td>{item.content}</td>
                      <td></td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>

            <div className=" mt-5 pb-4 d-flex">
              <span
                style={{
                  width: "20%",
                  height: "6px",
                  backgroundColor: "#00C875",
                  borderRadius: "8px",
                }}
              ></span>
            </div>
            <div>
              <Table
                responsive
                bordered
                className="border-bottom-0"
                style={{ borderColor: "var(--border-color) !important" }}
              >
                <thead className="rounded-top rounded-2 overflow-hidden">
                  <tr>
                    <th>{line()}</th>
                    <th>{line()}</th>
                    <th>{line()}</th>
                    <th>{line()}</th>
                    <th className="p-0">
                      <span
                        style={{
                          fontSize: "30px",
                          lineHeight: "9px",
                          color: "#c3c6d4",
                        }}
                      >
                        +
                      </span>
                    </th>
                  </tr>
                  <tr>
                    <th style={{ borderRight: "1px solid transparent" }}>
                      {line()}
                    </th>
                  </tr>
                </thead>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeCustomization;
