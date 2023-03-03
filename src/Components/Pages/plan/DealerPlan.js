import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import Data from "./Data";
import SmallSpinner from "../../UI/SmallSpinner";

const DealerPlan = () => {
  const [loading, setLoading] = useState(false);
  const [planData, setPlanData] = useState([]);

  const fetchPlan = async () => {
    setLoading(true);
    await axios
      .post(`${process.env.REACT_APP_URL}get_subscription_plans`, {
        category: "dealer",
      })
      .then(function (response) {
        setPlanData(response.data.data);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        setLoading(false);
      });
  };
  useEffect(() => {
    fetchPlan();
  }, []);

  if (loading) {
    return <SmallSpinner spin={true} />;
  }

  return (
    <>
      <section className="pt_80">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-8 offset-md-2 text-center pb_30">
              <h2 className="title_combo title_Center">Dealer Packages</h2>
              <p>
                Gas Guzzlrs is the best place to auction your vehicle.
                <br /> Select one of our many Auction Services to showcase your
                vehicle the way you want.
              </p>
            </div>
          </div>
          <nav>
            <div class="nav nav-tabs mb-5 tabPlan" id="nav-tab" role="tablist">
              <button
                class="nav-link active"
                id="nav-home-tab"
                data-bs-toggle="tab"
                data-bs-target="#nav-home"
                type="button"
                role="tab"
                aria-controls="nav-home"
                aria-selected="true"
              >
                Normal
              </button>
              <button
                class="nav-link"
                id="nav-profile-tab"
                data-bs-toggle="tab"
                data-bs-target="#nav-profile"
                type="button"
                role="tab"
                aria-controls="nav-profile"
                aria-selected="false"
              >
                Auction
              </button>
              <button
                class="nav-link"
                id="nav-contact-tab"
                data-bs-toggle="tab"
                data-bs-target="#nav-contact"
                type="button"
                role="tab"
                aria-controls="nav-contact"
                aria-selected="false"
              >
                Classified
              </button>
            </div>
          </nav>
          <div class="tab-content" id="nav-tabContent">
            <div
              class="tab-pane fade show active"
              id="nav-home"
              role="tabpanel"
              aria-labelledby="nav-home-tab"
              tabindex="0"
            >
              <div className="row">
                {planData.map((curElem, i) => {
                  return <Data key={i} curElem={curElem} />;
                })}
              </div>
            </div>
            <div
              class="tab-pane fade"
              id="nav-profile"
              role="tabpanel"
              aria-labelledby="nav-profile-tab"
              tabindex="0"
            >
              <div className="row">
                {planData.map((curElem, i) => {
                  return <Data key={i} curElem={curElem} />;
                })}
              </div>
            </div>
            <div
              class="tab-pane fade"
              id="nav-contact"
              role="tabpanel"
              aria-labelledby="nav-contact-tab"
              tabindex="0"
            >
              <div className="row">
                {planData.map((curElem, i) => {
                  return <Data key={i} curElem={curElem} />;
                })}
              </div>
            </div>
          </div>

          {/* <div className="row">
          
            
            {planData.map((curElem, i) => {
              return <Data key={i} curElem={curElem} />;
            })}
          </div> */}
        </div>
      </section>
    </>
  );
};

export default DealerPlan;
