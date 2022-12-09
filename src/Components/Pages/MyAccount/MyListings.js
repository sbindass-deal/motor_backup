import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import MyAccountLeftNav from "./MyAccountLeftNav";
import { useSelector } from "react-redux";
import ChatIcon from "@mui/icons-material/Chat";
import { Modal, Spinner } from "react-bootstrap";

function MyListings() {
  const [data, setData] = useState([]);
  const [chatMessage, setChatMessage] = useState("");
  const [chateApiData, setChateApiData] = useState([]);
  const [vehicleId, setVehicleId] = useState();
  const [vehicleLoding, setVehicleLoding] = useState(false);
  const userId = useSelector((state) => state);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setVehicleId(id);
    setShow(true);
  };

  useEffect(() => {
    setVehicleLoding(true);
    axios
      .get(process.env.REACT_APP_URL + `byUserVehicle`)
      .then((response) => {
        setData(response.data.data);
        setVehicleLoding(false);
      })
      .catch((err) => {
        setVehicleLoding(false);
      });
  }, []);
  const fetchResurveApi = (vId, resurve, resurveAmount) => {
    axios
      .post(process.env.REACT_APP_URL + "changeReserve", {
        id: vId,
        reserve: resurve === "Yes" ? "No" : "Yes",
        reservAmount: resurveAmount,
      })
      .then((res) => {
        if (res.data.status === 200) {
          setData([]);
          window.location.reload(false);
        }
        console.log(res);
      });
  };

  useEffect(() => {
    const getChateMessageApi = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_URL}getChat/${vehicleId}`
        );
        if (res.data.status === 200) {
          setChateApiData(res.data.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getChateMessageApi();
  }, [show]);

  const handleChatMessage = (e) => {
    e.preventDefault();
    axios
      .post(process.env.REACT_APP_URL + "addChat", {
        userId: userId.login.user.id,
        vehicleId: vehicleId,
        message: chatMessage,
      })
      .then((res) => {
        if (res.data.status === 200) {
          setChatMessage("");
          setChateApiData(res.data.data);
        }
      });
  };

  const handleSoldApi = (id) => {
    axios
      .post(process.env.REACT_APP_URL + "sold", {
        id: id,
        sold: 0,
      })
      .then((res) => {
        window.location.reload(false);
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
              <div class="FlexCol">
                <h3>My Account</h3>
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
                              src={
                                process.env.REACT_APP_URL + curElem.stepOneImage
                              }
                              alt={curElem.stepOneImage}
                            />
                          </div>
                          <div className="bidsInfo">
                            <div className="">
                              <h6>{curElem.name}</h6>
                              <p>{curElem.description}</p>
                              {curElem.bidding.map((curBid) => {
                                return (
                                  <p>High Bid:- {curBid.auctionAmmount}</p>
                                );
                              })}
                            </div>

                            <div className="pl-md-3 d-flex">
                              {
                                <div className="mx-2">
                                  <button
                                    onClick={() => handleSoldApi(curElem.id)}
                                    type="button"
                                    className="gry_btn"
                                    disabled={
                                      curElem.sold === "0" ? true : false
                                    }
                                  >
                                    Sold
                                  </button>
                                </div>
                              }
                              {curElem.reserve === "Yes" ? (
                                <>
                                  <div className="mx-2">
                                    <button
                                      onClick={() => handleShow(curElem.id)}
                                      type="button"
                                      className="gry_btn"
                                    >
                                      <ChatIcon />
                                    </button>
                                  </div>
                                  <div className="mx-2">
                                    <button
                                      onClick={() =>
                                        fetchResurveApi(
                                          curElem.id,
                                          curElem.reserve,
                                          curElem.reservAmount
                                        )
                                      }
                                      type="button"
                                      className="gry_btn"
                                    >
                                      {curElem.reserve}
                                    </button>
                                  </div>
                                </>
                              ) : null}
                              <a
                                href={`detail/${curElem.id}`}
                                className="gry_btn"
                              >
                                <i className="fa-solid fa-eye mr-2"></i> View
                              </a>
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
            <div className="col-12 py-2">
              {chateApiData.map((curElem, i) => {
                return (
                  <span key={i}>
                    {curElem.message}
                    <br />
                  </span>
                );
              })}
            </div>
          </div>
          <form onSubmit={handleChatMessage}>
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
