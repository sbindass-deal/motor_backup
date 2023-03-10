import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminLeftNav from "./AdminLeftNav";
import Dropdown from 'react-bootstrap/Dropdown';


const VehicleListing = () => {
  const [getData, setGetData] = useState([]);
  const [loading, setLoading] = useState(true)

  const addListingData = async () => {
    await axios
      .post(`${process.env.REACT_APP_URL}get_subscription_plans`, {
        category: "all"
      })
      .then((respone) => {
       
        if (respone.status === 200) {
          setGetData(respone.data.data);
          setLoading(false)
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    addListingData();
  }, []);

  

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_URL}plans/${id}`
      );
      if (res.data.status === 200) {
        window.location.reload(false);
      }
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <>
      <div>
        <section className="ptb_80 pt_sm_50">
          <div className="container">
            <div className="row">
              <div className="col-12 col-md-4 col-lg-3">
                <div className="card_Gray mb-5 mb-md-0 divSticky">
                  <AdminLeftNav />
                </div>
              </div>

              <div className="col-12 col-md-8 col-lg-9">
                <div
                  className="d-flex" id="widthChnge"
                  style={{ justifyContent: "space-between" }}
                >
                  <h3>Listing Plan </h3>
                  <Link to="/admin/addVehicle-listing" className="orange_btn">
                    Add Listing
                  </Link>
                </div>

                <hr id='hr' />
                <div class="card_Gray table-responsive vehicleSub" id="scrollable">

                  {
                    loading ? <div class="d-flex justify-content-center">
                      <div class="spinner-border" role="status">
                        <span class="sr-only">Loading...</span>
                      </div>
                    </div> : <table class="table table-striped">
                      <thead>
                        <tr>
                          <th scope="col">Sr.No</th>
                            <th scope="col" style={{ textTransform: "capitalize" }}>plan name</th>
                            <th scope="col" style={{textTransform:"capitalize"}}>annual price</th>
                            <th scope="col" style={{textTransform:"capitalize"}}>category</th>
                            <th scope="col" style={{textTransform:"capitalize"}}>monthly listing</th>
                            <th scope="col" style={{textTransform:"capitalize"}}>monthly price</th>
                            <th scope="col" style={{textTransform:"capitalize"}}>plan name</th>

                            <th scope="col" style={{ textTransform: "capitalize" }}>monthly description</th>

                            <th scope="col" style={{ textTransform: "capitalize" }}>Annual Description </th>

                            

                            

                          <th scope="col" style={{ textAlign: "right" }}>
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {getData &&
                            getData.map((curElem) => {
                              console.log(9898, curElem)
                              // const { id, list, maxprice, name, price } = curElem;
                              const { annual_description, annual_listing, annual_price, category,
                                monthly_description, monthly_listing, monthly_price, plan_name, id } = curElem
                            return (
                              <tr>
                                <td>{id}</td>
                                <td>{plan_name}</td>
                                <td>{annual_listing}</td>
                                <td>{annual_price}</td>
                                <td>{category}</td>
                                <td>{monthly_listing}</td>
                                <td>{monthly_price}</td>
                                <td>{monthly_description?.substr(0,30) + "..."}</td>
                                <td>{annual_description?.substr(0,30)+"..."}</td>
                               

                                <td className="text-right">
                                  <Dropdown className="neWm">
                                    <Dropdown.Toggle variant="success" id="">
                                    <i class="fa-solid fa-ellipsis-vertical"></i>
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                      <Dropdown.Item href="#/action-1"> 
                                      <Link className="editDrop"
                                        to={`/admin/vehicle-listing-details/${id}`}
                                      // className="btn"
                                      >
                                        <i class="fa-solid fa-pencil"></i> Edit
                                      </Link>
                                      </Dropdown.Item>
                                      <Dropdown.Item href="#/action-2">
                                      <Link to={``} className="editDrop"                                    
                                        onClick={() => handleDelete(curElem.id)}
                                      >
                                      <i class="fa-solid fa-trash-can" ></i> Delete
                                    </Link>
                                      </Dropdown.Item>
                                      
                                    </Dropdown.Menu>
                                  </Dropdown>
                                </td>

                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  }




                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default VehicleListing;
