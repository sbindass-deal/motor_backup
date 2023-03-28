import React, { useEffect, useState } from "react";
import AdminLeftNav from "./AdminLeftNav";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import Dropdown from "react-bootstrap/Dropdown";

function VehicleSubmission() {
  const [showvehicles, setShowvehicles] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const fetchLotaryApi = async () => {
    try {
      const response = await axios.get(process.env.REACT_APP_URL + "vehicles");
      console.log("refral", response.data);
      if (response.data.data.length > 0) {
        setShowvehicles(response.data.data);
        setLoading(false);
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
              <hr id="hr" />
              <ul className="postTopOption" id="widthChnge">
                <li className="post_search">
                  <input
                    type="search"
                    name="search"
                    placeholder="Search"
                    onChange={(e) => {
                      const newVal = e.target.value.toUpperCase();
                      setSearchTerm(newVal);
                    }}
                  />
                </li>
              </ul>
              <div
                className="card_Gray table-responsive vehicleSub"
                id="scrollable"
              >
                {loading ? (
                  <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                ) : (
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th scope="col">Sr.No</th>
                        <th scope="col">User Name</th>
                        <th scope="col">Date & Time</th>
                        <th scope="col">Year</th>
                        <th
                        // scope="col"
                        // colspan="3"
                        // style={{ textAlign: "center" }}
                        >
                          Car Info
                        </th>
                        <th>status</th>
                        <th scope="col" style={{ textAlign: "center" }}>
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {showvehicles.length > 0
                        ? showvehicles
                            .filter((data) =>
                              data.make && data.model && data.year
                                ? data.make
                                    .toUpperCase()
                                    .includes(searchTerm) ||
                                data.name
                                    .toUpperCase()
                                    .includes(searchTerm) ||
                                  data.year.toUpperCase().includes(searchTerm)
                                : data
                            )
                            .reverse()
                            .map((data, index) => (
                              <tr
                                key={index}
                                // style={{ cursor: "pointer" }}
                              >
                                <th scope="row">{index + 1}</th>
                                {/* <td>{data.userId}</td> */}

                                <td>{data.name}</td>
                                <td>
                                  {new Date(
                                    data.updated_at
                                  ).toDateString()}{" "}<br/>
                                  {new Date(
                                    data.updated_at
                                  ).toLocaleTimeString()}
                                </td>
                                <td>{data.year}</td>
                                <td>{data.make}</td>

                                <td>
                                  {data.approved == 0
                                    ? "Pending"
                                    : data.approved == 1
                                    ? "Approved"
                                    : data.approved == 2
                                    ? "Published"
                                    : data.approved == 3
                                    ? "Rejected"
                                    : null}
                                  {/* <span>{data.status && data.status.title}</span> */}
                                </td>

                                <td className="actionBtn vs">
                                  <Dropdown className="neWm">
                                    <Dropdown.Toggle variant="success" id="">
                                      <i className="fa-solid fa-ellipsis-vertical"></i>
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                      <Dropdown.Item href="#/action-1">
                                        <Link
                                          to={`/detail/${data.id}`}
                                          className=" mr-1"
                                        >
                                          Preview
                                        </Link>
                                      </Dropdown.Item>
                                      <Dropdown.Item href="#/action-2">
                                        <Link
                                          to={`/vehicle-submission/${data.id}`}
                                          className=""
                                        >
                                          Edit
                                        </Link>
                                      </Dropdown.Item>
                                    </Dropdown.Menu>
                                  </Dropdown>
                                </td>
                              </tr>
                            ))
                        : null}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default VehicleSubmission;
