import React, { useState, useEffect } from "react";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import ChatIcon from "@mui/icons-material/Chat";
import { IoCloseOutline } from "react-icons/io5";
import { MdCheck } from "react-icons/md";

import { useStateContext } from "../../../../contexts/ContextProvider";
import { FaLocationDot } from "react-icons/fa6";
import { FaClipboardList } from "react-icons/fa6";

const PersonalDetailsList = ({ handleSelectPersonal }) => {
  // const InvoiceClientList = () => {
  const { personalDetails, setPersonalDetails } = useStateContext();

  const [searchTerm, setSearchTerm] = useState("");
  const [visiblePersons, setVisiblePersons] = useState(personalDetails);
  const [removingClients, setRemovingClients] = useState({});

  const handleRemovePerson = (personId) => {
    // Mark the client as being removed
    setRemovingClients((prev) => ({ ...prev, [personId]: true }));

    setTimeout(() => {
      setPersonalDetails((currentDetails) =>
        currentDetails.filter((person) => person.id !== personId)
      );
      setRemovingClients((prev) => {
        const newRemoving = { ...prev };
        delete newRemoving[personId];
        return newRemoving;
      });
    }, 900);
  };
  useEffect(() => {
    const filteredPersons = searchTerm
      ? personalDetails.filter(
          (person) =>
            person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            person.country.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : personalDetails;
    setVisiblePersons(filteredPersons);
  }, [searchTerm, personalDetails]);

  return (
    <>
      <div className="search-bar">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search persons by name or country"
          className="w-full px-4 py-2 border rounded-md person_searchInput"
        />
      </div>

      <div className="client-list">
        {visiblePersons.map((person) => (
          <ListItem
            key={person.id}
            className={`client-item border-b border-gray-300" ${
              removingClients[person.id] ? "client-item-removing" : ""
            }`}
          >
            <ListItemAvatar className="mt-3">
              <Avatar></Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={
                <div className="flex items-center relative pt-3 ">
                  {person.name}
                  <span
                    style={{
                      backgroundColor: "#e2f0e7",
                      padding: "0.15rem 0.5rem",
                      borderRadius: "6px",
                      color: "rgb(107 77 77)",
                      fontSize: ".65rem",
                      position: "absolute",
                      left: "16%",
                    }}
                  >
                    Person
                  </span>
                </div>
              }
              secondary={
                <>
                  <div className="flex items-center relative pt-2">
                    <div className="flex items-center">
                      <FaLocationDot className="text-xs" />
                      <span className="text-xs font-semibold  ml-1">
                        {" "}
                        {person.country}
                      </span>
                    </div>
                    {person.vatNo && (
                      <>
                        <div className="flex items-center absolute left-[16%]">
                          <FaClipboardList className="text-xs" />
                          <span className="text-xs font-semibold ml-1 mt-[0.1rem]">
                            {person.vatNo}
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                </>
              }
            />

            <div className="flex items-center space-x-2 mt-4">
              <Tooltip title="Chat" placement="top">
                <IconButton aria-label="chat">
                  <ChatIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Add" placement="top">
                <IconButton
                  onClick={() => handleSelectPersonal(person)}
                  aria-label="select"
                >
                  <MdCheck className="text-green-500 text-[1rem]" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Remove" placement="top">
                <IconButton
                  aria-label="more options"
                  onClick={(event) => {
                    event.stopPropagation();
                    handleRemovePerson(person.id);
                  }}
                >
                  <IoCloseOutline className="text-[1rem]" />
                </IconButton>
              </Tooltip>
            </div>

            {/* =================Transtions================== */}
          </ListItem>
        ))}
      </div>
    </>
  );
};

export default PersonalDetailsList;
