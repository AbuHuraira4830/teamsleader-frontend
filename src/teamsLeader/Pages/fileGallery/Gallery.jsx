import React, { useEffect, useState } from "react";
import FileGallery from "./FileGallery";
import { getAPI, postAPI } from "../../../helpers/apis";
import { useStateContext } from "../../../contexts/ContextProvider";
import { Button } from "react-bootstrap";

const Gallery = () => {
  const [galleries, setGalleries] = useState([]);
  const { selectedTeam, teamTasks, setTeamTasks } = useStateContext();

  useEffect(() => {
    if (selectedTeam?._id)
      getAPI(`/api/gallery/list?teamID=${selectedTeam?._id}`)
        .then((res) => {
          setTeamTasks(res.data.team);
        })
        .catch((err) => {
          console.log(err);
        });
  }, []);
  const handleAddGallery = () => {
    const workspace_uuid = typeof objCurrentWorkspace !== 'undefined' ? objCurrentWorkspace.uuid : "id will be here";
    if (!workspace_uuid) {
      console.error("Cannot create event without workspace UUID.");
      return;
    }
    postAPI(`/api/gallery/store`, {
      name: "File Gallery",
      teamID: selectedTeam?._id,
      workspace_uuid,

    })
      .then((res) => {
        setTeamTasks(res.data.team);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <div>
        <Button
          onClick={handleAddGallery}
          type="button"
          className=" px-2 py-1   workspace_addBtn border-0 rounded-1   "
          style={{ backgroundColor: "#025231", fontSize: "14px" }}
        >
          New Item
        </Button>
      </div>
      {teamTasks?.galleries?.map((gallery) => (
        <FileGallery key={gallery._id} gallery={gallery} />
      ))}
      
    </div>
  );
};

export default Gallery;
