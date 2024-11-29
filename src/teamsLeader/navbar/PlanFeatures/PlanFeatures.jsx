import React, { useState } from "react";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import PlanFeaturesDescription from "./PlanFeaturesDescription";
import { Tooltip } from "antd";

const PlanFeatures = ({ selectedPlan, plans,features }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="flex flex-col p-4">
      <div className="my-[45px] mx-0 text-center">
        <Tooltip
          title={
            isExpanded
              ? "Hide Plans and Features list"
              : "Show Plans and Features list"
          }
          arrow
        >
          <button className="plan_featuresBtnWrap" onClick={handleToggle}>
            Compare Plans and Features
            {isExpanded ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </button>
        </Tooltip>
      </div>
      {isExpanded && (
        <PlanFeaturesDescription plans={plans} selectedPlan={selectedPlan} features = {features}/>
      )}
    </div>
  );
};

export default PlanFeatures;
