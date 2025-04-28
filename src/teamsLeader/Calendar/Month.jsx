import React from "react";
import Day from "./Day";

const Month = ({ month, searchTerm }) => {
  return (
    <>
      <div className="flex-1 grid grid-cols-7 grid-rows-5 h-[65vh] relative">
        {month.map((row, i) => (
          <React.Fragment key={i}>
            {row.map((day, idx) => (
              <Day day={day} key={idx} rowIdx={i}         searchTerm={searchTerm}/>
            ))}
          </React.Fragment>
        ))}
      </div>
    </>
  );
};

export default Month;
