import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment/moment";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { showModalLogin } from "../../redux/reducers/login";
import { toast } from "react-toastify";
import FormInput from "../UI/FormInput";

function Detail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const logingUser = useSelector((state) => state);
  const vehicleDatas = logingUser.vehicleReducer.vehicleData;
  // console.log(11111,logingUser.login.admin )
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

  return (
    <div>
      <section className="ptb_80 pt_sm_50 " >
        <div className="container">
          <div className="row" >
            <div className="col-12 text-center pb_30 " id="sticky" >
              <h2 className="title_combo title_Center" id="sticky2">
                {vehicle.make} {vehicle.model} {vehicle.year}
              </h2>
            </div>
            <div className="col-12">
              <hr style={{ borderTop: "1px solid grey" }} />
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
                      {vehicle.approved !== "1" ? (
                        "Upcoming Auction"
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

                  <button
                    type="button"
                    className="gry_btn active"
                    onClick={handleShow}
                    disabled={vehicle.approved !== "1" || t < 0 ? true : false}
                  >
                    Place a bid
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="row pt-4">
            <div className="col-12 pb-3">
              <div className="postHero">
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
            </div>



            <div className="col-12 dropdownCol">
              <div className="dropdown mr-2 ">
                <p
                  type="button"
                  // className="orange_btn"
                  data-toggle="dropdown"
                  style={{
                    border: "1px solid grey", borderRadius: "8px", padding: "8px",
                    boxShadow: "1px 1px 1px 1px grey"
                  }}
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
              <div className="dropdown mr-2">
                <p
                  type="button"
                  // className="orange_btn"
                  data-toggle="dropdown"
                  style={{
                    border: "1px solid grey", borderRadius: "8px", padding: "8px",
                    boxShadow: "1px 1px 1px 1px grey"
                  }}
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

              <div className="dropdown mr-2">
                <p type="button"
                  // className="orange_btn"
                  style={{
                    border: "1px solid grey", borderRadius: "8px", padding: "8px",
                    boxShadow: "1px 1px 1px 1px grey"
                  }}
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
              <div className="dropdown mr-2">
                <p
                  onClick={handleMorePhoto}
                  type="button"
                  // className="orange_btn"
                  style={{
                    border: "1px solid grey", borderRadius: "8px", padding: "8px",
                    boxShadow: "1px 1px 1px 1px grey"
                  }}
                >
                  More Photos
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

              <div className="row">
                <div className="col-8">
                  <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officia eius iste optio at architecto excepturi nesciunt cum earum illo, provident sapiente iure adipisci dolorem officiis? Laboriosam dolorem totam explicabo itaque odio corrupti assumenda. Tempore laborum doloremque voluptates. Eos velit dolorem ipsam. Quidem a maxime quo saepe vitae dicta corporis architecto doloribus odit cum voluptate earum odio, qui quaerat aliquam delectus asperiores ut. Doloribus optio laboriosam aliquam, asperiores nobis alias. Fugiat laudantium dicta pariatur quis blanditiis aspernatur quibusdam ut, dolorum tenetur minima rem? Mollitia quis recusandae quae neque at delectus inventore suscipit expedita nihil eum? Illum reprehenderit ut itaque in ab.. Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat, ipsam ad? Saepe tempora, quam asperiores omnis accusantium mollitia illo porro eaque animi corrupti consequuntur eius quas placeat commodi sequi voluptatem natus iusto dignissimos nulla libero dolor atque. Eaque harum beatae quae at eveniet, eligendi, maxime necessitatibus soluta, assumenda facere saepe aspernatur quisquam odio commodi optio dolor eos eum culpa tempora earum qui repellendus exercitationem. Hic magnam doloremque velit eveniet architecto, nostrum ut tempore possimus perferendis rerum ad ullam repellendus placeat. Tempore repellendus culpa mollitia fugit reprehenderit doloribus quod, dolores debitis facere quisquam tempora voluptatem doloremque commodi ex deserunt rerum nihil.</p>
                </div>

                <div className="col-4 pt-3" style={{ border: "1px solid grey", backgroundColor: "#F8F8F8" }}>
                  <h3>Gas Guzzlrs Essentials</h3>
                  <ul>

                  </ul>
                </div>
              </div>

              <div className="dropdown">
                <p className="py-4">{vehicle.desc1}</p>

                <div className="" id="placeBid_col">
                  {/* <div className="card_Gray">
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

                      {vehicle.sizetires !== null && (
                        <li>
                          Tyre size
                          <label htmlFor="">{vehicle.sizetires}</label>
                        </li>
                      )}
                      {vehicle.pickOne !== null && (
                        <li>
                          Wheels
                          <label htmlFor="">{vehicle.pickOne}</label>
                        </li>
                      )}

                      <li>
                        Tyre Brand{" "}
                        <label htmlFor="">{vehicle.brandandmodel}</label>
                      </li>
                      <li>
                        Fuel Type
                        <label htmlFor="">{vehicle.fuel}</label>
                      </li>
                      <li>
                        Seller
                        <label htmlFor="">{vehicle.name}</label>
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
                      {vehicle.moreDescription ? (
                        <li>
                          Description
                          <label htmlFor="">
                            {vehicle.moreDescription.length > 20 &&
                              !showReadMore ? (
                              <span>
                                {vehicle.moreDescription.substr(0, 20)}...
                              </span>
                            ) : (
                              vehicle.moreDescription
                            )}
                            <button
                              type="text"
                              onClick={() => setShowReadMore(!showReadMore)}
                              className="btn read_more p-1"
                            >
                              {showReadMore &&
                                vehicle.moreDescription.length > 20
                                ? "Read Less"
                                : "Read More"}
                            </button>
                          </label>
                        </li>
                      ) : (
                        ""
                      )}
                    </ul>
                  </div> */}
                  <div className="pb_40" id="placeBid_col">
                <div className="card_Gray">
                  <h5 className="cardTitle">CAR INFORMATION</h5>
                  <ul className="bidList_ info_">

                    <li>
                      <div className="dropdown mr-2">
                        <p
                          type="button"
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
                    </li>

                    <li>
                      <div className="dropdown mr-2">
                        <p
                          
                          data-toggle="dropdown"
                        >
                          Model:{vehicle.model}
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
                    </li>
                    
                    <li>
                      <div className="dropdown mr-2">
                        <p
                          type="button"
                        >
                          Era: {vehicle.year}
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
                    </li>


                    <li>
                      Vehicle Id:<label htmlFor="">{vehicle.id}</label>
                    </li>
                    <li>
                      vehicle finished in Interstellar White{" "}
                      <label htmlFor=""> {vehicle.Interstellar}</label>
                    </li>

                    <li>
                      city is the vehicle located in
                      <label htmlFor="">{vehicle.city}</label>
                    </li>
                    <li>
                      country is the vehicle currently located in
                      <label htmlFor="">{vehicle.country}</label>
                    </li>

                    <li>
                      accessories are included in the sale
                      <label htmlFor="">{vehicle.accessories} </label>
                    </li>

                    <li>
                      vehicle have any history of paint or bodywork{" "}
                      <label htmlFor=""> {vehicle.bodywork}</label>
                    </li>

                    <li>
                      provide reserve amount
                      <label htmlFor=""> Reserve {vehicle.reserve}</label>
                    </li>

                    <li>
                      size of tires are on the vehicle{" "}
                      <label htmlFor="">{vehicle.sizetires}</label>
                    </li>

                    {true ? (
                      <div>
                        <li>
                          wheels are on the vehicle
                          <label htmlFor="">{vehicle.pickOne}</label>
                        </li>

                        <li>
                          brand and model of tires are currently mounted{" "}
                          <label htmlFor="">{vehicle.brandandmodel}</label>
                        </li>
                        <li>
                          createdAt{" "}
                          <label htmlFor="">{vehicle.created_at}</label>
                        </li>
                        <li>
                          current Amount{" "}
                          <label htmlFor="">{vehicle.currentAmount}</label>
                        </li>

                        <li>
                          Amount on document{" "}
                          <label htmlFor="">{vehicle.documentFee}</label>
                        </li>
                        <li>
                          meter <label htmlFor="">{vehicle.km}</label>
                        </li>
                        <li>
                          your vehicle <label htmlFor="">{vehicle.make}</label>
                        </li>
                        <li>
                          model of vehicle{" "}
                          <label htmlFor="">{vehicle.model}</label>
                        </li>
                        <li>
                          Fuel Type <label htmlFor="">{vehicle.fuel}</label>
                        </li>
                        <li>
                          current odometer reading{" "}
                          <label htmlFor="">{vehicle.odmeter}</label>
                        </li>

                        <li>
                          you know about the history of the vehicle{" "}
                          <label htmlFor="">{vehicle.issuesorproblems}</label>
                        </li>
                        <li>
                          the interior upholstered in Jet Black and Light Gray
                          leather <label htmlFor="">{vehicle.interior}</label>
                        </li>
                        <li>
                          dealer Description{" "}
                          <label htmlFor="">{vehicle.dealerDescription}</label>
                        </li>
                        <li>
                          Dealer id:{" "}
                          <label htmlFor="">{vehicle.dealerId}</label>
                        </li>
                        <li>
                          name of your dealership:{" "}
                          <label htmlFor="">{vehicle.dealerName}</label>
                        </li>
                        <li>
                          Description{" "}
                          <label htmlFor="">{vehicle.description}</label>
                        </li>
                        <li>
                          displayInAuction{" "}
                          <label htmlFor="">{vehicle.displayInAuction}</label>
                        </li>
                        <li>
                          documentFee{" "}
                          <label htmlFor="">{vehicle.documentFee}</label>
                        </li>
                        <li>
                          Email <label htmlFor="">{vehicle.email}</label>
                        </li>
                        <li>
                          issues or problems does it currently have{" "}
                          <label htmlFor="">{vehicle.hereFrom}</label>
                        </li>
                        <li>
                          kmacc <label htmlFor="">{vehicle.kmacc}</label>
                        </li>

                        <li>
                          modifications details
                          <label htmlFor="">{vehicle.modificationstock}</label>
                        </li>
                        <li>
                          list and describe services performed and when they
                          were performed{" "}
                          <label htmlFor="">{vehicle.moreDescription}</label>
                        </li>
                        <li>
                          name <label htmlFor="">{vehicle.name}</label>
                        </li>
                        <li>
                          modifications details{" "}
                          <label htmlFor="">
                            {vehicle.modificationOnTruck}
                          </label>
                        </li>
                        <li>
                          vehicle have any modifications from stock{" "}
                          <label htmlFor="">{vehicle.modificationstock}</label>
                        </li>

                        <li>
                          you have owned it{" "}
                          <label htmlFor="">{vehicle.owned}</label>
                        </li>
                        <li>
                          vehicle a race car or not otherwise registered for
                          street use{" "}
                          <label htmlFor="">{vehicle.ownerDetail}</label>
                        </li>

                        <li>
                          premium <label htmlFor="">{vehicle.premium}</label>
                        </li>
                        <li>
                          provide reserve amount{" "}
                          <label htmlFor="">{vehicle.reservAmount}</label>
                        </li>

                        <li>
                          rust details{" "}
                          <label htmlFor="">{vehicle.rustDetails}</label>
                        </li>
                        <li>
                          rust present on the vehicle{" "}
                          <label htmlFor="">{vehicle.rustpresent}</label>
                        </li>

                        <li>
                          sizetires{" "}
                          <label htmlFor="">{vehicle.sizetires}</label>
                        </li>
                        <li>
                          sold <label htmlFor="">{vehicle.sold}</label>
                        </li>

                        <li>
                          status of the vehicle title{" "}
                          <label htmlFor="">{vehicle.titleStatus}</label>
                        </li>
                        <li>
                          provide link to the listing{" "}
                          <label htmlFor="">{vehicle.transmission}</label>
                        </li>
                        <li>
                          engineSize{" "}
                          <label htmlFor="">{vehicle.engineSize}</label>
                        </li>
                        <li>
                          vehicle history, paint or bodywork{" "}
                          <label htmlFor="">{vehicle.truckHistory}</label>
                        </li>

                        <li>
                          understandCondition{" "}
                          <label htmlFor="">
                            {vehicle.understandCondition}
                          </label>
                        </li>
                        <li>
                          updatedAt{" "}
                          <label htmlFor="">{vehicle.updated_at}</label>
                        </li>
                        <li>
                          userId <label htmlFor="">{vehicle.userId}</label>
                        </li>

                        <li>
                          year of your vehicle{" "}
                          <label htmlFor="">{vehicle.year}</label>
                        </li>
                        <li>
                          EndTime <label htmlFor="">{vehicle.EndTime}</label>
                        </li>

                        <li>
                          acceptTerms{" "}
                          <label htmlFor="">{vehicle.acceptTerms}</label>
                        </li>

                        <li>
                          Auction type{" "}
                          <label htmlFor="">{vehicle.auctionType}</label>
                        </li>

                        <li>
                          vehicle being sold on consignment{" "}
                          <label htmlFor="">{vehicle.consignment}</label>
                        </li>
                        <li>
                          Detailvin{" "}
                          <label htmlFor="">{vehicle.detailvin}</label>
                        </li>
                      </div>
                    ) : null}
                    <li>
                      <label htmlFor="">Private Party or Dealer :dealer</label>
                    </li>
                  </ul>
                  {/* <div className="col-12 text-center">
                    <button
                      className="btn btn-warning "
                      onClick={() => setViewAll(!viewAll)}
                    >
                      {" "}
                      {viewAll ? "View Less" : "View All"}
                    </button>
                  </div> */}
                </div>
              </div>

                </div>
                <p>{vehicle.desc2}</p>
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
                        {vehicle.approved !== "1" ? (
                          "Upcoming Auction"
                        ) : vehicle.approved === "1" && t > 0 ? (
                          <span>
                            <label>Ends In:&nbsp;</label>
                            {days <= 9 && "0"}
                            {days} days, {hours <= 9 && "0"}
                            {hours}h : {minutes <= 9 && "0"}
                            {minutes}m : {seconds <= 9 && "0"}
                            {seconds}s
                          </span>
                        ) : (
                          "Auction Closed"
                        )}
                      </li>

                      <li>
                        <label>Bids</label>
                        <div>{biding ? biding.length : 0}</div>
                      </li>
                      <button
                        type="button"
                        className="gry_btn active"
                        onClick={handleShow}
                        disabled={
                          vehicle.approved !== "1" || t < 0 ? true : false
                        }
                      >
                        Place a bid
                      </button>
                    </ul>
                    <div className="bid_bottom">
                      <div className="">
                        <a href="#" className="mr-2">
                          How bidding works
                        </a>
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
                <div className=" phG">
                  <h5>PHOTO GALLERY </h5>
                  <div ref={moreImgRaf} class="card-group">
                    {vehicle.images &&
                      vehicle.images.map((curElem) => {
                        return (
                          <div class="card mx-1 ">
                            <img
                              loading="lazy"
                              class="card-img-top"
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
                  </div>
                </div>
                <div className="row pt-4">
                  <div className="col-12">
                    <h5>COMMENTS</h5>
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
                        <button type="submit" className="orange_btn">
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
                              loading="lazy"
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
        show={show}
        onHide={handleClose}
        className="modal fade"
        id="loginModal"
        centered
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
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
                    <div class="form-group">
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
