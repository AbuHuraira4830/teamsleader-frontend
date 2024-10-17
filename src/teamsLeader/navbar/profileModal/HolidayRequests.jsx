// import { Table } from "antd";

import React, { useEffect, useRef, useState } from "react";
import IMAGES from "../../../assets/images/Images";
import { Form, Table } from "react-bootstrap";
import { useStateContext } from "../../../contexts/ContextProvider";
import { postAPI } from "../../../helpers/apis";
import UploadedFileModal from "../../Pages/NewTeam/Components/UploadedFileModal";
import ErrorPopup from "./ErrorPopup";
import SuccessPopup from "./SuccessPopup";
import ExtraNote from "./ExtraNote";
import ReasonPopup from "./ReasonPopup";

const HolidayRequests = () => {
  const {
    holidayRequestsData,
    setHolidayRequestsData,
    thisUser,
    setPreviewModalFiles,
    setCurrentItemIndex,
    setModalShow,
    setErrorModal,
    setSuccessModal,
    setThisUser,
    setHolidayHistory,
    holidayHistory,
  } = useStateContext();
  const [extraNotes, setExtraNotes] = useState({});
  const buttonRef = useRef(null);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedHoliday, setSelectedHoliday] = useState(null);
  const closePopup = () => {
    setShowPopup(false);
    setSelectedHoliday(null);
  };
  const handlePopup = (item) => {
    setSelectedHoliday(item);
  };

  useEffect(() => {
    setShowPopup(true);
  }, [selectedHoliday]);
  const [successMessage, setSuccessMessage] = useState("");
  const handleExtraNoteChange = (id, emailAddress, value) => {
    setExtraNotes((prevNotes) => ({
      ...prevNotes,
      [id]: value,
    }));
    postAPI("/api/update-holiday-request", {
      id,
      emailAddress,
      extraNote: value,
    })
      .then((res) => {
        setHolidayRequestsData(res.data.holidayRequests);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const column1 = [
    {
      title: "Full Name",
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
      title: "Files",
    },
    {
      title: "Reason",
    },
    {
      title: "Notes",
    },
    {
      title: "Action",
    },
  ];

  const approveHoliday = async (emailAddress, id, dateToDate, days, type) => {
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
        color: "#57c957",
        bgColor: "#c1ffc1",
        value: "Approved",
      };
      const approvedBy = {
        picture: thisUser.picture,
        fullName: thisUser.fullName,
      };
      const newUpdate = `${thisUser.fullName} approved your ${dateToDate} holiday request on ${date} at ${time}`;

      // Call the API to approve the holiday
      const res = await postAPI("/api/update-holiday-request", {
        id,
        emailAddress,
        status,
        approvedBy,
      });
      // Update holiday requests data
      setHolidayRequestsData(res.data.holidayRequests);
      handleHistory(emailAddress, newUpdate);
      // Set success modal and message
      setSuccessModal(true);
      setSuccessMessage("Holiday request approved successfully");
      // Call the function to update the member's holidays
      await updateMemberHoliday(days, type, emailAddress);
    } catch (err) {
      console.log(err);
    }
  };

  const updateMemberHoliday = async (days, type, emailAddress) => {
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
        source: "",
      });
      console.log(res.data.message);
    } catch (err) {
      console.log(err);
    }
  };
  const rejectHoliday = (emailAddress, id, extraNote, dateToDate) => {
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
      const newUpdate = `${thisUser.fullName} rejected your ${dateToDate} holiday request on ${date} at ${time}`;
    console.log(extraNote);
    const status = { color: "#ff5858", bgColor: "#ffcbcb", value: "Rejected" };
    const rejectedBy = {
      picture: thisUser.picture,
      fullName: thisUser.fullName,
    };
    extraNote === ""
      ? setErrorModal(true)
      : postAPI("/api/update-holiday-request", {
          id,
          emailAddress,
          status,
          rejectedBy,
        })
          .then((res) => {
            setHolidayRequestsData(res.data.holidayRequests);
            handleHistory(emailAddress, newUpdate);
            setSuccessModal(true);
            setSuccessMessage("Holiday request rejected successfully");
          })
          .catch((err) => {
            console.log(err);
          });
  };

  const handleFileClick = (index, files) => {
    setCurrentItemIndex(index);
    setModalShow({ modalActive: true });
    setPreviewModalFiles(files);
  };

  const handleHistory = (emailAddress, holidayHistory) => {
    postAPI("/api/holiday-history/update", {
      emailAddress: emailAddress,
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
    <div className="w-100 fs_14" style={{ padding: "24px" }}>
      <Table responsive className="holiday-table mt-3  ">
        <thead>
          <tr>
            {column1.map((column, index) => (
              <th className={`text-nowrap text-center`} key={index}>
                {column.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {holidayRequestsData
            .filter((item) => item.status.value === "Pending")
            .map((item) => (
              <tr key={item._id}>
                <td>
                  {" "}
                  <div className="centerIt justify-center">
                    <img
                      src={item.picture}
                      width={30}
                      alt=""
                      className="align-self-center  me-2"
                      style={{ width: "30px", height: "30px" }}
                      // width={30}
                    />
                    <span />
                    <span className="cursor_pointer">{item.fullName}</span>
                  </div>
                </td>
                <td>
                  <div className="centerIt justify-center">
                    {item.holidayName}
                  </div>
                </td>
                <td>
                  <div className="centerIt justify-center">{item.type}</div>
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
                  <div className="centerIt justify-around ">
                    {item.files.map((file, idx) => (
                      <img
                        key={idx}
                        src={file.props.src}
                        alt={file.props.alt}
                        className="uploaded-file-img cursor_pointer"
                        onClick={() => handleFileClick(idx, item.filesData)}
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
                <td>
                  {" "}
                  <div className="centerIt justify-center">
                    <span
                      className="fs_14 me-2 cursor_pointer"
                      style={{ color: "#00854d" }}
                      onClick={() =>
                        approveHoliday(
                          item.emailAddress,
                          item._id,
                          item.dateToDate,
                          item.days,
                          item.type
                        )
                      }
                    >
                      Approve
                    </span>
                    <span
                      className="fs_14 cursor_pointer"
                      style={{ color: "#d83a52" }}
                      onClick={() =>
                        rejectHoliday(
                          item.emailAddress,
                          item._id,
                          item.extraNote,
                          item.dateToDate
                        )
                      }
                    >
                      Reject             
                    </span>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <UploadedFileModal />
      <ErrorPopup error={"Add a reason of rejection in extra note"} />
      <SuccessPopup text={successMessage} />
    </div>
  );
};

export default HolidayRequests;
