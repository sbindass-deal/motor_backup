import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import AdminLeftNav from "../AdminLeftNav";

const VehicleAdsList = () => {
  const [classifiedAd, setClassifiedAd] = useState([]);
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_URL}vehiclesbyadmin`
        );
        setClassifiedAd(res.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchApi();
  }, []);

  const handleDelete = (vId) => {};

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
                  className="d-flex"
                  style={{ justifyContent: "space-between" }}
                >
                  <h3>Classified Vehicle List </h3>
                  <Link to="/admin-vehicle-ad/add-vehicle-ads" className="btn">
                    Classified Vehicle
                  </Link>
                </div>

                <hr />
                <div class="card_Gray table-responsive vehicleSub">
                  <table class="table table-striped">
                    <thead>
                      <tr>
                        <th scope="col">S.no</th>
                        <th scope="col">Image</th>
                        <th scope="col">Make</th>
                        <th scope="col">Description </th>
                        <th scope="col">Year</th>

                        <th scope="col" style={{ textAlign: "right" }}>
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
                              <td>
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
                                  className="btn"
                                >
                                  <i class="fa-solid fa-trash-can"></i>
                                </Link>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
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
