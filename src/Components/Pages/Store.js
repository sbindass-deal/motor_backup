import axios from "axios";
import React, { useEffect, useState } from "react";
import car_01 from "../../Assets/images/car_01.jpg";

function Store() {
  const [searchInputValue, setSearchInputValue] = useState("");
  const [vehicleData, setVehicleData] = useState([]);
  const fetchStoreVehicleApi = async () => {
    try {
      const response = await axios.get(process.env.REACT_APP_URL + "vehicles");
      const filteredData = response.data.data.filter(
        (item) => item.displayInShowroom === "Yes"
      );
      setVehicleData(filteredData);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchStoreVehicleApi();
  }, []);

  return (
    <div>
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
                    name="search"
                    value={searchInputValue}
                    onChange={(e) => setSearchInputValue(e.target.value)}
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
                        <label>High Price</label>
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
                        <label>Include Words / Models / Tags</label>
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

      <section className="pt_40">
        <div className="container">
          <div className="row">
            {vehicleData
              .filter(
                (item) =>
                  item.make.toLowerCase().includes(searchInputValue) ||
                  item.make.toUpperCase().includes(searchInputValue) ||
                  item.model.toLowerCase().includes(searchInputValue) ||
                  item.model.toUpperCase().includes(searchInputValue) ||
                  item.year.includes(searchInputValue)
              )
              .map((curElem) => {
                return (
                  <div className="col-12 col-md-6 col-lg-4" key={curElem.id}>
                    <div className="card_post store auction">
                      <a
                        href={`showroom/${curElem.id}`}
                        className="card_postImg card_postImg_200"
                      >
                        {/* <img
                          src={process.env.REACT_APP_URL + curElem.stepOneImage}
                          alt={curElem.make}
                        /> */}
                        <img src={car_01} />
                      </a>
                      <div className="card_postInfo pt-3">
                        <h6 className="name_price">
                          <a href={`showroom/${curElem.id}`}>
                            {curElem.year} {curElem.make} {curElem.model}
                          </a>
                          <p className="price__">${curElem.documentFee}</p>
                        </h6>
                        {/* <ul className="priceDateList">
                          <li className="price__">${curElem.documentFee}</li>
                        </ul> */}
                        <table className="showroomCol">
                          <tbody>
                            <tr>
                              <td>Mileage </td>
                              <td>10/km</td>
                            </tr>
                            <tr>
                              <td>Fuel Type</td>
                              <td>CNG</td>
                            </tr>
                            <tr>
                              <td>Saller</td>
                              <td>Nikhil Patil</td>
                            </tr>
                          </tbody>
                        </table>
                        {/* <div className="row">
                          <div className="col-6">{curElem.sizetires}</div>
                          <div className="col-6"> Mileage 10/km</div>
                        </div>
                        <div className="row">
                          <div className="col-6">{curElem.accessories}</div>
                          <div className="col-6"> Fuel CNG</div>
                        </div> */}
                        {/* <p>{curElem.titleStatus}</p> */}
                      </div>
                    </div>
                  </div>
                );
              })}

            {/* <div className="col-12 text-center">
              <a href="#" className="btn mt-4">
                View More
              </a>
            </div> */}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Store;
