import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { Popover, Tooltip } from "antd";
import { PiCrownSimpleFill } from "react-icons/pi";
import { RxCross2 } from "react-icons/rx";
import { BsEnvelope } from "react-icons/bs";
import IMAGES from "../../../assets/images/Images";
import { getAPI, postAPI } from "../../../helpers/apis";
import { isEmailValid } from "../../chats/script";
import { useParams } from "react-router-dom";
import { useStateContext } from "../../../contexts/ContextProvider";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { message } from "antd";

const ShareModal = ({ handleClose, show }) => {
  const { selectedDocument, isDocumentChange, setIsDocumentChange } =
    useStateContext();
  const [members, setMembers] = useState([]);

  // const defaultMember = {
  //   name: "Usman Haider",
  //   email: "usmanHaider1234@gmail.com",
  //   isAdmin: true,
  //   owner: true,
  // };

  // const [addedMember, setAddedMember] = useState(() => {
  //   // If selectedDocument.sharedWith exists and is an array, prepend the defaultMember
  //   if (Array.isArray(selectedDocument?.sharedWith)) {
  //     return [defaultMember, ...selectedDocument.sharedWith];
  //   }
  //   // Otherwise, just return an array with the defaultMember
  //   return [defaultMember];
  // });

  const [addedMember, setAddedMember] = useState(() => {
    // If selectedDocument.sharedWith exists and is an array, return it as is
    if (Array.isArray(selectedDocument?.sharedWith)) {
      return [...selectedDocument.sharedWith];
    }
    // Otherwise, return an empty array if no sharedWith array exists
    return [];
  });

  const [open, setOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState(
    selectedDocument?.permission === "view"
      ? "doc-owners"
      : selectedDocument?.permission === "edit"
      ? "everyone"
      : "doc-owners"
  ); // State variable for selected radio value
  const [searchText, setSearchText] = useState("");
  const [isInviting, setIsInviting] = useState(false); // State to manage the Popover content
  const [email, setEmail] = useState(""); // State to manage the email input
  const [invitedMembers, setInvitedMembers] = useState([]); // New state for invited members
  const { docId } = useParams();
  const [isPublicDoc, setIsPublicDoc] = useState(false);

  const hide = () => {
    setOpen(false);
    setIsInviting(false); // Reset to original content when Popover is closed
  };

  const handleOpenChange = (newOpen) => {
    if (!newOpen) {
      setIsInviting(false); // Reset to original content when Popover is closed
    }
    setOpen(newOpen);
  };

  const addMember = async (item) => {
    setAddedMember([...addedMember, item]);
    const updatedMembers = members.filter(
      (member) => member.email !== item.email
    );
    setMembers(updatedMembers);
    setOpen(false);
    // Prepare data to send to the API
    handleUpdateDocument([...addedMember, item]);
  };

  const deleteMember = (memberIdToDelete) => {
    const memberToDelete = addedMember.find(
      (member) => member.email === memberIdToDelete
    );
    // Filter out the deleted member from the addedMember array
    const updatedAddedMembers = addedMember.filter(
      (member) => member.email !== memberIdToDelete
    );

    // Update the addedMember state
    setAddedMember(updatedAddedMembers);
    if (memberToDelete && !memberToDelete.owner) {
      setMembers([...members, memberToDelete]);
    }
    handleUpdateDocument(updatedAddedMembers);
  };
  const toggleAdminStatus = (memberEmail) => {
    // Map through the addedMember array and toggle isAdmin for the matching email
    const updatedMembers = addedMember.map((member) => {
      if (member.email === memberEmail) {
        return {
          ...member,
          isAdmin: !member.isAdmin, // Toggle the isAdmin field
        };
      }
      return member; // Leave other members unchanged
    });

    // Update the state with the new array
    setAddedMember(updatedMembers);

    // Pass the updated array to handleUpdateDocument
    handleUpdateDocument(updatedMembers);
  };

  const handleGetMembers = async () => {
    const listOfAllTypesOfUsers = await getAPI("/api/workspace/team-members");
    const combined = [
      ...listOfAllTypesOfUsers.data.admins,
      ...listOfAllTypesOfUsers.data.employees,
      ...listOfAllTypesOfUsers.data.clients,
    ];

    const uniqueEmails = new Map();

    combined.forEach((person) => {
      if (!uniqueEmails.has(person.email)) {
        uniqueEmails.set(person.email, {
          name: person.name,
          email: person.email,
        });
      }
    });

    const result = Array.from(uniqueEmails.values());
    setMembers(result);
  };

  useEffect(() => {
    handleGetMembers();
  }, [selectedRole]);

  const handleRadioChange = (e) => {
    setSelectedRole(e.target.value); // Update the selectedRole state with the selected value
    handleUpdateDocument(addedMember, e.target.value);
    setIsDocumentChange(!isDocumentChange);
  };

  const handleInvite = () => {
    if (isEmailValid(email)) {
      const newMember = {
        symbol: email.charAt(0).toUpperCase(),
        color: "#00a2e8",
        name: email.split("@")[0], // Use the email name part as a placeholder name
        email: email,
        owner: false, // Assuming invited members are not owners
      };

      setInvitedMembers([...invitedMembers, newMember]); // Push the new member into the invitedMembers array
      setEmail(""); // Clear email input
      setIsInviting(false); // Optionally reset state after inviting
      setOpen(false);

      // send a invitation to accept the part of the doc
      // write logic here
      const data = {
        docId,
        email: email,
      };
      const response = postAPI("/api/docs/invite-people", { data });
    }
  };
  const handleUpdateDocument = async (membersArray, role, isPublic) => {
    const data = {
      docID: docId,
      isPublic: isPublic,
      permission: role === "doc-owners" ? "view" : "edit",
      sharedWith: membersArray,
    };

    try {
      // Make the API call to update the shared document
      const response = await postAPI("/api/doc/update-shared-with", data);
      console.log("Document update successfully:", response);
    } catch (error) {
      console.error("Error update member:", error);
    }
  };
  const filteredMembers = members?.filter(
    (member) =>
      member?.name?.toLowerCase().includes(searchText?.toLowerCase()) ||
      member?.email?.toLowerCase().includes(searchText?.toLowerCase())
  );

  const handleSwitchChange = (e) => {
    setIsPublicDoc(e.target.checked);
    handleUpdateDocument(addedMember, selectedRole, e.target.checked);
  };
  return (
    <div>
      <Modal show={show} onHide={handleClose} className="DocShare-modal">
        <Modal.Header closeButton>
          <Modal.Title className="mShare-heading">Share</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="fs_14 m-0">
            Choose who will have access and get notifications about this doc
          </p>

          <Popover
            content={
              isInviting ? (
                <div
                  style={{
                    width: "494px",
                    height: "100px",
                    padding: "10px",
                  }}
                >
                  {/* Content for inviting a new member */}
                  <p className="fs_14 m-0">
                    Type in an email address to invite
                  </p>

                  <Button
                    className="mt-3 w-full"
                    // onClick={() => {
                    //   // Handle invite logic here
                    //   setIsInviting(false); // Optionally reset state after inviting
                    //   setEmail(""); // Clear email input

                    // }}
                    onClick={handleInvite} // Handle invite logic here
                    disabled={!isEmailValid(email)}
                  >
                    Invite
                  </Button>
                </div>
              ) : (
                <div
                  className="p-2"
                  style={{
                    width: "494px",
                    height: "200px",
                    overflowY: "scroll",
                  }}
                >
                  <div>
                    <span
                      className="fs_14 fw-bold ps-1"
                      style={{ fontWeight: 700, color: "#676879" }}
                    >
                      People
                    </span>

                    {filteredMembers?.map((item, index) => (
                      <div
                        key={index}
                        className="flex cursor_pointer share-person mb-2 p-1 rounded-1"
                        onClick={() => addMember(item)}
                      >
                        <span
                          className="person-avatar rounded-circle centerIt text-white justify-content-center fs_14 me-3"
                          style={{
                            width: "26px",
                            height: "26px",
                          }}
                        >
                          {/* {item.symbol} */}
                        </span>
                        <p className="m-0 centerIt fs_15">{item.name}</p>
                      </div>
                    ))}
                    <div
                      onClick={() => setIsInviting(true)} // Show invite form when clicked
                      className="my-1 rounded hover:bg-gray-100 py-2"
                    >
                      <p
                        className="centerIt px-2"
                        style={{ color: "#025231", cursor: "pointer" }}
                      >
                        <BsEnvelope className="fs-5 me-2" /> Invite a new member
                        by email
                      </p>
                    </div>
                  </div>
                </div>
              )
            }
            trigger="click"
            open={open}
            onOpenChange={handleOpenChange}
            className="share-Peoples"
          >
            {isInviting ? (
              <div>
                {/* Keep Popover open when inviting */}
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  className="mt-2"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onClick={(e) => e.stopPropagation()} // Prevent Popover from closing
                />
              </div>
            ) : (
              <Form.Control
                type="text"
                className=""
                placeholder="Search by name or email"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)} // Update searchText on input change
              />
            )}
          </Popover>

          <div className="d-flex my-4">
            <div className="share-icon centerIt ms-1 me-3">
              <img src={IMAGES.LEAF} alt="" />
            </div>
            <p className="m-0 fs_15">
              {" "}
              Anyone at <strong>account</strong> can find and access this Doc
            </p>
          </div>
          <div className=" mb-5 pb-3 ">
            <div className="centerIt justify-content-between mb-3">
              <div className="flex">
                <span className="person-avatar rounded-circle centerIt  text-white px-1   me-3">
                  {"adminwork@gmail.com"?.substring(0, 2).toUpperCase()}
                </span>
                <p className="m-0 centerIt fs_15">adminwork@gmail.com</p>
              </div>

              <span className="d-flex">
                <span className="centerIt">
                  <div className="icon-crown centerIt justify-content-center text-white ">
                    <PiCrownSimpleFill style={{ fontSize: "12px" }} />{" "}
                  </div>
                </span>

                <Button
                  className="px-2 py-1 workspace-dropdown-button ms-3"
                  disabled
                  style={{ fontSize: "14px" }}
                >
                  <RxCross2 style={{ fontSize: "16px" }} />
                </Button>
              </span>
            </div>
            {addedMember.map((member) => (
              <div
                className="centerIt justify-content-between mb-3"
                key={member.id}
              >
                <div className="flex">
                  <span
                    className="person-avatar rounded-circle centerIt  text-white px-1   me-3"
                    style={{ backgroundColor: member.color }}
                  >
                    {member?.email?.substring(0, 2).toUpperCase()}
                  </span>
                  <p className="m-0 centerIt fs_15">{member.email}</p>
                </div>

                <span className="d-flex">
                  {member.isAdmin ? (
                    <span className="centerIt">
                      <Tooltip title="Remove as admin">
                        <div
                          className="icon-crown centerIt justify-content-center text-white cursor-pointer"
                          onClick={() => toggleAdminStatus(member.email)}
                        >
                          <PiCrownSimpleFill style={{ fontSize: "12px" }} />{" "}
                        </div>
                      </Tooltip>
                    </span>
                  ) : (
                    <span className="centerIt">
                      <Tooltip title="Make as admin">
                        <div
                          className="icon-crown-gray centerIt flex items-center justify-content-center text-white cursor-pointer "
                          onClick={() => toggleAdminStatus(member.email)}
                        >
                          <PiCrownSimpleFill style={{ fontSize: "12px" }} />{" "}
                        </div>
                      </Tooltip>
                    </span>
                  )}

                  <Button
                    className="px-2 py-1 workspace-dropdown-button ms-3"
                    disabled={member.owner}
                    style={{ fontSize: "14px" }}
                    onClick={() => deleteMember(member.email)}
                  >
                    <RxCross2 style={{ fontSize: "16px" }} />
                  </Button>
                </span>
              </div>
            ))}

            {invitedMembers.map((member) => (
              <div
                className="centerIt justify-content-between mb-3"
                key={member.email} // Ensure uniqueness by using email
              >
                <div className="flex">
                  <span
                    className="person-avatar rounded-circle centerIt text-white px-1 me-3"
                    style={{ backgroundColor: member.color }}
                  >
                    {/* {member.symbol} */}
                  </span>
                  <div className="flex flex-col">
                    <p className="m-0 centerIt fs_15">{member.email}</p>
                    <span className="text-gray-500 text-xs">
                      Pending Invitation
                    </span>
                  </div>
                </div>
                <span className="d-flex">
                  <Button
                    className="px-2 py-1 workspace-dropdown-button ms-3"
                    disabled={member.owner}
                    style={{ fontSize: "14px" }}
                    onClick={() => deleteMember(member.email)}
                  >
                    <RxCross2 style={{ fontSize: "16px" }} />
                  </Button>
                </span>
              </div>
            ))}
          </div>
          <div>
            <div className="border-top py-4 mb-2">
              <h5 className="share-headings">Who can edit this Doc</h5>

              <div className="centerIt mt-3">
                <Form.Check
                  className="cursor_pointer pe-3"
                  type="radio"
                  aria-label="radio 1"
                  name="role"
                  value="doc-owners" // Radio value for "Only doc owners"
                  checked={selectedRole === "doc-owners"} // Check if "doc-owners" is selected
                  onChange={handleRadioChange} // Handle radio change
                />
                <div className="m-0 fs_14 d-flex">
                  Only doc owners{" "}
                  <div className="icon-crown centerIt justify-content-center text-white ms-3">
                    <PiCrownSimpleFill style={{ fontSize: "12px" }} />{" "}
                  </div>
                </div>
              </div>
              <div className="centerIt ">
                <Form.Check
                  className="cursor_pointer pe-3"
                  type="radio"
                  aria-label="radio 1"
                  name="role"
                  value="everyone" // Radio value for "Everyone who have access to this doc"
                  checked={selectedRole === "everyone"} // Check if "everyone" is selected
                  onChange={handleRadioChange} // Handle radio change
                />
                <p className="m-0 fs_14">Everyone who has access to this doc</p>
              </div>
            </div>
          </div>
        </Modal.Body>
        <div className="px-3">
          <div className=" pb-4 ">
            <div className="centerIt justify-content-between">
              <h5 className="share-headings">Share Doc publicly</h5>
              <Form.Check
                className="cursor_pointer pe-3"
                type="switch"
                aria-label="radio 1"
                name="role"
                checked={selectedDocument?.isPublic || isPublicDoc}
                onChange={handleSwitchChange}
              />
            </div>
            <div className="mt-3">
              {selectedDocument?.isPublic || isPublicDoc ? (
                <CopyToClipboard
                  text={selectedDocument?.publicURL}
                  onCopy={() => {
                    message.success("URL Copied!");
                  }}
                >
                  <Tooltip title="click to copy">
                    <span className="cursor-pointer hover:font-bold px-2 py-1 rounded bg-gray-100 text-black text-sm mt-3 text-break">
                      {selectedDocument?.publicURL || "No URL available"}
                    </span>
                  </Tooltip>
                </CopyToClipboard>
              ) : (
                <p className="fs_14">
                  {" "}
                  Create a link with a view-only access to share with anyone on
                  the web
                </p>
              )}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ShareModal;
