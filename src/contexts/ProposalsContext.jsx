import React, { createContext, useContext, useState } from "react";
const generateUniqueId = () => {
  return Math.random().toString(36).substr(2, 9);
};

const StateContext = createContext();
export const getLocalStorageItem = (key) => {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
};

export const setLocalStorageItem = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const ProposalsContext = ({ children }) => {
  const [openDraggerBox, setOpenDraggerBox] = useState(false);
  const [clickedIds, setClickedIds] = useState([]);

  const handleBlockClick = (id, height) => {
    setClickedIds((prevIds) => [
      ...prevIds,
      { uid: generateUniqueId(), id, content: "", height },
    ]);
  };
  const [activeEditorId, setActiveEditorId] = useState(null);

  return (
    <StateContext.Provider
      value={{
        openDraggerBox,
        setOpenDraggerBox,
        clickedIds,
        handleBlockClick,
        setClickedIds,
        activeEditorId,
        setActiveEditorId,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};
export const useProposalsContext = () => useContext(StateContext);
