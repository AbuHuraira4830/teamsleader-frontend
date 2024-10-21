import React from "react";
import ctaImg from "../../../assets/logos/ctaIcon.png";

import Tooltip from "@mui/material/Tooltip";
import { BiSolidEdit } from "react-icons/bi";
import { FaRegStickyNote } from "react-icons/fa";
import { Link } from "react-router-dom";

const CustomTooltip = ({ title, children }) => (
  <Tooltip title={title} placement="top">
    <div>{children}</div>
  </Tooltip>
);

const PostSkeletonFill = () => {
  return (
    <div className="plannerSkeleton_outermost">
      <div className="plannerSkeleton_outer">
        <div className="plannerSkeleton_Trans"> </div>
        <div className="planner_SkeletonContainer ">
          <button className="planner_SkeletonWrapper">
            <div className="flex justify-between items-center ">
              <div className="flex pr-[8px]">
                <div className="skeleton_circle"></div>
                <div className="skeleton_circle ml-[4px]"></div>
              </div>
              <div className="w-[48px]">
                <div className="skeleton_rectangle"></div>
              </div>
            </div>
            {/* ========================= */}
            <div className="skeleton_leftWrapper">
              <div className="skeleton_left">
                <div className="skeleton_left1"></div>
                <div className="mt-[6px]"></div>
                <div className="skeleton_left2"></div>
                <div className="mt-[6px]"></div>
                <div className="skeleton_left3"></div>
              </div>
              <div className="skeleton_imgWrapper">
                <img src={ctaImg} alt="CTA" className="skeleton_img" />
              </div>
            </div>

            <Link to="/new-post" className="schedulePostBtn mt-[1rem]">
              <span className="schedulePostBtn_inner">
                <span>
                  <span className="schedule_text"> Schedule Post</span>
                </span>
              </span>
            </Link>
          </button>
        </div>
      </div>
      <div className="skeletonBox_wrapper">
        <div className="flex w-full">
          <div className="inline-block mr-0.5 w-1/2">
            <CustomTooltip title="Schedule Post">
              <button className="skeletonBox_btn flex justify-center items-center">
                <BiSolidEdit className="text-sm" />
              </button>
            </CustomTooltip>
          </div>
          <div className="inline-block ml-0.5 w-1/2">
            <CustomTooltip title="Add Note">
              <button className="skeletonBox_btn flex justify-center items-center">
                <FaRegStickyNote className="text-sm" />
              </button>
            </CustomTooltip>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostSkeletonFill;
