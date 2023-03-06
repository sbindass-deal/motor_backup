import React, { useState } from "react";
import ads_car_1 from "../../Assets/images/raffle-1.jpg";
import ads_car_2 from "../../Assets/images/raffle-5.jpg";
import ads_car_3 from "../../Assets/images/raffle-6.jpg";
import bnbCoin from "../../Assets/images/raffle-4.jpg";
import { Modal } from "react-bootstrap";
import axios from "axios";
import { useEffect } from "react";

import { RWebShare } from "react-web-share";

import Carousel from "react-bootstrap/Carousel";
import { useDispatch, useSelector } from "react-redux";
import { showModal } from "../../redux/reducers/login";

function CarRaffle() {
  const dispatch = useDispatch();
  const [index, setIndex] = useState(0);
  const userId = useSelector((state) => state);
  const logingUser = useSelector((state) => state.login);

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
    new Date("2022-12-05 12:30:00").getTime()
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
        process.env.REACT_APP_URL +
          `tickets/${showLotary.id}/user/${userId.login.user.id}`
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
    setCoupen(`userId-${userId.login.user.id}-ticket-${showLotary.id}`);
  }, [showLotary.id]);
  useEffect(() => {
    fetchLotaryApiAll();
  }, [showLotary.id, inputLotteryNumber]);

  const addTickets = () => {
    axios
      .post(process.env.REACT_APP_URL + "addTicket", {
        name: userId.login.user.username,
        lottery_id: showLotary.id,
        userId: userId.login.user.id,
        qty: parseInt(inputLotteryNumber, 10),
      })
      .then((err) => {
        console.log(err);
      });
    setInputLotteryNumber("");
    fetchLotaryApiAll();
  };

  return (
    <div>
      <section className="ptb_80 pt_sm_50">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-8 col-lg-8">
              <div className="orangeCard mb-4">
                <div className="row">
                  <div className="col-12 col-md-7">
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
                          <img src={ads_car_1} alt="ads car" />
                        </div>
                        <div
                          onClick={() => handleImageHow(1)}
                          className="carousel-item"
                          style={{ cursor: "pointer" }}
                        >
                          <img src={ads_car_2} alt="ads car" />
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
                  <div className="col-12 col-md-5">
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
                        <h5>Countdown to the next draw</h5>
                        <div id="clockdiv">
                          <div>
                            <span className="days" id="day">
                              0{days}
                            </span>
                            <div className="smalltext">Days</div>
                          </div>
                          <div>
                            <span className="hours" id="hour">
                              {hours < 10 ? 0 : ""}
                              {hours}
                            </span>
                            <div className="smalltext">Hours</div>
                          </div>
                          <div>
                            <span className="minutes" id="minute">
                              {minutes < 10 ? 0 : ""}
                              {minutes}
                            </span>
                            <div className="smalltext">Minutes</div>
                          </div>
                          <div>
                            <span className="seconds" id="second">
                              {seconds < 10 ? 0 : ""}
                              {seconds}
                            </span>
                            <div className="smalltext">Seconds</div>
                          </div>
                        </div>
                        {showLotary.description ? (
                          <p className="py-4">
                            {showLotary.description && !showReadMore
                              ? showLotary.description.substr(0, 100)
                              : showLotary.description}
                            <button
                              type="button"
                              onClick={() => setshowReadMore(!showReadMore)}
                              className="btn readMoreBtn mt-3"
                            >
                              {showReadMore ? "Read Less" : "Read More"}
                            </button>
                          </p>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
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
                  <div className="col-12 col-md-12">
                    <div className="form-group">
                      <label>Number Of Tickets</label>
                      <input
                        type="text"
                        value={inputLotteryNumber}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, "");
                          setInputLotteryNumber(value);
                        }}
                        className="form-control"
                        maxLength={4}
                        id="validationCustom01"
                      />
                    </div>
                  </div>
                  <div className="col-12 col-md-12">
                    <div className="form-group">
                      <button
                        type="button"
                        onClick={logingUser.login ? addTickets : handleLogin}
                        className="btn w-full"
                      >
                        Enter Lottery
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-4 col-lg-4">
              <div className="card_Gray2 mt-5 mt-md-0">
                <div className="">
                  <div className="cardBorder">
                    <h6>My Tickets - {allLotaryApi.length}</h6>
                    <div className="myTicketRow">
                      <div className="myTicketCol">
                        {/* <div className="MT_ic">
                          <img src={bi_ticket} />
                        </div> */}
                        {/* <div className="MT_Count">10</div> */}
                        <div className="MT_Price">
                          $
                          {showLotary.price &&
                            showLotary.price * allLotaryApi.length}
                        </div>
                      </div>
                      {/* <div className="">1 Ticket = $ {showLotary.price}</div> */}
                    </div>
                  </div>

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
                  </button>

                  <hr />

                  <div className="cardBorder">
                    <h5>Reffer Friend</h5>
                    <ul className="refferFriendList mt-3">
                      <li>
                        <div className="RF_title">Total Refferals</div>
                        <div className="">5</div>
                      </li>
                      <li>
                        <div className="">Total Earnings ($)</div>
                        <div className="">12</div>
                      </li>
                    </ul>
                    <div>
                      <RWebShare
                        data={{
                          text: "Gas guzzlrs Share Reffer Link",
                          url: `http://localhost:3000/carraffle/${coupen}`,
                          title: "Gas guzzlrs",
                        }}
                        // onClick={() => console.log("shared successfully!")}
                      >
                        {/* <button>Share on Web</button> */}
                        <button type="button" className="gry_btn w-full">
                          Share Reffer Link
                        </button>
                      </RWebShare>
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
    </div>
  );
}

export default CarRaffle;
