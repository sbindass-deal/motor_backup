import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment/moment";
import { Modal } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";

function Detail() {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState({});
  const [vehicleImage, setVehicleImage] = useState([]);
  const [comments, setcomments] = useState([]);
  const [biding, setBiding] = useState([]);
  const [show, setShow] = useState(false);
  const [index, setIndex] = useState(0);

  //setInputComment
  const [inputcomment, setInputComment] = useState("");
  const [bidValue, setBidValue] = useState();
  const [bidComment, setBidComment] = useState();
  // countdown time start
  const [amountprice, setAmountprice] = useState(0);
  const [addVehicleUserId, setAddVehicleUserId] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [showImage, setShowImage] = useState([]);
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  const closeMoal = () => {
    setModalShow(false);
  };
  const handleImageHow = async (id) => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_URL + "/vehicle-image/" + id
      );
      setShowImage(response.data.data);
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
  const handleShow = () => {
    setShow(true);
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

  const getVehicle = async () => {
    await axios
      .post(process.env.REACT_APP_URL + "vehicleByID", { id: id })
      .then((res) => {
        setAddVehicleUserId(res.data.data[0].userId);
        setVehicle(res.data.data[0]);
        // console.log("t", new Date(res.data.data[0].EndTime).getTime());
        // console.log("end", new Date(res.data.data[0].EndTime));
        setNewTiem(parseInt(new Date(res.data.data[0].EndTime).getTime(), 10));
        // console.log("api date", new Date(res.data.data[0].EndTime));
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

      // const dateLocal = new Date(res.data.data[0].created_at);
      // const newDate = new Date(
      //   dateLocal.getTime() - dateLocal.getTimezoneOffset() * 60 * 1000
      // );
      // console.log("serverTime", res.data.data[0].EndDate.getTime());
    });
  };

  React.useEffect(() => {
    getVehicle();
    getVehicleImages();
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
          setVehicle({});
          getVehicle();
        }
        console.log(res);
      });
  };

  return (
    <div>
      <section className="ptb_80 pt_sm_50">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center pb_30">
              <h2 className="title_combo title_Center">
                {vehicle.make}-{vehicle.model}-{vehicle.year}-{vehicle.odmeter}
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
                          <span> USD ${amountprice}</span>
                        ) : (
                          <span> USD ${vehicle.documentFee} </span>
                        )}
                      </span>
                    </li>
                    <li>
                      {/* {t > 900000 ? (
                        <span>Upcomming Auction</span>
                      ) : t > 0 && t <= 900000 ? (
                        <span>
                          <label>Ends In:&nbsp;</label>
                          {days} days {hours} hours, {minutes} minutes,{" "}
                          {seconds} seconds *
                        </span>
                      ) : (
                        <span> &nbsp;Time Out</span>
                      )} */}
                      {vehicle.approved === "1" && (
                        <span>
                          <label>Ends In:&nbsp;</label>
                          {days} days {hours} hours, {minutes} minutes,{" "}
                          {seconds} seconds *
                        </span>
                      )}
                    </li>
                    {vehicle.reserve === "Yes" && (
                      <li className="reserved">
                        Reserve: <span>{vehicle.reserve}</span>
                      </li>
                    )}
                  </ul>
                </div>
                <div className="d-flex">
                  {vehicle.like === 1 ? (
                    <a
                      style={{ cursor: "pointer" }}
                      onClick={() => addFabrity(id)}
                      className="gry_btn mr-2 faList"
                    >
                      <i className="fa-solid fa-heart mr-2 "></i>
                      Watch
                    </a>
                  ) : (
                    <a
                      style={{ cursor: "pointer" }}
                      onClick={() => addFabrity(id)}
                      className="gry_btn mr-2"
                    >
                      <i className="fa-solid fa-heart mr-2 "></i>
                      Watch
                    </a>
                  )}
                  {/* <a href="#" className="gry_btn mr-2">
                    How it Works
                  </a> */}
                  {/* {vehicle.like === 1 ? (
                    <a
                      style={{ cursor: "pointer" }}
                      onClick={() => addFabrity(id)}
                      className="gry_btn mr-2 faList"
                    >
                      <i className="fa-solid fa-heart mr-2 "></i>
                      Watch
                    </a>
                  ) : (
                    <a
                      style={{ cursor: "pointer" }}
                      onClick={() => addFabrity(id)}
                      className="gry_btn mr-2"
                    >
                      <i className="fa-solid fa-heart mr-2 "></i>
                      Watch
                    </a>
                  )}
                  {t <= 0 ? (
                    <a className="gry_btn active">
                      {vehicle.reserve === "Yes" && vehicle.sold === "1"
                        ? "High Bid"
                        : "Sold"}{" "}
                      :{" "}
                      {amountprice ? (
                        <span> USD $ {amountprice}</span>
                      ) : (
                        <span> USD $ {vehicle.documentFee} </span>
                      )}
                    </a>
                  ) : t >= 900000 ? (
                    <button type="button" className="gry_btn">
                      Upcoming Auction
                    </button>
                  ) : (
                    <>
                      {vehicle.canBid === "yes" && (
                        <button
                          type="button"
                          className="gry_btn active"
                          onClick={handleShow}
                        >
                          Place a bid
                        </button>
                      )}
                    </>
                  )} */}
                  {vehicle.approved === "1" && vehicle.canBid === "yes" ? (
                    <button
                      type="button"
                      className="gry_btn active"
                      onClick={handleShow}
                    >
                      Place a bid
                    </button>
                  ) : vehicle.approved === "1" &&
                    vehicle.canBid === "no" ? null : (
                    <div className="">Upcoming Auction</div>
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
                  <>
                    {/* <img
                    src={
                      process.env.REACT_APP_URL +
                      "/" +
                      vehicleImage[0].imagePath +
                      "/" +
                      vehicleImage[0].imageName
                    }
                    alt=""
                  /> */}
                    <img
                      src={
                        process.env.REACT_APP_URL +
                        "/" +
                        vehicleImage[0].imagePath +
                        "/" +
                        vehicleImage[0].imageName
                      }
                      onError={({ currentTarget }) => {
                        currentTarget.onerror = null;
                        currentTarget.src =
                          "http://www.freeiconspng.com/uploads/no-image-icon-11.PNG";
                      }}
                      alt="details-images"
                    />
                  </>
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
                <button type="button" className="gry_btn">
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
              <div className="dropdown mr-2">
                <button
                  onClick={() => handleImageHow(id)}
                  type="button"
                  className="gry_btn"
                >
                  More Photos
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
                <p className="py-4">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Expedita quod nemo ab, harum similique nulla autem unde quo
                  eveniet minus, eaque libero provident dolorum ad. Harum
                  possimus error consequatur quam. Molestiae beatae fuga
                  consequatur provident est tempore quos sequi ut aliquam quasi
                  impedit fugiat, repellendus cumque ad, quas corrupti natus
                  laborum minima dolorum nobis cupiditate, aspernatur id
                  reprehenderit necessitatibus. Iste? Quas, doloribus nesciunt
                  pariatur dicta ex, impedit commodi illo consequuntur fugiat
                  delectus sequi ducimus voluptatibus, sapiente aspernatur
                  suscipit soluta dolorem officia non unde perspiciatis vel
                  tenetur atque nostrum. Quisquam, similique. Rerum sed eius
                  sint suscipit est repellendus exercitationem ad magnam velit
                  porro numquam harum mollitia incidunt deserunt quaerat
                  blanditiis error ut, repellat dignissimos fuga, dolor aliquid.
                  Quisquam pariatur tempora eligendi? Obcaecati eius, quod
                  expedita adipisci praesentium nisi quibusdam iure, quidem non
                  assumenda rerum, placeat est minus vero enim dolorem mollitia.
                </p>

                <div className="pb_40" id="placeBid_col">
                  <div className="card_Gray">
                    <h5>CAR INFORMATION</h5>
                    <ul className="bidList_ info_">
                      <li>
                        Miles
                        <label htmlFor="">{vehicle.odmeter}</label>
                      </li>

                      {vehicle.Interstellar === "Yes" && (
                        <li>
                          Interstellar <label htmlFor=""> Interstellar</label>
                        </li>
                      )}

                      <li>
                        Location:
                        <label htmlFor="">
                          {vehicle.city}, {vehicle.country}
                        </label>
                      </li>

                      {vehicle.accessories !== "" && (
                        <li>
                          Accessories
                          <label htmlFor=""> {vehicle.accessories}</label>
                        </li>
                      )}
                      <li>
                        <label htmlFor="">{vehicle.truckDetails}</label>
                      </li>

                      {vehicle.bodywork === "Yes" && (
                        <li>
                          Body Work <label htmlFor=""> Recently Painted</label>
                        </li>
                      )}

                      {/* {vehicle.reserve === "Yes" && (
                        <li>
                          <label htmlFor=""> Reserve</label>
                        </li>
                      )} */}

                      {vehicle.sizetires !== null && (
                        <li>
                          Size tires{" "}
                          <label htmlFor="">{vehicle.sizetires}</label>
                        </li>
                      )}
                      {vehicle.pickOne !== null && (
                        <li>
                          Wheels
                          <label htmlFor="">{vehicle.pickOne}</label>
                        </li>
                      )}

                      {/* <li>
                        <label htmlFor="">{vehicle.km}</label>
                      </li> */}
                      <li>
                        Tire Brand{" "}
                        <label htmlFor="">{vehicle.brandandmodel}</label>
                      </li>

                      <li>
                        Private Party or Dealer :
                        <label htmlFor="">
                          {" "}
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
                        <i className="fa-solid fa-heart"></i> Watch auction
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
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Iusto vel omnis aliquam accusamus eveniet. Ipsa molestias
                  totam, eligendi beatae id inventore nesciunt provident est sed
                  in, impedit at ipsum mollitia! Ad corporis esse architecto cum
                  placeat aspernatur tempore? Odit saepe harum repellat ut
                  aspernatur, officia eius. Officiis veritatis earum quae, et
                  eum nisi quis aut ducimus cum quisquam animi necessitatibus.
                  Ab dolores, distinctio harum alias illum in nam quos, sed
                  blanditiis dignissimos quasi. Incidunt repellendus ab, sunt
                  quisquam neque tempora fugiat nesciunt commodi quo perferendis
                  quod enim reprehenderit necessitatibus illum! Minus beatae
                  maiores eos placeat consequuntur totam? Rerum ratione fugit
                  nobis alias laboriosam, sunt atque. Quia voluptatem aliquam
                  magni eveniet illum ad, autem odio ullam culpa voluptate nemo
                  sint eligendi? Exercitationem optio qui nulla asperiores illo
                  reiciendis quis iure, nesciunt amet illum assumenda eos quidem
                  reprehenderit corporis molestias, odio modi quibusdam vero
                  magnam expedita cupiditate laborum tenetur. Voluptatum, dolor
                  reprehenderit!
                </p>
                <div className="ptb_40" id="placeBid_col">
                  <div className="card_Gray">
                    <h5>BID ON THIS LISTING</h5>
                    <ul className="bidList_">
                      <li>
                        <label>Current Bid</label>
                        <div>
                          {amountprice ? (
                            <span> USD${amountprice}</span>
                          ) : (
                            <span> USD${vehicle.documentFee} </span>
                          )}
                        </div>
                      </li>
                      <li>
                        {/* {t > 900000 ? (
                          <span>Upcomming Auction</span>
                        ) : t > 0 && t <= 900000 ? (
                          <span>
                            <label>Ends In:&nbsp;</label>
                            {days} days {hours} hours, {minutes} minutes,{" "}
                            {seconds} seconds *
                          </span>
                        ) : (
                          <span> &nbsp;Time Out</span>
                        )} */}
                        {vehicle.approved === "1" && t > 0 && (
                          <span>
                            <label>Ends In:&nbsp;</label>
                            {days} days {hours} hours, {minutes} minutes,{" "}
                            {seconds} seconds *
                          </span>
                        )}
                      </li>
                      {/* <li>
                        <label>Ends On</label>
                        <div>
                          {moment().add(5, "days").format("LLL")}
                        </div>
                      </li> */}
                      <li>
                        <label>Bids</label>
                        <div>{biding ? biding.length : 0}</div>
                      </li>
                      {/* <li>
                        <label>Place Bid</label>
                        {t <= 0 ? (
                          <a className="gry_btn active">
                            {vehicle.reserve === "Yes" && vehicle.sold === "1"
                              ? "High Bid"
                              : "Sold"}{" "}
                            :{" "}
                            {amountprice ? (
                              <span> USD $ {amountprice}</span>
                            ) : (
                              <span> USD $ {vehicle.documentFee} </span>
                            )}
                          </a>
                        ) : t >= 900000 ? (
                          <button type="button" className="gry_btn">
                            Upcomming Auction
                          </button>
                        ) : (
                          <>
                            {vehicle.canBid === "yes" && (
                              <button
                                type="button"
                                className="gry_btn active"
                                onClick={handleShow}
                              >
                                Place a bid
                              </button>
                            )}
                          </>
                        )}
                      </li> */}
                      <li>
                        {vehicle.approved === "1" &&
                        vehicle.canBid === "yes" ? (
                          <>
                            <label>Place Bid</label>
                            <button
                              type="button"
                              className="gry_btn active"
                              onClick={handleShow}
                            >
                              Place a bid
                            </button>
                          </>
                        ) : vehicle.approved === "1" &&
                          vehicle.canBid === "no" ? null : (
                          <div>Upcoming Auction</div>
                        )}
                      </li>
                    </ul>
                    <div className="bid_bottom">
                      <div className="">
                        <a href="#" className="mr-2">
                          How bidding works
                        </a>
                        {/* <a href="#">
                          <i className="fa-solid fa-heart"></i> Watch auction
                        </a> */}
                      </div>
                      <div className="">
                        <ul className="bid_viewWatch">
                          <li>{vehicle.view} views</li>
                          <li>{vehicle.like} watchers</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
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
                      {vehicleImage.length > 0
                        ? vehicleImage.map((curImg) => {
                            return (
                              <>
                                <img
                                  src={
                                    process.env.REACT_APP_URL +
                                    "/" +
                                    curImg.imagePath +
                                    "/" +
                                    curImg.imageName
                                  }
                                  alt=""
                                />
                              </>
                            );
                          })
                        : null}
                    </div>
                    {/* <button
                      onClick={() => handleImageHow(id)}
                      type="button"
                      className="gry_btn mt-3"
                    >
                      More Photos
                    </button> */}
                  </div>
                  <div className="col-12 col-sm-6 pt-4">
                    <h5>&nbsp;</h5>
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
                  </div>
                </div>

                <div className="row pt-4">
                  <div className="col-12">
                    <h5>{comments.length} COMMENTS</h5>
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        axios
                          .post(process.env.REACT_APP_URL + "comments", {
                            vehicleId: id,
                            bidId: 0,
                            description: inputcomment,
                          })
                          .then(() => {
                            window.location.reload(false);
                          });
                      }}
                      className="mb-3"
                    >
                      <div className="form-group">
                        <textarea
                          placeholder="add comment here"
                          className="field"
                          value={inputcomment}
                          onChange={(e) => {
                            setInputComment(e.target.value);
                          }}
                          required
                        ></textarea>
                      </div>
                      <div className="form-group">
                        <button type="submit" className="gry_btn">
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
                            <i className="fa-solid fa-thumbs-up"></i> 0
                          </a>
                          <a href="#" className="mr-3">
                            <i className="fa-solid fa-thumbs-down"></i> 0
                          </a>
                        </div>
                      </div>
                    ))}
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
                        max={9999999999}
                        min={0}
                        onChange={(e) => {
                          if (
                            e.target.value.trim().length >= 10 ||
                            e.target.value.trim().length < 0
                          ) {
                            return false;
                          }
                          handleBidInput(e);
                        }}
                        type="number"
                        className="form-control"
                        placeholder="Please enter bid amount"
                        required
                      />
                    </div>
                    <div class="col-md-12">
                      <label for="validationCustom01" class="form-label">
                        comment
                      </label>
                      <textarea
                        value={bidComment}
                        onChange={(e) => setBidComment(e.target.value)}
                        class="form-control"
                        id="bidCommetn"
                        placeholder="Enter commemts"
                        rows="3"
                      ></textarea>
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
