import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Data = () => {
  const [planChecked, setPlanChecked] = useState(false);

  const handleOnChange = (e) => {
    setPlanChecked(e.target.checked);
  };

  return (
    <>
      <div className="col-lg-3 col-md-6 col-sm-12  mb-4 mobile-mt-50">
        <div className="plan_card plan_Plus pro">
          <div className="plan_cardHead">
            <h4>Pro</h4>
            <div className="plan_Price">
              <div className="dfk">
                $ 199
                <div className="switch">
                  <span className="plan_Time">Single Listing</span>
                  <input
                    className="react-switch-checkbox"
                    id={`react-switch-pro`}
                    onChange={(e) => setPlanChecked(e.target.checked)}
                    checked={planChecked}
                    type="checkbox"
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
              Same as the Standard listing except we send out a professional
              photographer to take pictures of your ride.
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
    </>
  );
};

export default Data;
