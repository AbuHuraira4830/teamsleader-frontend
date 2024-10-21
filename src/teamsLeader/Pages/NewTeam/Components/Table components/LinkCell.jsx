import { Popover } from "antd";
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { RxCross2 } from "react-icons/rx";
import { useStateContext } from "../../../../../contexts/ContextProvider";
import { postAPI } from "../../../../../helpers/apis";

const LinkCell = ({ columnID, columnData }) => {
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
  const data = JSON.stringify({ link: linkValue, text: alternativeText });

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
        setSelectedCountry(null);
        setAlternativeText("");
        setLinkValue("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAnchorClick = (event) => {
    event.preventDefault();
    const websiteLink = cellData?.link;

    if (websiteLink) {
      // Check if the URL starts with a protocol, if not, prepend "http://"
      const formattedLink = websiteLink.startsWith("http")
        ? websiteLink
        : `http://${websiteLink}`;

      window.open(formattedLink, "_blank");
    }
  };
  return (
    <Popover
      content={
        <div className="px-4 py-3" style={{ width: "265px" }}>
          <h5 className="m-2">Link</h5>
          <p className="m-1">Write or paste a link</p>
          <Form.Control
            className="rounded-1 py-2 mb-4 shadow-none workspace_searchInput transparent_bg"
            value={linkValue || ""}
            onChange={(e) => linkChange(e)}
            placeholder="www.example.com"
            type="text"
          />
          <p className="m-1">Text to display </p>
          <Form.Control
            className="rounded-1 py-2 mb-4 shadow-none workspace_searchInput transparent_bg h-100"
            onChange={(e) => alternativeTextChange(e)}
            type="text"
            value={alternativeText || ""}
            placeholder="Example text"
          />
        </div>
      }
      trigger="click"
      placement="bottom"
      open={open[columnID]}
      onOpenChange={(newOpen) => handleOpenChange(newOpen, columnID)}
    >
      <span
        className="flex align-items-center  justify-content-center textCell_width"
        style={{ height: "43px", padding: "10px 0px" }}
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
          {cellData?.text ? cellData?.text : cellData?.link}
        </a>

        {(cellData?.text || cellData?.link) && isHovered && (
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

export default LinkCell;
