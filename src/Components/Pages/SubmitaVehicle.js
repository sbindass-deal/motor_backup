import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getPlan } from "../../redux/reducers/planReducer";

const SubmitaVehicle = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showAdModal, setShowAdModal] = useState(false);
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
  useEffect(() => {
    setShowAdModal(true);
  }, []);

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
                GasGuzzlrs is the best place to auction your vehicle.
                <br /> Choose one of our many Auction Services to showcase your
                vehicle the way you want.
              </p>
            </div>
            {/* standard plan */}
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
                      navigate("/vechiles");
                    }}
                    className="gry_btn"
                  >
                    SUBMIT VEHICLE
                  </button>
                </div>
              </div>

              <Link to="/works" className="gry_btn HIW_BTN">
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
            {/* pro plan */}
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
                      navigate("/vechiles");
                    }}
                    className="gry_btn"
                  >
                    SUBMIT VEHICLE
                  </button>
                </div>
              </div>

              <Link to="/works" className="gry_btn HIW_BTN">
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
            {/* premier plan */}
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
                      navigate("/vechiles");
                    }}
                    className="gry_btn"
                  >
                    SUBMIT VEHICLE
                  </button>
                </div>
              </div>

              <Link to="/works" className="gry_btn HIW_BTN">
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
            {/* exclusive plan */}
            <div className="col-lg-3 col-md-6 col-sm-12 mb-4 mobile-mt-50">
              <div className="plan_card plan_WhiteGlove">
                <div className="plan_cardHead">
                  <h4>Exclusive</h4>
                  <div className="plan_Price">
                    <div className="dfk">
                      <h5>
                        {planChacked.exclusive
                          ? "1-817-221-8319"
                          : "sales@gasguzzlrs.com"}
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

              <Link to="/works" className="gry_btn HIW_BTN">
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
        <div className="container mt-80">
          <div className="row">
            <div className="col-12 col-md-8 offset-md-2 text-center pb_30">
              <h2 className="title_combo title_Center">Looking for More!</h2>
              <p>
                GasGuzzlrs has got special offers for you.
                <br /> Choose to list ads with us or purchase subscription to
                have your own dedicated showroom fully manage by GasGuzzlrs.
              </p>
            </div>
            <div className="col-lg-3"></div>
            {/* classified plan */}
            <div className="col-lg-3 col-md-6 col-sm-12 mb-4 mobile-mt-50">
              <div className="plan_card">
                <div className="plan_cardHead">
                  <h4>Classified Ads</h4>
                  <div className="plan_Price">
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
                  <button
                    onClick={() => {
                      dispatch(
                        getPlan({
                          amount: planChacked.classified ? 899 : 799,
                          list: planChacked.classified ? 5 : 1,
                          valid: planChacked.classified ? 30 : 1,
                          listName: "classified",
                        })
                      );
                      navigate("/vechiles");
                    }}
                    className="gry_btn"
                  >
                    SUBMIT VEHICLE
                  </button>
                </div>
              </div>

              <Link to="/works" className="gry_btn HIW_BTN">
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
            {/* showroom plan */}
            <div
              id="addShowroom"
              className="col-lg-3 col-md-6 col-sm-12 mb-4 mobile-mt-50"
            >
              <div className="plan_card plan_Plus">
                <div className="plan_cardHead">
                  <h4>Showroom</h4>
                  <div className="plan_Price">
                    <div className="dfk">
                      ${planChacked.showroom ? 1099 : 999}
                      <div className="switch">
                        <span className="plan_Time">Monthly</span>
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
                          Yearly <small>Unlimited</small>
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
                          amount: planChacked.showroom ? 699 : 599,
                          list: planChacked.showroom ? 5 : 1,
                          valid: planChacked.showroom ? 30 : 1,
                          listName: "showroom",
                        })
                      );
                      navigate("/vechiles");
                    }}
                    className="gry_btn"
                  >
                    SUBMIT VEHICLE
                  </button>
                </div>
              </div>

              <Link to="/works" className="gry_btn HIW_BTN">
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
      <Modal
        show={showAdModal}
        onHide={() => setShowAdModal(false)}
        className="modal fade bg-pop"
        id="loginModal"
        centered
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header border-0">
              <h4 className="modal-title"> </h4>
              <button
                onClick={() => setShowAdModal(false)}
                type="button"
                className="close"
                data-dismiss="modal"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            <div className="modal-body">
              <div className="ar popBtn">
                <a
                  onClick={() => setShowAdModal(false)}
                  href="#addShowroom"
                  className="btn questionBtn"
                >
                  Are you an individual private seller ?
                </a>

                <button type="button" className="btn">
                  Are you a dealer?
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default SubmitaVehicle;
