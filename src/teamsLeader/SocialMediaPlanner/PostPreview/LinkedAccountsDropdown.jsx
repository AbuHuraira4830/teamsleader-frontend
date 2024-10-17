import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp, IoMdClose } from "react-icons/io";
import { FaInstagram, FaPinterest, FaFacebook, FaTiktok } from "react-icons/fa";
import { Form } from "react-bootstrap";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";

const LinkedAccountsDropdown = ({ activeStates, onAccountToggle }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [checkedStates, setCheckedStates] = useState({
    Instagram: [activeStates.Instagram],
    Pinterest: [activeStates.Pinterest],
    Facebook: [activeStates.Facebook],
    Linkedin: [activeStates.Linkedin],
    Twitter: [activeStates.Twitter],
    TikTok: [activeStates.TikTok],
  });

  const toggleDropdown = () => setIsOpen(!isOpen);
  const icons = {
    Instagram: <FaInstagram className="text-pink-500" />,
    Pinterest: <FaPinterest className="text-red-500" />,
    Facebook: <FaFacebook className="text-blue-500" />,
    Linkedin: <FaLinkedin className="text-blue-600" />, // Assuming LinkedIn's color is blue

    TikTok: <FaTiktok className="text-black" />,
    Twitter: <FaXTwitter />,

    // Add other platforms as necessary
  };

  const accounts = {
    Instagram: [{ id: 1, username: "huzaifa4543" }],
    Linkedin: [{ id: 3, username: "najeeb" }],
    Facebook: [{ id: 5, username: "Cricket Updates" }],
    TikTok: [{ id: 2, username: "hunainbrows" }],
    Pinterest: [{ id: 4, username: "junaid" }],
    Twitter: [{ id: 6, username: "hammad" }],

    // Add other platforms as necessary
  };

  const toggleAllForPlatform = (platform) => {
    const allChecked = checkedStates[platform].every(Boolean);
    const newStates = {
      ...checkedStates,
      [platform]: checkedStates[platform].map(() => !allChecked),
    };
    setCheckedStates(newStates);
    onAccountToggle(platform, !allChecked);
  };
  const handleCheckboxChange = (platform, idx) => {
    const newState = [...checkedStates[platform]];
    newState[idx] = !newState[idx];
    const isActive = newState.some(Boolean); // Check if any accounts are still active
    setCheckedStates({ ...checkedStates, [platform]: newState });
    onAccountToggle(platform, isActive);
  };

  const clearAll = () => {
    const newStates = Object.keys(checkedStates).reduce((acc, key) => {
      return { ...acc, [key]: checkedStates[key].map(() => false) };
    }, {});
    setCheckedStates(newStates);
    Object.keys(newStates).forEach((platform) =>
      onAccountToggle(platform, false)
    );
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center justify-between w-full border border-gray-300 bg-white rounded-lg px-4 py-2 text-left cursor-pointer focus:outline-none"
      >
        <div className="flex flex-wrap gap-2">
          {Object.keys(accounts).map((platform) =>
            accounts[platform].map((account) => (
              <span
                key={account.id}
                className="flex items-center gap-1 bg-white rounded-full text-sm px-2 py-1 socialAccount_button"
              >
                {/* {icons[account.type]} */}
                {icons[platform]}

                {account.username}
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
              <span className="text-lg font-semibold ">
                Profiles (
                {Object.keys(accounts).reduce(
                  (acc, key) => acc + accounts[key].length,
                  0
                )}
                )
              </span>
              <button
                className="text-sm  text-[#00854d] hover:text-[#025231] pr-[8px]"
                onClick={clearAll}
              >
                Clear All
              </button>
            </div>
            {Object.keys(accounts).map((platform) => (
              <div key={platform} className="mb-4 w-full">
                <div className="flex justify-between mb-1 pr-[6px]">
                  <div className="font-bold text-gray-700 ">{platform}</div>
                  <div className="flex">
                    <div className="text-sm text-gray-700  mr-2">
                      All {platform}
                    </div>
                    <div>
                      {/* <Form.Check type="checkbox" className="text-sm" /> */}
                      <Form.Check
                        type="checkbox"
                        checked={checkedStates[platform].every(Boolean)}
                        onChange={() => toggleAllForPlatform(platform)}
                        className="text-sm"
                      />
                    </div>
                  </div>
                </div>
                {accounts[platform].map((account, idx) => (
                  <div key={account.id} className="profile_wrapperPlanner ">
                    <div className="profile_wrapperPlannerOuter ">
                      <div className="profile_wrapperPlannerInner">
                        <div className="planner_avatar">
                          <div className="avatar_letter">
                            {account.username.charAt(0)}
                          </div>
                        </div>
                        <div className="plannerSocial_info">
                          <div className="flex items-center gap-2">
                            {icons[platform]}
                            <span className="text-xs font-medium">
                              {account.username}
                            </span>
                          </div>
                          <span className="plannerSocial_userName">
                            @{account.username}
                          </span>
                        </div>
                      </div>
                      {/* <Form.Check type="checkbox" className="text-sm" /> */}
                      <Form.Check
                        type="checkbox"
                        checked={checkedStates[platform][idx]}
                        // onChange={() => {
                        //   const newChecked = [...checkedStates[platform]];
                        //   newChecked[idx] = !newChecked[idx];
                        //   setCheckedStates({
                        //     ...checkedStates,
                        //     [platform]: newChecked,
                        //   });
                        // }}
                        onChange={() => handleCheckboxChange(platform, idx)}
                        className="cursor-pointer text-sm"
                      />
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className=" plannerConnectSocial_btnWrapper">
            <button
              //   className="text-[#00854d] hover:text-blue-800 text-sm"
              className="plannerConnectSocial_btn text-sm"
            >
              + Connect a Profile
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LinkedAccountsDropdown;
