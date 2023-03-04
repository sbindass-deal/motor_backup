import React, { useEffect, useState } from "react";
import icGrid from "../../../Assets/images/icGrid.svg";
import axios from "axios";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { clearData } from "../../../redux/reducers/vehicleReducer";
const AuctionNoReserve = () => {
  const dispatch = useDispatch();
  const logingUser = useSelector((state) => state);
  const vehicleData = logingUser.vehicleReducer.vehicleData;
  const [data, setauctions] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [viewListActive, setViewListActive] = useState(false);
  const [highlightWatch, setHighlightWatch] = useState(false);

  const fetchNoreserveData = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_URL}vehicles_all/no_reserve`
      );
      setauctions(res.data.data);
      setFilteredUsers(res.data.data);
      setauctions(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchNoreserveData();
  }, []);
  useEffect(() => {
    // const fetchNoResurveApi = async () => {
    //   try {
    //     const res = await axios.get(`${process.env.REACT_APP_URL}noreserve`);
    //     console.log(111, res.data.data);
    //     // setauctions(res.data.data);
    //     // setFilteredUsers(res.data.data);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // };
    // fetchNoResurveApi();
    const filteredAuctionVehicle = vehicleData.filter(
      (item) => item.displayInAuction === "Yes"
    );
    // setauctions(filteredAuctionVehicle);
    // setFilteredUsers(filteredAuctionVehicle);
    console.log(1111, filteredAuctionVehicle);
  }, [vehicleData]);

  const getEndDate = (cal) => {
    let data = cal.split("T");
    let endDate = moment().format("YYYY-MM-DD");
    let startDate = moment(data[0]).add(5, "days").format("YYYY-MM-DD");

    return startDate.toString();
  };
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

  return (
    <>
      <section className="ptb_80 pt_sm_50">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center pb_30">
              <h2 className="title_combo title_Center">
                Auctions No Reserve{" "}
                <span>
                  {data.length}&nbsp;
                  AUCTIONS NOW LIVE
                </span>
              </h2>
            </div>
            <div className="col-12">
              <ul className="postTopOption">
                <li className="post_search">
                  <input
                    value={searchValue}
                    onChange={(e) => {
                      setSearchValue(e.target.value);
                    }}
                    type="text"
                    name=""
                    placeholder="Filter auctions for make, model, category…"
                  />
                </li>
                <li className="">
                  <button
                    onClick={() => setHighlightWatch(!highlightWatch)}
                    type="button"
                    className={`gry_btn ${highlightWatch && "active"}`}
                  >
                    {/* <i className="fa-solid fa-heart "></i> */}
                    <i class="fa-solid fa-star mr-2"></i>Watch
                  </button>
                </li>
                <li className="d-flex gv">
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
            {data.length > 0 &&
              data.map((curElem) => {
                return (
                  <div
                    key={curElem.id}
                    className="col-12 col-lg-6 col-md-6 pb-3 auctionLive"
                  >
                    <div className="card_post">
                      <div className="card_postImg">
                        <div className="list_wrapper">
                          <Link
                            className="auction_image"
                            to={`/detail/${curElem.id}`}
                          >
                            {curElem.image_banner.length > 0 ? (
                              <>
                                <img
                                  loading="lazy"
                                  src={
                                    curElem.image_banner[0] &&
                                    `${process.env.REACT_APP_URL}/${curElem.image_banner[0].imagePath}/${curElem.image_banner[0].imageName}`
                                  }
                                  onError={({ currentTarget }) => {
                                    currentTarget.onError = null;
                                    currentTarget.src =
                                      "http://www.freeiconspng.com/uploads/no-image-icon-11.PNG";
                                  }}
                                  alt="Maskgroup1"
                                />
                              </>
                            ) : (
                              <>
                                <img
                                  loading="lazy"
                                  src="http://www.freeiconspng.com/uploads/no-image-icon-11.PNG"
                                  alt="Maskgroup1"
                                />
                              </>
                            )}
                          </Link>
                        </div>
                      </div>
                      <div className="card_postInfo">
                        <h4 className="car_title">
                          <Link to={`/detail/${curElem.id}`}>
                            {curElem.make} {curElem.model}-{curElem.year}-
                            {curElem.odmeter}
                          </Link>

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
                        </h4>
                        <p className="color_grey">
                          {curElem?.moreDescription.substr(0, 123)}
                        </p>

                        <ul
                          className="labelList"
                          style={{
                            display: "flex",
                            justifyContent: "flex-start",
                          }}
                        >
                          <li className="w-auto">
                            {curElem.currentAmount ? (
                              <span>
                                <label>Current&nbsp;Bid :</label>
                                <span className="px-1">
                                  ${curElem.currentAmount.auctionAmmount}
                                </span>
                              </span>
                            ) : curElem.documentFee ? (
                              <span>
                                <label>
                                  Current Bid : ${curElem.documentFee}
                                </label>
                              </span>
                            ) : null}
                          </li>
                          <li>
                            <label>Ends In:</label>{" "}
                            <span>
                              {new Date(curElem.EndTime).toLocaleTimeString()}
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </section>
    </>
  );
};

export default AuctionNoReserve;
