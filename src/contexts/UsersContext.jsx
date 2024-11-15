import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const StateContext = createContext();

export const UsersContext = ({ children }) => {
  const [employees, setEmployees] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [clients, setClients] = useState([]);

  useEffect(() => {
    // Fetch data from API
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/workspace/team-members");
        console.log("admins,employees,clients data",response.data);
        
        const { admins, employees, clients } = response.data;
        setAdmins(admins);
        setEmployees(employees);
        setClients(clients);
      } catch (error) {
        console.error("Error fetching team members:", error);
      }
    };

    fetchData();
  }, []);

  const moveToAdmins = (key, permissions) => {
    const employee = employees.find((emp) => emp.key === key);
    if (employee) {
      const updatedEmployee = {
        ...employee,
        role: "Admin",
        permissions,
      };
      setEmployees((prev) => prev.filter((emp) => emp.key !== key));
      setAdmins((prev) => [...prev, updatedEmployee]);
    }
  };

  const moveToEmployees = (key) => {
    const admin = admins.find((adm) => adm.key === key);
    if (admin) {
      setAdmins((prev) => prev.filter((adm) => adm.key !== key));
      setEmployees((prev) => [...prev, admin]);
    }
  };

  const deleteEmployee = (key) => {
    setEmployees((prev) => prev.filter((emp) => emp.key !== key));
  };

  const deleteAdmin = async (email, teamId) => {
    try {
      // Make an API call to remove the admin role from the server
      const response = await axios.post("/api/remove-admin-role", {
        email,
        teamId,
      });

      if (response.data.success) {
        // If the API call is successful, update the state
        setAdmins((prev) => prev.filter((adm) => adm.email !== email));
      } else {
        console.error("Failed to remove admin role:", response.data.message);
      }
    } catch (error) {
      console.error("Error removing admin role:", error);
    }
  };

  return (
    <StateContext.Provider
      value={{
        employees,
        admins,
        moveToAdmins,
        moveToEmployees,
        setEmployees,
        setAdmins,
        deleteEmployee,
        deleteAdmin,
        setClients,
        clients,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
