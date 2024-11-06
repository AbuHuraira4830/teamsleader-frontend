import React, { useEffect, useState } from "react";
import IMAGES from "../../../assets/images/Images";
import { Button, Form, Table } from "react-bootstrap";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { useStateContext } from "../../../contexts/ContextProvider";
import { set } from "date-fns";
import { FaPlus } from "react-icons/fa";
import { RxAvatar, RxCross2 } from "react-icons/rx";
import { GoPlus } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { postAPI } from "../../../helpers/apis";

const HomeCustomization2 = () => {
  const navigate = useNavigate();
  const { tableTeamName, setRows, userEmail } = useStateContext();
  const [tasks, setTasks] = useState([]);
  // const userEmail = "ali1239@gmail.com";
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

  const tableContent = [];
  const rows = [{ task: "task 1" }, { task: "task 2" }, { task: "task 3" }];

  // Fetch tasks from backend on component mount
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await postAPI("/api/initial/task-list", { userEmail }); // Replace with actual endpoint
        // console.log(res.data);
        setTasks(res.data.tasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, []);

  // Handle task title change
  const handleChange = (e, taskId) => {
    const updatedTasks = tasks.map((task) =>
      task._id === taskId ? { ...task, title: e.target.value } : task
    );
    setTasks(updatedTasks);
  };

  // Handle saving changes to backend
  const handleContinue = async () => {
    if (!tasks || tasks.length === 0) {
      window.location.replace("/");
      return
    }
    try {
      await postAPI("/api/update/tasks-titles", { userEmail, tasks });
      console.log("Tasks updated successfully");
      window.location.replace("/");
    } catch (error) {
      console.error("Error updating tasks:", error);
    }
  };
  const status = [
    { color: "#fdab3d", text: "Working on it" },
    { color: "#00c875", text: "Done" },
    { color: "#e2445c", text: "Stuck" },
  ];
  return (
    <div>
      <div className="customization_page">
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
        <div
          className="d-flex align-items-center "
          style={{ height: "89.3vh" }}
        >
          <div className="w-50 ">
            <div style={{ width: "440px" }} className="mx-auto">
              <p
                className="mb-4 "
                style={{ fontSize: "24px", marginTop: "24px" }}
              >
                List your tasks
              </p>
              {tasks?.map((row) => (
                <div>
                  <Form.Control
                    className="rounded-1 shadow-none workspace_searchInput fs_14 transparent_bg w-100 mb-4"
                    placeholder=""
                    value={row.title || ""}
                    onChange={(e) => handleChange(e, row._id)}
                    type="text"
                    style={{ height: "40px" }}
                  />
                </div>
              ))}
              <div className="mt-5 d-flex justify-content-between">
                <Button
                  className="workspace-dropdown-button border align-items-center d-flex fw-normal mt-4   py-1  px-3 "
                  style={{
                    height: "40px",
                  }}
                  onClick={() => navigate("/home-customization")}
                >
                  <MdChevronLeft className="me-2 fs-5" />
                  Back
                </Button>
                <Button
                  onClick={handleContinue}
                  type="button"
                  className="rounded-1 d-flex  justify-content-end mt-4 align-items-center green_btn border-0  "
                  style={{ width: "126px" }}
                >
                  Continue <MdChevronRight className="ms-2 fs-5" />
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
                onClick={() => window.location.replace("/")}
              >
                <RxCross2 />
              </Button>
              <div
                className="w-100 d-flex align-items-center"
                style={{ height: "40px" }}
              >
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
              <div className="d-flex align-items-center mb-4">
                <span style={{ borderBottom: "2px solid #579BFC" }}>Table</span>
                <GoPlus className="fs-5 ms-2" />
              </div>
              <div className=" mt-2 pb-4 d-flex">
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
                  className="border-bottom-0 "
                  style={{ borderColor: "var(--border-color) !important" }}
                >
                  <thead className="rounded-top rounded-2 overflow-hidden text-center">
                    <tr>
                      <th>Task</th>
                      <th>Owner</th>
                      <th>Status</th>
                      <th>Due date</th>
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
                    {tasks.map((row, index) => {
                      // Calculate the status to use in sequence
                      const currentStatus = status[index % status.length];

                      return (
                        <tr key={index} className="text-center fs_14">
                          <td>{row.title || "Task"}</td>
                          <td className="d-flex justify-content-center">
                            <RxAvatar className="fs-5" />
                          </td>
                          <td className="text-center p-0  ">
                            <span
                              className="centerIt h-10 text-white justify-center"
                              style={{
                                backgroundColor: currentStatus.color,
                              }}
                            >
                              {currentStatus.text}
                            </span>
                          </td>
                          {/* <td className="gray_bg"></td> */}
                          <td>22 Dec</td>
                          <td></td>
                        </tr>
                      );
                    })}
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
                  <thead className="rounded-top rounded-2 overflow-hidden text-center">
                    <tr>
                      <th>Task</th>
                      <th>Owner</th>
                      <th>Status</th>
                      <th>Due date</th>
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
                        + Add task
                      </th>
                    </tr>
                  </thead>
                </Table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeCustomization2;
