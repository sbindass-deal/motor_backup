import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Dealer from "./Dealer";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Inventory from "./Inventory";

const Store = () => {
  const navigate = useNavigate();
  const logingUser = useSelector((state) => state);
  const vehicleData = logingUser.vehicleReducer.vehicleData;
  const [latestBid, setLatestBid] = useState([]);
  const [showImage, setShowImage] = useState(0);

  const handleLatestBid = async () => {
    try {
      const response = await axios.get(process.env.REACT_APP_URL + "lastBid");
      setLatestBid(response.data.data);
      if (response.data.data) {
        const filteredData = vehicleData
          .filter(
            (item) =>
              response.data.data.indexOf(item.id.toString()) !== -1 && item
          )
          .map((data) => data);
        setLatestBid(filteredData);
      } else {
        setLatestBid([]);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    handleLatestBid();
  }, [vehicleData]);
  return (
    <>
      <Dealer />
      {/* <section className="pt_80 mobileSpec" id="">
        <div className="container">
          <div className="row ">
            <div className="col-12 text-center pb_30">
              <h2>Latest Bids</h2>
            </div>
            <div className="col-12 Latest_B ">
              <ul className="img_sec">
                <li>
                  <Link to="/showroom" className="img_1">
                    {latestBid.length > 0 && latestBid[showImage].images[0] ? (
                      <img
                        src={
                          latestBid[showImage].images[showImage] &&
                          `${process.env.REACT_APP_URL}/${latestBid[showImage].images[showImage].imagePath}/${latestBid[showImage].images[showImage].imageName}`
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
                  </Link>
                </li>
              </ul>

              <div className="infoCar">
                <div className="table-responsive">
                  <table className="" width={"100%"}>
                    {latestBid.length > 0 &&
                      latestBid.map((curElem, i) => {
                        return (
                          <tr
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              navigate(
                                curElem.displayInAuction === "Yes"
                                  ? `/detail/${curElem.id}`
                                  : `/showroom/${curElem.id}`
                              );
                            }}
                            onMouseOver={() => setShowImage(i)}
                            key={curElem.id}
                          >
                            <td>
                              {curElem.make}
                              {curElem.modal}
                              {curElem.year}
                            </td>
                            <td>${curElem.documentFee}</td>
                            <td>3 days</td>
                          </tr>
                        );
                      })}
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      <Inventory />
    </>
  );
};

export default Store;
