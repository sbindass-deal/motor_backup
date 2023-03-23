import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import Data from "./Data";
import { useDispatch } from "react-redux";
import { getPlanByDealerSelect } from "../../../redux/reducers/planReducer";

const DealerPlan = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [planData, setPlanData] = useState([]);
  const [callPlanApi, setCallPlanApi] = useState(null);
  const [showTab, setShowTab] = useState({
    auction: true,
    classified: false,
  });
  const [purchagedPlan, setPurchagedPlan] = useState({});

  const fetchPlan = async () => {
    setLoading(true);
    await axios
      .post(`${process.env.REACT_APP_URL}get_subscription_plans`, {
        category: `${showTab.auction ? "dealer" : "classified"}`,
      })
      .then(function (response) {
        if (response.data.status === 200) {
          setPlanData(response.data.data);
          setPurchagedPlan(response.data.purchasePlan);
        }
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        setLoading(false);
      });
  };
  useEffect(() => {
    fetchPlan();
  }, [callPlanApi]);

  useEffect(() => {
    dispatch(getPlanByDealerSelect("auction"));
  }, []);

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
            <div className="nav nav-tabs mb-5 tabPlan">
              <button
                className={`nav-link ${showTab.auction ? "active" : ""}`}
                onClick={() => {
                  setShowTab({
                    auction: true,
                    classified: false,
                  });
                  dispatch(getPlanByDealerSelect("auction"));
                  setCallPlanApi("auction");
                }}
              >
                Auctions
              </button>
              <button
                className={`nav-link ${showTab.classified ? "active" : ""}`}
                onClick={() => {
                  setShowTab({
                    auction: false,
                    classified: true,
                  });
                  dispatch(getPlanByDealerSelect("classified"));
                  setCallPlanApi("classified");
                }}
              >
                Classifieds
              </button>
            </div>
          </nav>

          <div className="tab-content" id="nav-tabContent">
            {showTab.auction && (
              <div>
                <div className="row">
                  {planData.map((curElem, i) => {
                    return (
                      <Data
                        purchagedPlan={purchagedPlan}
                        key={i}
                        curElem={curElem}
                      />
                    );
                  })}
                </div>
              </div>
            )}
            {showTab.classified && (
              <div>
                <div className="row">
                  {planData.map((curElem, i) => {
                    return (
                      <Data
                        key={i}
                        purchagedPlan={purchagedPlan}
                        curElem={curElem}
                      />
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default DealerPlan;
