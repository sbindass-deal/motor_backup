import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AdminLeftNav from "./AdminLeftNav";
import axios from "axios";
import parse from "html-react-parser";
import { strToHtml } from "../../UI/globaleVar";
import { toast } from "react-toastify";
import Dropdown from "react-bootstrap/Dropdown";

const CreateMeeting = () => {
  const [meetingData, setMeetingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchMeetingDetail = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_URL}admin/getEvent`
        );
        console.log(7676, res.data.data.allevent);
        setMeetingData(res.data.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchMeetingDetail();
  }, []);

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
  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_URL}deleteEvent/${id}`
      );
      if (res.data.status === 200) {
        notify("Deleted successfully !");
        window.location.reload(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const VechilesApprove = (id, dis) => {
    debugger;
    axios
      .post(`${process.env.REACT_APP_URL}approveEvent`, {
        id: id,
        status: dis,
      })
      .then(function (response) {
        if (response.status === 200) {
          console.log(798989, response);
          // fetchUserVehicleListApi(filterValue);
          window.location.reload(false);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
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
                  className="d-flex"
                  id="widthChnge"
                  style={{ justifyContent: "space-between" }}
                >
                  <h3>Events</h3>

                  <Link
                    to="/admin-add-meeting/add-meeting"
                    className="orange_btn"
                  >
                   + Add Event
                  </Link>
                </div>

                <hr id="hr" />

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
                          <th scope="col">image</th>
                          {/* <th scope="col">Image</th> */}
                          <th scope="col">Title</th>
                          <th scope="col">Start Date</th>
                          <th scope="col">End Date </th>
                          {/* <th scope="col">Website Link</th> */}
                          {/* <th scope="col">Facebook Link</th>
                          <th scope="col">Twitter Link</th>
                          <th scope="col">Email</th> */}
                          <th scope="col">Description</th>
                          <th scope="col">Action</th>
                        </tr>
                      </thead>

                      <tbody>
                          {meetingData?.filter((curVal) => {
                            if (searchTerm == "") {
                              return curVal
                            } else if (curVal.title.toLowerCase().includes(searchTerm.toLowerCase())) {
                              return curVal
                            }
                          })
                            ?.map((curVal, index) => {
                          console.log(989, curVal, index);
                          return (
                            <tr>
                              <td>{index + 1}</td>
                              <td>
                                <img
                                  src={`https://api.gasguzzlrs.com/upload/event/${curVal.image}`}
                                  alt=""
                                />
                              </td>
                              <td>{curVal.title}</td>
                              <td>{new Date(curVal.start_date).toDateString()}</td>
                              <td>{new Date(curVal.end_date).toDateString()}</td>
                              {/* <td>{curVal.url}</td> */}
                              {/* <td>{curVal.facebook}</td>
                              <td>{curVal.twitter}</td>
                              <td>{curVal.email}</td> */}
                              {/* <td>{curVal.description.substr(0,100)}</td> */}
                              <td>
                                {parse(
                                  curVal?.description.substr(0, 50)+"...",
                                  strToHtml
                                )}
                              </td>
                              <td className="actionBtn">
                                  <Dropdown className="neWm">
                                    <Dropdown.Toggle variant="success" id="">
                                      <i className="fa-solid fa-ellipsis-vertical"></i>
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                      <Dropdown.Item href="#/action-1">
                                      <Link to={`/edit-meeting/${curVal.id}`}>
                                        <button>
                                          <i className="fa-solid fa-pencil"></i> Edit
                                        </button>
                                      </Link>
                                      
                                      </Dropdown.Item>
                                      <Dropdown.Item href="#/action-2">
                                        <button
                                         onClick={() => handleDelete(curVal.id)}
                                        >
                                          <i className="fa-solid fa-trash-can"></i>{" "}
                                          Delete
                                        </button>
                                      </Dropdown.Item>
                                    </Dropdown.Menu>
                                  </Dropdown>
                                </td>
                            <td><div className="pl-md-3 d-flex">
                                {/* {curVal?.status == "1" ? (
                                  <button
                                    onClick={() => VechilesApprove(curVal.id, 0)}
                                    className="gry_btn mr-2"
                                  >
                                    Disapprove
                                  </button>
                                ) : (
                                  <button
                                    onClick={() => VechilesApprove(curVal.id, 1)}
                                    className="gry_btn mr-2"
                                  >
                                    Approve
                                  </button>
                                )

                                } */}

                                {curVal?.status == "0" && (
                                  <>
                                    <button
                                      onClick={() =>
                                        VechilesApprove(curVal.id, 1)
                                      }
                                      className="gry_btn mr-2"
                                    >
                                      Approve
                                    </button>
                                    <button
                                      onClick={() =>
                                        VechilesApprove(curVal.id, 3)
                                      }
                                      className="gry_btn mr-2"
                                    >
                                      Reject
                                    </button>
                                  </>
                                )}

                                {curVal.status == "1" && (
                                  <p
                                    // onClick={() => VechilesApprove(curVal.id, 1)}
                                    className=""
                                  >
                                    Approved
                                  </p>
                                )}
                                {curVal.status == "2" && (
                                  <p
                                    // onClick={() => VechilesApprove(curVal.id, 1)}
                                    className=""
                                  >
                                    Published
                                  </p>
                                )}
                                {curVal.status == "3" && (
                                  <p
                                    // onClick={() => VechilesApprove(curVal.id, 1)}
                                    className=""
                                  >
                                    Rejected
                                  </p>
                                )}
                              </div></td>
                              
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default CreateMeeting;
