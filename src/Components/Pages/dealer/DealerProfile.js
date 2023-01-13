import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import car_01 from "../../../Assets/images/car_01.jpg";
import SmallSpinner from "../../UI/SmallSpinner";
import FilteredModal from "../FilteredModal";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import EastIcon from "@mui/icons-material/East";
import WestIcon from "@mui/icons-material/West";
import Img_01 from "../../../Assets/images/img_01.jpg";
import about_1 from "../../../Assets/images/about-1.jpg";
import Gallery_1 from "../../../Assets/images/g-1.png";
import Gallery_2 from "../../../Assets/images/g-2.png";
import Gallery_3 from "../../../Assets/images/g-3.png";
import Gallery_4 from "../../../Assets/images/g-4.png";
import logo_ku from "../../../Assets/images/logo-ku.png";
import custombanner5 from "../../../Assets/images/custombanner5.webp";
import fordMustang from "../../../Assets/images/fordMustang.png";
import Maskgroup1 from "../../../Assets/images/Maskgroup1.png";
import web from "../../../Assets/images/1.webp";
import web2 from "../../../Assets/images/2.webp";
import ttttt from "../../../Assets/images/ttttt.png"

function DealerProfile() {
  const [filteredModal, setFilteredModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [searchInputValue, setSearchInputValue] = useState("");
  const [loading, setLoader] = useState(true);
  const [vehicleData, setVehicleData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [totalResult, setTotalResult] = useState(0);
  const [page, setPage] = useState(0);

  const handleFilteredModalShow = () => {
    setFilteredModal(true);
  };
  const handleFilteredModalClose = () => {
    setFilteredModal(false);
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
    // autoplay: true,
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
      <section className="storeHeroSection dealer detail align-items-center">
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-12">
              <div className="heroText">
                <h1>Texan Auto Group</h1>
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
        </div>
      </section>

      <section className="pt_80 mobileSpec" id="">
        <div className="container">
          <div className="row ">
            <div className="col-12 text-center pb_30">
              <h2>Gallery</h2>
            </div>
            <div className="col-12 gallery">
              <div className="row">
                <div className="col-4 verticle">
                  <div className="galleryImgSect">
                    <img src={Gallery_1} />
                  </div>
                </div>
                <div className="col-8">
                  <div className="row">
                    <div className="col-6">
                      <div className="galleryImgSect">
                        <img src={Gallery_2} />
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="galleryImgSect">
                        <img src={Gallery_3} />
                      </div>
                    </div>
                    <div className="col-12 mt-50">
                      <div className="galleryImgSect">
                        <img src={Gallery_4} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
         
            <div
              className="col-12"
              style={{ textAlign: "center", margin: "20px auto" }}
            >
              <a class="btn mt-2" href="/showroom">
                VIEW MORE
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="pt_80 mobileSpec" id="">
        <div className="container">
          <div className="row ">
            <div className="col-12 text-center pb_30">
              <h2>Texan Auto Group Auctions</h2>
            </div>
            <div className="col-12">
              <div className="col-12 ptb_80 ListDealer auctionBid" style={{}}>
                <div className="row">
                  <div className="col-lg-3 col-sm-12 inner-slider">
                    <a href="/dealerprofile">
                      <div className="card_post">
                        <div className="card_postImg dlr">
                          <img src={Maskgroup1} alt="Maskgroup1" />
                        </div>
                        <div className="card_postInfo">
                          <h5>Texans Auto Group</h5>

                          <ul className="labelList">
                            <li>
                              <label>Current Bid:</label> <span>$126,888</span>
                            </li>
                            <li>
                              <label>Ends In:</label> <span>5 days</span>
                            </li>
                          </ul>
                          <button className="btn bidnW">
                            Bid now <i class="fa-solid fa-arrow-right"></i>
                          </button>
                        </div>
                      </div>
                    </a>
                  </div>
                  <div className="col-lg-3 col-sm-12 inner-slider">
                    <a href="/dealerprofile">
                      <div className="card_post">
                        <div className="card_postImg dlr">
                          <img src={fordMustang} alt="fordMustang" />
                        </div>
                        <div className="card_postInfo">
                          <h5>Ford Mustang</h5>

                          <ul className="labelList">
                            <li>
                              <label>Current Bid:</label> <span>$156,488</span>
                            </li>
                            <li>
                              <label>Ends In:</label> <span>12 days</span>
                            </li>
                          </ul>
                          <button className="btn bidnW">
                            Bid now <i class="fa-solid fa-arrow-right"></i>
                          </button>
                        </div>
                      </div>
                    </a>
                  </div>
                  <div className="col-lg-3 col-sm-12 inner-slider">
                    <a href="/dealerprofile">
                      <div className="card_post">
                        <div className="card_postImg dlr">
                          <img src={web} alt="web" />
                        </div>
                        <div className="card_postInfo">
                          <h5>2022 Mercedes-Benz A</h5>

                          <ul className="labelList">
                            <li>
                              <label>Current Bid:</label> <span>$38,888</span>
                            </li>
                            <li>
                              <label>Ends In:</label> <span>25 days</span>
                            </li>
                          </ul>
                          <button className="btn bidnW">
                            Bid now <i class="fa-solid fa-arrow-right"></i>
                          </button>
                        </div>
                      </div>
                    </a>
                  </div>
                  <div className="col-lg-3 col-sm-12 inner-slider">
                    <a href="/dealerprofile">
                      <div className="card_post">
                        <div className="card_postImg dlr">
                          <img src={web2} alt="web2" />
                        </div>
                        <div className="card_postInfo">
                          <h5>2022 Mercedes-Benz S 580 4D</h5>

                          <ul className="labelList">
                            <li>
                              <label>Current Bid:</label> <span>$80,888</span>
                            </li>
                            <li>
                              <label>Ends In:</label> <span>25 days</span>
                            </li>
                          </ul>
                          <button className="btn bidnW">
                            Bid now <i class="fa-solid fa-arrow-right"></i>
                          </button>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pt_80 mobileSpec" id="">
        <div className="container">
          <div className="row ">
            <div className="col-12 text-center pb_30">
              <h2>Texan Auto Group Inventory</h2>
            </div>
          </div>
          <div className="row addSection">
            <div className="col-12 col-lg-12 mb-50">
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
            <div className="col-lg-6 col-sm-12 inner-slider">
              <a href="/dealerprofile">
                <div className="card_post">
                  <div className="card_postImg dlr">
                    <img src={Maskgroup1} alt="Maskgroup1" />
                  </div>
                  <div className="card_postInfo">
                    <h5>Texans Auto Group</h5>

                    <ul className="labelList">
                      <li>
                        <label>Current Bid:</label> <span>$126,888</span>
                      </li>
                      <li>
                        <label>Ends In:</label> <span>5 days</span>
                      </li>
                    </ul>
                    <button className="btn bidnW">
                      Bid now <i class="fa-solid fa-arrow-right"></i>
                    </button>
                  </div>
                  
                </div>
                <small>Guzzlrs AD</small>
              </a>
            </div>
            <div className="col-lg-6 col-sm-12 inner-slider">
              <a href="https://www.texascarsdirect.com/used-mercedes-benz-dallas-tx.html">
                <div className="card_post">
                  <div className="card_postImg dlr">
                    <img src={ttttt} alt="ttttt" />
                  </div>
                  <div className="card_postInfo">
                    <h5>2015 Audi Q7 </h5>

                    <ul className="labelList">
                      <li>
                        <label>Current Bid:</label> <span>$126,888</span>
                      </li>
                      <li>
                        <label>Ends In:</label> <span>5 days</span>
                      </li>
                    </ul>
                    <button className="btn bidnW">
                      Bid now <i class="fa-solid fa-arrow-right"></i>
                    </button>
                  </div>
                </div>
                <small>Dealer AD</small>
              </a>
            </div>
           
          </div>
        </div>
      </section>

      {/* <section className="ptb_80" id="">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-6">
              <img src={about_1} />
            </div>
            <div className="col-12 col-md-6 d-flex align-items-center mt-50">
              <div>
                <h3>About Dealer</h3>

                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum
                  passages, and more recently with desktop publishing software
                  like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      <div className="col-12 text-center pt_80 pb_30">
        <h2>More Inventory</h2>
      </div>

      {/* {loading ? (
        <SmallSpinner spin={true} />
      ) : ( */}
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
      </InfiniteScroll>

      {/* )} */}
    </>
  );
}

export default DealerProfile;
