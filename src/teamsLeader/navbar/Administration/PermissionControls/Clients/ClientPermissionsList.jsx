import React, { useState, useEffect } from "react";
import { Table, Checkbox } from "antd";
import { RxMagnifyingGlass } from "react-icons/rx";
import { useStateContext } from "../../../../../contexts/UsersContext";

const ClientPermissionsList = ({ onUserSelect }) => {
  const { clients } = useStateContext();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  useEffect(() => {
    onUserSelect(selectedRowKeys.length > 0);
  }, [selectedRowKeys, onUserSelect]);

  const columns = [
    {
      title: "",
      dataIndex: "checkbox",
      render: (_, record) => (
        <Checkbox
          checked={selectedRowKeys.includes(record.key)}
          onChange={() => {
            const isSelected = selectedRowKeys.includes(record.key);
            const newSelectedRowKeys = isSelected
              ? selectedRowKeys.filter((k) => k !== record.key)
              : [...selectedRowKeys, record.key];
            setSelectedRowKeys(newSelectedRowKeys);
          }}
          className="ant-checkbox"
        />
      ),
      width: 30,
      align: "center", // Center-align checkbox column
    },
    {
      title: "Name",
      dataIndex: "name",
      render: (text) => (
        <div className="table-row-content flex justify-center items-center text-nowrap">
          {text}
        </div>
      ),
      align: "center", // Center-align name column
    },
    {
      title: "Role",
      dataIndex: "role",
      align: "center", // Center-align role column
    },
    {
      title: "Email",
      dataIndex: "email",
      align: "center", // Center-align email column
    },
  ];

  return (
    <div className="">
      <div className="admin_searchInput flex items-center w-full mb-4">
        <input
          type="text"
          placeholder="Search clients by name or email"
          className="searchInput py-[0.4rem] px-2.5 flex-grow border-none"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ outline: "none" }}
        />
        <RxMagnifyingGlass className="text-base text-[#c3c6d4] mx-2" />
      </div>

      <Table
        dataSource={filteredClients}
        columns={columns}
        pagination={false}
        rowSelection={{
          selectedRowKeys,
          onChange: onSelectChange,
          hideSelectAll: true, // Hide the "Select All" checkbox
          renderCell: () => null, // Disable default checkbox rendering
        }}
        rowClassName="hover-row" // Add this class to each row
      />
    </div>
  );
};

export default ClientPermissionsList;
