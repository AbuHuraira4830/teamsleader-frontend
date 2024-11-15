import React, { useState } from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const RevenuePayment = () => {
  const [currency, setCurrency] = useState("EUR");
  const handleChange = (event) => {
    setCurrency(event.target.value);
  };
  return (
    // <div className="mt-10 ">
    <div className="mt-1 ">
      <span className="text-gray-500 text-sm ">How was this revenue paid?</span>
      <FormControl
        variant="outlined"
        fullWidth
        className="mt-4"
        color="success"
      >
        <InputLabel id="currency-select-label" color="success">
          Revenue
        </InputLabel>
        <Select
          labelId="currency-select-label"
          id="currency-select"
          value={currency}
          onChange={handleChange}
          label="Currency"
          positon="bottom"
          color="success"
          //   className="text-primary-700"
        >
          <MenuItem value="EUR" className="text-primary-700">
            This was paid to another bank account
          </MenuItem>
          <MenuItem value="USD">This was paid cash</MenuItem>

          {/* Add other currencies as needed */}
        </Select>
      </FormControl>
    </div>
  );
};

export default RevenuePayment;
