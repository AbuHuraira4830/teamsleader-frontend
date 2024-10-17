import React from "react";

const DefaultPreviewSkeleton = () => {
  return (
    // <div className="p-4">
    //   <h2 className="text-xl font-bold">Network Preview</h2>
    //   <div className="text-center text-sm text-[#364141] mt-4 mb-3">
    //     Select a profile and start adding content in the left panel.
    //   </div>
    <div className="networkPreviewEmpty_bg   animate-pulse ">
      <div className="networkPreviewEmpty_circle"></div>
      <div className="networkPreviewEmpty_body">
        <div className="networkPreviewEmpty_bodyBar _short"> </div>
        <div className="networkPreviewEmpty_bodyBar _long"> </div>
        <div className="networkPreviewEmpty_bodyBar _long"> </div>
        <div className="networkPreviewEmpty_bodyBar _medium"> </div>
        <div className="networkPreviewEmpty_Box"> </div>
      </div>
    </div>
    // </div>
  );
};

export default DefaultPreviewSkeleton;
