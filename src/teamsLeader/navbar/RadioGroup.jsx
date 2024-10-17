// import React, { useState } from 'react';

// function RadioGroup() {
//   // State variable to track the selected radio button
//   const [selectedRadio, setSelectedRadio] = useState(null);

//   // Event handler to update the selected radio
//   const handleRadioClick = (value) => {
//     setSelectedRadio(value);
//   };

//   return (
//     <div>
//       <label>
//         <input
//           type="radio"
//           name="radioGroup"
//           value="option1"
//           checked={selectedRadio === "option1"}
//           onClick={() => handleRadioClick("option1")}
//         />
//         Option 1
//       </label>
//       <br />
//       <label>
//         <input
//           type="radio"
//           name="radioGroup"
//           value="option2"
//           checked={selectedRadio === "option2"}
//           onClick={() => handleRadioClick("option2")}
//         />
//         Option 2
//       </label>
//       <br />
//       <label>
//         <input
//           type="radio"
//           name="radioGroup"
//           value="option3"
//           checked={selectedRadio === "option3"}
//           onClick={() => handleRadioClick("option3")}
//         />
//         Option 3
//       </label>
//     </div>
//   );
// }

// export default RadioGroup;
import React, { useEffect, useState } from "react";

const DynamicTable = () => {
  const [columns, setColumns] = useState([
    // { name: "Column 1", fixed: true },
    // { name: "Column 2", fixed: true },
    // { name: "Column 3", fixed: true },
  ]);

  const addColumn = () => {
    setColumns((prevColumns) => [
      ...prevColumns,
      { name: `Column ${prevColumns.length + 1}` },
    ]);
  };

  const [isScrollable, setIsScrollable] = useState(false);

  useEffect(() => {
    setIsScrollable(columns.length > 7); // Set isScrollable true if columns exceed 7
  }, [columns]);

  return (
    <div className="container">
      <button onClick={addColumn}>Column Add Karo</button>
      <Table isScrollable={isScrollable} columns={columns} />
    </div>
  );
};

export default DynamicTable;

const Table = ({ isScrollable, columns }) => {
  return (
    <div className="table-container">
      <table
        className="table table-striped "
        style={{ overflowX: "auto" }}
      >
        <thead>
          <tr className="position-relative">
            {columns.map((column) => (
              <>
                <th style={{ minWidth: "200px" }}>Column 1</th>
                <th style={{ minWidth: "200px" }}>Column 2</th>
                <th style={{ minWidth: "200px" }}>Column 3</th>
                <th
                  key={column.name}
                  style={{ minWidth: "200px" }}
                  className={column.fixed ? "fixed-column" : ""}
                >
                  {column.name}
                </th>
              </>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* Fill this with your actual data rows and bind them to the corresponding columns */}
        </tbody>
      </table>
    </div>
  );
};
