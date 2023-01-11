import React, { useState, Component } from "react";

import ads_car_1 from "../../Assets/images/raffle-1.jpg";
import ads_car_2 from "../../Assets/images/raffle-5.jpg";
import ads_car_3 from "../../Assets/images/raffle-6.jpg";

import ticket from "../../Assets/images/ticket-solid.svg";
import ticketSocket from "../../Assets/images/doller-bundal.png";
import weekly from "../../Assets/images/calander.png";
import reword from "../../Assets/images/reword.png";

import bnbCoin from "../../Assets/images/raffle-4.jpg";
import { Modal, Placeholder } from "react-bootstrap";
import axios from "axios";
import { useEffect } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useNavigate } from "react-router-dom";
import { RWebShare } from "react-web-share";
import CryptoJS from "crypto-js";
import { useParams } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import { useDispatch, useSelector } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import Paymentsuccess from "./Paymentsuccess";
import Video from "../../Assets/images/Introducing_video.mp4";
import carraffle from "../../Assets/images/carraffle-bg.png";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "react-toastify";
import LoginModal from "../Popups/LoginModal";
import { showModalLogin } from "../../redux/reducers/login";
import NotAvailable from "../UI/NotAvailable";

function CarRaffle() {
  const { id } = useParams();
  const logingUser = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [encryptedvalue, setEncryptedValue] = useState(null);
  const [show, setShow] = useState(false);
  const [copied, setCopied] = useState(false);
  const [newEncryptedvalue, setNewEncryptedValue] = useState(null);
  const [setUserLotteryDetails, setSetUserLotteryDetails] = useState({});
  const [totalRaffrel, setTotalRaffrel] = useState(0);
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lotteryImage, setLotteryImage] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [inputLotteryNumber, setInputLotteryNumber] = useState("");
  const [showLotary, setShowLotary] = useState({});
  const [showReadMore, setshowReadMore] = useState(false);
  const [validUser, setValidUser] = useState(null);
  const [days, setDays] = useState();
  const [hours, setHours] = useState();
  const [coupen, setCoupen] = useState("udshfjhfksh");
  const [minutes, setMinutes] = useState();
  const [seconds, setSeconds] = useState();
  const [newTiem, setNewTiem] = useState(
    new Date("2023-01-07 12:30:00").getTime()
  );
  const now = new Date().getTime();
  const t = newTiem - now;
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

  const closeMoal = () => {
    setModalShow(false);
  };
  const handleImageHow = (num) => {
    setIndex(num);
    setModalShow(true);
  };
  const handleLogin = () => {
    dispatch(showModalLogin());
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const fetchLotaryApi = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_URL + "getLotteryDetailActive"
      );
      if (response.data.data.length > 0) {
        setShowLotary(response.data.data[0]);
      } else {
        console.log("Data is empty");
      }
      setNewTiem(new Date(response.data.data[0].dealEndDate).getTime());
    } catch (err) {
      console.log(err);
    }
  };
  const fetchLotaryApiAll = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_URL + `tickets/${showLotary.id}`
      );
      console.log(11, response.data);
      setSetUserLotteryDetails(response.data);
      setTotalRaffrel(response.data.totalrefer.length);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setNewEncryptedValue(window.location.pathname.replace("/carraffle/", ""));
    validateUser(newEncryptedvalue);
  }, [newEncryptedvalue]);

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

  const addTickets = (e) => {
    e.preventDefault();
    if (inputLotteryNumber <= 0) {
      return;
    } else if (!logingUser.login.token) {
      handleLogin();
      return;
    }
    handleShow();
    // axios
    //   .post(process.env.REACT_APP_URL + "addTicket", {
    //     lottery_id: showLotary.id,
    //     qty: parseInt(inputLotteryNumber, 10),
    //     enc: newEncryptedvalue,
    //   })
    //   .then((res) => {
    //     handleShow();
    //   });
    // setInputLotteryNumber("");
    // fetchLotaryApiAll();
  };

  const onToken = (token, addresses) => {
    console.log(token, addresses);
    if (token !== null) {
      navigate("/successpayment");
      // addTickets();
      axios
        .post(process.env.REACT_APP_URL + "addTicket", {
          lottery_id: showLotary.id,
          qty: parseInt(inputLotteryNumber, 10),
          enc: newEncryptedvalue,
        })
        .then((res) => {
          handleShow();
        });
      setInputLotteryNumber("");
      fetchLotaryApiAll();
    }
  };
  const validateUser = (newEncryptedvalue) => {
    axios
      .post(process.env.REACT_APP_URL + "validuser", {
        enc: newEncryptedvalue,
      })
      .then((res) => {
        // console.log(11, res.data.message);
        setValidUser(res.data.message);
      });
  };

  useEffect(() => {
    validateUser();
  }, []);

  const fetchImage = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_URL}/getAlllottery-image/16`
      );
      setLotteryImage(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchImage();
  }, []);

  return (
    <div>
      <section className="carLottery d-flex align-items-center">
        <div className="container-fluid">
          <div className="heroText">
            <video autoPlay muted id="myVideo" poster={carraffle} controls>
              <source src={Video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </section>

      <section className="ptb_80 pt_sm_50">
        <div className="container ml-0">
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

                      {/* <div className="carousel-inner">
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
                          <img src={ads_car_3} alt="ads car" />
                        </div>
                        <div
                          onClick={() => handleImageHow(2)}
                          className="carousel-item"
                          style={{ cursor: "pointer" }}
                        >
                          <img src={ads_car_1} alt="ads car" />
                        </div>
                      </div> */}
                      <Carousel
                        nextLabel=""
                        prevLabel=""
                        activeIndex={index}
                        onSelect={handleSelect}
                      >
                        {/* {lotteryImage.map((curElem) => {
                          return ( */}
                            <Carousel.Item
                              onClick={() => handleImageHow(0)}
                              className="carousel-item"
                              style={{ cursor: "pointer" }}
                              // key={curElem.id}
                            >
                              <img
                                className="d-block w-100 img-fluid"
                                // src={`${process.env.REACT_APP_URL}${curElem.imagePath}/${curElem.imageName}`}
                                src={ads_car_2}
                                alt="First slide"
                              />
                              <Carousel.Caption></Carousel.Caption>
                            </Carousel.Item>
                          {/* );
                        })} */}
                      </Carousel>
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
                    <h5>
                      Price at
                      <br /> just
                    </h5>
                    <p>${showLotary.price}</p>
                  </div>
                  <div className="col-md-3 iconSecT">
                    <div className="imgIco">
                      <img src={ticketSocket} />
                    </div>
                    <h5>
                      Total
                      <br /> available
                    </h5>
                    <p>{showLotary.stock}</p>
                  </div>
                  <div className="col-md-3 iconSecT">
                    <div className="imgIco">
                      <img src={weekly} />
                    </div>
                    <h5>
                      Last date to <br />
                      purchase ticket
                    </h5>
                    <p>
                      {showLotary.dealEndDate &&
                        new Date(showLotary.dealEndDate).toDateString()}
                    </p>
                  </div>
                  <div className="col-md-3 iconSecT">
                    <div className="imgIco">
                      <img src={reword} />
                    </div>
                    <h5>
                      Winner to be
                      <br /> announced on{" "}
                    </h5>
                    <p>
                      {showLotary.drawdate &&
                        new Date(showLotary.drawdate).toDateString()}
                    </p>
                  </div>
                </div>
              </div>

              {validUser !== "Same user cannot use refer link!" && (
                <div className="card_Gray2">
                  <div className="row row_gap_5 ssss">
                    {/* <div className="col-12 mb-3">
                    <h5>
                      <img src={bnb_coin} className="mr-2" /> Enter Car Lottery
                    </h5>
                  </div> */}
                    <div className="col-lg-12 col-md-12 col-sm-12">
                      <lable>Number of Tickets</lable>

                      <form onSubmit={addTickets} className="ticketFom">
                        <div className="form-group">
                          {/* <input
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
                        /> */}
                          <select
                            value={inputLotteryNumber}
                            onChange={(e) =>
                              setInputLotteryNumber(e.target.value)
                            }
                            class="form-select w-100"
                            id="validationCustom04"
                            required
                          >
                            <option selected disabled value="">
                              Choose...
                            </option>
                            <option value="100">100</option>
                            <option value="200">200</option>
                            <option value="300">300</option>
                            <option value="400">400</option>
                          </select>
                        </div>
                        <div className="form-group lotryBtn">
                          <button type="submit" className="btn">
                            Make Payment
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="col-12 col-md-4 col-lg-4 ">
              <div className="card_Gray2 mt-5 mt-md-0 divSticky">
                <div className="">
                  <div className="cardBorder">
                    <h6>My Tickets</h6>
                    <div className="myTicketRow">
                      <div
                        className="myTicketCol"
                        style={{ display: "flex", flexDirection: "column" }}
                      >
                        {/* <div className="MT_ic">
                          <img src={bi_ticket} />
                        </div> */}
                        {/* <div className="MT_Count">10</div> */}
                        <div className="MT_Price">
                          Number of Tickets-
                          {/* {allLotaryApi.length} */}
                          {setUserLotteryDetails.data}
                        </div>
                        <div className="MT_Price">
                          Total Amount-$
                          {showLotary.price &&
                            setUserLotteryDetails.data &&
                            showLotary.price * setUserLotteryDetails.data}
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
                    <h5>Refer Friend</h5>
                    <ul className="refferFriendList mt-3">
                      <li>
                        <div className="RF_title">Total Referals</div>
                        <div className="">{totalRaffrel}</div>
                      </li>
                      <li>
                        <div className="">Total Earnings</div>
                        <div className="">{setUserLotteryDetails.rewards}</div>
                      </li>
                    </ul>
                    <div>
                      <button
                        type="button"
                        onClick={() => {
                          if (!logingUser.login.token) {
                            handleLogin();
                            return;
                          } else {
                            axios
                              .get(
                                `${process.env.REACT_APP_URL}encrypted/${showLotary.id}/20`
                              )
                              .then((res) => {
                                setIsModalOpen(true);
                                setEncryptedValue(res);
                              });
                          }
                        }}
                        className="gry_btn w-full"
                      >
                        Share Refer Link
                      </button>
                    </div>

                    {/* <button type="button" className="gry_btn w-full">
                      Copy Reffer al Link
                    </button> */}
                    <p className="small mt-2">
                      <i className="fa-solid fa-circle-info"></i> 3% of their
                      purchased ticket will be shared with you
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Modal
        title="Basic Modal"
        show={isModalOpen}
        onOk={handleOk}
        onHide={handleCancel}
      >
        <div style={{ padding: 12 }}>
          {encryptedvalue != null ? (
            <>
              <p
                onCopy={false}
                className="unselectable"
              >{`http://shibnobimotors.s3-website-us-east-1.amazonaws.com/carraffle/${encryptedvalue.data}`}</p>
              <CopyToClipboard
                text={`http://shibnobimotors.s3-website-us-east-1.amazonaws.com/carraffle/${encryptedvalue.data}`}
                onCopy={() => setCopied(true)}
              >
                <button
                  onClick={() => {
                    notify("Copied successfully!");
                    setIsModalOpen(false);
                  }}
                  className="gry_btn w-full"
                >
                  Copy to clipboard with button
                </button>
              </CopyToClipboard>
            </>
          ) : (
            "null"
          )}
        </div>
      </Modal>
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
            {lotteryImage.map((curElem) => {
              return (
                <Carousel.Item>
                  <img
                    className="d-block w-100 img-fluid"
                    src={`${process.env.REACT_APP_URL}${curElem.imagePath}/${curElem.imageName}`}
                    alt="First slide"
                  />
                </Carousel.Item>
              );
            })}
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
            <h2>Lottery Name : {showLotary.name}</h2>
            <h3 className="price__">
              Price : ${" "}
              {showLotary.price && showLotary.price * inputLotteryNumber}
            </h3>

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
