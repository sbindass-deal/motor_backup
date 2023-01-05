import { ConnectButton } from "@rainbow-me/rainbowkit";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";

const SubmitaVehicle = () => {
  const navigate = useNavigate();
  const [planChacked, setPlanChacked] = useState({
    standard: false,
    pro: false,
    premiere: false,
    exclusive: false,
    classified: false,
    showroom: false,
  });
  const [standardPlan, setStandardPlan] = useState(null);
  const [proPlan, setProPlan] = useState(null);
  const [premierPlan, setPremierPlan] = useState(null);
  const [classifiedPlan, setClassifiedPlan] = useState(null);
  const [showroomPlan, setShowroomPlan] = useState(null);
  const [showPayment, setShowPayment] = useState(false);
  const [planData, setPlanData] = useState({});
  const handleOnChange = (e) => {
    setPlanChacked({ ...planChacked, [e.target.name]: e.target.checked });
  };
  const handleClosePayment = () => {
    setShowPayment(false);
  };
  const handleShowPayment = (data) => {
    setShowPayment(true);
    setPlanData(data);
    console.log(data);
  };

  const handlePlan = () => {
    const { amount, list, valid, listName } = planData;
    axios
      .post(`${process.env.REACT_APP_URL}addUserPlan`, {
        amount,
        listing: list,
        validDate: valid,
        planeName: listName,
      })
      .then((response) => {
        navigate("/vechiles");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onToken = (token, addresses) => {
    console.log(token, addresses);
    if (token !== null) {
      handlePlan();
    }
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
  console.log(11, standardPlan);
  return (
    <>
      <section className="pt_80">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-8 offset-md-2 text-center pb_30">
              <h2 className="title_combo title_Center">
                Pick Your Listing Type!
              </h2>
              <p>
                GasGuzzlrs the best place to auction your vehicle.
                <br /> Choose one of our many Auction Services to showease your
                vehicle the way you want.
                {/* <Link to="/faq" className="link">
                  Click here
                </Link> */}
              </p>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12 mb-4">
              <div className="plan_card">
                <div className="plan_cardHead">
                  <h4>Standard</h4>
                  <div className="plan_Price">
                    {/* ${planone} <span className="plan_Time">Month</span> */}
                    <div className="dfk">
                      ${planChacked.standard ? 199 : 99}
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
                    Our base package that gives you everything you need to sell
                    you vehicle. You fill out our questionnaire, provide us your
                    pictures/video and we create a professional auction listing.
                  </p>
                </div>
                <div className="plan_cardFooter">
                  {standardPlan ? (
                    <button className="gry_btn">SUBMIT VEHICLE</button>
                  ) : (
                    <button
                      onClick={() =>
                        handleShowPayment({
                          amount: planChacked.standard ? 199 : 99,
                          list: planChacked.standard ? 5 : 1,
                          valid: planChacked.standard ? 30 : 1,
                          listName: "standard",
                        })
                      }
                      className="gry_btn"
                    >
                      BUY PLAN
                    </button>
                  )}
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

            <div className="col-lg-3 col-md-6 col-sm-12  mb-4">
              <div className="plan_card plan_Plus pro">
                <div className="plan_cardHead">
                  <h4>Pro</h4>
                  <div className="plan_Price">
                    {/* ${plansecond}
                    <span className="plan_Time">Month</span> */}
                    <div className="dfk">
                      ${planChacked.pro ? 499 : 399}
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
                  {proPlan ? (
                    <Link to="/vechiles" className="gry_btn">
                      SUBMIT VEHICLE
                    </Link>
                  ) : (
                    <button
                      onClick={() =>
                        handleShowPayment({
                          amount: planChacked.pro ? 499 : 399,
                          list: planChacked.pro ? 5 : 1,
                          valid: planChacked.pro ? 30 : 1,
                          listName: "pro",
                        })
                      }
                      className="gry_btn"
                    >
                      BUY PLAN
                    </button>
                  )}
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

            <div className="col-lg-3 col-md-6 col-sm-12 mb-4">
              <div className="plan_card plan_Plus">
                <div className="plan_cardHead">
                  <h4>Premiere</h4>
                  <div className="plan_Price">
                    {/* ${plansecond}
                    <span className="plan_Time">Month</span> */}
                    <div className="dfk">
                      ${planChacked.premiere ? 699 : 599}
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
                  {premierPlan ? (
                    <Link to="/vechiles" className="gry_btn">
                      SUBMIT VEHICLE
                    </Link>
                  ) : (
                    <button
                      onClick={() =>
                        handleShowPayment({
                          amount: planChacked.premiere ? 699 : 599,
                          list: planChacked.premiere ? 5 : 1,
                          valid: planChacked.premiere ? 30 : 1,
                          listName: "premiere",
                        })
                      }
                      className="gry_btn"
                    >
                      BUY PLAN
                    </button>
                  )}
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

            <div className="col-lg-3 col-md-6 col-sm-12 mb-4">
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
                      {/* <div className="Contact_info">
                        <p>+91 7276404909</p>
                        <p>sales@gasguzzles.com</p>
                      </div>  */}
                    </div>
                  </div>
                </div>
                <div className="plan_cardBody">
                  <p>
                    If you have an extra special collector vehicle or an entire
                    collection to sell. We will take care of everything for you,
                    we can even do a live auction for your ride.
                  </p>
                </div>
                <div className="plan_cardFooter">
                  <button className="gry_btn">CONTACT US</button>
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
        <div className="container mt-50">
          <div className="row">
            <div className="col-12 col-md-8 offset-md-2 text-center pb_30">
              <h2 className="title_combo title_Center">Looking for More!</h2>
              <p>
                GasGuzzlrs has got special offers for you.
                <br /> Choose to list ads with us or purchase subscription to
                have your own dedicated showroom fully manage by GasGuzzlrs.
                {/* <Link to="/faq" className="link">
                  Click here
                </Link> */}
              </p>
            </div>

            <div className="col-lg-3"></div>
            <div className="col-lg-3 col-md-6 col-sm-12 mb-4">
              <div className="plan_card">
                <div className="plan_cardHead">
                  <h4>Classified Ads</h4>
                  <div className="plan_Price">
                    {/* ${planone} <span className="plan_Time">Month</span> */}
                    <div className="dfk">
                      ${planChacked.classified ? 899 : 799}
                      <div className="switch">
                        <span className="plan_Time">Single Ads</span>
                        <input
                          className="react-switch-checkbox"
                          id={`react-switch-classified`}
                          checked={planChacked.classified}
                          onChange={handleOnChange}
                          name="classified"
                          type="checkbox"
                        />
                        <label
                          className="react-switch-label"
                          htmlFor={`react-switch-classified`}
                        >
                          <span className={`react-switch-button`} />
                        </label>
                        <span className="plan_Time">
                          5 Ads <small>within 30 Days</small>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="plan_cardBody">
                  <p>
                    Our base package that gives you everything you need to sell
                    you vehicle. You fill out our questionnaire, provide us your
                    pictures/video and we create a professional auction listing.
                  </p>
                </div>
                <div className="plan_cardFooter">
                  {classifiedPlan ? (
                    <button className="gry_btn">SUBMIT VEHICLE</button>
                  ) : (
                    <button
                      onClick={() =>
                        handleShowPayment({
                          amount: planChacked.classified ? 899 : 799,
                          list: planChacked.classified ? 5 : 1,
                          valid: planChacked.classified ? 30 : 1,
                          listName: "classified",
                        })
                      }
                      className="gry_btn"
                    >
                      BUY PLAN
                    </button>
                  )}
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
            <div className="col-lg-3 col-md-6 col-sm-12 mb-4 ">
              <div className="plan_card plan_Plus">
                <div className="plan_cardHead">
                  <h4>Showroom</h4>
                  <div className="plan_Price">
                    {/* ${plansecond}
                      <span className="plan_Time">Month</span> */}
                    <div className="dfk">
                      ${planChacked.showroom ? 1099 : 999}
                      <div className="switch">
                        <span className="plan_Time">Single Ads</span>
                        <input
                          className="react-switch-checkbox"
                          id={`react-switch-showroom`}
                          type="checkbox"
                          checked={planChacked.showroom}
                          onChange={handleOnChange}
                          name="showroom"
                        />
                        <label
                          className="react-switch-label"
                          htmlFor={`react-switch-showroom`}
                        >
                          <span className={`react-switch-button`} />
                        </label>
                        <span className="plan_Time">
                          5 Ads <small>within 30 Days</small>
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
                  {showroomPlan ? (
                    <button className="gry_btn">SUBMIT VEHICLE</button>
                  ) : (
                    <button
                      onClick={() =>
                        handleShowPayment({
                          amount: planChacked.showroom ? 699 : 599,
                          list: planChacked.showroom ? 5 : 1,
                          valid: planChacked.showroom ? 30 : 1,
                          listName: "showroom",
                        })
                      }
                      href="vechiles"
                      className="gry_btn"
                    >
                      BUY PLAN
                    </button>
                  )}
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
            <div className="col-lg-3"></div>
          </div>
        </div>
      </section>
      <Modal show={showPayment} onHide={handleClosePayment} className="payTPop">
        <Modal.Header>
          <Modal.Title>Payment Process</Modal.Title>
          <button variant="secondary" onClick={handleClosePayment}>
            X
          </button>
        </Modal.Header>
        <Modal.Body>
          <div className="processPy">
            <h2> Name : {planData.listName}</h2>
            <h3 className="price__"> Type : {planData.list}</h3>
            <h3 className="price__">Price : ${planData.amount}</h3>

            {/* <small className="ticketCount">1 Ticket = $100</small> */}
            <br />
            <p>Choose Payment Option:</p>
            <div className="ress">
              <div className="ProcessPymt">
                <ConnectButton></ConnectButton>

                {/* <img src={Paypal} />
              <img src={Stipe} /> */}
              </div>
              <div>
                <StripeCheckout
                  className="Btn"
                  stripeKey="pk_test_m9Dp6uaJcynCkZNTNS1nDR8B00AQg2m6vJ"
                  token={onToken}
                />
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SubmitaVehicle;
