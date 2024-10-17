import React, { useState, useEffect } from "react";
import {
  Avatar,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import EnhancedTableHead from "./EnhancedTableHead";
import { useStateContext } from "../../contexts/ContextProvider";
import { useNavigate } from "react-router-dom";

const TeamsTable = ({ searchTerm }) => {
  const navigate = useNavigate();

  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");
  const { teamsTableRow, setTeamsTableRow } = useStateContext();

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
    const sortedRows = stableSort(
      teamsTableRow,
      getComparator(order, property)
    );
    setTeamsTableRow(sortedRows);
  };
  const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  };

  const stableSort = (array, comparator) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  };

  const getFilteredRows = (data, filter) => {
    return data.filter(
      (row) =>
        row.name.toLowerCase().includes(filter.toLowerCase()) ||
        row.email.toLowerCase().includes(filter.toLowerCase()) ||
        row.title.toLowerCase().includes(filter.toLowerCase()) ||
        row.teams.toLowerCase().includes(filter.toLowerCase())
    );
  };
  const filteredRows = getFilteredRows(teamsTableRow, searchTerm);

  const generateAvatarProps = (name) => {
    const colors = [
      "#f44336",
      "#e91e63",
      "#9c27b0",
      "#673ab7",
      "#3f51b5",
      "#2196f3",
      "#03a9f4",
      "#00bcd4",
      "#009688",
      "#4caf50",
      "#8bc34a",
      "#cddc39",
      "#ffeb3b",
      "#ffc107",
      "#ff9800",
      "#ff5722",
      "#795548",
      "#9e9e9e",
      "#607d8b",
    ];
    const initials = name
      .split(" ")
      .map((n) => n.charAt(0))
      .join("")
      .toUpperCase();
    const colorIndex = initials.charCodeAt(0) % colors.length; // Use char code to select a color
    const backgroundColor = colors[colorIndex];
    const textColor = "#ffffff"; // You can adjust this based on your background color for better contrast
    return { initials, backgroundColor, textColor };
  };

  const handleAvatarClick = (user) => {
    const avatarProps = generateAvatarProps(user.name);
    navigate(`/manage-teams/user`, { state: { user, avatarProps } });
  };

  return (
    <TableContainer component={Paper} sx={{ borderRadius: "12px" }}>
      <Table stickyHeader aria-label="sticky table" sx={{ minWidth: 650 }}>
        <EnhancedTableHead
          order={order}
          orderBy={orderBy}
          onRequestSort={handleRequestSort}
        />
        <TableBody>
          {filteredRows.map((row, index) => {
            const avatarProps = generateAvatarProps(row.name);
            return (
              <TableRow key={index} hover>
                <TableCell component="th" scope="row">
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Avatar
                      sx={{
                        bgcolor: avatarProps.backgroundColor,
                        color: avatarProps.textColor,
                        marginRight: "10px",
                      }}
                      className="cursor-pointer"
                      onClick={() => handleAvatarClick(row)}
                    >
                      {avatarProps.initials}
                    </Avatar>
                    {row.name}
                  </div>
                </TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.title}</TableCell>
                <TableCell>{row.teams}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TeamsTable;
