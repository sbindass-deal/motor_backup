import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FormInput from "../../UI/FormInput";

function VehicleListingDetails() {

 const navigate= useNavigate()

  const {id}=useParams()

  const [vehicleDetails, setVehicleDetails] = useState({
    name: "",
    singleprice: "",
    fivesingleprice: "",
    description: "",
    category:"",
    monthlyListing:"",
    annualListing:"",
    annualDescription:"",
  });
  const handleChange = (e) => {
    setVehicleDetails((pre) => ({ ...pre, [e.target.name]: e.target.value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_URL}updateplans/${id}`, {
        plan_name: vehicleDetails.name,
        monthly_price: vehicleDetails.singleprice,
        annual_price: vehicleDetails.fivesingleprice,
        monthly_description: vehicleDetails.description,
        category: vehicleDetails.category,
        monthly_listing: vehicleDetails.monthlyListing,
        annual_listing: vehicleDetails.annualListing,
        annual_description: vehicleDetails.annualDescription,



      })
      .then((response) => {
        if (response.status === 200) {
          navigate('/admin/vehicle-listing')
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="container mt-3 d-flex justify-content-center">
        <div className="col-md-6">
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
                    value={vehicleDetails.category}
                    onChange={handleChange}
                    name="category"
                    className="field"
                    label="category"
                    placeholder="Category"
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
                    value={vehicleDetails.monthlyListing}
                    onChange={handleChange}
                    name="monthlyListing"
                    className="field"
                    placeholder="Monthly Listing"
                    //   pattern="^[0-9]$"
                    label="Monthly Listing"
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
                    label="Monthly Price"
                    placeholder="Monthly Price"
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
                    placeholder="Annual Price"
                    //   pattern="^[0-9]$"
                    label="Annual Price"
                    //   errorMessage="use only numbers($)"
                    //   required={true}
                  />
                </div>
              </div>

              <div className="col-12 col-md-12">
                <label>Monthly Description</label>
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


              <div className="col-12 col-md-12">
                <div className="form-group">
                  <FormInput
                    type="text"
                    value={vehicleDetails.annualListing}
                    onChange={handleChange}
                    name="annualListing"
                    className="field"
                    placeholder="Annual Listing"
                    //   pattern="^[0-9]$"
                    label="Annual Listing"
                  //   errorMessage="use only numbers($)"
                  //   required={true}
                  />
                </div>
              </div>

              <div className="col-12 col-md-12">
                <label>Annual Description</label>
                <div className="form-group">
                  <textarea
                    className="field"
                    value={vehicleDetails.annualDescription}
                    onChange={handleChange}
                    name="annualDescription"
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
