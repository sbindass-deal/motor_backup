import React, { useState } from "react";
import icGrid from "../../Assets/images/icGrid.svg";
import img_01 from "../../Assets/images/img_01.jpg";
import axios from "axios";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { regBtn } from "../../redux/reducers/login";
function Auctionlive() {
  const dispatch = useDispatch();
  const [data, setauctions] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const logingUser = useSelector((state) => state.login.login);

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

    return startDate.toString(); //endDate.diff(startDate, 'days');
  };

  // const handleSearchFilter=(e)=>{
  //     setSearchValue(22,e.target.value)
  // }

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
                        <button type="button" className="watchedIc">
                          <i className="fa-solid fa-star"></i>
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
                          <a href="#">
                            {curElem.name} {curElem.year}
                          </a>
                        </h4>
                        <p>{curElem.anythingelse}</p>
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
            {/* <div className="col-12 col-md-6 pb-3">
                        <div className="card_post">
                            <div className="card_postImg">
                                <button type="button" className="watchedIc"><i className="fa-solid fa-star"></i></button>
                                <img src={img_02}/>
                            </div>
                            <div className="card_postInfo">
                                <h4><a href="detail.html">12k-Mile 2009 Aston Martin DBS 6-Speed</a></h4>
                                <p>This 2009 Aston Martin DBS is finished in Casino Royale Metallic over a black leather and Alcantara interior and is powered by a 5.9-liter V12 mated to a six-speed manual transaxle and a limited-slip differential. Additional equipment includes front and rear parking sensors, 20” alloy wheels, carbon-ceramic brakes…</p>
                                <ul className="labelList">
                                    <li><label>Current Bid:</label> <span>$126,888</span></li>
                                    <li><label>Ends In:</label> <span>5 days</span></li>
                                </ul>
                            </div>
                        </div>
                    </div> */}
            {/* <div className="col-12 col-md-6 pb-3">
                        <div className="card_post">
                            <div className="card_postImg">
                                <button type="button" className="watchedIc"><i className="fa-solid fa-star"></i></button>
                                <img src={img_03}/>
                            </div>
                            <div className="card_postInfo">
                                <h4><a href="detail.html">12k-Mile 2009 Aston Martin DBS 6-Speed</a></h4>
                                <p>This 2009 Aston Martin DBS is finished in Casino Royale Metallic over a black leather and Alcantara interior and is powered by a 5.9-liter V12 mated to a six-speed manual transaxle and a limited-slip differential. Additional equipment includes front and rear parking sensors, 20” alloy wheels, carbon-ceramic brakes…</p>
                                <ul className="labelList">
                                    <li><label>Current Bid:</label> <span>$126,888</span></li>
                                    <li><label>Ends In:</label> <span>5 days</span></li>
                                </ul>
                            </div>
                        </div>
                    </div> */}
            {/* <div className="col-12 col-md-6 pb-3">
                        <div className="card_post">
                            <div className="card_postImg">
                                <button type="button" className="watchedIc"><i className="fa-solid fa-star"></i></button>
                                <img src={img_04}/>
                            </div>
                            <div className="card_postInfo">
                                <h4><a href="detail.html">12k-Mile 2009 Aston Martin DBS 6-Speed</a></h4>
                                <p>This 2009 Aston Martin DBS is finished in Casino Royale Metallic over a black leather and Alcantara interior and is powered by a 5.9-liter V12 mated to a six-speed manual transaxle and a limited-slip differential. Additional equipment includes front and rear parking sensors, 20” alloy wheels, carbon-ceramic brakes…</p>
                                <ul className="labelList">
                                    <li><label>Current Bid:</label> <span>$126,888</span></li>
                                    <li><label>Ends In:</label> <span>5 days</span></li>
                                </ul>
                            </div>
                        </div>
                    </div> */}
            {/* <div className="col-12 col-md-6 pb-3">
                        <div className="card_post">
                            <div className="card_postImg">
                                <button type="button" className="watchedIc"><i className="fa-solid fa-star"></i></button>
                                <img src={img_05}/>
                            </div>
                            <div className="card_postInfo">
                                <h4><a href="detail.html">12k-Mile 2009 Aston Martin DBS 6-Speed</a></h4>
                                <p>This 2009 Aston Martin DBS is finished in Casino Royale Metallic over a black leather and Alcantara interior and is powered by a 5.9-liter V12 mated to a six-speed manual transaxle and a limited-slip differential. Additional equipment includes front and rear parking sensors, 20” alloy wheels, carbon-ceramic brakes…</p>
                                <ul className="labelList">
                                    <li><label>Current Bid:</label> <span>$126,888</span></li>
                                    <li><label>Ends In:</label> <span>5 days</span></li>
                                </ul>
                            </div>
                        </div>
                    </div> */}
            {/* <div className="col-12 col-md-6 pb-3">
                        <div className="card_post">
                            <div className="card_postImg">
                                <button type="button" className="watchedIc"><i className="fa-solid fa-star"></i></button>
                                <img src={img_06}/>
                            </div>
                            <div className="card_postInfo">
                                <h4><a href="detail.html">12k-Mile 2009 Aston Martin DBS 6-Speed</a></h4>
                                <p>This 2009 Aston Martin DBS is finished in Casino Royale Metallic over a black leather and Alcantara interior and is powered by a 5.9-liter V12 mated to a six-speed manual transaxle and a limited-slip differential. Additional equipment includes front and rear parking sensors, 20” alloy wheels, carbon-ceramic brakes…</p>
                                <ul className="labelList">
                                    <li><label>Current Bid:</label> <span>$126,888</span></li>
                                    <li><label>Ends In:</label> <span>5 days</span></li>
                                </ul>
                            </div>
                        </div>
                    </div> */}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Auctionlive;
