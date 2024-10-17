import React from "react";
import { useChatsContext } from "../../../../contexts/ChatsContext";
import { FaUser } from "react-icons/fa";

export const UserListPopup = ({ onSelectUser }) => {
  const { mentionUsers } = useChatsContext();

  return (
    <div className="h-auto w-60 p-3">
      {mentionUsers?.map((user, index) => {
        return (
          <div
            key={index}
            className="cursor-pointer h-10 hover:bg-cyan-600 hover:text-white flex items-center rounded px-2 flex items-center gap-3"
            onClick={() => onSelectUser(user)}
          >
            <span className="bg-gray-200 p-2 rounded">
              <FaUser />
            </span>
            {user?.name}
          </div>
        );
      })}
    </div>
  );
};
