import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment/moment";
import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import FormInput from "../../../UI/FormInput";
import Msg from "../../../../Assets/images/msg.svg";
import ScreenShort from "../../../../Assets/images/screenShort.png";
import Comment from "./Comment";
import Gallery from "./Gallery";
import LatestGuzzlrsAuction from "./LatestGuzzlrsAuction";
import Interior from "./Interior";
import External from "./External";
import Fundamental from "./Fundamental";
import { toast } from "react-toastify";
import { noImage, strToHtml, toCommas } from "../../../UI/globaleVar";
import AuctionHistory from "./AuctionHistory";
import ViewResult from "./ViewResult";
import parse from "html-react-parser";

function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const commentRef = useRef();
  const loginUser = useSelector((state) => state.login);
  const [vinDetails, setVinDetails] = useState(null);
  const [vehicleVinNumber, setVehicleVinNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [vehicle, setVehicle] = useState({});
  const [show, setShow] = useState(false);
  const [commentCount, setCommentCount] = useState(0);
  //setInputComment
  const [bidValue, setBidValue] = useState();
  const [bidComment, setBidComment] = useState();
  const [userInfo, setUserinfo] = useState({});
  const [loadingBiding, setLoadingBiding] = useState(false);
  // countdown time start
  const [days, setDays] = useState();
  const [hours, setHours] = useState();
  const [minutes, setMinutes] = useState();
  const [seconds, setSeconds] = useState();
  const [newTiem, setNewTiem] = useState(
    new Date("2023-03-10, 19:53:00").getTime()
  );

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

  const handleBidInput = (e) => {
    setBidValue(e.target.value, 10);
  };
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    if (loginUser.token === null && loginUser.admin === null) {
      return notify("Please login or register", "warning");
    } else if (loginUser.token !== null && loginUser.admin === null) {
      setShow(true);
    } else if (loginUser.admin !== null) {
      return notify("You are admin so you can't bid.", "warning");
    }
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

  const notify = (val, type = 300) => {
    if (type == 200) {
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
    } else {
      toast.warning(val, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const addBiding = (e) => {
    // biddings before payment bidding api end point
    e.preventDefault();
    setLoadingBiding(true);
    axios
      .post(`${process.env.REACT_APP_URL}make_bid_payment`, {
        vehicle_id: id,
        auctionAmmount: bidValue,
        comment: bidComment,
        initial_amount: `${bidValue && (parseInt(bidValue, 10) * 5) / 100}`,
      })
      .then((res) => {
        setLoadingBiding(false);
        if (res.data.status === 200 && loginUser.user.cn_no) {
          handleClose();
          setBidComment("");
          setBidValue("");
          fetchApi();
          // navigate("/bidswins");
          notify(res.data.message, res.data.status);
        } else {
          notify(res.data.message, res.data.status);
        }
      })
      .catch((err) => {
        setLoadingBiding(false);
        notify(err.response.data.message, err.response.data.status);
      });
  };
  const fetchApi = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_URL}vehicle_detail/${id}`
      );
      if (res.data.status === 200) {
        setVehicle(res.data.data);
        setVehicleVinNumber(res.data.data.detailvin);
        setNewTiem(parseInt(new Date(res.data.data.EndTime).getTime(), 10));
        // console.log("t", new Date(res.data.data[0].EndTime).getTime());
        // console.log("end", new Date(res.data.data[0].EndTime));
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApi();
  }, [id]);

  // get vin details by api
  useEffect(() => {
    const fetchVinDetails = async () => {
      try {
        const res = await axios.get(
          `https://api.gasguzzlrs.com/test_vin/${vehicleVinNumber}`
        );
        setVinDetails(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchVinDetails();
  }, [vehicleVinNumber]);

  // Subscribe api
  const handleSubscribe = async () => {
    axios
      .post(`${process.env.REACT_APP_URL}subscriber`, {
        userId: userInfo.id,
        subscribeTo: vehicle.userId,
      })
      .then(function (response) {
        if (response.data.status === 200) {
          fetchApi();
        }
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getVehicleComment = (count) => {
    setCommentCount(count);
  };

  const handleCommentRef = () =>
    window.scrollTo({
      top: commentRef.current.offsetTop - 100,
      behavior: "smooth",
    });

  return (
    <>
      <section className="ptb_80 pt_sm_50 ">
        <div className="container" id="sticky">
          <div className="row reverseCol">
            <div className="col-lg-3 col-sm-12">
              <Fundamental
                vehicle={vehicle}
                handleSubscribe={handleSubscribe}
              />
              {vinDetails !== null && <Interior vinDetails={vinDetails} />}
              {vinDetails !== null && <External vinDetails={vinDetails} />}

              <div className="box_backgroundD mt-15 justifyCenter">
                <button className="btn">Contact Seller</button>
              </div>
              <LatestGuzzlrsAuction />
            </div>
            <div className="col-lg-9 col-sm-12">
              <h2 className="title_combo title_Center mobileOnlyV" id="sticky2">
                {vehicle?.make}
              </h2>
              <div className=" text-center box_background p-10" id="sticky">
                <div className="detailPostOption">
                <div class="bestSellerRgt">Auction</div>
                  <h2
                    className="title_combo title_Center mobileOnlyD"
                    id="sticky2"
                  >
                    {vehicle?.make}
                  </h2>
                  {vehicle?.is_close == 0 && (
                    <>
                      {vehicle?.displayInAuction != "Garage" && (
                        <div className="titleRight">
                          <ul className="labelList ddertg">
                            {vehicle?.displayInAuction !== "classified" && (
                              <>
                                {vehicle?.currentBid?.last_bid > 0 ? (
                                  <li>
                                    <label>Bid:</label>{" "}
                                    <span>
                                      ${toCommas(vehicle?.currentBid?.last_bid)}
                                    </span>
                                  </li>
                                ) : (
                                  <li>
                                    <label>Bidding Open</label>
                                  </li>
                                )}
                              </>
                            )}
                            <li
                              onClick={handleCommentRef}
                              style={{ cursor: "pointer" }}
                              className="cT"
                            >
                              <span>
                                <img src={Msg} alt="msg" />
                                <span
                                  className="color_orange couNt"
                                  style={{ marginLeft: "8px" }}
                                >
                                  {commentCount}
                                </span>
                              </span>
                            </li>
                            {t > 0 ? (
                              <li>
                                <span>
                                  <label>Ends In:&nbsp;</label>
                                  {days > 0 ? (
                                    <>{days > 0 && <span>{days}days</span>}</>
                                  ) : (
                                    <>
                                      {hours <= 9 && "0"}
                                      {hours > 0 && (
                                        <span>{hours}h</span>
                                      )} : {minutes <= 9 && "0"}
                                      {minutes > 0 && (
                                        <span>{minutes}m</span>
                                      )} : {seconds <= 9 && "0"}
                                      {seconds}s
                                    </>
                                  )}
                                </span>
                              </li>
                            ) : (
                              <>
                                {vehicle?.displayInAuction !== "classified" && (
                                  <span className="d-flex">
                                    <label>Ends In :&nbsp;</label>
                                    <li className="text-danger">Ended</li>
                                  </span>
                                )}
                              </>
                            )}
                          </ul>
                          {vehicle?.displayInAuction === "classified" ? (
                            <button
                              type="button"
                              className="ml-5 gry_btn active bg-dark"
                              style={{ border: "none" }}
                            >
                              Buy now
                            </button>
                          ) : (
                            <>
                              {t > 0 ? (
                                <button
                                  type="button"
                                  className="gry_btn active bg-dark"
                                  style={{ border: "none" }}
                                  onClick={handleShow}
                                >
                                  Place a Bid
                                </button>
                              ) : (
                                <ViewResult vehicle={vehicle} />
                              )}
                            </>
                          )}
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
              <div className="postHero pb_30 detail">
                {/* <div className="soldLable">
                  {vehicle?.is_close == 1 ? (
                    <p>Sold</p>
                  ) : vehicle?.displayInAuction === "classified" ? (
                    <p>Classified</p>
                  ) : vehicle?.displayInAuction == "Garage" ? (
                    <p>Garage</p>
                  ) : (
                    <p>Auction</p>
                  )}
                </div> */}
                {vehicle?.image_banner && (
                  <img
                    loading="lazy"
                    src={
                      vehicle?.image_banner.length == 0
                        ? noImage
                        : vehicle?.image_banner[0] &&
                          `${process.env.REACT_APP_URL}/${vehicle?.image_banner[0]?.imagePath}/${vehicle?.image_banner[0]?.imageName}`
                    }
                    onError={({ currentTarget }) => {
                      currentTarget.onError = null;
                      currentTarget.src = noImage;
                    }}
                    alt="Maskgroup1"
                  />
                )}
              </div>
              <div className="card_ Dfrt">
                <div className="hScroll">
                  <div className="dropdown mr-2 tagBtns">
                    <p type="button" data-toggle="dropdown">
                      Make: {vehicle?.make}
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
                      Model: {vehicle?.model}
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
                    <p type="button">Era: {vehicle?.year}</p>
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
                <AuctionHistory vId={vehicle?.userId} />
              </div>
              <div className="card_ mobileOnlyV">
                <Fundamental
                  vehicle={vehicle}
                  handleSubscribe={handleSubscribe}
                />
              </div>
              <div className="card_">
                <h3 className="cardTitle">Description</h3>
                <p>
                  {vehicle?.moreDescription &&
                    parse(vehicle?.moreDescription, strToHtml)}
                </p>
                <p className="py-4">{vehicle?.desc1}</p>
                <div className="" id="placeBid_col">
                  <p>{vehicle?.desc2}</p>
                </div>
              </div>
              <div className="card_">
                <img src={ScreenShort} />
              </div>
              <div className="card_">
                <h3 className="cardTitle">Shipping</h3>
                <div className="downloadZip">
                  ZIP Code
                  <div className="dZip">
                    <input type="text" placeholder="Search ZIP code"></input>
                    <button className="btn">Get Quote</button>
                  </div>
                </div>
                <p>
                  Ship this vehicle anywhere in the contiguous 48 states using
                  Gas Guzzlrs Shipping. Enter your destination ZIP code to get
                  an instant quote.
                </p>
              </div>
              <Gallery vehicle={vehicle} />

              <div className="card_  text-light">
                <div className="row">
                  <div className="col-md-12 ">
                    <h3 class="cardTitle">Bid On This Listing</h3>
                    {vehicle?.is_close == 0 && (
                      <>
                        {vehicle?.displayInAuction != "Garage" && (
                          <ul className="bidOnThis">
                            <li>
                              <p>Current Bid</p>
                              <p>
                                {/* $ */}
                                {vehicle?.currentBid &&
                                vehicle?.currentBid?.last_bid > 0
                                  ? toCommas(
                                      `$ ${vehicle?.currentBid?.last_bid}`
                                    )
                                  : "Biding Open"}
                              </p>
                            </li>
                            <li>
                              <p>Time Left</p>
                              <p>
                                {t > 0 ? (
                                  <span>
                                    <label>Ends In:&nbsp;</label>
                                    {days > 0 ? (
                                      <>{days > 0 && <span>{days}days</span>}</>
                                    ) : (
                                      <>
                                        {hours <= 9 && "0"}
                                        {hours > 0 && (
                                          <span>{hours}h</span>
                                        )} : {minutes <= 9 && "0"}
                                        {minutes > 0 && (
                                          <span>{minutes}m</span>
                                        )}{" "}
                                        : {seconds <= 9 && "0"}
                                        {seconds}s
                                      </>
                                    )}
                                  </span>
                                ) : (
                                  <span className="d-flex">
                                    <label>Ends In :&nbsp;</label>
                                    <li className="text-danger">Ended</li>
                                  </span>
                                )}
                              </p>
                            </li>
                            <li>
                              <p>Bids</p>
                              <p>{vehicle?.currentBid?.total_bid}</p>
                            </li>
                            <li>
                              <p>Place Bid</p>
                              {vehicle?.displayInAuction === "classified" ? (
                                <button
                                  type="button"
                                  className="ml-5 gry_btn active bg-dark"
                                  style={{ border: "none" }}
                                >
                                  Buy now
                                </button>
                              ) : (
                                <>
                                  <p>
                                    {t > 0 ? (
                                      <button
                                        type="button"
                                        className="gry_btn active bg-dark"
                                        style={{ border: "none" }}
                                        onClick={handleShow}
                                      >
                                        Place a Bid
                                      </button>
                                    ) : (
                                      <ViewResult vehicle={vehicle} />
                                    )}
                                  </p>
                                </>
                              )}
                            </li>
                          </ul>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>

              <Comment
                commentRef={commentRef}
                getVehicleComment={getVehicleComment}
                id={id}
              />
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
                Place a Bid
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
                        onChange={(e) => {
                          handleBidInput(e);
                        }}
                        name="bid"
                        placeholder="Please enter Bid amount"
                        errorMessage="Amount should be 1-8 characters and shouldn't include any special character and alphabet!"
                        label="Bid Amount"
                        pattern="^[0-9]{1,8}$"
                        required={true}
                      />
                    </div>
                  </div>
                  {/* <div className="col-12">
                    <div className="form-group">
                      <FormInput
                        value={bidComment}
                        onChange={(e) => {
                          setBidComment(e.target.value);
                        }}
                        name="comment"
                        placeholder="Enter comment"
                        label="Comment"
                        style={{ height: "15vh" }}
                      />
                    </div>
                  </div> */}
                  {/* <div className="col-12">
                    <p>To complete a bid we will hold 5% of Auction amount.</p>
                    <p>
                      Payable Now : $
                      {bidValue && (parseInt(bidValue, 10) * 5) / 100} USD
                    </p>
                  </div> */}
                  <div className="col-12 d-flex justify-content-center pt-4 ">
                    {loadingBiding ? (
                      <button className="btn" type="button">
                        Loading...
                      </button>
                    ) : (
                      <button className="btn" type="submit">
                        Submit
                      </button>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default Detail;
