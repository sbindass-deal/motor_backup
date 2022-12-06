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
      console.log("showRoom", response.data.data);
      setVehicle(response.data.data);
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
                  src={car_01}
                  class="img-fluid rounded-start w-100 "
                  alt="details-img"
                />
                {/* <Carousel nextLabel="" prevLabel="">
                  <Carousel.Item>
                    <img
                      className="d-block img-fluid w-100"
                      src={
                        process.env.REACT_APP_URL + "/" + vehicle.stepOneImage
                      }
                      alt="First slide"
                    />
                    <img clasName="img-fluid rounded-start w-100" src={car_01}/>
                  </Carousel.Item>
                  <Carousel.Item>
                    <img
                      className="d-block img-fluid w-100"
                      src={car_01}
                      alt="Second slide"
                    />
                    <img  src={car_01}/>
                  </Carousel.Item>
                </Carousel> */}
               
              </div>
              <div class="col-12 col-sm-12 col-md-7">
                <div class="card-body">
                  <h5 class="card-title">
                    {/* {vehicle.year} {vehicle.make} {vehicle.model} */}
                    2021 BMW Nexon
                  </h5>
                  <div className="detailPageContent">
                    <table width={"100%"}>
                      <tr>
                        <td>document Fee</td>
                        <td>$250</td>
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
                        <td>Looking to buy a car? CarWale helps you locate authorized dealers for 41 brands across India. We have listed over 7052 dealer showrooms located in 864 cities in India. Choose the brand and city of your choice and get contact information and full address of dealers near you.</td>
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
