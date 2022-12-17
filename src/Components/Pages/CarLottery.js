import React, { useState, Component } from "react";

import ads_car_1 from "../../Assets/images/raffle-1.jpg";
import ads_car_2 from "../../Assets/images/raffle-5.jpg";
import ads_car_3 from "../../Assets/images/raffle-6.jpg";

import ticket from "../../Assets/images/ticket-solid.svg";
import ticketSocket from "../../Assets/images/clipboard-list-solid.svg";
import weekly from "../../Assets/images/calendar-week-solid.svg";

import bnbCoin from "../../Assets/images/raffle-4.jpg";
import { Modal, Placeholder } from "react-bootstrap";
import axios from "axios";
import { useEffect } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useNavigate } from "react-router-dom";
import { RWebShare } from "react-web-share";
import CryptoJS from "crypto-js";

import Carousel from "react-bootstrap/Carousel";
import { useDispatch, useSelector } from "react-redux";
import { showModal } from "../../redux/reducers/login";
import StripeCheckout from "react-stripe-checkout";
import Paymentsuccess from "./Paymentsuccess";
import Video from "../../Assets/images/Introducing_video.mp4";
import carraffle from "../../Assets/images/carraffle-bg.png";

function CarRaffle() {
  const logingUser = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const locallink = "http://localhost:3000/carraffle";
  const serverLink =
    "http://shibnobimotors.s3-website-us-east-1.amazonaws.com/carraffle";
  const handleClose = () => {
    setShow(false);
    window.location.reload(false);
  };
  const handleShow = () => setShow(true);
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  const [modalShow, setModalShow] = useState(false);
  const [inputLotteryNumber, setInputLotteryNumber] = useState("");
  const [showLotary, setShowLotary] = useState({});
  const [allLotaryApi, setAllLotaryApi] = useState([]);
  const [showReadMore, setshowReadMore] = useState(false);
  const [days, setDays] = useState();
  const [hours, setHours] = useState();
  const [coupen, setCoupen] = useState("udshfjhfksh");
  const [minutes, setMinutes] = useState();
  const [seconds, setSeconds] = useState();
  const [newTiem, setNewTiem] = useState(
    new Date("2022-12-17 12:30:00").getTime()
  );
  const now = new Date().getTime();
  const t = newTiem - now + 432000000;
  useEffect(() => {
    const interval = setInterval(() => {
      setDays(Math.floor(t / (1000 * 60 * 60 * 24)));
      setHours(Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
      setMinutes(Math.floor((t % (1000 * 60 * 60)) / (1000 * 60)));
      setSeconds(Math.floor((t % (1000 * 60)) / 1000));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [days, hours, minutes, seconds]);

  const closeMoal = () => {
    setModalShow(false);
  };
  const handleImageHow = (num) => {
    setIndex(num);
    setModalShow(true);
  };
  const handleLogin = () => {
    dispatch(showModal());
  };
  const fetchLotaryApi = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_URL + "getLotteryDetail"
      );
      if (response.data.data.length > 0) {
        setShowLotary(response.data.data[0]);
      } else {
        console.log("Data is empty");
      }
    } catch (err) {
      console.log(err);
    }
  };
  const fetchLotaryApiAll = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_URL + `tickets/${showLotary.id}`
      );
      if (response.data.data) {
        setAllLotaryApi(response.data.data);
      } else {
        console.log("Data is empty");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchLotaryApi();
    const value = { earning: 5, total_reffaral: 15, lottery_id: showLotary.id };
    var ciphertext = CryptoJS.AES.encrypt(
      JSON.stringify(value),
      "my-gas-guzzelers@123"
    ).toString();

    setCoupen(ciphertext.replaceAll("/", "g_s"));
  }, [showLotary.id]);
  useEffect(() => {
    fetchLotaryApiAll();
  }, [showLotary.id, inputLotteryNumber]);

  const addTickets = () => {
    if (inputLotteryNumber <= 0) {
      alert("Pleae add valid number");
      return;
    } else if (!logingUser.login.token) {
      handleLogin();
      return;
    }
    axios
      .post(process.env.REACT_APP_URL + "addTicket", {
        lottery_id: showLotary.id,
        qty: parseInt(inputLotteryNumber, 10),
      })
      .then((res) => {
        handleShow();
      });
    setInputLotteryNumber("");
    fetchLotaryApiAll();
  };

  const onToken = (token, addresses) => {
    console.log(token, addresses);
    alert("pqay success fully");
    if (token !== null) {
      navigate("/successpayment");
    }
  };

  return (
    <div>
      <section className="carLottery d-flex align-items-center">
        <div className="container-fluid">
          <div className="heroText">
            <video autoplay loop controls id="myVideo" poster={carraffle}>
              <source src={Video} type="video/mp4" />
            </video>
          </div>
        </div>
      </section>

      <section className="ptb_80 pt_sm_50">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-8 col-lg-8">
              <div className="orangeCard mb-4">
                <div className="row">
                  <div className="col-12 col-md-5">
                    <div
                      id="adsSlide"
                      className="carousel slide"
                      data-ride="carousel"
                    >
                      <ul className="carousel-indicators">
                        <li
                          data-target="#adsSlide"
                          data-slide-to="0"
                          className="active"
                        ></li>
                        <li data-target="#adsSlide" data-slide-to="1"></li>
                        <li data-target="#adsSlide" data-slide-to="2"></li>
                      </ul>

                      <div className="carousel-inner">
                        <div
                          onClick={() => handleImageHow(0)}
                          className="carousel-item active"
                          style={{ cursor: "pointer" }}
                        >
                          <img src={ads_car_2} alt="ads car" />
                        </div>
                        <div
                          onClick={() => handleImageHow(1)}
                          className="carousel-item"
                          style={{ cursor: "pointer" }}
                        >
                          <img src={ads_car_1} alt="ads car" />
                        </div>
                        <div
                          onClick={() => handleImageHow(2)}
                          className="carousel-item"
                          style={{ cursor: "pointer" }}
                        >
                          <img src={ads_car_3} alt="ads car" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-md-7">
                    <div className="" key={showLotary.id}>
                      {/* <h5 className="m-0">Lottery Prize</h5> */}
                      {/* <div className="lotteryPriceNumber">
                        <div className="price_normal">${showLotary.price}</div>
                      </div>
                      <div className="mb-3">
                        <i className="fa-solid fa-circle-info"></i> Lottery
                        Breakdown
                      </div> */}

                      <div className="counterCol">
                        <h5 style={{ textAlign: "center" }}>
                          Countdown to the next draw
                        </h5>
                        {t > 0 ? (
                          <div className="clockTimer" id="clockdiv">
                            <div className="timerBg">
                              <span className="days" id="day">
                                0{days}
                              </span>
                              <div className="smalltext">Days</div>
                            </div>
                            <div className="timerBg">
                              <span className="hours" id="hour">
                                {hours < 10 ? 0 : ""}
                                {hours}
                              </span>
                              <div className="smalltext">Hours</div>
                            </div>
                            <div className="timerBg">
                              <span className="minutes" id="minute">
                                {minutes < 10 ? 0 : ""}
                                {minutes}
                              </span>
                              <div className="smalltext">Minutes</div>
                            </div>
                            <div className="timerBg">
                              <span className="seconds" id="second">
                                {seconds < 10 ? 0 : ""}
                                {seconds}
                              </span>
                              <div className="smalltext">Seconds</div>
                            </div>
                          </div>
                        ) : (
                          <div className="clockTimer text-dark" id="clockdiv">
                            Time up
                          </div>
                        )}

                        {showLotary.description ? (
                          <p className="py-4">
                            {showLotary.description && !showReadMore
                              ? showLotary.description.substr(0, 100)
                              : showLotary.description}
                            <p
                              type="text"
                              onClick={() => setshowReadMore(!showReadMore)}
                              className="rMore mt-3"
                            >
                              {showReadMore ? "Read Less" : "Read More"}
                            </p>
                          </p>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card_Gray2 mb-4">
                <div className="row row_gap_5 ">
                  <div className="col-md-3 iconSecT">
                    <div className="imgIco">
                      <img src={ticket} />
                    </div>
                    <h5>Price of 1 ticket</h5>
                    <p>$5</p>
                  </div>
                  <div className="col-md-3 iconSecT">
                    <div className="imgIco">
                      <img src={ticketSocket} />
                    </div>
                    <h5>Total ticket stock</h5>
                    <p>100</p>
                  </div>
                  <div className="col-md-3 iconSecT">
                    <div className="imgIco">
                      <img src={weekly} />
                    </div>
                    <h5>Deadline to purchase ticket</h5>
                    <p>02-01-2023</p>
                  </div>
                  <div className="col-md-3 iconSecT">
                    <div className="imgIco">
                      <img src={weekly} />
                    </div>
                    <h5>Lucky draw date</h5>
                    <p>02-01-2023</p>
                  </div>
                </div>
              </div>

              <div className="card_Gray2">
                <div className="row row_gap_5">
                  {/* <div className="col-12 mb-3">
                    <h5>
                      <img src={bnb_coin} className="mr-2" /> Enter Car Lottery
                    </h5>
                  </div> */}
                  <div className="col-lg-12 col-md-12 col-sm-12">
                    <lable>Number of Tickets</lable>
                    <div className="ticketFom">
                      <div className="form-group">
                        <input
                          type="text"
                          value={inputLotteryNumber}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, "");
                            setInputLotteryNumber(value);
                            Placeholder = "Number of Tickets ";
                          }}
                          className="form-control"
                          maxLength={4}
                          id="validationCustom01"
                        />
                      </div>
                      <div className="form-group lotryBtn">
                        <button
                          type="button"
                          className="btn"
                          onClick={addTickets}
                        >
                          Make Payment
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-4 col-lg-4 ">
              <div className="card_Gray2 mt-5 mt-md-0 divSticky">
                <div className="">
                  <div className="cardBorder">
                    <h6>My Tickets - {allLotaryApi.length}</h6>

                    <div className="myTicketRow">
                      <div className="myTicketCol">
                        {/* <div className="MT_ic">
                          <img src={bi_ticket} />
                        </div> */}
                        <div className="MT_Count">10</div>
                        <div className="MT_Price">
                          Total Amount $ &nbsp;
                          {showLotary.price &&
                            showLotary.price * allLotaryApi.length}
                        </div>
                      </div>
                      {/* <div className="">1 Ticket = $ {showLotary.price}</div> */}
                    </div>
                  </div>
                  {/* 
                  <h6>My Winnings</h6>
                  <div className="myTicketCol">
                    <div className="MT_ic">
                      <img src={bnbCoin.png} />
                    </div>
                    <div className="MT_Count">1000</div>
                    <div className="MT_Price">$325,000</div>
                  </div>
                  <button type="button" className="gry_btn mt-2">
                    Claim
                  </button> */}

                  <hr />

                  <div className="cardBorder">
                    <h5>Reffer Friend</h5>
                    <ul className="refferFriendList mt-3">
                      <li>
                        <div className="RF_title">Total Refferals</div>
                        <div className="">5</div>
                      </li>
                      <li>
                        <div className="">Total Earnings</div>
                        <div className="">12</div>
                      </li>
                    </ul>
                    <div>
                      <button
                        type="button"
                        onClick={() => {
                          axios
                            .get(`http://3.83.96.16:8000/encrypted/1/20`)
                            .then((res) => {
                              // url/response
                            });
                        }}
                        className="gry_btn w-full"
                      >
                        Share Reffer Link
                      </button>
                    </div>

                    {/* <button type="button" className="gry_btn w-full">
                      Copy Reffer al Link
                    </button> */}
                    <p className="small mt-2">
                      <i className="fa-solid fa-circle-info"></i> 3% of their
                      purchased amount will go back to you
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Modal
        show={modalShow}
        onHide={closeMoal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <Modal.Title id="contained-modal-title-vcenter">Image</Modal.Title>
          <div onClick={closeMoal} style={{ cursor: "pointer" }}>
            X
          </div>
        </Modal.Header>
        <Modal.Body>
          {/* <img
            src={showImage}
            alt=""
            style={{ maxHeight: "67vh", width: "100%" }}
          /> */}
          <Carousel activeIndex={index} onSelect={handleSelect}>
            <Carousel.Item>
              <img
                className="d-block w-100 img-fluid"
                src={ads_car_1}
                alt="First slide"
              />
              <Carousel.Caption></Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100 img-fluid"
                src={ads_car_2}
                alt="Second slide"
              />

              <Carousel.Caption></Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100 img-fluid"
                src={ads_car_3}
                alt="Third slide"
              />

              <Carousel.Caption></Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
      <Modal show={show} onHide={handleClose} className="payTPop">
        <Modal.Header closebutton>
          <Modal.Title>Payment Process</Modal.Title>
          <button variant="secondary" onClick={handleClose}>
            X
          </button>
        </Modal.Header>
        <Modal.Body>
          <div className="processPy">
            <h2>Model Name : 2021 BMW Nexon</h2>
            <h3 className="price__">Price : $2000</h3>

            {/* <small className="ticketCount">1 Ticket = $100</small> */}
            <br />
            <p>Choose Payment Option:</p>
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
    </div>
  );
}

export default CarRaffle;
