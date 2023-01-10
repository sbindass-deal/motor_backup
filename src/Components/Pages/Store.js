import axios from "axios";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import car_01 from "../../Assets/images/car_01.jpg";
import SmallSpinner from "../UI/SmallSpinner";
import Dealer from "./dealer/Dealer";
import FilteredModal from "./FilteredModal";
import Img_01 from "../../Assets/images/img_01.jpg";

function Store() {
  const [showModal, setShowModal] = useState(false);
  const [searchInputValue, setSearchInputValue] = useState("");
  const [justInShowroom, setJustInShowroom] = useState([]);
  const [loading, setLoader] = useState(false);
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
    setLoader(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_URL}vehicle/unknowuser`
      );
      const newData = response.data.data.reverse();
      setTotalResult(response.data.count);
      setVehicleData(newData);
      setFilterData(newData);
      setJustInShowroom(newData.slice(0, 7));
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
  // const fetchMoreData = async () => {
  //   console.log(page, "hello");

  //   try {
  //     const response = await axios.get(
  //       `${process.env.REACT_APP_URL}vehiclePagination/${page}`
  //     );
  //     const newData = await response.data.data;
  //     setTotalResult(response.data.count);
  //     setVehicleData(vehicleData.concat(newData));
  //     setFilterData(filterData.concat(newData));
  //     setPage(page + 10);

  //     setLoader(false);
  //   } catch (err) {
  //     console.log(err);
  //     setLoader(false);
  //   }
  // };
  const justInShowroomHoover = (data) => {
    console.log(data);
  };

  return (
    <>
      <Dealer />
      <section className="pt_80 mobileSpec" id="">
        <div className="container">
          <div className="row ">
            <div className="col-12 text-center pb_30">
              <h2>Just In Showroom!</h2>
            </div>
            <div className="col-12 Latest_B ">
              <ul className="img_sec">
                <li>
                  <a href="#" className="img_1">
                    <img src={Img_01} />
                  </a>
                </li>
              </ul>

              <ul className="img_text">
                <li
                  onMouseOver={() => justInShowroomHoover("hello")}
                  className="active"
                >
                  <a href="#" className="img_1">
                    <span> 22k-Mile 1974 Lincoln Continental Mark IV..</span>
                    <span>$8,600</span>
                    <span>3 days</span>
                  </a>
                </li>
                <li onMouseOver={() => justInShowroomHoover("hello1")}>
                  <a href="#" className="img_2">
                    <span> 22k-Mile 1974 Lincoln Continental Mark IV..</span>
                    <span>$8,600</span>
                    <span>3 days</span>
                  </a>
                </li>
                <li onMouseOver={() => justInShowroomHoover("hello2")}>
                  <a href="#" className="img_3">
                    <span> 22k-Mile 1974 Lincoln Continental Mark IV..</span>
                    <span>$8,600</span>
                    <span>3 days</span>
                  </a>
                </li>
                <li onMouseOver={() => justInShowroomHoover("hello")}>
                  <a href="#" className="img_4">
                    <span> 22k-Mile 1974 Lincoln Continental Mark IV..</span>
                    <span>$8,600</span>
                    <span>3 days</span>
                  </a>
                </li>
                <li onMouseOver={() => justInShowroomHoover("hello")}>
                  <a href="#" className="img_5">
                    <span> 22k-Mile 1974 Lincoln Continental Mark IV..</span>
                    <span>$8,600</span>
                    <span>3 days</span>
                  </a>
                </li>
                <li onMouseOver={() => justInShowroomHoover("hello")}>
                  <a href="#" className="img_6">
                    <span> 22k-Mile 1974 Lincoln Continental Mark IV..</span>
                    <span>$8,600</span>
                    <span>3 days</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <div className="col-12 text-center pt_80 pb_30">
        <h2>More Inventory</h2>
      </div>

      {/* <InfiniteScroll
        dataLength={filterData.length}
        next={fetchMoreData}
        hasMore={totalResult !== filterData.length}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p className="text-warning" style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      > */}
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
                            src={
                              process.env.REACT_APP_URL + curElem.stepOneImage
                            }
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
                            src={
                              process.env.REACT_APP_URL + curElem.stepOneImage
                            }
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
      )}
      {/* </InfiniteScroll> */}
    </>
  );
}

export default Store;
