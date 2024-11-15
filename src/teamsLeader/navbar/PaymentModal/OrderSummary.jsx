import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import teamsMoneyLogo from "../../../assets/images/leaf.png";
import EnterpriseForm from "../EnterpriseModal/EnterpriseForm";

const OrderSummary = ({ selectedPlan }) => {
  console.log("selectedPlan", selectedPlan);
  const plans = {
    freelancer: {
      name: "Freelancer",
      price: 67,
      vat: 21,
      total: 81.07,
    },
    business: {
      name: "Business",
      price: 199,
      vat: 21,
      total: 240.79,
    },
    enterprise: {
      name: "Enterprise",
      price: "Contact Us",
      vat: 0,
      total: "Contact Us",
    },
  };

  const plan = plans[selectedPlan?.toLowerCase()];
  console.log("Plannnnnnnn", plan);

  return (
    <div className="ordersummary_container">
      <div className="ordersummary_priceContainer">
        <div className="ordersummary_moneyBack">
          <div className="ordersummary_trustImageWrap flex items-center">
            <h5 className="align-self-center mb-0 text-lg text-bold">
              TEAMSLEADER
            </h5>
            <img
              src={teamsMoneyLogo}
              alt="teamsMoneyLogo"
              className="align-self-center ordersummary_trustImage me-2"
            />
          </div>
        </div>
        <div className="ordersummary_priceInner">
          <div className="ordersummary_priceTotal_wrapper">
            <div className="ordersummary_price_row">
              <div className="ordersummary_priceType">
                <div className="primary">{plan.name}</div>
              </div>
              <div className="ordersummary_priceValue">
                <div className="primary">€{plan.price}</div>
              </div>
            </div>
            <div className="ordersummary_price_row">
              <div className="ordersummary_priceType">
                <div className="primary">VAT</div>
              </div>
              <div className="ordersummary_priceValue">
                <div className="primary">{plan.vat}%</div>
              </div>
            </div>
          </div>
          <div className="pricing_orderSummary_total">
            <div className="priceType">
              <div className="primary">Total</div>
            </div>
            <div className="priceValue">
              <div className="primary">€{plan.total}</div>
            </div>
          </div>
          <div className="pricing_orderSummary_renew">
            <div className="priceType">
              <div className="primary">Next charge date: 07 July, 2024</div>
              <div className="priceValue"></div>
            </div>
          </div>
        </div>
        <div className="ordersummary_footer">
          <div className="ordersummary_footerBtnContainer">
            <div className="ordersummary_footerBtnInner">
              <div className="paypalBtn_pricingPlan"></div>
              {/* <Button
                type="button"
                onClick={handleSubmit}
                className="px-3 py-2 workspace_addBtn border-0 rounded-1"
                style={{ backgroundColor: "#025231", fontSize: "14px" }}
              >
                Submit Purchase
              </Button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
