import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const SearchResult = () => {
  const navigate = useNavigate();
  const logingUser = useSelector((state) => state);
  const { searchResult: name, searchKey } =
    logingUser.dayAndNightMode.searchData;
  const [searchedData, setSearchedData] = useState([]);
  const [relatedData, setRelatedData] = useState([]);
  // console.log(name);
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

    const searchNew = async () => {
      let data = {
        keyword: '',
      }
      try {
        const res = await axios.post(`${process.env.REACT_APP_URL}globalSearch`, data);
        // setSearchedData(res.data.vehicles_result);
        const filterData = res.data.vehicles_result?.filter((item) => item?.label == name);
        setRelatedData(filterData);
      } catch (err) {
        console.log(err);
      }
    }
    useEffect(() => {
      searchNew();
    }, [name, relatedData]);

    // useEffect(() => {
           
    // }, [name, searchedData]);
    // console.log(relatedData);
  // useEffect(() => {
  //   const make = name.toLowerCase();
  //   // const searchText = ser.toLowerCase();
  //   // const filteredData = logingUser.vehicleReducer.vehicleData.filter(
  //   //   (item) =>
  //   //     (item.make && item.make.toLowerCase().includes(searchText)) ||
  //   //     (item.year && item.year.toLowerCase().includes(searchText)) ||
  //   //     (item.model && item.model.toLowerCase().includes(searchText)) ||
  //   //     (item.moreDescription &&
  //   //       item.moreDescription.toLowerCase().includes(searchText))
  //   // );
  //   // console.log(filteredData);
  //   const searchedResult = logingUser.vehicleReducer.vehicleData.filter(
  //     (item) => item.make && item.make.toLowerCase().includes(make)
  //   );
  //   setSearchedData(searchedResult.length > 0 ? searchedResult[0] : {});
  //   // setRelatedData(filteredData);
  // }, [name]);
  return (
    <>
      <section className="storeHeroSection dealer align-items-center">
        {relatedData.length === 0 ? (
          <h3 className="text-center text-warning pt-5 mt-5">
            Result not found.
          </h3>
        ) : (
          <div className="container">
            <div className="row">
              <div className="topTile">
                <h1>
                  {relatedData[0].make}{" "}
                  {/* {searchedData.make || relatedData[0].make}{" "} */}
                  {/* {searchedData.model || relatedData[0].model}{" "}
                  {searchedData.year || relatedData[0].year} */}
                </h1>
              </div>
            </div>
            <div className="col-12 col-lg-12">
              <div className="heroText">
                {/* <h5>
                  {searchedData.moreDescription ||
                    relatedData[0].moreDescription}
                </h5> */}
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
                  <i class="fa-solid fa-bell mr-2"></i> Notify me when one is listed

                </button>

                <Link
                  className="btn ml-2"
                  // to={
                  //   searchedData.displayInAuction === "Yes"
                  //     ? `/detail/${searchedData.id}`
                  //     : `/showroom/${searchedData.id}`
                  // }
                >
Have one? Sell yours here                </Link>
              </div>
            </div>
          </div>
        )}
      </section>

      <section className="pt_40 searchResult">
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
                        <div class="bestSellerRgt"><span class="">For Auction</span></div>
                        // <p className="forOction"></p>
                      ) : curElem.displayInAuction === "classified" ? (
                        <div class="bestSellerRgt"><span class="">Ad</span></div>
                        // <p className="forOction">Ad</p>
                      ) : null}

                      {curElem.displayInAuction === "classified" ? (
                        <a
                          target="_blank"
                          rel="noopener"
                          href={curElem.externalLink}
                          className="card_postImg card_postImg_200"
                        >
                          {
                            curElem?.image_banner &&
                            <img
                              src={
                                process.env.REACT_APP_URL + `${curElem?.image_banner[0]?.imagePath}${curElem?.image_banner[0]?.imageName}`
                              }
                              onError={({ currentTarget }) => {
                                currentTarget.onerror = null;
                                currentTarget.src =
                                  "http://www.freeiconspng.com/uploads/no-image-icon-11.PNG";
                              }}
                              alt={curElem.make}
                            />
                          }
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
                          {curElem?.image_banner &&
                            <img
                            src={
                              process.env.REACT_APP_URL + `${curElem?.image_banner[0]?.imagePath}${curElem?.image_banner[0]?.imageName}`
                            }
                            onError={({ currentTarget }) => {
                              currentTarget.onerror = null;
                              currentTarget.src =
                                "http://www.freeiconspng.com/uploads/no-image-icon-11.PNG";
                            }}
                            alt={curElem.make}
                          />
                          }
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
                          {/* <p className="price__">${curElem.documentFee}</p> */}
                        </h6>
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
