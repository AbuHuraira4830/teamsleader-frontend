import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { BsShieldCheck } from "react-icons/bs";
import { AiFillStar } from "react-icons/ai";
import securedVisa from "../../assets/images/secured-visa.png";
import securedMaster from "../../assets/images/secured-mastercard.png";
import securedNorton from "../../assets/images/secured-norton.png";
import securedMcafee from "../../assets/images/secured-mcafee.png";
import securedSSL from "../../assets/images/secured-ssl.png";
import leaf from "../../assets/images/leaf_pass.png";
import { IoMailOutline } from "react-icons/io5";
import { FaPhoneVolume } from "react-icons/fa";
import axios from "axios";
import { useStateContext } from "../../contexts/ContextProvider";
import PlanFeatures from "./PlanFeatures/PlanFeatures";
import DowngradeAlert from "./DowngradeAlert"; // Import the alert component


const PlanModal = ({
  isOpen,
  onClose,
  onContinue,
  // selectedPlan,
  // setSelectedPlan,
  currentPlan,
}) => {
  const greenColor = "#00854d";
  const vatPercentage = 21; // You can adjust this value or make it dynamic

  // State for package data
  const [plans, setPlans] = useState([]);
  const [customPrice, setCustomPrice] = useState(0);
  const [permissions, setPermissions] = useState({});
  const [features, setFeatures] = useState({});
  const [selectedPlan, setSelectedPlan] = useState(currentPlan); // Set initial state to the user's current plan
  const [currentUsage, setCurrentUsage] = useState({});
  const [showAlert, setShowAlert] = useState(false); // State to manage alert visibility
  const [alertMessage, setAlertMessage] = useState(""); // Store alert message

  const planRanks = {
    Freelancer: 1,
    Business: 2,
    Enterprise: 3,
  };

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        // Step 1: Fetch user data
        const userResponse = await axios.get("/api/user/get-user-from-token");
        console.log("UserResponse",userResponse);
        
        const userEmail = userResponse.data.emailAddress;


        if (!userEmail) {
          console.error("User email not found");
          return;
        }

        // Step 2: Fetch packages
        const packageResponse = await axios.get("/api/current-user-package", {
          params: {
            email: userEmail,
          },
        });
        // alert("helllo",packageResponse)
        console.log("PackageResponse",packageResponse );
        

        const fetchedPlans = packageResponse.data.packages;
        setPlans(fetchedPlans);

// Step 3: Fetch current usage (workspaces, admins, etc.)
    const usageResponse = await axios.get("/api/user/current-usage", {
     params: { email: userEmail },
    
    });
    console.log("usageResponse",usageResponse)
    setCurrentUsage(usageResponse.data); // Store current usage in state

        if (fetchedPlans.length > 0) {
          const userPlan = fetchedPlans.find((plan) => plan.deal === currentPlan);
          if (userPlan) {
            handlePlanSelection(userPlan);
          } else {
            // setSelectedPlan(fetchedPlans[0].deal); 
            handlePlanSelection(fetchedPlans[0]);
          }
        }
      } catch (error) {
        console.error("Error fetching packages", error);
      }
    };

    fetchPackages();
  }, [selectedPlan, currentPlan]);

  if (!isOpen) return null;

  const handlePlanChange = (plan) => {
    setSelectedPlan(plan);
  };
  const handlePlanSelection = (plan) => {
    // setSelectedPlan(plan.deal);
    setCustomPrice(plan.price);
    setPermissions(plan.permissions);
    setFeatures(plan.features);
  };

  const handleContinue = () => {
    const selectedPlanDetails = plans.find(plan => plan.deal === selectedPlan);
    const selectedPlanPermissions = selectedPlanDetails?.permissions;
  console.log("planRanks",planRanks[selectedPlan]);
  console.log("CurrentPlanRank",planRanks[currentPlan]);
    // Determine if user is downgrading based on plan ranks
    const isDowngrade =
      planRanks[selectedPlan] < planRanks[currentPlan];
  
    // Perform downgrade check only if downgrading
    if (isDowngrade && selectedPlanPermissions && !canDowngrade(selectedPlanPermissions)) {
      setShowAlert(true); // Show the downgrade alert
      return;
    }
  
    onContinue(selectedPlan); // Proceed if upgrading or valid downgrade
  };
  
  const canDowngrade = (selectedPlanPermissions) => {
    return (
      currentUsage.workspaces <= selectedPlanPermissions.workspaces &&
      currentUsage.admins <= selectedPlanPermissions.admins &&
      currentUsage.employees <= selectedPlanPermissions.employees &&
      currentUsage.clients <= selectedPlanPermissions.clients
    );
  };

  const calculateTotalPrice = (price, vatPercentage) => {
    const vatMultiplier = 1 + vatPercentage / 100;
    const totalPrice = parseInt(price) * vatMultiplier;
    return totalPrice.toFixed(2); // Round off to 2 decimal places
  };
  return (
    <>
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg overflow-scroll w-11/12 md:w-3/4 lg:w-11/12 plansmodal_container">
        <div className="p-4 border-b pb-[.5rem]">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <img
                src={leaf}
                alt="Logo"
                className="mr-2"
                style={{ height: "48px" }}
              />
              <h2 className="text-2xl font-semibold">TeamsLeader</h2>
            </div>
            <div className="text-3xl leading-8 mr-[12rem]">
              Choose the right plan for your team
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-xl"
            >
              <FaTimes />
            </button>
          </div>
          <div className="flex items-center justify-center mt-[.5rem]">
            <h2 className="text-base">
              <span>
                Thank you for choosing TeamsLeader! You have <b>14 days</b> left
                on your free trial
              </span>
            </h2>
          </div>
        </div>
        <div className="p-4 overflow-hidden max-h-[calc(100%-4rem)]">
          <div className="teamPlans_wrapperContainer">
            {/* Loop through fetched plans */}
            {plans.map((plan) => (
              <div key={plan._id}>
                <div className="flex justify-center mb-2">
                  <input
                    type="radio"
                    id={plan.deal}
                    name="plan"
                    value={plan.deal}
                    checked={selectedPlan === plan.deal}
                    onChange={() => handlePlanChange(plan.deal)}
                    className="appearance-none inline-block w-6 h-6 rounded-full border border-gray-300 plansRadioActive"
                  />
                </div>
                <div
                  className={`teamPlans_wrapper ${
                    selectedPlan === plan.deal ? "teamsPlans_activePlan" : ""
                  }`}
                  onClick={() => handlePlanChange(plan.deal)}
                >
                  <div className="teamPlans_topbar"></div>
                  <div>
                    <div className="teamPlans_rowWrapper">
                      <div className="teamPlans_rowWrapperHeader">
                        <div className="teamPlans_rowWrapperHeaderInner">
                          <h3 className="teamPlans_rowWrapperHeaderText">
                            {plan.deal}
                          </h3>
                        </div>
                      </div>

                      {plan.price === "Custom" ? (
                        <>
                          <div className="teamsPlans_enterprise">
                            <h2>
                              <span className="teamsPlans_enterpriseText">
                                For teams, businesses organizations
                              </span>
                              wanting to maximize growth and scale fast
                            </h2>
                            <div className="teamsPlans_pricingBill">
                              <div className=" relative ">
                                <button
                                  className=" flex items-center px-2 nav_planBtn align-middle bg-transparent align-self-center  transition-all"
                                  //   onClick={addScheduleItem}
                                >
                                  <FaPhoneVolume className="mr-1" /> Give us a
                                  call
                                </button>
                              </div>
                            </div>
                          </div>
                          <div className="teamsPlans_divider"></div>
                          <div className="teamsPlans_typeWrapper">
                            <div className="teamsPlans_typeInner">
                              Includes Business, plus:
                            </div>
                            <div className="teamsPlans_listWrapper">
                              Unlimited Workspaces
                            </div>
                            <div className="teamsPlans_listWrapper">
                              Organizational Structure
                            </div>
                            <div className="teamsPlans_listWrapper">
                              Extra Security for Data Protection
                            </div>
                            <div className="teamsPlans_listWrapper">
                              Authorizations on Different Levels
                            </div>
                            <div className="teamsPlans_listWrapper">
                              Enterprise Priority Support
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="teamsPlans_pricing">
                            <span className="teamsPlans_pricingValue">
                              {/* {plan.price}   / */}
                              {/* {plan.price.includes('€') ? plan.price : `${plan.price} €`} /  */}
                              {String(plan.price).includes('€') ? plan.price : `${plan.price} €`} /


                            </span>
                            <span className="teamsPlans_pricingSeat">
                              month &nbsp;
                            </span>
                            <span className="teamsPlans_pricingTax">
                              Excl. VAT
                            </span>
                            <div className="teamsPlans_pricingTotal">
                              {/* Total {plan.totalPrice}€ / month */}
                              Total{" "}
                              {calculateTotalPrice(plan.price, vatPercentage)}€
                              / month
                            </div>
                            <div className="teamsPlans_pricingBill">
                              Billed monthly
                            </div>
                          </div>

                          <div className="teamsPlans_divider"></div>
                          <div className="teamsPlans_typeWrapper">
                            <div className="teamsPlans_typeInner">
                              {plan.description}
                            </div>
                            <div className="teamsPlans_listWrapper">
                              {plan.permissions.workspaces} Workspaces
                            </div>
                            <div className="teamsPlans_listWrapper">
                              {plan.permissions.admins} Admins
                            </div>
                            <div className="teamsPlans_listWrapper">
                              Access to all features
                            </div>
                            <div className="teamsPlans_listWrapper">
                              Client & Employee onboarding
                            </div>
                            <div className="teamsPlans_listWrapper">
                              Invoices & Proposals
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <PlanFeatures plans={plans} selectedPlan={selectedPlan} features = {features}/>
        <div className="sticky bottom-0 bg-white border-t p-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-1">
              <AiFillStar className="text-[#00854d]" />
              <AiFillStar className="text-[#00854d]" />
              <AiFillStar className="text-[#00854d]" />
              <span className="text-[#00854d] font-bold">
                First 30 Days Money Back Guarantee
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <img src={securedVisa} alt="Verified by Visa" className="h-6" />
              <img
                src={securedMaster}
                alt="MasterCard SecureCode"
                className="h-6"
              />
              <img src={securedNorton} alt="Norton Secured" className="h-6" />
              <img src={securedMcafee} alt="McAfee Secure" className="h-6" />
              <img
                src={securedSSL}
                alt="Secure SSL Encryption"
                className="h-6"
              />
            </div>
            <button
              onClick={handleContinue}
              style={{
                backgroundColor: greenColor,
                color: "white",
                padding: "0.5rem 1rem",
                borderRadius: "0.25rem",
              }}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
    {showAlert && (
        <DowngradeAlert
          message="Your account exceeds the limits of the selected downgrade package "
          onClose={() => setShowAlert(false)}
        />
      )}
    </>
  );
};

export default PlanModal;
