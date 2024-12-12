import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
  CardElement,
} from "@stripe/react-stripe-js";
import { useNavigate, useParams } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { postAPI } from "../../../../helpers/apis";
import { useStateContext } from "../../../../contexts/ContextProvider";
// import { useNavigate } from "react-router-dom";
export default function CheckoutForm({
  formValues,
  formErrors,
  handleInputChange,
  handleCountryChange,
  stripeCustomer,
}) {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [severity, setSeverity] = useState("success");
  const { setIsPaymentModalOpen, setIsPlanModalOpen,userEmail  } = useStateContext();
  const { workspaceID, teamID } = useParams();
  const { selectedPlan } = formValues; // Ensure selectedPlan is available

  useEffect(() => {
    if (!stripe) return;

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) return;

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          setSeverity("success");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          setSeverity("info");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          setSeverity("error");
          break;
        default:
          setMessage("Something went wrong.");
          setSeverity("error");
          break;
      }
      setSnackbarOpen(true);
    });
  }, [stripe]);

  console.log("UserEmailComing", userEmail);
  console.log("StripeCustomer",stripeCustomer);
  
 

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsLoading(true);

    try {
        // Confirm the payment using Stripe
        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            confirmParams: {},
            redirect: "if_required",
        });

        if (error) {
            console.error("Payment confirmation error:", error);
            setMessage(error.message);
            setSeverity("error");
            setSnackbarOpen(true);
            setIsLoading(false);
            return;
        }

        if (paymentIntent.status === "succeeded") {
            console.log("Payment Intent:", paymentIntent);

            // Fetch the payment method details from backend
            const paymentMethodResponse = await fetch(
                `http://localhost:8888/stripe/retrieve-card/${paymentIntent.payment_method}`
                // `https://miketeamsleaderbackend-a03d0e00169c.herokuapp.com/stripe/retrieve-card/${paymentIntent.payment_method}`
            );
            const paymentMethodData = await paymentMethodResponse.json();

            if (paymentMethodResponse.ok) {
                console.log("Retrieved Payment Method:", paymentMethodData);

                const { last4, exp_month, exp_year, brand, country } = paymentMethodData.cardInfo;

                // Save card details along with the Stripe customerID
                const cardDetails = {
                    email: userEmail,
                    customerID: stripeCustomer.id, // Save customerID from PayNmentIntent
                    last4,
                    exp_month,
                    exp_year,
                    brand,
                    country,
                    paymentMethodId: paymentIntent.payment_method, // Save paymentMethodId
                };
                console.log("cardDetails", cardDetails);

                const saveCardResponse = await fetch(
                    `https://miketeamsleaderbackend-a03d0e00169c.herokuapp.com/stripe/save-card`,
                    // `http://localhost:8888/stripe/save-card`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(cardDetails),
                    }
                );

                const saveCardData = await saveCardResponse.json();

                if (saveCardResponse.ok) {
                    setMessage("Payment successful and card saved!");
                    setSeverity("success");
                } else {
                    console.error("Error saving card details:", saveCardData.error);
                    setMessage(saveCardData.error || "Failed to save card details.");
                    setSeverity("error");
                }
            } else {
                console.error("Error retrieving payment method:", paymentMethodData.error);
                setMessage(
                    paymentMethodData.error || "Failed to retrieve payment method details."
                );
                setSeverity("error");
            }
        } else {
            console.log("Payment requires additional action:", paymentIntent);
            setMessage("Payment processing or requires additional action.");
            setSeverity("info");
        }
    } catch (err) {
        console.error("API error:", err);
        setMessage("An error occurred. Please try again.");
        setSeverity("error");
    } finally {
        setIsLoading(false);
        setSnackbarOpen(true);
        // setIsPaymentModalOpen(false);
        setTimeout(() => {
          setIsPaymentModalOpen(false);
          navigate(`/workspace/${workspaceID}/team/${teamID}/administration/billing`);
      }, 3000);

    }
};

  
  
  

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") return;
    setSnackbarOpen(false);
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" options={paymentElementOptions} />

      <div className="plansCustomer_infoForm_row">
        <div className="plansHosted_field">
          <label htmlFor="firstName" className="plansHosted_field_label">
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            value={formValues.firstName}
            onChange={handleInputChange}
            className="plansHosted_fieldInputWrap person_searchInput"
          />
          {formErrors.firstName && (
            <div className="invalidInputMessage">{formErrors.firstName}</div>
          )}
        </div>
        <div className="plansHosted_field ml-4">
          <label htmlFor="lastName" className="plansHosted_field_label">
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            value={formValues.lastName}
            onChange={handleInputChange}
            className="plansHosted_fieldInputWrap person_searchInput"
          />
          {formErrors.lastName && (
            <div className="invalidInputMessage">{formErrors.lastName}</div>
          )}
        </div>
      </div>
      <div className="plansCustomer_infoForm_row">
        <div className="plansHosted_field">
          <label htmlFor="email" className="plansHosted_field_label">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formValues.email}
            onChange={handleInputChange}
            className="plansHosted_fieldInputWrap person_searchInput"
          />
          {formErrors.email && (
            <div className="invalidInputMessage">{formErrors.email}</div>
          )}
        </div>
        <div className="plansHosted_field ml-4">
          <label htmlFor="companyName" className="plansHosted_field_label">
            Company Name
          </label>
          <input
            type="text"
            name="companyName"
            value={formValues.companyName}
            onChange={handleInputChange}
            className="plansHosted_fieldInputWrap person_searchInput"
          />
          {formErrors.companyName && (
            <div className="invalidInputMessage">{formErrors.companyName}</div>
          )}
        </div>
      </div>
      <div className="plansCustomer_infoForm_row">
        <div className="plansHosted_field">
          <label htmlFor="companyPhone" className="plansHosted_field_label">
            Company Phone
          </label>
          <input
            type="text"
            name="companyPhone"
            value={formValues.companyPhone}
            onChange={handleInputChange}
            className="plansHosted_fieldInputWrap person_searchInput"
          />
          {formErrors.companyPhone && (
            <div className="invalidInputMessage">{formErrors.companyPhone}</div>
          )}
        </div>
        <div className="plansHosted_field ml-4">
          <label htmlFor="companyVAT" className="plansHosted_field_label">
            Company VAT
          </label>
          <input
            type="text"
            name="companyVAT"
            value={formValues.companyVAT}
            onChange={handleInputChange}
            className="plansHosted_fieldInputWrap person_searchInput"
          />
          {formErrors.companyVAT && (
            <div className="invalidInputMessage">{formErrors.companyVAT}</div>
          )}
        </div>
      </div>
      <div className="plansCustomer_infoForm_row">
        <div className="plansHosted_field">
          <label htmlFor="city" className="plansHosted_field_label">
            City
          </label>
          <input
            type="text"
            name="city"
            value={formValues.city}
            onChange={handleInputChange}
            className="plansHosted_fieldInputWrap person_searchInput"
          />
          {formErrors.city && (
            <div className="invalidInputMessage">{formErrors.city}</div>
          )}
        </div>
        <div className="plansHosted_field ml-4">
          <label htmlFor="address" className="plansHosted_field_label">
            Address
          </label>
          <input
            type="text"
            name="address"
            value={formValues.address}
            onChange={handleInputChange}
            className="plansHosted_fieldInputWrap person_searchInput"
          />
          {formErrors.address && (
            <div className="invalidInputMessage">{formErrors.address}</div>
          )}
        </div>
      </div>

      <button
        className="workspace_addBtn border-0 rounded-1"
        disabled={isLoading || !stripe || !elements}
        id="submit"
      >
        <span id="button-text">
          {isLoading ? (
            <div className="spinner" id="spinner"></div>
          ) : (
            "Submit Purchase"
          )}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2500}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MuiAlert onClose={handleSnackbarClose} severity={severity}>
          {message}
        </MuiAlert>
      </Snackbar>
    </form>
  );
}
