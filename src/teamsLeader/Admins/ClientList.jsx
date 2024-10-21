import React, { useState } from "react";
import List from "@mui/material/List";

import "react-toastify/dist/ReactToastify.css";
import ClientListItem from "./ClientListItem";
const ClientList = () => {
  const clientsData = [
    { id: 6, name: "Eva Williams", email: "evawilliams@gmail.com" },
    { id: 7, name: "Frank Miller", email: "frankmiller@gmail.com" },
    { id: 8, name: "Grace Davis", email: "gracedavis@gmail.com" },
    { id: 9, name: "Harry Wilson", email: "harrywilson@gmail.com" },
    { id: 10, name: "Ivy Robinson", email: "ivyrobinson@gmail.com" },
    { id: 11, name: "Jack Smith", email: "jacksmith@gmail.com" },
    { id: 12, name: "Karen White", email: "karenwhite@gmail.com" },
    { id: 13, name: "Leo Davis", email: "leodavis@gmail.com" },
    { id: 14, name: "Mia Johnson", email: "miajohnson@gmail.com" },
    { id: 15, name: "Nathan Brown", email: "nathanbrown@gmail.com" },
    { id: 16, name: "Olivia Miller", email: "oliviamiller@gmail.com" },
    { id: 17, name: "Peter Wilson", email: "peterwilson@gmail.com" },
    { id: 18, name: "Quinn Robinson", email: "quinnrobinson@gmail.com" },
    { id: 19, name: "Ryan Taylor", email: "ryantaylor@gmail.com" },
    { id: 20, name: "Sara Smith", email: "sarasmith@gmail.com" },
  ];

  const [searchQuery, setSearchQuery] = useState("");

  const [clients, setClients] = useState(
    clientsData.map((client) => ({
      ...client,
      showPendingInvitation: false,
    }))
  );

  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRemoveClient = (id) => {
    setClients((prevClients) =>
      prevClients.filter((client) => client.id !== id)
    );
  };

  return (
    <>
      <div className="my-2" style={{ overflowX: "auto", maxHeight: "400px" }}>
        <div className="addPersonSearch flex items-center w-full">
          <input
            type="text"
            placeholder="Search clients by name or email"
            className={`person_searchInput py-[0.4rem] px-2.5`}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <List>
          {filteredClients.map((client) => (
            <ClientListItem
              key={client.id}
              client={client}
              onRemoveClient={handleRemoveClient}
            />
          ))}
        </List>
      </div>
    </>
  );
};

export default ClientList;
