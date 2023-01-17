import React, { useEffect, useState } from "react";
import AdminLeftNav from "./AdminLeftNav";
import { Link } from "react-router-dom";
import axios from "axios";

function VehicleSubmission() {
  const [showvehicles, setShowvehicles] = useState([]);
  const fetchLotaryApi = async () => {
    try {
      const response = await axios.get(process.env.REACT_APP_URL + "vehicles");
      console.log("refral", response.data);
      if (response.data.data.length > 0) {
        setShowvehicles(response.data.data);
      } else {
        console.log("Data is empty");
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchLotaryApi();
  }, []);

  const handleReject = async (id) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_URL}vehicleDeapprove/${id}`
      );
      window.location.reload(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
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
              <h3>Vehicle Submission</h3>
              <hr />
              <ul className="postTopOption">
                <li className="post_search">
                  <input type="search" name="search" placeholder="Search…" />
                </li>
              </ul>
              <div class="card_Gray table-responsive vehicleSub">
                <table class="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">Id</th>
                      {/* <th scope="col">User Id</th> */}
                      <th scope="col">User Name</th>
                      <th
                        scope="col"
                        colspan="3"
                        style={{ textAlign: "center" }}
                      >
                        Car Info
                      </th>

                      <th scope="col" style={{ textAlign: "right" }}>
                        Action
                      </th>
                      <th>status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {showvehicles.length > 0
                      ? showvehicles.map((data, index) => (
                          <tr
                            key={index}
                            // style={{ cursor: "pointer" }}
                          >
                            <th scope="row">{index + 1}</th>
                            {/* <td>{data.userId}</td> */}
                            <td>{data.name}</td>
                            <td>
                              {new Date(data.updated_at).toLocaleDateString()}{" "}
                              {new Date(data.updated_at).toLocaleTimeString()}
                            </td>
                            <td>{data.year}</td>
                            <td>{data.make}</td>
                            <td className="actionBtn vs">
                              <Link
                                to={`/vehicle-submission/${data.id}`}
                                className="btn"
                              >
                                {/* <i class="fa-solid fa-trash-can"></i> */}
                                View
                              </Link>
                            </td>
                            <td>
                              <span>{data.status && data.status.title}</span>
                            </td>
                          </tr>
                        ))
                      : null}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default VehicleSubmission;
