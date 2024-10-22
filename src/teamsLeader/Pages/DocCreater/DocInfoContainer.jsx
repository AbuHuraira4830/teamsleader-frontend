import React from "react";
import { Button, Popover } from "antd";
import { FaRegMoon } from "react-icons/fa6";
import { GoDotFill } from "react-icons/go";
import { PiFlowerThin } from "react-icons/pi";
import { MdOutlineAccessTime } from "react-icons/md";
function formatDate(dateString) {
  const date = new Date(dateString);

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  let hours = date.getHours();
  let minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? hours : 12; // if 0, set to 12
  minutes = minutes < 10 ? "0" + minutes : minutes;

  return `${month} ${day}, ${year}, ${hours}:${minutes} ${ampm}`;
}

const content = (
  <>
    <div className="rounded-lg w-80 bg-white p-3">
      <div className="flex items-center gap-2">
        <span className="w-20 h-20 rounded-full bg-red-400 flex items-center justify-center text-3xl text-white">
          F
        </span>
        <div className="flex flex-col gap-2 justify-center">
          <div className="flex gap-1 items-center">
            <span className="font-bold">Falak Sher</span>
            <GoDotFill className="text-green-500 text-lg" />
          </div>
          <div className="flex gap-1 items-center">
            <FaRegMoon />

            <span>1:24 AM</span>
            <span>,</span>
            <span>Islamabad</span>
          </div>
          <span className="bg-cyan-300 text-black rounded px-2 py-1 w-20 flex justify-center text-gray-500">
            Admin
          </span>
        </div>
      </div>
    </div>
  </>
);
const DocInfoContainer = ({
  showHeadings,
  backgroundColor,
  createdDate,
  updatedDate,
  owner,
  headersObj,
}) => {
  const { title, coverImage, docInfo } = headersObj;

  return (
    <div
      className=" h-full  w-full absolute flex  items-center gap-10 "
      style={{
        height: "100px",
        top:
          coverImage && title
            ? "404px"
            : coverImage && !title
            ? "345px"
            : !coverImage && !title
            ? "50px"
            : "130px",
        // top: "430px",

        paddingLeft: showHeadings ? "230px" : "100px",
        backgroundColor,
      }}
    >
      <Popover content={content} placement="bottom">
        <div className="flex items-center gap-2 w-52 hover:bg-gray-100 p-1 rounded-lg cursor-pointer hover:bg-[rgba(0,0,0,0.05)]">
          <span className="w-7 h-7 rounded-full bg-red-400 flex items-center justify-center text-white">
            F
          </span>
          <span className="text-gray-500">Creator</span>
          <span className="font-bold">Falak Sher</span>
        </div>
      </Popover>
      <div className="flex items-center gap-1">
        <PiFlowerThin className="text-gray-500" />
        <span className="text-gray-500">Created</span>
        <span className="font-bold">{formatDate(createdDate)}</span>
      </div>
      <div className="flex items-center gap-1">
        <MdOutlineAccessTime className="text-gray-500" />
        <span className="text-gray-500">Last Updated</span>
        <span className="font-bold">{formatDate(updatedDate)}</span>
      </div>
    </div>
  );
};

export default DocInfoContainer;
