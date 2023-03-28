import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import FormInput from "../../UI/FormInput";

const AddListing = () => {
  const [addListing, setAddListing] = useState({
    name: "",
    singleprice: "",
    fivesingleprice: "",
    description: "",
    category: "",
    monthlyListing: "",
    annualListing: "",
    annualDescription: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setAddListing((pre) => ({ ...pre, [e.target.name]: e.target.value }));
  };

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

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_URL}addplans`, {
        plan_name: addListing.name,
        monthly_price: addListing.singleprice,
        annual_price: addListing.fivesingleprice,
        monthly_description: addListing.description,
        category: addListing.category,
        monthly_listing: addListing.monthlyListing,
        annual_listing: addListing.annualListing,
        annual_description: addListing.annualDescription,
      })
      .then((response) => {
        if (response.status === 200) {
          notify("Added Listing successfully !");
          navigate("/admin/vehicle-listing");
        }
      })
      .catch((error) => {
        console.log(error);
      });

    console.log("####", addListing);
  };

  return (
    <div className="container mt-3 d-flex justify-content-center">
      <div className="">
        <form onSubmit={handleSubmit} className="p-md-5">
          <h3 className="pb-4 text-center">
            <span>Add Listing Details</span>
          </h3>
          <div className="row row_gap_5">
            <div className="col-12 col-md-6">
              <div className="form-group">
                <FormInput
                  type="text"
                  value={addListing.name}
                  onChange={handleChange}
                  name="name"
                  className="field"
                  placeholder="Name"
                  //   pattern="^[a-z A-Z]$"
                  label="Name"
                  //   errorMessage="use only numbers($)"
                  //   required={true}
                />
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="form-group">
                <FormInput
                  value={addListing.category}
                  onChange={handleChange}
                  name="category"
                  className="field"
                  label="Category"
                  placeholder="Category"
                  //   pattern="^[0-9]$"

                  //   errorMessage="use only alphabet no special character"
                  //   required={true}
                />
              </div>
            </div>

            <div className="col-12 col-md-6">
              <div className="form-group">
                <FormInput
                  type="text"
                  value={addListing.monthlyListing}
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

            <div className="col-12 col-md-6">
              <div className="form-group">
                <FormInput
                  value={addListing.singleprice}
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

            <div className="col-12 col-md-6">
              <div className="form-group">
                <FormInput
                  type="text"
                  value={addListing.fivesingleprice}
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

            <div className="col-12 col-md-6">
              <div className="form-group">
                <FormInput
                  type="text"
                  value={addListing.annualListing}
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
              <label>Monthly Description</label>
              <div className="form-group">
                <textarea
                  className="field"
                  value={addListing.description}
                  onChange={handleChange}
                  name="description"
                  placeholder="Description"
                  required
                ></textarea>
              </div>
            </div>

            <div className="col-12 col-md-12">
              <label>Annual Description</label>
              <div className="form-group">
                <textarea
                  className="field"
                  value={addListing.annualDescription}
                  onChange={handleChange}
                  name="annualDescription"
                  placeholder="Description"
                  required
                ></textarea>
              </div>
            </div>
          </div>
          <div className="form-group">
            <button type="submit" className="btn w-100">
              SUBMIT
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddListing;
