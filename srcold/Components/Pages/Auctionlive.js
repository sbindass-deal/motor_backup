import React, { useEffect, useState } from "react";
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

  const fetchVehicleApi = async () => {
    try {
      const response = await axios.get(process.env.REACT_APP_URL + "vehicles");
      if (response.data.status === 200 && response.data.data.length > 0) {
        const newData = response.data.data.reverse();
        const filteredData = newData.filter(
          (item) => item.displayInShowroom === "Yes"
        );

        setauctions(filteredData);
        setFilteredUsers(filteredData);
      }
    } catch (err) {
      console.log(err);
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
        userId: userId.login.user.id,
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
                          .filter(
                            (data) =>
                              data.make
                                .toLowerCase()
                                .includes(e.target.value) ||
                              data.make
                                .toUpperCase()
                                .includes(e.target.value) ||
                              data.model
                                .toLowerCase()
                                .includes(e.target.value) ||
                              data.model
                                .toUpperCase()
                                .includes(e.target.value) ||
                              data.year.toUpperCase().includes(e.target.value)
                          )
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
                    <i className="fa-solid fa-heart mr-2"></i> Watched
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
                            className={`fa-solid fa-star ${
                              curElem.like >= 1 ? "faList" : ""
                            }`}
                          ></i>
                        </button>

                        <a href={`detail/${curElem.id}`}>
                          <img
                            src={
                              curElem.stepOneImage === null ||
                              curElem.stepOneImage === undefined ||
                              curElem.stepOneImage === ""
                                ? img_01
                                : process.env.REACT_APP_URL +
                                  curElem.stepOneImage
                            }
                            alt=""
                          />
                        </a>
                      </div>
                      <div className="card_postInfo">
                        <h4>
                          <a href={`detail/${curElem.id}`}>
                            {curElem.make} {curElem.model}-{curElem.year}-
                            {curElem.odmeter}
                          </a>
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
                                <label>Documents fee:</label>
                                <br /> ${curElem.documentFee}
                              </span>
                            ) : null}
                          </li>
                          <li>
                            {/* <span>{getEndDate(curElem.created_at)} </span> */}
                            {/* <span>{curElem.EndTime}</span> */}
                            {parseInt(new Date(curElem.EndTime).getTime(), 10) -
                              new Date().getTime() >
                            7200000 ? (
                              <label>Upcomming Auction</label>
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
                                7200000 ? (
                              <label>Bid is live now</label>
                            ) : (
                              <label>Sold</label>
                            )}
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
