import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector} from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getPlan } from "../../../redux/reducers/planReducer";
import { notify, strToHtml } from "../../UI/globaleVar";
import parse from "html-react-parser";
import axios from "axios";

const Data = ({ curElem, purchagedPlan }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userinfo, setUserinfo] = useState({});
  const [planName, setPlanName] = useState("");
  const [planType, setPlanType] = useState(false);
  const handleSubmit = (data) => {
    dispatch(getPlan(data));
    navigate("/vechiles");
  };

  const logingUser = useSelector((state) => state);

  const fetchUsrApi = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_URL}user`);
      if (res.data.data) {
        setUserinfo(res.data.data);
      } else {
        setUserinfo(userinfo);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUsrApi();
  }, []);

  return (
    <>
      <div className="col-lg-4 col-md-6 col-sm-12  mb-4 mobile-mt-50">
        <div
          className={`plan_card ${
            curElem.plan_name === "Pro"
              ? "plan_Plus pro"
              : curElem.plan_name === "Premiere"
              ? "plan_Plus"
              : curElem.plan_name === "Exclusive"
              ? "plan_WhiteGlove"
              : ""
          }`}
        >
          <div className="plan_cardHead">
            <h4>{curElem.plan_name} </h4>
            {curElem.monthly_price !== 0 ? (
              <div className="plan_Price">
                <div className="dfk">
                  $
                  {planType && planName === curElem.plan_name
                    ? curElem.annual_price
                    : curElem.monthly_price}
                  <div className="switch">
                    <span className="plan_Time"> Monthly</span>
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
                    <span className="plan_Time"> Annual</span>
                  </div>
                </div>
                <div className="text-center">
                  {/* <p className="dicount">
                    <span>
                      <i class="fa-solid fa-circle-check"></i>
                    </span>{" "}
                    Annually Save ${curElem?.discount}
                  </p> */}

                  <h6>
                    {planName === curElem.plan_name
                      ? curElem.annual_listing == 0
                        ? "Unlimited"
                        : `Up to ${curElem.annual_listing}`
                      : curElem.monthly_listing == 0
                      ? "Unlimited"
                      : `Up to ${curElem.monthly_listing}`}{" "}
                    Listing
                  </h6>
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
                ? parse(curElem?.annual_description, strToHtml)
                : parse(curElem?.monthly_description, strToHtml)}
            </p>
          </div>
          {purchagedPlan?.active_plan == curElem.id ? (
            <div className="plan_cardFooter">
              <button
                onClick={() => {
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
                  });
                }}
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
                onClick={() => {
                  if (userinfo.cn_no !== null && logingUser.login.token && logingUser.login.user.dealer === "Yes") {
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
                    });
                  }
                  else if(!logingUser.login.token){
                    notify(
                      "Please login",
                      409
                    );
                  }
                  else if(logingUser.login.user.dealer !== "Yes"){
                    notify(
                      "Only Dealer can Purchase Subscription",
                      409
                    );
                  }
                  else {
                    notify(
                      "Please submit credit card details in your account",
                      400
                    );
                  }
                }}
                className="gry_btn"
                  >
                    {/* Purchase Subscription */}
                    PURCHASE SUBSCRIPTION
                {/* SUBMIT VEHICLE */}
              </button>
            </div>
          ) : (
            <div className="plan_cardFooter">
              <button
                onClick={() => {
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
                  });
                }}
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

export default Data;
