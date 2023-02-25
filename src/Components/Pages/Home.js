import React, { useEffect, useRef, useState } from "react";
import Img_01 from "../../Assets/images/img_01.jpg";
import Img_02 from "../../Assets/images/img_02.jpg";
import ic_scrollDown from "../../Assets/images/ic_scrollDown.svg";
import car_03 from "../../Assets/images/car_03.jpg";
import car_04 from "../../Assets/images/car_04.jpg";
import img_05 from "../../Assets/images/img_05.jpg";
import img_06 from "../../Assets/images/img_06.jpg";
import addBanner from "../../Assets/images/Mask-group.png";
import ads_car_1 from "../../Assets/images/raffle-1.jpg";
import ads_car_2 from "../../Assets/images/home-raffel.png";
import Ferrari_512 from "../../Assets/images/1984_Ferrari_512_BBi.jpeg";
import Nissan_Fairlady from "../../Assets/images/Nissan_Fairlady.jpeg";
import manual_2dr_cpe from "../../Assets/images/manual-2dr-cpe.jpeg";
import BMW_Z4_Roadste from "../../Assets/images/BMW-Z4-Roadster-Right-Front-Three-Quarter-153914.jpg";
import ferrari_portofino from "../../Assets/images/2018-ferrari-portofino.jpg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import EastIcon from "@mui/icons-material/East";
import WestIcon from "@mui/icons-material/West";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { storeBlogData } from "../../redux/reducers/blogReducer";
import parse from "html-react-parser";
import { strToHtml } from "../UI/globaleVar";

