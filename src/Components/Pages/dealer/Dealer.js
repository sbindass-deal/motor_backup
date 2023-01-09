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
import car_03 from "../../../Assets/images/car_03.jpg";
import car_04 from "../../../Assets/images/car_04.jpg";
import img_05 from "../../../Assets/images/img_05.jpg";
import img_06 from "../../../Assets/images/img_06.jpg";
import Img_01 from "../../../Assets/images/img_01.jpg";
import Img_02 from "../../../Assets/images/img_02.jpg";
import Img_w from "../../../Assets/images/wox.png";
import Img_bmw from "../../../Assets/images/bmw.png";
import Img_m from "../../../Assets/images/m.png";

function Dealer() {
  const [showModal, setShowModal] = useState(false);
  const [searchInputValue, setSearchInputValue] = useState("");
  const [loading, setLoader] = useState(true);
  const [vehicleData, setVehicleData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [totalResult, setTotalResult] = useState(0);
  const [page, setPage] = useState(0);

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
      <section className="storeHeroSection dealer align-items-center">
        <div className="container">
          <div className="row">
            <div className="topTile">
                <h5>New to Gas Guzzlrs? <a href="#">Learn how it works.</a></h5>
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
                      let value = e.target.value;
                      setSearchInputValue(e.target.value);

                      if (value === "") {
                        setFilterData(vehicleData);
                      } else {
                        setFilterData(
                          vehicleData
                            .filter(
                              (data) =>
                                data.make.toLowerCase().includes(value) ||
                                data.make.toUpperCase().includes(value) ||
                                data.model.toLowerCase().includes(value) ||
                                data.model.toUpperCase().includes(value) ||
                                data.year.includes(value) ||
                                data.name.toLowerCase().includes(value) ||
                                data.name.toUpperCase().includes(value)
                            )
                            .map((data) => data)
                        );
                      }
                    }}
                    placeholder="Search for a make or model"
                  />
                </li>
              </ul>
            </div>
            <FilteredModal showModal={showModal} handleClose={handleClose} />
          </div>
          <div className="col-12 col-lg-12">
              <div className="heroText">
                <h1>We have over 20 stores around the UK</h1>
                <h5>We help you find your dream car. Choose from our exclusive<br/> list of showrooms.</h5>
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
              <h2>Featured Dealer</h2>
            </div>

            <div className="col-12 ptb_80" style={{  }}>
              <div className="nextArrow">
                <span onClick={() => slide.current.slickPrev()}>
                  <span className="prev">Prev</span>
                </span>
                <span
                  onClick={() => slide.current.slickNext()}
                  style={{ marginLeft: 50 }}
                >
                  <span className="next">Next</span>
                </span>
              </div>
              <div className="featuredAuctions_Slide delair">
                <Slider ref={slide} {...settings}>
                  <div className="inner-slider">
                    <div className="card_post">
                      <div className="card_postImg dlr">
                        <img src={Img_w} alt="Img_w"/>
                      </div>
                      <div className="card_postInfo">
                        <h5>Dealer Name</h5>
                        <p>
                          This 2009 Aston Martin DBS is finished in Casino
                          Royale Metallic over a black.
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
                  </div>
                  <div>
                    <div className="card_post">
                      <div className="card_postImg dlr">
                        <img src={Img_bmw} alt="Img_bmw" />
                      </div>
                      <div className="card_postInfo">
                        <h5>Dealer Name</h5>
                        <p>
                          This 2009 Aston Martin DBS is finished in Casino
                          Royale Metallic over a black.
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
                  </div>
                  <div>
                    <div className="card_post">
                      <div className="card_postImg dlr">
                        <img src={Img_m} alt="Img_01" />
                      </div>
                      <div className="card_postInfo">
                        <h5>Dealer Name</h5>
                        <p>
                          This 2009 Aston Martin DBS is finished in Casino
                          Royale Metallic over a black.
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
                  </div>
                  
                </Slider>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pt_80 mobileSpec" id="">
        <div className="container">
          <div className="row ">
            <div className="col-12 text-center pb_30">
              <h2>Just In showroom</h2>
            </div>
            <div className="col-12 Latest_B "> 

                <ul className="img_sec">
                    <li >
                        <a href="#" className="img_1">
                            <img src={Img_01}/>
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

export default Dealer;
