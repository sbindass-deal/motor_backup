import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { noImage, toCommas } from "../../../UI/globaleVar";

const LatestGuzzlrsAuction = () => {
  const [showAuctionVehicle, setShowAuctionVehicle] = useState(false);
  const [auctonVehicle, setAuctonVehicle] = useState([]);

  useEffect(() => {
    const latestAuctionDataApi = async () => {
      // try {
      //   const res = await axios.get(
      //     `${process.env.REACT_APP_URL}vehicles_all/auction`
      //   );
      //   if (res.data.status === 200) {
      //     setAuctonVehicle(res.data.data);
      //   }
      // } catch (err) {
      //   console.log(err);
      // }
      axios
        .post(`${process.env.REACT_APP_URL}vehicles_all/auction`, {})
        .then(function (res) {
          setAuctonVehicle(res.data.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    };

    latestAuctionDataApi();
  }, []);

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
                <Link
                  to={`/detail/${curElem.id}`}
                  key={i}
                  className="sidebarPost"
                >
                  <div className="overlay_post8">
                    <div className="">
                      <div className="">
                        Current Bid: $
                        {curElem?.currentBid &&
                          toCommas(curElem?.currentBid?.last_bid)}
                      </div>
                      <div className="">
                        Ends in:{" "}
                        {curElem.EndTime &&
                          new Date(curElem.EndTime).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="sidebarPost_Img">
                    {curElem?.image_banner && (
                      <img
                        loading="lazy"
                        src={
                          curElem?.image_banner[0]
                            ? `${process.env.REACT_APP_URL}/${curElem?.image_banner[0]?.imagePath}/${curElem?.image_banner[0]?.imageName}`
                            : noImage
                        }
                        onError={({ currentTarget }) => {
                          currentTarget.onError = null;
                          currentTarget.src = noImage;
                        }}
                        alt="Maskgroup1"
                      />
                    )}
                  </div>
                </Link>
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
