import React from "react";
import { MdInfoOutline } from "react-icons/md";
import { Tooltip } from "antd";
import { IoCheckmarkSharp } from "react-icons/io5";
import { RxDividerHorizontal } from "react-icons/rx";

const PlanFeaturesDescription = ({ selectedPlan, plans, features }) => {


  const getClass = (plan) => {
    return selectedPlan === plan ? "selectedPlanFeature" : "";
  };


  const getPlanValue = (planName, feature, isEssential = false) => {
    // If it's an essential feature, use the default features from the plans array
    if (isEssential) {
      const plan = plans.find((p) => p.deal === planName);
      if (!plan) return ""; // Return empty if plan is not found

      const value = plan.permissions[feature];

      if (typeof value === "boolean") {
        return value ? (
          <span className="checkmark_plansPricing relative">
            <IoCheckmarkSharp />
          </span>
        ) : (
          <span className="planfeatures_no">
            <RxDividerHorizontal />
          </span>
        );
      }

      if (typeof value === "number") {
        if (feature === "videoCalling") {
          return `${value} hours`;
        }
        return value;
      }

      return value === null || value === "infinite" ? "Ꚙ" : value;
    }

    // Otherwise, use the updated features from the features object
    if (features && features.hasOwnProperty(feature)) {
      const value = features[feature];

      if (typeof value === "boolean") {
        return value ? (
          <span className="checkmark_plansPricing relative">
            <IoCheckmarkSharp />
          </span>
        ) : (
          <span className="planfeatures_no">
            <RxDividerHorizontal />
          </span>
        );
      }

      if (typeof value === "number") {
        if (feature === "videoCalling") {
          return `${value} hours`;
        }
        return value;
      }

      return value === null || value === "infinite" ? "Ꚙ" : value;
    }

    return ""; // Return empty if feature is not found
  };
  
  return (
    <>
      {/* ===================Essentials=================== */}
      <div>
        <div className="planfeatures_grid planfeatures_gridBottom">
          <div className="planfeatures_gridHeader">Essentials</div>
          {plans.map((plan) => (
            <div
              key={plan.deal}
              className={`planfeatures_gridHeader2 ${getClass(plan.deal)}`}
            >
              {plan.deal}
            </div>
          ))}
        </div>

        {/* Example of dynamic feature rows */}
        <div className="planfeatures_grid">
          <div className="planfeatures_gridHeaderWrap">
            Workspaces
            <Tooltip title="The amount of environments to work in" arrow>
              <MdInfoOutline className="text-[#c4c4c4] flex overflow-hidden relative" />
            </Tooltip>
          </div>
          {plans.map((plan) => (
            <div
              key={plan.deal}
              className={`planfeatures_gridHeader3 ${getClass(plan.deal)}`}
            >
              {/* {getPlanValue(plan.deal, "workspaces")} */}
              {getPlanValue(plan.deal, "workspaces", true)}

            </div>
          ))}
        </div>

        {/* Repeat the above block for other features like Projects, Employees, etc. */}
        <div className="planfeatures_grid">
          <div className="planfeatures_gridHeaderWrap">
            Projects
            <Tooltip
              title="The amount of active open projects you can have within your account"
              arrow
            >
              <MdInfoOutline className="text-[#c4c4c4] flex overflow-hidden relative" />
            </Tooltip>
          </div>
          {plans.map((plan) => (
            <div
              key={plan.deal}
              className={`planfeatures_gridHeader3 ${getClass(plan.deal)}`}
            >
              {/* {getPlanValue(plan.deal, "projects")} */}
              {getPlanValue(plan.deal, "projects", true)}

            </div>
          ))}
        </div>
        {/* -------------------4-------------------- */}

        <div className="planfeatures_grid">
          <div className="planfeatures_gridHeaderWrap">
            Employees
            <Tooltip title="The amount of employees in your account" arrow>
              <MdInfoOutline className="text-[#c4c4c4] flex overflow-hidden relative" />
            </Tooltip>
          </div>

          {plans.map((plan) => (
            <div
              key={plan.deal}
              className={`planfeatures_gridHeader3 ${getClass(plan.deal)}`}
            >
              {/* {getPlanValue(plan.deal, "employees")} */}
              {getPlanValue(plan.deal, "employees", true)}

            </div>
          ))}
        </div>

        {/* -------------------5-------------------- */}
        <div className="planfeatures_grid">
          <div className="planfeatures_gridHeaderWrap">
            Clients
            <Tooltip title="The amount of clients in your account" arrow>
              <MdInfoOutline className="text-[#c4c4c4] flex overflow-hidden relative" />
            </Tooltip>
          </div>
          {plans.map((plan) => (
            <div
              key={plan.deal}
              className={`planfeatures_gridHeader3 ${getClass(plan.deal)}`}
            >
              {/* {getPlanValue(plan.deal, "clients")} */}
              {getPlanValue(plan.deal, "clients", true)}

            </div>
          ))}
        </div>
        {/* -------------------6-------------------- */}
        <div className="planfeatures_grid">
          <div className="planfeatures_gridHeaderWrap">
            Admins
            <Tooltip
              title="The amount of decision makers in your account"
              arrow
            >
              <MdInfoOutline className="text-[#c4c4c4] flex overflow-hidden relative" />
            </Tooltip>
          </div>
          {plans.map((plan) => (
            <div
              key={plan.deal}
              className={`planfeatures_gridHeader3 ${getClass(plan.deal)}`}
            >
              {/* {getPlanValue(plan.deal, "admins")} */}
              {getPlanValue(plan.deal, "admins", true)}
            </div>
          ))}
        </div>
        <div className="planfeatures_grid">
          <div className="planfeatures_gridHeaderWrap">
            Data storage
            <Tooltip
              title="More storage means more space to store images, videos, files or any other type of raw file materials"
              arrow
            >
              <MdInfoOutline className="text-[#c4c4c4] flex overflow-hidden relative" />
            </Tooltip>
          </div>
          {/* {plans.map((plan) => (
            <div
              key={plan.deal}
              className={`planfeatures_gridHeader3 ${getClass(plan.deal)}`}
            >
              {getPlanValue(plan.deal, "storage") === "Ꚙ"
                ? getPlanValue(plan.deal, "storage")
                : getPlanValue(plan.deal, "storage") >= 1000
                ? `${(getPlanValue(plan.deal, "storage") / 1000).toFixed(1)}TB`
                : `${getPlanValue(plan.deal, "storage")}GB`}
               
               
            </div>
          ))} */}
              {plans.map((plan) => (
  <div
    key={plan.deal}
    className={`planfeatures_gridHeader3 ${getClass(plan.deal)}`}
  >
    {getPlanValue(plan.deal, "storage", true) === "Ꚙ"
      ? getPlanValue(plan.deal, "storage", true)
      : getPlanValue(plan.deal, "storage", true) >= 1000
      ? `${(getPlanValue(plan.deal, "storage", true) / 1000).toFixed(1)}TB`
      : `${getPlanValue(plan.deal, "storage", true)}GB`}
  </div>
))}
        </div>
        {/* Repeat similarly for other features (Employees, Clients, Admins, etc.) */}
      </div>

      {/* ====================Remote================== */}
      <div>
        <div className="planfeatures_grid planfeatures_gridBottom">
          <div className="planfeatures_gridHeader">Remote Work</div>
          {plans.map((plan) => (
            <div
              key={plan.deal}
              className={`planfeatures_gridHeader2 ${getClass(plan.deal)}`}
            >
              {plan.deal}
            </div>
          ))}
        </div>

        <div className="planfeatures_grid">
          <div className="planfeatures_gridHeaderWrap">
            Documents
            <Tooltip
              title="Work directly from Teamsleader and collaborate on the type of content you like to produce for your business or clients"
              arrow
            >
              <MdInfoOutline className="text-[#c4c4c4] flex overflow-hidden relative" />
            </Tooltip>
          </div>
          {plans.map((plan) => (
            <div
              key={plan.deal}
              className={`planfeatures_gridHeader3 ${getClass(plan.deal)}`}
            >
              {getPlanValue(plan.deal, "documents")}
            </div>
          ))}
        </div>
        {/* Example for Video Calling feature */}
        <div className="planfeatures_grid">
          <div className="planfeatures_gridHeaderWrap">
            Video Calling
            <Tooltip
              title="Collaborate with your teams or clients, by video calling within Teamsleader, and share your screen if needed."
              arrow
            >
              <MdInfoOutline className="text-[#c4c4c4] flex overflow-hidden relative" />
            </Tooltip>
          </div>
          {/* {plans.map((plan) => (
            <div
              key={plan.deal}
              className={`planfeatures_gridHeader3 ${getClass(plan.deal)}`}
            >
              {getPlanValue(plan.deal, "videoCalling",true)}
            </div>
          ))} */}
    {/* {plans.map((plan) => (
  <div
    key={plan.deal}
    className={`planfeatures_gridHeader3 ${getClass(plan.deal)}`}
  >
    {typeof getPlanValue(plan.deal, "videoCalling", true) === "number"
      ? `${getPlanValue(plan.deal, "videoCalling", true)} hours`
      : getPlanValue(plan.deal, "videoCalling", true)}
  </div>
))} */}
{plans.map((plan) => (
  <div
    key={plan.deal}
    className={`planfeatures_gridHeader3 ${getClass(plan.deal)}`}
  >
    {
      // Get the value from the function
      (() => {
        const value = getPlanValue(plan.deal, "videoCalling", true);

        // Check if the value is a number or a numeric string that doesn't already include "hours"
        if (typeof value === "number" || (typeof value === "string" && /^\d+$/.test(value))) {
          return `${value} hours`;
        }

        // Otherwise, return the value as-is
        return value;
      })()
    }
  </div>
))}

        </div>

        <div className="planfeatures_grid">
          <div className="planfeatures_gridHeaderWrap">
            Calendar Display
            <Tooltip
              title="Look into the calendar to see what the planning is for your team or yourself"
              arrow
            >
              <MdInfoOutline className="text-[#c4c4c4] flex overflow-hidden relative" />
            </Tooltip>
          </div>
          {plans.map((plan) => (
            <div
              key={plan.deal}
              className={`planfeatures_gridHeader3 ${getClass(plan.deal)}`}
            >
              {getPlanValue(plan.deal, "calendarDisplay")}
            </div>
          ))}
        </div>
        <div className="planfeatures_grid">
          <div className="planfeatures_gridHeaderWrap">
            Employee status
            <Tooltip
              title="See whether or not your employees are sick, working from home, taking a break, or simply off work"
              arrow
            >
              <MdInfoOutline className="text-[#c4c4c4] flex overflow-hidden relative" />
            </Tooltip>
          </div>
          {plans.map((plan) => (
            <div
              key={plan.deal}
              className={`planfeatures_gridHeader3 ${getClass(plan.deal)}`}
            >
              {getPlanValue(plan.deal, "employeeStatus")}
            </div>
          ))}
        </div>
        <div className="planfeatures_grid">
          <div className="planfeatures_gridHeaderWrap">
            Time Registration
            <Tooltip
              title="Watch how many hours your employees have been working"
              arrow
            >
              <MdInfoOutline className="text-[#c4c4c4] flex overflow-hidden relative" />
            </Tooltip>
          </div>
          {plans.map((plan) => (
            <div
              key={plan.deal}
              className={`planfeatures_gridHeader3 ${getClass(plan.deal)}`}
            >
              {getPlanValue(plan.deal, "timeRegistration")}
            </div>
          ))}
        </div>
        {/* Repeat for other remote features */}
      </div>

      {/* ====================Advanced================== */}
      <div>
        <div className="planfeatures_grid planfeatures_gridBottom">
          <div className="planfeatures_gridHeader">Advanced</div>
          {plans.map((plan) => (
            <div
              key={plan.deal}
              className={`planfeatures_gridHeader2 ${getClass(plan.deal)}`}
            >
              {plan.deal}
            </div>
          ))}
        </div>

        {/* Example for Guest Access feature */}
        <div className="planfeatures_grid">
          <div className="planfeatures_gridHeaderWrap">
            Guest Access
            <Tooltip
              title="When you work with clients or freelancers outside of your company, you can invite them to join your team, so that they know exactly your workflows, and what you expect from them."
              arrow
            >
              <MdInfoOutline className="text-[#c4c4c4] flex overflow-hidden relative" />
            </Tooltip>
          </div>
          {plans.map((plan) => (
            <div
              key={plan.deal}
              className={`planfeatures_gridHeader3 ${getClass(plan.deal)}`}
            >
              {getPlanValue(plan.deal, "guestAccess")}
            </div>
          ))}
        </div>

        <div className="planfeatures_grid">
          <div className="planfeatures_gridHeaderWrap">
            Kanban Feature
            <Tooltip
              title="Visualize easily your workflows with our kanban"
              arrow
            >
              <MdInfoOutline className="text-[#c4c4c4] flex overflow-hidden relative" />
            </Tooltip>
          </div>
          {plans.map((plan) => (
            <div
              key={plan.deal}
              className={`planfeatures_gridHeader3 ${getClass(plan.deal)}`}
            >
              {getPlanValue(plan.deal, "kanbanFeature")}
            </div>
          ))}
        </div>
        <div className="planfeatures_grid">
          <div className="planfeatures_gridHeaderWrap">
            Chat Feature
            <Tooltip
              title="Communicate, share and collaborate via chat with your team of clients. Or simply have some fun."
              arrow
            >
              <MdInfoOutline className="text-[#c4c4c4] flex overflow-hidden relative" />
            </Tooltip>
          </div>
          {plans.map((plan) => (
            <div
              key={plan.deal}
              className={`planfeatures_gridHeader3 ${getClass(plan.deal)}`}
            >
              {getPlanValue(plan.deal, "chatFeature")}
            </div>
          ))}
        </div>
        <div className="planfeatures_grid">
          <div className="planfeatures_gridHeaderWrap">
            Advanced Search
            <Tooltip
              title="Search for anything within your account. Whether you're looking for a specific file, video, update or a project"
              arrow
            >
              <MdInfoOutline className="text-[#c4c4c4] flex overflow-hidden relative" />
            </Tooltip>
          </div>
          {plans.map((plan) => (
            <div
              key={plan.deal}
              className={`planfeatures_gridHeader3 ${getClass(plan.deal)}`}
            >
              {getPlanValue(plan.deal, "advancedSearch")}
            </div>
          ))}
        </div>

        <div className="planfeatures_grid">
          <div className="planfeatures_gridHeaderWrap">
            Lucid Chart Workflows
            <Tooltip
              title="Outline processes for your team, so that they understand what you expect from them"
              arrow
            >
              <MdInfoOutline className="text-[#c4c4c4] flex overflow-hidden relative" />
            </Tooltip>
          </div>
          {plans.map((plan) => (
            <div
              key={plan.deal}
              className={`planfeatures_gridHeader3 ${getClass(plan.deal)}`}
            >
              {getPlanValue(plan.deal, "lucidChartWorkflows")}
            </div>
          ))}
        </div>
        <div className="planfeatures_grid">
          <div className="planfeatures_gridHeaderWrap">
            Password Saver
            <Tooltip
              title="Store and save all of your passwords within your workflow"
              arrow
            >
              <MdInfoOutline className="text-[#c4c4c4] flex overflow-hidden relative" />
            </Tooltip>
          </div>
          {plans.map((plan) => (
            <div
              key={plan.deal}
              className={`planfeatures_gridHeader3 ${getClass(plan.deal)}`}
            >
              {getPlanValue(plan.deal, "passwordSaver")}
            </div>
          ))}
        </div>
        <div className="planfeatures_grid">
          <div className="planfeatures_gridHeaderWrap">
            Social Media Planner
            <Tooltip
              title="Post and schedule content for your clients or yourself"
              arrow
            >
              <MdInfoOutline className="text-[#c4c4c4] flex overflow-hidden relative" />
            </Tooltip>
          </div>
          {plans.map((plan) => (
            <div
              key={plan.deal}
              className={`planfeatures_gridHeader3 ${getClass(plan.deal)}`}
            >
              {getPlanValue(plan.deal, "socialMediaPlanner")}
            </div>
          ))}
        </div>
        <div className="planfeatures_grid">
          <div className="planfeatures_gridHeaderWrap">
            Invoices
            <Tooltip
              title="Create and send your invoices directly to your clients"
              arrow
            >
              <MdInfoOutline className="text-[#c4c4c4] flex overflow-hidden relative" />
            </Tooltip>
          </div>
          {plans.map((plan) => (
            <div
              key={plan.deal}
              className={`planfeatures_gridHeader3 ${getClass(plan.deal)}`}
            >
              {getPlanValue(plan.deal, "invoices")}
            </div>
          ))}
        </div>
        <div className="planfeatures_grid">
          <div className="planfeatures_gridHeaderWrap">
            Proposals
            <Tooltip
              title="Create and send customized beautiful proposals"
              arrow
            >
              <MdInfoOutline className="text-[#c4c4c4] flex overflow-hidden relative" />
            </Tooltip>
          </div>
          {plans.map((plan) => (
            <div
              key={plan.deal}
              className={`planfeatures_gridHeader3 ${getClass(plan.deal)}`}
            >
              {getPlanValue(plan.deal, "proposals")}
            </div>
          ))}
        </div>

        {/* Repeat for other advanced features */}
      </div>
      {/* ====================Security================== */}
      <div>
        <div className="planfeatures_grid planfeatures_gridBottom">
          <div className="planfeatures_gridHeader">Security</div>
          {plans.map((plan) => (
            <div
              key={plan.deal}
              className={`planfeatures_gridHeader2 ${getClass(plan.deal)}`}
            >
              {plan.deal}
            </div>
          ))}
        </div>
        {/* -------------------2-------------------- */}
        <div className="planfeatures_grid">
          <div className="planfeatures_gridHeaderWrap">
            2 Step Verification
            <Tooltip
              title="Extra protection for you and your team. Every time when someone enters your account from an un-known device, he or she will have to enter a code, to confirm their identity"
              arrow
            >
              <MdInfoOutline className="text-[#c4c4c4] flex overflow-hidden relative" />
            </Tooltip>
          </div>
          {plans.map((plan) => (
            <div
              key={plan.deal}
              className={`planfeatures_gridHeader3 ${getClass(plan.deal)}`}
            >
              {getPlanValue(plan.deal, "twoStepVerification")}
            </div>
          ))}
        </div>
        {/* -------------------3-------------------- */}
        <div className="planfeatures_grid">
          <div className="planfeatures_gridHeaderWrap">
            IP-Limits
            <Tooltip
              title="Collaborate with your teams or clients, by video calling within Teamsleader, and share your screen if needed."
              arrow
            >
              <MdInfoOutline className="text-[#c4c4c4] flex overflow-hidden relative" />
            </Tooltip>
          </div>
          {plans.map((plan) => (
            <div
              key={plan.deal}
              className={`planfeatures_gridHeader3 ${getClass(plan.deal)}`}
            >
              {getPlanValue(plan.deal, "ipLimits")}
            </div>
          ))}
        </div>
        {/* -------------------4-------------------- */}
        <div className="planfeatures_grid">
          <div className="planfeatures_gridHeaderWrap">
            Sessie Management
            <Tooltip
              title="Panic mode: Disable your entire account when the login details of one of your employees have been exposed"
              arrow
            >
              <MdInfoOutline className="text-[#c4c4c4] flex overflow-hidden relative" />
            </Tooltip>
          </div>
          {plans.map((plan) => (
            <div
              key={plan.deal}
              className={`planfeatures_gridHeader3 ${getClass(plan.deal)}`}
            >
              {getPlanValue(plan.deal, "sessionManagement")}
            </div>
          ))}
        </div>
        {/* -------------------5-------------------- */}
        <div className="planfeatures_grid">
          <div className="planfeatures_gridHeaderWrap">
            Specific Roles
            <Tooltip
              title="Allow other admins to create specific roles within your organization, and only give access to certain features to certain people"
              arrow
            >
              <MdInfoOutline className="text-[#c4c4c4] flex overflow-hidden relative" />
            </Tooltip>
          </div>
          {plans.map((plan) => (
            <div
              key={plan.deal}
              className={`planfeatures_gridHeader3 ${getClass(plan.deal)}`}
            >
              {getPlanValue(plan.deal, "specificRoles")}
            </div>
          ))}
        </div>
        {/* -------------------6-------------------- */}
        <div className="planfeatures_grid">
          <div className="planfeatures_gridHeaderWrap">
            Conform HIPAA
            <Tooltip title="Save and store personal health information" arrow>
              <MdInfoOutline className="text-[#c4c4c4] flex overflow-hidden relative" />
            </Tooltip>
          </div>
          {plans.map((plan) => (
            <div
              key={plan.deal}
              className={`planfeatures_gridHeader3 ${getClass(plan.deal)}`}
            >
              {getPlanValue(plan.deal, "confirmHIPAA")}
            </div>
          ))}
        </div>
      </div>
      {/* ====================Support================== */}
      <div>
        <div className="planfeatures_grid planfeatures_gridBottom">
          <div className="planfeatures_gridHeader">Support</div>
          {plans.map((plan) => (
            <div
              key={plan.deal}
              className={`planfeatures_gridHeader2 ${getClass(plan.deal)}`}
            >
              {plan.deal}
            </div>
          ))}
        </div>
        {/* -------------------2-------------------- */}
        <div className="planfeatures_grid">
          <div className="planfeatures_gridHeaderWrap">
            Help Portal
            <Tooltip
              title="Watch tutorials, manuals and articles on how Teamsleader works, and how to master our dashboard"
              arrow
            >
              <MdInfoOutline className="text-[#c4c4c4] flex overflow-hidden relative" />
            </Tooltip>
          </div>
          <div className={`planfeatures_gridHeader3 ${getClass("Freelancer")}`}>
            <span className="checkmark_plansPricing relative">
              <IoCheckmarkSharp />
            </span>
          </div>
          <div className={`planfeatures_gridHeader3 ${getClass("Business")}`}>
            <span className="checkmark_plansPricing relative">
              <IoCheckmarkSharp />
            </span>
          </div>
          <div className={`planfeatures_gridHeader3 ${getClass("Enterprise")}`}>
            <span className="checkmark_plansPricing relative">
              <IoCheckmarkSharp />
            </span>
          </div>
        </div>
        {/* -------------------3-------------------- */}
        <div className="planfeatures_grid">
          <div className="planfeatures_gridHeaderWrap">
            24/7 Support
            <Tooltip
              title="We do our best to assist you 24/7 with our world-class support team"
              arrow
            >
              <MdInfoOutline className="text-[#c4c4c4] flex overflow-hidden relative" />
            </Tooltip>
          </div>
          <div className={`planfeatures_gridHeader3 ${getClass("Freelancer")}`}>
            <span className="checkmark_plansPricing relative">
              <IoCheckmarkSharp />
            </span>
          </div>
          <div className={`planfeatures_gridHeader3 ${getClass("Business")}`}>
            <span className="checkmark_plansPricing relative">
              <IoCheckmarkSharp />
            </span>
          </div>
          <div className={`planfeatures_gridHeader3 ${getClass("Enterprise")}`}>
            <span className="checkmark_plansPricing relative">
              <IoCheckmarkSharp />
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlanFeaturesDescription;
