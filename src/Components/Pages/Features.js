import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import icGrid from "../../Assets/images/icGrid.svg";
import img_01 from "../../Assets/images/img_01.jpg";
import NotAvailable from "../UI/NotAvailable";
import ResultNotFound from "../UI/ResultNotFound";
import SmallSpinner from "../UI/SmallSpinner";

const Features = () => {
  const logingUser = useSelector((state) => state);
  const vehicleDatas = logingUser.vehicleReducer.vehicleData;

  const [vehicleData, setVehicleData] = useState([]);
  const [setData, setSetData] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [viewListActive, setViewListActive] = useState(false);
  const [highlightWatch, setHighlightWatch] = useState(false);
  useEffect(() => {
    const filteredData = vehicleDatas.filter(
      (item) =>
        item.displayInAuction === "Yes" &&
        item.auctionType === "Premium listing"
    );
    setVehicleData(filteredData);
  }, [vehicleDatas]);

  const addFabrity = (id) => {
    axios
      .post(process.env.REACT_APP_URL + "createLikes", {
        vehicleId: id,
        date: new Date().toString(),
      })
      .then((res) => {
        if (res.data.status === 200) {
          setSetData(!setData);
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

  if (loading) {
    return <SmallSpinner spin={true} />;
  }

  return (
    <div>
      <section className="ptb_80 pt_sm_50">
        {vehicleData.length === 0 ? (
          <NotAvailable text="Vehicle is not available!" />
        ) : (
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
                      <img src={icGrid} />
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
                        <div className="card_postImg">
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
                          <p>{curElem.description}</p>
                          <ul className="labelList">
                            <li>
                              <label>Current Bid:</label>{" "}
                              <span>${curElem.documentFee}</span>
                            </li>
                            <li>
                              <label>Ends In:</label>{" "}
                              <span>
                                {curElem.EndTime &&
                                  new Date(curElem.EndTime).toDateString()}
                              </span>
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

export default Features;
