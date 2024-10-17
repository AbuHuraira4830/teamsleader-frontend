import { Popover } from "antd";
import React, { useState } from "react";
import { ChromePicker } from "react-color";
import { BiSolidColorFill } from "react-icons/bi";
// import { useStateContext } from "../../../../../contexts/ContextProvider";
import { RxCross2 } from "react-icons/rx";
// import { postAPI } from "../../../../../helpers/apis";

const TableShadow = ({ tableShadow, setTableShadow }) => {
  //   const {
  //     selectedWorkspace,
  //     setSelectedWorkspace,
  //     selectedTeam,
  //     setTeamTasks,
  //   } = useStateContext();
  //   const handleColorPickerColumn = (id, color) => {
    //     const data = JSON.stringify({
      //       color: color.hex, // Storing icon type as string
      //     });
      //     const postData = {
        //       data,
        //       workspaceID: selectedWorkspace._id,
        //     };
        //     postAPI(`/api/table-cell/update/${id}`, postData)
        //       .then((res) => {
          //         setSelectedWorkspace(res.data.workspace);
          //         // console.log(res.data.workspace);
  //         const team = res.data.workspace.teams.find(
    //           (team) => team._id === selectedTeam._id
    //         );
    //         setTeamTasks(team);
    //       })
    //       .catch((err) => {
      //         console.log(err);
      //       });
      //     setOpen(false);
      //   };
      
      //   const clearColorPickerCell = (id) => {
        //     const postData = {
          //       workspaceID: selectedWorkspace._id,
          //     };
          //     postAPI(`/api/table-cell/clear/${id}`, postData)
          //       .then((res) => {
            //         setSelectedWorkspace(res.data.workspace);
  //         // console.log(res.data.workspace);
  //         const team = res.data.workspace.teams.find(
    //           (team) => team._id === selectedTeam._id
  //         );
  //         setTeamTasks(team);
  //       })
  //       .catch((err) => {
    //         console.log(err);
    //       });
    //   };
    
    const [open, setOpen] = useState(false);
    const handleOpenChange = (newOpen) => {
      setOpen(newOpen);
    };
    const changeShadow = (color) => {
      setTableShadow(color.hex);
      setOpen(false);
    };
  //   let cellData = JSON.parse(columnData);
  return (
    <Popover
      content={
        <ChromePicker
          color={tableShadow}
          onChange={(color) => changeShadow(color)}
        />
      }
      trigger="click"
      open={open}
      onOpenChange={handleOpenChange}
    >
      <BiSolidColorFill className=" fs-5" style={{ color: tableShadow }} />
    </Popover>
  );
};

export default TableShadow;
