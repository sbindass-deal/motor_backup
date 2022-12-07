import axios from "axios";
import moment from "moment";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Carousel } from "react-bootstrap";
import { useParams } from "react-router-dom";
import car_01 from "../../Assets/images/car_01.jpg";

const StoreDetails = () => {
  const id = useParams().id;
  const [vehicle, setVehicle] = useState({});
  const fetchVehicle = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_URL + "vehicle/" + id
      );
      const apiData = response.data.data;
      if (apiData.status === 200 && apiData.length >= 0) {
        console.log("showRoom", { ...response.data.data[0] });
        setVehicle({ ...response.data.data });
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchVehicle();
  }, [id]);

  return (
    <>
      <div className="container py-5 px-md-5 ">
        <div className="row">
          <div class="col-12 col-sm-12 col-md-5 storeDetail">
            <img
              src={
                vehicle.stepOneImage === null ||
                vehicle.stepOneImage === undefined ||
                vehicle.stepOneImage === ""
                  ? car_01
                  : process.env.REACT_APP_URL + vehicle.stepOneImage
              }
              class="img-fluid rounded-start w-100 "
              alt="details-img"
            />
          </div>
          <div class="col-12 col-sm-12 col-md-7">
            <div class="card-body">
              <h5 class="card-title">
                {vehicle.year} {vehicle.make} {vehicle.model}
                2021 BMW Nexon
              </h5>
              <div className="detailPageContent">
                <table width={"100%"}>
                  <tr>
                    <td>document Fee</td>
                    <td>${vehicle.documentFee}</td>
                  </tr>
                  <tr>
                    <td>Tires size</td>
                    <td>16 inch</td>
                  </tr>
                  <tr>
                    <td>Accessories</td>
                    <td>Wheels, Sit cover, speakers</td>
                  </tr>
                  <tr>
                    <td>Fuel Type</td>
                    <td>CNG</td>
                  </tr>
                  <tr>
                    <td>More Description</td>
                    <td>
                      Looking to buy a car? CarWale helps you locate authorized
                      dealers for 41 brands across India. We have listed over
                      7052 dealer showrooms located in 864 cities in India.
                      Choose the brand and city of your choice and get contact
                      information and full address of dealers near you.
                    </td>
                  </tr>
                  <tr>
                    <td>Manufacture</td>
                    <td>2022-02-10</td>
                  </tr>
                </table>
              </div>
              {/* <div className="row">
                    <div className="col-6">{vehicle.documentFee}</div>
                    <div className="col-6">{vehicle.sizetires}</div>
                    <div className="col-6">{vehicle.accessories}</div>
                    <div className="col-6"> Fuel CNG</div>
                  </div>
                  <p class="card-text">{vehicle.moreDescription}</p>
                  <p class="card-text">
                    <small class="text-muted">
                      {moment(vehicle.created_at).format("YYYY-MM-DD")}
                    </small>
                  </p> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StoreDetails;
