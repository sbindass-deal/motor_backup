import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import SliderProduct from "../shopingStore/SliderProduct";

const UserVehicleDetails = () => {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState({});
  const fetchVehicleApi = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_URL}vehicle/${id}`
      );
      if (response.data.data) {
        setVehicle(response.data.data[0]);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchVehicleApi();
  }, [id]);

  return (
    <div>
      <section className="ptb_80 pt_sm_50">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center pb_30">
              <h2 className="title_combo title_Center">
                {vehicle.make}-{vehicle.model}-{vehicle.year}
              </h2>
            </div>
            <div className="col-12">
              <div className="detailPostOption"></div>
            </div>
          </div>

          <div className="row">
            <div className="col-6">
              <div className="postHero">
                <img
                  src="https://tse4.mm.bing.net/th?id=OIP.vf11XywUrdCTiM2RtALitAHaFU&pid=Api&P=0"
                  alt="details-images"
                />
              </div>
            </div>
            <div className="col-6 dropdownCol">
              <div className="dropdown mr-2">
                <button
                  type="button"
                  className="gry_btn"
                  data-toggle="dropdown"
                >
                  Make: make
                </button>
                <div className="dropdown-menu">
                  <a className="dropdown-item" href="#">
                    View all listings
                  </a>
                  <a className="dropdown-item" href="#">
                    Notify me about new listings
                  </a>
                </div>
              </div>
              <div className="dropdown mr-2">
                <button
                  type="button"
                  className="gry_btn"
                  data-toggle="dropdown"
                >
                  Model: model name
                </button>
                <div className="dropdown-menu">
                  <a className="dropdown-item" href="#">
                    View all listings
                  </a>
                  <a className="dropdown-item" href="#">
                    Notify me about new listings
                  </a>
                </div>
              </div>
              <div className="dropdown mr-2">
                <button type="button" className="gry_btn">
                  Era: era
                </button>
                <div className="dropdown-menu">
                  <a className="dropdown-item" href="#">
                    View all listings
                  </a>
                  <a className="dropdown-item" href="#">
                    Notify me about new listings
                  </a>
                </div>
              </div>
              <div className="dropdown mr-2">
                <button type="button" className="gry_btn">
                  More Photos
                </button>

                <div className="dropdown-menu">
                  <a className="dropdown-item" href="#">
                    View all listings
                  </a>
                  <a className="dropdown-item" href="#">
                    Notify me about new listings
                  </a>
                </div>
              </div>
              <div className="pb_40" id="placeBid_col">
                  <div className="card_Gray">
                      <h5 className="cardTitle">CAR INFORMATION</h5>
                      <ul className="bidList_ info_">
                        <li>
                          <label htmlFor="">40 Miles</label>
                        </li>

                        <li>
                          Interstellar <label htmlFor=""> Interstellar</label>
                        </li>

                        <li>
                          <label htmlFor="">Location: delhi</label>
                        </li>

                        <li>
                          <label htmlFor="">
                            {" "}
                            accessories {vehicle.accessories}
                          </label>
                        </li>
                        <li>
                          <label htmlFor="">vehicle details</label>
                        </li>

                        <li>
                          Body Work <label htmlFor=""> Recently Painted</label>
                        </li>

                        <li>
                          <label htmlFor=""> Reserve {vehicle.reserve}</label>
                        </li>

                        <li>
                          Size tires <label htmlFor="">{vehicle.sizetires}</label>
                        </li>
                        <li>
                          <label htmlFor="">pickone</label>
                        </li>

                        <li>
                          Brand <label htmlFor="">brand</label>
                        </li>

                        <li>
                          <label htmlFor="">
                            Private Party or Dealer :dealer
                          </label>
                        </li>
                      </ul>
                      <br/><br/>
                      <button className="btn btn-warning">Approve</button>
                  </div>
              </div>
            </div>
            <div className="col-12">
             <h5>PHOTO GALLERY</h5>
              <SliderProduct />
            </div>
           
          </div>

         
        </div>
      </section>
    </div>
  );
};

export default UserVehicleDetails;
