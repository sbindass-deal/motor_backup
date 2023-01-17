import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import {
  clearShowroomFilter,
  filterShowroomData,
} from "../../../redux/reducers/vehicleReducer";
import { Modal } from "react-bootstrap";

const Inventory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logingUser = useSelector((state) => state);
  const vehicleData = logingUser.vehicleReducer.showroomData;
  const category = logingUser.vehicleReducer.filterCategory;
  const [howerImage, setHowerImage] = useState({});

  const handleHowerImage = async (id = 1) => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_URL + "/vehicle-image/" + id
      );
      setHowerImage(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    handleHowerImage();
  }, []);
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
      [e.target.name]: e.target.value.toLowerCase(),
    });
  };
  const clearFilter = () => {
    dispatch(clearShowroomFilter());
    setFilterInput({
      year: "",
      make: "",
      model: "",
      state: "",
      city: "",
    });
  };
  const handleFilterFormSubmit = (e) => {
    e.preventDefault();
    if (
      filterInput.year.trim().length > 0 ||
      filterInput.make.trim().length > 0 ||
      filterInput.model.trim().length > 0 ||
      filterInput.state.trim().length > 0 ||
      filterInput.city.trim().length > 0
    ) {
      dispatch(filterShowroomData(filterInput));
    }
    handleFilteredModalClose();
  };

  const handleFilteredModalClose = () => {
    setFilteredModal(false);
  };
  const handleFilteredModalShow = () => {
    setFilteredModal(true);
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

  return (
    <>
      <div className="col-12 text-center pt_80 pb_30">
        <h2>All Vehicles</h2>
      </div>
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
          <div className="row">
            {searchedData.map((curElem) => {
              return (
                <div className="col-12 col-md-6 col-lg-4" key={curElem.id}>
                  <div className="card_post Inventory auction">
                    {curElem.displayInAuction === "Yes" ? (
                      <p className="forOction">For Auction</p>
                    ) : curElem.displayInAuction === "classified" ? (
                      <p className="forOction">Ad</p>
                    ) : null}

                    {curElem.displayInAuction === "classified" ? (
                      <a
                        target="_blank"
                        rel="noopener"
                        href={curElem.externalLink}
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
                      </a>
                    ) : (
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
                    )}
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
                          Choose...
                        </option>
                        {category.year &&
                          category.year.map((curElem) => {
                            return <option>{curElem}</option>;
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
                          Choose...
                        </option>
                        {category.make &&
                          category.make.map((curElem) => {
                            return <option>{curElem}</option>;
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
                          Choose...
                        </option>
                        {category.modal &&
                          category.model.map((curElem) => {
                            return <option>{curElem}</option>;
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
                          Choose...
                        </option>
                        {category.state &&
                          category.state.map((curElem) => {
                            return <option>{curElem}</option>;
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
                          Choose...
                        </option>
                        {category.city &&
                          category.city.map((curElem) => {
                            return <option>{curElem}</option>;
                          })}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="form-group d-flex justify-content-between ">
                  <button type="submit" className="btn">
                    Filters
                  </button>
                  <button onClick={clearFilter} type="submit" className="btn">
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
