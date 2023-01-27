import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { toast } from "react-toastify";

const SearchResult = () => {
  const navigate = useNavigate();
  const logingUser = useSelector((state) => state);
  const { searchResult: name, searchKey: ser } =
    logingUser.dayAndNightMode.searchData;
  const [searchedData, setSearchedData] = useState({});
  const [relatedData, setRelatedData] = useState([]);
  const notify = (val) =>
    toast.success(val, {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  useEffect(() => {
    const make = name.toLowerCase();
    const searchText = ser.toLowerCase();
    const filteredData = logingUser.vehicleReducer.vehicleData.filter(
      (item) => item.make && item.make.toLowerCase().includes(searchText)
    );
    const searchedResult = logingUser.vehicleReducer.vehicleData.find(
      (item) => item.make && item.make.toLowerCase().includes(make)
    );
    setSearchedData(searchedResult);
    setRelatedData(filteredData);
  }, [name, ser]);

  return (
    <>
      <section className="storeHeroSection dealer align-items-center">
        <div className="container">
          <div className="row">
            <div className="topTile">
              <h5>
                {searchedData.make} {searchedData.model} {searchedData.year}
              </h5>
            </div>
          </div>
          <div className="col-12 col-lg-12">
            <div className="heroText">
              <h5>{searchedData.moreDescription}</h5>
              <button
                type="button"
                onClick={() => {
                  notify(
                    "Thank you for your interest! We will notify you as soon as your model is listed."
                  );
                  navigate("/");
                }}
                className="btn btn_change"
              >
                Notify me
              </button>

              <Link
                className="btn ml-2"
                to={
                  searchedData.displayInAuction === "Yes"
                    ? `/detail/${searchedData.id}`
                    : `/showroom/${searchedData.id}`
                }
              >
                Have one?
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="pt_40">
        <div className="container">
          <div className="col-12 col-lg-12 py-2">
            <h4 className="text-center">
              <span className="text-warning">{relatedData.length}</span> &nbsp;
              Result found
            </h4>
          </div>
          <div className="row">
            {relatedData &&
              relatedData.map((curElem) => {
                return (
                  <div className="col-12 col-md-6 col-lg-4" key={curElem.id}>
                    <div className="card_post SearchResult auction">
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
    </>
  );
};

export default SearchResult;
