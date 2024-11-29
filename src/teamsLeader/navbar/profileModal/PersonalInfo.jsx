import React, { useEffect, useState } from "react";
import { IoMdPerson } from "react-icons/io";
import { FaRegCalendar, FaRegEnvelope } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { CgSmartphone } from "react-icons/cg";
import { LuGift } from "react-icons/lu";
import { Col, Form, Row } from "react-bootstrap";
import { BsPersonFillAdd } from "react-icons/bs";
import { useStateContext } from "../../../contexts/ContextProvider";
import { getAPI, postAPI } from "../../../helpers/apis";
import AccountScheduleModal from "./AccountScheduleModal";
import { DatePicker, Space } from "antd";
import dayjs from "dayjs";

const PersonalInfo = ({ setSelectedOption }) => {
  const { thisUser, setThisUser } = useStateContext();
  const [selectedImage, setSelectedImage] = useState(thisUser.picture);
  const [jobTitle, setJobTitle] = useState(thisUser.jobTitle);
  const [phone, setPhone] = useState(thisUser.phone || "");
  const [mPhone, setMPhone] = useState(thisUser.mPhone || "");
  const [location, setLocation] = useState(thisUser.location || "");
  const [editImage, setEditImage] = useState(false);
  const [emailModal, setEmailModal] = useState(false);
  const [scheduleModal, setScheduleModal] = useState(false);
  const [birthday, setBirthday] = useState(thisUser.birthday);
  const [workAnniversary, setWorkAnniversary] = useState(
    thisUser.workAnniversary
  );
  const [birthdayActive, setBirthdayActive] = useState(false);
  const [workActive, setWorkActive] = useState(false);

  const closeScheduleModal = () => {
    setScheduleModal(false);
  };

  const closeModal = () => {
    setEmailModal(false);
  };

  const updateUser = () => {
    postAPI("/api/user/update", {
      picture: selectedImage,
      phone,
      mPhone,
      jobTitle,
      location,
      birthday,
      workAnniversary,
    })
      .then((response) => {
        setThisUser(response.data.updatedUser);
      })
      .catch((error) => {
        console.error("Failed to update user:", error);
      });
  };

  // Only run on mount
  useEffect(() => {
    // console.log(selectedImage);
    updateUser();
  }, [selectedImage, workAnniversary]);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    const res = await getAPI("api/s3url");
    await fetch(res.data.data.url, {
      method: "PUT",
      headers: {
        "Content-Type": `${file?.type}`,
      },
      body: file,
    });
    const URL = res.data.data.url.split("?")[0];
    setSelectedImage(URL);
  };

  const userInfo = [
    {
      icon: (
        <FaRegEnvelope
          className="me-2"
          style={{ marginTop: "3px", fontSize: "12px" }}
        />
      ),
      name: "Email",
      data: thisUser.emailAddress,
    },
    {
      icon: (
        <CgSmartphone
          className="me-2"
          style={{ marginTop: "3px", fontSize: "14px" }}
        />
      ),
      name: "Phone",
      data: phone,
      placeholder: "Add a phone",
    },
    {
      icon: (
        <CgSmartphone
          className="me-2"
          style={{ marginTop: "3px", fontSize: "14px" }}
        />
      ),
      name: "Mobile phone",
      data: mPhone,
      placeholder: "Add a mobile phone",
    },
    {
      icon: (
        <IoLocationOutline
          className="me-2 fs-5"
          style={{ marginTop: "3px", fontSize: "12px" }}
        />
      ),
      name: "Location",
      data: location,
      placeholder: "Add a location",
    },
  ];

  const handleEmailModal = (option) => {
    if (option === "Email") {
      setEmailModal(true);
    }
  };

  const changeBirthday = (date, dateString) => {
    setBirthday(dateString);
    setBirthdayActive(false);
  };

  const changeWorkAnniversary = (date, dateString) => {
    setWorkAnniversary(dateString);
    setWorkActive(false);
  };

  return (
    <div className="w-100" style={{ padding: "24px" }}>
      <div
        className="rounded-2 introPart w-100 d-flex"
        style={{ height: "300px", padding: "24px" }}
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          style={{ display: "none" }}
          id="upload-button"
        />
        <div
          onMouseEnter={() => setEditImage(true)}
          onMouseLeave={() => setEditImage(false)}
          className={`rounded-circle cursor_pointer position-relative ${
            editImage ? "bg-gray-300" : selectedImage ? "" : "bg-gray-950"
          }`}
          style={{
            width: "180px",
            height: "180px",
          }}
          onClick={() => {
            document.getElementById("upload-button").click();
          }}
        >
          <div
            className="centerIt justify-content-center w-100 h-100"
            style={{ minWidth: "180px" }}
          >
            {selectedImage ? (
              <div className="p-3 w-100 h-100">
                <img
                  className="rounded-circle"
                  src={selectedImage}
                  style={{ width: "100%", height: "100%" }}
                  alt=""
                />
              </div>
            ) : (
              <IoMdPerson
                className="text-white"
                style={{ fontSize: "150px" }}
              />
            )}
          </div>
          {editImage && (
            <div
              className="centerIt justify-content-center flex-column text-white position-absolute opacity6 top-0 rounded-circle"
              style={{
                backgroundColor: "black",
                width: "180px",
                height: "180px",
              }}
            >
              <BsPersonFillAdd style={{ fontSize: "60px" }} />
              <p className="fs_14 px-4 text-center">Change profile picture</p>
            </div>
          )}
        </div>

        <div style={{ padding: "0px 24px" }}>
          <Form.Control
            className="workspace_searchInput rounded-1 shadow-none bg-transparent fw-bold  border-0 fs_32 py-0 px-1 no_cursor"
            value={thisUser.fullName}
          />
          <Form.Control
            className="workspace_searchInput fs_14 rounded-1 shadow-none bg-transparent fw-bold  border-0 p-0 mb-3"
            placeholder="Add a job title"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            onBlur={updateUser}
            style={{ width: "110px", maxWidth: "300px" }}
          />
          <span
            className="fs_14 text-white px-2 rounded-1"
            style={{ backgroundColor: "#0073EA" }}
          >
            Admin
          </span>
          <p
            className="fs_15 mb-2"
            style={{ fontWeight: "600", marginTop: "70px" }}
          >
            Holidays & sick days:
          </p>
          <span
            className="fs_14 px-2 selected_bg rounded-1 cursor_pointer"
            onClick={() => setSelectedOption("Schedule holiday")}
          >
            Schedule Your Holidays & Sick days
          </span>
        </div>
        <div className="ms-auto">
          {userInfo.map((option, index) => (
            <div className="d-flex fs_14 mb-3" key={index}>
              {option.icon}
              <div>
                <p className="" style={{ fontWeight: "600" }}>
                  {option.name}
                </p>
                <Form.Control
                  className={`workspace_searchInput shadow-none bg-transparent rounded-1  border-0 py-0 px-1 ${
                    option.name === "Email" && "no_cursor"
                  }`}
                  placeholder={option.placeholder}
                  value={option.data}
                  readOnly={option.name === "Email"}
                  // onClick={() => handleEmailModal(option.name)}
                  onChange={(e) => {
                    if (option.name === "Phone") setPhone(e.target.value);
                    else if (option.name === "Mobile phone")
                      setMPhone(e.target.value);
                    else if (option.name === "Location")
                      setLocation(e.target.value);
                  }}
                  onBlur={updateUser}
                  style={{ width: "200px", maxWidth: "300px" }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <Row className="d-flex gx-2" style={{ margin: "24px 0px" }}>
        <Col className="introPart rounded-2 me-2" style={{ padding: "24px" }}>
          <div className="d-flex fs_14 mb-3">
            <LuGift
              className="me-2"
              style={{ marginTop: "3px", fontSize: "12px" }}
            />
            <div className="w-100">
              <p className="" style={{ fontWeight: "600" }}>
                Birthday
              </p>
              {!birthdayActive ? (
                <p
                  className="fs_14 para rounded-1 px-1"
                  style={{ width: "fit-content" }}
                  onClick={() => setBirthdayActive(true)}
                >
                  {birthday ? birthday : "Add a birthday"}
                </p>
              ) : (
                <Space direction="vertical" className="w-100">
                  <DatePicker
                    value={dayjs(birthday)}
                    style={{ width: "100%" }}
                    className="profileDatePicker"
                    onChange={changeBirthday}
                  />
                </Space>
              )}
            </div>
          </div>
          <div className="d-flex fs_14 mb-3">
            <FaRegCalendar
              className="me-2"
              style={{ marginTop: "3px", fontSize: "12px" }}
            />
            <div className="w-100">
              <p className="" style={{ fontWeight: "600" }}>
                Work anniversary
              </p>
              {workActive ? (
                <Space direction="vertical" className="w-100">
                  <DatePicker
                    value={dayjs(workAnniversary)}
                    style={{ width: "100%" }}
                    className="profileDatePicker"
                    onChange={changeWorkAnniversary}
                  />
                </Space>
              ) : (
                <p
                  className="fs_14 para rounded-1 px-1"
                  onClick={() => setWorkActive(true)}
                >
                  {workAnniversary ? workAnniversary : "Add a work anniversary"}
                </p>
              )}
            </div>
          </div>
        </Col>
        <Col
          className="introPart rounded-2 text-center ms-2"
          style={{ padding: "24px " }}
        >
          <div style={{ padding: "0px 120px" }}>
            <p style={{ fontSize: "18px" }}>Create and join teams</p>
            <p className="mb-4 fs_15">
              Collaborate better with teammates and keep track of projects
              you're interested in
            </p>
            <span
              className="border bgHover rounded-1"
              style={{ fontSize: "16px", padding: "7px 10px" }}
            >
              Explore teams
            </span>
          </div>
        </Col>
      </Row>
      {/* <AccountScheduleModal
        scheduleModal={scheduleModal}
        setScheduleModal={setScheduleModal}
        closeModal={closeScheduleModal}
      /> */}
    </div>
  );
};

export default PersonalInfo;
