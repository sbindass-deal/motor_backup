import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import car_01 from "../../Assets/images/car_01.jpg";
import SmallSpinner from "../UI/SmallSpinner";
import FilteredModal from "./FilteredModal";

function Store() {
  const [showModal, setShowModal] = useState(false);
  const [searchInputValue, setSearchInputValue] = useState("");
  const [loading, setLoader] = useState(true);
  const [vehicleData, setVehicleData] = useState([]);
  const [filterData, setFilterData] = useState([]);

  const handleClose = () => {
    setShowModal(false);
  };
  const handleShow = () => {
    setShowModal(true);
  };
  const fetchStoreVehicleApi = async () => {
    try {
      const response = await axios.get(process.env.REACT_APP_URL + "vehicles");
      const newData = response.data.data.reverse();
      setVehicleData(newData);
      setFilterData(newData);
      setLoader(false);
    } catch (err) {
      console.log(err);
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchStoreVehicleApi();
  }, []);

  return (
    <>
      <section className="storeHeroSection d-flex align-items-center">
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-8 offset-lg-2">
              <div className="heroText">
                <h1>We have over 20 stores around the UK</h1>
                {/* <a href="#" className="btn">
                  VIEW INVENTORY
                </a> */}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pt_80 pt_sm_50">
        <div className="container">
          <div className="row">
            <div className="col-12">
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
                <li className="">
                  <button
                    onClick={handleShow}
                    type="button"
                    className="gry_btn"
                    // data-toggle="modal"
                    // data-target="#FiltersModal"
                  >
                    <i className="fa-solid fa-filter mr-2"></i> Filters
                  </button>
                </li>
                <li className="">
                  <select className="post_select">
                    <option selected disabled value="">
                      Choose...
                    </option>
                    <option>Recently Sold</option>
                    <option>Popular</option>
                    <option>Price:High to low</option>
                    <option>Best Deals</option>
                  </select>
                </li>
              </ul>
            </div>
          </div>
          <FilteredModal showModal={showModal} handleClose={handleClose} />
        </div>
      </section>

      {loading ? (
        <SmallSpinner spin={true} />
      ) : (
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
                        {/* <img
                          src={
                            curElem.stepOneImage === null ||
                            curElem.stepOneImage === undefined ||
                            curElem.stepOneImage === ""
                              ? car_01
                              : process.env.REACT_APP_URL + curElem.stepOneImage
                          }
                          alt={curElem.make}
                        /> */}
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
                              <td>Saller</td>
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
      )}
    </>
  );
}

export default Store;
