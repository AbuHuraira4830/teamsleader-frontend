import React, { useEffect, useState } from "react";
import { Button, Modal } from "antd";
import { useKanbanContext } from "../../../../../../contexts/KanbanContext";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import ClearIcon from "@mui/icons-material/Clear";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import ViewTimelineOutlinedIcon from "@mui/icons-material/ViewTimelineOutlined";
import { RxAvatar } from "react-icons/rx";
import SegmentOutlinedIcon from "@mui/icons-material/SegmentOutlined";

import { DatePicker, Space } from "antd";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Tooltip } from "@mui/material";
import PopoverStatus from "./components/PopoverStatus";
import TimelineCell from "./components/TimelineCell";
import PeopleCell from "./components/PeopleCell";
import TaskFieldsComponent from "./components/TaskFieldsComponent";
// import OffCanvas from "./components/Offcanvas";
import OffCanvas from "./components/OffCanvas";
import dayjs from "dayjs";
// import OffCanvas from "./components/OffCanvas";
const EditTaskModal = () => {
  const {
    isEditTaskModalOpen,
    setIsEditTaskModalOpen,
    openTaskId,
    data,
    openColumn,
    setData,
    setIsEditData,
    isEditData,
    setEditorContent,
    editorContent,
  } = useKanbanContext();

  // useEffect(() => {
  //   // console.log({ open: openTaskId });
  //   if (openTaskId) {
  //     if (isEditTaskModalOpen) {
  //       setEditorContent(data.tasks[openTaskId]?.description);
  //     }
  //   } 
  // }, [openTaskId, isEditTaskModalOpen]);
// console.log({editorContent})
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
  console.log({ singleTask });

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
  };

  const handleInputChange = (event, columnId, taskId) => {
    handleTaskPropertyChange(event, columnId, taskId, "note");
  };

  const handleTaskBudgetChange = (event, columnId, taskId) => {
    handleTaskPropertyChange(event, columnId, taskId, "budget");
  };
  useEffect(() => {
    !isEditTaskModalOpen && setSingleTask(null);
  }, [isEditTaskModalOpen]);

  const handleDateChange = (date, dateString, taskId) => {
    // Update the dueDate in the data object
    const updatedData = { ...data };
    const taskToUpdate = updatedData.tasks[taskId];

    console.log(dateString, taskToUpdate, updatedData, taskId);
    if (taskToUpdate) {
      taskToUpdate.dueDate = dateString;
      setIsEditData(!isEditData);
    }
  };
  return (
    <>
      <Modal
        centered
        open={isEditTaskModalOpen}
        onOk={() => setIsEditTaskModalOpen(false)}
        onCancel={() => setIsEditTaskModalOpen(false)}
        width={1200}
        footer={null}
      >
        <div
          style={{
            height: "600px",
            overflow: "hidden",
          }}
        >
          <div className="flex mt-3">
            <div className="w-2/4   border-r border-gray-300 flex flex-col gap-4 h-[530px]">
              <h4 className="h-4"> {singleTask?.title}</h4>
              <div className="flex-1  overflow-y-scroll gap-4 flex flex-col px-2">
                <div className="flex flex-col gap-2 ">
                  {/* repeat  */}
                  <div className="flex items-center gap-2">
                    <Tooltip placement="top" title="Due Date" arrow>
                      <div
                        className="w-40 flex gap-2 items-center text-gray-500"
                        // onClick={() => {
                        //   handleEditTask(task?.id);
                        // }}
                      >
                        <CalendarTodayOutlinedIcon />
                        <span>Due Date</span>
                      </div>
                    </Tooltip>
                    <span className="rounded due-date-box bg-gray-100 flex-1 h-10  flex items-center  ">
                      <DatePicker
                        className="bg-gray-100 h-8 w-full hover:border hover:border-black rounded cursor-pointer mx-[3px] text-gray-500"
                        format="DD MMM YYYY"
                        // defaultValue={dayjs(singleTask?.dueDate) || ""}
                        value={
                          singleTask?.dueDate
                            ? dayjs(singleTask?.dueDate)
                            : undefined
                        }
                        onChange={(date, dateString) =>
                          handleDateChange(date, dateString, singleTask?.id)
                        }
                      />
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-40 flex gap-2 items-center text-gray-500">
                    <ViewTimelineOutlinedIcon />
                    <span>Timeline</span>
                  </div>
                  <span className="rounded bg-gray-100 flex-1 h-10  flex items-center justify-center  ">
                    <TimelineCell />
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-40 flex gap-2 items-center text-gray-500">
                    <RxAvatar className="text-xl" />
                    <span>Owner</span>
                  </div>
                  <span className="rounded bg-gray-100 flex-1 h-10  flex items-center justify-center">
                    <PeopleCell
                      usedFor="kanban"
                      taskId={singleTask?.id}
                      task={singleTask}
                    />
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-40 flex gap-2 items-center text-gray-500">
                    <SegmentOutlinedIcon className="text-xl" />
                    <span>List</span>
                  </div>
                  <PopoverStatus taskId={singleTask?.id} />
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-40 flex gap-2 items-center text-gray-500">
                    <SegmentOutlinedIcon className="text-xl" />
                    <span>Status</span>
                  </div>
                  <span className="rounded bg-gray-100 flex-1 h-10 flex items-center justify-center cursor-pointer"></span>{" "}
                </div>

                {singleTask && (
                  <>
                    <TaskFieldsComponent
                      column={openColumn}
                      task={singleTask}
                      fieldName="note"
                      handleFieldChange={handleInputChange}
                    />

                    <TaskFieldsComponent
                      column={openColumn}
                      task={singleTask}
                      fieldName="budget"
                      handleFieldChange={handleTaskBudgetChange}
                    />

                    <TaskFieldsComponent
                      column={openColumn}
                      task={singleTask}
                      fieldName="file"
                    />
                  </>
                )}
              </div>
            </div>
            <div className="w-2/4">
              <OffCanvas />
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};
export default EditTaskModal;
