import React, { useState } from "react";

import { FaRegUser } from "react-icons/fa6";
import { HiOutlineUserPlus } from "react-icons/hi2";

import { RxMagnifyingGlass } from "react-icons/rx";
import TeamsTable from "./TeamsTable";
import { Link } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import CloseIcon from "@mui/icons-material/Close";

const ContentTeams = () => {
  // You would have state and functions here to handle search, user actions, etc.
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
      <div className="flex flex-col flex-grow">
        <div className="flex items-center justify-between px-4 pb-2 pt-4">
          <h1 className="text-xl font-semibold">All Users</h1>
          <div className="mb-3">
            <Tooltip title="Close" placement="top">
              <Link
                to="/"
                className=" no-underline	text-[#211f1f] hover:bg-gray-300 px-1 py-0 rounded"
              >
                <CloseIcon style={{ cursor: "pointer" }} />
              </Link>
            </Tooltip>
          </div>
        </div>{" "}
        <div className="px-6 py-4">
          <div className="flex items-center mb-4 space-x-2 justify-between">
            <div className="addPersonSearch flex items-center relative ">
              <input
                type="text"
                placeholder="Search by name, email, title or teams"
                className={`person_searchInput `}
                style={{
                  paddingTop: ".5rem",
                  paddingBottom: ".5rem",
                  paddingLeft: "1rem",
                  paddingRight: "1rem",
                }}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <RxMagnifyingGlass className="text-base text-[#676879] absolute right-[1rem]" />
            </div>
            <div className="flex">
              <button className=" teamInvite_btn bgHover align-middle me-1 text-color"> 
                <HiOutlineUserPlus className="text-base mx-2  " />
                <span className="text-sm mt-1 "> Invite</span>
              </button>
            </div>
          </div>
        </div>
        {/* ===============Table=============== */}
        <TeamsTable searchTerm={searchTerm} />
      </div>
    </>
  );
};

export default ContentTeams;
