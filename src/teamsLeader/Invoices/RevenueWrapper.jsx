import React from "react";
const RevenueWrapper = () => {
  return (
    <div
      className="flex justify-between items-center "
      style={{
        // backgroundColor: "#f0f4f8",
        padding: "10px",
        borderRadius: "10px",
      }}
    >
      <h1
        className="font-avenir font-bold first-letter:capitalize tracking-[-.045em] text-2xl"
        style={{ color: "#3b82f6" }}
      >
        Revenues
      </h1>
      <div className="flex-1 px-10">
        <div className="flex items-center gap-5">
          <div
            className="flex flex-col justify-center items-center min-w-[12rem]"
            style={{
              backgroundColor: "#dbeafe",
              padding: "6px",
              borderRadius: "4px",
            }}
          >
            <div className="flex items-center">
              <span className="text-[#579bfc] text-sm">
                Total revenue 2024 excl. VAT
              </span>
            </div>
            <div className="flex items-center mt-0.5">
              <span className="font-avenir font-semibold text-sm text-[#725f82]">
                € 330.58
              </span>
            </div>
          </div>
          <div
            className="flex flex-col justify-center items-center min-w-[12rem]"
            style={{
              backgroundColor: "#dbeafe",
              padding: "4px",
              borderRadius: "4px",
            }}
          >
            <div className="flex items-center">
              <span className="text-[#579bfc] text-sm">Q1 2024 excl. VAT</span>
            </div>
            <div className="flex items-center mt-0.5">
              <span className="font-avenir font-semibold text-sm text-[#725f82]">
                € 330.58
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevenueWrapper;
