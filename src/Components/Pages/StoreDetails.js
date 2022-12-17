import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";
import car_01 from "../../Assets/images/car_01.jpg";

const StoreDetails = () => {
  const id = useParams().id;
  
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState({});
  const[payment,setPayment]= useState(false)
  const fetchVehicle = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_URL + "vehicle/" + id
      );
      const apiData = response.data.data;
      if (response.data.status === 200 && apiData.length >= 0) {
        setVehicle({ ...response.data.data[0] });
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchVehicle();
  }, [id]);
  const onToken = (token, addresses) => {
    console.log(token, addresses);
    alert("pqay success fully");
    if (token !== null) {
      navigate("/successpayment");
    }
  };

  return (
    <>
      <div className="container py-5 px-md-5 ">
        <div className="row">
          <div class="col-12 col-sm-12 col-md-5 storeDetail">
            <img
              src={process.env.REACT_APP_URL + vehicle.stepOneImage}
              class="img-fluid rounded-start w-100 "
              onError={({ currentTarget }) => {
                currentTarget.onerror = null;
                currentTarget.src =
                  "http://www.freeiconspng.com/uploads/no-image-icon-11.PNG";
              }}
              alt={vehicle.make}
            />

            {/* <img
              src={
                vehicle.stepOneImage === null ||
                vehicle.stepOneImage === undefined ||
                vehicle.stepOneImage === ""
                  ? car_01
                  : process.env.REACT_APP_URL + vehicle.stepOneImage
              }
              class="img-fluid rounded-start w-100 "
              alt="details-img"
            /> */}
           <StripeCheckout
                  className="Btn btn mt-20 w-100"
                  name="Process Payment"
                  stripeKey="pk_test_m9Dp6uaJcynCkZNTNS1nDR8B00AQg2m6vJ"
                  token={onToken}
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
                    <td>Document Fee</td>
                    <td>${vehicle.documentFee}</td>
                  </tr>
                  <tr>
                    <td>Tires size</td>
                    <td>{vehicle.sizetires}</td>
                  </tr>
                  <tr>
                    <td>Accessories</td>
                    <td>{vehicle.accessories}</td>
                  </tr>
                  <tr>
                    <td>Fuel Type</td>
                    <td>{vehicle.fuel}</td>
                  </tr>
                  <tr>
                    <td>More Description</td>
                    <td>{vehicle.moreDescription}</td>
                  </tr>
                  <tr>
                    <td>Manufacture</td>
                    <td>{new Date(vehicle.created_at).toLocaleDateString()}</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StoreDetails;
