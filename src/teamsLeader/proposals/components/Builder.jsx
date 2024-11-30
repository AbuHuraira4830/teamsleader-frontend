import React from "react";
import Topbar from "./Topbar";
import SecondTopbar from "./SecondTopbar";
import DraggerBox from "./DraggerBox";
import DropableBox from "./DropableBox";
import { useStateContext } from "../../../contexts/ContextProvider";
import DraggableSidebar from "./DraggableSidebar";

const Builder = () => {
  const { showDocSidebar, setShowDocSidebar } = useStateContext();

  const onClose = () => {
    setShowDocSidebar(false);
  };

  return (
    <>
      {/* <DraggerBox /> */}
      <DraggableSidebar onClose={onClose} sidebar={showDocSidebar} />

      <div className="flex flex-col  h-full">
        <div>
          <Topbar />
          <SecondTopbar />
        </div>
        <div className="overflow-y-scroll flex-1 h-full">
          <DropableBox />
        </div>
      </div>
    </>
  );
};

export default Builder;
