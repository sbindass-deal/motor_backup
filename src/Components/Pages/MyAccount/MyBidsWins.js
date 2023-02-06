import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import car_01 from "../../../Assets/images/car_01.jpg";
import MyAccountLeftNav from "./MyAccountLeftNav";
import ChatIcon from "@mui/icons-material/Chat";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import StripeCheckout from "react-stripe-checkout";

function MyBidsWins() {
  const [data, setData] = useState([]);
  const userId = useSelector((state) => state);
  const [chatMessage, setChatMessage] = useState("");
  const [chateApiData, setChateApiData] = useState([]);
  const [show, setShow] = useState(false);
  const [vehicleId, setVehicleId] = useState();
  const [showPayment, setShowPayment] = useState(false);

  const handleClose = () => {
    setChateApiData([]);
    setShow(false);
  };
  const handleShow = (id) => {
    setVehicleId(id);
    setShow(true);
  };
  const handleClosePayment = () => {
    setShowPayment(false);
  };
  const handleShowPayment = (data) => {
    setShowPayment(true);
    setVehicleId(data);
  };
  const onToken = (token, addresses) => {
    console.log(token, addresses);
    if (token !== null) {
      setShowPayment(false);
      axios
        .post(`${process.env.REACT_APP_URL}changeApproved`, {
          approve: 7,
          id: vehicleId,
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      // notify("Form submit successfully!");
    }
  };

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_URL + `biddingDetail/basedOnUser`)

      .then((response) => {
        const d = response.data.data;
        let uniqueObjArray = [
          ...new Map(
            response.data.data.map((item) => [item["id"], item])
          ).values(),
        ];
        console.log("hello", uniqueObjArray);

        setData(uniqueObjArray.reverse());
      });
  }, []);
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
                <h3>My Bids & Win</h3>
              </div>
              <hr />

              <div className="row">
                <div className="col-12">
                  {data.map((curElem) => {
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
                            <h6>{curElem.name}</h6>
                            <p>
                              You have BID
                              <i className="fa-solid fa-dollar-sign"></i>
                              <span style={{ color: "#fff" }}>
                                {curElem.auctionAmmount}
                              </span>
                            </p>
                          </div>
                          <div className="pl-md-3 d-flex">
                            <div className="mx-2">
                              <button
                                onClick={() => handleShowPayment(curElem.id)}
                                className="gry_btn"
                              >
                                Pay now
                              </button>
                            </div>
                            {/* {curElem.reserve === "Yes" && (
                              <div className="mx-2">
                                <button
                                  onClick={() => handleShow(curElem.id)}
                                  type="button"
                                  className="gry_btn"
                                >
                                  <ChatIcon />
                                </button>
                              </div>
                            )} */}
                            {parseInt(new Date(curElem.EndTime).getTime(), 10) -
                              new Date().getTime() <
                              0 && curElem.reserve === "Yes" ? (
                              <div className="mx-2">
                                <button
                                  onClick={() => handleShow(curElem.id)}
                                  type="button"
                                  className="gry_btn"
                                >
                                  <ChatIcon />
                                </button>
                              </div>
                            ) : null}

                            <Link
                              to={`/detail/${curElem.id}`}
                              className="gry_btn"
                            >
                              <i className="fa-solid fa-eye mr-2"></i> View
                            </Link>
                          </div>
                        </div>
                      </div>
                    );
                  })}
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

      {/* Payment modal */}
      <Modal show={showPayment} onHide={handleClosePayment} className="payTPop">
        <Modal.Header>
          <Modal.Title>Payment Process</Modal.Title>
          <button variant="secondary" onClick={handleClosePayment}>
            X
          </button>
        </Modal.Header>
        <Modal.Body>
          <div className="processPy">
            <h2> Name : user </h2>
            <h3 className="price__">price</h3>
            <h3 className="price__">amount</h3>

            {/* <small className="ticketCount">1 Ticket = $100</small> */}
            <br />
            <p>Select Payment Option:</p>
            <div className="ress">
              <div className="ProcessPymt">
                <ConnectButton></ConnectButton>

                {/* <img src={Paypal} />
              <img src={Stipe} /> */}
              </div>
              <div>
                <StripeCheckout
                  className="Btn"
                  stripeKey="pk_test_m9Dp6uaJcynCkZNTNS1nDR8B00AQg2m6vJ"
                  token={onToken}
                />
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default MyBidsWins;
