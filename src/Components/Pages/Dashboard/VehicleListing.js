import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminLeftNav from "./AdminLeftNav";

const VehicleListing = () => {
  const [getData, setGetData] = useState([]);
  const [loading, setLoading]=useState(true)
  const addListingData = async () => {
    await axios
      .get(`${process.env.REACT_APP_URL}getAllPlans`)
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
                    + Add Listing
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
                          <th scope="col">Name</th>
                          <th scope="col">Description </th>
                          <th scope="col">Price Of Single Listing</th>
                          <th scope="col">Price of 5 Listing</th>
                          <th scope="col" style={{ textAlign: "right" }}>
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {getData &&
                          getData.map((curElem) => {
                            const { id, list, maxprice, name, price } = curElem;
                            return (
                              <tr>
                                <td>{id}</td>
                                <td>{name}</td>
                                <td>{list}</td>
                                <td className="text-right">
                                  <Link id="linkTag"
                                    to={`/admin/vehicle-listing-details/${id}`}
                                    // className="btn"
                                  >
                                    <i class="fa-solid fa-pencil"></i>
                                  </Link>

                                  <Link to={``}  id="linkTag"
                                    // className="btn"
                                  >
                                    <i class="fa-solid fa-trash-can"></i>
                                  </Link>
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
