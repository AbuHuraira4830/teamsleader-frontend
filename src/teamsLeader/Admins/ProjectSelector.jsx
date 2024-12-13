import { Popover } from "antd";
import React, { useRef, useState } from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import { postAPI } from "../../helpers/apis";
import { FiEdit } from "react-icons/fi";
import { set } from "date-fns";
import { IoIosArrowDown } from "react-icons/io";

const ProjectSelector = ({ date, time }) => {
  const { selectedTeam, setSelectedTeam, thisUser } = useStateContext();
  const [open, setOpen] = useState(false);
  const inputRef = useRef(null);
  const selectedProject =
    selectedTeam?.projectSessions[selectedTeam?.currentProjectId];
  const [inputValue, setInputValue] = useState(selectedProject?.name || "");
  const hide = () => {
    setOpen(false);
  };
  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };

  const getProjectData = () => {
    if (!selectedTeam?.projectSessions) return [];
    return Object.entries(selectedTeam.projectSessions).map(
      ([id, project]) => ({
        id,
        name: project.name,
      })
    );
  };

  const namesList = getProjectData();

  const handleProjectClick = async (projectId) => {
    await postAPI("/api/admin/switch-project", {
      teamId: selectedTeam._id,
      projectId,
    })
      .then((res) => {
        const team = res.data.team;
        console.log(team);
        setInputValue(team.projectSessions[team.currentProjectId].name);
        setSelectedTeam(team);
        hide();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = async () => {
    const notification = `${thisUser.fullName} has changed the project name from "${selectedProject.name}" to "${inputValue}" on ${date} at ${time}`;
    try {
      if (!inputValue) return;

      const res = await postAPI("/api/admin/change-project-name", {
        teamId: selectedTeam._id,
        projectId: selectedTeam.currentProjectId,
        name: inputValue,
        notification,
      });
      setSelectedTeam(res.data.team);
    } catch (err) {
      console.log(err);
    }
  };
  const handleEditClick = (e) => {
    e.stopPropagation(); // Prevent triggering the popover
    if (inputRef.current) {
      inputRef.current.focus(); // Focus the input field
    }
  };
  return (
    <div>
      <div className="relative selectorInput">
        <input
          ref={inputRef}
          value={inputValue}
          onBlur={handleChange}
          onChange={(e) => setInputValue(e.target.value)}
          className="workspace_searchInput outline-none rounded-1 Border p-1 bg-[var(--dropdown-bgColor)]"
        />
        <span
          className="rounded-2 w-[24px] h-[24px] bgHover p-1 absolute right-8 cursor-pointer selectorEdit ]"
          style={{top: "2.5px" }}
          onClick={handleEditClick}
        >     
          <FiEdit  />
        </span>
        <Popover
          content={
            <div className="p-2 rounded-3" style={{ width: "250px" }}>
              {namesList.length > 0 ? (
                namesList.map(({ id, name }) => (
                  <p
                    key={id}
                    className="bgHover text-color py-1 rounded-1 px-2 cursor_pointer"
                    title={name}
                    onClick={() => handleProjectClick(id)}  
                  >
                    {name}
                  </p>
                ))
              ) : (
                <p>No project available</p>
              )}
            </div>
          }
          trigger="click"
          placement="bottomRight"
          open={open}
          onOpenChange={handleOpenChange}
        >
          <span
            className="rounded-2 w-[24px] h-[24px] bgHover p-1 absolute end-1 cursor-pointer "
            style={{  top: "2.5px" }}
            onClick={handleEditClick}
          >
            <IoIosArrowDown  />
          </span>
        </Popover>
      </div>
    </div>
  );
};

export default ProjectSelector;
