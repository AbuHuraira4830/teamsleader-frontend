import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./StripeSetup/CheckoutForm";
import "./StripeSetup/stripeStyle.css";
import { getAPI, postAPI } from "../../../helpers/apis";

const stripePromise = loadStripe(
  "pk_test_51PVabAAHqMIAxJKDg9UknwuwTAQ5wiHD77iScE2nc40HYTwLkjEITNWdXw6o4J1rempQhGis26q4IFRP9FOnZXIk000OZSvykA"
);

const PlanInfo = ({
  formValues,
  formErrors,
  handleInputChange,
  handleCountryChange,
  countryList,
  selectedPlan,
}) => {
  const [clientSecret, setClientSecret] = useState("");
  const [stripeCustomer, setStripeCustomer] = useState("");

  useEffect(() => {
    postAPI("/stripe/create-payment-intent", {
      selectedPlan,
    }).then((data) => {
      console.log({ data });
      setStripeCustomer(data.data.customer);
      setClientSecret(data.data.clientSecret);
    });
  }, []);

  const appearance = {
    theme: "stripe",
    variables: {
      colorPrimary: "#08845d",
    },
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="plansCustomer_infoForm">
      <div>
        {clientSecret && (
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm
              formValues={formValues}
              formErrors={formErrors}
              handleInputChange={handleInputChange}
              handleCountryChange={handleCountryChange}
              stripeCustomer={stripeCustomer}
            />
          </Elements>
        )}
      </div>
    </div>
  );
};

export default PlanInfo;
