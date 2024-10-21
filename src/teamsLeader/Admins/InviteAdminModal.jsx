import React from "react";
import { Modal } from "antd";
import leaf from "../../assets/images/leaf_pass.png";
import ToggleAdmins from "./ToggleAdmins";

const InviteAdminModal = ({ visible, onClose }) => {
  return (
    <Modal
      title={
        <div className="flex items-center ">
          <img
            src={leaf}
            alt="Logo"
            className="mr-2 "
            style={{ height: "48px" }}
          />
          <h2 className="text-[2rem] font-normal">
            New <b>Admin </b> Role
          </h2>
        </div>
      }
      open={visible}
      onCancel={onClose}
      width={800}
      footer={null}
      className="admin-modal "
    >
      <hr
        className=""
        style={{ borderBottom: "1px solid #e6e9ef", margin: "1rem 0" }}
      />
      {/* ========================================================================================== */}
      <ToggleAdmins />

      {/* ========================================================================================== */}
    </Modal>
  );
};

export default InviteAdminModal;
