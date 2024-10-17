import React, { useState } from "react";
import List from "@mui/material/List";
import { RxMagnifyingGlass } from "react-icons/rx";
import "react-toastify/dist/ReactToastify.css";
import EmployeeListItem from "./EmployeeListItem"; // Import the existing EmployeeListItem component

const EmployeeList = () => {
  const employeesData = [
    { id: 1, name: "John Doe", email: "johndoe321@gmail.com" },
    { id: 2, name: "Jane Doe", email: "janedoe8989@gmail.com" },
    { id: 3, name: "Bob Smith", email: "smithbob145@gmail.com" },
    { id: 4, name: "Alice Johnson", email: "alicejohnson@gmail.com" },
    { id: 5, name: "Charlie Brown", email: "charliebrown@gmail.com" },
    { id: 6, name: "Eva Williams", email: "evawilliams@gmail.com" },
    { id: 7, name: "Frank Miller", email: "frankmiller@gmail.com" },
    { id: 8, name: "Grace Davis", email: "gracedavis@gmail.com" },
    { id: 9, name: "Harry Wilson", email: "harrywilson@gmail.com" },
    { id: 10, name: "Ivy Robinson", email: "ivyrobinson@gmail.com" },
  ];

  const [searchQuery, setSearchQuery] = useState("");

  const [employees, setEmployees] = useState(
    employeesData.map((employee) => ({
      ...employee,
      showPendingInvitation: false,
    }))
  );

  const filteredEmployees = employees.filter(
    (employee) =>
      employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCrownClick = (id) => {
    setEmployees((prevEmployees) =>
      prevEmployees.map((employee) =>
        employee.id === id
          ? {
              ...employee,
              showPendingInvitation: !employee.showPendingInvitation,
            }
          : employee
      )
    );
  };

  const handleRemoveEmployee = (id) => {
    setEmployees((prevEmployees) =>
      prevEmployees.filter((employee) => employee.id !== id)
    );
  };
  const handleResendInvitation = (employee) => {
    console.log(`Resending invitation for ${employee.name}`);
  };

  return (
    <>
      <div className="my-2" style={{ overflowX: "auto", maxHeight: "400px" }}>
        <div className="addPersonSearch flex items-center w-full">
          <input
            type="text"
            placeholder="Search employees by name or email"
            className={`person_searchInput py-[0.4rem] px-2.5`}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <RxMagnifyingGlass className="text-base text-[#c3c6d4] absolute right-12" />
        </div>
        <List>
          {filteredEmployees.map((employee) => (
            <EmployeeListItem
              key={employee.id}
              employee={employee}
              onResendInvitation={() => handleResendInvitation(employee)}
              onCrownClick={() => handleCrownClick(employee.id)}
              onRemoveEmployee={() => handleRemoveEmployee(employee.id)}
            />
          ))}
        </List>
      </div>
    </>
  );
};

export default EmployeeList;
