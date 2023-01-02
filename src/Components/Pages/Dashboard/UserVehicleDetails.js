import axios from "axios";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

import img_01 from "../../../Assets/images/th.jpeg";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import EastIcon from "@mui/icons-material/East";
import WestIcon from "@mui/icons-material/West";

const UserVehicleDetails = () => {
  const slide = useRef(null);
  const { id } = useParams();
  const [vehicle, setVehicle] = useState({});
  const fetchVehicleApi = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_URL}vehicle/${id}`
      );
      if (response.data.data) {
        setVehicle(response.data.data[0]);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchVehicleApi();
  }, [id]);
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
    // autoplay: true,
    // speed: 10000,
    // pauseOnHover: true,
    // cssEase: "linear"
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
// console.log("vehicle##",vehicle)

  return (
    <div>
      <section className="ptb_80 pt_sm_50">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center pb_30">
              <h2 className="title_combo title_Center">
                {vehicle.make}-{vehicle.model}-{vehicle.year}
              </h2>
            </div>
            <div className="col-12">
              <div className="detailPostOption"></div>
            </div>
          </div>

          <div className="row">
            <div className="col-6">
              <div className="postHero">
                <img
                  src="https://tse4.mm.bing.net/th?id=OIP.vf11XywUrdCTiM2RtALitAHaFU&pid=Api&P=0"
                  alt="details-images"
                />
              </div>
            </div>
            <div className="col-6 dropdownCol">
              <div className="dropdown mr-2">
                <button
                  type="button"
                  className="gry_btn"
                  data-toggle="dropdown"
                >
                  Make: make
                </button>
                <div className="dropdown-menu">
                  <a className="dropdown-item" href="#">
                    View all listings
                  </a>
                  <a className="dropdown-item" href="#">
                    Notify me about new listings
                  </a>
                </div>
              </div>
              <div className="dropdown mr-2">
                <button
                  type="button"
                  className="gry_btn"
                  data-toggle="dropdown"
                >
                  Model: model name
                </button>
                <div className="dropdown-menu">
                  <a className="dropdown-item" href="#">
                    View all listings
                  </a>
                  <a className="dropdown-item" href="#">
                    Notify me about new listings
                  </a>
                </div>
              </div>
              <div className="dropdown mr-2">
                <button type="button" className="gry_btn">
                  Era: era
                </button>
                <div className="dropdown-menu">
                  <a className="dropdown-item" href="#">
                    View all listings
                  </a>
                  <a className="dropdown-item" href="#">
                    Notify me about new listings
                  </a>
                </div>
              </div>
              <div className="dropdown mr-2">
                <button type="button" className="gry_btn">
                  More Photos
                </button>

                <div className="dropdown-menu">
                  <a className="dropdown-item" href="#">
                    View all listings
                  </a>
                  <a className="dropdown-item" href="#">
                    Notify me about new listings
                  </a>
                </div>
              </div>
              <div className="pb_40" id="placeBid_col">
                  <div className="card_Gray">
                      <h5 className="cardTitle">CAR INFORMATION</h5>
                      <ul className="bidList_ info_">
                        <li>
                          <label htmlFor="">40 Miles</label>
                        </li>

                        <li>
                          Interstellar <label htmlFor=""> Interstellar</label>
                        </li>

                        <li>
                          <label htmlFor="">Location: delhi</label>
                        </li>

                        <li>
                          <label htmlFor="">
                            {" "}
                            accessories {vehicle.accessories}
                          </label>
                        </li>
                        <li>
                          <label htmlFor="">vehicle details</label>
                        </li>

                        <li>
                          Body Work <label htmlFor=""> Recently Painted</label>
                        </li>

                        <li>
                          <label htmlFor=""> Reserve {vehicle.reserve}</label>
                        </li>

                        <li>
                          Size tires <label htmlFor="">{vehicle.sizetires}</label>
                        </li>
                        <li>
                          <label htmlFor="">pickone</label>
                        </li>

                        <li>
                          Brand <label htmlFor="">brand</label>
                        </li>

                        <li>
                          <label htmlFor="">
                            Private Party or Dealer :dealer
                          </label>
                        </li>
                      </ul>
                      <br/><br/>
                      <button className="btn btn-warning">Approve</button>
                  </div>
              </div>
            </div>
            
            <div className="col-12">
             <h3>PHOTO GALLERY</h3>
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
                     
                    </div>
                  </div>

                  <div>
                    <div className="card_post">
                      <div className="card_postImg">
                        <img src={img_01} alt="car_02" />
                      </div>
                      
                    </div>
                  </div>
                  <div>
                    <div className="card_post">
                      <div className="card_postImg">
                        <img src={img_01} alt="car_03" />
                      </div>
                      
                    </div>
                  </div>
                  <div>
                    <div className="card_post">
                      <div className="card_postImg">
                        <img src={img_01} alt="car_04" />
                      </div>
                      
                    </div>
                  </div>
                  <div>
                    <div className="card_post">
                      <div className="card_postImg">
                        <img src={img_01} alt="car_01" />
                      </div>
                      
                    </div>
                  </div>
                  <div>
                    <div className="card_post">
                      <div className="card_postImg">
                        <img src={img_01} alt="car_02" />
                      </div>
                      
                    </div>
                  </div>
                  <div>
                    <div className="card_post">
                      <div className="card_postImg">
                        <img src={img_01} alt="car_03" />
                      </div>
                      
                    </div>
                  </div>
                  <div>
                    <div className="card_post">
                      <div className="card_postImg">
                        <img src={img_01} alt="car_04" />
                      </div>
                     
                    </div>
                  </div>
                </Slider>
              </div>
            </div>
            </div>
           
          </div>

         
        </div>
      </section>
    </div>
  );
};

export default UserVehicleDetails;
