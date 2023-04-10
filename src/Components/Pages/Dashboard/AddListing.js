import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import FormInput from "../../UI/FormInput";
import SmallSpinner from "../../UI/SmallSpinner";

const AddListing = () => {
  const [isLoading,setIsLoading]=useState(false)
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
    setIsLoading(true)
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
          setIsLoading(false)
          notify("Added Listing successfully !");
          navigate("/admin/vehicle-listing");
        }
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false)
      });

    console.log("####", addListing);
  };

  return (
    <div className="container mt-3 d-flex justify-content-center">
      <div className="">
           
        <form onSubmit={handleSubmit} className="p-md-5">
          <Link to={'/admin/vehicle-listing'}>
            <button className="p-1"><i class="bi bi-arrow-left"></i> Back To List</button>
          </Link>
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
                  // pattern="/^\S*$/"
                  label="Name"
                  //   errorMessage="use only numbers($)"
                  //   required={true}
                  required
                  errorMessage="Name is required"
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
                  
                  errorMessage="Category is required"
                  required
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
                  required
                  errorMessage="Monthly Listing is required"
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
                  required
                  errorMessage="Monthly Price is required"
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
                  required
                  errorMessage="Annual Price is required"
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

                  required
                  errorMessage="Annual Listing is required"
                />
              </div>
            </div>

            <div className="col-12 col-md-12">
              <label>Monthly Description</label>
              <div className="form-group">
                <FormInput
                  className="field"
                  value={addListing.description}
                  onChange={handleChange}
                  name="description"
                  placeholder="Monthly Description"
                  required
                  errorMessage="Monthly Description is required"
                />
              </div>
            </div>

            <div className="col-12 col-md-12">
              <label>Annual Description</label>
              <div className="form-group">
                <FormInput
                  className="field"
                  value={addListing.annualDescription}
                  onChange={handleChange}
                  name="annualDescription"
                  placeholder="Annual Description"
                  required
                  errorMessage="Annual Description is required"
                />
              </div>
            </div>
          </div>
          <div className="form-group">
            {
              isLoading ? (
                <SmallSpinner/>
              ) : <button type="submit" className="btn w-100">
                SUBMIT
              </button>
            }
           
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddListing;
