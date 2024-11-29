// VideoUpload.js
import React, { useState } from "react";
import axios from "axios";
import { Accordion, Card } from "react-bootstrap";

const VideoUpload = ({ onVideoUpload }) => {
  const [uploadedVideos, setUploadedVideos] = useState([]);

  const handleVideoUpload = async (event) => {
    const file = event.target.files[0];
    const response = await axios.get("/api/s3url");
    const uploadURL = response.data.data.url;
    const uploadedFileUrl = uploadURL.split("?")[0];

    await fetch(uploadURL, {
      method: "PUT",
      headers: {
        "Content-Type": file.type,
      },
      body: file,
    });

    const newVideo = { url: uploadedFileUrl, name: file.name };
    setUploadedVideos((prevVideos) => [...prevVideos, newVideo]);
    onVideoUpload(newVideo);
  };

  return (
    <div className="mt-4">
      <input type="file" accept="video/*" onChange={handleVideoUpload} />
      {uploadedVideos.length > 0 && (
        <Accordion defaultActiveKey="0">
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="0">
              Uploaded Videos
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                {uploadedVideos.map((video, index) => (
                  <div key={index} className="mb-4">
                    <div className="video-thumbnail">
                      <video
                        src={video.url}
                        style={{ width: "100%" }}
                        controls
                      />
                    </div>
                    <div className="video-info mt-2">
                      <p className="font-bold">{video.name}</p>
                    </div>
                  </div>
                ))}
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      )}
    </div>
  );
};

export default VideoUpload;
