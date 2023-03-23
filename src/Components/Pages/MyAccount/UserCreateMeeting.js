import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import axios from "axios";
import parse from "html-react-parser";
import { strToHtml } from "../../UI/globaleVar";
import MyAccountLeftNav from "./MyAccountLeftNav";
import { toast } from "react-toastify";

function UserCreateMeeting() {
  const [meetingData, setMeetingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterValue, setFilterValue] = useState("All");



  

  useEffect(() => {
    const fetchMeetingDetail = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_URL}admin/getEvent`
        );
        console.log(7676, res.data.data)
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
        notify("Deleted Event successfully !");
        window.location.reload(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const VechilesApprove = (id, dis) => {
    axios
      .post(`${process.env.REACT_APP_URL}approveEvent`, {
        id: id,
        status: dis,
      })
      .then(function (response) {
        if (response.status === 200) {
          console.log(798989, response)
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
      <section className="ptb_80 pt_sm_50">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-4 col-lg-3">
              <div className="card_Gray mb-5 mb-md-0">
                <h5>My Account</h5>
                <hr />
                <MyAccountLeftNav />
              </div>
            </div>
            <div className="col-12 col-md-8 col-lg-9">
              <div class="FlexCol">
                <h3>Events</h3>

                {/* <ul>
                  <li className="">
                    <select
                      value={filterValue}
                      onChange={(e) => {
                        setFilterValue(e.target.value);
                      }}
                      className="field">
                      <option value="All">All</option>
                      <option value="PUBLISHED">Publish</option>
                      <option value="REVIEWD_BY_ADMIN">Approve</option>
                      <option value="PENDING_ADMIN_APPROVAL">Pending</option> </select>
                  </li>
                </ul> */}

                <Link to="/add-user-meeting" className="orange_btn">
                 + Add Create Event
                </Link>
              </div>
              <hr />
              <div
                class="card_Gray table-responsive vehicleSub"
                id="scrollable"
              >
                {
                  loading ? <div class="d-flex justify-content-center">
                    <div class="spinner-border" role="status">
                      <span class="sr-only">Loading...</span>
                    </div>
                  </div> : <table class="table table-striped">
                    <thead>
                      <tr>
                        <th scope="col">Sr.No</th>
                        <th scope="col">image</th>
                        {/* <th scope="col">Image</th> */}
                        <th scope="col">Title</th>
                        <th scope="col">Start Date</th>
                        <th scope="col">End Date </th>
                        <th scope="col">Website Link</th>
                        <th scope="col">Facebook Link</th>
                        <th scope="col">Twitter Link</th>
                        <th scope="col">Email</th>
                        <th scope="col">Description</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>



                    <tbody>
                      {
                        meetingData?.map((curVal, index) => {
                          console.log(989, curVal, index)
                          return <tr>
                            <td>{index + 1}</td>
                            <td>
                              <img src={`https://api.gasguzzlrs.com/upload/event/${curVal.image}`} alt="" />
                            </td>
                            <td>{curVal.title}</td>
                            <td>{curVal.start_date}</td>
                            <td>{curVal.end_date}</td>
                            <td>{curVal.url}</td>
                            <td>{curVal.facebook}</td>
                            <td>{curVal.twitter}</td>
                            <td>{curVal.email}</td>
                            {/* <td>{curVal.description.substr(0,100)}</td> */}
                            <td>{parse(
                              curVal?.description.substr(0, 300),
                              strToHtml
                            )}</td>
                            <td>

                              <Link to={`/edit-user-meeting/${curVal.id}`}>
                                <button>
                                  <i class="fa-solid fa-pencil"></i>{" "}
                                  Edit
                                </button>
                              </Link>
                              <button
                              onClick={() => handleDelete(curVal.id)}
                              >Delete</button>
                            </td>

                            <div className="pl-md-3 d-flex">
                              {curVal?.status == "0" && (
                                <p
                                  // onClick={() => VechilesApprove(curVal.id,0)}
                                  className=""
                                >
                                  Pending for Admin Review
                                </p>
                              ) 
                            
                              }
                              
                              {curVal?.status == "1" && (
                                <button
                                  onClick={() => VechilesApprove(curVal.id, 2)}
                                  className="gry_btn mr-2"
                                >
                                  Publish
                                </button>
                              )

                              }
                              {curVal?.status == "2" && (
                                <p
                                  // onClick={() => VechilesApprove(curVal.id, 2)}
                                  className=""
                                >
                                  Published
                                </p>
                              )

                              }
                              {curVal?.status == "3" && (
                                <p
                                  // onClick={() => VechilesApprove(curVal.id, 2)}
                                  className=""
                                >
                                  Rejected by Admin
                                </p>
                              )

                              }



                            </div>
                          </tr>





                        })
                      }




                    </tbody>
                  </table>
                }




              </div>

            </div>
          </div>
        </div>
      </section>

    </>
  );
}

export default UserCreateMeeting;
