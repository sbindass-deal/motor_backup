import React, { useRef } from "react";
import car_01 from "../../Assets/images/car_01.jpg";
import car_02 from "../../Assets/images/car_02.jpg";
import car_03 from "../../Assets/images/car_03.jpg";
import car_04 from "../../Assets/images/car_04.jpg";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import EastIcon from "@mui/icons-material/East";
import WestIcon from "@mui/icons-material/West";
import axios from "axios";
import { Navigate, useNavigation } from "react-router-dom";

function MakeAnModel() {
  const [data, setData] = React.useState([]);
  const [make, setMake] = React.useState([]);
  const navigate = useNavigation();
  const slide = useRef(null);
  const slide1 = useRef(null);
  const slide2 = useRef(null);
  const slide3 = useRef(null);

  React.useEffect(() => {
    axios.get(process.env.REACT_APP_URL + "vehicles").then((response) => {
      let uniqueObjArray = [
        ...new Map(
          response.data.data.map((item) => [item["make"], item])
        ).values(),
      ];

      setMake(uniqueObjArray);
      setData(response.data.data);
    });
  }, []);

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
  return (
    <>
      <section className="pt_80 pt_sm_50">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center pb_30">
              <h2 className="title_combo title_Center">
                Makes and Models Directory
              </h2>
            </div>
            <div className="col-12">
              <ul className="postTopOption">
                <li className="post_search">
                  <input
                    type="text"
                    name=""
                    placeholder="Search for a make or model"
                  />
                </li>
                <li className="">
                  <button
                    type="button"
                    className="gry_btn"
                    data-toggle="modal"
                    data-target="#FiltersModal"
                  >
                    <i className="fa-solid fa-filter mr-2"></i> Filters
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div className="modal fade" id="FiltersModal">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header border-0">
                  <h4 className="modal-title">Filters</h4>
                  <button type="button" className="close" data-dismiss="modal">
                    <i className="fa-solid fa-xmark"></i>
                  </button>
                </div>

                <div className="modal-body">
                  <form>
                    <div className="row row_gap_5">
                      <div className="col-12 col-md-6">
                        <label>Vehicle Year</label>
                        <div className="form-group">
                          <input
                            type="text"
                            name=""
                            className="field"
                            placeholder="1900"
                          />
                        </div>
                      </div>
                      <div className="col-12 col-md-6">
                        <label>To</label>
                        <div className="form-group">
                          <input
                            type="text"
                            name=""
                            className="field"
                            placeholder="2023"
                          />
                        </div>
                      </div>
                      <div className="col-12 col-md-6">
                        <label>List Date</label>
                        <div className="form-group">
                          <select className="field">
                            <option>All Time</option>
                            <option>7 Days</option>
                            <option>Last Month</option>
                            <option>Last Year</option>
                            <option>Last 2 Year</option>
                            <option>Last 5 Year</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-12 col-md-6">
                        <label>Result</label>
                        <div className="form-group">
                          <select className="field">
                            <option>All</option>
                            <option>Sold Only</option>
                            <option>Reserve Not Met</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-12 col-md-6">
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
                      </div>
                      <div className="col-12 col-md-6">
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
                      </div>
                      <div className="col-12 col-md-12">
                        <label>Exclude Words / Models / Tags</label>
                        <div className="form-group">
                          <input
                            type="text"
                            name=""
                            className="field"
                            placeholder="Enter"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <button type="button" className="btn">
                        Filters
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {make.length > 0 ? (
        <section className="pt_40">
          <div className="container">
            <div className="row">
              <div className="col-12 pb-3">
                <h3 className="title_combo">{make[0].make}</h3>
              </div>

              <div
                style={{ position: "absolute", right: "8%", cursor: "pointer" }}
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

              <div className="col-12 " style={{ height: "290px" }}>
                <div className="makes_Slide arrowTop_Slide ">
                  <Slider ref={slide} {...settings}>
                    {data
                      .filter((filter) => filter.make === make[0].make)
                      .map((data) => (
                        <div>
                          <div className="card_post">
                            <div className="card_postImg">
                              <a href="detail">
                                <button
                                  type="button"
                                  className="watchedIc"
                                  onClick={() =>
                                    navigate("/details/" + data.isd)
                                  }
                                >
                                  <span
                                    data-toggle="tooltip"
                                    data-placement="bottom"
                                    title="Notify me when one is listed"
                                  >
                                    <i className="fa-solid fa-bell"></i>
                                  </span>
                                </button>
                                <img
                                  src={
                                    process.env.REACT_APP_URL +
                                    data.stepOneImage
                                  }
                                  alt="car_01"
                                />
                              </a>
                            </div>
                            <div className="card_postInfo">
                              <h6>
                                <a href="#">{data.model}</a>
                              </h6>
                            </div>
                          </div>
                        </div>
                      ))}
                  </Slider>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {make.length > 1 ? (
        <section className="pt_40">
          <div className="container">
            <div className="row">
              <div className="col-12 pb-3">
                <h3 className="title_combo">{make[1].make}</h3>
              </div>

              <div
                style={{ position: "absolute", right: "8%", cursor: "pointer" }}
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

              <div className="col-12" style={{ height: "290px" }}>
                <div className="makes_Slide arrowTop_Slide">
                  <Slider ref={slide1} {...settings}>
                    {data
                      .filter((filter) => filter.make === make[1].make)
                      .map((data) => (
                        <div>
                          <div className="card_post">
                            <div className="card_postImg">
                              <a href="detail">
                                <button
                                  type="button"
                                  className="watchedIc"
                                  data-toggle="modal"
                                  data-target="#loginModal"
                                >
                                  <span
                                    data-toggle="tooltip"
                                    data-placement="bottom"
                                    title="Notify me when one is listed"
                                  >
                                    <i className="fa-solid fa-bell"></i>
                                  </span>
                                </button>
                                <img
                                  src={
                                    process.env.REACT_APP_URL +
                                    data.stepOneImage
                                  }
                                  alt="car_01"
                                />
                              </a>
                            </div>
                            <div className="card_postInfo">
                              <h6>
                                <a href="#">{data.model}</a>
                              </h6>
                            </div>
                          </div>
                        </div>
                      ))}
                  </Slider>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {make.length > 2 ? (
        <section className="pt_40">
          <div className="container">
            <div className="row">
              <div className="col-12 pb-3">
                <h3 className="title_combo">{make[2].make}</h3>
              </div>
              <div
                style={{ position: "absolute", right: "8%", cursor: "pointer" }}
              >
                <span onClick={() => slide2.current.slickPrev()}>
                  <span>
                    <WestIcon />
                  </span>
                  <span>Prev</span>
                </span>
                <span
                  onClick={() => slide2.current.slickNext()}
                  style={{ marginLeft: 50 }}
                >
                  <span>Next</span>
                  <span style={{ height: "100px" }}>
                    <EastIcon />
                  </span>
                </span>
              </div>

              <div className="col-12" style={{ height: "290px" }}>
                <div className="makes_Slide arrowTop_Slide">
                  <Slider ref={slide2} {...settings}>
                    {data
                      .filter((filter) => filter.make === make[2].make)
                      .map((data) => (
                        <div>
                          <div className="card_post">
                            <div className="card_postImg">
                              <a href="detail">
                                <button
                                  type="button"
                                  className="watchedIc"
                                  data-toggle="modal"
                                  data-target="#loginModal"
                                >
                                  <span
                                    data-toggle="tooltip"
                                    data-placement="bottom"
                                    title="Notify me when one is listed"
                                  >
                                    <i className="fa-solid fa-bell"></i>
                                  </span>
                                </button>
                                <img src={car_01} alt="car_01" />
                              </a>
                            </div>
                            <div className="card_postInfo">
                              <h6>
                                <a href="#">
                                  sdafasdfasd 3.5 Litre & 4 1/4 Litre
                                </a>
                              </h6>
                            </div>
                          </div>
                        </div>
                      ))}
                  </Slider>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {make.length > 3 ? (
        <section className="pt_40">
          <div className="container">
            <div className="row">
              <div className="col-12 pb-3">
                <h3 className="title_combo">{make[3].make}</h3>
              </div>
              <div
                style={{ position: "absolute", right: "8%", cursor: "pointer" }}
              >
                <span onClick={() => slide3.current.slickPrev()}>
                  <span>
                    <WestIcon />
                  </span>
                  <span>Prev</span>
                </span>
                <span
                  onClick={() => slide3.current.slickNext()}
                  style={{ marginLeft: 50 }}
                >
                  <span>Next</span>
                  <span style={{ height: "100px" }}>
                    <EastIcon />
                  </span>
                </span>
              </div>

              <div className="col-12" style={{ height: "290px" }}>
                <div className="makes_Slide arrowTop_Slide">
                  <Slider ref={slide3} {...settings}>
                    {data
                      .filter((filter) => filter.make === make[3].make)
                      .map((data) => (
                        <div>
                          <div className="card_post">
                            <div className="card_postImg">
                              <a href="detail">
                                <button
                                  type="button"
                                  className="watchedIc"
                                  data-toggle="modal"
                                  data-target="#loginModal"
                                >
                                  <span
                                    data-toggle="tooltip"
                                    data-placement="bottom"
                                    title="Notify me when one is listed"
                                  >
                                    <i className="fa-solid fa-bell"></i>
                                  </span>
                                </button>
                                <img src={car_01} alt="car_01" />
                              </a>
                            </div>
                            <div className="card_postInfo">
                              <h6>
                                <a href="#">
                                  sdafasdfasd 3.5 Litre & 4 1/4 Litre
                                </a>
                              </h6>
                            </div>
                          </div>
                        </div>
                      ))}
                  </Slider>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}

export default MakeAnModel;
