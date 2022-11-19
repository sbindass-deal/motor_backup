import React, { useEffect, useState } from "react";
import mclaren_senna_reshoot from "../../Assets/images/2019_mclaren_senna_reshoot.webp";
import mclaren_senna_screen_shot from "../../Assets/images/2019_mclaren_senna_screen-shot-2.webp";
import mclaren_senna_reshoot_3093_web_sscaled from "../../Assets/images/2019_mclaren_senna_reshoot_3093_web-scaled.webp";
import { useParams } from "react-router-dom";
import men_face from "../../Assets/images/men-face.jpg";
import men_face2 from "../../Assets/images/men-face2.webp";
import men_face3 from "../../Assets/images/men-face3.jpg";
import men_face4 from "../../Assets/images/men-face4.jfif";
import car_01 from "../../Assets/images/car_01.jpg";
import car_02 from "../../Assets/images/car_02.jpg";
import car_03 from "../../Assets/images/car_03.jpg";
import car_04 from "../../Assets/images/car_04.jpg";
import axios from "axios";
import { useSelector } from "react-redux";
import moment from "moment/moment";
import { Modal } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";

function Detail() {
  const { id } = useParams();
  const userId = useSelector((state) => state);
  const [vehicle, setVehicle] = React.useState({});
  const [vehicleImage, setVehicleImage] = React.useState([]);
  const logingUser = useSelector((state) => state.login);
  const [comments, setcomments] = React.useState([]);
  const [biding, setBiding] = React.useState([]);
  const [show, setShow] = useState(false);
  const [index, setIndex] = useState(0);

  //setInputComment
  const [inputcomment, setInputComment] = React.useState("");
  const [bidValue, setBidValue] = useState();
  // countdown time start
  const [amountprice, setAmountprice] = useState(0);
  const [addVehicleUserId, setAddVehicleUserId] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [showImage, setShowImage] = useState([]);
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  //   const show = () => {
  //     setModalShow(true);
  //   };
  const closeMoal = () => {
    setModalShow(false);
  };
  const handleImageHow = async (id) => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_URL + "/vehicle-image/" + id
      );
      setShowImage(response.data.data);
      console.log(response.data.data);
    } catch (err) {
      console.log(err);
    }
    setModalShow(true);
  };

  const [days, setDays] = useState();
  const [hours, setHours] = useState();
  const [minutes, setMinutes] = useState();
  const [seconds, setSeconds] = useState();
  const [newTiem, setNewTiem] = useState(
    new Date("2022-11-23 12:30:00").getTime()
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

  // countdown time end

  const handleBidInput = (e) => {
    setBidValue(e.target.value);
  };
  const handleClose = () => {
    setShow(false);
    window.location.reload(false);
  };
  const handleShow = () => {
    setShow(true);
  };
  const addBiding = (e) => {
    e.preventDefault();
    if (bidValue > vehicle.documentFee && bidValue > amountprice) {
      axios
        .post(process.env.REACT_APP_URL + "biddings", {
          auctionId: id,
          userId: logingUser.user.id,
          auctionAmmount: bidValue,
          vehicle_id: id,
        })
        .then((res) => {
          console.log(res);
          handleClose();
        });
    } else {
      alert("Bid Amount should be greater than " + amountprice);
    }

    // axios
    //   .post(process.env.REACT_APP_URL + "biddings", {
    //     auctionId: id,
    //     userId: logingUser.user.id,
    //     auctionAmmount: bidValue,
    //     vehicle_id: id,
    //   })
    //   .then((res) => {
    //     console.log(res);
    //     handleClose();
    //   });
  };
  const getComments = () => {
    axios
      .get(process.env.REACT_APP_URL + "comment/vehicle/" + id)
      .then((res) => setcomments(res.data.data.reverse()));
  };

  // console.log(100,comments)

  const getVehicle = () => {
    axios.get(process.env.REACT_APP_URL + "vehicle/" + id).then((res) => {
      setAddVehicleUserId(res.data.data.userId);
      setVehicle(res.data.data);
    });
  };

  //get images
  const getVehicleImages = () => {
    axios.get(process.env.REACT_APP_URL + "vehicle-image/" + id).then((res) => {
      setVehicleImage(res.data.data);
    });
  };

  const getBidingDetails = () => {
    axios.get(process.env.REACT_APP_URL + "bidding/" + id).then((res) => {
      setBiding(res.data.data);
      const length = res.data.data.length - 1;
      setAmountprice(res.data.data[length].auctionAmmount);
      console.log("apiTime", res.data.data[0].created_at);
      // setNewTiem(
      //   parseInt(
      //     new Date(res.data.data[0].created_at).getTime() + 432000000,
      //     10
      //   )
      // );
    });
  };

  React.useEffect(() => {
    getVehicle();
    getVehicleImages();
    getComments();
    getBidingDetails();
  }, []);

  return (
    <div>
      <section className="ptb_80 pt_sm_50">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center pb_30">
              <h2 className="title_combo title_Center">
                {vehicle.make}-{vehicle.model}-{vehicle.year}
              </h2>
            </div>
            <div className="col-12">
              <div className="detailPostOption">
                <div className="">
                  <ul className="labelList">
                    <li>
                      <label>Current Bid:</label>{" "}
                      <span>
                        {amountprice ? (
                          <span>USD ${amountprice}</span>
                        ) : (
                          <span>USD ${vehicle.documentFee} </span>
                        )}
                      </span>
                    </li>
                    <li>
                      <label>Ends In:</label>{" "}
                      <span>
                        {days} days {hours} hours, {minutes} minutes, {seconds}{" "}
                        seconds *
                      </span>
                    </li>
                    {/* <li>
                      <a href="#">
                        <i className="fa-solid fa-comment"></i> 55 Comments
                      </a>
                    </li> */}
                  </ul>
                </div>
                <div className="d-flex">
                  <a href="#" className="gry_btn mr-2">
                    How it Works
                  </a>
                  <a href="#" className="gry_btn mr-2">
                    <i className="fa-solid fa-star mr-2"></i> Watch
                  </a>
                  {t <= 0 ? (
                    <a
                      className="gry_btn active"
                      // onClick={() => addBiding()}
                      // onclick="smoothScroll(document.getElementById('placeBid_col'))"
                    >
                      Auction is closed :{" "}
                      {amountprice ? (
                        <span>USD $ {amountprice}</span>
                      ) : (
                        <span>USD $ {vehicle.documentFee} </span>
                      )}
                    </a>
                  ) : (
                    <button
                      type="button"
                      className="gry_btn active"
                      onClick={handleShow}
                      disabled={
                        userId.login.user.id === addVehicleUserId ? true : false
                      }
                    >
                      Place a bid
                    </button>
                  )}
                  {/* <button
                    type="button"
                    className="gry_btn active"
                    onClick={handleShow}
                    // onClick={() => addBiding()}
                    // onclick="smoothScroll(document.getElementById('placeBid_col'))"
                  >
                    Place a bid
                  </button> */}
                </div>
              </div>
            </div>
          </div>

          <div className="row pt-4">
            <div className="col-12 pb-3">
              <div className="postHero">
                {vehicleImage.length > 0 ? (
                  <img
                    src={
                      process.env.REACT_APP_URL +
                      "/" +
                      vehicleImage[0].imagePath +
                      "/" +
                      vehicleImage[0].imageName
                    }
                    alt=""
                  />
                ) : null}
              </div>
            </div>
            <div className="col-12 dropdownCol">
              <div className="dropdown mr-2">
                <button
                  type="button"
                  className="gry_btn"
                  data-toggle="dropdown"
                >
                  Make: {vehicle.make}
                </button>
                <div className="dropdown-menu">
                  <a className="dropdown-item" href="#">
                    View all listings
                  </a>
                  <a className="dropdown-item" href="#">
                    Notify me about new listings
                  </a>
                </div>
              </div>
              <div className="dropdown mr-2">
                <button
                  type="button"
                  className="gry_btn"
                  data-toggle="dropdown"
                >
                  Model: {vehicle.model}
                </button>
                <div className="dropdown-menu">
                  <a className="dropdown-item" href="#">
                    View all listings
                  </a>
                  <a className="dropdown-item" href="#">
                    Notify me about new listings
                  </a>
                </div>
              </div>
              <div className="dropdown mr-2">
                <button
                  type="button"
                  className="gry_btn"
                  // data-toggle="dropdown"
                >
                  Era: {vehicle.year}
                </button>
                <div className="dropdown-menu">
                  <a className="dropdown-item" href="#">
                    View all listings
                  </a>
                  <a className="dropdown-item" href="#">
                    Notify me about new listings
                  </a>
                </div>
              </div>
              {/* <div className="dropdown mr-2">
                <button
                  type="button"
                  className="gry_btn dropdown-toggle"
                  data-toggle="dropdown"
                >
                  Origin: British
                </button>
                <div className="dropdown-menu">
                  <a className="dropdown-item" href="#">
                    View all listings
                  </a>
                  <a className="dropdown-item" href="#">
                    Notify me about new listings
                  </a>
                </div>
              </div> */}
              <div className="dropdown">
                {/* <button
                  type="button"
                  className="gry_btn dropdown-toggle"
                  data-toggle="dropdown"
                >
                  User: {vehicle.make}
                </button>
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

            <div className="col-12 col-lg-9 pt-4">
              <p>{vehicle.moreDescription}</p>

              <div className="mb-3">
                {vehicleImage.length > 1 ? (
                  <img
                    src={
                      process.env.REACT_APP_URL +
                      "/" +
                      vehicleImage[1].imagePath +
                      "/" +
                      vehicleImage[1].imageName
                    }
                    alt=""
                  />
                ) : null}
              </div>

              {/* <p>
                The Senna was designed under the direction of McLaren
                Automotive’s Rob Melville and built on the carmaker’s MonoCage
                III carbon-fiber monocoque platform. This example is finished in
                Graphite Grey with Paris Blue aerovanes. Equipment includes
                front and rear parking sensors, a backup camera, a Formula
                One-inspired roof scoop, front and side air intakes, rear air
                louvers, a double-element rear diffuser, and an electronically
                adjustable rear wing that also acts as an airbrake. Gorilla
                Glass on the doors was installed by McLaren Toronto in April
                2022, and the removed carbon-fiber panels are included in the
                sale. Paint protection film has been applied to the exterior.
              </p>

              <div className="mb-3">
                <img src={mclaren_senna_screen_shot} className="w-full" />
              </div>

              <p>
                The 19″ front and 20″ center-lock wheels are mounted with 245/35
                and 315/30 Pirelli P Zero Trofeo R tires. RaceActive Chassis
                Control II was standard as were double-wishbone independent
                suspension, adjustable damping and roll modes, multiple
                stability-control modes, Variable Drift Control, Brake Steer,
                and launch control. Stopping power is provided by Paris
                Blue-finished six- and four-piston aluminum monobloc calipers
                over 390mm carbon-ceramic rotors front and rear.
              </p>

              <div className="mb-3">
                <img
                  src={mclaren_senna_reshoot_3093_web_sscaled}
                  className="w-full"
                />
              </div>

              <p>
                Twin-hinge dihedral doors open to reveal a cockpit that features
                Touring-sized carbon-fiber bucket seats with black leather
                upholstery. Additional equipment includes matte Carbon Black
                Alcantara door sill trim, a glass upper rear bulkhead, blue
                six-point harnesses, dual-zone climate control, a Bowers &
                Wilkins seven-speaker audio system, and a portrait-oriented
                infotainment system with Bluetooth, satellite radio
                connectivity, and navigation.
              </p>

              <p>
                The Carfax report lists no accidents or damage and shows
                registration history in Montana, Indiana, Arizona, Oregon,
                Wisconsin, and Ontario, Canada, from December 2018 to April
                2022.
              </p>
              <p>
                The car is registered in a province that does not issue titles
                for vehicles. It is being sold on its registration.
              </p> */}

                <div className="row row_gap_5 videoGalleryRow">
                  {/* <div className="col-12 col-sm-6 pt-4">
                  <h5>VIDEO GALLERY</h5>
                  <div>
                    <a
                      href="https://youtu.be/J5kJcmHMvgs"
                      data-fancybox="videoGallery"
                      className="fancyCol"
                    >
                      <div className="playIc">
                        <i className="fa-solid fa-play"></i>
                      </div>
                      <img src="images/2019_mclaren_senna_reshoot.webp" />
                    </a>
                    <a href="video-gallery.html" className="gry_btn mt-3">
                      More Video
                    </a>
                  </div>
                </div> */}
                  <div className="col-12 col-sm-6 pt-4">
                    <h5>PHOTO GALLERY</h5>
                    <div className="fancyCol">
                      {vehicleImage.length > 0 ? (
                        <img
                          src={
                            process.env.REACT_APP_URL +
                            "/" +
                            vehicleImage[0].imagePath +
                            "/" +
                            vehicleImage[0].imageName
                          }
                          alt=""
                        />
                      ) : null}
                    </div>
                    <button
                      onClick={() => handleImageHow(id)}
                      type="button"
                      className="gry_btn mt-3"
                    >
                      More Photos
                    </button>
                  </div>
                  <div className="col-12 col-sm-6 pt-4">
                    <h5>&nbsp;</h5>
                    <div className="fancyCol">
                      {vehicleImage.length > 0 ? (
                        <img
                          src={
                            process.env.REACT_APP_URL +
                            "/" +
                            vehicleImage[1].imagePath +
                            "/" +
                            vehicleImage[1].imageName
                          }
                          alt=""
                        />
                      ) : null}
                    </div>
                  </div>
                </div>

                <div className="pb_40" id="placeBid_col">
                  <div className="card_Gray">
                    <h5>CAR INFORMATION</h5>
                    <ul className="bidList_ info_">
                      {/* <li>
                        <label>Are you a dealer?</label>
                        <div>{vehicle.dealerId}</div>
                      </li>
                      <li>
                        <label>Name of your dealership</label>
                        <div>{vehicle.dealerDescription}</div>
                      </li>
                      <li>
                        <label>Chassis Number</label>
                        <div>{vehicle.detailvin}</div>
                      </li>
                      {vehicle.Interstellar === "Yes" && (
                        <li>
                          <label>Truck finished in Interstellar White?</label>
                          <div>{vehicle.Interstellar}</div>
                        </li>
                      )}
                      <li>
                        <label>Inte</label>
                        <div>{vehicle.Interstellar}</div>
                      </li>
                      <li>
                        <label>
                          Interior upholstered in Jet Black and Light
                        </label>
                        <div>{vehicle.interior}</div>
                      </li>
                      <li>
                        <label>
                          What brand and model of tires are currently
                        </label>
                        <div>{vehicle.brandandmodel}</div>
                      </li>
                      <li>
                        <label>
                          What size of tires are on the truck? *The size can
                        </label>
                        <div>{vehicle.sizetires}</div>
                      </li>
                      <li>
                        <label>How is the truck titled?</label>
                        <div>{vehicle.km}</div>
                      </li>
                      <li>
                        <label>
                          To the best of your knowledge, is this number
                        </label>
                        <div>{vehicle.accurateField}</div>
                      </li>
                      <li>
                        <label>
                          Truck have a past History paint or bodywork?
                        </label>
                        <div>{vehicle.bodywork}</div>
                      </li>
                      <li>
                        <label>
                          Does the truck have any modifications from stock?
                        </label>
                        <div>{vehicle.modificationstock}</div>
                      </li>
                      <li>
                        <label>
                          What do you know about the history of the truck
                        </label>
                        <div>{vehicle.issuesorproblems}</div>
                      </li>

                      <li>
                        <label>Do you want a reserve?</label>
                        <div>{vehicle.reserve}</div>
                      </li>
                      <li>
                        <label>What is the amount of the document fee t</label>
                        <div>{vehicle.documentFee}</div>
                      </li>
                      <li>
                        <label>
                          Are you an R&T member? Enter your membership number
                          here (not required)
                        </label>
                        <div>{vehicle.membership}</div>
                      </li>
                      <li className="fulwdth">
                        <label>
                          Please list and describe services performed and when
                        </label>
                        <div>{vehicle.moreDescription}</div>
                      </li> */}

                      <li>
                        <label htmlFor="">{vehicle.odmeter} Miles</label>
                      </li>

                      {vehicle.Interstellar === "Yes" && (
                        <li>
                          Interstellar <label htmlFor=""> Interstellar</label>
                        </li>
                      )}

                      <li>
                        <label htmlFor="">
                          Location: {vehicle.city}, {vehicle.country}
                        </label>
                      </li>

                      {vehicle.accessories !== "" && (
                        <li>
                          <label htmlFor=""> {vehicle.accessories}</label>
                        </li>
                      )}

                      {vehicle.bodywork === "Yes" && (
                        <li>
                          Body Work <label htmlFor=""> Recently Painted</label>
                        </li>
                      )}

                      {/* <li>
                        <label htmlFor="">{vehicle.moreDescription}</label>
                      </li> */}

                      {/* <li>
                        <label htmlFor="">{vehicle.premium}</label>
                      </li> */}

                      {vehicle.reserve === "Yes" && (
                        <li>
                          <label htmlFor=""> Reserve</label>
                        </li>
                      )}

                      <li>
                        Size tires <label htmlFor="">{vehicle.sizetires}</label>
                      </li>

                      {/* <li>
                        <label htmlFor="">{vehicle.km}</label>
                      </li> */}
                      <li>
                        Brand <label htmlFor="">{vehicle.brandandmodel}</label>
                      </li>

                      <li>
                        <label htmlFor="">
                          Private Party or Dealer :{" "}
                          {vehicle.dealerId === "Yes"
                            ? "Dealer"
                            : "Privately owned"}{" "}
                        </label>
                      </li>
                    </ul>
                    {/* <div className="bid_bottom">
                    <div className="">
                      <a href="#" className="mr-2">
                        How bidding works
                      </a>
                      <a href="#">
                        <i className="fa-solid fa-star"></i> Watch auction
                      </a>
                    </div>
                    <div className="">
                      <ul className="bid_viewWatch">
                        <li>28,657 views</li>
                        <li>1,908 watchers</li>
                      </ul>
                    </div>
                  </div> */}
                  </div>
                </div>
                <div className="ptb_40" id="placeBid_col">
                  <div className="card_Gray">
                    <h5>BID ON THIS LISTING</h5>
                    <ul className="bidList_">
                      <li>
                        <label>Current Bid</label>
                        <div>
                          {amountprice ? (
                            <span>USD${amountprice}</span>
                          ) : (
                            <span>USD${vehicle.documentFee} </span>
                          )}
                        </div>
                      </li>
                      <li>
                        <label>Time Left</label>
                        <div>
                          {days} days {hours} hours, {minutes} minutes,{" "}
                          {seconds} seconds *
                        </div>
                      </li>
                      <li>
                        <label>Ends On</label>
                        <div>
                          {/* Friday, September 23 at 10:30pm{" "} */}
                          {moment().add(5, "days").format("LLL")}
                          {/* <a href="#">remind me</a> */}
                        </div>
                      </li>
                      <li>
                        <label>Bids</label>
                        <div>{biding ? biding.length : 0}</div>
                      </li>
                      <li>
                        <label>Place Bid</label>
                        {t >= 0 ? (
                          <div>
                            {logingUser.user.id ? (
                              <button
                                type="button"
                                className="gry_btn"
                                onClick={handleShow}
                                disabled={
                                  userId.login.user.id === addVehicleUserId
                                    ? true
                                    : false
                                }
                              >
                                Place a bid
                              </button>
                            ) : (
                              <a href="javascript:void(0)" className="gry_btn">
                                REGISTER TO BID
                              </a>
                            )}
                          </div>
                        ) : (
                          <div>
                            <a className="gry_btn">
                              Auction is closed :{" "}
                              {amountprice ? (
                                <span>USD ${amountprice}</span>
                              ) : (
                                <span>USD ${vehicle.documentFee} </span>
                              )}
                            </a>
                          </div>
                        )}
                      </li>
                    </ul>
                    <div className="bid_bottom">
                      <div className="">
                        <a href="#" className="mr-2">
                          How bidding works
                        </a>
                        <a href="#">
                          <i className="fa-solid fa-star"></i> Watch auction
                        </a>
                      </div>
                      <div className="">
                        <ul className="bid_viewWatch">
                          <li>0 views</li>
                          <li>0 watchers</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row ">
                  <div className="col-12">
                    <h5>{comments.length} COMMENTS</h5>
                    <form className="mb-3">
                      <div className="form-group">
                        <textarea
                          placeholder="add comment here"
                          className="field"
                          value={inputcomment}
                          onChange={(e) => {
                            setInputComment(e.target.value);
                          }}
                        ></textarea>
                      </div>
                      <div className="form-group">
                        <button
                          type="button"
                          onClick={() => {
                            axios
                              .post(process.env.REACT_APP_URL + "comments", {
                                vehicleId: id,
                                userId: 0,
                                bidId: 0,
                                description: inputcomment,
                              })
                              .then(() => {
                                window.location.reload(false);
                              });
                          }}
                          className="gry_btn"
                        >
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                  <div className="col-12 pt-3">
                    {comments.map((data) => (
                      <div className="commentRow">
                        <div className="commentHead">
                          <div className="com_byPic">
                            <img
                              src="https://pinnacle.works/wp-content/uploads/2022/06/dummy-image.jpg"
                              alt=""
                            />
                          </div>
                          <div className="com_by">{data.name}</div>
                          <div className="com_date">
                            <i className="fa-solid fa-clock mr-1"></i>{" "}
                            {moment(data.created_at).format("LLL")}
                          </div>
                        </div>
                        <div className="commentBody">
                          <p>{data.description}</p>
                        </div>
                        <div className="commentFooter">
                          <a href="#" className="mr-3">
                            <i className="fa-solid fa-thumbs-up"></i> 349
                          </a>
                          <a href="#" className="mr-3">
                            <i className="fa-solid fa-thumbs-down"></i> 20
                          </a>
                        </div>
                      </div>
                    ))}

                    {/* <div className="pt-4">
                      <button type="button" className="gry_btn">
                        Read More
                      </button>
                    </div> */}
                  </div>
                </div>
              </div>
              {/* <div className="col-12 col-lg-3">
                <div className="card_Gray mt-4 mb-3">
                  <h6>Gas Guzzlrs Essentials</h6>
                  <ul className="label__List">
                    <li>
                      <label className="label__">Seller:</label>
                      <span className="label__Text">
                        <a href="#">INsennaTY</a>
                      </span>
                    </li>
                    <li>
                      <label className="label__">Location:</label>
                      <span className="label__Text">
                        <a href="#">Toronto, Ontario, Canada</a>
                      </span>
                    </li>
                    <li>
                      <label className="label__">Listing Details:</label>
                      <span className="label__Text">
                        <ul className="listStyle_disc">
                          <li>
                            Chassis:{" "}
                            <a href="#" target="_blank">
                              SBM15ACA1KW800197
                            </a>
                          </li>
                          <li>670 Miles </li>
                          <li>Twin-Turbocharged 4.0-Liter V8 </li>
                          <li>Seven-Speed Dual-Clutch Automatic Transaxle</li>
                          <li>Graphite Grey Paint </li>
                          <li>Paris Blue Aerovanes & Brake Calipers</li>
                          <li>Black Leather Upholstery </li>
                          <li>McLaren Track Telemetry Package</li>
                          <li>Front & Rear Parking Sensors</li>
                          <li>Backup Camera</li>
                          <li>Glass Upper Rear Bulkhead</li>
                          <li>Alcantara-Trimmed Side Sills</li>
                          <li>Bowers & Wilkins Seven-Speaker Audio System</li>
                          <li>Gorilla Glass Door Panels</li>
                          <li>Window Sticker Copy</li>
                          <li>Carbon-Fiber Door Panels Included </li>
                          <li>Clean Carfax Report </li>
                        </ul>
                      </span>
                    </li>
                    <li>
                      <label className="label__">
                        Private Party or Dealer:
                      </label>
                      <span className="label__Text">Private Party</span>
                    </li>
                    <li>
                      <label className="label__">Lot:</label>
                      <span className="label__Text">#84636</span>
                    </li>
                  </ul>
                </div>

                <div className="card_Gray mb-3">
                  <h6>GET THE Gas Guzzlrs DAILY EMAIL</h6>
                  <p>Your daily digest of everything happening on the site.</p>
                  <div className="inlineField">
                    <input
                      type="text"
                      name=""
                      placeholder="Enter your email address"
                      className="field"
                    />
                    <button type="button" className="gry_btn">
                      Sign Up
                    </button>
                  </div>
                </div>

                <div className="pt-3 pb-3 sidebarPostRow">
                  <div className="sidebarPostHead">
                    <h6>Recent Gas Guzzlrs Features</h6>
                  </div>

                  <div className="sidebarPost">
                    <a href="#">
                      <div className="sidebarPost_Img">
                        <img src={car_01} />
                      </div>
                      <div className="sidebarPost_text">
                        Event Coverage: Gas Guzzlrs Alumni Gathering at The Shop
                        in Dallas
                      </div>
                    </a>
                  </div>
                  <div className="sidebarPost">
                    <a href="#">
                      <div className="sidebarPost_Img">
                        <img src={car_02} />
                      </div>
                      <div className="sidebarPost_text">
                        Event Coverage: Gas Guzzlrs Alumni Gathering at The Shop
                        in Dallas
                      </div>
                    </a>
                  </div>
                  <div className="sidebarPost">
                    <a href="#">
                      <div className="sidebarPost_Img">
                        <img src={car_03} />
                      </div>
                      <div className="sidebarPost_text">
                        Event Coverage: Gas Guzzlrs Alumni Gathering at The Shop
                        in Dallas
                      </div>
                    </a>
                  </div>
                  <div className="sidebarPost">
                    <a href="#">
                      <div className="sidebarPost_Img">
                        <img src={car_04} />
                      </div>
                      <div className="sidebarPost_text">
                        Event Coverage: Gas Guzzlrs Alumni Gathering at The Shop
                        in Dallas
                      </div>
                    </a>
                  </div>

                  <div className="sidebarPostFooter text-center">
                    <a href="#" className="gry_btn w-full">
                      More features
                    </a>
                  </div>
                </div>

                <div className="card_Gray mt-3 pt-3">
                  <h6>Upcoming Events</h6>
                  <ul className="sidebar_Event">
                    <li>
                      <a href="#">
                        Gas Guzzlrs Alumni Gathering: October 1 in conjunction
                        with the Audrain Newport Concours & Motor Week –
                        REGISTRATION IS OPEN{" "}
                      </a>
                      <div className="event_date">
                        <i className="fa-solid fa-clock"></i> October 1, 2022
                      </div>
                    </li>
                    <li>
                      <a href="#">
                        20th Rallylegend 2022 Republic of San Marino, Italy
                      </a>
                      <div className="event_date">
                        <i className="fa-solid fa-clock"></i> October 13 - 16,
                        2022
                      </div>
                    </li>
                    <li>
                      <a href="#">Targa Florio classNameica – Palermo, Italy</a>
                      <div className="event_date">
                        <i className="fa-solid fa-clock"></i> October 13 - 16,
                        2022
                      </div>
                    </li>
                    <li>
                      <a href="#">Velocity Invitational</a>
                      <div className="event_date">
                        <i className="fa-solid fa-clock"></i> October 14 - 16,
                        2022
                      </div>
                    </li>
                    <li>
                      <a href="#">SoCal Vintage BMW</a>
                      <div className="event_date">
                        <i className="fa-solid fa-clock"></i> November 5, 2022
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="mt-4 pb-3">
                  <h6>CATEGORIES</h6>
                  <ul className="listStyle_disc">
                    <li>
                      <a href="#">Truck & 4×4</a>
                    </li>
                    <li>
                      <a href="#">Race Cars</a>
                    </li>
                    <li>
                      <a href="#">Hot Rods</a>
                    </li>
                    <li>
                      <a href="#">RVs & Campers</a>
                    </li>
                    <li>
                      <a href="#">Convertibles</a>
                    </li>
                    <li>
                      <a href="#">Station Wagons</a>
                    </li>
                    <li>
                      <a href="#">Vans</a>
                    </li>
                    <li>
                      <a href="#">Motorcycles</a>
                    </li>
                    <li>
                      <a href="#">Minibikes & Scooters</a>
                    </li>
                    <li>
                      <a href="#">Projects</a>
                    </li>
                    <li>
                      <a href="#">Boats</a>
                    </li>
                    <li>
                      <a href="#">Parts</a>
                    </li>
                    <li>
                      <a href="#">Wheels</a>
                    </li>
                    <li>
                      <a href="#">Charity Auctions</a>
                    </li>
                  </ul>
                </div>

                <div className="mt-3 pb-3">
                  <h6>ORIGIN</h6>
                  <ul className="listStyle_disc">
                    <li>
                      <a href="#">American</a>
                    </li>
                    <li>
                      <a href="#">British</a>
                    </li>
                    <li>
                      <a href="#">French</a>
                    </li>
                    <li>
                      <a href="#">German</a>
                    </li>
                    <li>
                      <a href="#">Italian</a>
                    </li>
                    <li>
                      <a href="#">Japanese</a>
                    </li>
                    <li>
                      <a href="#">Spanish</a>
                    </li>
                    <li>
                      <a href="#">Swedish</a>
                    </li>
                  </ul>
                </div>
              </div> */}
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
          <Carousel activeIndex={index} onSelect={handleSelect}>
            {showImage.map((curElem) => {
              return (
                <Carousel.Item key={curElem.id}>
                  <img
                    className="d-block w-100"
                    src={
                      process.env.REACT_APP_URL +
                      curElem.imagePath +
                      curElem.imageName
                    }
                    alt={curElem.imageName}
                  />
                  <Carousel.Caption></Carousel.Caption>
                </Carousel.Item>
              );
            })}
          </Carousel>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>

      <Modal
        show={show}
        onHide={handleClose}
        className="modal fade"
        id="loginModal"
        centered
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            {/* <!-- Modal Header --> */}
            <div className="modal-header border-0">
              <h4 className="modal-title">Place a bid</h4>
              <button
                onClick={handleClose}
                type="button"
                className="close"
                data-dismiss="modal"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            {/* <!-- Modal body --> */}
            <div className="modal-body">
              <form onSubmit={addBiding}>
                <div className="row">
                  <div className="col-12 col-md-12">
                    <div className="form-group">
                      <input
                        value={bidValue}
                        onChange={handleBidInput}
                        type="number"
                        className="form-control"
                        placeholder="Please enter bid amount"
                        required
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
