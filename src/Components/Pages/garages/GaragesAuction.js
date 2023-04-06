import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Data from "./Data";

const GaragesAuction = ({ userId: id, dealerName, showUserName = true }) => {
  const [userVehicle, setUserVehicle] = useState([]);
  useEffect(() => {
    const fetchDealerInventoryApi = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_URL}dealer_profile/auctions/${id}`
        );
        setUserVehicle(res.data.inventory_vehicle);
      } catch (err) {
        console.log(err);
      }
    };
    fetchDealerInventoryApi();
  }, [id]);

  return (
    <>
      <section className="pt_80 mobileSpec dlr" id="">
        <div className="container">
          <div className="row ">
            {showUserName == true && (
              <div className="col-12 text-center pb_30">
                <h2>{dealerName} Auctions</h2>
              </div>
            )}
            <div className="col-12">
              <div className="row addSection">
                {userVehicle &&
                  userVehicle.map((curElem) => {
                    return <Data key={curElem.id} curElem={curElem} />;
                  })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default GaragesAuction;
