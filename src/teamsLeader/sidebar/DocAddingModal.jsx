import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { postAPI } from "../../helpers/apis";
import { useStateContext } from "../../contexts/ContextProvider";

const DocAddingModal = ({
  docName,
  setDocName,
  onHide,
  show,
  hideDocModal,
}) => {
  const { allDocuments, setAllDocuments, selectedWorkspace } =
    useStateContext();
  const [teamInputValue, setTeamInputValue] = useState("");

  const handldeChange = () => {
    postAPI("/api/doc/store", {
      workspaceID: selectedWorkspace._id,
      name: teamInputValue,
    }).then((res) => {
      setAllDocuments(res?.data?.workspace?._doc?.documents);
      setTeamInputValue("");
      hideDocModal();
    });
    // setDocName([...docName, teamInputValue]);
  };
  return (
    <Modal className="team_modal" show={show} onHide={onHide} animation={true}>
      <Modal.Header closeButton className="border-0 px-0 pb-0">
        <h2>Create Document</h2>
      </Modal.Header>
      <Modal.Body className="px-0 ">
        <span>
          <p className="fs_14 p-0 mb-2">Document name</p>
          <Form.Control
            type="text"
            value={teamInputValue}
            onChange={(e) => setTeamInputValue(e.target.value)}
            placeholder="New Doc"
            className=" py-2  mb-3 shadow-none workspace_searchInput transparent_bg"
          />
        </span>{" "}
      </Modal.Body>
      <Modal.Footer className="border-0">
        <Button
          className="workspace-dropdown-button position-relative fw-normal align-self-center  text-start py-1  px-3 "
          style={{
            height: "40px",
          }}
          onClick={hideDocModal}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="p-2 px-3  workspace_addBtn border-0"
          style={{ backgroundColor: "#025231" }}
          onClick={handldeChange}
        >
          Create Doc
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DocAddingModal;
