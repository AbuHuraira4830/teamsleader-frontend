import { Popover } from "antd";
import { useState } from "react";

const ReasonPopup = ({ value, id, source }) => {
  const [open, setOpen] = useState(null);
  const handleOpenChange = (id) => {
    setOpen(open === id ? null : id);
  };

  return (
    <Popover
      content={
        <div className="p-3" style={{ width: "233px", minHeight: "30px" }}>
          <p className="font-bold text-[18px] mb-1">{source}</p>

          <p>{value}</p>
        </div>
      }
      trigger="hover"
      open={open === id}
      onOpenChange={() => handleOpenChange(id)}
    >
      <div
        className="centerIt justify-content-center Border rounded-1 cursor_pointer px-1"
        // onClick={() => handleOpenChange(row._id)}
        style={{ height: "30px" }}
      >
        {value.length > 8 ? value.slice(0, 8) + "..." : value}
      </div>
    </Popover>
  );
};

export default ReasonPopup;
