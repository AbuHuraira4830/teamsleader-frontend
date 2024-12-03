import React, { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { FaTimes } from "react-icons/fa";
import "react-phone-input-2/lib/material.css";
import EnterpriseForm from "./EnterpriseForm";
const EnterpriseModal = ({
  isOpen,
  onClose,
  selectedPlan,
  handleBackClickEnterprise,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-[#f6f7fb] rounded-lg overflow-scroll w-11/12 md:w-3/4 lg:w-11/12 plansmodal_container">
        <div className="payments_headerWrap relative">
          <button className="payment_backBtn hover:bg-[#6768791a] transition-all duration-75 ease-in">
            <IoIosArrowBack onClick={handleBackClickEnterprise} />
          </button>
          <button className="payment_backBtn ml-auto mr-[3rem]">
            <FaTimes onClick={onClose} />
          </button>
        </div>
        <div className="enterpriseContact_salesWrap">
          <div className="enterpriseContact_salesHeader">
            <span className="first_title">Contact Us </span>
            <span className="second_title">
              Contact our consulting team today for hands-on guidance tailored
              to your team’s specific needs{" "}
            </span>
          </div>
          <div className="enterpriseContact_sales_formWrap">
            <div className="enterpriseContact_sales_form_sqaure">
              <EnterpriseForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnterpriseModal;
