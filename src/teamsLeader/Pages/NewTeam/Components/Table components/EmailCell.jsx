import { Popover } from "antd";
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { RxCross2 } from "react-icons/rx";
import { useStateContext } from "../../../../../contexts/ContextProvider";
import { postAPI } from "../../../../../helpers/apis";

const EmailCell = ({ columnID, columnData }) => {
  const {
    selectedWorkspace,
    setSelectedWorkspace,
    selectedTeam,
    setTeamTasks,
  } = useStateContext();
  const [open, setOpen] = useState({});
  const [alternativeText, setAlternativeText] = useState("");
  const [linkValue, setLinkValue] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  let cellData = JSON.parse(columnData);
  const linkChange = (e) => {
    setLinkValue(e.target.value);
    if (!open[columnID] && alternativeText === "") {
      setAlternativeText(e.target.value);
    }
  };

  const alternativeTextChange = (e) => {
    setAlternativeText(e.target.value);
  };

  const data = JSON.stringify({ email: linkValue, text: alternativeText });
  const handleOpenChange = (newOpen, columnID) => {
    setOpen({ ...open, [columnID]: newOpen });
    const id = columnID;
    if (!newOpen) {
      const postData = {
        data,
        workspaceID: selectedWorkspace._id,
      };
      postAPI(`/api/table-cell/update/${id}`, postData)
        .then((res) => {
          setSelectedWorkspace(res.data.workspace);
          const team = res.data.workspace.teams.find(
            (team) => team._id === selectedTeam._id
          );
          setTeamTasks(team);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const removeLink = (id) => {
    const postData = {
      workspaceID: selectedWorkspace._id,
    };
    postAPI(`/api/table-cell/clear/${id}`, postData)
      .then((res) => {
        setSelectedWorkspace(res.data.workspace);
        // console.log(res.data.workspace);
        const team = res.data.workspace.teams.find(
          (team) => team._id === selectedTeam._id
        );
        setTeamTasks(team);
        setAlternativeText("");
        setLinkValue("");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleAnchorClick = (event) => {
    event.preventDefault();
    const emailAddress = cellData?.email;

    if (emailAddress) {
      const mailtoLink = `mailto:${emailAddress}`;

      window.open(mailtoLink);
    }
  };

  return (
    <Popover
      content={
        <div className="px-4 py-3" style={{ width: "265px" }}>
          <p className="m-1">Add email address</p>
          <Form.Control
            className="rounded-1 py-2 mb-4 shadow-none workspace_searchInput transparent_bg"
            value={linkValue || ""}
            onChange={(e) => linkChange(e)}
            placeholder="user@example.com"
            type="text"
          />
          <p className="m-1">Add text to display </p>
          <Form.Control
            className="rounded-1 py-2 mb-4 shadow-none workspace_searchInput transparent_bg h-100"
            onChange={(e) => alternativeTextChange(e)}
            type="text"
            value={alternativeText || ""}
            placeholder="(Optional)"
          />
        </div>
      }
      trigger="click"
      placement="bottom"
      open={open[columnID]}
      onOpenChange={(newOpen) => handleOpenChange(newOpen, columnID)}
    >
      <span
        className="flex align-items-center  justify-content-center "
        style={{ height: "43px", padding: "10px 0px", width: "160px" }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <a
          className="px-3"
          style={{ color: "#0086c0", marginRight: !isHovered ? "14px" : "0px" }}
          onClick={(event) => {
            event.stopPropagation();
            handleAnchorClick(event);
          }}
        >
          {cellData?.text ? cellData?.text : cellData?.email}
        </a>

        {(cellData?.text || cellData?.email) && isHovered && (
          <button
            className="px-0 py-0 file_deleteBtn flex  close-icon"
            onClick={(event) => {
              event.stopPropagation();
              removeLink(columnID);
            }}
          >
            <RxCross2
              className=""
              style={{
                width: "14px",
                height: "auto",
              }}
            />
          </button>
        )}
      </span>
    </Popover>
  );
};

export default EmailCell;
