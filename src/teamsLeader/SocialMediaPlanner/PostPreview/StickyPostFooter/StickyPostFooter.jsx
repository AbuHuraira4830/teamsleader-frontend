import React from "react";
import { Button } from "react-bootstrap";

const StickyPostFooter = ({ errors, handleSchedulePost }) => {
  return (
    <div className="sticky bottom-[-27px] w-full bg-white stickyPostButton_border flex justify-end">
      <Button
        type="button"
        className="px-2 py-1 workspace_addBtn border-0 rounded-1"
        style={{ backgroundColor: "#025231", fontSize: "14px" }}
        disabled={errors.length > 0}
        onClick={handleSchedulePost}
      >
        Schedule Post
      </Button>
    </div>
  );
};

export default StickyPostFooter;
