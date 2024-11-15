import React, { useState, useEffect } from "react";
import { TiFolderOpen } from "react-icons/ti";

const Folders = ({ folders }) => {
  return (
    <div className="vault_container">
      <span className="fs_1 fw-bold">FOLDERS</span>

      {/* Display the list of folders */}
      {folders.map((folder, index) => (
        <div key={index} className="flex align-items-center mt-2">
          {/* Add your folder icon here */}
          <div className="flex">
            <div className="folder-icon mx-2">
              <TiFolderOpen />
            </div>
            <div>
              {/* Display folder name */}
              <div className="fs_1">{folder.name}</div>
              {/* Display selected access */}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Folders;
