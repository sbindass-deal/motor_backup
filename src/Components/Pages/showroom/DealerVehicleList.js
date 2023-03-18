import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Data from "./Data";

const DealerVehicleList = ({ userId: id, dealerName }) => {
  const [userVehicle, setUserVehicle] = useState([]);
  const loginUser = useSelector((state) => state);
  useEffect(() => {
    const fetchDealerInventoryApi = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_URL}/vehicles/${id}`
        );
        setUserVehicle(res.data.auction_vehicle);
      } catch (err) {
        console.log(err);
      }
    };
    fetchDealerInventoryApi();
  }, [id]);

  return (
    <>
      <section className="pt_80 mobileSpec" id="">
        <div className="container">
          <div className="row ">
            <div className="col-12 text-center pb_30">
              <h2>{dealerName} Inventory</h2>
            </div>
          </div>
          <div className="row addSection">
            <div className="col-12 col-lg-12 mb-50">
              <ul className="postTopOption">
                <li className="post_search">
                  <input
                    type="text"
                    autoComplete="off"
                    name="search"
                    placeholder="Search for a make or model"
                  />
                </li>
                <li className="">
                  <button type="button" className="gry_btn">
                    <i className="fa-solid fa-filter mr-2"></i>
                    Filters
                  </button>
                </li>
              </ul>
            </div>
            {userVehicle.length > 0 &&
              userVehicle.map((curElem) => {
                return <Data key={curElem.id} curElem={curElem} />;
              })}
          </div>
        </div>
      </section>
    </>
  );
};

export default DealerVehicleList;
