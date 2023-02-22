import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import car_01 from '../../../Assets/images/car_01.jpg'
import car_02 from '../../../Assets/images/car_02.jpg'
import car_03 from '../../../Assets/images/car_03.jpg'
import car_04 from '../../../Assets/images/car_04.jpg'


import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import {
  clearShowroomFilter,
  filterShowroomData,
} from "../../../redux/reducers/vehicleReducer";
import { Modal } from "react-bootstrap";
import NotAvailable from "../../UI/NotAvailable";
import img_01 from "../../../Assets/images/img_01.jpg";


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
      <div className="col-12 text-center pt_80 pb_30">
        <h2>All Vehicles</h2>
      </div>


      <section className="ptb_80" id="second">
        <div className="container">
          <div className="row ">
            <div className="col-12 text-center pb_30">
              <h2>Featured Auctions</h2>
            </div>

          
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

          
          <div className="col-12 slider_ht">
            <h1>Acura</h1>
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
                <div>
                  <h3>
                    <img src={car_01} alt="" />
                  </h3>
                  <div class="card_postInfo">
                    <h6><a href="#">Acura Integra</a></h6>
                  </div>

                </div>
                <div>
                  <h3>
                    <img src={car_02} alt="" />
                  </h3>
                  <div class="card_postInfo">
                    <h6><a href="#">Acura Integra</a></h6>
                  </div>
                </div>
                <div>
                  <h3>
                    <img src={car_03} alt="" />
                  </h3>
                  <div class="card_postInfo">
                    <h6><a href="#">Acura Integra</a></h6>
                  </div>
                </div>
                <div>
                  <h3>
                    <img src={car_04} alt="" />
                  </h3>
                  <div class="card_postInfo">
                    <h6><a href="#">Acura Integra</a></h6>
                  </div>
                </div>
                <div>
                  <h3>
                    <img src={car_01} alt="" />
                  </h3>
                  <div class="card_postInfo">
                    <h6><a href="#">Acura Integra</a></h6>
                  </div>
                </div>
                <div>
                  <h3>
                    <img src={car_02} alt="" />
                  </h3>
                  <div class="card_postInfo">
                    <h6><a href="#">Acura Integra</a></h6>
                  </div>
                </div>
                <div>
                  <h3>
                    <img src={car_03} alt="" />
                  </h3>
                  <div class="card_postInfo">
                    <h6><a href="#">Acura Integra</a></h6>
                  </div>
              
                </div>
                <div>
                  <h3>
                    <img src={car_04} alt="" />
                  </h3>
                  <div class="card_postInfo">
								<h6><a href="#">Acura Integra</a></h6>
							</div>
                </div>
                
              </Slider>
            </div>
          </div>



          <div className="row mt-30">
            {searchedData.length === 0 ? (
              <NotAvailable text="No Result Found" />
            ) : (
              searchedData.map((curElem) => {
                return (
                  <div className="col-4" key={curElem.id}>
                   
                    <div className="card_post Inventory auction ffff">
                      {curElem.displayInAuction === "Yes" ? (
                        <p className="forOction">Auction</p>
                      ) : curElem.displayInAuction === "classified" ? (
                        <p className="forOction">Ads</p>
                      ) : null}

                      {curElem.displayInAuction === "classified" ? (
                        <a
                          target="_blank"
                          rel="noopener"
                          href={curElem.externalLink}
                          className="card_postImg card_postImg_200 height_image"
                        >
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
                        </a>
                      ) : (
                        <Link
                          to={
                            curElem.displayInAuction === "Yes"
                              ? `/detail/${curElem.id}`
                              : `/showroom/${curElem.id}`
                          }
                          className="card_postImg card_postImg_200 height_image"
                        >
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
                        </Link>
                      )}
                      <div className="card_postInfo  pt-3">
                        <h6 className="name_price ">
                          {curElem.displayInAuction === "classified" ? (
                            <a
                              target="_blank"
                              rel="noopener"
                              href={curElem.externalLink}
                            >
                              {curElem.make} {curElem.model} {curElem.year}
                            </a>
                          ) : (
                            <Link
                              to={
                                curElem.displayInAuction === "Yes"
                                  ? `/detail/${curElem.id}`
                                  : `/showroom/${curElem.id}`
                              }
                            >
                              {curElem.make} {curElem.model} {curElem.year}
                            </Link>
                          )}
                          <p className="price__">${curElem.documentFee}</p>
                        </h6>
                        <p>{curElem?.moreDescription.substr(0, 200)}</p>
                        {/* <table className="showroomCol">
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
                        </table> */}
                        {/* {curElem.displayInAuction === "classified" ? (
                          <a
                            target="_blank"
                            rel="noopener"
                            href={curElem.externalLink}
                            className="orange_btn opening_bid_btn"
                          >
                            View Details <i className="fa fa-arrow-right"></i>
                          </a>
                        ) : (
                          <Link
                            to={
                              curElem.displayInAuction === "Yes"
                                ? `/detail/${curElem.id}`
                                : `/showroom/${curElem.id}`
                            }
                            className="orange_btn opening_bid_btn"
                          >
                            View Details <i className="fa fa-arrow-right"></i>
                          </Link>
                        )} */}


                        
                      </div>
                    </div>
                  </div>
                );
              })
            )}
            <div className="col-12 mb-5">
              <ul className="pagination justify-content-center mt-4">
                <li className="page-item disabled"><a className="page-link" href="#"><i className="fa-solid fa-arrow-left"></i></a></li>
                <li className="page-item active"><a className="page-link" href="#">1</a></li>
                <li className="page-item"><a className="page-link" href="#">2</a></li>
                <li className="page-item"><a className="page-link" href="#">3</a></li>
                <li className="page-item"><a className="page-link" href="#">...</a></li>
                <li className="page-item"><a className="page-link" href="#">10</a></li>
                <li className="page-item"><a className="page-link" href="#"><i className="fa-solid fa-arrow-right"></i></a></li>
              </ul>
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
