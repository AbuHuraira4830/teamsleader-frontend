import { Drawer } from "antd";
import React from "react";
import { FaPlus } from "react-icons/fa6";
import { useProposalsContext } from "../../../contexts/ProposalsContext";
import { useStateContext } from "../../../contexts/ContextProvider";
import CustomToolbar from "./DropableComponents/CustomToolbar";

const SecondTopbar = () => {
  const { openDraggerBox, activeEditorId } = useProposalsContext();
  const { showDocSidebar, setShowDocSidebar } = useStateContext();

  const showDrawer = () => {
    // setOpenDraggerBox(true);
    setShowDocSidebar(true);
  };
  // console.log({ openDraggerBox });
  return (
    <div>
      <div className="bottom-part h-full flex">
        <div className="second-topbar bg-white h-12 border-b flex-1 flex items-center  justify-between">
          <div>{<CustomToolbar />}</div>
          <span
            onClick={showDrawer}
            className="flex items-center text-center w-10 cursor-pointer"
          >
            <FaPlus />
          </span>
        </div>
      </div>
    </div>
  );
};

export default SecondTopbar;
