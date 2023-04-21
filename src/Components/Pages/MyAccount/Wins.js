import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import car_01 from "../../../Assets/images/car_01.jpg";
import MyAccountLeftNav from "./MyAccountLeftNav";
import ChatIcon from "@mui/icons-material/Chat";
import { Modal } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import StripeCheckout from "react-stripe-checkout";
import winner from "../../../Assets/images/winnerTitle.png";

function Wins() {
  const location = useLocation();
  const [data, setData] = useState([]);
  const userId = useSelector((state) => state);
  const [chatMessage, setChatMessage] = useState("");
  const [chateApiData, setChateApiData] = useState([]);
  const [show, setShow] = useState(false);
  const [vehicleId, setVehicleId] = useState();
  const [showPayment, setShowPayment] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({});
  const [userInfo, setUserinfo] = useState({});
  useEffect(() => {
    axios.get(process.env.REACT_APP_URL + `user`).then((res) => {
      if (res.data.data) {
        setUserinfo(res.data.data);
      } else {
        setUserinfo(userInfo);
      }
    });
  }, []);

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
  const handleShowPayment = (data, amount, bid_id) => {
    axios
      .post(`${process.env.REACT_APP_URL}make_bid_payment_remaning`, {
        bid_id: bid_id,
        amount: amount,
      })
      .then(function (response) {
        if (response.data.status === 200) {
          fetchBidingDetails();
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    // setShowPayment(true);
    // setVehicleId(data);
    // setPaymentDetails({ data: data, amount: amount, bid_id });
  };
  const fetchBidingDetails = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_URL}getAllWinnerByUser`
      );
      const d = res.data.data;
      let uniqueObjArray = [
        ...new Map(res.data.data.map((item) => [item["id"], item])).values(),
      ];
      setData(uniqueObjArray.reverse());
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchBidingDetails();
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

  const onToken = (token, addresses) => {
    if (token !== null) {
      axios
        .post(`${process.env.REACT_APP_URL}make_bid_payment_remaning`, {
          type: "bid",
          itemid: paymentDetails.bid_id,
          amount: paymentDetails.amount,
        })
        .then(function (response) {
          if (response.data.status === 200) {
            fetchBidingDetails();
          }
        })
        .catch(function (error) {
          console.log(error);
        });
      // notify("Form submit successfully!");
      setShowPayment(false);
    }
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
                <h3>Auctions / {location.pathname === "/wins" && "Won"}</h3>
              </div>
              <hr />
              <div className="row LBW">
                <Link
                  to="/listing"
                  className={` ${
                    location.pathname === "/listing" ? "active" : ""
                  } nav-link`}
                >
                  Listing
                </Link>
                <Link
                  to="/bids"
                  className={` ${
                    location.pathname === "/bids" ? "active" : ""
                  } nav-link`}
                >
                  Bids
                </Link>
                <Link
                  to="/wins"
                  className={` ${
                    location.pathname === "/wins" ? "active" : ""
                  } nav-link`}
                >
                  Won
                </Link>
              </div>
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
                                curElem?.img_logo && curElem?.img_logo[0]
                                  ? `${process.env.REACT_APP_URL}/${curElem?.img_logo[0]?.imagePath}/${curElem?.img_logo[0]?.imageName}`
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
                              <h6>{curElem?.name}</h6>
                              <p>
                                Your BID :&nbsp;
                                <span style={{ color: "#fff" }}>
                                  ${curElem?.auctionAmmount} USD
                                </span>
                              </p>
                              <p>
                                Paid : $
                                {curElem?.payment_received == 4
                                  ? curElem?.auctionAmmount
                                  : curElem?.initial_amount}{" "}
                                USD{" "}
                              </p>
                              {curElem?.payment_received != 4 && (
                                <p>
                                  Payable Now : ${curElem?.balance_amount} USD
                                </p>
                              )}

                              {/* {curElem?.payment_received == 0 ? (
                                <>
                                  <p>
                                    To complete a bid please pay 5% of Auction
                                    amount.
                                  </p>
                                  <p>
                                    Payable Now : $
                                    {(parseInt(curElem?.auctionAmmount, 10) *
                                      5) /
                                      100}{" "}
                                    USD
                                  </p>
                                </>
                              ) : (
                                <p>Paid : ${curElem?.initial_amount} USD</p>
                              )} */}
                            </div>
                            <div className="pl-md-3 d-flex">
                              <div className="mx-2">
                                {curElem?.payment_received != 4 && (
                                  <button
                                    onClick={() =>
                                      handleShowPayment(
                                        curElem.id,
                                        curElem.balance_amount,
                                        curElem.bid_id
                                      )
                                    }
                                    className="gry_btn"
                                  >
                                    Pay now
                                  </button>
                                )}
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
                              {parseInt(
                                new Date(curElem?.EndTime).getTime(),
                                10
                              ) -
                                new Date().getTime() <
                                0 && curElem?.reserve === "Yes" ? (
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
                                to={`/detail/${curElem?.id}`}
                                className="gry_btn"
                              >
                                <i className="fa-solid fa-eye mr-2"></i> View
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
                      <h3>You did not win any vehicle</h3>
                      {/* Win Page Section */}
                      {/* <div class="col-md-6 ">
                        <div class="card_Gray2 winnerCard">
                          <div class="winnerTitle_img zoom-in-zoom-out">
                            <img src={winner} />
                          </div>
                          <div class="winnerCol">
                            <div class="winnerTitle">
                              <h3>Congratulations!</h3>
                              <p>
                                Leverage agile frameworks to provide a robust
                                synopsis for high level overviews.
                              </p>
                            </div>
                            <div class="winnerInfo_ pb-3">
                              <div class="winnerImg_"></div>
                              <h6>Nikhil Patil</h6>
                            </div>
                          </div>
                        </div>
                      </div> */}
                      {/* Win Page Section End*/}
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
                    {curElem?.message}
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
            <h2> Name : {userInfo.name} </h2>
            <h3 className="price__">
              Total bid amount : ${paymentDetails?.amount} USD
            </h3>
            <br />
            <small className="ticketCount">
              To complete a bid please pay 5% of Auction amount.
            </small>
            <h3 className="price__">
              Payable Now : ${parseInt(paymentDetails?.amount * 5, 10) / 100}{" "}
              USD
            </h3>
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
                  stripeKey={process.env.REACT_APP_STRIP_PUBLIC_KEY}
                  token={onToken}
                  email={userId.login.user.email}
                  name="GasGuzzlrs Bidding"
                  currency="USD"
                  amount={
                    (parseInt(paymentDetails?.amount * 5, 10) / 100) * 100
                  }
                />
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Wins;
