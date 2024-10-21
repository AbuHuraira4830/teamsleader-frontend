import React, { useState, useEffect } from "react";
import { Input, Popover, Spin } from "antd";
import axios from "axios";
import { RxCross2 } from "react-icons/rx";
import { Form } from "react-bootstrap";
import { postAPI } from "../../../../../helpers/apis";
import { useStateContext } from "../../../../../contexts/ContextProvider";

const CountrySearch = ({ columnID, columnData }) => {
  const {
    selectedWorkspace,
    setSelectedWorkspace,
    selectedTeam,
    setTeamTasks,
  } = useStateContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Fetch countries from an API
    const fetchCountries = async () => {
      try {
        setLoading(true);
        const response = await axios.get("https://restcountries.com/v3.1/all");
        setCountries(response.data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  const filteredCountries = countries
    .filter((country) =>
      country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => a.name.common.localeCompare(b.name.common));

  const handleCountryClick = (id, country) => {
    const flag = `https://flagcdn.com/h120/${country.cca2.toLowerCase()}.png`;
    const data = JSON.stringify({ name: country.name.common, flag: flag });
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
      })
      .catch((err) => {
        console.log(err);
      });
    setOpen(false);
  };
  console.log(selectedWorkspace);
  const clearCell = (id) => {
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
        setSelectedCountry(null);
        // console.log({team});
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log(selectedCountry);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    setSelectedCountry(null); // Clear the selected country when input changes
  };

  const content = (
    <div>
      {loading ? (
        <Spin size="small" />
      ) : (
        <ul
          style={{
            listStyle: "none",
            maxHeight: "185px",
            overflow: "hidden",
            cursor: "pointer",
            width: "180px",
            textAlign: "center",
            padding: "0",
            margin: "0",
          }}
        >
          {filteredCountries.map((country) => (
            <li
              key={country.cca2}
              className="border-bottom py-1 centerIt ps-3" // Added flexbox for alignment
              onClick={() => handleCountryClick(columnID, country)}
              style={{ cursor: "pointer" }}
            >
              <img
                src={`https://flagcdn.com/w20/${country.cca2.toLowerCase()}.png`} // Using smaller width flags for list items
                alt={`${country.name.common} Flag`}
                style={{ marginRight: "10px", width: "20px", height: "15px" }} // Adjust size as needed
              />
              {country.name.common}
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  const handleOpenChange = (newOpen, id) => {
    setOpen({ ...open, [id]: newOpen });
  };
  let cellData = JSON.parse(columnData);
  console.log(cellData?.name.name);

  return (
    <Popover
      content={content}
      trigger="click"
      placement="bottom"
      open={open[columnID]}
      onOpenChange={(newOpen) => handleOpenChange(newOpen, columnID)}
    >
      <div
        className={`w-100 h-100  flex  justify-content-center ${
          !isHovered ? "margin1px" : "border"
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <span
          style={{ height: "25px", width: "100%" }}
          className=" flex align-items-center justify-content-center ps-2"
        >
          {cellData?.flag && (
            <img
              src={cellData?.flag}
              alt={`${cellData?.name} Flag`}
              style={{ height: "20px", width: "25px", marginRight: "5px" }}
            />
          )}
          <Form.Control
            style={{
              width: "75px",
              height: "25px",
            }}
            className="rounded-1 py-1 px-0 shadow-none border-0 transparent_bg fs_14"
            value={cellData?.name || searchTerm}
            onChange={handleInputChange}
            placeholder=""
            type="text"
          />
          <span style={{ width: "14px", marginLeft: "3px" }}>
            {cellData && isHovered && (
              <button
                className="px-0 py-0  file_deleteBtn flex  close-icon"
                onClick={(event) => {
                  event.stopPropagation();
                  clearCell(columnID);
                }}
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
        </span>
      </div>
    </Popover>
  );
};

export default CountrySearch;
