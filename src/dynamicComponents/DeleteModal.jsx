import React from 'react'
import { useStateContext } from '../contexts/ContextProvider';
import { Button, Modal } from 'react-bootstrap';
import { RxCross2 } from 'react-icons/rx';

const DeleteModal = ({ handleDeleteFile,fileName }) => {
  const { deletemodal, setDeleteModal } = useStateContext();
    const closeDeleteModal = () => setDeleteModal(false);
    
  return (
    <Modal show={deletemodal} onHide={closeDeleteModal} className="deleteModal">
      <Modal.Header className="border-0" >
        <p className="m-0">Delete the {fileName}?</p>
        <button
          type="button"
          class="btn-close rounded-1 bgHover centerIt justify-content-center p-0 "
          aria-label="Close"
          onClick={closeDeleteModal}  
          style={{
            width: "30px",
            height: "30px",
            position: "absolute",
            top: "16px",
            right: "16px",
          }}
        >
          <RxCross2 className="fs-5 text-color" />
        </button>
      </Modal.Header>
      <Modal.Footer className="border-0">
        <Button
          className="workspace-dropdown-button fw-normal rounded-1 py-1  px-3 "
          style={{
            height: "40px",
          }}
          onClick={closeDeleteModal}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="p-2 px-3  workspace_addBtn rounded-1 border-0"
          style={{ backgroundColor: "#025231" }}
          onClick={() => {
            closeDeleteModal();
            handleDeleteFile();
          }}
        >
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteModal