import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import PhoneInput from "react-phone-number-input";

import "react-phone-number-input/style.css"; // Import the default styles
import { useStateContext } from "../../../../../contexts/ContextProvider";
import { postAPI } from "../../../../../helpers/apis";

const PhoneCell = ({ columnID, columnData }) => {
  const {
    selectedWorkspace,
    setSelectedWorkspace,
    selectedTeam,
    setTeamTasks,
  } = useStateContext();

  let cellData = JSON.parse(columnData);
  const [isHovered, setIsHovered] = useState(false);
  const [value, setValue] = useState("");
  const data = JSON.stringify({ data: value });

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission
    handlePhoneNumber(columnID);
  };
  const handlePhoneNumber = (id) => {
    const postData = {
      data,
      workspaceID: selectedWorkspace._id,
    };
    postAPI(`/api/table-cell/update/${id}`, postData)
      .then((res) => {
        setSelectedWorkspace(res.data.workspace);
        const team = res.data.workspace.teams.find(
          (team) => team._id === selectedTeam._id
        );
        setTeamTasks(team);
        // setSelectedCountry(JSON.parse(data));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const clearCell = (id) => {
    setValue("");
    const postData = {
      workspaceID: selectedWorkspace._id,
    };
    postAPI(`/api/table-cell/clear/${id}`, postData)
      .then((res) => {
        setSelectedWorkspace(res.data.workspace);
        // console.log(res.data.workspace);
        const team = res.data.workspace.teams.find(
          (team) => team._id === selectedTeam._id
        );
        setTeamTasks(team);
        // console.log({team});
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div
      className={`w-100 h-100  flex align-items-center justify-content-center ${
        !isHovered ? "margin1px" : "border"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <form onSubmit={handleSubmit}>
        <PhoneInput
          placeholder=""
          value={cellData?.data || value}
          onChange={setValue}
        />
        <button type="submit" style={{ display: "none" }}>
          Submit
        </button>
      </form>
      <span style={{ width: "14px", marginLeft: "3px" }}>
        {cellData?.data && isHovered && (
          <button
            className="px-0 py-0  file_deleteBtn flex  close-icon"
            onClick={() => clearCell(columnID)}
          >
            <RxCross2
              className=""
              style={{
                width: "14px",
                height: "auto",
              }}
            />
          </button>
        )}
      </span>
    </div>
  );
};

export default PhoneCell;

// import React, { useState, useEffect } from "react";
// import { Input, Spin } from "antd";
// import axios from "axios";
// import { parsePhoneNumberFromString } from "libphonenumber-js";

// const PhoneCell = ({ rowId, setRows, rows }) => {
//   const [loading, setLoading] = useState(false);
//   const [selectedCountry, setSelectedCountry] = useState(null);

//   useEffect(() => {
//     const fetchCountries = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get("https://restcountries.com/v3.1/all");
//         const countries = response.data;
//         const defaultCountry = countries.find(
//           (country) => country.name.common === "United States"
//         );
//         setSelectedCountry({
//           ...defaultCountry,
//           flag: fetchFlag(defaultCountry.cca2),
//         });
//       } catch (error) {
//         console.error("Error fetching countries:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCountries();
//   }, []);

//   const fetchFlag = (countryCode) => {
//     try {
//       return `https://flagcdn.com/h120/${countryCode.toLowerCase()}.png`;
//     } catch (error) {
//       console.error("Error fetching flag:", error);
//       return null;
//     }
//   };

//   const handleInputChange = (e) => {
//     const phoneNumber = e.target.value;
//     const parsedNumber = parsePhoneNumberFromString(phoneNumber);

//     if (parsedNumber) {
//       const countryCode = parsedNumber.country;
//       const country = selectedCountry || { cca2: countryCode };
//       setSelectedCountry({ ...country, flag: fetchFlag(countryCode) });
//     } else {
//       setSelectedCountry(null);
//     }

//     setRows((prevRows) =>
//       prevRows.map((row) =>
//         row.id === rowId
//           ? {
//               ...row,
//               phone: { number: phoneNumber, flag: selectedCountry?.flag },
//             }
//           : row
//       )
//     );
//   };

//   return (
//     <div className="flex align-items-center">
//       {selectedCountry && selectedCountry.flag && (
//         <img
//           src={selectedCountry.flag}
//           alt={`${selectedCountry.name.common} Flag`}
//           style={{ height: "20px", width: "25px", marginRight: "5px" }}
//         />
//       )}
//       <Input
//         style={{
//           height: "25px",
//         }}
//         className="rounded-1 py-1 px-0 shadow-none border-0 transparent_bg fs_14"
//         value={rows.find((row) => row.id === rowId)?.phone?.number || ""}
//         onChange={handleInputChange}
//         placeholder=""
//         type="tel"
//       />
//     </div>
//   );
// };

// export default PhoneCell;
