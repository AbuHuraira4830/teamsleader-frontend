import React, { useState, useEffect } from "react";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
// import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import ChatIcon from "@mui/icons-material/Chat";
import { IoCloseOutline } from "react-icons/io5";
import { MdCheck } from "react-icons/md";
import { ListItemText } from "@mui/material";

import { useStateContext } from "../../../../contexts/ContextProvider";
import { FaLocationDot } from "react-icons/fa6";
import { FaClipboardList } from "react-icons/fa6";

const InvoiceClientList = ({ handleSelectClient }) => {
  const { clientDetails, setClientDetails } = useStateContext();

  const [searchTerm, setSearchTerm] = useState("");
  const [visibleClients, setVisibleClients] = useState(clientDetails);
  const [removingClients, setRemovingClients] = useState({});

  const handleRemoveClient = (clientId) => {
    setRemovingClients((prev) => ({ ...prev, [clientId]: true }));

    setTimeout(() => {
      setClientDetails((currentDetails) =>
        currentDetails.filter((client) => client.id !== clientId)
      );
      setRemovingClients((prev) => {
        const newRemoving = { ...prev };
        delete newRemoving[clientId];
        return newRemoving;
      });
    }, 900);
  };
  useEffect(() => {
    const filteredClients = searchTerm
      ? clientDetails.filter(
          (client) =>
            client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            client.country.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : clientDetails;
    setVisibleClients(filteredClients);
  }, [searchTerm, clientDetails]);

  return (
    <>
      <div className="search-bar">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search clients by name or country"
          className="w-full px-4 py-2 border rounded-md person_searchInput"
        />
      </div>

      <div className="client-list">
        {visibleClients.map((client) => (
          <ListItem
            key={client.id}
            className={`client-item border-b border-gray-300" ${
              removingClients[client.id] ? "client-item-removing" : ""
            }`}
          >
            <ListItemAvatar className="mt-3">
              <Avatar></Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={
                <div className="flex items-center relative pt-3 ">
                  {client.name}
                  <span
                    style={{
                      backgroundColor: "#fffacd",
                      padding: "0.15rem 0.5rem",
                      borderRadius: "6px",
                      color: "rgb(107 77 77)",
                      fontSize: ".65rem",
                      position: "absolute",
                      left: "16%",
                    }}
                  >
                    Client
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
                        {client.country}
                      </span>
                    </div>
                    {client.vatNo && (
                      <>
                        <div className="flex items-center absolute left-[16%]">
                          <FaClipboardList className="text-xs" />
                          <span className="text-xs font-semibold ml-1 mt-[0.1rem]">
                            {" "}
                            {client.vatNo}
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
                  onClick={() => handleSelectClient(client)}
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
                    handleRemoveClient(client.id);
                  }}
                >
                  <IoCloseOutline className="text-[1rem]" />
                </IconButton>
              </Tooltip>
            </div>
          </ListItem>
        ))}
      </div>
    </>
  );
};

export default InvoiceClientList;
