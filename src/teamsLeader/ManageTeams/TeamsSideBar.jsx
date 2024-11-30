import React, { useState } from "react";
import { FaPlus, FaFilter, FaSearch, FaUsers } from "react-icons/fa";
import { AiOutlinePlus } from "react-icons/ai";
import { LuFilter } from "react-icons/lu";
import { RxMagnifyingGlass } from "react-icons/rx";
import { Button } from "react-bootstrap";
import CreateTeamModal from "./CreateTeamModal";
import { PiMicrosoftTeamsLogoFill } from "react-icons/pi";
import { Diversity2 } from "@mui/icons-material";

const TeamsSidebar = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <div className=" h-screen">
      <div className="flex items-center justify-between p-4">
        <h1 className="text-xl font-semibold">Teams</h1>
      </div>
      <div className="flex flex-col p-4 space-y-2 mt-[-1rem]">
        {/* <Button
          className="d-flex items-center   bgHover text-base "
          variant="none"
          onClick={showModal}
        >
          <AiOutlinePlus className="mr-2 text-base" />
          <span>New team</span>
        </Button> */}
        <CreateTeamModal visible={isModalVisible} onClose={handleCancel} />

        {/* <Button
          className=" d-flex items-center   bgHover text-base"
          variant="none"
        >
          <LuFilter className="mr-2 text-base" />
          <span className="text-sm">Filter teams</span>
        </Button> */}

        <div className="addPersonSearch flex items-center relative w-full">
          <input
            type="text"
            placeholder="Search by teams"
            className={`person_searchInput `}
            style={{
              paddingTop: ".7rem",
              paddingBottom: ".7rem",
              paddingLeft: "1rem",
              paddingRight: "1rem",
            }}
            // onChange={(e) => setSearchQuery(e.target.value)}
          />
          <RxMagnifyingGlass className="text-base text-[#676879] absolute right-[1rem]" />
        </div>
        <hr className="" style={{ borderBottom: "1px solid #e6e9ef" }} />

        <div className="flex items-center justify-between px-4 py-2 text-gray-600 bg-white ">
          <div className="flex  items-center space-x-2">
            <FaUsers className="text-lg" />
            <span>All users</span>
          </div>
          <span className="px-2 py-1 text-xs font-semibold text-gray-600 bg-gray-200 rounded-full">
            6
          </span>
        </div>
      </div>
    </div>
  );
};

export default TeamsSidebar;
