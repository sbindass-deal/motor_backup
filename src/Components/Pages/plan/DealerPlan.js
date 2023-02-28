import axios from "axios";
import React, { useState, useRef } from "react";
import { useEffect } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { showModalLogin } from "../../../redux/reducers/login";
import { getPlan } from "../../../redux/reducers/planReducer";

const DealerPlan = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logingUser = useSelector((state) => state);
  const handleScrollAd = useRef(null);
  const [planName, setPlanName] = useState("");
  const [showAdModal, setShowAdModal] = useState(false);
  const [planData, setPlanData] = useState([]);
  const [planType, setPlanType] = useState(false);
  const [showAdShowroom, setShowAdShowroom] = useState(false);
  const [areYouDealerOrSealer, setAreYouDealerOrSealer] = useState(false);
  const [planChacked, setPlanChacked] = useState({
    standard: false,
    pro: false,
    premiere: false,
    exclusive: false,
    classified: false,
    pro1: false,
    pro2: false,
    pro3: false,
    pro4: false,
    auc1: false,
    auc2: false,
    auc3: false,
    auc4: false,
  });
  const [standardPlan, setStandardPlan] = useState(null);
  const [proPlan, setProPlan] = useState(null);
  const [premierPlan, setPremierPlan] = useState(null);
  const [DealerPlan, setClassifiedPlan] = useState(null);
  const [showroomPlan, setShowroomPlan] = useState(null);
  const [userInfo, setUserinfo] = useState({});
  // useEffect(() => {
  //   axios.get(process.env.REACT_APP_URL + `user`).then((res) => {
  //     if (res.data.data) {
  //       setUserinfo(res.data.data);
  //     } else {
  //       setUserinfo(userInfo);
  //     }
  //   });
  // }, []);

  const handleOnChange = (e) => {
    setPlanChacked({ ...planChacked, [e.target.name]: e.target.checked });
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_URL}getAllUserPlan`
        );
        // console.log(11, res.data.data);
        if (res.data.data) {
          const filteredStandard = res.data.data.find(
            (item) => item.planeName === "standard"
          );
          const filteredPro = res.data.data.find(
            (item) => item.planeName === "pro"
          );
          const filteredPremier = res.data.data.find(
            (item) => item.planeName === "premiere"
          );
          const filteredClassified = res.data.data.find(
            (item) => item.planeName === "classified"
          );
          const filteredShowroom = res.data.data.find(
            (item) => item.planeName === "showroom"
          );
          setStandardPlan(filteredStandard);
          setProPlan(filteredPro);
          setPremierPlan(filteredPremier);
          setClassifiedPlan(filteredClassified);
          setShowroomPlan(filteredShowroom);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchUserDetails();
  }, []);
  const goToAddCard = () => {
    handleScrollAd.current.scrollIntoView({ behavior: "smooth", block: "end" });
  };
  // useEffect(() => {
  //   setShowAdModal(true);
  // }, []);
  useEffect(() => {
    setShowAdShowroom(areYouDealerOrSealer);
  }, [areYouDealerOrSealer]);

  const handleShow = () => {
    dispatch(showModalLogin());
  };

  const fetchPlan = async () => {
    await axios
      .post(`${process.env.REACT_APP_URL}get_subscription_plans`, {
        category: "dealer",
      })
      .then(function (response) {
        setPlanData(response.data.data);
        console.log(111, response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchPlan();
  }, []);

  return (
    <>
      <section className="pt_80">
        {/* <div className="container">
          <div className="row">
            <div className="col-12 col-md-8 offset-md-2 text-center pb_30">
              <h2 className="title_combo title_Center">
                Pick Your Listing Type! 
              </h2>
              <p>
                Gas Guzzlrs is the best place to auction your vehicle.
                <br /> Select one of our many Auction Services to showcase your
                vehicle the way you want.
              </p>
              
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12 mb-4 mobile-mt-50">
              <div className="plan_card">
                <div className="plan_cardHead">
                  <h4>Standard</h4>
                  <div className="plan_Price">
                    <div className="dfk">
                      ${planChacked.standard ? 499 : 99}
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
                  <p>
                    Our base package gives you everything you need to sell your
                    vehicle. You fill out our questionnaire, provide us with
                    your pictures and video, and we create a professional
                    auction listing.
                  </p>
                </div>
                <div className="plan_cardFooter">
                  <button
                    onClick={() => {
                      dispatch(
                        getPlan({
                          amount: planChacked.standard ? 499 : 99,
                          list: planChacked.standard ? 5 : 1,
                          valid: planChacked.standard ? 30 : 1,
                          listName: "standard",
                        })
                      );
                      if (logingUser.login.token) {
                        navigate("/vechiles");
                      } else {
                        handleShow();
                      }
                    }}
                    className="gry_btn"
                  >
                    SUBMIT VEHICLE
                  </button>
                </div>
              </div>

              <Link to="/works" className="works_btn HIW_BTN">
                The G2 Process
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
            <div className="col-lg-3 col-md-6 col-sm-12  mb-4 mobile-mt-50">
              <div className="plan_card plan_Plus pro">
                <div className="plan_cardHead">
                  <h4>Pro</h4>
                  <div className="plan_Price">
                    <div className="dfk">
                      ${planChacked.pro ? 1649 : 349}
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
                  <p>
                    Same as the Standard listing except we send out a
                    professional photographer to take pictures of your ride.
                  </p>
                </div>
                <div className="plan_cardFooter">
                  <button
                    onClick={() => {
                      dispatch(
                        getPlan({
                          amount: planChacked.pro ? 1649 : 349,
                          list: planChacked.pro ? 5 : 1,
                          valid: planChacked.pro ? 30 : 1,
                          listName: "pro",
                        })
                      );
                      if (logingUser.login.token) {
                        navigate("/vechiles");
                      } else {
                        handleShow();
                      }
                    }}
                    className="gry_btn"
                  >
                    SUBMIT VEHICLE
                  </button>
                </div>
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
            <div className="col-lg-3 col-md-6 col-sm-12 mb-4 mobile-mt-50">
              <div className="plan_card plan_Plus">
                <div className="plan_cardHead">
                  <h4>Premiere</h4>
                  <div className="plan_Price">
                    <div className="dfk">
                      ${planChacked.premiere ? 2599 : 549}
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
                  <p>
                    Same as Pro but in addition the us taking professional
                    pictures we also make a professional video of your ride.
                  </p>
                </div>
                <div className="plan_cardFooter">
                  <button
                    onClick={() => {
                      dispatch(
                        getPlan({
                          amount: planChacked.premiere ? 2599 : 549,
                          list: planChacked.premiere ? 5 : 1,
                          valid: planChacked.premiere ? 30 : 1,
                          listName: "premiere",
                        })
                      );
                      if (logingUser.login.token) {
                        navigate("/vechiles");
                      } else {
                        handleShow();
                      }
                    }}
                    className="gry_btn"
                  >
                    SUBMIT VEHICLE
                  </button>
                </div>
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
            <div className="col-lg-3 col-md-6 col-sm-12 mb-4 mobile-mt-50">
              <div className="plan_card plan_WhiteGlove">
                <div className="plan_cardHead">
                  <h4>Exclusive</h4>
                  <div className="plan_Price">
                    <div className="dfk">
                      <h5>
                        {planChacked.exclusive
                          ? "1-817-221-8319"
                          : "sales@Gas Guzzlrs.com"}
                      </h5>
                      <div className="switch">
                        <span className="plan_Time">Email</span>
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
                        <span className="plan_Time">Phone number</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="plan_cardBody">
                  <p>
                    If you have an extra-special collector vehicle or an entire
                    collection to sell, We will take care of everything for you;
                    we can even do a live auction for your ride.
                  </p>
                </div>
                <div className="plan_cardFooter">
                  <button className="gry_btn">CONTACT US</button>
                </div>
              </div>

              <Link to="/works" className="works_btn HIW_BTN">
                The G2 Process
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
        </div> */}

        <div className="container">
          <div className="row">
            <div className="col-12 col-md-8 offset-md-2 text-center pb_30">
              <h2 className="title_combo title_Center">Dealer Packages</h2>
              <p>
                Gas Guzzlrs is the best place to auction your vehicle.
                <br /> Select one of our many Auction Services to showcase your
                vehicle the way you want.
              </p>
              {/* <div className="row">
                <div className="col-5">Are you a individual saler?</div>
                <div className="col-2">
                  <div className="switch">
                    <input
                      className="react-switch-checkbox"
                      id={`react-switch-standard`}
                      checked={areYouDealerOrSealer}
                      onChange={(e) =>
                        setAreYouDealerOrSealer(e.target.checked)
                      }
                      name="standard"
                      type="checkbox"
                    />
                    <label
                      className="react-switch-label"
                      htmlFor={`react-switch-standard`}
                    >
                      <span className={`react-switch-button`} />
                    </label>
                  </div>
                </div>
                <div className="col-5">Are you a dealer?</div>
              </div> */}
            </div>
            {/* standard plan */}
            {planData.map((curElem, i) => {
              return (
                <div
                  key={i}
                  className="col-lg-3 col-md-6 col-sm-12  mb-4 mobile-mt-50"
                >
                  <div className="plan_card">
                    <div className="plan_cardHead">
                      <h4>{curElem.plan_name} </h4>
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
                              // checked={planChacked.pro1}
                              // checked={planType}
                              onChange={(e) => {
                                setPlanName(e.target.name);
                                setPlanType(e.target.checked);
                              }}
                              // onChange={handleOnChange}
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
                          <h6>
                            {" "}
                            {curElem.plan_name == "Exclusive" &&
                            curElem.monthly_listing == 0
                              ? "Unlimited"
                              : planName === curElem.plan_name &&
                                curElem.plan_name != "Exclusive"
                              ? curElem.annual_listing
                              : curElem.monthly_listing}{" "}
                            Listing
                          </h6>
                        </div>
                      </div>
                    </div>

                    <div className="plan_cardBody">
                      <p>
                        {planType && planName === curElem.plan_name
                          ? curElem.annual_description
                          : curElem.monthly_description}
                      </p>
                    </div>
                    <div className="plan_cardFooter">
                      <button className="gry_btn">SUBMIT VEHICLE</button>
                    </div>
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
              );
            })}

            {/* pro plan */}

            {/* <div className="col-lg-3 col-md-6 col-sm-12  mb-4 mobile-mt-50">
              <div className="plan_card plan_Plus pro">
                <div className="plan_cardHead">
                  <h4>PRO </h4>
                  <div className="plan_Price">
                    <div className="dfk">
                      ${planChacked.pro2 ? 2739 : 249}
                      <div className="switch">
                        <span className="plan_Time">Monthly</span>
                        <input
                          className="react-switch-checkbox"
                          id={`react-switch-pro2`}
                          type="checkbox"
                          checked={planChacked.pro2}
                          onChange={handleOnChange}
                          name="pro2"
                        />
                        <label
                          className="react-switch-label"
                          htmlFor={`react-switch-pro2`}
                        >
                          <span className={`react-switch-button`} />
                        </label>
                        <span className="plan_Time">Annual</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="plan_cardBody">
                  <p>
                    Same as the Standard listing except we send out a
                    professional photographer to take pictures of your ride.
                  </p>
                </div>
                <div className="plan_cardFooter">
                  <button
                    onClick={() => {
                      dispatch(
                        getPlan({
                          amount: planChacked.pro ? 1649 : 349,
                          list: planChacked.pro ? 5 : 1,
                          valid: planChacked.pro ? 30 : 1,
                          listName: "pro",
                        })
                      );
                      if (logingUser.login.token) {
                        navigate("/vechiles");
                      } else {
                        handleShow();
                      }
                    }}
                    className="gry_btn"
                  >
                    SUBMIT VEHICLE
                  </button>
                </div>
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
            </div> */}
            {/* premier plan */}
            {/* <div className="col-lg-3 col-md-6 col-sm-12  mb-4 mobile-mt-50">
              <div className="plan_card plan_Plus">
                <div className="plan_cardHead">
                  <h4>PREMIERE </h4>
                  <div className="plan_Price">
                    <div className="dfk">
                      ${planChacked.pro3 ? 3289 : 299}
                      <div className="switch">
                        <span className="plan_Time">Monthly</span>
                        <input
                          className="react-switch-checkbox"
                          id={`react-switch-pro3`}
                          type="checkbox"
                          checked={planChacked.pro3}
                          onChange={handleOnChange}
                          name="pro3"
                        />
                        <label
                          className="react-switch-label"
                          htmlFor={`react-switch-pro3`}
                        >
                          <span className={`react-switch-button`} />
                        </label>
                        <span className="plan_Time">Annual</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="plan_cardBody">
                  <p>
                    Same as the Standard listing except we send out a
                    professional photographer to take pictures of your ride.
                  </p>
                </div>
                <div className="plan_cardFooter">
                  <button
                    onClick={() => {
                      dispatch(
                        getPlan({
                          amount: planChacked.pro ? 1649 : 349,
                          list: planChacked.pro ? 5 : 1,
                          valid: planChacked.pro ? 30 : 1,
                          listName: "pro",
                        })
                      );
                      if (logingUser.login.token) {
                        navigate("/vechiles");
                      } else {
                        handleShow();
                      }
                    }}
                    className="gry_btn"
                  >
                    SUBMIT VEHICLE
                  </button>
                </div>
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
            </div> */}
            {/* exclusive plan */}
            {/* <div className="col-lg-3 col-md-6 col-sm-12  mb-4 mobile-mt-50">
              <div className="plan_card plan_WhiteGlove">
                <div className="plan_cardHead">
                  <h4>EXCLUSIVE</h4>
                  <div className="plan_Price">
                    <div className="dfk">
                      ${planChacked.pro4 ? 3850 : 350}
                      <div className="switch">
                        <span className="plan_Time">Monthly</span>
                        <input
                          className="react-switch-checkbox"
                          id={`react-switch-pro4`}
                          type="checkbox"
                          checked={planChacked.pro4}
                          onChange={handleOnChange}
                          name="pro4"
                        />
                        <label
                          className="react-switch-label"
                          htmlFor={`react-switch-pro4`}
                        >
                          <span className={`react-switch-button`} />
                        </label>
                        <span className="plan_Time">Annual</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="plan_cardBody">
                  <p>
                    Same as the Standard listing except we send out a
                    professional photographer to take pictures of your ride.
                  </p>
                </div>
                <div className="plan_cardFooter">
                  <button
                    onClick={() => {
                      dispatch(
                        getPlan({
                          amount: planChacked.pro ? 1649 : 349,
                          list: planChacked.pro ? 5 : 1,
                          valid: planChacked.pro ? 30 : 1,
                          listName: "pro",
                        })
                      );
                      if (logingUser.login.token) {
                        navigate("/vechiles");
                      } else {
                        handleShow();
                      }
                    }}
                    className="gry_btn"
                  >
                    SUBMIT VEHICLE
                  </button>
                </div>
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
            </div> */}
          </div>
        </div>
      </section>
    </>
  );
};

export default DealerPlan;
