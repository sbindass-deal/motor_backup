import axios from "axios";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
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
  const [totalResult, setTotalResult] = useState(0);
  const [page, setPage] = useState(0);

  const handleClose = () => {
    setShowModal(false);
  };
  const handleShow = () => {
    setShowModal(true);
  };
  const fetchStoreVehicleApi = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_URL}vehiclePagination/${page}`
      );
      const newData = response.data.data;
      setTotalResult(response.data.count);
      setVehicleData(newData);
      setFilterData(newData);
      setPage(page + 10);
      setLoader(false);
    } catch (err) {
      console.log(err);
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchStoreVehicleApi();
  }, []);
  const style = {
    height: 30,
    border: "1px solid green",
    margin: 6,
    padding: 8,
  };
  console.log("hello", page);
  const fetchMoreData = async () => {
    console.log(page, "hello");

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_URL}vehiclePagination/${page}`
      );
      const newData = await response.data.data;
      setTotalResult(response.data.count);
      setVehicleData(vehicleData.concat(newData));
      setFilterData(filterData.concat(newData));
      setPage(page + 10);

      setLoader(false);
    } catch (err) {
      console.log(err);
      setLoader(false);
    }
  };

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
              </ul>
            </div>
          </div>
          <FilteredModal showModal={showModal} handleClose={handleClose} />
        </div>
      </section>

      {/* {loading ? (
        <SmallSpinner spin={true} />
      ) : ( */}
      <InfiniteScroll
        dataLength={filterData.length}
        next={fetchMoreData}
        hasMore={totalResult !== filterData.length}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p className="text-warning" style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
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
      </InfiniteScroll>

      {/* )} */}
    </>
  );
}

export default Store;
