import React, { useEffect, useState } from "react";
import icGrid from "../../Assets/images/icGrid.svg";
import img_01 from "../../Assets/images/img_01.jpg";
import axios from "axios";
import moment from "moment";
import { useSelector } from "react-redux";
import SmallSpinner from "../UI/SmallSpinner";
import { Link } from "react-router-dom";
function Auctionlive() {
  const userId = useSelector((state) => state);
  const [data, setauctions] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [viewListActive, setViewListActive] = useState(false);
  const [loading, setLoader] = useState(false);
  const [highlightWatch, setHighlightWatch] = useState(false);
  const fetchVehicleApi = async () => {
    setLoader(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_URL}vehicle/unknowuser`
      );
      if (response.data.status === 200 && response.data.data.length > 0) {
        const newData = response.data.data.reverse();
        const filteredData = newData.filter(
          (item) => item.displayInAuction === "Yes"
        );
        // const watchedData = newData.filter((item) => item.like > 0);
        setauctions(filteredData);
        setFilteredUsers(filteredData);
      }
      setLoader(false);
    } catch (err) {
      console.log(err);
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchVehicleApi();
  }, []);
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
        // console.log("like", res.data.status);
        if (res.data.status === 200) {
          setauctions([]);
          setFilteredUsers([]);
          fetchVehicleApi();
        }
      });
  };
  if (loading) {
    return <SmallSpinner spin={true} />;
  }

  return (
    <div>
      <section className="ptb_80 pt_sm_50">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center pb_30">
              <h2 className="title_combo title_Center">
                Live Now{" "}
                <span>
                  {
                    data
                      .filter((data) => data.done === 1 && data.premium === 1)
                      .map((data) => data).length
                  }{" "}
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
                      let value = e.target.value;
                      setSearchValue(value);
                      setauctions(
                        filteredUsers
                          .filter(
                            (data) =>
                              data.make
                                .toLowerCase()
                                .includes(value.toLowerCase()) ||
                              data.year.includes(value) ||
                              data.model
                                .toLowerCase()
                                .includes(value.toLowerCase())
                          )
                          .map((data) => data)
                      );
                    }}
                    type="text"
                    name=""
                    placeholder="Search with make, model and year"
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
                <li className="d-flex gv">
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
            {(data.length > 0 && highlightWatch
              ? data.filter((item) => item.like > 0)
              : data
            )
              .filter((data) => data.done === 1 && data.premium === 1)
              .map((curElem) => {
                return (
                  <div
                    key={curElem.id}
                    className="col-12 col-lg-4 col-md-6 pb-3 auctionLive"
                  >
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
                          {/* <img
                              src={
                                curElem.stepOneImage === null ||
                                curElem.stepOneImage === undefined ||
                                curElem.stepOneImage === ""
                                  ? img_01
                                  : process.env.REACT_APP_URL +
                                    curElem.stepOneImage
                              }
                              alt=""
                            /> */}
                          <img
                            loading="lazy"
                            src={
                              process.env.REACT_APP_URL + curElem.stepOneImage
                            }
                            onError={({ currentTarget }) => {
                              currentTarget.onError = null;
                              currentTarget.src =
                                "http://www.freeiconspng.com/uploads/no-image-icon-11.PNG";
                            }}
                            alt={curElem.model}
                          />
                        </Link>
                      </div>
                      <div className="card_postInfo">
                        <h4>
                          <Link to={`/detail/${curElem.id}`}>
                            {curElem.make} {curElem.model}-{curElem.year}-
                            {curElem.odmeter}
                          </Link>
                        </h4>
                        <ul
                          className="labelList"
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <li className="w-auto">
                            {curElem.currentAmount ? (
                              <span>
                                <label>Current&nbsp;Bid:</label>
                                <br />${curElem.currentAmount.auctionAmmount}
                              </span>
                            ) : curElem.documentFee ? (
                              <span>
                                <label>Opening Bid:</label>
                                <br /> ${curElem.documentFee}
                              </span>
                            ) : null}
                          </li>
                          <li>
                            {/* <span>{getEndDate(curElem.created_at)} </span> */}
                            {/* <span>{curElem.EndTime}</span> */}
                            {curElem.approved === "0" && (
                              <label>Upcoming Auction</label>
                            )}
                            {curElem.approved === "1" && (
                              <label>Auction is live now</label>
                            )}
                            {/* {parseInt(new Date(curElem.EndTime).getTime(), 10) -
                              new Date().getTime() >
                            900000 ? (
                              <label>Upcoming Auction</label>
                            ) : parseInt(
                                new Date(curElem.EndTime).getTime(),
                                10
                              ) -
                                new Date().getTime() >
                                0 &&
                              parseInt(
                                new Date(curElem.EndTime).getTime(),
                                10
                              ) -
                                new Date().getTime() <
                                900000 ? (
                              <label>Auction is live now</label>
                            ) : (
                              <label>Sold</label>
                            )} */}
                            {/* {parseInt(new Date(curElem.EndTime).getTime(), 10) -
                              new Date().getTime() <=
                              0 && <label>Sold</label>} */}
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
    </div>
  );
}

export default Auctionlive;
