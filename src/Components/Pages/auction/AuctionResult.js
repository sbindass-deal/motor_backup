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
import Pagination from "../../Pagination";
import NotAvailable from "../../UI/NotAvailable";
import { Modal } from "react-bootstrap";
import StarIcon from "@mui/icons-material/Star";

const AuctionResult = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [viewListActive, setViewListActive] = useState(false);
  const [highlightWatch, setHighlightWatch] = useState(false);
  const [allData, setAllData] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = data.slice(firstPostIndex, lastPostIndex);

  const [filteredModal, setFilteredModal] = useState(false);
  const [filterCategory, setFilterCategory] = useState({});
  const [getSelectData, setGetSelectData] = useState({
    year: "",
    make: "",
    model: "",
    year: "",
    state: "",
    city: "",
    auction: "",
    status: "",
  });
  const handleChangeSelectData = (e) => {
    setGetSelectData({ ...getSelectData, [e.target.name]: e.target.value });
  };

  const filterApiData = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_URL}getFiltersForVehicle`
      );
      setFilterCategory(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    filterApiData();
  }, []);
  const fetchApiData = async () => {
    setLoading(true);
    handleFilteredModalClose();
    setGetSelectData({
      year: "",
      make: "",
      model: "",
      year: "",
      state: "",
      city: "",
      // auction: "",
      // status: ""
    });
    axios
      .post(`${process.env.REACT_APP_URL}getAllWinner`, {})
      .then(function (res) {
        if (res.data.data.length > 0) {
          setData(res.data.data);
          setAllData(res.data.data);
          setLoading(false);
        } else {
          setData([]);
          setAllData([]);
          setLoading(false);
        }
      })
      .catch(function (error) {
        console.log(error);
        setLoading(false);
      });
  };
  useEffect(() => {
    fetchApiData();
  }, []);

  // const fetchAuctionLiveApi = async () => {
  //   setLoading(true);
  //   handleFilteredModalClose();

  //   try {
  //     setGetSelectData({
  //       year: "",
  //       make: "",
  //       model: "",
  //       year: "",
  //       state: "",
  //       city: "",
  //     });
  //     const res = await axios.post(`${process.env.REACT_APP_URL}getAllWinner`);
  //     if (res.data.status === 200) {
  //       setData(res.data.data);
  //     }
  //     setLoading(false);
  //   } catch (err) {
  //     console.log(err);
  //     setLoading(false);
  //   }
  // };
  // useEffect(() => {
  //   fetchAuctionLiveApi();
  // }, []);

  const handleFilteredModalClose = () => {
    setFilteredModal(false);
  };

  const handleFilteredModalShow = () => {
    setFilteredModal(true);
  };

  // const getEndDate = (cal) => {
  //   let data = cal.split("T");
  //   let endDate = moment().format("YYYY-MM-DD");
  //   let startDate = moment(data[0]).add(5, "days").format("YYYY-MM-DD");

  //   return startDate.toString();
  // };

  const fetchNoreserveDataSelect = async () => {
    setLoading(true);
    handleFilteredModalClose();
    axios
      .post(`${process.env.REACT_APP_URL}getAllWinner`, {
        year: getSelectData.year,
        model: getSelectData.model,
        make: getSelectData.make,
        city: getSelectData.city,
        state: getSelectData.state,
        bidding_status: getSelectData.status,
        auctionType: getSelectData.auction,
      })
      .then(function (res) {
        if (res.data.data.length > 0) {
          setData(res.data.data);
          setAllData(res.data.data);
          setLoading(false);
        } else {
          setData([]);
          setAllData([]);
          setLoading(false);
        }
      })
      .catch(function (error) {
        console.log(error);
        setLoading(false);
      });
  };

  const handleSubmitModel = (e) => {
    e.preventDefault();
    fetchNoreserveDataSelect();
  };

  if (loading) {
    return <SmallSpinner spin={true} />;
  }
  console.log(79989, data);
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
                    {/* <i class="fa-solid fa-bell mr-2"></i> */}
                    <StarIcon />
                    watched
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
                <li className="">
                  <button
                    type="button"
                    className="gry_btn"
                    data-toggle="modal"
                    data-target="#FiltersModal"
                    onClick={handleFilteredModalShow}
                  >
                    <i className="fa-solid fa-filter mr-2"></i>
                    Filters
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div
            className={`row pt-4 row_gridList ${
              viewListActive && "activeListView"
            }`}
          >
            {currentPosts.length == 0 ? (
              <NotAvailable text="Data not found" />
            ) : (
              currentPosts
                ?.filter((curElem) => {
                  console.log(89898, curElem);
                  if (searchValue == "") {
                    return curElem;
                  } else if (
                    curElem?.title
                      .toLowerCase()
                      .includes(searchValue.toLowerCase())
                    // ||
                    // curElem?.vehicle_data?.model
                    //   .toLowerCase()
                    //   .includes(searchValue.toLowerCase())
                    // || curElem?.vehicle_data?.year
                    //   .toLowerCase()
                    //   .includes(searchValue.toLowerCase())
                  ) {
                    return curElem;
                  }
                })
                ?.map((curElem) => {
                  return (
                    <div className="col-12 col-lg-3 col-md-3 pb-3 auctionLive">
                      <div className="card_post">
                        <div className="card_postImg">
                          <div className="list_wrapper">
                            <Link
                              className="auction_image"
                              to={`/detail/${curElem?.vehicle_data?.id}`}
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
                            <Link to={`/detail/${curElem?.vehicle_data?.id}`}>
                              {curElem?.vehicle_data?.make +
                                " " +
                                curElem?.vehicle_data?.model +
                                " " +
                                curElem?.vehicle_data?.year}
                            </Link>

                            {/* <button type="button" className="watchedIc">
                            <i
                              className={`fa-solid fa-star ${
                                curElem.like >= 1 ? "faList" : ""
                              }`}
                            ></i>
                          </button> */}
                          </h4>
                          {/* <p className="color_grey">
                          {curElem?.vehicle_data?.moreDescription &&
                            parse(
                              curElem?.vehicle_data?.moreDescription?.substr(
                                0,
                                90
                              )+"...",
                              strToHtml
                            )}
                        </p> */}
                          <ul className="labelList ">
                            <li className="w-auto">
                              <label>
                                Sold For : $
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
                })
            )}

            <Pagination
              totalPosts={data.length}
              postsPerPage={postsPerPage}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
            />
          </div>
        </div>
      </section>
      <Modal
        show={filteredModal}
        onHide={handleFilteredModalClose}
        className="modal fade"
        id="loginModal"
        centered
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header border-0">
              <h4 className="modal-title forg">Filters</h4>
              <button
                onClick={handleFilteredModalClose}
                type="button"
                className="close"
                data-dismiss="modal"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="row row_gap_5">
                  <div className="col-12 col-md-6">
                    <label>Make</label>
                    <div className="form-group">
                      <select
                        name="make"
                        className="field"
                        onChange={handleChangeSelectData}
                        value={getSelectData.make}
                      >
                        <option selected disabled value="">
                          Select
                        </option>
                        {filterCategory?.make?.map((curVal, i) => {
                          return <option value={curVal}>{curVal}</option>;
                        })}
                      </select>
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <label>Model</label>
                    <div className="form-group">
                      <select
                        name="model"
                        className="field"
                        value={getSelectData.model}
                        onChange={handleChangeSelectData}
                      >
                        <option selected disabled value="">
                          Select
                        </option>
                        {filterCategory?.model?.map((curVal, i) => {
                          return <option value={curVal}>{curVal}</option>;
                        })}
                      </select>
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <label>Year</label>
                    <div className="form-group">
                      <select
                        name="year"
                        className="field"
                        value={getSelectData.year}
                        onChange={handleChangeSelectData}
                      >
                        <option selected disabled value="">
                          Select
                        </option>
                        {filterCategory?.year?.map((curVal, i) => {
                          return <option value={curVal}>{curVal}</option>;
                        })}
                      </select>
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <label>State</label>
                    <div className="form-group">
                      <select
                        name="state"
                        className="field"
                        value={getSelectData.state}
                        onChange={handleChangeSelectData}
                      >
                        <option selected disabled value="">
                          Select
                        </option>
                        {filterCategory?.state?.map((curVal, i) => {
                          return <option value={curVal}>{curVal}</option>;
                        })}
                      </select>
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <label>City</label>
                    <div className="form-group">
                      <select
                        name="city"
                        className="field"
                        value={getSelectData.city}
                        onChange={handleChangeSelectData}
                      >
                        <option selected disabled value="">
                          Select
                        </option>
                        {filterCategory?.city?.map((curVal, i) => {
                          return <option value={curVal}>{curVal}</option>;
                        })}
                      </select>
                    </div>
                  </div>
                  {/* <div className="col-12 col-md-6">
                    <label>Auction Type</label>
                    <div className="form-group">
                      <select
                        name="auction"
                        className="field"
                        value={getSelectData.auction}
                        onChange={handleChangeSelectData}
                      >
                        <option selected disabled value="">
                          Select
                        </option>
                        {filterCategory?.auctionType?.map((curVal, i) => {
                          console.log(9898989, curVal)
                          return <option value={curVal}>{curVal}</option>;
                        })}
                      </select>
                    </div>
                  </div>

                  <div className="col-12 col-md-6">
                    <label>Bidding Status</label>
                    <div className="form-group">
                      <select
                        name="status"
                        className="field"
                        value={getSelectData.status}
                        onChange={handleChangeSelectData}
                      >
                        <option selected disabled value="">
                          Select
                        </option>
                        {filterCategory?.bidding_status?.map((curVal, i) => {
                          return <option value={curVal}>{curVal}</option>;
                        })}
                      </select>
                    </div>
                  </div> */}
                </div>
                <div className="form-group d-flex justify-content-between ">
                  <button
                    type="button"
                    className="btn"
                    onClick={handleSubmitModel}
                  >
                    Filters
                  </button>
                  <button type="button" onClick={fetchApiData} className="btn">
                    Clear Filters
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AuctionResult;
