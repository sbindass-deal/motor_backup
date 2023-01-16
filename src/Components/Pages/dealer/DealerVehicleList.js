import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Maskgroup1 from "../../../Assets/images/Maskgroup1.png";
import ttttt from "../../../Assets/images/ttttt.png";

const DealerVehicleList = ({ userId: id }) => {
  const [userVehicle, setUserVehicle] = useState([]);
  const logingUser = useSelector((state) => state);
  const vehicleData = logingUser.vehicleReducer.vehicleData;

  useEffect(() => {
    const filteredUserVehicle = vehicleData.filter(
      (item) => item.userId === parseInt(id, 10)
    );
    setUserVehicle(filteredUserVehicle);
  }, [id]);

  return (
    <>
      <section className="pt_80 mobileSpec" id="">
        <div className="container">
          <div className="row ">
            <div className="col-12 text-center pb_30">
              <h2>Texan Auto Group Inventory</h2>
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
            {userVehicle &&
              userVehicle.map((curElem) => {
                return (
                  <div
                    key={curElem.id}
                    className="col-lg-6 col-sm-12 inner-slider"
                  >
                    <Link
                      to={
                        curElem.displayInAuction === "Yes"
                          ? `/detail/${curElem.id}`
                          : `/showroom/${curElem.id}`
                      }
                    >
                      <div className="card_post">
                        <div className="card_postImg dlr">
                          {curElem.images[0] ? (
                            <img
                              src={
                                curElem.images[0] &&
                                `${process.env.REACT_APP_URL}/${curElem.images[0].imagePath}/${curElem.images[0].imageName}`
                              }
                              onError={({ currentTarget }) => {
                                currentTarget.onError = null;
                                currentTarget.src =
                                  "http://www.freeiconspng.com/uploads/no-image-icon-11.PNG";
                              }}
                              alt="Maskgroup1"
                            />
                          ) : (
                            <img
                              src="http://www.freeiconspng.com/uploads/no-image-icon-11.PNG"
                              alt="Maskgroup1"
                            />
                          )}
                        </div>
                        <div className="card_postInfo">
                          <h5>
                            {curElem.make} &nbsp;
                            {curElem.model} &nbsp;
                            {curElem.year}
                          </h5>

                          <ul className="labelList">
                            <li>
                              <label>Current Bid:</label>{" "}
                              <span>
                                $
                                {curElem.currentAmount
                                  ? curElem.currentAmount.auctionAmmount
                                  : 0}
                              </span>
                            </li>
                            <li>
                              <label>Ends In:</label> <span>5 days</span>
                            </li>
                          </ul>
                          <button className="btn bidnW">
                            Bid now <i class="fa-solid fa-arrow-right"></i>
                          </button>
                        </div>
                      </div>
                      <small>Guzzlrs AD</small>
                    </Link>
                  </div>
                );
              })}

            {/* <div className="col-lg-6 col-sm-12 inner-slider">
              <a href="https://www.texascarsdirect.com/used-mercedes-benz-dallas-tx.html">
                <div className="card_post">
                  <div className="card_postImg dlr">
                    <img src={ttttt} alt="ttttt" />
                  </div>
                  <div className="card_postInfo">
                    <h5>2015 Audi Q7 </h5>

                    <ul className="labelList">
                      <li>
                        <label>Current Bid:</label> <span>$126,888</span>
                      </li>
                      <li>
                        <label>Ends In:</label> <span>5 days</span>
                      </li>
                    </ul>
                    <button className="btn bidnW">
                      Bid now <i class="fa-solid fa-arrow-right"></i>
                    </button>
                  </div>
                </div>
                <small>Dealer AD</small>
              </a>
            </div> */}
          </div>
        </div>
      </section>
    </>
  );
};

export default DealerVehicleList;
