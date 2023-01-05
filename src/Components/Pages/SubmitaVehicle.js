import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { selectPlan } from "../../redux/reducers/submitvechilesReducer";

const SubmitaVehicle = () => {
  const [planChacked, setPlanChacked] = useState({
    standard: false,
    pro: false,
    premiere: false,
    exclusive: false,
  });
  const [planone, setp1] = React.useState(0);
  const [plansecond, setp2] = React.useState(0);
  const [planthird, setp3] = React.useState(0);
  const dispatch = useDispatch();

  React.useEffect(() => {
    axios.get(process.env.REACT_APP_URL + "plans").then((response) => {
      setp1(response.data.data[0].price);
      setp2(response.data.data[1].price);
      setp3(response.data.data[2].price);
    });
  }, []);
  const handleOnChange = (e) => {
    setPlanChacked({ ...planChacked, [e.target.name]: e.target.checked });
  };
  return (
    <div>
      <section className="pt_80">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-8 offset-md-2 text-center pb_30">
              <h2 className="title_combo title_Center">
                Pick Your Listing Type!
              </h2>
              <p>
                Gas Guzzlrs the best place to auction your vehicle.
                <br /> Choose one of our many Auction Services to showease your
                vehicle the way you want.
                {/* <Link to="/faq" className="link">
                  Click here
                </Link> */}
              </p>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-12 mb-4">
              <div className="plan_card">
                <div className="plan_cardHead">
                  <h4>Standard</h4>
                  <div className="plan_Price">
                    {/* ${planone} <span className="plan_Time">Month</span> */}
                    <div className="dfk">
                      ${planChacked.standard ? 349 : 159}
                      <div className="switch">
                        <span className="plan_Time">Single Listing</span>
                        <input
                          className="react-switch-checkbox"
                          id={`react-switch-standard`}
                          checked={planChacked.standard}
                          onChange={handleOnChange}
                          name="standard"
                          type="checkbox"
                        />
                        <label
                          className="react-switch-label"
                          htmlFor={`react-switch-standard`}
                        >
                          <span className={`react-switch-button`} />
                        </label>
                        <span className="plan_Time">
                          5 Listing <small>within 30 Days</small>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="plan_cardBody">
                  <ul className="plan_point">
                    <li>Lorem Ipsum is simply dummy text</li>
                    <li>Printing and typesetting industry</li>
                    <li>Lorem Ipsum has been the industry's</li>
                    <li>Standard dummy text</li>
                    <li>Lorem Ipsum is simply</li>
                    <li>Type and scrambled</li>
                  </ul>
                </div>
                <div className="plan_cardFooter">
                  <a
                    onClick={() => dispatch(selectPlan(planone))}
                    href="vechiles"
                    className="gry_btn"
                  >
                    SUBMIT VEHICLE
                  </a>
                </div>
              </div>

              <Link
                to="/works"
                // data-toggle="collapse"
                // data-target="#classNameIC_HIW"
                className="gry_btn HIW_BTN"
              >
                How It Works
              </Link>
              <div id="classNameIC_HIW" className="collapse">
                <ul className="HIW_list mt-4">
                  <li>Your submit your vehicle</li>
                  <li>We accept the ones that fit</li>
                  <li>You pay $99</li>
                  <li>We write the auction listing</li>
                  <li>You approve</li>
                  <li>We schedule the listing</li>
                  <li>Your Listing goes live</li>
                </ul>
              </div>
            </div>

            <div className="col-lg-3 col-md-3 col-sm-12  mb-4">
              <div className="plan_card plan_Plus pro">
                <div className="plan_cardHead">
                  <h4>Pro</h4>
                  <div className="plan_Price">
                    {/* ${plansecond}
                    <span className="plan_Time">Month</span> */}
                    <div className="dfk">
                      ${planChacked.pro ? 399 : 199}
                      <div className="switch">
                        <span className="plan_Time">Single Listing</span>
                        <input
                          className="react-switch-checkbox"
                          id={`react-switch-pro`}
                          type="checkbox"
                          checked={planChacked.pro}
                          onChange={handleOnChange}
                          name="pro"
                        />
                        <label
                          className="react-switch-label"
                          htmlFor={`react-switch-pro`}
                        >
                          <span className={`react-switch-button`} />
                        </label>
                        <span className="plan_Time">
                          5 Listing <small>within 30 Days</small>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="plan_cardBody">
                  <ul className="plan_point">
                    <li>Lorem Ipsum is simply dummy text</li>
                    <li>Printing and typesetting industry</li>
                    <li>Lorem Ipsum has been the industry's</li>
                    <li>Standard dummy text</li>
                    <li>Lorem Ipsum is simply</li>
                    <li>Type and scrambled</li>
                  </ul>
                </div>
                <div className="plan_cardFooter">
                  <a
                    onClick={() => dispatch(selectPlan(planone))}
                    href="vechiles"
                    className="gry_btn"
                  >
                    SUBMIT VEHICLE
                  </a>
                </div>
              </div>

              <Link
                to="/works"
                // data-toggle="collapse"
                // data-target="#classNameIC_HIW"
                className="gry_btn HIW_BTN"
              >
                How It Works
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

            <div className="col-lg-3 col-md-3 col-sm-12 mb-4">
              <div className="plan_card plan_Plus">
                <div className="plan_cardHead">
                  <h4>Premiere</h4>
                  <div className="plan_Price">
                    {/* ${plansecond}
                    <span className="plan_Time">Month</span> */}
                    <div className="dfk">
                      ${planChacked.premiere ? 799 : 499}
                      <div className="switch">
                        <span className="plan_Time">Single Listing</span>
                        <input
                          className="react-switch-checkbox"
                          id={`react-switch-premiere`}
                          type="checkbox"
                          checked={planChacked.premiere}
                          onChange={handleOnChange}
                          name="premiere"
                        />
                        <label
                          className="react-switch-label"
                          htmlFor={`react-switch-premiere`}
                        >
                          <span className={`react-switch-button`} />
                        </label>
                        <span className="plan_Time">
                          5 Listing <small>within 30 Days</small>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="plan_cardBody">
                  <ul className="plan_point">
                    <li>Lorem Ipsum is simply dummy text</li>
                    <li>Printing and typesetting industry</li>
                    <li>Lorem Ipsum has been the industry's</li>
                    <li>Standard dummy text</li>
                    <li>Lorem Ipsum is simply</li>
                    <li>Type and scrambled</li>
                  </ul>
                </div>
                <div className="plan_cardFooter">
                  <a
                    onClick={() => dispatch(selectPlan(planone))}
                    href="vechiles"
                    className="gry_btn"
                  >
                    SUBMIT VEHICLE
                  </a>
                </div>
              </div>

              <Link
                to="/works"
                // data-toggle="collapse"
                // data-target="#classNameIC_HIW"
                className="gry_btn HIW_BTN"
              >
                How It Works
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

            <div className="col-lg-3 col-md-3 col-sm-12 mb-4">
              <div className="plan_card plan_WhiteGlove">
                <div className="plan_cardHead">
                  <h4>Exclusive</h4>
                  <div className="plan_Price">
                    {/* ${planthird} <span className="plan_Time">Year</span> */}
                    <div className="dfk">
                      <h5>
                        {planChacked.exclusive
                          ? "68767898943"
                          : "Example@gmail.com"}
                      </h5>
                      <div className="switch">
                        <span className="plan_Time">Single Listing</span>
                        <input
                          className="react-switch-checkbox"
                          id={`react-switch-exclusive`}
                          type="checkbox"
                          checked={planChacked.exclusive}
                          onChange={handleOnChange}
                          name="exclusive"
                        />
                        <label
                          className="react-switch-label"
                          htmlFor={`react-switch-exclusive`}
                        >
                          <span className={`react-switch-button`} />
                        </label>
                        <span className="plan_Time">
                          5 Listing <small>within 30 Days</small>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="plan_cardBody">
                  <ul className="plan_point">
                    <li>Lorem Ipsum is simply dummy text</li>
                    <li>Printing and typesetting industry</li>
                    <li>Lorem Ipsum has been the industry's</li>
                    <li>Standard dummy text</li>
                    <li>Lorem Ipsum is simply</li>
                    <li>Type and scrambled</li>
                  </ul>
                </div>
                <div className="plan_cardFooter">
                  <a
                    onClick={() => dispatch(selectPlan(planone))}
                    href="vechiles"
                    className="gry_btn"
                  >
                    SUBMIT VEHICLE
                  </a>
                </div>
              </div>

              <Link
                to="/works"
                // data-toggle="collapse"
                // data-target="#classNameIC_HIW"
                className="gry_btn HIW_BTN"
              >
                How It Works
              </Link>
              <div id="WHITEGLOVE_HIW" className="collapse">
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
          </div>
        </div>
      </section>
    </div>
  );
};

export default SubmitaVehicle;
