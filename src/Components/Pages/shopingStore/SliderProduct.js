import React, { useRef } from "react";
import "./Shopdetail.css";
import img_04 from "../../../Assets/images/img-4.png";
import img_05 from "../../../Assets/images/img-8.webp";
import img_07 from "../../../Assets/images/img-7.jpeg";
import img_01 from "../../../Assets/images/img-1.webp";
import img_02 from "../../../Assets/images/img-2.webp";
import img_03 from "../../../Assets/images/img-3.webp";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import EastIcon from "@mui/icons-material/East";
import WestIcon from "@mui/icons-material/West";

const SliderProduct = () => {
  const data = useSelector((state) => state);
  const products = data.gearReducer.gearData;

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
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    autoplay: true,
    speed: 3000,
    pauseOnHover: true,
    cssEase: "linear",
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
          slidesToShow: 2,
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
    <>
      <section className="ptb_80">
        <div className="container">
          <div className="row">
            <div className="col-12 pb_30">
              <h2 className="title_combo">Related Products</h2>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div
                style={{
                  position: "absolute",
                  right: "4%",
                  cursor: "pointer",
                  top: "-8%",
                }}
              >
                <span onClick={() => slide.current.slickPrev()}>
                  <span>
                    <WestIcon />
                  </span>
                  <span>Prev</span>
                </span>
                <span
                  onClick={() => slide.current.slickNext()}
                  style={{ marginLeft: 50 }}
                >
                  <span>Next</span>
                  <span style={{ height: "100px" }}>
                    <EastIcon />
                  </span>
                </span>
              </div>

              <div
                className="fore_Slide arrowTop_Slide"
                style={{ height: "350px" }}
              >
                <Slider ref={slide} {...settings}>
                  <div>
                    <div className="card_post">
                      <div className="card_postImg">
                        <img src={img_01} alt="car_01" />
                      </div>
                      <div className="card_postInfo">
                        <h5>
                          <a href="#">New Make, Model, and Category Pages</a>
                        </h5>
                        <ul className="priceDateList">
                          <li className="Date__">
                            <i className="fa-solid fa-clock"></i> 5 days
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="card_post">
                      <div className="card_postImg">
                        <img src={img_02} alt="car_02" />
                      </div>
                      <div className="card_postInfo">
                        <h5>
                          <a href="#">Model, and Category Pages</a>
                        </h5>
                        <ul className="priceDateList">
                          <li className="Date__">
                            <i className="fa-solid fa-clock"></i> 2 days
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="card_post">
                      <div className="card_postImg">
                        <img src={img_03} alt="car_03" />
                      </div>
                      <div className="card_postInfo">
                        <h5>
                          <a href="#">
                            New Inventory in the GasGuzzlrs Gear Store!
                          </a>
                        </h5>
                        <ul className="priceDateList">
                          <li className="Date__">
                            <i className="fa-solid fa-clock"></i> 2 days
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="card_post">
                      <div className="card_postImg">
                        <img src={img_04} alt="car_04" />
                      </div>
                      <div className="card_postInfo">
                        <h5>
                          <a href="#">1999 Mercedes-Benz SL500</a>
                        </h5>
                        <ul className="priceDateList">
                          <li className="Date__">
                            <i className="fa-solid fa-clock"></i> 5 days
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="card_post">
                      <div className="card_postImg">
                        <img src={img_05} alt="car_01" />
                      </div>
                      <div className="card_postInfo">
                        <h5>
                          <a href="#">2005 Morgan Aero 8</a>
                        </h5>
                        <ul className="priceDateList">
                          <li className="Date__">
                            <i className="fa-solid fa-clock"></i> 5 days
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="card_post">
                      <div className="card_postImg">
                        <img src={img_07} alt="car_02" />
                      </div>
                      <div className="card_postInfo">
                        <h5>
                          <a href="#">1966 Porsche 912 Coupe</a>
                        </h5>
                        <ul className="priceDateList">
                          <li className="Date__">
                            <i className="fa-solid fa-clock"></i> 5 days
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="card_post">
                      <div className="card_postImg">
                        <img src={img_01} alt="car_03" />
                      </div>
                      <div className="card_postInfo">
                        <h5>
                          <a href="#">2008 BMW M3 Sedan 6-Speed</a>
                        </h5>
                        <ul className="priceDateList">
                          <li className="Date__">
                            <i className="fa-solid fa-clock"></i> 5 days
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="card_post">
                      <div className="card_postImg">
                        <img src={img_02} alt="car_04" />
                      </div>
                      <div className="card_postInfo">
                        <h5>
                          <a href="#">1999 Mercedes-Benz SL500</a>
                        </h5>
                        <ul className="priceDateList">
                          <li className="Date__">
                            <i className="fa-solid fa-clock"></i> 5 days
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </Slider>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SliderProduct;
