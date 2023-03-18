import React, { useEffect, useRef, useState } from "react";
import ads_car_2 from "../../Assets/images/home-raffel.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { storeBlogData } from "../../redux/reducers/blogReducer";
import parse from "html-react-parser";
import { strToHtml } from "../UI/globaleVar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function Home() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state);
  const blogs = data.blogReducer.blogData;
  const vehicleData = data.vehicleReducer.vehicleData;
  const [sliderData, setSliderData] = useState([]);
  const [lottery, setLottery] = useState();

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

    axios.get(`${process.env.REACT_APP_URL}getLotteryDetail`).then((d) => { setLottery(d?.data.data) })

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
                                    {curElem.image_banner ? (
                                      <img
                                        loading="lazy"
                                        src={
                                          curElem.image_banner[0] &&
                                          `${process.env.REACT_APP_URL}/${curElem.image_banner[0].imagePath}/${curElem.image_banner[0].imageName}`
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
                                    <p>
                                      {curElem?.moreDescription &&
                                        parse(
                                          curElem?.moreDescription?.substr(
                                            0,
                                            300
                                          ),
                                          strToHtml
                                        )}
                                    </p>
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
                        className={`order-md-${i % 2 === 0 ? 0 : 1
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

                            <li>
                              <AccountCircleIcon />
                              {curElem.username}
                            </li>
                          </ul>
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
              <div className="row">
                <div className="col-12 text-center pt_40">
                  <Link to="/blogs" className="orange_btn">
                    View More
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
              <div
                className={`disFlex .slider`}
              >
                <div className={`p-2 slideTrack`}>
                  {
                    lottery?.map((d, i) => {
                      return (
                        <div key={i} className={`slide`}>
                          <a href="/carraffle" className="full">
                          <div className="col-lg-6 col-sm-12 pb_30 rafSect">
                            <h2>{d?.name}</h2>
                            <p>{d?.description}</p>
                            <div className="price_">
                              <p>{d?.dealEndDate}</p>
                            </div>
                            <button className="orange_btn">Buy Tickets</button>
                          </div>
                          <div className="col-lg-6 col-sm-12 text-center pb_30 carBg">
                            <img src={ads_car_2} className="addBanner" />
                          </div>
                          </a>
                        </div>
                      )
                    })
                  }
                </div>
              </div>
          </div>
        </div>
      </section>

    </div>
  );
}

export default Home;
