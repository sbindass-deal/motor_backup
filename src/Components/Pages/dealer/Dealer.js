import axios from "axios";

import React, { useEffect, useRef, useState } from "react";
import FilteredModal from "../FilteredModal";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import logo_ku from "../../../Assets/images/logo-ku.png";
import custombanner5 from "../../../Assets/images/custombanner5.webp";
import rrm_logo from "../../../Assets/images/rrm-logo.png";
import Texas_Car_One_Logo6 from "../../../Assets/images/Texas_Car_One_Logo6.png"
import txautodealer from "../../../Assets/images/txautodealer.png"
import gggg from "../../../Assets/images/ddddd.webp"
import New_Texas_Sales_Header_Logo from "../../../Assets/images/New_Texas_Sales_Header_Logo.png"


import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  clearShowroomFilter,
  filterShowroomData,
} from "../../../redux/reducers/vehicleReducer";
import { Link } from "react-router-dom";
function Dealer() {
  const dispatch = useDispatch();
  const logingUser = useSelector((state) => state);
  const category = logingUser.vehicleReducer.filterCategory;
  console.log(category);
  const [filteredModal, setFilteredModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [searchInputValue, setSearchInputValue] = useState("");
  const [loading, setLoader] = useState(true);
  const [vehicleData, setVehicleData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [totalResult, setTotalResult] = useState(0);
  const [page, setPage] = useState(0);
  const [filterInput, setFilterInput] = useState({
    year: "",
    make: "",
    model: "",
    state: "",
    city: "",
  });
  const handleFilterInput = (e) => {
    setFilterInput({
      ...filterInput,
      [e.target.name]: e.target.value.toLowerCase(),
    });
  };
  const clearFilter = () => {
    // dispatch(clearShowroomFilter());
    setFilterInput({
      year: "",
      make: "",
      model: "",
      state: "",
      city: "",
    });
  };
  const handleFilterFormSubmit = (e) => {
    e.preventDefault();
    if (
      filterInput.year.trim().length > 0 ||
      filterInput.make.trim().length > 0 ||
      filterInput.model.trim().length > 0 ||
      filterInput.state.trim().length > 0 ||
      filterInput.city.trim().length > 0
    ) {
      // dispatch(filterShowroomData(filterInput))
    }
    handleFilteredModalClose();
  };

  const handleFilteredModalClose = () => {
    setFilteredModal(false);
  };
  const handleFilteredModalShow = () => {
    setFilteredModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };
  const handleShow = () => {
    setShowModal(true);
  };
  const fetchStoreVehicleApi = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_URL}vehiclePagination/${page}`
      );
      const newData = response.data.data;
      setTotalResult(response.data.count);
      setVehicleData(newData);
      setFilterData(newData);
      setPage(page + 10);
      setLoader(false);
    } catch (err) {
      console.log(err);
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchStoreVehicleApi();
  }, []);
  const style = {
    height: 30,
    border: "1px solid green",
    margin: 6,
    padding: 8,
  };
  console.log("hello", page);
  const fetchMoreData = async () => {
    console.log(page, "hello");

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_URL}vehiclePagination/${page}`
      );
      const newData = await response.data.data;
      setTotalResult(response.data.count);
      setVehicleData(vehicleData.concat(newData));
      setFilterData(filterData.concat(newData));
      setPage(page + 10);

      setLoader(false);
    } catch (err) {
      console.log(err);
      setLoader(false);
    }
  };
  const [showBidOnSlide, setShowBidOnSlide] = useState([]);

  const fetchVehicles = async () => {
    try {
      const response = await axios.get(process.env.REACT_APP_URL + "vehicles");
      const bidApiArr = response.data.data;
      if (response.data.status === 200 && response.data.data.length > 0) {
        setShowBidOnSlide(bidApiArr.slice(-4));
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const slide = useRef(null);

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "red" }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "green" }}
        onClick={onClick}
      />
    );
  }

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    autoplay: true,
    // speed: 10000,
    // pauseOnHover: true,
    // cssEase: "linear"
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <section className="storeHeroSection dealer align-items-center">
        <div className="container">
          <div className="row">
            <div className="topTile">
              <h5>
                New to GasGuzzlrs? <Link to="/works">Learn how it works.</Link>
              </h5>
            </div>
          </div>
          <div className="col-12 col-lg-12">
            <div className="heroText">
              <h1>We have over 200 dealers around the world</h1>
              <h5>
                We help you find your dream car. Choose from our exclusive
                <br /> list of showrooms.
              </h5>
              {/* <a href="#" className="btn">
                  VIEW INVENTORY
                </a> */}
            </div>
          </div>
        </div>
      </section>

      <section className="ptb_80" id="">
        <div className="container">
          <div className="row ">
            <div className="col-12 text-center pb_30">
              <h2>Featured Dealers</h2>
            </div>
            <div className="col-12 col-lg-12">
              <ul className="postTopOption">
                <li className="post_search">
                  <input
                    type="text"
                    autoComplete="off"
                    name="search"
                    value={searchInputValue}
                    onChange={(e) => {
                      let values = e.target.value.toLowerCase();
                      setSearchInputValue(values);
                    }}
                    placeholder="Search for a make or model"
                  />
                </li>
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
            <FilteredModal showModal={showModal} handleClose={handleClose} />
            <div className="col-12 ptb_80 ListDealer" style={{}}>
              <div className="row">
                <div className="col-lg-4 col-sm-12 inner-slider">
                      <a href="/dealerprofile">
                        <div className="card_post">
                          <div className="card_postImg dlr">
                            <img src={logo_ku} alt="logo_ku" />
                          </div>
                          <div className="card_postInfo">
                            <h5>Texans Auto Group</h5>
                            <p>
                              At Texans Auto Group, when we say we have a
                              ginormous selection of cars, we mean it. We have an
                              incredible selection of new, used and certified
                              vehicles, which is why so many customers choose us
                              when they are looking for reliable used car
                              dealerships in Cypress TX.
                            </p>
                            {/* <ul className="labelList">
                              <li>
                                <label>Current Bid:</label> <span>$126,888</span>
                              </li>
                              <li>
                                <label>Ends In:</label> <span>5 days</span>
                              </li>
                            </ul> */}
                          </div>
                        </div>
                      </a>
                </div>
                <div className="col-lg-4 col-sm-12 inner-slider">
                  <a
                        target="_blank"
                        rel="noopener"
                        href="https://www.texascarsdirect.com/"
                      >
                        <div className="card_post">
                          <div className="card_postImg dlr">
                            <small>AD</small>
                            <img src={custombanner5} alt="Img_bmw" />
                          </div>
                          <div className="card_postInfo">
                            <h5>Texas Cars Direct</h5>
                            <p>
                              While we are happy to welcome you to our newly
                              remodeled and distanced showroom-We are also
                              providing additional safety measures to keep us all
                              safe...from safely signing digital paperwork via
                              email to delivering your vehicle right to your home
                              or work!
                            </p>
                            {/* <ul className="labelList">
                            <li>
                              <label>Current Bid:</label> <span>$126,888</span>
                            </li>
                            <li>
                              <label>Ends In:</label> <span>5 days</span>
                            </li>
                          </ul> */}
                          </div>
                        </div>
                  </a>
                </div>
               
                <div className="col-lg-4 col-sm-12 inner-slider">
                  <a href="/dealerprofile">
                        <div className="card_post">
                          <div className="card_postImg dlr">
                            <img src={rrm_logo} alt="Img_01" />
                          </div>
                          <div className="card_postInfo">
                            <h5>Ruiz Ranch motors</h5>
                            <p>
                              With years of experience serving the area, our
                              dealership is dedicated to offering high-quality,
                              pre-owned vehicles to our customers. From the moment
                              you walk through our door, we’re committed to
                              providing you with a great car-buying experience.
                            </p>
                            {/* <ul className="labelList">
                            <li>
                              <label>Current Bid:</label> <span>$126,888</span>
                            </li>
                            <li>
                              <label>Ends In:</label> <span>5 days</span>
                            </li>
                          </ul> */}
                          </div>
                        </div>
                      </a>
                </div>
               
                <div className="col-lg-4 col-sm-12 inner-slider">
                  <a
                        target="_blank"
                        rel="noopener"
                        href="https://www.txautodealer.com/"
                      >
                        <div className="card_post">
                          <div className="card_postImg dlr">
                            <small>AD</small>
                            <img src={txautodealer} alt="Img_bmw" />
                          </div>
                          <div className="card_postInfo">
                            <h5>Txauto Dealer</h5>
                            <p>
                              While we are happy to welcome you to our newly
                              remodeled and distanced showroom-We are also
                              providing additional safety measures to keep us all
                              safe...from safely signing digital paperwork via
                              email to delivering your vehicle right to your home
                              or work!
                            </p>
                            {/* <ul className="labelList">
                            <li>
                              <label>Current Bid:</label> <span>$126,888</span>
                            </li>
                            <li>
                              <label>Ends In:</label> <span>5 days</span>
                            </li>
                          </ul> */}
                          </div>
                        </div>
                  </a>
                </div>
                <div className="col-lg-4 col-sm-12 inner-slider">
                      <a href="/dealerprofile">
                        <div className="card_post">
                          <div className="card_postImg dlr">
                            <img src={gggg} alt="logo_ku" />
                          </div>
                          <div className="card_postInfo">
                            <h5>crest cars</h5>
                            <p>
                              At Texans Auto Group, when we say we have a
                              ginormous selection of cars, we mean it. We have an
                              incredible selection of new, used and certified
                              vehicles, which is why so many customers choose us
                              when they are looking for reliable used car
                              dealerships in Cypress TX.
                            </p>
                            {/* <ul className="labelList">
                              <li>
                                <label>Current Bid:</label> <span>$126,888</span>
                              </li>
                              <li>
                                <label>Ends In:</label> <span>5 days</span>
                              </li>
                            </ul> */}
                          </div>
                        </div>
                      </a>
                </div>
                <div className="col-lg-4 col-sm-12 inner-slider">
                  <a href="/dealerprofile">
                        <div className="card_post">
                          <div className="card_postImg dlr">
                            <img src={New_Texas_Sales_Header_Logo} alt="Img_01" />
                          </div>
                          <div className="card_postInfo">
                            <h5>Ruiz Ranch motors</h5>
                            <p>
                              With years of experience serving the area, our
                              dealership is dedicated to offering high-quality,
                              pre-owned vehicles to our customers. From the moment
                              you walk through our door, we’re committed to
                              providing you with a great car-buying experience.
                            </p>
                            {/* <ul className="labelList">
                            <li>
                              <label>Current Bid:</label> <span>$126,888</span>
                            </li>
                            <li>
                              <label>Ends In:</label> <span>5 days</span>
                            </li>
                          </ul> */}
                          </div>
                        </div>
                      </a>
                </div>
                
              </div>
            </div>
            <nav aria-label="Page navigation example " className="pgNtion">
              <ul className="pagination">
                <li className="page-item">
                  <a className="page-link" href="#" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                    <span className="sr-only">Previous</span>
                  </a>
                </li>
                <li className="page-item"><a className="page-link" href="#">1</a></li>
                <li className="page-item"><a className="page-link" href="#">2</a></li>
                <li className="page-item"><a className="page-link" href="#">3</a></li>
                <li className="page-item">
                  <a className="page-link" href="#" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                    <span className="sr-only">Next</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </section>

      {/* <section className="pt_80 mobileSpec" id="">
        <div className="container">
          <div className="row ">
            <div className="col-12 text-center pb_30">
              <h2>Just In Showroom!</h2>
            </div>
            <div className="col-12 Latest_B ">
              <ul className="img_sec">
                <li>
                  <a href="#" className="img_1">
                    <img src={Img_01} />
                  </a>
                </li>
              </ul>

              <ul className="img_text">
                <li className="active">
                  <a href="#" className="img_1">
                    <span> 22k-Mile 1974 Lincoln Continental Mark IV..</span>
                    <span>$8,600</span>
                    <span>3 days</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="img_2">
                    <span> 22k-Mile 1974 Lincoln Continental Mark IV..</span>
                    <span>$8,600</span>
                    <span>3 days</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="img_3">
                    <span> 22k-Mile 1974 Lincoln Continental Mark IV..</span>
                    <span>$8,600</span>
                    <span>3 days</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="img_4">
                    <span> 22k-Mile 1974 Lincoln Continental Mark IV..</span>
                    <span>$8,600</span>
                    <span>3 days</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="img_5">
                    <span> 22k-Mile 1974 Lincoln Continental Mark IV..</span>
                    <span>$8,600</span>
                    <span>3 days</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="img_6">
                    <span> 22k-Mile 1974 Lincoln Continental Mark IV..</span>
                    <span>$8,600</span>
                    <span>3 days</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <div className="col-12 text-center pt_80 pb_30">
        <h2>More Inventory</h2>
      </div>

     
      <InfiniteScroll
        dataLength={filterData.length}
        next={fetchMoreData}
        hasMore={totalResult !== filterData.length}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p className="text-warning" style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <section className="pt_40">
          <div className="container">
            <div className="row">
              {filterData.map((curElem) => {
                return (
                  <div className="col-12 col-md-6 col-lg-4" key={curElem.id}>
                    <div className="card_post store auction">
                      {curElem.displayInAuction === "Yes" && (
                        <p className="forOction">For Auction</p>
                      )}

                      <Link
                        to={
                          curElem.displayInAuction === "Yes"
                            ? `/detail/${curElem.id}`
                            : `/showroom/${curElem.id}`
                        }
                        className="card_postImg card_postImg_200"
                      >
                        <img
                          src={process.env.REACT_APP_URL + curElem.stepOneImage}
                          onError={({ currentTarget }) => {
                            currentTarget.onerror = null;
                            currentTarget.src =
                              "http://www.freeiconspng.com/uploads/no-image-icon-11.PNG";
                          }}
                          alt={curElem.make}
                        />
                      </Link>
                      <div className="card_postInfo pt-3">
                        <h6 className="name_price">
                          <Link
                            to={
                              curElem.displayInAuction === "Yes"
                                ? `/detail/${curElem.id}`
                                : `/showroom/${curElem.id}`
                            }
                          >
                            {curElem.make} {curElem.model} {curElem.year}
                          </Link>
                          <p className="price__">${curElem.documentFee}</p>
                        </h6>
                        <table className="showroomCol">
                          <tbody>
                            <tr>
                              <td>Odometer Reading </td>
                              <td>{curElem.odmeter}</td>
                            </tr>
                            <tr>
                              <td>Fuel Type</td>
                              <td>{curElem.fuel}</td>
                            </tr>
                            <tr>
                              <td>Seller</td>
                              <td>{curElem.name}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </InfiniteScroll> */}

      {/* )} */}

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
              <h4 className="modal-title">Filters</h4>
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
              {/* <button onClick={handleClick} >click me</button> */}
              <form onSubmit={handleFilterFormSubmit}>
                <div className="row row_gap_5">
                  {/* <div className="col-12 col-md-12">
                    <label>Vin Number</label>
                    <div className="form-group">
                      <input
                        type="text"
                        name=""
                        className="field"
                        placeholder="Vin Number"
                      />
                    </div>
                  </div> */}
                  {/* <div className="col-12 col-md-6">
                    <label>Vehicle Year</label>
                    <div className="form-group">
                      <input
                        type="text"
                        name=""
                        className="field"
                        placeholder="1900"
                      />
                    </div>
                  </div> */}
                  {/* <div className="col-12 col-md-6">
                    <label>To</label>
                    <div className="form-group">
                      <input
                        type="text"
                        name=""
                        className="field"
                        placeholder="2023"
                      />
                    </div>
                  </div> */}
                  <div className="col-12 col-md-6">
                    <label>Year</label>
                    <div className="form-group">
                      <select
                        name="year"
                        value={filterInput.year}
                        onChange={handleFilterInput}
                        className="field"
                      >
                        <option selected disabled value="">
                          Choose...
                        </option>
                        {category.year &&
                          category.year.map((curElem) => {
                            return <option>{curElem}</option>;
                          })}
                      </select>
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <label>Make</label>
                    <div className="form-group">
                      <select
                        name="make"
                        value={filterInput.make}
                        onChange={handleFilterInput}
                        className="field"
                      >
                        <option selected disabled value="">
                          Choose...
                        </option>
                        {category.make &&
                          category.make.map((curElem) => {
                            return <option>{curElem}</option>;
                          })}
                      </select>
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <label>Model</label>
                    <div className="form-group">
                      <select
                        name="model"
                        value={filterInput.model}
                        onChange={handleFilterInput}
                        className="field"
                      >
                        <option selected disabled value="">
                          Choose...
                        </option>
                        {category.model &&
                          category.model.map((curElem) => {
                            return <option>{curElem}</option>;
                          })}
                      </select>
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <label>State</label>
                    <div className="form-group">
                      <select
                        name="state"
                        value={filterInput.state}
                        onChange={handleFilterInput}
                        className="field"
                      >
                        <option selected disabled value="">
                          Choose...
                        </option>
                        {category.state &&
                          category.state.map((curElem) => {
                            return <option>{curElem}</option>;
                          })}
                      </select>
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <label>City</label>
                    <div className="form-group">
                      <select
                        name="city"
                        value={filterInput.city}
                        onChange={handleFilterInput}
                        className="field"
                      >
                        <option selected disabled value="">
                          Choose...
                        </option>
                        {category.city &&
                          category.city.map((curElem) => {
                            return <option>{curElem}</option>;
                          })}
                      </select>
                    </div>
                  </div>
                  {/* <div className="col-12 col-md-6">
                    <label>High Bid</label>
                    <div className="form-group">
                      <select className="field">
                        <option>No Min</option>
                        <option>$5k</option>
                        <option>#10k</option>
                        <option>#15k</option>
                        <option>#20k</option>
                        <option>#25k</option>
                        <option>#30k</option>
                      </select>
                    </div>
                  </div> */}
                  {/* <div className="col-12 col-md-6">
                    <label>To</label>
                    <div className="form-group">
                      <select className="field">
                        <option>No Max</option>
                        <option>$5k</option>
                        <option>#10k</option>
                        <option>#15k</option>
                        <option>#20k</option>
                        <option>#25k</option>
                        <option>#30k</option>
                      </select>
                    </div>
                  </div> */}
                  {/* <div className="col-12 col-md-12">
                    <label>Exclude Words / Models / Tags</label>
                    <div className="form-group">
                      <input
                        type="text"
                        name=""
                        className="field"
                        placeholder="Enter"
                      />
                    </div>
                  </div> */}
                </div>
                <div className="form-group d-flex justify-content-between ">
                  <button type="submit" className="btn">
                    Filters
                  </button>
                  <button onClick={clearFilter} type="submit" className="btn">
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
}

export default Dealer;
