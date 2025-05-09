import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import IMAGES from "../../../assets/images/Images";
import { useStateContext } from "../../../contexts/ContextProvider";
import UploadedFileModal from "../../Pages/NewTeam/Components/UploadedFileModal";
import ExtraNote from "./ExtraNote";
import { postAPI } from "../../../helpers/apis";
import { Popover } from "antd";
import ReasonPopup from "./ReasonPopup";
import { FiEdit } from "react-icons/fi";
import UpdateHolidayRequest from "./UpdateHolidayRequest";
const EmployeeTimeOffs = ({
  selectedYear,
  myHolidayRequests,
  setMyHolidayRequests,
}) => {
  const {
    holidayRequestsData,
    setUpdateRequestModal,
    setPreviewModalFiles,
    setCurrentItemIndex,
    setModalShow,
    thisUser,
  } = useStateContext();

  const [visibleModals, setVisibleModals] = useState({});
  useEffect(() => {
    postAPI("/api/get-holiday-requests", [thisUser.emailAddress])
      .then((res) => {
        setMyHolidayRequests(res.data.holidayRequests);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const columns = [
    {
      title: "Vacation Name",
    },
    {
      title: "Vacation Type",
    },

    {
      title: "Status",
    },
    {
      title: "Date to Date",
    },
    {
      title: "Days",
    },
    {
      title: "Approved/Rejected by",
    },
    {
      title: "Revoked by",
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

  const handleFileClick = (index, files) => {
    setCurrentItemIndex(index);
    setModalShow({ modalActive: true });
    setPreviewModalFiles(files);
  };

  const isDateInSelectedYear = (dateToDateString) => {
    const [startDateStr, endDateStr] = dateToDateString.split(" - ");
    const startDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);

    return (
      startDate.getFullYear() === selectedYear ||
      endDate.getFullYear() === selectedYear
    );
  };

  const handleShowModal = (rowId) => {
    setVisibleModals((prev) => ({ ...prev, [rowId]: true }));
  };

  const handleCloseModal = (rowId) => {
    setVisibleModals((prev) => ({ ...prev, [rowId]: false }));
  };
  return (
    <>
      <Table
        responsive
        className="holiday-table mt-2 text-nowrap w-max"
        size=""
      >
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
          {myHolidayRequests
            ?.filter((row) => isDateInSelectedYear(row.dateToDate))
            .map((row, index) => (
              <tr className="fs_14" key={row._id}>
                <td className="text-center">{row.holidayName}</td>
                <td className="text-center">{row.type}</td>

                <td>
                  {/* {row.status} */}
                  <span
                    className=" rounded-2 d-flex align-items-center  justify-content-center special_tag min-w-max"
                    style={{
                      backgroundColor: row.status.bgColor,
                      color: row.status.color,
                    }}
                  >
                    {row.status.value}
                  </span>
                </td>
                <td className="">
                  <div className="centerIt justify-center">
                    {row.dateToDate}
                  </div>
                </td>
                <td>
                  <div className="centerIt justify-center">{row.days}</div>
                </td>
                <td>
                  {(row.approvedBy || row.rejectedBy) && (
                    <div className="centerIt justify-center">
                      <img
                        src={row.approvedBy.picture || row.rejectedBy.picture}
                        width={30}
                        alt=""
                        className="align-self-center  me-2"
                        style={{ width: "30px", height: "30px" }}
                        // width={30}
                      />
                      <span />
                      <span className="cursor_pointer">
                        {row.approvedBy.fullName || row.rejectedBy.fullName}
                      </span>
                    </div>
                  )}
                </td>
                <td>
                  {row.revokedBy && (
                    <div className="centerIt justify-center">
                      <img
                        src={row?.revokedBy?.picture}
                        width={30}
                        alt=""
                        className="align-self-center  me-2"
                        style={{ width: "30px", height: "30px" }}
                      />
                      <span />
                      <span className="cursor_pointer">
                        {row?.revokedBy?.fullName}
                      </span>
                    </div>
                  )}
                </td>
                <td>
                  <div className="centerIt justify-around ">
                    {row.files.map((file, idx) => (
                      <img
                        key={idx}
                        src={file.props.src}
                        alt={file.props.alt}
                        className="uploaded-file-img cursor_pointer"
                        onClick={() => handleFileClick(idx, row.filesData)}
                        // style={{ maxWidth: "50px", maxHeight: "50px" }} // Adjust style as needed
                      />
                    ))}
                  </div>
                </td>
                <td>
                  <ReasonPopup
                    value={row.holidayReason}
                    id={row._id}
                    source={"Reason"}
                  />
                </td>
                <td>
                  <ReasonPopup
                    value={row.extraNote}
                    id={row._id}
                    source={"Notes"}
                  />
                </td>
                <td>
                  <div className="centerIt justify-center">
                    <button
                      className="h-100 centerIt justify-center border-0 shadow-none bgHover p-2 rounded-1"
                      onClick={() => handleShowModal(row._id)}
                      disabled={row.status.value !== "Pending"}
                      style={{
                        color:
                          row.status.value === "Pending"
                            ? "var(--text-color)"
                            : "gray",
                      }}
                    >
                      <FiEdit className="fs-5" />
                    </button>
                  </div>
                  <UpdateHolidayRequest
                    row={row}
                    visible={!!visibleModals[row._id]}
                    onClose={() => handleCloseModal(row._id)}
                    isEdit={true}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </Table>

      <UploadedFileModal />
    </>
  );
};

export default EmployeeTimeOffs;
