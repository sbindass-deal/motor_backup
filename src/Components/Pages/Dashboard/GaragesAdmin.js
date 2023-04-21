import React, { useEffect, useState } from "react";
import AdminLeftNav from "./AdminLeftNav";
import img_01 from "../../../Assets/images/img_001.webp";
import axios from "axios";
import { Link } from "react-router-dom";
import moment from "moment";
import parse from "html-react-parser";
import { strToHtml } from "../../UI/globaleVar";


function GaragesAdmin() {
  const [showLotary, setShowLotary] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    const fetchLotaryApi = async () => {
      try {
        const response = await axios.get(
          process.env.REACT_APP_URL + "garages"
        );
        if (response.data.data.length > 0) {
          setShowLotary(response?.data?.data);
          setLoading(false);
        } else {
          console.log("Data is empty");
        }
      } catch (err) { }
    };

    fetchLotaryApi();
  }, []);


  console.log(1009, showLotary)
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
              <div className="reffAdmn">
                <h3>Garages Management</h3>
                <div style={{ marginLeft: "auto" }}></div>
                <Link
                  to="/raffleadmin/add-raffel"
                  style={{ marginRight: "10px" }}
                  className="orange_btn"
                >
                  {" "}
                  + Add Giveaways{" "}
                </Link>
                <div className="dropdown">
                  <a
                    className="orange_btn dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Category
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <a
                        className="dropdown-item"
                        onClick={() => {
                          setCategory("All");
                        }}
                      >
                        All
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        onClick={() => {
                          setCategory("Expired");
                        }}
                      >
                        Expired
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        onClick={() => {
                          setCategory("Going");
                        }}
                      >
                        On Going
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        onClick={() => {
                          setCategory("Future");
                        }}
                      >
                        Future
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <hr id="hr" />
              <div className="row">
                <div className="col">
                  {/* ================= */}
                  <ul className="postTopOption" id="widthChnge">
                    <li className="post_search">
                      <input
                        type="search"
                        name="search"
                        placeholder="Search…"
                        onChange={(e) => {
                          setSearchTerm(e.target.value);
                        }}
                      />
                    </li>
                  </ul>
                  <div
                    className="card_Gray table-responsive vehicleSub raffle"
                    id="scrollable"
                  >
                    {loading ? (
                      <div className="d-flex justify-content-center">
                        <div className="spinner-border" role="status">
                          <span className="sr-only">Loading...</span>
                        </div>
                      </div>
                    ) : (
                      <table className="table 
                      //table-striped
                      ">
                        <thead>
                          <tr>
                            <th scope="col">Sr.No</th>
                            <th scope="col">Logo</th>
                            <th scope="col" className="description">
                              Title{" "}</th>
                            <th scope="col" className="description">
                              Description{" "}
                            </th>

                            <th scope="col" style={{ textAlign: "right" }}>
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {showLotary.filter((curVal) => {
                            if (searchTerm == "") {
                              return curVal
                            } else if (curVal.garageTitle.toLowerCase().includes(searchTerm.toLowerCase())) {
                              return curVal;
                            }
                          })
                            ?.map((data, index) => (
                              <tr>
                                {console.log(6767, data)}
                                <th scope="row">{index + 1}</th>
                                {/* <td> {data?.garageTitle}</td> */}
                                {/* ==================== */}
                                <td>
                                  {data?.image_logo && (
                                    <img
                                      loading="lazy"
                                      style={{
                                        maxWidth: "100px",
                                        maxHeight: "100px",
                                      }}
                                      src={
                                        data?.image_logo[0] &&
                                        `${process.env.REACT_APP_URL}/${data?.image_logo[0]?.logo}`
                                      }
                                      onError={({ currentTarget }) => {
                                        currentTarget.onError = null;
                                        currentTarget.src =
                                          "http://www.freeiconspng.com/uploads/no-image-icon-11.PNG";
                                      }}
                                    // alt={data.name}
                                    />
                                  )}
                                </td>
                                {/* ==================== */}
                                <td>{data?.garageTitle}</td>
                                <td>{parse(
                                  data?.garagesDescription?.substr(0, 50) + "...",
                                  strToHtml
                                )

                                }</td>


                                <td className="actionBtn">
                                  {/* {data.active && ( */}
                                  {/* <button
                                  onClick={() => approveLottery(data.id)}
                                  className={`${data.active === "1"
                                      ? ""
                                      : "bg-light text-dark"
                                    } `}
                                >
                                  Approve
                                </button> */}
                                  <Link
                                    id="linkTag"
                                    to={`/garages/${data.id}`}
                                    className=""
                                  >
                                    View
                                  </Link>
                                  {/* <button><i className="fa-sharp fa-solid fa-plus"></i></button> */}
                                  {/* <button><i className="fa-solid fa-trash-can"></i></button>   */}
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                  {/* ===================== */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default GaragesAdmin;
