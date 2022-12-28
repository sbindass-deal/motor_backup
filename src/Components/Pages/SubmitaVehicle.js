import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { selectPlan } from "../../redux/reducers/submitvechilesReducer";

function SubmitaVehicle() {
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
                Gas Guzzlrs the best place to auction your vehicle.<br/> Choose one of our many Auction Services to showease your vehicle the way you want. {" "}
                <a href="#" className="link">
                  Click here
                </a>
                .
              </p>
            </div>
            <div className="col-12 col-md-4 mb-4">
              <div className="plan_card">
                <div className="plan_cardHead">
                  <h4>Standard</h4>
                  <div className="plan_Price">
                    ${planone} <span className="plan_Time">Month</span>
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

              <button
                data-toggle="collapse"
                data-target="#classNameIC_HIW"
                className="gry_btn HIW_BTN"
              >
                How It Works
              </button>
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
            <div className="col-12 col-md-4 mb-4">
              <div className="plan_card plan_Plus">
                <div className="plan_cardHead">
                  <h4>Plus</h4>
                  <div className="plan_Price">
                    ${plansecond}
                    <span className="plan_Time">Month</span>
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

              <button
                data-toggle="collapse"
                data-target="#PLUS_HIW"
                className="gry_btn HIW_BTN"
              >
                How It Works
              </button>
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
            <div className="col-12 col-md-4 mb-4">
              <div className="plan_card plan_WhiteGlove">
                <div className="plan_cardHead">
                  <h4>Exclusive</h4>
                  <div className="plan_Price">
                    ${planthird} <span className="plan_Time">Year</span>
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

              <button
                data-toggle="collapse"
                data-target="#WHITEGLOVE_HIW"
                className="gry_btn HIW_BTN"
              >
                How It Works
              </button>
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
}

export default SubmitaVehicle;
