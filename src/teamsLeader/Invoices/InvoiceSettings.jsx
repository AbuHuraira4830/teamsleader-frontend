import React, { useState } from "react";
import { Switch } from "@mui/material";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import ColorPickerInvoices from "./ColorPickerInvoices";
import { styled } from "@mui/material/styles";
import { useStateContext } from "../../contexts/ContextProvider";
import AdditionalInfo from "./AdditionalInfo";
const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "dark" ? "#2ECA45" : "#65C466",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

const InvoiceSettings = () => {
  const {
    structuredCommunication,
    setStructuredCommunication,
    downPayment,
    setDownPayment,
    setDownPaymentAmount,
    communicationNumber,
    setCommunicationNumber,
    generateStructuredCommunicationNumber,
    handleChange,
    setCurrency,
    currency,
  } = useStateContext();

  // const [currency, setCurrency] = useState({ code: "EUR", symbol: "€" });
  // const handleChange = (event) => {
  //   const selectedCurrency = event.target.value;
  //   const currencySymbols = {
  //     EUR: "€",
  //     USD: "$",
  //     AUD: "$",
  //     CAD: "$",
  //     CHF: "CHF",
  //     CNY: "¥",
  //     DKK: "kr",
  //   };

  //   setCurrency({ code: selectedCurrency, symbol: currencySymbols[selectedCurrency] });
  // };

  const handleStructuredCommunicationToggle = (event) => {
    const isSwitchedOn = event.target.checked;
    setStructuredCommunication(isSwitchedOn);

    if (isSwitchedOn) {
      // Generate the communication number only when the switch is turned on
      const newCommunicationNumber = generateStructuredCommunicationNumber();
      setCommunicationNumber(newCommunicationNumber);
    } else {
      // Reset the communication number when the switch is turned off
      setCommunicationNumber("");
    }
  };

  const handleDownPaymentToggle = (event) => {
    setDownPayment(event.target.checked);
    if (!event.target.checked) {
      setDownPaymentAmount("€ 0.00"); // Reset the down payment if the switch is turned off
    }
  };

  //   const [selectedCurrency, setSelectedCurrency] = useState(currencyOptions[0]);

  // const handleStructuredCommunicationToggle = () => {
  //   setStructuredCommunication(!structuredCommunication);
  // };
  const handleCurrencyChange = (selectedOption) => {
    setSelectedCurrency(selectedOption);
  };

  return (
    <div className="pl-10 w-1/3">
      {/* Settings Header */}
      <h5 className=" text-primary-invoice capitalize  text-3xl mb-6">
        Settings
      </h5>

      <div className="mb-10">
        {/* Structured Communication Toggle */}
        <div className="mb-6">
          <label className="text-primary-700 text-sm mb-2.5 block">
            Set a structured communication
          </label>
          <div className="flex items-center gap-2">
            <IOSSwitch
              checked={structuredCommunication}
              onChange={handleStructuredCommunicationToggle}
            />

            <label className=" text-sm text-primary-700">Communication</label>
          </div>
        </div>

        {/* Down Payment Toggle */}
        <div className="mb-6">
          <label className="text-primary-700 text-sm mb-2.5 block">
            Add down payment
          </label>
          <div className="flex items-center gap-2">
            <IOSSwitch
              checked={downPayment}
              onChange={handleDownPaymentToggle}
            />

            <label className="text-sm text-primary-700">Down payment</label>
          </div>
        </div>
      </div>

      {/* Currency Selection */}
      <div className="mb-10 ">
      <FormControl variant="outlined" color="success" fullWidth>
          <InputLabel id="currency-select-label">Currency</InputLabel>
          <Select
            labelId="currency-select-label"
            id="currency-select"
            value={currency.code}
            onChange={handleChange}
            label="Currency"
          >
            <MenuItem value="EUR">Euro (€)</MenuItem>
            <MenuItem value="USD">United States Dollar ($)</MenuItem>
            <MenuItem value="AUD">Australian Dollar ($)</MenuItem>
            <MenuItem value="CAD">Canadian Dollar ($)</MenuItem>
            <MenuItem value="CHF">Swiss Franc (CHF)</MenuItem>
            <MenuItem value="CNY">Chinese Renminbi (¥)</MenuItem>
            <MenuItem value="DKK">Danish Krone (kr)</MenuItem>
          </Select>
        </FormControl>
      </div>

      {/* Style Color Picker */}
      {/* ... */}
      <ColorPickerInvoices />
      <AdditionalInfo />
    </div>
  );
};

export default InvoiceSettings;
