import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import icGrid from "../../../Assets/images/icGrid.svg";
import { clearData } from "../../../redux/reducers/vehicleReducer";
import NotAvailable from "../../UI/NotAvailable";
import ResultNotFound from "../../UI/ResultNotFound";
const Charity = () => {
  const dispatch = useDispatch();
  const logingUser = useSelector((state) => state);
  const vehicleDatas = logingUser.vehicleReducer.vehicleData;

  const [vehicleData, setVehicleData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [viewListActive, setViewListActive] = useState(false);
  const [highlightWatch, setHighlightWatch] = useState(false);
  useEffect(() => {
    const filteredData = vehicleDatas.filter(
      (item) =>
        item.displayInAuction === "Yes" && item.auctionType === "For charity"
    );
    setVehicleData(filteredData);
  }, [vehicleData]);

  const addFabrity = (id) => {
    axios
      .post(process.env.REACT_APP_URL + "createLikes", {
        vehicleId: id,
        date: new Date().toString(),
      })
      .then((res) => {
        if (res.data.status === 200) {
          dispatch(clearData());
          window.location.reload(false);
        }
      });
  };

  const filteredData = (
    vehicleData.length > 0 && highlightWatch
      ? vehicleData.filter((item) => item.like > 0)
      : vehicleData
  ).filter((item) =>
    item.make
      ? item.make.toLowerCase().includes(searchValue) ||
        item.model.toLowerCase().includes(searchValue) ||
        item.year.includes(searchValue)
      : item
  );

  return (
    <div>
      <section className="heroSection charity d-flex align-items-center">
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-8 offset-lg-2">
              <div className="heroText">
                <h1>Charity Auctions</h1>
                <h5>
                  Are you interested in benefitting a charity by offering a
                  vehicle on Gas Guzzlrs Auctions? We can do that!
                </h5>
                {/* <a href="#" className="btn">
                  Notify me when one is listed
                </a>
                <a href="#" className="btn bg-dark">
                  Have one? Sell yours here
                </a> */}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="ptb_80 pt_sm_50">
        {vehicleData.length > 0 && (
          <div className="container">
            <div className="row">
              <div className="col-12">
                <ul className="postTopOption">
                  <li className="post_search">
                    <input
                      type="search"
                      name="search"
                      value={searchValue}
                      onChange={(e) =>
                        setSearchValue(e.target.value.toLowerCase())
                      }
                      placeholder="Filter auctions for make, model, category…"
                    />
                  </li>
                  <li className="">
                    <button
                      onClick={() => setHighlightWatch(!highlightWatch)}
                      type="button"
                      className={`gry_btn ${highlightWatch && "active"}`}
                    >
                      <i className="fa-solid fa-heart mr-2"></i>
                    </button>
                  </li>
                  <li className="d-flex">
                    <button
                      onClick={() => setViewListActive(false)}
                      type="button"
                      className={`gry_btn gridView ${
                        !viewListActive ? "active" : ""
                      }`}
                    >
                      <img src={icGrid} loading="lazy" />
                    </button>
                    <button
                      onClick={() => setViewListActive(true)}
                      type="button"
                      className={`gry_btn listView ${
                        viewListActive ? "active" : ""
                      }`}
                    >
                      <i className="fa-sharp fa-solid fa-list"></i>
                    </button>
                  </li>
                  {/* <li className="">
                  <select className="post_select">
                    <option>Ending Soonest</option>
                    <option>Bid: Low to High</option>
                    <option>Bid: High to Low</option>
                    <option>Ending Latest</option>
                    <option>Closest to postal code...</option>
                  </select>
                </li> */}
                </ul>
              </div>
            </div>

            <div
              className={`row pt-4 row_gridList ${
                viewListActive && "activeListView"
              }`}
            >
              {filteredData.length <= 0 ? (
                <ResultNotFound text="Result not found! 🙄" />
              ) : (
                filteredData.map((curElem) => {
                  return (
                    <div className="col-12 col-md-6 pb-3">
                      <div className="card_post">
                        <div className="card_postImg car_image">
                          <button
                            onClick={() => addFabrity(curElem.id)}
                            type="button"
                            className="watchedIc"
                          >
                            <i
                              className={`fa-solid fa-star ${
                                curElem.like >= 1 ? "faList" : ""
                              }`}
                            ></i>
                          </button>
                          <Link to={`/detail/${curElem.id}`}>
                            {curElem.images[0] ? (
                              <img
                                loading="lazy"
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
                                loading="lazy"
                                src="http://www.freeiconspng.com/uploads/no-image-icon-11.PNG"
                                alt="Maskgroup1"
                              />
                            )}
                          </Link>
                        </div>
                        <div className="card_postInfo">
                          <h4>
                            <a href="detail.html">
                              {curElem.make}
                              {curElem.model}
                              {curElem.year}
                            </a>
                          </h4>
                          <p>{curElem.moreDescription}</p>
                          <ul className="labelList">
                            <li>
                              <label>Current Bid:</label>{" "}
                              <span>${curElem.documentFee}</span>
                            </li>
                            <li>
                              {parseInt(
                                new Date(curElem.EndTime).getTime(),
                                10
                              ) -
                                parseInt(new Date().getTime(), 10) >
                                0 && curElem.approved === "1" ? (
                                <label>Auction Open</label>
                              ) : parseInt(
                                  new Date(curElem.EndTime).getTime(),
                                  10
                                ) -
                                  parseInt(new Date().getTime(), 10) >
                                  0 &&
                                (curElem.approved === null ||
                                  curElem.approved === "11") ? (
                                <label>Upcoming Auction</label>
                              ) : (
                                <label>Auction Closed</label>
                              )}
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default Charity;