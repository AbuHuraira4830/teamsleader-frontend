import React, { useState } from "react";
import "../../../assets/css/Login.css";
import { useForm, Controller } from "react-hook-form";
import { Button, Form } from "react-bootstrap";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";
import IMAGES from "../../../assets/images/Images";
import { useStateContext } from "../../../contexts/ContextProvider";
import Header from "../Login/registrationHeader";

const Signup5 = ({ setActiveView }) => {
  const { managingOption,setSignupData } = useStateContext();
  const [option, setOption] = useState(null);
  const options = [
    {
      title: "Legal",
      name: [
        "Requests and approvals",
        "Resource management",
        "Goals and strategy",
        "Portfolio management",
        "Procurement",
        "CRM",
        "Task management",
        "Client projects",
        "Project management",
        "Legal requests",
        "Other",
      ],
    },
    {
      title: "Finance",
      name: [
        "Budget management",
        "Requests and approvals",
        "Task management",
        "Goals and strategy",
        "Billing and invoicing",
        "CRM",
        "Project management",
        "Accounting",
        "Portfolio management",
        "Resource management",
        "Client projects",
        "Forecast planning and Analytics",
        "Business operations",
        "Other",
      ],
    },
    {
      title: "Software development",
      name: [
        "Kanban",
        "Project management",
        "Sprint management",
        "Roadmap planning",
        "Bugs tracking",
        "Task management",
        "Other",
      ],
    },
    {
      title: "Design and Creative",
      name: [
        "Content calendar",

        "CRM",

        "Resource management",

        "Goals and strategy",

        "Project management",

        "Client projects",

        "Product launches",

        "Requests and approvals",

        "Media production",

        "Creative requests",

        "Creative planning",

        "Task management",

        "Portfolio management",

        "Other",
      ],
    },
    {
      title: "Product management",
      name: [
        "Project management",

        "Task management",

        "Features backlog",

        "Release plan",

        "Roadmap planning",

        "Other",
      ],
    },
    {
      title: "HR and Recruiting",
      name: [
        "Company events",

        "Recruiting and talent acquisition",

        "Recruitment pipeline",

        "HR requests",

        "Employee directory",

        "Goals and strategy",

        "CRM",

        "Requests and approvals",

        "Employee onboarding",

        "Portfolio management",

        "HR services",

        "Task management",

        "Onboarding and Offboarding",

        "Employee experience",

        "Project management",

        "Business operations",

        "Resource management",

        "Other",
      ],
    },
    {
      title: "Construction",
      name: [
        "Project management",
        "Portfolio management",
        "CRM",
        "Construction scheduling",
        "Construction planning",
        "Resource management",
        "Requests and approvals",
        "Task management",
        "Goals and strategy",
        "Client projects",
        "Other",
      ],
    },
    {
      title: "Sales and CRM",
      name: [
        "Lead management",
        "Quotes and invoices",
        "Leads capturing",
        "Marketing activities",
        "Project management",
        "Sales pipeline",
        "Task management",
        "Contact management",
        "Other",
      ],
    },
    {
      title: "IT",
      name: [
        "IT Service desk",
        "Resource management",
        "Goals and strategy",
        "Portfolio management",
        "Project management",
        "Knowledge base",
        "CRM",
        "Tickets and Requests",
        "Task management",
        "Other",
      ],
    },
    {
      title: "PMO",
      name: [
        "Project management",
        "Goals and strategy",
        "Task management",
        "Requests and approvals",
        "Portfolio management",
        "Client projects",
        "CRM",
        "Project planning",
        "Customer projects",
        "Resource management",
        "Other",
      ],
    },
    {
      title: "Nonprofits",
      name: [
        "Business operations",
        "CRM",
        "Client projects",
        "Fundraising CRM",
        "Volunteers registration management",
        "Event management",
        "Task management",
        "Grants management",
        "Requests and approvals",
        "Project management",
        "Portfolio management",
        "Goals and strategy",
        "Resource management",
        "Other",
      ],
    },
    {
      title: "Marketing",
      name: [
        "Event management",
        "Goals and strategy",
        "Social media",
        "CRM",
        "Task management",
        "Marketing operations",
        "Media production",
        "Project management",
        "Resource management",
        "Campaign tracking",
        "Strategic planning",
        "Portfolio management",
        "Content calendars",
        "Email marketing",
        "Requests and approvals",
        "Creative",
        "Other",
      ],
    },
    {
      title: "Education",
      name: [
        "Curriculum and Syllabus management",
        "Project management",
        "Business operations",
        "Resource management",
        "Individual work",
        "Academic research",
        "Group assignments",
        "Goals and strategy",
        "Task management",
        "Requests and approvals",
        "Portfolio management",
        "Student organizations",
        "Administrative work",
        "CRM",
        "Other",
      ],
    },
    {
      title: "Operations",
      name: [
        "Business operations",
        "Portfolio management",
        "Remote work",
        "Event management",
        "Resource management",
        "Task management",
        "CRM",
        "Marketing operations",
        "Requests and approvals",
        "Goals and strategy",
        "Operations processes",
        "Project management",
        "Other",
      ],
    },
    {
      title: "Other",
      name: [
        "Business operations",
        "Portfolio management",
        "Remote work",
        "Event management",
        "Resource management",
        "Task management",
        "CRM",
        "Marketing operations",
        "Requests and approvals",
        "Goals and strategy",
        "Operations processes",
        "Project management",
        "Other",
      ],
    },
  ];
  const handleRoleClick = (item) => {

    setOption(item);
    const radio = document.getElementById(item);
    if (radio) {
      setSignupData((prevData) => ({
        ...prevData,
        firstFocus: item,
      }));
      radio.click();
    }
  };

  return (
    <div className="signup_form w-100">
      <Header />

      <div className="mx-auto " style={{ width: "610px" }}>
        <div>
          <p
            className="mb-0 text-center"
            style={{ fontSize: "30px", marginTop: "24px" }}
          >
            Select you would like to focus on first?
          </p>
          <p className="email_label mb-4 text-center">
            Help us tailor the best experience for you.
          </p>
        </div>

        <div className="flex justify-content-center pt-3 gray_text flex-wrap">
          {options.map(
            (category, index) =>
              managingOption === category.title &&
              category.name.map((item) => (
                <span
                  key={index}
                  className="mb-3 me-3 border  rounded-pill fs_14 cursor_pointer select_check"
                  onClick={() => handleRoleClick(item)}
                >
                  <Form.Check
                    className="cursor_pointer text-nowrap"
                    type="radio"
                    aria-label="radio 1"
                    label={item}
                    name="role"
                    id={item}
                    style={{ padding: "8px 20px 8px 44px" }}
                  />
                </span>
              ))
          )}
        </div>
        <div className="flex justify-content-evenly mt-4 mb-5">
          <Button
            className="workspace-dropdown-button border align-items-center d-flex fw-normal    py-1  px-3 "
            style={{
              height: "40px",
            }}
            onClick={() => setActiveView("view4")}
          >
            <MdChevronLeft className="me-2 fs-5" />
            Back
          </Button>
          <Button
            onClick={() => setActiveView("view6")}
            type="submit"
            className="rounded-1 d-flex  justify-content-end  align-items-center green_btn border-0"
            style={{ width: "126px" }}
          >
            Continue <MdChevronRight className="ms-2 fs-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Signup5;
