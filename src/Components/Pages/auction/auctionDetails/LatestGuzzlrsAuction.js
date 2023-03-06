import React from "react";
import { useState } from "react";

const LatestGuzzlrsAuction = () => {
  const [showAuctionVehicle, setShowAuctionVehicle] = useState(false);
  const [auctonVehicle, setAuctonVehicle] = useState([]);

  return (
    <>
      <div className="box_backgroundD mt-15">
        <h3 className="cardTitle">Latest Guzzlrs Auctions</h3>
        <div
          style={{
            maxHeight: `${showAuctionVehicle ? "100%" : "145vh"}`,
            overflow: "hidden",
          }}
          className="mt-4 pb-3 sidebarPostRow sidebarAuctions"
        >
          {auctonVehicle &&
            auctonVehicle.map((curElem, i) => {
              return (
                <div key={i} className="sidebarPost">
                  <a href="#">
                    <div className="overlay_post">
                      <div className="">
                        <div className="">
                          Current Bid: $
                          {curElem.currentAmount
                            ? curElem.currentAmount.auctionAmmount
                            : curElem.documentFee}
                        </div>
                        <div className="">
                          Ends in:{" "}
                          {curElem.EndTime &&
                            new Date(curElem.EndTime).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div className="sidebarPost_Img">
                      {curElem.images && (
                        <img
                          loading="lazy"
                          src={
                            curElem?.images[0] &&
                            `${process.env.REACT_APP_URL}/${curElem?.images[0]?.imagePath}/${curElem?.images[0]?.imageName}`
                          }
                          onError={({ currentTarget }) => {
                            currentTarget.onError = null;
                            currentTarget.src =
                              "http://www.freeiconspng.com/uploads/no-image-icon-11.PNG";
                          }}
                          alt="Maskgroup1"
                        />
                      )}
                    </div>
                  </a>
                </div>
              );
            })}
        </div>
        <button
          onClick={() => setShowAuctionVehicle(!showAuctionVehicle)}
          className="btn more_"
        >
          {showAuctionVehicle ? "Read Less" : "Read more"}
        </button>
      </div>
    </>
  );
};

export default LatestGuzzlrsAuction;
