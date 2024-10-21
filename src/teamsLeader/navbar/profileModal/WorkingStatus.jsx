import React, { useState } from "react";
import { FaHeart, FaMinus, FaPlus } from "react-icons/fa6";
import { GoHomeFill } from "react-icons/go";
import { IoMdCloud } from "react-icons/io";
import { RiZzzFill } from "react-icons/ri";
import { BiSolidBellOff } from "react-icons/bi";
import { Col, Form, Row } from "react-bootstrap";
import { DatePicker, Space } from "antd";
const WorkingStatus = () => {
  const [dateRange, setDateRange] = useState("");
  const status = [
    { name: "In the office" },
    {
      name: "Working from home",
      icon: <GoHomeFill style={{ fontSize: "12px" }} />,
    },
    { name: "Out sick", icon: <FaPlus style={{ fontSize: "10px" }} /> },
    { name: "On break", icon: <RiZzzFill style={{ fontSize: "10px" }} /> },
    { name: "out of office", icon: <FaMinus style={{ fontSize: "12px" }} /> },
    {
      name: "Working outside",
      icon: <IoMdCloud style={{ fontSize: "10px" }} />,
    },
    { name: "Family time", icon: <FaHeart style={{ fontSize: "10px" }} /> },
    {
      name: "Do not disturb",
      icon: <BiSolidBellOff style={{ fontSize: "10px" }} />,
    },
  ];
  const { RangePicker } = DatePicker;
  return (
    <div className="w-100" style={{ padding: "24px" }}>
      <p className="" style={{ fontSize: "32px", fontWeight: "500" }}>
        Working status
      </p>
      <p>Let everyone know your status</p>
      <Row className="mt-3">
        {status.map((option) => (
          <Col lg={3} className="centerIt mb-3">
            <Form.Check
              className="cursor_pointer text-nowrap"
              type="radio"
              label={option.name}
              name="role"
              //   id={item}
              style={{ padding: "8px 20px 8px 44px" }}
            />
            {option.name === "In the office" ? (
              ""
            ) : (
              <span
                className="centerIt justify-content-center rounded-circle"
                style={{
                  width: "17px",
                  height: "17px",
                  backgroundColor: "black",
                  color: "white",

                  border: "1px solid white",
                }}
              >
                {option.icon}
              </span>
            )}
          </Col>
        ))}
      </Row>
      <div>
        <Space
          direction="vertical"
          size={12}
          //   className="table_rangePicker position-absolute start-0"
        >
          <RangePicker
            separator=""
            placeholder="Choose dates"
            className="profileDatePicker"
            value={dateRange}
            onChange={() => setDateRange(e.target.value)}
            style={{ height: "40px" }}
          />
        </Space>

        <div className="fs_15 mt-2 ">
          <Form.Check
            // onClick={() => handleRoleClick(item)}
            className="cursor_pointer text-nowrap mb-5"
            type="checkbox"
            label="Disable email notifications while not in the office "
            //   id={item}
            style={{ padding: "8px 20px 8px 24px" }}
          />
          <p>User Activity Indication Control</p>
          <Form.Check
            // onClick={() => handleRoleClick(item)}
            className="cursor_pointer text-nowrap mt-2"
            type="checkbox"
            label="Disable online indication (it also means that you won't see if other people are online)"
            //   id={item}
            style={{ padding: "8px 20px 8px 24px" }}
          />
        </div>
      </div>
    </div>
  );
};

export default WorkingStatus;
