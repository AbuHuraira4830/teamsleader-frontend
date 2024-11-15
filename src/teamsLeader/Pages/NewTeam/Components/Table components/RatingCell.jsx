import React from "react";
import { useState } from "react";
import { IoIosStar } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import Rating from "react-rating";
import { useStateContext } from "../../../../../contexts/ContextProvider";
import { postAPI } from "../../../../../helpers/apis";

const RatingCell = ({ columnID, columnData }) => {
  const [isHovered, setIsHovered] = useState(false);
  const {
    selectedWorkspace,
    setSelectedWorkspace,
    selectedTeam,
    setTeamTasks,
  } = useStateContext();

  const handleRating = (id, value) => {
    console.log(value);
    const data = JSON.stringify({
      rating: value, // Storing icon type as string
    });
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
  };
  const clearRating = (id) => {
    const postData = {
      workspaceID: selectedWorkspace._id,
    };
    postAPI(`/api/table-cell/clear/${id}`, postData)
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
  };
  let cellData = JSON.parse(columnData);
  return (
    <div
      className="flex align-items-center justify-content-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span style={{ marginRight: !isHovered ? "14px" : "0px" }}>
        <Rating
          initialRating={cellData?.rating}
          emptySymbol={
            <IoIosStar style={{ color: "#c4c4c4", fontSize: "18px" }} />
          }
          fullSymbol={
            <IoIosStar style={{ color: "#fdab3d", fontSize: "18px" }} />
          }
          onChange={(value) => handleRating(columnID, value)}
        />
      </span>
      {isHovered && (
        <button
          className="px-0 py-0 file_deleteBtn flex  close-icon"
          onClick={() => clearRating(columnID)}
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
    </div>
  );
};

export default RatingCell;