function Home() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state);
  const blogs = data.blogReducer.blogData;
  const vehicleData = data.vehicleReducer.vehicleData;
  const [sliderData, setSliderData] = useState([]);
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_URL}/getblogs`);
        dispatch(storeBlogData(res.data.data));
      } catch (err) {
        console.log(err);
      }
    };
    fetchBlogs();
  }, []);
  useEffect(() => {
    const filteredAuctionVehicle = vehicleData.filter(
      (item) =>
        item.displayInAuction === "Yes" &&
        item.auctionType === "Premium listing"
    );
    setSliderData(filteredAuctionVehicle);
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
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: false,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    autoplay: true,
    speed: 3000,
    // pauseOnHover: true,
    // cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 2,
          initialSlide: 2,
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
    <div>
      <section className="heroSection d-flex align-items-center">
        <a type="button" className="scrollDownIc" href="#second">
          {/* <img src={ic_scrollDown} alt="ic_scrollDown" /> */}
          <span className="outer_cover">
            <small className="upper">
              <i class="fa fa-angle-down"></i>
            </small>
            <small className="lower">
              <i class="fa fa-angle-down"></i>
            </small>
          </span>
        </a>
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-8 offset-lg-2">
              <div className="heroText">
                <h1>WE ARE DEDICATED TO PARKING YOUR DREAM IN YOUR DRIVEWAY</h1>
                <Link to="/showroom" className="orange_btn">
                  VIEW INVENTORY
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="ptb_80" id="second">
        <div className="container">
          <div className="row ">
            <div className="col-12 text-center pb_30">
              <h2>Featured Auctions</h2>
            </div>

            <div className="col-12 slider_ht">
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
              <div className="featuredAuctions_Slide">
                <Slider ref={slide} {...settings}>
                  {sliderData &&
                    sliderData.map((curElem) => {
                      return (
                        <Link to={`/detail/${curElem.id}`}>
                          {parseInt(new Date(curElem.EndTime).getTime(), 10) -
                            parseInt(new Date().getTime(), 10) >
                            0 && (
                            <div key={curElem.id}>
                              <div className="card_post">
                                <div className="card_postImg">
                                  {curElem.images[0] ? (
                                    <img
                                      loading="lazy"
                                      src={
                                        curElem.images[0] &&
                                        `${process.env.REACT_APP_URL}/${curElem.images[0].imagePath}/${curElem.images[0].imageName}`
                                      }
                                      onError={({ currentTarget }) => {
                                        currentTarget.onError = null;
                                        currentTarget.src =
                                          "http://www.freeiconspng.com/uploads/no-image-icon-11.PNG";
                                      }}
                                      alt="Maskgroup1"
                                    />
                                  ) : (
                                    <img
                                      loading="lazy"
                                      src="http://www.freeiconspng.com/uploads/no-image-icon-11.PNG"
                                      alt="Maskgroup1"
                                    />
                                  )}
                                </div>
                                <div className="card_postInfo">
                                  <h4>
                                    {curElem.make} {curElem.model}{" "}
                                    {curElem.year}
                                  </h4>
                                  <p>{curElem.moreDescription}</p>
                                  <ul className="labelList">
                                    <li>
                                      <label>Current Bid:</label>{" "}
                                      <span>
                                        $
                                        {curElem.currentAmount
                                          ? curElem.currentAmount.auctionAmmount
                                          : curElem.documentFee}
                                      </span>
                                    </li>
                                    <li>
                                      <label>Ends In:</label>{" "}
                                      <span>
                                        {curElem.EndTime &&
                                          new Date(
                                            curElem.EndTime
                                          ).toDateString()}
                                      </span>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          )}
                        </Link>
                      );
                    })}
                </Slider>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <section className="ptb_50">
        <div className="container">
          <div className="row">
            <div className="col-12 pb_30">
              <h2 className="title_combo">
                Latest Bids{" "}
                <span>({showBidOnSlide.length} Auctions Now Live)</span>
              </h2>
            </div>
            <div
              style={{
                position: "absolute",
                right: "10%",
                top: "23.5%",
                cursor: "pointer",
              }}
            >
              <span onClick={() => slide1.current.slickPrev()}>
                <span>
                  <WestIcon />
                </span>
                <span>Prev</span>
              </span>
              <span
                onClick={() => slide1.current.slickNext()}
                style={{ marginLeft: 50 }}
              >
                <span>Next</span>
                <span style={{ height: "100px" }}>
                  <EastIcon />
                </span>
              </span>
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div
                className="latestBids_Slide arrowTop_Slide"
                style={{ height: "400px", width: "90%", margin: "auto" }}
              >
                <Slider ref={slide1} {...settings1}>
                  {showBidOnSlide.map((curElem) => {
                    return (
                      <div key={curElem.id}>
                        <div className="card_post">
                          <div className="card_postImg">
                            <img
                              src={
                                process.env.REACT_APP_URL + curElem.stepOneImage
                              }
                              alt="car_01"
                            />
                          </div>
                          <div className="card_postInfo">
                            <h5>
                              <a href="#">
                                {curElem.make} {curElem.model} {curElem.year}
                              </a>
                            </h5>
                            <ul className="priceDateList">
                              <li className="price__">
                                {curElem["currentAmount"] === undefined ||
                                curElem["currentAmount"] === null ? (
                                  <span>${curElem.documentFee}</span>
                                ) : (
                                  <span>
                                    ${curElem.currentAmount.auctionAmmount}
                                  </span>
                                )}
                              </li>
                              <li className="Date__">
                                <i className="fa-solid fa-clock"></i> 5 days
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  {showBidOnSlide.length <= 5 && (
                    <div>
                      <div className="card_post">
                        <div className="card_postImg">
                          <img src={car_02} alt="car_02" />
                        </div>
                        <div className="card_postInfo">
                          <h5>
                            <a href="#">1966 Porsche 912 Coupe</a>
                          </h5>
                          <ul className="priceDateList">
                            <li className="price__">$50,000</li>
                            <li className="Date__">
                              <i className="fa-solid fa-clock"></i> 5 days
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                  {showBidOnSlide.length <= 5 && (
                    <div>
                      <div className="card_post">
                        <div className="card_postImg">
                          <img src={car_03} alt="car_03" />
                        </div>
                        <div className="card_postInfo">
                          <h5>
                            <a href="#">2008 BMW M3 Sedan 6-Speed</a>
                          </h5>
                          <ul className="priceDateList">
                            <li className="price__">$15,000</li>
                            <li className="Date__">
                              <i className="fa-solid fa-clock"></i> 5 days
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                  {showBidOnSlide.length <= 5 && (
                    <div>
                      <div className="card_post">
                        <div className="card_postImg">
                          <img src={car_04} alt="car_04" />
                        </div>
                        <div className="card_postInfo">
                          <h5>
                            <a href="#">1999 Mercedes-Benz SL500</a>
                          </h5>
                          <ul className="priceDateList">
                            <li className="price__">$16,250</li>
                            <li className="Date__">
                              <i className="fa-solid fa-clock"></i> 5 days
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </Slider>
              </div>
            </div>
          </div>
        </div>
      </section> */}
      {/* <section className="px-md-4">
        <div className="col-12 pb_30">
          <h2 className="title_combo">
            Latest Bids <span>({showBidOnSlide.length} Auctions Now Live)</span>
          </h2>
        </div>
        <div className="row row-cols-1 row-cols-md-4 g-4 pb-2">
          {showBidOnSlide.map((curElem, i) => {
            return (
              <div className="col mb-3" key={i}>
                <div className="card h-100 border-0 ">
                  <img
                    src={process.env.REACT_APP_URL + curElem.stepOneImage}
                    className="card-img-top"
                    style={{ maxHeight: "25vh" }}
                    alt={curElem.make}
                  />
                  <div className="card-body contSec">
                    <h5 className="card-title">
                      {curElem.make} {curElem.model} {curElem.year}
                    </h5>
                    <p className="priceDateList">
                      {curElem["currentAmount"] === undefined ||
                      curElem["currentAmount"] === null ? (
                        <span>${curElem.documentFee}</span>
                      ) : (
                        <span>${curElem.currentAmount.auctionAmmount}</span>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section> */}
      <section className="ptb_80 bgHolder bgImg01 d-flex align-items-center">
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-4 offset-md-1 text-center text-md-left">
              <h1 className="text-back">Find Your Dream Car</h1>
              <Link to="/showroom" className="orange_btn mt-2">
                VIEW INVENTORY
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="ptb_80 bgHolder bgImg02 d-flex align-items-center">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-8 col-lg-6 col-xl-6 offset-md-4 offset-lg-5 offset-xl-6 text-center text-md-right">
              <h1 className="text">Sell Your High Quality classic Car</h1>
              <Link to="/showroom" className="orange_btn mt-2">
                VIEW INVENTORY
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="ptb_50 blogSection">
        <div className="custom_container">
          <div className="row">
            <div className="col-12 text-center pb_30">
              <h2>Latest Blogs</h2>
            </div>
            <div className="col-12 ">
              {blogs &&
                blogs.slice(0, 4).map((curElem, i) => {
                  return (
                    <div key={i} className="row pb_30">
                      <div
                        className={`order-md-${
                          i % 2 === 0 ? 0 : 1
                        } col-12 col-md-6 col-lg-7`}
                      >
                        <div className="blogPost">
                          <img
                            src={`${process.env.REACT_APP_URL}upload/blogs/${curElem.image}`}
                            alt={curElem.title}
                          />
                        </div>
                      </div>
                      <div className="col-12 col-md-6 col-lg-5 blogs_content">
                        <div className="blogPostText">
                          <h4>{curElem.title}</h4>
                          <ul className="post_labelList">
                            <li>
                              <i className="fa-solid fa-clock"></i>{" "}
                              {curElem.created_at &&
                                new Date(curElem.created_at).toDateString()}
                            </li>
                            {/* <li>
                              <i className="fa-solid fa-location-dot"></i>{" "}
                              {curElem.location}
                            </li>
                            <li>
                              <i className="fa-solid fa-comment-dots"></i>{" "}
                              {curElem.comment}&nbsp;Comments
                            </li> */}
                          </ul>
                          {/* <p>{curElem.description.substr(0, 500)}</p> */}
                          <p>
                            {parse(
                              curElem?.description.substr(0, 700),
                              strToHtml
                            )}
                          </p>
                          {curElem.description.length > 500 && (
                            <Link
                              to={`/blogdetail/${curElem.id}`}
                              className="orange_btn"
                            >
                              Read More
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              {/* <!--row--> */}
              {/* <div className="row pb_30">
                <div className="col-12 col-md-6 col-lg-7 order-md-1">
                  <div className="blogPost">
                    <img src={Nissan_Fairlady} alt="car_04" />
                  </div>
                </div>
                <div className="col-12 col-md-6 col-lg-5 d-flex align-items-center order-md-0">
                  <div className="blogPostText">
                    <h4>Gas Guzzlrs Auction: 50-Years-Owned 1972 Datsun 240Z</h4>
                    <ul className="post_labelList">
                      <li>
                        <i className="fa-solid fa-clock"></i> September 13, 2022
                      </li>
                      <li>
                        <i className="fa-solid fa-location-dot"></i> Miami
                      </li>
                      <li>
                        <i className="fa-solid fa-comment-dots"></i> 14 Comments
                      </li>
                    </ul>
                    <p>
                      The Datsun 240Z upended the sports car world when it
                      arrived, offering closed-coupe comfort with six-cylinder
                      performance beyond many European roadsters and coupes on
                      the market. The Z’s performance, $3,500 price, and
                      semi-exotic styling (for the time) made it an immediate
                      hit. It would be the rare car enthusiast today who did not
                      know how well the rest of the story went. Suffice to say,
                      more than 50 years later, the Z is still with us and still
                      impressing with the same attributes that made the original
                      an instant legend.
                    </p>
                    <Link to="/blogdetail" className="btn">
                      Read More
                    </Link>
                  </div>
                </div>
              </div> */}

              {/* <div className="row pb_30">
                <div className="col-12 col-md-6 col-lg-7">
                  <div className="blogPost">
                    <img src={img_05} alt="img_05" />
                  </div>
                </div>
                <div className="col-12 col-md-6 col-lg-5 d-flex align-items-center">
                  <div className="blogPostText">
                    <h4>Gas Guzzlrs Auction: 1984 Ferrari 512 BBi</h4>
                    <ul className="post_labelList">
                      <li>
                        <i className="fa-solid fa-clock"></i> September 13, 2022
                      </li>
                      <li>
                        <i className="fa-solid fa-location-dot"></i> Italian
                      </li>
                      <li>
                        <i className="fa-solid fa-comment-dots"></i> 14 Comments
                      </li>
                    </ul>
                    <p>
                      This 1962 Jaguar XKE is a left-hand-drive Series I coupe
                      that was completed on June 7, 1962, and is said to have
                      been sold new in California. It was moved to Michigan in
                      1987 and underwent a mechanical refurbishment by Eclectic
                      Motorworks of Holland, Michigan, that was completed in
                      2020 before it was acquired by the selling dealer from its
                      owner of 35 years in 2021.
                    </p>
                    <Link to="/blogdetail" className="btn">
                      Read More
                    </Link>
                  </div>
                </div>
              </div>
              <div className="row pb_30">
                <div className="col-12 col-md-6 col-lg-7 order-md-1">
                  <div className="blogPost">
                    <img src={img_06} alt="img_06" />
                  </div>
                </div>
                <div className="col-12 col-md-6 col-lg-5 d-flex align-items-center order-md-0">
                  <div className="blogPostText">
                    <h4>Gas Guzzlrs Auction: 50-Years-Owned 1972 Datsun 240Z</h4>
                    <ul className="post_labelList">
                      <li>
                        <i className="fa-solid fa-clock"></i> September 13, 2022
                      </li>
                      <li>
                        <i className="fa-solid fa-location-dot"></i> Italian
                      </li>
                      <li>
                        <i className="fa-solid fa-comment-dots"></i> 14 Comments
                      </li>
                    </ul>
                    <p>
                      This 1962 Jaguar XKE is a left-hand-drive Series I coupe
                      that was completed on June 7, 1962, and is said to have
                      been sold new in California. It was moved to Michigan in
                      1987 and underwent a mechanical refurbishment by Eclectic
                      Motorworks of Holland, Michigan, that was completed in
                      2020 before it was acquired by the selling dealer from its
                      owner of 35 years in 2021.
                    </p>
                    <Link to="/blogdetail" className="btn">
                      Read More
                    </Link>
                  </div>
                </div>
              </div> */}
              <div className="row">
                <div className="col-12 text-center pt_40">
                  <Link to="/blogs" className="orange_btn">
                    View More Blogs
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="ptb_80 blogPostText rf">
        <div className="container">
          <div className="row">
            <a href="/carraffle" className="full">
              <div className="col-lg-6 col-sm-12 pb_30 rafSect">
                <h2>Win this car !</h2>
                <p>Win the car of your dreams</p>
                <div className="price_">
                  <p>
                    Ends In:{" "}
                    {new Date(data.lotteryReducer.date).toLocaleDateString()}
                  </p>
                </div>
                <button className="orange_btn">Buy Tickets</button>
              </div>
              <div className="col-lg-6 col-sm-12 text-center pb_30 carBg">
                <img src={ads_car_2} className="addBanner" />
              </div>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
