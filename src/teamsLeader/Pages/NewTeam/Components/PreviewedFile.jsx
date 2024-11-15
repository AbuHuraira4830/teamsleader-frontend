import jsPDF from "jspdf";
import React from "react";
import { useStateContext } from "../../../../contexts/ContextProvider";

const PreviewedFile = React.forwardRef(({ file }, ref) => {
  const { replyFilePreview } = useStateContext();
  return (
    <div
      className="preview_modal centerIt justify-content-center h-100 w-100"
      ref={ref}
    >
      {/* {replyFilePreview} */}
      {file}
    </div>
  );
});

export default PreviewedFile;
