import React, { useState } from "react";
import icGrid from "../../Assets/images/icGrid.svg";
import img_01 from "../../Assets/images/img_01.jpg";
import axios from "axios";
import moment from "moment";
import { useSelector } from "react-redux";
function Auctionlive() {
  const userId = useSelector((state) => state);
  const [data, setauctions] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  React.useEffect(() => {
    axios.get(process.env.REACT_APP_URL + "vehicles").then((response) => {
      setauctions(response.data.data);
      setFilteredUsers(response.data.data);
      console.log("vechileApi", response.data.data);
    });
  }, []);

  const getEndDate = (cal) => {
    let data = cal.split("T");
    console.log(data[0]);
    let endDate = moment().format("YYYY-MM-DD");
    let startDate = moment(data[0]).add(5, "days").format("YYYY-MM-DD");

    return startDate.toString();
  };
  const addFabrity = (id) => {
    axios
      .post(process.env.REACT_APP_URL + "createLikes", {
        userId: userId.login.user.id,
        vehicleId: id,
        date: new Date().toString(),
      })
      .then((err) => {
        console.log(err);
      });
  };

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
                      setSearchValue(e.target.value);

                      setauctions(
                        filteredUsers
                          .filter((data) => data.name.includes(e.target.value))
                          .map((data) => data)
                      );
                    }}
                    type="text"
                    name=""
                    placeholder="Filter auctions for make, model, category…"
                  />
                </li>
                <li className="">
                  <button type="button" className="gry_btn">
                    <i className="fa-solid fa-star mr-2"></i> Watched
                  </button>
                </li>
                <li className="d-flex">
                  <button type="button" className="gry_btn gridView active">
                    <img src={icGrid} />
                  </button>
                  <button type="button" className="gry_btn listView">
                    <i className="fa-sharp fa-solid fa-list"></i>
                  </button>
                </li>
                <li className="">
                  <select className="post_select">
                    <option>Ending Soonest</option>
                    <option>Bid: Low to High</option>
                    <option>Bid: High to Low</option>
                    <option>Ending Latest</option>
                    <option>Closest to postal code...</option>
                  </select>
                </li>
              </ul>
            </div>
          </div>

          <div className="row pt-4 row_gridList">
            {/* {filteredUsers.map((curElem) => {
              return (
                <div key={curElem.id} className="col-12 col-md-6 pb-3">
                  <div className="card_post">
                    <div className="card_postImg">
                      <button type="button" className="watchedIc">
                        <i className="fa-solid fa-star"></i>
                      </button>
                      <a href="detail">
                        <img src={img_01} />
                      </a>
                    </div>
                    <div className="card_postInfo">
                      <h4>
                        <a href="detail.html">
                          {curElem.name} {curElem.year}
                        </a>
                      </h4>
                      <p>{curElem.anythingelse}</p>
                      <ul className="labelList">
                        <li>
                          <label>Current Bid:</label>{" "}
                          <span>${curElem.documentFee}</span>
                        </li>
                        <li>
                          <label>Ends In:</label> <span>5 days</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })} */}
            {data
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
                            className="fa-solid fa-star"
                            style={{
                              color: `${curElem.like > 0 ? "#EF6031" : ""}`,
                            }}
                          ></i>
                        </button>

                        <a href={`detail/${curElem.id}`}>
                          <img
                            src={
                              process.env.REACT_APP_URL + curElem.stepOneImage
                            }
                            alt=""
                          />
                        </a>
                      </div>
                      <div className="card_postInfo">
                        <h4>
                          <a href={`detail/${curElem.id}`}>
                            {curElem.name} {curElem.year}
                          </a>
                        </h4>
                        <p>{curElem.anythingelse} </p>
                        <ul className="labelList">
                          <li>
                            <label>Current Bid:</label>
                            {curElem["currentAmount"] === undefined ||
                            curElem["currentAmount"] === null ? (
                              <span>${curElem.documentFee}</span>
                            ) : (
                              <span>
                                ${curElem.currentAmount.auctionAmmount}
                              </span>
                            )}
                          </li>
                          <li>
                            <label>Ends On:</label>{" "}
                            <span>{getEndDate(curElem.created_at)} </span>
                          </li>
                          {/* <li className="butn-shop">
                              {!logingUser ? (
                                <button type="button" className="btn">
                                  Register for bid
                                </button>
                              ) : (
                                <button type="button" className="btn">
                                  <a href={`detail/${curElem.id}`}>Bid Now</a>
                                </button>
                              )}
                            </li> */}
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
