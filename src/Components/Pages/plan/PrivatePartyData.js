import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getPlan } from "../../../redux/reducers/planReducer";

const PrivatePartyData = ({ curElem, purchagedPlan }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [planName, setPlanName] = useState("");
  const [planType, setPlanType] = useState(false);
  const handleSubmit = (PrivatePartyData) => {
    getPlan();
    dispatch(getPlan(PrivatePartyData));
    navigate("/vechiles");
  };

  return (
    <>
      <div className="col-lg-3 col-md-6 col-sm-12  mb-4 mobile-mt-50 wed">
        <div
          className={`plan_card ${
            curElem.plan_name === "Pro"
              ? "plan_Plus pro"
              : curElem.plan_name === "Premiere"
              ? "plan_Plus"
              : curElem.plan_name === "Exclusive"
              ? "plan_WhiteGlove fff"
              : ""
          }`}
        >
          <div className="plan_cardHead">
            <h4 style={{ overflow: "hidden" }}>{curElem.plan_name} </h4>
            {curElem.monthly_price !== 0 ? (
              <div className="plan_Price">
                <div className="dfk ">
                  {curElem.annual_price == 0 || curElem.monthly_price == 0 ? (
                    "Enquiry"
                  ) : (
                    <span>
                      $
                      {planType && planName === curElem.plan_name
                        ? curElem.annual_price
                        : curElem.monthly_price}
                    </span>
                  )}
                  <div className="switch">
                    <span className="plan_Time">
                      {" "}
                      {curElem.monthly_listing} Listing
                    </span>
                    <br />
                    {/* <div className="btnBlk">
                      <span className="sub">-</span><span className="add">+</span>
                    </div> */}

                    <input
                      className="react-switch-checkbox"
                      id={curElem.plan_name}
                      type="checkbox"
                      onChange={(e) => {
                        setPlanName(e.target.checked ? e.target.name : "");
                        setPlanType(e.target.checked);
                      }}
                      name={curElem.plan_name}
                    />
                    <label
                      className="react-switch-label"
                      htmlFor={curElem.plan_name}
                    >
                      <span className={`react-switch-button`} />
                    </label>
                    <span className="plan_Time">
                      {curElem.annual_listing} Listing <br />
                      <span>within 30 days</span>
                    </span>
                  </div>
                </div>

                {/* <p className="dicount">
                  <span>
                    <i class="fa-solid fa-circle-check"></i>
                  </span>{" "}
                  Annually Save ${curElem?.discount}
                </p> */}
                <div className="text-center">
                  {/* <h6>
                  {curElem.plan_name == "Exclusive" &&
                  curElem.monthly_listing == 0
                    ? "Unlimited"
                    : planName === curElem.plan_name &&
                      curElem.plan_name != "Exclusive"
                    ? curElem.annual_listing
                    : curElem.monthly_listing}{" "}
                  Listing
                </h6> */}
                </div>
              </div>
            ) : (
              <div>
                <h6>Email: sales@gasguzzlrs.com</h6>
                <br />
                <h5>1-817-221-8319</h5>
              </div>
            )}
          </div>

          <div className="plan_cardBody">
            <p>
              {planType && planName === curElem.plan_name
                ? curElem.annual_description
                : curElem.monthly_description}
            </p>
          </div>
          {purchagedPlan?.active_plan == curElem.id ? (
            <div className="plan_cardFooter">
              <button
                onClick={() =>
                  handleSubmit({
                    planId: curElem.id,
                    listingType: `${
                      planType && planName === curElem.plan_name
                        ? "annual"
                        : "monthly"
                    }`,
                    name: curElem.plan_name,
                    price: `${
                      planType && planName === curElem.plan_name
                        ? curElem.annual_price
                        : curElem.monthly_price
                    }`,
                    desc: `${
                      planType && planName === curElem.plan_name
                        ? curElem.annual_description
                        : curElem.monthly_description
                    }`,
                    playQuantity: `${
                      planType && planName === curElem.plan_name
                        ? curElem.annual_listing
                        : curElem.monthly_listing
                    }`,
                  })
                }
                className="gry_btn"
              >
                ACTIVE PLAN
              </button>
            </div>
          ) : curElem.monthly_price === 0 ? (
            <div className="plan_cardFooter">
              <button className="gry_btn">CONTACT</button>
            </div>
          ) : purchagedPlan == null ? (
            <div className="plan_cardFooter">
              <button
                onClick={() =>
                  handleSubmit({
                    planId: curElem.id,
                    listingType: `${
                      planType && planName === curElem.plan_name
                        ? "annual"
                        : "monthly"
                    }`,
                    name: curElem.plan_name,
                    price: `${
                      planType && planName === curElem.plan_name
                        ? curElem.annual_price
                        : curElem.monthly_price
                    }`,
                    desc: `${
                      planType && planName === curElem.plan_name
                        ? curElem.annual_description
                        : curElem.monthly_description
                    }`,
                    playQuantity: `${
                      planType && planName === curElem.plan_name
                        ? curElem.annual_listing
                        : curElem.monthly_listing
                    }`,
                  })
                }
                className="gry_btn"
              >
                SUBMIT VEHICLE
              </button>
            </div>
          ) : (
            <div className="plan_cardFooter">
              <button
                onClick={() =>
                  handleSubmit({
                    planId: curElem.id,
                    listingType: `${
                      planType && planName === curElem.plan_name
                        ? "annual"
                        : "monthly"
                    }`,
                    name: curElem.plan_name,
                    price: `${
                      planType && planName === curElem.plan_name
                        ? curElem.annual_price
                        : curElem.monthly_price
                    }`,
                    desc: `${
                      planType && planName === curElem.plan_name
                        ? curElem.annual_description
                        : curElem.monthly_description
                    }`,
                    playQuantity: `${
                      planType && planName === curElem.plan_name
                        ? curElem.annual_listing
                        : curElem.monthly_listing
                    }`,
                  })
                }
                className="gry_btn"
              >
                UPGRADE PLAN
              </button>
            </div>
          )}
        </div>

        <Link to="/works" className="works_btn HIW_BTN">
          The G2 Process
        </Link>
        <div id="PLUS_HIW" className="collapse">
          <ul className="HIW_list mt-4">
            <li>Your submit your vehicle</li>
            <li>We accept the ones that fit</li>
            <li>You pay $499</li>
            <li>We write the auction listing</li>
            <li>You approve</li>
            <li>We schedule the listing</li>
            <li>Your Listing goes live</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default PrivatePartyData;
