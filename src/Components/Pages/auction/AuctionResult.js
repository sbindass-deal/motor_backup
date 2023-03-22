import React, { useEffect, useState } from "react";
import icGrid from "../../../Assets/images/icGrid.svg";
import axios from "axios";
import moment from "moment";
import { useDispatch } from "react-redux";
import { clearData } from "../../../redux/reducers/vehicleReducer";
import SmallSpinner from "../../UI/SmallSpinner";
import { Link } from "react-router-dom";
import { noImage, strToHtml, toCommas } from "../../UI/globaleVar";
import parse from "html-react-parser";
import Pagination from "./Pagination";

const AuctionResult = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [viewListActive, setViewListActive] = useState(false);
  const [highlightWatch, setHighlightWatch] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = data.slice(firstPostIndex, lastPostIndex);

  const fetchAuctionLiveApi = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${process.env.REACT_APP_URL}getAllWinner`);
      if (res.data.status === 200) {
        setData(res.data.data);
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchAuctionLiveApi();
  }, []);

  // const getEndDate = (cal) => {
  //   let data = cal.split("T");
  //   let endDate = moment().format("YYYY-MM-DD");
  //   let startDate = moment(data[0]).add(5, "days").format("YYYY-MM-DD");

  //   return startDate.toString();
  // };

  if (loading) {
    return <SmallSpinner spin={true} />;
  }

  return (
    <>
      <section className="ptb_80 pt_sm_50">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center pb_30">
              <h2 className="title_combo title_Center">
                Result Auctions{" "}
                <span>{data?.length}&nbsp; AUCTIONS RESULT</span>
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
                    placeholder="Filter auction result by make, model"
                  />
                </li>
                <li className="">
                  <button
                    onClick={() => setHighlightWatch(!highlightWatch)}
                    type="button"
                    className={`gry_btn ${highlightWatch && "active"}`}
                  >
                    {/* <i className="fa-solid fa-heart "></i> */}
                    <i class="fa-solid fa-star mr-2"></i>watched
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
            {currentPosts.length > 0 &&
              currentPosts.map((curElem) => {
                return (
                  <div className="col-12 col-lg-6 col-md-6 pb-3 auctionLive">
                    <div className="card_post">
                      <div className="card_postImg">
                        <div className="list_wrapper">
                          <Link
                            className="auction_image"
                            to={`/detail/${curElem.id}`}
                          >
                            {curElem?.img_logo?.length > 0 ? (
                              <>
                                <img
                                  loading="lazy"
                                  src={
                                    curElem?.img_logo[0]
                                      ? `${process.env.REACT_APP_URL}/${curElem?.img_logo[0]?.imagePath}/${curElem?.img_logo[0]?.imageName}`
                                      : noImage
                                  }
                                  onError={({ currentTarget }) => {
                                    currentTarget.onError = null;
                                    currentTarget.src = noImage;
                                  }}
                                  alt="Maskgroup1"
                                />
                              </>
                            ) : (
                              <>
                                <img
                                  loading="lazy"
                                  src={noImage}
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
                            {curElem?.vehicle_data?.make}
                          </Link>

                          {/* <button type="button" className="watchedIc">
                            <i
                              className={`fa-solid fa-star ${
                                curElem.like >= 1 ? "faList" : ""
                              }`}
                            ></i>
                          </button> */}
                        </h4>
                        <p className="color_grey">
                          {curElem?.vehicle_data?.moreDescription &&
                            parse(
                              curElem?.vehicle_data?.moreDescription?.substr(
                                0,
                                300
                              ),
                              strToHtml
                            )}
                        </p>

                        <ul className="labelList AucRelt">
                          <li className="w-auto">
                            <label>
                              Sold for $
                              {curElem?.auctionAmmount &&
                                toCommas(curElem?.auctionAmmount)}{" "}
                              on{" "}
                              {curElem?.vehicle_data?.EndTime &&
                                new Date(
                                  curElem?.vehicle_data?.EndTime
                                ).toLocaleDateString()}
                            </label>
                          </li>
                          {/* <li>
                            <label>
                              Ends In:{" "}
                              {curElem?.vehicle_data?.EndTime &&
                                new Date(
                                  curElem?.vehicle_data?.EndTime
                                ).toLocaleDateString()}
                            </label>{" "}
                            <span>
                            </span>
                          </li> */}
                        </ul>
                      </div>
                    </div>
                  </div>
                );
              })}

            <Pagination
              totalPosts={data.length}
              postsPerPage={postsPerPage}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default AuctionResult;
