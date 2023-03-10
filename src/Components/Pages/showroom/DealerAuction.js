import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const DealerAuction = ({ userId: id, dealerName }) => {
  const [userVehicle, setUserVehicle] = useState([]);
  const logingUser = useSelector((state) => state);
  const vehicleData = logingUser.vehicleReducer.vehicleData;

  useEffect(() => {
    const filteredUserVehicle = vehicleData.filter(
      (item) =>
        item.userId === parseInt(id, 10) && item.displayInAuction === "Yes"
    );
    setUserVehicle(filteredUserVehicle);
  }, [id]);

  return (
    <>
      <section className="pt_80 mobileSpec" id="">
        <div className="container">
          <div className="row ">
            <div className="col-12 text-center pb_30">
              <h2>{dealerName} Auctions</h2>
            </div>
            <div className="col-12">
              <div className="col-12 ptb_80 ListDealer auctionBid" style={{}}>
                <div className="row">
                  {userVehicle &&
                    userVehicle.map((curElem) => {
                      return (
                        <div
                          key={curElem.id}
                          className="col-lg-3 col-sm-12 inner-slider"
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
                                  {curElem.model}&nbsp;
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
                                    <label>Ends In:</label> <span>25 days</span>
                                  </li>
                                </ul>
                                <button className="btn bidnW">
                                  Bid now{" "}
                                  <i class="fa-solid fa-arrow-right"></i>
                                </button>
                              </div>
                            </div>
                          </Link>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DealerAuction;
