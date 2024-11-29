import React, { useCallback, useState, useEffect } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { FaTimes } from "react-icons/fa";
import PlanInfo from "./PlanInfo";
import OrderSummary from "./OrderSummary";
import countriesAndTimezones from "countries-and-timezones";
import { useStateContext } from "../../../contexts/ContextProvider";

const PaymentModal = ({ onClose, selectedPlan, handleBackClickPayment }) => {
  const {user} = useStateContext();
  console.log("User",user);
  
  const [formValues, setFormValues] = useState({
    cardNumber: "",
    expiration: "",
    securityCode: "",
    firstName: "",
    lastName: "",
    email: "",
    companyName: "",
    companyPhone: "",
    companyVAT: "",
    city: "",
    address: "",
    country: null,
  });

  const [formErrors, setFormErrors] = useState({});

  const allCountries = countriesAndTimezones.getAllCountries();
  const countryList = Object.values(allCountries).map((country) => ({
    name: country.name,
    id: country.id,
  }));

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });

    // Clear the error for the specific field
    if (formErrors[name]) {
      const updatedErrors = { ...formErrors };
      delete updatedErrors[name];
      setFormErrors(updatedErrors);
    }
  };

  const handleCountryChange = (event, newValue) => {
    setFormValues({ ...formValues, country: newValue });

    // Clear the error for the country field
    if (formErrors.country) {
      const updatedErrors = { ...formErrors };
      delete updatedErrors.country;
      setFormErrors(updatedErrors);
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white rounded-lg overflow-scroll w-11/12 md:w-3/4 lg:w-11/12 plansmodal_container">
          <div className="payments_headerWrap relative">
            <button
              className="payment_backBtn hover:bg-[#6768791a] transition-all duration-75	 ease-in	"
              onClick={handleBackClickPayment}
            >
              <IoIosArrowBack />
            </button>
            <button className="payment_backBtn ml-auto mr-[3rem]">
              <FaTimes onClick={onClose} />
            </button>
          </div>
          <div className="plansPayment_formWrap">
            <div className="flex">
              <div className="paymentInfo_formContainer">
                <h1 className="paymentInfo_formTitle">
                  Add payment details & complete your purchase
                </h1>

                <PlanInfo
                  formValues={formValues}
                  formErrors={formErrors}
                  handleInputChange={handleInputChange}
                  handleCountryChange={handleCountryChange}
                  countryList={countryList}
                  selectedPlan={selectedPlan}
                />
              </div>
              <OrderSummary
                // handleSubmit={handleSubmit}
                selectedPlan={selectedPlan}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentModal;
