import React from "react";
import { Modal } from "react-bootstrap";
import { BsThreeDots } from "react-icons/bs";
import { LuClock3 } from "react-icons/lu";
import { RxCross2 } from "react-icons/rx";
// import { PiIslandLight } from "react-icons/pi";
import { GiPalmTree } from "react-icons/gi";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

const AccountScheduleModal = ({ closeModal, sechduleModal }) => {
  const daysHours = [
    { day: "Monday", hours: "09:00 - 18:00" },
    { day: "Tuesday", hours: "09:00 - 18:00" },
    { day: "Wednesday", hours: "09:00 - 18:00" },
    { day: "Thursday", hours: "09:00 - 18:00" },
    { day: "Friday", hours: "09:00 - 18:00" },
  ];
  return (
    <Modal
      show={sechduleModal}
      onHide={closeModal}
      centered
      dialogClassName="scheduleModal border-0"
    >
      <Modal.Header className="mt-0 mb-4 border-0 p-0 d-flex justify-content-between ">
        <div className="centerIt ">
          <h1
            className="me-3 text-nowrap"
            style={{ fontSize: "24px", fontWeight: "700" }}
          >
            Account schedule
          </h1>
          <button
            className="rounded-1 bgHover centerIt justify-content-center"
            style={{ width: "32px", height: "32px" }}
          >
            <BsThreeDots />
          </button>
        </div>
        <div
          className="position-relative w-100"
          style={{
            // width: "32px",
            height: "32px",
          }}
        >
          <button
            type="button"
            class="btn-close rounded-1 bgHover centerIt justify-content-center p-0 "
            aria-label="Close"
            onClick={closeModal}
            style={{
              width: "32px",
              height: "32px",
              position: "absolute",
              top: "0px",
              right: "0px",
            }}
          >
            <RxCross2 />
          </button>
        </div>
      </Modal.Header>
      <Modal.Body>
        <div className="centerIt ">
          <LuClock3 className="fs-5 me-2" />

          <p style={{ fontWeight: "600" }}>Work-days and hours</p>
        </div>
        <div
          className="mt-3 d-flex justify-content-between fs_14 rounded-1"
          style={{ padding: "12px 24px", backgroundColor: "#f5f6f8" }}
        >
          {daysHours.map((day, index) => (
            <div key={index} className="">
              <p className="mb-2" style={{ fontWeight: "600" }}>
                {day.day}
              </p>
              <p>{day.hours}</p>
            </div>
          ))}
          <p className="" style={{ color: "#ababaf" }}>
            Saturday
          </p>
          <p style={{ color: "#ababaf" }}>Sunday</p>
        </div>
        <div
          className="centerIt justify-content-between"
          style={{ marginTop: "32px" }}
        >
          <div className="centerIt ">
            <GiPalmTree className="me-2" />

            <p style={{ fontWeight: "600" }}>Time off 2024</p>
            <button
              className="rounded-1 bgHover centerIt justify-content-center ms-2"
              style={{ width: "24px", height: "24px" }}
            >
              <FaAngleLeft style={{ fontSize: "12px" }} />
            </button>
            <button
              className="rounded-1 bgHover centerIt justify-content-center"
              style={{ width: "24px", height: "24px" }}
            >
              <FaAngleRight style={{ fontSize: "12px" }} />
            </button>
          </div>
          <div className="centerIt">
            <div className="centerIt me-4">
              <span
                className="rounded-circle fs_14 centerIt justify-content-center me-2"
                style={{
                  backgroundColor: "#323338",
                  width: "24px",
                  height: "24px",
                  color: "white",
                }}
              >
                0
              </span>
              <p className="fs_15">Public holiday</p>
            </div>
            <div className="centerIt">
              <span
                className="rounded-circle fs_14 centerIt justify-content-center me-2"
                style={{
                  backgroundColor: "#d83a52",
                  width: "24px",
                  height: "24px",
                  color: "white",
                }}
              >
                0
              </span>
              <p className="fs_15">Other</p>
            </div>
          </div>
        </div>
        <div style={{ height: "200px" }}>
          <p className="mt-5 fs_14">There is no Time off for this year.</p>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default AccountScheduleModal;
