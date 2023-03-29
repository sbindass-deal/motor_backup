import React, { useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import DealerList from "../showroom/DealerList";
import GaragesList from "./GaragesList";
const Garages = () => {
  const [filteredModal, setFilteredModal] = useState(false);
  const [dealerCount, setDealerCount] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleFilteredModalClose = () => {
    setFilteredModal(false);
  };
  const handleFilteredModalShow = () => {
    setFilteredModal(true);
  };

  const handleDealerCount = (count) => {
    setDealerCount(count);
  };

  return (
    <>
      <section className="storeHeroSection Garages align-items-center">
        <div className="container">
          <div className="row">
            <div className="topTile">
              <h5>
                New to Gas Guzzlrs? <Link to="/works">Learn how it works.</Link>
              </h5>
            </div>
          </div>
          <div className="col-12 col-lg-12">
            <div className="heroText">
              <h1>We have over {dealerCount} dealers around the world</h1>
              <h5>
                We help you find your dream car. Select from our exclusive
                <br /> list of showrooms.
              </h5>
            </div>
          </div>
        </div>
      </section>
      <section className="ptb_80" id="">
        <div className="auction_container">
          <div className="row ">
            <div className="col-12 text-center pb_30">
              <h2>Featured Showroom</h2>
            </div>
            <div className="col-12 col-lg-12">
              <ul className="postTopOption">
                <li className="post_search">
                  <input
                    type="text"
                    autoComplete="off"
                    name="search"
                    placeholder="Search for a Garages"
                    onChange={(e)=>setSearchTerm(e.target.value)}
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
            <GaragesList searchTerm={searchTerm} handleDealerCount={handleDealerCount} />
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
              <form>
                <div className="row row_gap_5">
                  <div className="col-12 col-md-6">
                    <label>Year</label>
                    <div className="form-group">
                      <select name="year" className="field">
                        <option selected disabled value="">
                          Select
                        </option>
                        <option>2022</option>;
                      </select>
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <label>Make</label>
                    <div className="form-group">
                      <select name="make" className="field">
                        <option selected disabled value="">
                          Select
                        </option>
                        <option>Audi</option>;
                      </select>
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <label>Model</label>
                    <div className="form-group">
                      <select name="model" className="field">
                        <option selected disabled value="">
                          Select
                        </option>
                        <option>tata</option>;
                      </select>
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <label>State</label>
                    <div className="form-group">
                      <select name="state" className="field">
                        <option selected disabled value="">
                          Select
                        </option>
                        <option>delhi</option>;
                      </select>
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <label>City</label>
                    <div className="form-group">
                      <select name="city" className="field">
                        <option selected disabled value="">
                          Select
                        </option>
                        <option>new delhi</option>;
                      </select>
                    </div>
                  </div>
                </div>
                <div className="form-group d-flex justify-content-between ">
                  <button type="submit" className="btn">
                    Filters
                  </button>
                  <button type="submit" className="btn">
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

export default Garages;
