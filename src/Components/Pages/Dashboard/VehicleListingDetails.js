import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import FormInput from "../../UI/FormInput";
import { Link } from "react-router-dom";
import SmallSpinner from "../../UI/SmallSpinner";
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
    setVehicleDetails((pre) => ({ ...pre, [e.target.name]: e.target.value.trimStart() }));
  };

  const[isLoading, setIsLoading]=useState(false)

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
  useEffect(() => {
    const fetchMeeting = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_URL}getPlanById/${id}`
        );

        console.log(88090, res.data.data);
        if (res.data.status === 200 && res.data.data) {
          setVehicleDetails({
            name: res.data.data.plan_name,
            category: res.data.data.category,
            monthlyListing: res.data.data.monthly_listing,
            singleprice: res.data.data.monthly_price,
            fivesingleprice: res.data.data.annual_price,
            description: res.data.data.monthly_description,
            annualListing: res.data.data.annual_listing,
            annualDescription: res.data.data.annual_description,
            
          });
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchMeeting();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true)
    axios
      .post(`${process.env.REACT_APP_URL}updateplans`, {
        id:id,
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
        console.log(8989,response)
        if (response.status === 200) {
          setIsLoading(false)
          navigate('/admin/vehicle-listing')
          notify("Save successfully !");
        }
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false)
      });
  };

  return (
    <>
      <div className="container mt-3 d-flex justify-content-center">
        <div className="col-md-6">
          <form onSubmit={handleSubmit} className="p-md-5">
            <div className="row row_gap_5">
              <Link  to={'/admin/vehicle-listing'}>
                <button className="p-1"><i class="bi bi-arrow-left"></i> Back To List</button>
              </Link>
              <h3 className="pb-4 text-center ml-4"> <span>Edit Listing Details</span> </h3>
              <div className="col-12 col-md-12">
                <div className="form-group">
                  <FormInput
                    type="text"
                    value={vehicleDetails.name}
                    onChange={handleChange}
                    name="name"
                    className="field"
                    placeholder="Name"
                    //   pattern="^[a-z A-Z]$"
                    // pattern="^[a-zA-Z]*$"
                    pattern="^[A-Za-z ]{3,20}$"
                    label="Name"
                    errorMessage="Name should be 3-30 characters and shouldn't include any special character or number!"
                    required={true}
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
                    label="Category"
                    placeholder="Category"
                    //   pattern="^[0-9]$"

                    errorMessage="Category is Required"
                    //   required={true}
                    required
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
                    errorMessage="Monthly Listing is Required"
                  //   required={true}
                    required
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

                    errorMessage="Monthly Price is Required"
                  //   required={true}
                    required
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
                    errorMessage="Annual Price is Required"
                      required={true}
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
                    required={true}
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
              {
                isLoading ? (
                   <SmallSpinner/> 
                ) :
                  <button type="submit" className="btn w-100">
                  Submit
                </button> 
              }
             
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default VehicleListingDetails;
