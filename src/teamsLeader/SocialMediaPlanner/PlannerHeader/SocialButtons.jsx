import React from "react";
import { FaUserFriends, FaChartLine } from "react-icons/fa";
import { Button } from "react-bootstrap";

const SocialButtons = ({ activeTab }) => {
  if (activeTab !== "Social Planner") return null;

  return (
    <div className="flex gap-2 mb-3">
      <button className="  flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-[#fff] rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-indigo-500  hover:bg-gray-200 transition">
        {/* <button className="  flex items-center px-4 py-2 text-sm font-medium    rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-indigo-500   transition"> */}
        <FaUserFriends className="w-5 h-5 mr-2" aria-hidden="true" />
        Connect Profiles
      </button>
      <button className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-[#fff] rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-indigo-500  hover:bg-gray-200 transition">
        <FaChartLine className="w-5 h-5 mr-2" aria-hidden="true" />
        Performance
      </button>
    </div>
  );
};

export default SocialButtons;
