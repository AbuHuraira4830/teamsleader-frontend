import React, { useState } from "react";
import { Popover } from "antd";
import { Button, Form } from "react-bootstrap";
import { RxAvatar, RxMagnifyingGlass } from "react-icons/rx";
import { IoMdPersonAdd } from "react-icons/io";
import { IoPersonAddOutline } from "react-icons/io5";
import { AiOutlinePlus } from "react-icons/ai";
import { v4 as uuidv4 } from "uuid";

const PeopleCell = ({ rowId, setRows, rows }) => {
  const [invite, setInvite] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [peoples, setPeoples] = useState([
    { text: "UH", color: "#ff642a", email: "usman123@gmail.com", id: uuidv4() },
    { text: "HA", color: "#11DD80", email: "hamid456@gmail.com", id: uuidv4() },
    {
      text: "JD",
      color: "#AF53E7",
      email: "johndoe789@gmail.com",
      id: uuidv4(),
    },
  ]);
  // const [selectedPeople, setSelectedPeople] = useState(null);
  const [open, setOpen] = useState(false);
  const handleOpenChange = (newOpen) => {
    setOpen({ ...open, [rowId]: newOpen });
  };
  const handlePeopleSelect = (people) => {
    // setSelectedPeople(people);
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === rowId
          ? {
              ...row,
              people: Array.isArray(row.people)
                ? [
                    ...row.people,
                    {
                      text: people.text,
                      email: people.email,
                      color: people.color,
                      id: people.id,
                    },
                  ]
                : [
                    {
                      text: people.text,
                      email: people.email,
                      color: people.color,
                      id: people.id,
                    },
                  ],
            }
          : row
      )
    );
    console.log(rows);

    setOpen(false);
  };
  const deletepeople = (personId) => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === rowId
          ? {
              ...row,
              people: row.people.filter((person) => person.id !== personId),
            }
          : row
      )
    );
  };
  const existingPeopleIds = rows?.filter((row) => row.id === rowId)
    .flatMap((row) => row?.people?.map((person) => person.id) || []);

  const nonExistingPeople = peoples?.filter(
    (people) => !existingPeopleIds?.includes(people.id)
  );
  return (
    <Popover
      content={
        <div style={{ width: "360px" }} className="px-3 py-4">
          {rows?.map((row) => (
            <div key={row.id}>
              {row.id === rowId &&
                row?.people?.map((person) => (
                  <div
                    className="flex rounded-pill mb-1  align-items-center"
                    style={{
                      backgroundColor: "#E5F4FF",
                      maxWidth: "fit-content",
                      padding: "2px",
                    }}
                  >
                    <span
                      key={person.id}
                      className="flex align-items-center justify-content-center rounded-circle  text-white me-2"
                      style={{
                        width: "22px",
                        height: "22px",
                        fontSize: "12px",
                        backgroundColor: person.color,
                      }}
                    >
                      {person.text}
                    </span>
                    <span className="fs_14" style={{ fontSize: "12px" }}>
                      {person.email}
                    </span>
                    <span
                      className="cursor_pointer cross_btn rounded-circle ms-1"
                      onClick={() => deletepeople(person.id)}
                    >
                      x
                    </span>
                  </div>
                ))}
            </div>
          ))}

          {invite ? (
            <>
              <p>Type in email address to invite</p>
              <Form.Control
                className="rounded-1 py-1 shadow-none workspace_searchInput  transparent_bg h-100 w-100"
                type="text"
                placeholder="Enter email"
              />

              <div className="flex justify-content-end mt-3">
                <Button
                  className="workspace-dropdown-button position-relative fw-normal align-self-center me-2 mb-2 text-start py-1 fs_14 px-3 "
                  style={{
                    height: "35px",
                  }}
                  onClick={() => setInvite(false)}
                >
                  cancel
                </Button>
                <Button
                  className=" position-relative fw-normal align-self-center mb-2 text-start py-1 fs_14 px-3 "
                  style={{
                    height: "35px",
                    backgroundColor: "#0073EA",
                  }}
                >
                  Invite new member
                </Button>
              </div>
            </>
          ) : (
            <>
              <span className="flex position-relative align-items-center mb-2">
                <Form.Control
                  className="rounded-1 py-1 shadow-none workspace_searchInput  transparent_bg h-100 w-100"
                  type="text"
                  placeholder="Search names,roles or teams"
                />
                <RxMagnifyingGlass className="fs-5 position-absolute end-0" />
              </span>
              <p className="fs_15"> Suggested people</p>

              {nonExistingPeople.map((people) => (
                <div
                  key={people.id}
                  className="workspace-dropdown-button cursor_pointer flex align-items-center fw-normal  mb-2  py-1 fs_14 px-3 "
                  style={{
                    height: "40px",
                  }}
                  onClick={() => handlePeopleSelect(people)}
                >
                  <span
                    className=" flex align-items-center justify-content-center  rounded-circle fs_14 text-white me-2"
                    style={{
                      width: "26px",
                      height: "26px",
                      backgroundColor: people.color,
                    }}
                  >
                    {people.text}
                  </span>
                  {people.email}
                </div>
              ))}
              <Button
                className="workspace-dropdown-button position-relative fw-normal align-self-center  text-start py-1 fs_14 px-3 "
                style={{
                  height: "40px",
                }}
                onClick={() => setInvite(true)}
              >
                <IoPersonAddOutline className=" me-2 fs-5" />
                Invite a new member by email
              </Button>
            </>
          )}
        </div>
      }
      trigger="click"
      open={open[rowId]}
      onOpenChange={(newOpen) => handleOpenChange(newOpen, rowId)}
      placement="bottom"
    >
      <div
        className="w-100 h-100 flex align-items-center justify-content-center pe-3"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <span
          className="flex align-items-center "
          style={{
            width: "14px",
          }}
        >
          {isHovered && (
            <button
              className="px-0 py-0  file_deleteBtn file_addBtn  "
              //   onClick={handleFileAddClick}
              style={{}}
            >
              <AiOutlinePlus
                className="mb-1"
                style={{
                  width: "14px",
                  height: "auto",
                }}
              />
            </button>
          )}
        </span>

        {rows?.map((row) =>
          row.id === rowId && row?.people?.length > 0 ? (
            <div key={row.id} className="flex ms-1 ">
              {row?.people?.map((person) => (
                <span
                  key={person.id}
                  className="flex align-items-center justify-content-center rounded-circle fs_14 text-white me-n1"
                  style={{
                    width: "26px",
                    height: "26px",
                    backgroundColor: person.color,
                  }}
                >
                  {person.text}
                </span>
              ))}
            </div>
          ) : null
        )}
        {rows?.map(
          (row) =>
            row.id === rowId &&
            !row?.people?.length && (
              <div key={row.id} className="ms-1">
                <RxAvatar className="align-bottom" />
              </div>
            )
        )}
      </div>
    </Popover>
  );
};

export default PeopleCell;
