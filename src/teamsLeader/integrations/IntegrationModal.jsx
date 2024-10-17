import React from "react";
import { Modal } from "antd";
import leaf from "../../assets/images/leaf_pass.png";
import zoomLogo from "../../assets/images/zoomLogo.png";
import zoomLogo1 from "../../assets/images/zoomLogo1.png";
import { BiLogoZoom } from "react-icons/bi";
import { FaArrowRight } from "react-icons/fa6";
import { PiLeafFill } from "react-icons/pi";

const IntegrationModal = ({ visible, onClose }) => {
  return (
    <Modal
      title={
        <div className="flex items-center">
          <img
            src={leaf}
            alt="Logo"
            className="mr-2"
            style={{ height: "48px" }}
          />
          <h2>
            <b>Automation</b> center
          </h2>
        </div>
      }
      open={visible}
      onCancel={onClose}
      width={800}
      footer={null}
    >
      <hr className="" style={{ borderBottom: "1px solid #e6e9ef" }} />

      {/* Add your content for the modal */}
      <div className="h-[259px] flex items-center my-[64px]">
        <div className="mr-[24px] h-[100%] w-[638px]">
          <div className="integration_banner">
            <div className="integBannerContent">
              <div className="integBannerLogo">
                <img src={zoomLogo1} alt="zoomLogo" />
              </div>
              <div className="integBannerContentContainer">
                <h1>Zoom</h1>
                <h4>
                  <span>
                    Keep track of your Zoom meetings insights in teamsleader and
                    stay connected wherever you go!{" "}
                  </span>
                </h4>
              </div>
            </div>
          </div>
        </div>
        <div className="meetingCardWrapper">
          <div className="meetingCardContainer">
            <div className="meeting_card_innerContainer">
              <div className="meeting_cardTopBar">
                {/* ==========Zoom Hexa============== */}
                <div className="flex justify-center items-center">
                  <div class="hex ">
                    <div className="flex justify-center items-center">
                      <BiLogoZoom className="text-[#2d8cff]" />
                    </div>
                  </div>
                </div>
                <span className="zoom_text">Zoom</span>
                <div className="topBarArrow">
                  <FaArrowRight className="text-xs" />
                </div>
                <div className="flex justify-center items-center">
                  <div class="hex ">
                    <div className="flex justify-center items-center">
                      <PiLeafFill className="text-[green] " />
                    </div>
                  </div>
                </div>
              </div>
              {/* =============meeting_cardTopBar End============= */}
              <div className="meeting_card_content">
                When starting <span className="font-medium	">a meeting </span>
                on Zoom, create an <span className="font-medium	"> item </span>
                and sync meeting details
              </div>
              <div className="w-full">
                <div className="emptyModule"></div>
                <button className="integ_cardButton">Add to board</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Horizontal line or divider */}
    </Modal>
  );
};

export default IntegrationModal;
