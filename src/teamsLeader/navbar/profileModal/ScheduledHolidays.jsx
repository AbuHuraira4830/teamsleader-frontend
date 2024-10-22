// import { Table } from "antd";
import React, { useEffect, useRef, useState } from "react";
import IMAGES from "../../../assets/images/Images";
import DatePicker from "react-multi-date-picker";
import { Button, Form, Table } from "react-bootstrap";
import { useStateContext } from "../../../contexts/ContextProvider";
import { postAPI } from "../../../helpers/apis";
import SuccessPopup from "./SuccessPopup";
import ErrorPopup from "./ErrorPopup";
import UploadedFileModal from "../../Pages/NewTeam/Components/UploadedFileModal";
import { Dropdown, Popover, Space } from "antd";
import ExtraNote from "./ExtraNote";
import ReasonPopup from "./ReasonPopup";

const ScheduledHolidays = () => {
  const {
    holidayRequestsData,
    setErrorModal,
    thisUser,
    setSuccessModal,
    setHolidayRequestsData,
    setPreviewModalFiles,
    setCurrentItemIndex,
    setModalShow,
    setThisUser,
    holidayHistory,
    setHolidayHistory,
  } = useStateContext();
  const [vacation, setVacation] = React.useState([]);

  const [extraNotes, setExtraNotes] = useState({});

  const [days, setDays] = useState(0);

  const calculateBusinessDays = (startDate, endDate) => {
    let count = 0;
    const currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      const dayOfWeek = currentDate.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        // Exclude Sundays (0) and Saturdays (6)
        count++;
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return count;
  };

  useEffect(() => {
    if (vacation?.length === 2) {
      const [startDate, endDate] = vacation.map((date) => new Date(date));
      const businessDays = calculateBusinessDays(startDate, endDate);
      setDays(businessDays);
    }
  }, [vacation]);

  const columns = [
    {
      title: "Employee",
    },
    {
      title: "Vacation Name",
    },
    {
      title: "Vacation Type",
    },

    {
      title: "Date to Date",
    },
    {
      title: "Days",
    },
    {
      title: "Approved By",
    },
    {
      title: "Rejected By",
    },
    {
      title: "Revoked By",
    },
    {
      title: "Revoke Vacation",
    },

    {
      title: "Files",
    },
    {
      title: "Reason",
    },
    {
      title: "Notes",
    },
  ];
  const revokeHoliday = async (
    emailAddress,
    id,
    extraNote,
    dateToDate,
    days,
    type
  ) => {
    try {
      const now = new Date();
      const options = { day: "numeric", month: "short", year: "numeric" };
      const date = now.toLocaleDateString("en-US", options);
      const timeOptions = {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      };
      const time = now
        .toLocaleTimeString("en-US", timeOptions)
        .replace(":", " : ");

      const status = {
        color: "#ff5858",
        bgColor: "#ffcbcb",
        value: "Rejected",
      };
      const revokedBy = {
        picture: thisUser.picture,
        fullName: thisUser.fullName,
      };

      const newUpdate = `${thisUser.fullName} revoked your ${dateToDate} holiday request on ${date} at ${time}`;

      if (extraNote === "") {
        setErrorModal(true);
        return;
      }

      const res = await postAPI("/api/update-holiday-request", {
        id,
        emailAddress,
        status,
        revokedBy,
        approvedBy: "",
      });

      setHolidayRequestsData(res.data.holidayRequests);
      handleHistory(emailAddress, newUpdate);
      setSuccessModal(true);
      await updateMemberHoliday(days, type, emailAddress);
    } catch (err) {
      console.log(err);
    }
  };
  const updateMemberHoliday = async (days, type, emailAddress) => {
    console.log(days, type, emailAddress);
    try {
      const daysAsNumber = Number(days); // Convert days to a number
      if (isNaN(daysAsNumber)) {
        console.error("Invalid number for days:", days);
        return;
      }
      const res = await postAPI("/api/member/update-holidays", {
        emailAddress,
        type,
        value: daysAsNumber,
        source: "revoke",
      });
      console.log(res.data.message);
    } catch (err) {
      console.log(err);
    }
  };
  const handleFileClick = (index, files) => {
    setCurrentItemIndex(index);
    setModalShow({ modalActive: true });
    setPreviewModalFiles(files);
  };
  const handleHistory = (emailAddress, holidayHistory) => {
    postAPI("/api/holiday-history/update", {
      emailAddress,
      holidayHistory,
    })
      .then((res) => {
        console.log(res.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="w-100 fs_14" style={{ padding: "24px" }}>
        <div>{/* <Table dataSource={data1} columns={column1} /> */}</div>

        <Table responsive className="holiday-table  text-nowrap w-max">
          <thead>
            <tr>
              {columns.map((column, index) => (
                <th className=" text-center" key={index}>
                  {column.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {holidayRequestsData.map((item, index) => (
              <tr className="" key={item._id}>
                <td className="">
                  <p className="centerIt justify-center ">
                    <img
                      src={item.picture}
                      width={30}
                      alt=""
                      className="align-self-center  me-2"
                      style={{ width: "30px", height: "30px" }}
                      // width={30}
                    />
                    <span />
                    <span className="cursor_pointer ">{item.fullName}</span>
                  </p>
                </td>
                <td>
                  <div className="text-center">{item.holidayName}</div>
                </td>
                <td>
                  <div className="text-center">{item.type}</div>
                </td>

                <td>
                  <div className="centerIt justify-center">
                    {item.dateToDate}
                  </div>
                </td>
                <td>
                  <div className="centerIt justify-center">{item.days}</div>
                </td>
                <td>
                  {item.approvedBy && (
                    <div className="centerIt justify-center">
                      <img
                        src={item.approvedBy.picture}
                        width={30}
                        alt=""
                        className="align-self-center  me-2"
                        style={{ width: "30px", height: "30px" }}
                        // width={30}
                      />
                      <span />
                      <span className="cursor_pointer">
                        {item.approvedBy.fullName}
                      </span>
                    </div>
                  )}
                </td>
                <td>
                  {item.rejectedBy && (
                    <div className="centerIt justify-center">
                      <img
                        src={item.rejectedBy.picture}
                        width={30}
                        alt=""
                        className="align-self-center  me-2"
                        style={{ width: "30px", height: "30px" }}
                        // width={30}
                      />
                      <span />
                      <span className="cursor_pointer">
                        {item.rejectedBy.fullName}
                      </span>
                    </div>
                  )}
                </td>
                <td>
                  {item.revokedBy && (
                    <div className="centerIt justify-center">
                      <img
                        src={item?.revokedBy?.picture}
                        width={30}
                        alt=""
                        className="align-self-center  me-2"
                        style={{ width: "30px", height: "30px" }}
                      />
                      <span />
                      <span className="cursor_pointer">
                        {item?.revokedBy?.fullName}
                      </span>
                    </div>
                  )}
                </td>
                <td>
                  {item.status.value === "Approved" ? (
                    <span
                      className="fs_14 cursor_pointer centerIt justify-content-center"
                      style={{ color: "#d83a52" }}
                      onClick={() =>
                        revokeHoliday(
                          item.emailAddress,
                          item._id,
                          item.extraNote,
                          item.dateToDate,
                          item.days,
                          item.type
                        )
                      }
                    >
                      Revoke
                    </span>
                  ) : (
                    <div className="text-center">__</div>
                  )}
                </td>

                <td>
                  <div className="centerIt justify-around ">
                    {item.files.map((file, idx) => (
                      <img
                        key={idx}
                        src={file.props.src}
                        alt={file.props.alt}
                        className="uploaded-file-img cursor_pointer"
                        onClick={() => handleFileClick(idx, item.filesData)}
                        // style={{ maxWidth: "50px", maxHeight: "50px" }} // Adjust style as needed
                      />
                    ))}
                  </div>
                </td>
                <td>
                  <ReasonPopup
                    value={item.holidayReason}
                    id={item._id}
                    source={"Reason"}
                  />
                </td>
                <td className="relative">
                  <ExtraNote
                    extraNotes={extraNotes}
                    setExtraNotes={setExtraNotes}
                    item={item}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <UploadedFileModal />
        <ErrorPopup error={"Add a reason of revocation in extra note"} />
        <SuccessPopup text={"Holiday revoked successfully"} />
      </div>
    </>
  );
};

export default ScheduledHolidays;
