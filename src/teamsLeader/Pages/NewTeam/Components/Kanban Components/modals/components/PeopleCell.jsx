import React, { useEffect, useState } from "react";
import { Popover } from "antd";
import { Button, Form } from "react-bootstrap";
import { RxAvatar, RxMagnifyingGlass } from "react-icons/rx";
import { IoMdPersonAdd } from "react-icons/io";
import { IoPersonAddOutline } from "react-icons/io5";
import { AiOutlinePlus } from "react-icons/ai";
import { v4 as uuidv4 } from "uuid";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useKanbanContext } from "../../../../../../../contexts/KanbanContext";

const PeopleCell = ({ rowId, setRows, rows, usedFor }) => {
  const [invite, setInvite] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [peoples, setPeoples] = useState([
    { text: "UH", color: "#ff642a", email: "usman123@gmail.com", id: "111" },
    { text: "HA", color: "#11DD80", email: "hamid456@gmail.com", id: "222" },
    {
      text: "JD",
      color: "#AF53E7",
      email: "johndoe789@gmail.com",
      id: "333",
    },
  ]);
  // const [selectedPeople, setSelectedPeople] = useState(null);
  const [open, setOpen] = useState(false);
  const { data, setData, openTaskId, setIsEditData, isEditData } =
    useKanbanContext();


      const [singleTask, setSingleTask] = useState(null);

      useEffect(() => {
        const findTask = (taskId, columns, tasks) => {
          for (const columnId of Object.keys(columns)) {
            const column = columns[columnId];
            if (column.taskIds.includes(taskId)) {
              setSingleTask(tasks[taskId]);
              return;
            }
          }
        };

        if (openTaskId && data.tasks && data.columns) {
          findTask(openTaskId, data.columns, data.tasks);
        }
      }, [openTaskId, data.tasks, data.columns]);
  const handleOpenChange = (newOpen) => {
    setOpen({ ...open, [rowId]: newOpen });
  };
  const handlePeopleSelect = (people) => {
    // setSelectedPeople(people);
    if (usedFor === "kanban") {
      const updatedData = {
        ...data,
        tasks: {
          ...data.tasks,
          [singleTask?.id]: {
            ...data.tasks[singleTask?.id],
            peopleId: people.id,
          },
        },
      };

      // Use the updated data in your state or wherever it's needed
      setData(updatedData);
       setIsEditData(!isEditData);
    } else {
      setRows((prevRows) =>
        prevRows?.map((row) =>
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
    }

    setOpen(false);
  };
  const deletepeople = (personId) => {
    setRows((prevRows) =>
      prevRows?.map((row) =>
        row.id === rowId
          ? {
              ...row,
              people: row?.people?.filter((person) => person.id !== personId),
            }
          : row
      )
    );
  };
  const existingPeopleIds = rows
    ?.filter((row) => row.id === rowId)
    .flatMap((row) => row?.people?.map((person) => person.id) || []);

  const nonExistingPeople = peoples?.filter(
    (people) => !existingPeopleIds?.includes(people.id)
  );
  const matchingPeople = peoples.filter(
    (person) => singleTask?.peopleId === person.id
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
              <div className="flex items-center  justify-between gap-2 px-3 border rounded w-full h-10">
                <input
                  type="text"
                  name=""
                  id=""
                  className="bg-transparent px-1 flex-1 outline-none shadow-none"
                  placeholder="Search names, roles or teams"
                />
                <RxMagnifyingGlass className="text-xl" />
              </div>
              <p className="text-sm mt-1"> Suggested people</p>

              {nonExistingPeople?.map((people) => (
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
              <button
                className="workspace-dropdown-button position-relative fw-normal align-self-center  text-start py-1 text-sm px-3 flex items-center gap-1 w-full"
                style={{
                  height: "40px",
                }}
                onClick={() => setInvite(true)}
              >
                <IoPersonAddOutline className=" me-2 fs-5" />
                <span>Invite a new member by email</span>
              </button>
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
        className="w-full h-full flex items-center justify-between pe-3 gap-2 px-2"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <span
          className="flex items-center "
          style={{
            width: "14px",
          }}
        >
          {isHovered && (
            <AddCircleIcon
              style={{ fontSize: "16px" }}
              className="text-blue-500"
            />
          )}
        </span>

        {
        
        usedFor === 'kanban' ? 
        matchingPeople.map((matchedPerson) => (
          <span
            key={matchedPerson.id}
            className="flex align-items-center justify-content-center rounded-circle fs_14 text-white me-n1"
            style={{
              width: "26px",
              height: "26px",
              backgroundColor: matchedPerson.color,
            }}
          >
            {matchedPerson.text}
          </span>
        )):
      rows?.map((row) =>
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
        {usedFor === "kanban"  && matchingPeople?.length  <1 ? (
          <div>
            <RxAvatar className="text-xl" />
          </div>
        ) : (
          rows?.map(
            (row) =>
              row.id === rowId &&
              !row?.people?.length && (
                <div key={row.id}>
                  <RxAvatar className="align-bottom" />
                </div>
              )
          )
        )}
        <span></span>
      </div>
    </Popover>
  );
};

export default PeopleCell;
