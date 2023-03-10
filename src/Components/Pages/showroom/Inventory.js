import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import car_01 from "../../../Assets/images/car_01.jpg";
import car_02 from "../../../Assets/images/car_02.jpg";
import car_03 from "../../../Assets/images/car_03.jpg";
import car_04 from "../../../Assets/images/car_04.jpg";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import {
  clearShowroomFilter,
  filterShowroomData,
} from "../../../redux/reducers/vehicleReducer";
import { Modal } from "react-bootstrap";

const Inventory = () => {
  const dispatch = useDispatch();
  const logingUser = useSelector((state) => state);
  const vehicleData = logingUser.vehicleReducer.showroomData;
  const category = logingUser.vehicleReducer.filterCategory;
  const [filteredModal, setFilteredModal] = useState(false);
  const [searchInputValue, setSearchInputValue] = useState("");
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
      [e.target.name]: e.target.value,
    });
  };
  const clearFilter = () => {
    setFilterInput({
      year: "",
      make: "",
      model: "",
      state: "",
      city: "",
    });
    handleFilteredModalClose();

    dispatch(clearShowroomFilter());
  };
  const handleFilteredModalClose = () => {
    setFilteredModal(false);
  };
  const handleFilteredModalShow = () => {
    setFilteredModal(true);
  };

  const handleFilterFormSubmit = (e) => {
    e.preventDefault();
    handleFilteredModalClose();
    console.log(1111, filterInput);
    dispatch(filterShowroomData(filterInput));
  };

  useEffect(() => {
    dispatch(clearShowroomFilter());
  }, []);

  const searchedData =
    searchInputValue.trim().length > 0
      ? vehicleData &&
        vehicleData.filter(
          (item) =>
            (item.make && item.make.toLowerCase().includes(searchInputValue)) ||
            (item.year && item.year.toLowerCase().includes(searchInputValue)) ||
            (item.model && item.model.toLowerCase().includes(searchInputValue))
        )
      : vehicleData;

  const slide1 = useRef(null);
  const slide2 = useRef(null);
  const slide3 = useRef(null);
  const slide4 = useRef(null);

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
    slidesToScroll: 3,
    arrows: false,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    // autoplay: true,
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
    <>
      <div className="col-12 text-center  ">
        <h2>All Vehicles</h2>
      </div>

      <section className="" id="second">
        <div className="container">
          <div className="row ">
            {/* <div className="col-12 text-center pb_30">
              <h2>Featured Auctions</h2>
            </div> */}
          </div>
        </div>
      </section>

      <section className="pt_40">
        <div className="container">
          <div className="col-12 col-lg-12 py-2">
            <h4 className="text-center">
              <span className="text-warning">{searchedData.length}</span> &nbsp;
              Vehicles
            </h4>
            <ul className="postTopOption">
              <li className="post_search">
                <input
                  type="search"
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

          <div className="col-12 inveSlid">
            <h1>Acura</h1>
            <div className="nextArrow">
              <span
                className="slide-arrow prev-arrow slick-arrow"
                onClick={() => slide1.current.slickPrev()}
              >
                <span className="">Prev</span>
              </span>
              <span
                className="slide-arrow next-arrow slick-arrow slick-disabled"
                onClick={() => slide1.current.slickNext()}
              >
                <span className="">Next</span>
              </span>
            </div>
            <div className="featuredAuctions_Slide">
              <Slider ref={slide1} {...settings}>
                <div>
                  <h3>
                    <img src={car_01} alt="" />
                  </h3>
                  <div class="card_postInfo">
                    <h6>
                      <a href="#">Acura Integra</a>
                    </h6>
                  </div>
                </div>
                <div>
                  <h3>
                    <img src={car_02} alt="" />
                  </h3>
                  <div class="card_postInfo">
                    <h6>
                      <a href="#">Acura Integra</a>
                    </h6>
                  </div>
                </div>
                <div>
                  <h3>
                    <img src={car_03} alt="" />
                  </h3>
                  <div class="card_postInfo">
                    <h6>
                      <a href="#">Acura Integra</a>
                    </h6>
                  </div>
                </div>
                <div>
                  <h3>
                    <img src={car_04} alt="" />
                  </h3>
                  <div class="card_postInfo">
                    <h6>
                      <a href="#">Acura Integra</a>
                    </h6>
                  </div>
                </div>
                <div>
                  <h3>
                    <img src={car_01} alt="" />
                  </h3>
                  <div class="card_postInfo">
                    <h6>
                      <a href="#">Acura Integra</a>
                    </h6>
                  </div>
                </div>
                <div>
                  <h3>
                    <img src={car_02} alt="" />
                  </h3>
                  <div class="card_postInfo">
                    <h6>
                      <a href="#">Acura Integra</a>
                    </h6>
                  </div>
                </div>
                <div>
                  <h3>
                    <img src={car_03} alt="" />
                  </h3>
                  <div class="card_postInfo">
                    <h6>
                      <a href="#">Acura Integra</a>
                    </h6>
                  </div>
                </div>
                <div>
                  <h3>
                    <img src={car_04} alt="" />
                  </h3>
                  <div class="card_postInfo">
                    <h6>
                      <a href="#">Acura Integra</a>
                    </h6>
                  </div>
                </div>
              </Slider>
            </div>
          </div>

          <div className="col-12 inveSlid">
            <h1>Alfa Romeo</h1>
            <div className="nextArrow">
              <span
                className="slide-arrow prev-arrow slick-arrow"
                onClick={() => slide2.current.slickPrev()}
              >
                <span className="">Prev</span>
              </span>
              <span
                className="slide-arrow next-arrow slick-arrow slick-disabled"
                onClick={() => slide2.current.slickNext()}
              >
                <span className="">Next</span>
              </span>
            </div>
            <div className="featuredAuctions_Slide">
              <Slider ref={slide2} {...settings}>
                <div>
                  <h3>
                    <img src={car_01} alt="" />
                  </h3>
                  <div class="card_postInfo">
                    <h6>
                      <a href="#">Alfa Romeo Integra</a>
                    </h6>
                  </div>
                </div>
                <div>
                  <h3>
                    <img src={car_02} alt="" />
                  </h3>
                  <div class="card_postInfo">
                    <h6>
                      <a href="#">Alfa Romeo Integra</a>
                    </h6>
                  </div>
                </div>
                <div>
                  <h3>
                    <img src={car_03} alt="" />
                  </h3>
                  <div class="card_postInfo">
                    <h6>
                      <a href="#">Alfa Romeo Integra</a>
                    </h6>
                  </div>
                </div>
                <div>
                  <h3>
                    <img src={car_04} alt="" />
                  </h3>
                  <div class="card_postInfo">
                    <h6>
                      <a href="#">Alfa Romeo Integra</a>
                    </h6>
                  </div>
                </div>
                <div>
                  <h3>
                    <img src={car_01} alt="" />
                  </h3>
                  <div class="card_postInfo">
                    <h6>
                      <a href="#">Alfa Romeo Integra</a>
                    </h6>
                  </div>
                </div>
                <div>
                  <h3>
                    <img src={car_02} alt="" />
                  </h3>
                  <div class="card_postInfo">
                    <h6>
                      <a href="#">Alfa Romeo Integra</a>
                    </h6>
                  </div>
                </div>
                <div>
                  <h3>
                    <img src={car_03} alt="" />
                  </h3>
                  <div class="card_postInfo">
                    <h6>
                      <a href="#">Alfa Romeo Integra</a>
                    </h6>
                  </div>
                </div>
                <div>
                  <h3>
                    <img src={car_04} alt="" />
                  </h3>
                  <div class="card_postInfo">
                    <h6>
                      <a href="#">Alfa Romeo Integra</a>
                    </h6>
                  </div>
                </div>
              </Slider>
            </div>
          </div>

          <div className="col-12 inveSlid">
            <h1>Amc</h1>
            <div className="nextArrow">
              <span
                className="slide-arrow prev-arrow slick-arrow"
                onClick={() => slide3.current.slickPrev()}
              >
                <span className="">Prev</span>
              </span>
              <span
                className="slide-arrow next-arrow slick-arrow slick-disabled"
                onClick={() => slide3.current.slickNext()}
              >
                <span className="">Next</span>
              </span>
            </div>
            <div className="featuredAuctions_Slide">
              <Slider ref={slide3} {...settings}>
                <div>
                  <h3>
                    <img src={car_01} alt="" />
                  </h3>
                  <div class="card_postInfo">
                    <h6>
                      <a href="#">Bentley Integra</a>
                    </h6>
                  </div>
                </div>
                <div>
                  <h3>
                    <img src={car_02} alt="" />
                  </h3>
                  <div class="card_postInfo">
                    <h6>
                      <a href="#">Amc Integra</a>
                    </h6>
                  </div>
                </div>
                <div>
                  <h3>
                    <img src={car_03} alt="" />
                  </h3>
                  <div class="card_postInfo">
                    <h6>
                      <a href="#">Amc Integra</a>
                    </h6>
                  </div>
                </div>
                <div>
                  <h3>
                    <img src={car_04} alt="" />
                  </h3>
                  <div class="card_postInfo">
                    <h6>
                      <a href="#">Amc Integra</a>
                    </h6>
                  </div>
                </div>
                <div>
                  <h3>
                    <img src={car_01} alt="" />
                  </h3>
                  <div class="card_postInfo">
                    <h6>
                      <a href="#">Amc Integra</a>
                    </h6>
                  </div>
                </div>
                <div>
                  <h3>
                    <img src={car_02} alt="" />
                  </h3>
                  <div class="card_postInfo">
                    <h6>
                      <a href="#">Amc Integra</a>
                    </h6>
                  </div>
                </div>
                <div>
                  <h3>
                    <img src={car_03} alt="" />
                  </h3>
                  <div class="card_postInfo">
                    <h6>
                      <a href="#">Amc Integra</a>
                    </h6>
                  </div>
                </div>
                <div>
                  <h3>
                    <img src={car_04} alt="" />
                  </h3>
                  <div class="card_postInfo">
                    <h6>
                      <a href="#">Amc Integra</a>
                    </h6>
                  </div>
                </div>
              </Slider>
            </div>
          </div>

          <div className="col-12 inveSlid">
            <h1>Bentley</h1>
            <div className="nextArrow">
              <span
                className="slide-arrow prev-arrow slick-arrow"
                onClick={() => slide4.current.slickPrev()}
              >
                <span className="">Prev</span>
              </span>
              <span
                className="slide-arrow next-arrow slick-arrow slick-disabled"
                onClick={() => slide4.current.slickNext()}
              >
                <span className="">Next</span>
              </span>
            </div>
            <div className="featuredAuctions_Slide">
              <Slider ref={slide4} {...settings}>
                <div>
                  <h3>
                    <img src={car_01} alt="" />
                  </h3>
                  <div class="card_postInfo">
                    <h6>
                      <a href="#">Bentley Integra</a>
                    </h6>
                  </div>
                </div>
                <div>
                  <h3>
                    <img src={car_02} alt="" />
                  </h3>
                  <div class="card_postInfo">
                    <h6>
                      <a href="#">Bentley Integra</a>
                    </h6>
                  </div>
                </div>
                <div>
                  <h3>
                    <img src={car_03} alt="" />
                  </h3>
                  <div class="card_postInfo">
                    <h6>
                      <a href="#">Bentley Integra</a>
                    </h6>
                  </div>
                </div>
                <div>
                  <h3>
                    <img src={car_04} alt="" />
                  </h3>
                  <div class="card_postInfo">
                    <h6>
                      <a href="#">Bentley Integra</a>
                    </h6>
                  </div>
                </div>
                <div>
                  <h3>
                    <img src={car_01} alt="" />
                  </h3>
                  <div class="card_postInfo">
                    <h6>
                      <a href="#">Bentley Integra</a>
                    </h6>
                  </div>
                </div>
                <div>
                  <h3>
                    <img src={car_02} alt="" />
                  </h3>
                  <div class="card_postInfo">
                    <h6>
                      <a href="#">Bentley Integra</a>
                    </h6>
                  </div>
                </div>
                <div>
                  <h3>
                    <img src={car_03} alt="" />
                  </h3>
                  <div class="card_postInfo">
                    <h6>
                      <a href="#">Bentley Integra</a>
                    </h6>
                  </div>
                </div>
                <div>
                  <h3>
                    <img src={car_04} alt="" />
                  </h3>
                  <div class="card_postInfo">
                    <h6>
                      <a href="#">Bentley Integra</a>
                    </h6>
                  </div>
                </div>
              </Slider>
            </div>
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
              <form onSubmit={handleFilterFormSubmit}>
                <div className="row row_gap_5">
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
                          Select
                        </option>
                        {category.year &&
                          category.year.map((curElem) => {
                            return <option value={curElem}>{curElem}</option>;
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
                          Select
                        </option>
                        {category.make &&
                          category.make.map((curElem, i) => {
                            return (
                              <option key={i} value={curElem}>
                                {curElem}
                              </option>
                            );
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
                          Select
                        </option>
                        {category.model &&
                          category.model.map((curElem) => {
                            return <option value={curElem}>{curElem}</option>;
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
                          Select
                        </option>
                        {category.state &&
                          category.state.map((curElem) => {
                            return <option value={curElem}>{curElem}</option>;
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
                          Select
                        </option>
                        {category.city &&
                          category.city.map((curElem) => {
                            return <option value={curElem}>{curElem}</option>;
                          })}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="form-group d-flex justify-content-between ">
                  <button type="submit" className="btn">
                    Filters
                  </button>
                  <button onClick={clearFilter} type="button" className="btn">
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

export default Inventory;
