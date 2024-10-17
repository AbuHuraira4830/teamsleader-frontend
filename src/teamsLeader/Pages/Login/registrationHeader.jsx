import React from "react";
import IMAGES from "../../../assets/images/Images";

const registrationHeader = () => {
  return (
    <div
      className="login_header flex align-items-center border-bottom px-3"
      style={{ height: "65px", backgroundColor: "#F7F7F7" }}
    >
      <h5 className="align-self-center mb-0">TEAMSLEADER</h5>
      <img
        src={IMAGES.LEAF}
        alt=""
        className="align-self-center leaf_icon me-2"
      />
    </div>
  );
};

export default registrationHeader;
