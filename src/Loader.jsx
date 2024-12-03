import React from "react";
import "./Loader.css"; // Create a CSS file for styling the loader

import IMAGES from "./assets/images/Images";
const Loader = () => {
  return (
    <div className="loader-container">
      <img src={IMAGES.LEAF} alt="Loading..." className="loader-logo" />
      <div className="loader-animation"></div>
    </div>
  );
};

export default Loader;
