// UploadButton.js
import React from 'react';
import { IoAddOutline } from 'react-icons/io5';
import { useChatsContext } from '../../../../contexts/ChatsContext';

const UploadButton = () => {
  const { handleDrop } = useChatsContext();

  return (
    <div className="upload-button" onClick={handleDrop}>
      <IoAddOutline size={40} />
    </div>
  );
};

export default UploadButton;
