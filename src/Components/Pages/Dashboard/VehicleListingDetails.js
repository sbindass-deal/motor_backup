import axios from "axios";
import React, { useState } from "react";
import FormInput from "../../UI/FormInput";

function VehicleListingDetails() {
  const [vehicleDetails, setVehicleDetails] = useState({
    name: "",
    singleprice: "",
    fivesingleprice: "",
    description: "",
  });
  const handleChange = (e) => {
    setVehicleDetails((pre) => ({ ...pre, [e.target.name]: e.target.value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_URL}updateplans/id`, {
        name: vehicleDetails.name,
        price: vehicleDetails.singleprice,
        maxprice: vehicleDetails.fivesingleprice,
        list: vehicleDetails.description,
      })
      .then((response) => {
        if (response.status === 200) {
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="container mt-3 d-flex justify-content-center">
        <div className="col-md-10">
          <form onSubmit={handleSubmit} className="p-md-5">
            <div className="row row_gap_5">
              <div className="col-12 col-md-12">
                <div className="form-group">
                  <FormInput
                    type="text"
                    value={vehicleDetails.name}
                    onChange={handleChange}
                    name="name"
                    className="field"
                    placeholder="name"
                    //   pattern="^[a-z A-Z]$"
                    label="name"
                    //   errorMessage="use only numbers($)"
                    //   required={true}
                  />
                </div>
              </div>
              <div className="col-12 col-md-12">
                <div className="form-group">
                  <FormInput
                    value={vehicleDetails.singleprice}
                    onChange={handleChange}
                    name="singleprice"
                    className="field"
                    label=" Single Listing Price"
                    placeholder="single listing price"
                    //   pattern="^[0-9]$"

                    //   errorMessage="use only alphabet no special character"
                    //   required={true}
                  />
                </div>
              </div>
              <div className="col-12 col-md-12">
                <div className="form-group">
                  <FormInput
                    type="text"
                    value={vehicleDetails.fivesingleprice}
                    onChange={handleChange}
                    name="fivesingleprice"
                    className="field"
                    placeholder="five listing price"
                    //   pattern="^[0-9]$"
                    label="Five Listing Price"
                    //   errorMessage="use only numbers($)"
                    //   required={true}
                  />
                </div>
              </div>

              <div className="col-12 col-md-12">
                <label>Description</label>
                <div className="form-group">
                  <textarea
                    className="field"
                    value={vehicleDetails.description}
                    onChange={handleChange}
                    name="description"
                    placeholder="Description here"
                    required
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="form-group">
              <button type="submit" className="btn w-100">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default VehicleListingDetails;
