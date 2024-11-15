import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const CurrencyPreview = () => {
  return (
    <div className="mt-4 ">
      <FormControl variant="outlined" color="success" fullWidth>
        {/* <InputLabel id="currency-select-label" className="text-primary-700"> */}
        <div className="mb-2 text-sm text-primary-700">Currency</div>
        {/* </InputLabel> */}
        <Select
          labelId="currency-select-label"
          id="currency-select"
          defaultValue="EUR" // Set default value to EUR
          disabled // Disable the select
          label="Currency"
          positon="bottom"
          color="success"
        >
          <MenuItem value="EUR" className="text-primary-700">
            Euro (€)
          </MenuItem>
          <MenuItem value="USD">United States Dollar ($)</MenuItem>
          <MenuItem value="AUD">Australian Dollar ($)</MenuItem>
          <MenuItem value="CAD">Canadian Dollar ($)</MenuItem>
          <MenuItem value="CHF">Swiss Franc (CHF)</MenuItem>
          <MenuItem value="CNY">Chinese Renminbi (¥)</MenuItem>
          <MenuItem value="DKK">Danish Krone (kr)</MenuItem>
          {/* Add other currencies as needed */}
        </Select>
      </FormControl>
    </div>
  );
};

export default CurrencyPreview;
