import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Tooltip from "@mui/material/Tooltip";
import { v4 as uuidv4 } from "uuid";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import CircleIcon from "@mui/icons-material/Circle";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ColorLensOutlinedIcon from "@mui/icons-material/ColorLensOutlined";
import MapsUgcOutlinedIcon from "@mui/icons-material/MapsUgcOutlined";
import OpenInFullOutlinedIcon from "@mui/icons-material/OpenInFullOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DatePicker, Space } from "antd";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Button } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
// import TimelineCell from "../Table components/TimelineCell";
import ViewTimelineOutlinedIcon from "@mui/icons-material/ViewTimelineOutlined";
import PeopleCell from "../Table components/PeopleCell";
import { RxAvatar } from "react-icons/rx";
import { colorsArray, sendRequest } from "../../../../../assets/js/config";
import PopoverStatus from "./SubComp/PopoverStatus";
import SegmentOutlinedIcon from "@mui/icons-material/SegmentOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import TitleOutlinedIcon from "@mui/icons-material/TitleOutlined";
import { useKanbanContext } from "../../../../../contexts/KanbanContext";
import BudgetComponent from "./SubComp/BudgetComponent";
import TaskFieldsComponent from "./SubComp/TaskFieldsComponent";
import EditTaskModal from "./modals/EditTaskModal";
import dayjs from "dayjs";
import TimelineCell from "./SubComp/TimelineCell";
import Settings from "./Settings/Settings";
const Main = ({ toggleCanvas }) => {
  const {
    data,
    setData,
    setIsStatusPopover,
    setIsStatusPopoverAnchorEl,
    isEditTaskModalOpen,
    setIsEditTaskModalOpen,
    setOpenTaskId,
    setIsEditData,
    isEditData,
    setOpenColumn,
    isDataGet,
    setIsDataGet,
    checkedList
  } = useKanbanContext();
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [colorPopoverOpen, setColorPopoverOpen] = useState(false);
  const [taskOpen, setTaskOpen] = useState(false);
  const [targetColumnId, setTargetColumnId] = useState("");
  const [currentTaskId, setCurrentTaskId] = useState("");
  const [colorPopoverAnchorEl, setColorPopoverAnchorEl] = useState(null);
  const [taskPopoverAnchorEl, setTaskPopoverAnchorEl] = useState(null);
  const onChange = (date, dateString) => {};
  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    ) {
      return;
    }
    const startColumn = data.columns[source.droppableId];
    const finishColumn = data.columns[destination.droppableId];

    if (startColumn === finishColumn) {
      // Move within the same column
      const newTaskIds = Array.from(startColumn.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...startColumn,
        taskIds: newTaskIds,
      };

      const newData = {
        ...data,
        columns: {
          ...data.columns,
          [newColumn.id]: newColumn,
        },
      };

      setData(newData);
    } else {
      // Move to a different column
      const startTaskIds = Array.from(startColumn.taskIds);
      startTaskIds.splice(source.index, 1);

      const newStartColumn = {
        ...startColumn,
        taskIds: startTaskIds,
      };

      const finishTaskIds = Array.from(finishColumn.taskIds);
      finishTaskIds.splice(destination.index, 0, draggableId);

      const newFinishColumn = {
        ...finishColumn,
        taskIds: finishTaskIds,
      };

      const newData = {
        ...data,
        columns: {
          ...data.columns,
          [newStartColumn.id]: newStartColumn,
          [newFinishColumn.id]: newFinishColumn,
        },
      };

      setData(newData);
    }
  };

  const addNewColumn = () => {
    const newColumnId = `column-${uuidv4()}`;

    const newColumn = {
      id: newColumnId,
      title: "New Kanban",
      taskIds: [],
      backgroundColor: "lightgray",
    };

    const newColumns = {
      ...data.columns,
      [newColumnId]: newColumn,
    };

    const newColumnOrder = [...data.columnOrder, newColumnId];

    setData({
      ...data,
      columns: newColumns,
      columnOrder: newColumnOrder,
    });
    setIsEditData(!isEditData);
  };
  useEffect(() => {
    if (data && data.columns && data.columnOrder && isDataGet) {
      updateSingleKanbanProject();
    }
  }, [isEditData]);

  const deleteColumn = () => {
    const columnId = targetColumnId;
    const { [columnId]: deletedColumn, ...remainingColumns } = data.columns;
    const newColumnOrder = data.columnOrder.filter((id) => id !== columnId);

    // Remove tasks associated with the deleted column
    const taskIdsToRemove = data.columns[columnId].taskIds;
    const { [columnId]: deletedTasksColumn, ...remainingTasks } = data.tasks;
    taskIdsToRemove.forEach((taskId) => {
      delete remainingTasks[taskId];
    });

    setData({
      ...data,
      columns: remainingColumns,
      tasks: remainingTasks,
      columnOrder: newColumnOrder,
    });
    setOpen(false);
    setIsEditData(!isEditData);
  };

  const addNewTask = (columnId) => {
    const newTaskId = uuidv4(); // Generate a unique ID using uuid
    const defaultTaskName = "New Task";

    const newTask = { id: newTaskId, title: defaultTaskName };

    const newTasks = {
      ...data.tasks,
      [newTaskId]: newTask,
    };

    const newColumn = {
      ...data.columns[columnId],
      taskIds: [...data.columns[columnId].taskIds, newTaskId],
    };

    const newColumns = {
      ...data.columns,
      [columnId]: newColumn,
    };

    setData({
      ...data,
      tasks: newTasks,
      columns: newColumns,
    });
    setIsEditData(!isEditData);
  };

  const handleClick = (event, columnId) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
    setTargetColumnId(columnId);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  const handleColorClick = (event) => {
    setOpen(false);
    setColorPopoverAnchorEl(event.currentTarget);
    setColorPopoverOpen(true);
  };

  const handleColorClose = () => {
    setColorPopoverAnchorEl(null);
    setColorPopoverOpen(false);
  };
  const changeColor = (newColor) => {
    const updatedColumn = {
      ...data.columns[targetColumnId],
      backgroundColor: newColor,
    };

    const newData = {
      ...data,
      columns: {
        ...data.columns,
        [targetColumnId]: updatedColumn,
      },
    };

    setData(newData);
    setColorPopoverOpen(false);
    setIsEditData(!isEditData);
  };
  const handleTitleChange = (event, columnId) => {
    const updatedColumn = {
      ...data.columns[columnId],
      title: event.target.value,
    };

    const newData = {
      ...data,
      columns: {
        ...data.columns,
        [columnId]: updatedColumn,
      },
    };

    setData(newData);
    setIsEditData(!isEditData);
  };
  // for title , budget , notes of a specific task ( reusable function )
  const handleTaskPropertyChange = (event, columnId, taskId, property) => {
    const newValue = event.target.value;

    setData((prevData) => {
      const newTasks = {
        ...prevData.tasks,
        [taskId]: {
          ...prevData.tasks[taskId],
          [property]: newValue,
        },
      };

      const newColumns = {
        ...prevData.columns,
        [columnId]: {
          ...prevData.columns[columnId],
          taskIds: prevData.columns[columnId].taskIds.map((id) =>
            id === taskId ? taskId : id
          ),
        },
      };

      return {
        ...prevData,
        tasks: newTasks,
        columns: newColumns,
      };
    });

    // setIsEditData(!isEditData);
  };

  const handleTaskClick = (event, taskId) => {
    setTaskPopoverAnchorEl(event.currentTarget);
    setCurrentTaskId(taskId);
    setTaskOpen(true);
  };

  // Function to close the task popover
  const handleCloseTaskPopover = () => {
    setTaskOpen(false);
    setCurrentTaskId("");
  };

  const deleteTask = () => {
    const taskId = currentTaskId;
    // Update the state to remove the task
    setData((prevData) => {
      // Copy the tasks object without the deleted task
      const newTasks = { ...prevData.tasks };
      delete newTasks[taskId];

      // Update the columns object to remove the task from taskIds
      const newColumns = { ...prevData.columns };
      Object.keys(newColumns).forEach((columnId) => {
        newColumns[columnId].taskIds = newColumns[columnId].taskIds.filter(
          (id) => id !== taskId
        );
      });

      return {
        ...prevData,
        tasks: newTasks,
        columns: newColumns,
      };
    });

    // Close the task popover
    setTaskPopoverAnchorEl(null);
    setTaskOpen(false);
    setIsEditData(!isEditData);
  };
  const [selectedDate, setSelectedDate] = useState(null);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [buttonRef, setButtonRef] = useState(null);

  // const handleDateChange = (date) => {
  //   setSelectedDate(date);
  //   setIsDatePickerOpen(false); // Close the date picker after selecting a date
  // };

  const handleOpenDatePicker = () => {
    setIsDatePickerOpen(true);
  };

  const handleButtonClick = (event) => {
    setButtonRef(event.currentTarget);
    handleOpenDatePicker();
  };
  const handleClearDate = () => {
    setSelectedDate(null);
  };

  const handleTaskTitleChange = (event, columnId, taskId) => {
    handleTaskPropertyChange(event, columnId, taskId, "title");
  };
  const handleInputChange = (event, columnId, taskId) => {
    handleTaskPropertyChange(event, columnId, taskId, "note");
  };

  const handleTaskBudgetChange = (event, columnId, taskId) => {
    handleTaskPropertyChange(event, columnId, taskId, "budget");
  };
  const fetchSingleKanbanProject = async () => {
    try {
      const projectID = "65c9fc86988fa10536061046";
      const response = await sendRequest(`kanban/project/${projectID}`, "GET");

      if (response.success) {
        setData(response.kanbanProject);
        console.log({ message: "Project Retreive Successfully" });
        setIsDataGet(true);
      } else {
        console.error({ "Retreive single project Error : ": response.error });
      }
    } catch (error) {
      console.log({ error });
    }
  };
  const updateSingleKanbanProject = async () => {
    try {
      const projectID = "65c9fc86988fa10536061046";
      const response = await sendRequest(
        `kanban/project/${projectID}`,
        "PUT",
        data
      );

      if (response.success) {
        setData(response.updatedProject);
        console.log({ message: "Project Update Successfully" });
      } else {
        console.error({ "Update single project Error : ": response.error });
      }
    } catch (error) {
      console.log({ error });
    }
  };
  useEffect(() => {
    fetchSingleKanbanProject();
  }, []);
  const handleEditTask = (id, column) => {
    setOpenTaskId(id);
    setIsEditTaskModalOpen(true);
    setOpenColumn(column);
  };
  useEffect(() => {
    !isEditTaskModalOpen && setOpenTaskId("");
  }, [isEditTaskModalOpen]);
  const handleDateChange = (date, dateString, taskId) => {
    // Update the dueDate in the data object
    const updatedData = { ...data };
    const taskToUpdate = updatedData.tasks[taskId];

    if (taskToUpdate) {
      taskToUpdate.dueDate = dateString;
      setIsEditData(!isEditData);
    }
  };
  return (
    <>
      <EditTaskModal />
      <div className="flex items-center justify-between my-3">
        <button
          className="workspace_addBtn text-white rounded border-0 text-sm outline-none p-2"
          onClick={addNewColumn}
        >
          Add New Section
        </button>

        <Settings/>
       
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex gap-3 flex-wrap ">
          {data?.columnOrder?.map((columnId) => {
            const column = data.columns[columnId];
            const tasks = column.taskIds.map((taskId) => data.tasks[taskId]);

            // Generate a unique ID for the MoreHorizIcon
            const moreIconId = `more-icon-${column.id}`;

            return (
              <Droppable
                key={column.id}
                droppableId={column.id}
                className="kanban__section"
              >
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="flex-shrink-0 h-[450px] w-72 rounded-lg bg-slate-100 hover:bg-slate-200 hover:shadow-lg flex flex-col"
                  >
                    <div
                      className="h-10 flex items-center justify-between gap-4 p-2 text-sm font-semibold m-0 rounded-tr-lg rounded-tl-lg"
                      style={{ background: column.backgroundColor }}
                    >
                      <input
                        tpye="text"
                        value={column.title}
                        className="hover:border border-black w-full rounded bg-transparent outline-none text-white"
                        onChange={(event) =>
                          handleTitleChange(event, column.id)
                        }
                      />

                      <span className="flex gap-2 items-center">
                        <Tooltip placement="top" title="New Task" arrow>
                          <span
                            className="flex items-center justify-center w-[25px] h-[25px] hover:bg-white rounded cursor-pointer text-white kanbanIcon"
                            onClick={() => addNewTask(column.id)}
                          >
                            <AddCircleOutlineIcon
                              className="text-white"
                              style={{
                                height: "18px",
                              }}
                            />
                          </span>
                        </Tooltip>
                        <Tooltip placement="top" title="More" arrow>
                          <span
                            className="flex items-center justify-center w-[25px] h-[25px] hover:bg-white rounded cursor-pointer text-white kanbanIcon"
                            aria-describedby={moreIconId}
                            onClick={(event) => handleClick(event, column.id)}
                          >
                            <MoreHorizIcon
                              className="text-white"
                              style={{ height: "18px" }}
                            />
                          </span>
                        </Tooltip>
                        <Popover
                          id={moreIconId}
                          open={open}
                          anchorEl={anchorEl}
                          onClose={handleClose}
                          anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "left",
                          }}
                          PaperProps={{
                            style: {
                              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", // Customize the shadow as needed
                              marginTop: "10px",
                            },
                          }}
                        >
                          <Typography className="p-1 w-40">
                            <div
                              className="text-sm hover:bg-gray-100 w-full px-2 rounded py-2 cursor-pointer flex items-center gap-1 text-gray-500"
                              onClick={handleColorClick}
                              aria-describedby="color-popover"
                            >
                              <ColorLensOutlinedIcon fontSize="small" />
                              <span>Change Color</span>
                            </div>
                            <div
                              className="text-sm hover:bg-gray-100 w-full px-2 rounded py-2 cursor-pointer flex items-center gap-1 text-gray-500"
                              onClick={deleteColumn}
                            >
                              <DeleteOutlineIcon fontSize="small" />
                              <span>Delete</span>
                            </div>
                          </Typography>
                        </Popover>

                        <Popover
                          id="color-popover"
                          open={colorPopoverOpen}
                          anchorEl={colorPopoverAnchorEl}
                          onClose={handleColorClose}
                          anchorOrigin={{
                            vertical: "top",
                            horizontal: "left",
                          }}
                          PaperProps={{
                            style: {
                              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1) ",
                              marginTop: "-4px",
                            },
                          }}
                        >
                          <Typography className="p-1 w-40">
                            <div className="text-sm flex flex-wrap items-center justify-center gap-2 px-2 rounded py-2 cursor-pointer">
                              {colorsArray?.map((color) => {
                                return (
                                  <CircleIcon
                                    key={color.id}
                                    style={{ color: color.color }}
                                    onClick={() => changeColor(color.color)}
                                  />
                                );
                              })}
                            </div>
                          </Typography>
                        </Popover>
                      </span>
                    </div>

                    <div className="py-3 pl-3 pr-2 h-full flex-1 kanban__section__bottom">
                      {tasks.map((task, index) => (
                        <Draggable
                          key={task.id}
                          draggableId={task.id}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}
                              className="bg-white mb-2 rounded border h-fit p-2 text-xs text-gray-500 flex flex-col gap-2"
                            >
                              <div className="h-10 flex items-center justify-between gap-4   font-semibold m-0">
                                <input
                                  tpye="text"
                                  value={task.title}
                                  className="hover:border border-black w-full rounded bg-transparent outline-none text-gray-500 "
                                  onChange={(event) =>
                                    handleTaskTitleChange(
                                      event,
                                      column.id,
                                      task.id
                                    )
                                  }
                                  onBlur={() => setIsEditData(!isEditData)}
                                />

                                <span className="flex gap-2 items-center">
                                  <Tooltip
                                    placement="top"
                                    title="Start Conversation"
                                    arrow
                                  >
                                    <span className="flex items-center justify-center w-[25px] h-[25px]  rounded cursor-pointer text-gray-500 kanbanTaskIcon">
                                      <MapsUgcOutlinedIcon
                                        className="text-gray-500"
                                        style={{
                                          height: "18px",
                                        }}
                                        onClick={toggleCanvas}
                                      />
                                    </span>
                                  </Tooltip>
                                  <Tooltip placement="top" title="More" arrow>
                                    <span
                                      className="flex items-center justify-center w-[25px] h-[25px] hover:bg-gray-300 rounded cursor-pointer text-gray-500"
                                      aria-describedby={`task-more-icon-${task.id}`}
                                      onClick={(event) =>
                                        handleTaskClick(event, task.id)
                                      }
                                    >
                                      <MoreHorizIcon
                                        className="text-gray-500"
                                        style={{ height: "18px" }}
                                      />
                                    </span>
                                  </Tooltip>
                                  <Popover
                                    id={`task-more-icon-${task.id}`}
                                    open={taskOpen}
                                    anchorEl={taskPopoverAnchorEl}
                                    onClose={handleCloseTaskPopover}
                                    anchorOrigin={{
                                      vertical: "bottom",
                                      horizontal: "left",
                                    }}
                                    PaperProps={{
                                      style: {
                                        boxShadow:
                                          "0px 4px 8px rgba(0, 0, 0, 0.1)", // Customize the shadow as needed
                                        marginTop: "10px",
                                      },
                                    }}
                                  >
                                    <Typography className="p-1 w-40">
                                      <div
                                        className="text-sm hover:bg-gray-100 w-full px-2 rounded py-2 cursor-pointer flex items-center gap-2 text-gray-500"
                                        onClick={() => {
                                          toggleCanvas();
                                          handleCloseTaskPopover();
                                        }}
                                      >
                                        <OpenInFullOutlinedIcon
                                          style={{ fontSize: "18px" }}
                                        />

                                        <span>Open Task</span>
                                      </div>
                                      <div
                                        className="text-sm hover:bg-gray-100 w-full px-2 rounded py-2 cursor-pointer flex items-center gap-2 text-gray-500"
                                        onClick={() => deleteTask()}
                                      >
                                        <DeleteOutlineIcon
                                          style={{ fontSize: "18px" }}
                                        />
                                        <span>Delete</span>
                                      </div>
                                    </Typography>
                                  </Popover>
                                </span>
                              </div>
                              {checkedList.includes("Due Date") && (
                                <div className="flex items-center gap-2">
                                  <Tooltip
                                    placement="top"
                                    title="Due Date"
                                    arrow
                                  >
                                    <div
                                      className="w-20 flex gap-2 items-center cursor-pointer"
                                      onClick={() => {
                                        handleEditTask(task?.id, column);
                                      }}
                                    >
                                      <CalendarTodayOutlinedIcon />
                                      <span>Due Date </span>
                                    </div>
                                  </Tooltip>
                                  <span className="rounded due-date-box bg-gray-100 flex-1 h-8  flex items-center">
                                    <DatePicker
                                      className="bg-gray-100 h-7 hover:border hover:border-black rounded cursor-pointer mx-[3px] text-gray-500"
                                      format="DD MMM YYYY"
                                      value={dayjs(task.dueDate)}
                                      onChange={(date, dateString) =>
                                        handleDateChange(
                                          date,
                                          dateString,
                                          task.id
                                        )
                                      }
                                    />
                                  </span>
                                </div>
                              )}
                              {checkedList.includes("Timeline") && (
                                <div className="flex items-center gap-2">
                                  <div
                                    className="w-20 flex gap-2 items-center cursor-pointer"
                                    onClick={() => {
                                      handleEditTask(task?.id, column);
                                    }}
                                  >
                                    <ViewTimelineOutlinedIcon />
                                    <span>Timeline</span>
                                  </div>
                                  <span className="rounded bg-gray-100 flex-1 h-8  flex items-center justify-center  ">
                                    <TimelineCell
                                      taskId={task.id}
                                      task={task}
                                    />
                                  </span>
                                </div>
                              )}
                              {checkedList.includes("Owner") && (
                                <div className="flex items-center gap-2">
                                  <div className="w-20 flex gap-2 items-center">
                                    <RxAvatar className="text-xl" />
                                    <span>Owner</span>
                                  </div>
                                  <span className="rounded bg-gray-100 flex-1 h-8  flex items-center justify-center">
                                    <PeopleCell
                                      usedFor="kanban"
                                      taskId={task?.id}
                                      task={task}
                                    />
                                  </span>
                                </div>
                              )}
                              {checkedList.includes("List") && (
                                <div className="flex items-center gap-2">
                                  <div className="w-20 flex gap-2 items-center">
                                    <SegmentOutlinedIcon className="text-xl" />
                                    <span>List</span>
                                  </div>
                                  <PopoverStatus taskId={task.id} />
                                </div>
                              )}
                              {checkedList.includes("Status") && (
                                <div className="flex items-center gap-2">
                                  <div className="w-20 flex gap-2 items-center">
                                    <SegmentOutlinedIcon className="text-xl" />
                                    <span>Status</span>
                                  </div>
                                  <span className="rounded bg-gray-100 flex-1 h-8 flex items-center justify-center cursor-pointer"></span>{" "}
                                </div>
                              )}
                              {checkedList.includes("Notes") && (
                                <TaskFieldsComponent
                                  column={column}
                                  task={task}
                                  fieldName="note"
                                  handleFieldChange={handleInputChange}
                                />
                              )}
                              {checkedList.includes("Budget") && (
                                <TaskFieldsComponent
                                  column={column}
                                  task={task}
                                  fieldName="budget"
                                  handleFieldChange={handleTaskBudgetChange}
                                />
                              )}

                              {checkedList.includes("Files") && 
                              
                              <TaskFieldsComponent
                                column={column}
                                task={task}
                                fieldName="file"
                                // handleFieldChange={handleTaskBudgetChange}
                              />
                              }

                            </div>
                          )}
                        </Draggable>
                      ))}
                    </div>
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            );
          })}
        </div>
      </DragDropContext>
    </>
  );
};

export default Main;
