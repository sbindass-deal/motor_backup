import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment/moment";
import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import FormInput from "../../../UI/FormInput";
import Msg from "../../../../Assets/images/msg.svg";
import EyeIcon from "../../../../Assets/images/eyeIcon.svg";
import ScreenShort from "../../../../Assets/images/screenShort.png";
import carImg from "../../../../Assets/images/carImg.png";
import Comment from "./Comment";
import Gallery from "./Gallery";
import LatestGuzzlrsAuction from "./LatestGuzzlrsAuction";
import Interior from "./Interior";
import External from "./External";
import Fundamental from "./Fundamental";

import { toast } from "react-toastify";

import { Button, notification } from "antd";

function Detail() {
  const { id } = useParams();
  const logingUser = useSelector((state) => state);
  const vehicleDatas = logingUser.vehicleReducer.vehicleData;
  const [vinDetails, setVinDetails] = useState({});
  const [vehicle, setVehicle] = useState({});
  const [showReadMore, setShowReadMore] = useState();
  const [comments, setcomments] = useState([]);
  const [biding, setBiding] = useState([]);
  const [show, setShow] = useState(false);
  //setInputComment
  const [inputcomment, setInputComment] = useState("");
  const [bidValue, setBidValue] = useState();
  const [bidComment, setBidComment] = useState();
  const [auctionHistory, setAuctionHistory] = useState([]);
  const [userInfo, setUserinfo] = useState({});
  // countdown time start
  const [showAuctionHistory, setShowAuctionHistory] = useState(false);
  const [days, setDays] = useState();
  const [hours, setHours] = useState();
  const [minutes, setMinutes] = useState();
  const [seconds, setSeconds] = useState();
  const [newTiem, setNewTiem] = useState(
    new Date("2023-03-07, 19:53:00").getTime()
  );

  const [latestBidData, setLatestBidData] = useState(null)
  const [bidCount, setBidCount] = useState(null)
  const [endTimedata, setEndTimedata] = useState(null)

  // new Date("2022-11-30 14:57:00").getTime()
  const now = new Date().getTime();
  const t = parseInt(newTiem - now, 10);
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
  }, [days, hours, minutes, seconds, newTiem]);

  // countdown time end
  useEffect(() => {
    axios.get(process.env.REACT_APP_URL + `user`).then((res) => {
      if (res.data.data) {
        setUserinfo(res.data.data);
      } else {
        setUserinfo(userInfo);
      }
    });
  }, []);

  const handleCloseAuctionHistory = () => {
    setShowAuctionHistory(false);
  };
  const handleShowAuctionHistory = () => {
    setShowAuctionHistory(true);
  };

  const handleBidInput = (e) => {
    setBidValue(e.target.value, 10);
  };
  const handleClose = () => {
    setShow(false);
  };

  // let d = new Date();
  // // parseInt(d.setMinutes(d.getMinutes() + 5).toLocaleString(), 10);
  // d.setMinutes(d.getMinutes() + 5);
  // console.log("addEnd Time", d.toLocaleString());
  const fetchEndTime = () => {
    let d = new Date();
    d.setMinutes(d.getMinutes() + 5);

    axios
      .post(process.env.REACT_APP_URL + "changeEndTime", {
        EndTime: d.toLocaleString(),
        id: vehicle.id,
      })
      .then((res) => {
        handleClose();
      });
  };

  
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

  const addBiding = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_URL}biddings`, {
        // auctionId: id,
        // auctionAmmount: bidValue,
        // vehicle_id: id,
        // comment: bidComment,

        vehicle_id: id,
        auctionAmmount: bidValue,
        comment: bidComment,
      })
      .then((res) => {
        // if (res.data.status === 200 && t < 1000 * 60 * 5) {
        //   fetchEndTime();
        // } else {
        //   handleClose();
        // }
        if (res.data.status === 200) {
          console.log(109, res);

          handleClose();
          notify(res.data.message);
          setBidComment("");
          setBidValue("");
        }
      })
      .catch((err) => console.log(err));
  };

  

  const getfetchData = () => {
    axios
      .get(`https://api.gasguzzlrs.com/bidding/${id}`)
      .then((response) => {
        console.log(109, response);

      setLatestBidData(response.data.last_bid)
      setBidCount((response.data.data).length)
      setEndTimedata(response.data.end_time)

    }).catch((err) => {
      console.log(err)
    })
  }

  useEffect(() => {
    getfetchData();
  }, [bidValue, bidComment]);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_URL}/vehicle_detail/${id}`
        );
        if (res.data.status === 200) {
          setVehicle(res.data.data);
          // setNewTiem(parseInt(new Date(res.data.data.EndTime).getTime(), 10));

          // console.log("t", new Date(res.data.data[0].EndTime).getTime());
          // console.log("end", new Date(res.data.data[0].EndTime));
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchApi();
  }, [vehicleDatas, id]);

  // get vin details by api
  useEffect(() => {
    const fetchVinDetails = async () => {
      try {
        const res = await axios.get(
          `https://api.gasguzzlrs.com/test_vin/${"ZPBUA1ZL9KLA00848"}`
        );
        setVinDetails(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchVinDetails();
  }, []);

  // Auction history
  const handleAuctionHistory = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_URL}getAuctionHistory/${vehicle.userId}`
      );
      setAuctionHistory(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Subscribe api
  const handleSubscribe = async () => {
    axios
      .post(`${process.env.REACT_APP_URL}subscriber`, {
        userId: userInfo.id,
        subscribeTo: vehicle.userId,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
      <section className="ptb_80 pt_sm_50 ">
        <div className="container" id="sticky">
          <div className="row">
            <div className="col-lg-3 col-sm-12">
              <Fundamental
                vehicle={vehicle}
                handleSubscribe={handleSubscribe}
              />
              <Interior vinDetails={vinDetails} />
              <External vinDetails={vinDetails} />
              <div className="box_backgroundD mt-15 justifyCenter">
                <button className="btn">Contact Seller</button>
              </div>
              <LatestGuzzlrsAuction />
            </div>
            <div className="col-lg-9 col-sm-12">
              <div className=" text-center box_background p-20" id="sticky">
                <div className="detailPostOption">
                  <h2 className="title_combo title_Center" id="sticky2">
                    {vehicle.make} {vehicle.model} {vehicle.year}
                  </h2>
                  <div className="titleRight">
                    <ul className="labelList">
                      <li>
                        <label>Current bid:</label>{" "}
                        <span>${vehicle.documentFee}</span>
                      </li>
                      <li>
                        <span>
                          <img src={Msg} alt="msg" />
                          <span
                            className="color_orange couNt"
                            style={{ marginLeft: "8px" }}
                          >
                            {comments.length}
                          </span>
                        </span>
                      </li>
                      <li>
                        <span>
                          <label>Ends In:&nbsp;</label>
                          {days}days, {hours <= 9 && "0"}
                          {hours}h : {minutes <= 9 && "0"}
                          {minutes}m : {seconds <= 9 && "0"}
                          {seconds}s
                        </span>
                      </li>
                    </ul>

                    <button
                      type="button"
                      className="gry_btn active bg-dark"
                      style={{ border: "none" }}
                      onClick={() => setShow(true)}
                    >
                      Place a bid
                    </button>
                  </div>
                </div>
              </div>
              <div className="postHero pb_30 detail">
                {vehicle?.image_banner && (
                  <img
                    loading="lazy"
                    src={
                      vehicle?.image_banner[0] &&
                      `${process.env.REACT_APP_URL}/${vehicle?.image_banner[0]?.imagePath}/${vehicle?.image_banner[0]?.imageName}`
                    }
                    onError={({ currentTarget }) => {
                      currentTarget.onError = null;
                      currentTarget.src =
                        "http://www.freeiconspng.com/uploads/no-image-icon-11.PNG";
                    }}
                    alt="Maskgroup1"
                  />
                )}
              </div>
              <div className="card_ Dfrt">
                <div>
                  <div className="dropdown mr-2 tagBtns">
                    <p type="button" data-toggle="dropdown">
                      Make: {vehicle.make}
                    </p>
                    <div className="dropdown-menu">
                      <a className="dropdown-item" href="#">
                        View all listings
                      </a>
                      <a className="dropdown-item" href="#">
                        Notify me about new listings
                      </a>
                    </div>
                  </div>
                  <div className="dropdown mr-2 tagBtns">
                    <p type="button" data-toggle="dropdown">
                      Model: {vehicle.model}
                    </p>
                    <div className="dropdown-menu">
                      <a className="dropdown-item" href="#">
                        View all listings
                      </a>
                      <a className="dropdown-item" href="#">
                        Notify me about new listings
                      </a>
                    </div>
                  </div>
                  <div className="dropdown mr-2 tagBtns">
                    <p type="button">Era: {vehicle.year}</p>
                    <div className="dropdown-menu">
                      <a className="dropdown-item" href="#">
                        View all listings
                      </a>
                      <a className="dropdown-item" href="#">
                        Notify me about new listings
                      </a>
                    </div>
                  </div>
                  <div className="dropdown mr-2 tagBtns">
                    <div className="dropdown-menu">
                      <a className="dropdown-item" href="#">
                        View all listings
                      </a>
                      <a className="dropdown-item" href="#">
                        Notify me about new listings
                      </a>
                    </div>
                  </div>
                </div>
                <div className="auctionHistory">
                  <div
                    onClick={() => {
                      handleShowAuctionHistory();
                      handleAuctionHistory();
                    }}
                    className="AuctionBtn"
                  >
                    <img src={EyeIcon} />
                    Auction History{" "}
                    <span className="numBr">{auctionHistory.length}</span>
                  </div>
                </div>
              </div>
              <div className="card_">
                <h3 className="cardTitle">Description</h3>
                <p>{vehicle.moreDescription}</p>
                <p className="py-4">{vehicle.desc1}</p>
                <div className="" id="placeBid_col">
                  <p>{vehicle.desc2}</p>
                </div>
              </div>
              <div className="card_">
                <img src={ScreenShort} />
              </div>
              <div className="card_">
                <h3 className="cardTitle">Shipping</h3>
                <div className="downloadZip">
                  ZIP Code
                  <input type="text" placeholder="Search ZIP code"></input>
                  <button className="btn">Get Quote</button>
                </div>
                <p>
                  Ship this vehicle anywhere in the contiguous 48 states using
                  Gas Guzzlrs Shipping. Enter your destination ZIP code to get
                  an instant quote.
                </p>
              </div>
              <Gallery vehicle={vehicle} />

              <div className="card">
                <div className="row">
                  <div className="col-md-6 ">
                    <h3 style={{ color: "black" }}>BID ON THIS LISTING</h3>

                    <ul>
                      <li style={{ display: "flex" }}>
                        <p>Current Bid</p>
                        <p style={{ marginLeft: "40px" }}>
                          USD ${latestBidData}
                        </p>
                      </li>
                      <li style={{ display: "flex" }}>
                        <p>Time Left</p>
                        <p style={{ marginLeft: "55px" }}>
                          {" "}
                          {/* 2 days, 9 hours, 40 minutes, 16 seconds * */}
                          <span>
                            {days} days, {hours <= 9 && "0"}
                            {hours}h : {minutes <= 9 && "0"}
                            {minutes}m : {seconds <= 9 && "0"}
                            {seconds}s
                          </span>
                        </p>
                      </li>
                      <li style={{ display: "flex" }}>
                        <p>Ends On</p>
                        <p style={{ marginLeft: "60px" }}>
                          {/* Thursday, March 9 at 4:32 am remind me */}
                          {/* {endTimedata} */}

                          {/* new Date("2023-03-13 00:00:00"); */}
                          {new Date(endTimedata).getDate()} <span style={{ marginLeft: "5px" }}>days</span>
                          <span style={{ marginLeft: "5px" }}>{new Date(endTimedata).getHours()}  hours</span>

                          <span style={{ marginLeft: "5px" }}>{new Date(endTimedata).getMinutes()} minutes</span>
                          <span style={{ marginLeft: "5px" }}>{new Date(endTimedata).getSeconds()} seconds</span>

                         
                        </p>
                      </li>
                      <li style={{ display: "flex" }}>
                        <p>Bids</p>
                        <p style={{ marginLeft: "87px" }}>{bidCount}</p>
                      </li>
                      <li style={{ display: "flex" }}>
                        <p>Place Bid</p>
                        <button
                         
                          type="button"
                          className="gry_btn active bg-dark"
                          style={{ border: "none" ,marginLeft: "40px",marginBottom: "20px"}}
                          onClick={() => setShow(true)}
                        >
                          Place a bid
                        </button>
                      </li>
                      
                    </ul>
                  </div>
                </div>
              </div>

              {/* <Comment /> */}
            </div>
          </div>
        </div>
      </section>

      <Modal
        show={show}
        onHide={handleClose}
        className="modal fade"
        id="loginModal"
        centered
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header border-0">
              <h4 className="modal-title" style={{ border: "none" }}>
                Place a bid
              </h4>
              <button
                onClick={handleClose}
                type="button"
                className="close"
                data-dismiss="modal"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={addBiding}>
                <div className="row">
                  <div className="col-12 ">
                    <div className="form-group">
                      <FormInput
                        value={bidValue}
                        onChange={handleBidInput}
                        name="bid"
                        placeholder="Please enter bid amount"
                        errorMessage="Amount should be 1-9 characters and shouldn't include any special character and alphabet!"
                        label="Bid Amount"
                        pattern="^[0-9]{1,12}$"
                        required={true}
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group">
                      <FormInput
                        value={bidComment}
                        onChange={(e) => setBidComment(e.target.value)}
                        name="comment"
                        placeholder="Enter comment"
                        label="comment"
                        style={{ height: "15vh" }}
                      />
                    </div>
                  </div>
                  <div className="col-12 d-flex justify-content-center pt-4 ">
                    <button className="btn" type="submit">
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Modal>
      <Modal
        show={showAuctionHistory}
        onHide={handleCloseAuctionHistory}
        className="modal fade"
        id="loginModal"
        centered
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header border-0">
              <h4 className="modal-title" style={{ border: "none" }}>
                Auction history
              </h4>

              <button
                onClick={handleCloseAuctionHistory}
                type="button"
                className="close"
                data-dismiss="modal"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            <div className="modal-body moAh">
              {auctionHistory &&
                auctionHistory.map((curElem, i) => {

                  console.log(778, curElem)

                  return (
                    <a key={i} href="#" className="dfr">
                      <div className="imgText">
                        <div className="sidebarPost_Img">
                          {/* <img src={carImg} /> */}
                          <img
                            loading="lazy"
                            src={
                              curElem?.image_banner &&
                              `${process.env.REACT_APP_URL}/${curElem?.image_banner?.imagePath}/${curElem?.image_banner?.imageName}`
                            }
                          
                          />

                          
                        </div>
                        <div className="Cont">
                          <p onClick={handleCloseAuctionHistory}>
                            {curElem.make} {curElem.model} {curElem.year}
                          </p>
                          <div className="n">
                            Sold by <b>racer35</b> to <b>ToylorCar</b> for{" "}
                            <span>${curElem.documentFee}</span>{" "}
                          </div>
                          {/* <div className="t">
                            <i className="fa-solid fa-clock"></i>{" "}
                            {new Date(curElem.created_at).toLocaleDateString()}
                          </div> */}
                        </div>
                      </div>
                    </a>
                  );
                })}
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default Detail;
