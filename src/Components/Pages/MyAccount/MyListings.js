import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import MyAccountLeftNav from "./MyAccountLeftNav";
import { useSelector } from "react-redux";
import ChatIcon from "@mui/icons-material/Chat";
import { Modal, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { async } from "q";

function MyListings() {
  const logingUser = useSelector((state) => state);
  const vehicleData = logingUser.vehicleReducer.vehicleData;
  const [data, setData] = useState([]);
  const [chatMessage, setChatMessage] = useState("");
  const [chateApiData, setChateApiData] = useState([]);
  const [vehicleId, setVehicleId] = useState();
  const [vehicleLoding, setVehicleLoding] = useState(false);
  const [filterValue, setFilterValue] = useState("All");
  const userId = useSelector((state) => state);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setVehicleId(id);
    setShow(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(process.env.REACT_APP_URL + `user`);
        if (res.data.data) {
          const filteredVehicle = vehicleData.filter(
            (item) => item.userId === res.data.data.id
          );
          // setData(filteredVehicle)
          console.log(1111, filteredVehicle);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const fetchUserVehicleListApi = async () => {
    setVehicleLoding(true);
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_URL}byUserVehicle?veicleStatus=${filterValue}`
      );
      if (res.data.status === 200) {
        setData(res.data.data);
      }
      setVehicleLoding(false);
    } catch (err) {
      setVehicleLoding(false);
    }
  };

  useEffect(() => {
    fetchUserVehicleListApi();
  }, [filterValue]);

  const handleDeleteVehicle = (vId) => {
    axios
      .delete(`${process.env.REACT_APP_URL}deleteVehicle/${vId}`)
      .then((response) => {
        if (response.status === 200) {
          window.location.reload(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const publishVehicle = (vId) => {
    axios
      .post(`${process.env.REACT_APP_URL}vehicleApprove`, {
        approve: 2,
        id: vId,
      })
      .then(function (response) {
        if (response.status === 200) {
          fetchUserVehicleListApi(filterValue);
          // window.location.reload(false);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  if (vehicleLoding) {
    return (
      <div
        className="container"
        style={{
          height: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="row">
          <Spinner />
        </div>
      </div>
    );
  }

  return (
    <div>
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
              {/* <div class="FlexCol"> */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <h3>My Listing</h3>
                <ul>
                  <li className="">
                    <select
                      value={filterValue}
                      onChange={(e) => {
                        setFilterValue(e.target.value);
                      }}
                      className="post_select"
                    >
                      <option value="All">All</option>
                      <option value="PUBLISHED">Publish</option>
                      <option value="REVIEWD_BY_ADMIN">Approve</option>
                      <option value="PENDING_ADMIN_APPROVAL">Pending</option>
                    </select>
                  </li>
                </ul>
                <Link to="/submit" className="gry_btn px-3">
                  + Add new listing
                </Link>
              </div>
              <hr />
              <div className="row">
                <div className="col-12">
                  {data.length > 0 ? (
                    data.map((curElem) => {
                      return (
                        <div key={curElem.id} className="bidsListRow">
                          <div className="bidsImg">
                            <img
                              loading="lazy"
                              src={
                                curElem.images && curElem.images[0]
                                  ? `${process.env.REACT_APP_URL}/${curElem.images[0].imagePath}/${curElem.images[0].imageName}`
                                  : "http://www.freeiconspng.com/uploads/no-image-icon-11.PNG"
                              }
                              onError={({ currentTarget }) => {
                                currentTarget.onError = null;
                                currentTarget.src =
                                  "http://www.freeiconspng.com/uploads/no-image-icon-11.PNG";
                              }}
                              alt="Maskgroup1"
                            />
                          </div>
                          <div className="bidsInfo">
                            <div className="">
                              <h6>
                                {curElem.make} {curElem.model} {curElem.year}
                              </h6>
                              <p>
                                {curElem.fuel} {curElem.odmeter}
                              </p>
                            </div>

                            <div className="pl-md-3 d-flex">
                              {curElem?.approved == "1" && (
                                <button
                                  onClick={() => publishVehicle(curElem.id)}
                                  className="gry_btn mr-2"
                                >
                                  Published
                                </button>
                              )}
                              <Link
                                to={`/vehicle/${curElem.id}`}
                                className="gry_btn"
                              >
                                <i class="fa-solid fa-pencil"></i>
                              </Link>
                              <button
                                onClick={() => handleDeleteVehicle(curElem.id)}
                                className="gry_btn ml-2"
                              >
                                <i class="fa-solid fa-trash-can"></i>
                              </button>
                              <Link
                                to={`/detail/${curElem.id}`}
                                className="gry_btn ml-2"
                              >
                                Preview
                              </Link>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div
                      className="container"
                      style={{
                        height: "50vh",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <div className="row">
                        <h3>You have not listed any vehicle</h3>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header>
          <Modal.Title>Chat</Modal.Title>
          <div style={{ cursor: "pointer" }} onClick={handleClose}>
            X
          </div>
        </Modal.Header>
        <Modal.Body>
          <div
            className="row mx-1 my-1 rounded"
            style={{
              height: "40vh",
              backgroundColor: "white",
              color: "black",
              overflow: "auto",
            }}
          >
            <div className="col-12 py-2 bg-secondary">
              {chateApiData.map((curElem, i) => {
                return (
                  <div key={i}>
                    {curElem.userId === 2 ? (
                      <div className="rounded px-2 d-flex justify-content-start p-1 bg-light my-2">
                        {curElem.message}
                      </div>
                    ) : (
                      <div className="rounded px-2 d-flex justify-content-end p-1 bg-light my-2">
                        {curElem.message}
                      </div>
                    )}
                    <br />
                  </div>
                );
              })}
            </div>
          </div>
          <form>
            <div className="row">
              <div className="col-12 col-md-12">
                <label for="validationCustom01" class="form-label">
                  Message
                </label>
                <input
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  class="form-control"
                  type="text"
                  id="chatMessage"
                  placeholder="Enter message"
                  required
                ></input>
              </div>
              <div className="col-12 d-flex justify-content-center pt-4 ">
                <button className="btn" type="submit">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default MyListings;
