import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import SmallSpinner from "../../UI/SmallSpinner";
import Data from "./Data";
import PrivatePartyData from "./PrivatePartyData";

const PrivateParty = () => {
  const [loading, setLoading] = useState(false);
  const [planData, setPlanData] = useState([]);

  const fetchPlan = async () => {
    setLoading(true);
    await axios
      .post(`${process.env.REACT_APP_URL}get_subscription_plans`, {
        category: "user",
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
              <h2 className="title_combo title_Center">
                Pick Your Listing Type!
              </h2>
              <p>
                Gas Guzzlrs is the best place to auction your vehicle.
                <br /> Select one of our many Auction Services to showcase your
                vehicle the way you want.
              </p>
            </div>
            {planData.map((curElem, i) => {
              return (
                <PrivatePartyData key={i} loading={loading} curElem={curElem} />
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default PrivateParty;
