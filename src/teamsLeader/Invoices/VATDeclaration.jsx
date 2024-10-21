import React, { useState } from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const VATDeclaration = () => {
  const menuProps = {
    PaperProps: {
      style: {
        maxHeight: 200, // This is the maximum height of the menu
        overflow: "auto", // This will add a scrollbar if the content is larger than the maxHeight
      },
    },
  };
  const [currency, setCurrency] = useState("EUR");
  const handleChange = (event) => {
    setCurrency(event.target.value);
  };
  return (
    <div className="mt-6 ">
      <span className="text-gray-500 text-sm ">VAT de­c­la­ra­tion</span>
      <FormControl
        variant="outlined"
        fullWidth
        className="mt-4"
        color="success"
      >
        <InputLabel id="currency-select-label" color="success">
          Quarters
        </InputLabel>
        <Select
          labelId="currency-select-label"
          id="currency-select"
          value={currency}
          onChange={handleChange}
          label="Currency"
          positon="bottom"
          color="success"
          className="text-primary-700 "
          MenuProps={menuProps} // Apply the style to the dropdown menu
        >
          <MenuItem value="EUR" className="text-primary-700">
            Q2 2024
          </MenuItem>
          <MenuItem value="q1" className="text-primary-700">
            Q1 2024
          </MenuItem>
          <MenuItem value="q1" className="text-primary-700">
            Q4 2023
          </MenuItem>
          <MenuItem value="q1" className="text-primary-700">
            Q3 2023
          </MenuItem>
          <MenuItem value="q1" className="text-primary-700">
            Q2 2023
          </MenuItem>
          <MenuItem value="q1" className="text-primary-700">
            Q1 2023
          </MenuItem>
          <MenuItem value="q1" className="text-primary-700">
            Q4 2022
          </MenuItem>
          <MenuItem value="q1" className="text-primary-700">
            Q3 2022
          </MenuItem>
          <MenuItem value="q1" className="text-primary-700">
            Q2 2022
          </MenuItem>
          <MenuItem value="q1" className="text-primary-700">
            Q1 2022
          </MenuItem>
          <MenuItem value="q1" className="text-primary-700">
            Q4 2021
          </MenuItem>
          <MenuItem value="q1" className="text-primary-700">
            Q3 2021
          </MenuItem>
          <MenuItem value="q1" className="text-primary-700">
            Q2 2021
          </MenuItem>
          <MenuItem value="q1" className="text-primary-700">
            Q1 2021
          </MenuItem>
          <MenuItem value="q1" className="text-primary-700">
            Q4 2020
          </MenuItem>
          <MenuItem value="q1" className="text-primary-700">
            Q3 2020
          </MenuItem>
          <MenuItem value="q1" className="text-primary-700">
            Q2 2020
          </MenuItem>
          <MenuItem value="q1" className="text-primary-700">
            Q1 2020
          </MenuItem>

          {/* Add other currencies as needed */}
        </Select>
      </FormControl>
    </div>
  );
};

export default VATDeclaration;
