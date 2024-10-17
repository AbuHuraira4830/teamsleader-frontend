import React from "react";
import { TiFolderOpen } from "react-icons/ti";

const PasswordFolders = ({ formData }) => {
  return (
    <div className="vault_container">
      <div className="folders-container">
        <span className="fs_1 fw-bold">Passwords</span>
        {/* Display the list of folders */}
        {formData.map((folder, index) => (
          <div key={index} className="flex align-items-center mt-2">
            {/* Add your folder icon here */}
            <div className="flex">
              <div className="folder-icon mx-2">
                <TiFolderOpen />
              </div>
              <div>
                {/* Display folder name */}
                <div className="fs_1">{folder.templateName}</div>
                {/* You can display other template details here */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PasswordFolders;
