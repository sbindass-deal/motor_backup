import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import AdminLeftNav from "../AdminLeftNav";

const VehicleAdsList = () => {
  const [classifiedAd, setClassifiedAd] = useState([]);
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_URL}vehicles_added_by_admin`
        );
        setClassifiedAd(res.data.data);
        setLoading(false)
      } catch (err) {
        console.log(err);
      }
    };
    fetchApi();
  }, []);

  const handleDelete = async (vId) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_URL}deleteVehicle/${vId}`
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
                  <h3>Classified Vehicle List </h3>
                  {/* <Link to="/admin-vehicle-ad/add-vehicle-ads" className="btn">
                    Classified Vehicle
                  </Link> */}

                  <Link to="/admin-vehicle-ad/add-vehicle-ads" className="orange_btn" style={{
                    padding: "6px",
                    fontSize: "18px",
                    fontWeight: "100"

                  }}>
                    + Add Vehicle List
                  </Link>
                </div>

                <hr id="hr"/>
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
                          <th scope="col">Image</th>
                          <th scope="col">Make</th>
                          <th scope="col">Description </th>
                          <th scope="col">Year</th>

                          <th scope="col" style={{ textAlign: "center" }}>
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {classifiedAd.length > 0 &&
                          classifiedAd.map((curElem, i) => {
                            return (
                              <tr>
                                <td>{i + 1}</td>
                                <td className="cartImg">
                                  {curElem.images && (
                                    <img
                                      loading="lazy"
                                      src={
                                        curElem?.images[0] &&
                                        `${process.env.REACT_APP_URL}/${curElem?.images[0]?.imagePath}/${curElem?.images[0]?.imageName}`
                                      }
                                      onError={({ currentTarget }) => {
                                        currentTarget.onError = null;
                                        currentTarget.src =
                                          "http://www.freeiconspng.com/uploads/no-image-icon-11.PNG";
                                      }}
                                      alt="Maskgroup1"
                                    />
                                  )}
                                </td>
                                <td>{curElem.make}</td>
                                <td>{curElem.moreDescription}</td>
                                <td>{curElem.year}</td>

                                {/* <td>
                          <Link to={``} className="btn">
                            <i class="fa-solid fa-pencil"></i>
                          </Link>
                        </td> */}
                                <td>
                                  <Link
                                    onClick={() => handleDelete(curElem.id)}
                                    to={``}
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

export default VehicleAdsList;
