import React, { useState, useEffect } from "react";
import axios from "axios";
import { Col, Row } from "react-bootstrap";

const GifPicker = ({ onGifSelected, setOpenGif }) => {
  const [searchQuery, setSearchQuery] = useState("hi");
  const [gifs, setGifs] = useState([]);
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    if (searchQuery) {
      const apiKey = "RId5l4wwziOzMC9xVo2aWqR8Sthtx3S8";
      const url = `https://api.giphy.com/v1/gifs/search?q=${searchQuery}&api_key=${apiKey}`;

      axios
        .get(url)
        .then((response) => {
          setGifs(response.data.data);
        })
        .catch((error) => {
          console.error("Error fetching GIFs:", error);
        });
    }
    {
      gifs.map((gif, index) => console.log(gif.images.fixed_height.url));
    }
  }, [searchQuery]);

  const handleGifClick = (gifUrl) => {
    if (onGifSelected) {
      onGifSelected(gifUrl);
    }
    setOpenGif(false);
    setShowPicker(false);
  };

  return (
    <div className="giphy-gif-picker">
      <input
        type="text"
        placeholder="Search for GIFs"
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);

          setShowPicker(true);
        }}
      />
      <div className={`gifs-container ${showPicker ? "show" : ""}`}>
        <Row className="w-100">
          {gifs.map((gif, index) => (
            <Col xs={6} key={index}>
              <img
                key={gif.id}
                src={gif.images.fixed_height.url}
                alt={gif.title}
                onClick={() => handleGifClick(gif.images.fixed_height.url)}
              />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default GifPicker;

//   useEffect(() => {
//     loadDefaultGIFs();
//   }, []);
