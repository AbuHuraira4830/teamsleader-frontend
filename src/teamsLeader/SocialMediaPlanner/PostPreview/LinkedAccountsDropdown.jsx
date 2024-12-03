import React, { useState } from "react";
import {
  FaInstagram,
  FaPinterest,
  FaFacebook,
  FaLinkedin,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { FaXTwitter } from "react-icons/fa6";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import YouTubeChannelsOffCanvas from "./ConnectProfile/YouTubeChannelsOffCanvas";
import OffCanvasConnect from "./ConnectProfile/OffCanvasConnect";
import { Form } from "react-bootstrap";
const LinkedAccountsDropdown = ({
  activeStates,
  onAccountToggle,
  linkedAccounts,
  addLinkedAccount,
  setLinkedAccounts,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showCanvasPassword, setShowCanvasPassword] = useState(false);
  const [showChannelsCanvas, setShowChannelsCanvas] = useState(false);

  const handleShowChannelsCanvas = () => setShowChannelsCanvas(true);
  const handleCloseChannelsCanvas = () => setShowChannelsCanvas(false);
  const closeCanvasPassword = () => setShowCanvasPassword(false);
  const toggleCanvasPassword = () => setShowCanvasPassword((s) => !s);
  const toggleDropdown = () => setIsOpen(!isOpen);

  const icons = {
    Instagram: <FaInstagram className="text-pink-500" />,
    Pinterest: <FaPinterest className="text-red-500" />,
    Facebook: <FaFacebook className="text-blue-500" />,
    Linkedin: <FaLinkedin className="text-blue-600" />,
    TikTok: <FaTiktok className="text-black" />,
    Twitter: <FaXTwitter />,
    YouTube: <FaYoutube className="text-red-600" />,
  };

  const toggleAllForPlatform = (platform) => {
    const allChecked = linkedAccounts
      .filter((account) => account.platform === platform)
      .every((account) => account.active);

    const newStates = linkedAccounts.map((account) => {
      if (account.platform === platform) {
        return { ...account, active: !allChecked };
      }
      return account;
    });

    setLinkedAccounts(newStates);
    onAccountToggle(platform, !allChecked);
  };

  const handleCheckboxChange = (platform, idx) => {
    const newStates = linkedAccounts.map((account, index) => {
      if (account.platform === platform && index === idx) {
        return { ...account, active: !account.active };
      }
      return account;
    });

    const isActive = newStates.some(
      (account) => account.platform === platform && account.active
    );
    setLinkedAccounts(newStates);
    onAccountToggle(platform, isActive);
  };

  const clearAll = () => {
    const newStates = linkedAccounts.map((account) => ({
      ...account,
      active: false,
    }));
    setLinkedAccounts(newStates);
    linkedAccounts.forEach((account) =>
      onAccountToggle(account.platform, false)
    );
  };

  return (
    <>
      <div className="relative">
        <button
          onClick={toggleDropdown}
          className="flex items-center justify-between w-full border border-gray-300 bg-white rounded-lg px-4 py-2 text-left cursor-pointer focus:outline-none"
        >
          <div className="flex flex-wrap gap-2">
            {linkedAccounts.length === 0 ? (
              <span className="text-gray-500">Please select a profile</span>
            ) : (
              linkedAccounts
                .filter((account) => account.active)
                .map((account) => (
                  <span
                    key={account.id}
                    className="flex items-center gap-1 bg-white rounded-full text-sm px-2 py-1 socialAccount_button"
                  >
                    {icons[account.platform]}
                    {account.name}
                    <IoMdClose className="ml-1 cursor-pointer" />
                  </span>
                ))
            )}
          </div>

          {isOpen ? (
            <IoIosArrowUp className="text-lg" />
          ) : (
            <IoIosArrowDown className="text-lg" />
          )}
        </button>
        {isOpen && (
          <div className="absolute z-10 w-full mt-1 border border-gray-300 bg-white rounded-lg shadow-lg linkedAccounts_overflow">
            <div className="p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-lg font-semibold">
                  Profiles ({linkedAccounts.length})
                </span>
                <button
                  className="text-sm text-[#00854d] hover:text-[#025231] pr-[8px]"
                  onClick={clearAll}
                >
                  Clear All
                </button>
              </div>
              {linkedAccounts.map((account, idx) => (
                <div key={account.id} className="mb-4 w-full">
                  <div className="flex justify-between mb-1 pr-[6px]">
                    <div className="font-bold text-gray-700">
                      {account.platform}
                    </div>
                    <div className="flex">
                      <div className="text-sm text-gray-700 mr-2">
                        All {account.platform}
                      </div>
                      <Form.Check
                        type="checkbox"
                        checked={linkedAccounts
                          .filter((acc) => acc.platform === account.platform)
                          .every((acc) => acc.active)}
                        onChange={() => toggleAllForPlatform(account.platform)}
                        className="text-sm"
                      />
                    </div>
                  </div>
                  <div className="profile_wrapperPlanner">
                    <div className="profile_wrapperPlannerOuter">
                      <div className="profile_wrapperPlannerInner">
                        <div className="planner_avatar">
                          <div className="avatar_letter">
                            {account.name.charAt(0)}
                          </div>
                        </div>
                        <div className="plannerSocial_info">
                          <div className="flex items-center gap-2">
                            {icons[account.platform]}
                            <span className="text-xs font-medium">
                              {account.name}
                            </span>
                          </div>
                          <span className="plannerSocial_userName">
                            @{account.name}
                          </span>
                        </div>
                      </div>
                      <Form.Check
                        type="checkbox"
                        checked={account.active}
                        onChange={() =>
                          handleCheckboxChange(account.platform, idx)
                        }
                        className="cursor-pointer text-sm"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="plannerConnectSocial_btnWrapper">
              <button
                className="plannerConnectSocial_btn text-sm"
                onClick={toggleCanvasPassword}
              >
                + Connect a Profile
              </button>
            </div>
          </div>
        )}
      </div>
      <OffCanvasConnect
        show={showCanvasPassword}
        handleClose={closeCanvasPassword}
        addLinkedAccount={addLinkedAccount}
        setShowChannelsCanvas={setShowChannelsCanvas}
      />
      {/* <YouTubeChannelsOffCanvas
        show={showChannelsCanvas}
        handleClose={handleCloseChannelsCanvas}
        addChannel={console.log} // Replace with actual add channel function
      /> */}
    </>
  );
};

export default LinkedAccountsDropdown;
