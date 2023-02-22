import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment/moment";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { showModalLogin } from "../../redux/reducers/login";
import { toast } from "react-toastify";
import FormInput from "../UI/FormInput";
import { Image } from "antd";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import Msg from '../../Assets/images/msg.svg'
import { padding } from "@mui/system";
import EyeIcon from '../../Assets/images/eyeIcon.svg'
import ScreenShort from '../../Assets/images/screenShort.png'
import carImg from '../../Assets/images/carImg.png'
import bellIcon from '../../Assets/images/bellIcon.svg'
import men_face from '../../Assets/images/men-face.jpg'

function Detail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const logingUser = useSelector((state) => state);
  const vehicleDatas = logingUser.vehicleReducer.vehicleData;
  // console.log(11111,logingUser.login.admin )
  const [vinDetails, setVinDetails] = useState({});
  const moreImgRaf = useRef();
  const [vehicle, setVehicle] = useState({});
  const [showReadMore, setShowReadMore] = useState();
  const [comments, setcomments] = useState([]);
  const [biding, setBiding] = useState([]);
  const [show, setShow] = useState(false);
  //setInputComment
  const [inputcomment, setInputComment] = useState("");
  const [bidValue, setBidValue] = useState();
  const [bidComment, setBidComment] = useState();
  // countdown time start
  const [amountprice, setAmountprice] = useState(0);

  const [days, setDays] = useState();
  const [hours, setHours] = useState();
  const [minutes, setMinutes] = useState();
  const [seconds, setSeconds] = useState();
  const [newTiem, setNewTiem] = useState(
    new Date("2022-12-15, 19:53:00").getTime()
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

  const handleBidInput = (e) => {
    setBidValue(e.target.value);
  };
  const handleClose = () => {
    setShow(false);
    window.location.reload(false);
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

  const handleShow = () => {
    if (logingUser.login.admin === "1") {
      notify(`You are admin so you can't bid`);
    } else if (
      logingUser.login.token !== "1" &&
      logingUser.login.token !== null &&
      vehicle.canBid === "no"
    ) {
      notify(`You are seller so you can't bid`);
    } else if (
      logingUser.login.token !== "1" &&
      logingUser.login.token !== null &&
      vehicle.canBid === "yes"
    ) {
      setShow(true);
    } else {
      dispatch(showModalLogin());
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
  const addBiding = (e) => {
    e.preventDefault();
    const bidVal = parseInt(bidValue, 10);
    if (bidVal <= parseInt(vehicle.documentFee, 10)) {
      alert("Bid Amount should be greater than " + vehicle.documentFee);
    } else if (bidVal <= parseInt(amountprice, 10)) {
      alert("Bid Amount should be greater than " + amountprice);
    } else {
      axios
        .post(process.env.REACT_APP_URL + "biddings", {
          auctionId: id,
          auctionAmmount: bidValue,
          vehicle_id: id,
          comment: bidComment,
        })
        .then((res) => {
          if (res.data.status === 200 && t < 1000 * 60 * 5) {
            fetchEndTime();
          } else {
            handleClose();
          }
        })
        .catch((err) => alert(err));
    }
  };
  const getComments = () => {
    axios
      .get(process.env.REACT_APP_URL + "comment/vehicle/" + id)
      .then((res) => {
        setcomments(res.data.data.reverse());
      });
  };

  // console.log(100,comments)
  const addViews = (id) => {
    axios
      .post(process.env.REACT_APP_URL + "createViews", {
        vehicleId: id,
        date: new Date().toString(),
      })
      .then((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    if (id) {
      addViews(id);
    }
  }, []);

  useEffect(() => {
    const filteredSingleVehicle = vehicleDatas.filter(
      (item) => item.id === parseInt(id, 10)
    );
    setVehicle(filteredSingleVehicle[0]);
    // console.log("t", new Date(res.data.data[0].EndTime).getTime());
    // console.log("end", new Date(res.data.data[0].EndTime));
    setNewTiem(
      parseInt(new Date(filteredSingleVehicle[0].EndTime).getTime(), 10)
    );
  }, [vehicleDatas, id]);

  const getBidingDetails = () => {
    axios.get(process.env.REACT_APP_URL + "bidding/" + id).then((res) => {
      setBiding(res.data.data);
      const length = res.data.data.length - 1;
      setAmountprice(res.data.data[length].auctionAmmount);

      // const dateLocal = new Date(res.data.data[0].created_at);
      // const newDate = new Date(
      //   dateLocal.getTime() - dateLocal.getTimezoneOffset() * 60 * 1000
      // );
      // console.log("serverTime", res.data.data[0].EndDate.getTime());
    });
  };

  React.useEffect(() => {
    getComments();
    getBidingDetails();
  }, []);
  const addFabrity = (id) => {
    axios
      .post(process.env.REACT_APP_URL + "createLikes", {
        vehicleId: id,
        date: new Date().toString(),
      })
      .then((res) => {
        if (res.data.status === 200) {
          window.location.reload(false);
        }
      });
  };

  const handleMorePhoto = () => {
    moreImgRaf.current.scrollIntoView({ behavior: "smooth", block: "end" });
  };

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
  // {
  //   console.log(111, vinDetails.options !== undefined && vinDetails.options.map((curElem) => curElem))
  // }
  return (
    <div>
      <section className="ptb_80 pt_sm_50 ">
        <div className="container" id="sticky">
          <div className="row">
            <div className="col-lg-3 col-sm-12">
              <div className="box_backgroundD">
                <h3 className="cardTitle">Fundamental</h3>
                <div className="sellerBox">
                  <div>
                    Seller: <a href="#">UserName</a>
                    <small> (Private Party or Dealer ): Dealer</small>
                  </div>
                  <a href="#"><img src={bellIcon} alt="bellIcon"/></a>
                </div>
                <ul className="listFund">
                  <li>Location: <span><a href="https://www.google.com/maps/place/South%20Huntington,%20New%20York%2011746">  South Huntington, New York 11746</a></span></li>
                  <li>VIN/ID: <span>4Y1SL65848Z411439</span></li>
                  <li>Lot: <span>#97327</span></li>
                  <li>Miles: <span>18k Miles Shown, TMU</span></li>
                  <li>Engine :<span>Triple SU Carburetors</span></li>
                  <li>Transmission: <span>Four-Speed Manual Transmission</span></li>
                  <li>Brakes: <span>Hydraulic Drum Brakes</span></li>
                  <li>Differential: <span>Four-Wheel Independent Suspension</span></li>
                  <li>Special Modifications: <span>Five Spare Wire Wheels</span></li>

                </ul>
              </div>
              <div className="box_backgroundD mt-15">
                <h3 className="cardTitle">Interior</h3>
                <ul className="UlList">
                  <li>Head Up Display (HUD)</li>
                  <li>Colored Seat Belt In Bianco Polar</li>
                  <li>Q-citura W/Alcantara</li>
                  <li>Contrast Stitching On Steering Wheel</li>
                  <li>Multifunctional Steering Wheel In Smooth Leather Heated</li>
                  <li>Floor Mats W/Leather Piping And Double Stitching</li>
                  <li>Optional Stitching</li>
                  <li>Multifunctional Steering Wheel In Colored Leather</li>
                </ul>
                <button className="btn more_">Read more</button>
              </div>
              <div className="box_backgroundD mt-15">
                <h3 className="cardTitle">Exterior</h3>
                <ul className="UlList">
                  <li>Chrome Roof Rails</li>
                  <li>Bright Chrome Exhaust Tailpipes</li>
                  <li>Rims Nath 22" Titanium Matt</li>
                  <li>Rims Taigete 23" Shiny Black</li>
                  <li>Heat Reflective Windscreen W/Heating And Defrosting</li>
                  <li>Black Matt Exhaust Tailpipes</li>
                  <li>21" Spare Wheel</li>
                  <li>Wet-Arm Wiper W/Headlight Washer And RVC Cleaner</li>
                  <li>Red Painted Brake Calipers</li>
                </ul>
                <button className="btn more_">Read more</button>
              </div>
              <div className="box_backgroundD mt-15 justifyCenter">
                  <button className="btn">Contact Seller</button>
              </div>
              <div className="box_backgroundD mt-15">
                <h3 className="cardTitle">Latest Guzzlrs Auctions</h3>
                <div className="mt-4 pb-3 sidebarPostRow sidebarAuctions">				
                  <div className="sidebarPost">
                    <a href="#">
                      <div className="overlay_post">
                        <div className="">
                          <div className="">Current Bid: $25,000</div>
                          <div className="">Ends in: 12 hours, 30 minutes</div>
                        </div>
                      </div>
                      <div className="sidebarPost_Img"><img src={carImg}/></div>
                    </a>
                  </div>
                  <div className="sidebarPost">
                    <a href="#">
                      <div className="overlay_post">
                        <div className="">
                          <div className="">Current Bid: $25,000</div>
                          <div className="">Ends in: 12 hours, 30 minutes</div>
                        </div>
                      </div>
                      <div className="sidebarPost_Img"><img src={carImg}/></div>
                    </a>
                  </div>
                  <div className="sidebarPost">
                    <a href="#">
                      <div className="overlay_post">
                        <div className="">
                          <div className="">Current Bid: $25,000</div>
                          <div className="">Ends in: 12 hours, 30 minutes</div>
                        </div>
                      </div>
                      <div className="sidebarPost_Img"><img src={carImg}/></div>
                    </a>
                  </div>
                  <div className="sidebarPost">
                    <a href="#">
                      <div className="overlay_post">
                        <div className="">
                          <div className="">Current Bid: $25,000</div>
                          <div className="">Ends in: 12 hours, 30 minutes</div>
                        </div>
                      </div>
                      <div className="sidebarPost_Img"><img src={carImg}/></div>
                    </a>
                  </div>
                  <div className="sidebarPost">
                    <a href="#">
                      <div className="overlay_post">
                        <div className="">
                          <div className="">Current Bid: $25,000</div>
                          <div className="">Ends in: 12 hours, 30 minutes</div>
                        </div>
                      </div>
                      <div className="sidebarPost_Img"><img src={carImg}/></div>
                    </a>
                  </div>
                  <div className="imgText">
                    <div className="sidebarPost_Img"><img src={carImg}/></div>
                    <div className="Cont">
                        <p>Lamborghini Urus 2019</p>
                        <div className="n">Current Bid:<span>$25,000</span> </div>
                        <div className="t"><i className="fa-solid fa-clock"></i> Ends in: 12 hours, 30 minutes</div>
                    </div>
                  </div>
                  <div className="imgText">
                    <div className="sidebarPost_Img"><img src={carImg}/></div>
                    <div className="Cont">
                        <p>Lamborghini Urus 2019</p>
                        <div className="n">Current Bid:<span>$25,000</span> </div>
                        <div className="t"><i className="fa-solid fa-clock"></i> Ends in: 12 hours, 30 minutes</div>
                    </div>
                  </div>
                  <div className="imgText">
                    <div className="sidebarPost_Img"><img src={carImg}/></div>
                    <div className="Cont">
                        <p>Lamborghini Urus 2019</p>
                        <div className="n">Current Bid:<span>$25,000</span> </div>
                        <div className="t"><i className="fa-solid fa-clock"></i> Ends in: 12 hours, 30 minutes</div>
                    </div>
                  </div>
                  <div className="imgText">
                    <div className="sidebarPost_Img"><img src={carImg}/></div>
                    <div className="Cont">
                        <p>Lamborghini Urus 2019</p>
                        <div className="n">Current Bid:<span>$25,000</span> </div>
                        <div className="t"><i className="fa-solid fa-clock"></i> Ends in: 12 hours, 30 minutes</div>
                    </div>
                  </div>
                  <div className="sidebarPost">
                    <a href="#">
                      <div className="overlay_post">
                        <div className="">
                          <div className="">Current Bid: $25,000</div>
                          <div className="">Ends in: 12 hours, 30 minutes</div>
                        </div>
                      </div>
                      <div className="sidebarPost_Img"><img src={carImg}/></div>
                    </a>
                  </div>
                </div>
                <button className="btn more_">Read more</button>
              </div>

                    <h3>Essentials</h3>
                    <ul>
                      <li>equipmentType:{vinDetails?.engine?.equipmentType}</li>
                      <li>fuelType:{vinDetails?.engine?.fuelType}</li>
                      <li>horsepower:{vinDetails?.engine?.horsepower}</li>
                      <li>numOfDoors:{vinDetails?.numOfDoors}</li>
                      <li>
                        category:
                        {vinDetails.options !== undefined &&
                          vinDetails.options.map((curElem, i) => {
                            return (
                              <p>
                                <span style={{ fontWeight: "bolder" }}>
                                  {i + 1}
                                </span>{" "}
                                {curElem.category}:
                                {curElem.options.map((item, i) => {
                                  return (
                                    <div>
                                      <span>
                                        <FiberManualRecordIcon
                                          style={{ fontSize: "1rem" }}
                                        />
                                      </span>{" "}
                                      {item.name}
                                    </div>
                                  );
                                })}
                              </p>
                            );
                          })}
                      </li>
                    </ul>
                    
            </div>
            <div className="col-lg-9 col-sm-12">
              <div className=" text-center box_background p-20" id="sticky" >
                  <div className="detailPostOption">
                  <h2 className="title_combo title_Center" id="sticky2">
                    {vehicle.make} {vehicle.model} {vehicle.year}
                  </h2>
                    <div className="titleRight">
                      <ul className="labelList">
                        <li>
                          <label>Sold for</label>{" "}
                          <span>
                            {amountprice ? (
                              <span>
                                {" "}
                                <span style={{ fontWeight: "bold" }}>
                                  {" "}
                                  ${amountprice}{" "}
                                </span>
                                <span>
                                <label>On</label>
                                  {" "}
                                  {new Date(vehicle.EndTime).toLocaleDateString()}
                                </span>
                              </span>
                            ) : (
                              <span>
                                {" "}
                                <span style={{ fontWeight: "bold" }}>
                                  {" "}
                                  ${vehicle.documentFee}{" "}
                                </span>
                                <span>
                                <label style={{padding: "0px 10px"}}>On</label> 
                                  {new Date(vehicle.EndTime).toLocaleDateString()}
                                </span>
                              </span>
                            )}
                          </span>
                        </li>
                        <li>
                          {vehicle.approved !== "1" ? (
                            <span>
                             
                              <img src={Msg} alt="msg"/>
                              <span className="color_orange couNt"
                                style={{ marginLeft: "8px", }}
                              >
                                {comments.length}
                              </span>
                              
                            </span>
                          ) : vehicle.approved === "1" && t > 0 ? (
                            <span>
                              <label>Ends In:&nbsp;</label>
                              {days}days, {hours <= 9 && "0"}
                              {hours}h : {minutes <= 9 && "0"}
                              {minutes}m : {seconds <= 9 && "0"}
                              {seconds}s
                            </span>
                          ) : (
                            "Auction Closed"
                          )}
                        </li>

                        {vehicle.reserve === "Yes" &&
                          vehicle.approved === "1" &&
                          t > 0 && (
                            <li className="reserved">
                              Reserve: <span>{vehicle.reserve}</span>
                            </li>
                          )}
                      </ul>
                      

                      <button
                        type="button"
                        className="gry_btn active bg-dark"
                        onClick={handleShow}
                        style={{ border: "none" }}
                        disabled={
                          vehicle.approved !== "1" || t < 0 ? true : false
                        }
                      >
                        View Result
                      </button>
                    </div>
                   
                  </div>
              </div>
              <div className="postHero pb_30 detail">
                  {vehicle?.images && (
                    <img
                      loading="lazy"
                      src={
                        vehicle?.images[0] &&
                        `${process.env.REACT_APP_URL}/${vehicle?.images[0]?.imagePath}/${vehicle?.images[0]?.imageName}`
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
                    <p
                      type="button"
                      // className="orange_btn"
                      data-toggle="dropdown"
                    >
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
                    <p
                      type="button"
                      // className="orange_btn"
                      data-toggle="dropdown"
                    
                    >
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
                    <p
                      type="button"
                      // className="orange_btn"
                    
                    >
                      Era: {vehicle.year}
                    </p>
                    {/* <button type="button" className="orange_btn">
                    Era: {vehicle.year}
                  </button> */}
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
                      <div className="AuctionBtn">
                          <img src={EyeIcon}/>
                          Auction History <span className="numBr">10</span>
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
                <img src={ScreenShort}/>
              </div>
              <div className="card_">
                <h3 className="cardTitle">Shipping</h3>
                <div className="downloadZip">
                Destination ZIP <input type="text" placeholder="Destination ZIP"></input><button className="btn">Download</button>
                </div>
                <p>Ship this vehicle anywhere in the contiguous 48 states using Bring a Trailer Shipping. 
Enter your destination ZIP code to get an instant quote.</p>
              </div>
              <div className="card_ ptb_40">
              <h3 className="cardTitle">Gallery</h3>
              <div className="row galleryPh">

                <div className="col-5">
                  <img src={carImg}/>
                </div>
                <div className="col-7">
                  <div className="rightGallery">
                    <img src={carImg}/>
                    <img src={carImg}/>
                    <img src={carImg}/>
                    <img src={carImg}/>
                    <img src={carImg}/>
                    <img src={carImg}/>
                  </div>

                </div>

              </div>
                <div className=" phG">
                    <div ref={moreImgRaf} className="card-group">
                      <Image.PreviewGroup>
                        {vehicle.images &&
                          vehicle.images.map((curElem) => {
                            return (
                              <div
                                className="card mx-2"
                                style={{ width: "30vh", height: "30vh" }}
                              >

                                <Image
                                  loading="lazy"
                                  style={{ height: "30vh", width: "30vh" }}
                                  className="card-img-top"
                                  src={`${process.env.REACT_APP_URL}/${curElem.imagePath}/${curElem.imageName}`}
                                  onError={({ currentTarget }) => {
                                    currentTarget.onError = null;
                                    currentTarget.src =
                                      "http://www.freeiconspng.com/uploads/no-image-icon-11.PNG";
                                  }}
                                  alt="Maskgroup1"
                                />
                              </div>
                            );
                          })}
                      </Image.PreviewGroup>
                    </div>
                </div>
              </div>
              <div className="card_ ">
              <div className="row ">
                <div className="col-12">
                <h3 className="cardTitle">Guzzlrs Chat</h3>
                  <form className="mb-3">
                    <div className="form-group">
                      <textarea placeholder="add comment here" className="field"></textarea>
                    </div>
                    <div className="form-group">
                      <button type="button" className="gry_btn">Submit</button>
                    </div>
                  </form>
                </div>
                <div className="col-12 pt-3">
                  <div className="commentRow">
                    <div className="commentHead">
                      <div className="com_byPic">
                        <img src={men_face}/>
                      </div>
                      <div className="com_by">Z32kerber</div>
                      <div className="com_date"><i className="fa-solid fa-clock mr-1"></i> Sep 23 at 7:31 PM</div>
                    </div>
                    <div className="commentBody">
                      <p>Amazing car but the drive video was a disappointment.</p>
                    </div>
                    <div className="commentFooter">
                    <a href="#" className="mr-3"><i className="fa-solid fa-thumbs-up"></i> 349</a>
                      <a href="#" className="mr-3"><i className="fa-solid fa-thumbs-down"></i> 20</a>
                    </div>
                  </div>
                  <div className="commentRow">
                    
                  <div className="commentRow">
                    <div className="commentHead">
                      <div className="com_byPic">
                      <img src={men_face}/>
                      </div>
                      <div className="com_by">NobleMotorGroup</div>
                      <div className="com_date"><i className="fa-solid fa-clock mr-1"></i> Sep 23 at 7:31 PM</div>
                    </div>
                    <div className="commentBody">
                      <p>I’ve sold this car a couple times. It’s an amazing, beautiful spec. Whoever ends up with it will be immensely happy. Good luck bidders!</p>
                    </div>
                    <div className="commentFooter">
                      <a href="#" className="mr-3"><i className="fa-solid fa-thumbs-up"></i> 349</a>
                      <a href="#" className="mr-3"><i className="fa-solid fa-thumbs-down"></i> 20</a>
                    </div>
                  </div>
                  <div className="commentRow">
                    <div className="commentHead">
                      <div className="com_byPic">
                      <img src={men_face}/>
                      </div>
                      <div className="com_by">DaveBrewer</div>
                      <div className="com_date"><i className="fa-solid fa-clock mr-1"></i>  Sep 23 at 7:31 PM</div>
                    </div>
                    <div className="commentBody">
                      <p>Dang, and to think I was scared to list my Mustang “No Reserve”…</p>
                    </div>
                    <div className="commentFooter">
                      <a href="#" className="mr-3"> <i className="fa-solid fa-thumbs-up"></i> 349</a>
                      <a href="#" className="mr-3"><i className="fa-solid fa-thumbs-down"></i> 20</a>
                    </div>
                  </div>

                  <div className="pt-4">
                    <button type="button" className="gry_btn">Read More</button>
                  </div>
                </div>
              </div>
              </div>
              </div>
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
              <h4 className="modal-title bg-dark" style={{ border: "none" }}>
                View Result
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
    </div>
  );
}

export default Detail;
