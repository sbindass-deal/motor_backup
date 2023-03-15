import React, { useEffect, useRef, useState } from 'react'
import VehicleDetail from '../../../src/Assets/images/VehicleDetail.png'
import car_01 from '../../../src/Assets/images/car_01.jpg'
import car_02 from '../../../src/Assets/images/car_02.jpg'
import car_03 from '../../../src/Assets/images/car_03.jpg'
import car_04 from '../../../src/Assets/images/car_04.jpg'
import lamborghini from '../../../src/Assets/images/2019-lamborghini-urus.png'
import menface from '../../../src/Assets/images/men-face.jpg'
import chatIcon from '../../../src/Assets/images/Vector2.svg'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'

import { showModalLogin } from "../../redux/reducers/login";
import { toast } from "react-toastify";
import FormInput from "../UI/FormInput";
import { Image } from "antd";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import { Modal } from "react-bootstrap";



const DetailNew = () => {
    // const { id } = useParams();
    const id = 34;
    const dispatch = useDispatch();
    const logingUser = useSelector((state) => state);
    const vehicleDatas = logingUser.vehicleReducer.vehicleData;
    // console.log(11111,logingUser.login.admin )
    const [vinDetails, setVinDetails] = useState({});
    const moreImgRaf = useRef();
    const [vehicle, setVehicle] = useState({});

    console.log(8989,vehicle)
   
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
       
        <div className="container">
            <div className="row main ">
                <div className="col-md-3 py-5 ">
                    <div className='bg-dark1 p-4  mb-3'>
                        <h6 className='text-color'>Fundamental</h6>
                        <hr className='hr' />
                        <ul class="label__List">
                            <li>
                                <label class="label__">Seller : Username (Private Party or Dealer)</label>
                            </li>
                            <li>
                                <label class="label__">Seller : Username (Private Party or Dealer)</label>
                            </li>
                            <li>
                                <label class="label__">Seller : Username (Private Party or Dealer)</label>
                            </li>
                            <li>
                                <label class="label__">Seller : Username (Private Party or Dealer)</label>
                            </li>
                            <li>
                                <label class="label__">Seller : Username (Private Party or Dealer)</label>
                            </li>
                            <li>
                                <label class="label__">Seller : Username (Private Party or Dealer)</label>
                            </li>
                            <li>
                                <label class="label__">Seller : Username (Private Party or Dealer)</label>
                            </li>


                        </ul>
                    </div>

                    <div className='bg-dark1 p-4  mb-3'>
                        <h6 className='text-color'>Interior</h6>
                        <hr className='hr' />
                        <ul class="label__List">
                            <li>
                                <label class="label__">Seller : Username (Private Party or Dealer)</label>
                            </li>
                            <li>
                                <label class="label__">Seller : Username (Private Party or Dealer)</label>
                            </li>
                            <li>
                                <label class="label__">Seller : Username (Private Party or Dealer)</label>
                            </li>
                            <li>
                                <label class="label__">Seller : Username (Private Party or Dealer)</label>
                            </li>
                            <li>
                                <label class="label__">Seller : Username (Private Party or Dealer)</label>
                            </li>
                            <li>
                                <label class="label__">Seller : Username (Private Party or Dealer)</label>
                            </li>
                            <li>
                                <label class="label__">Seller : Username (Private Party or Dealer)</label>
                            </li>


                        </ul>
                    </div>


                    <div className='bg-dark1 p-4  mb-3'>
                        <h6 className='text-color'>Exterior</h6>
                        <hr className='hr' />
                        <ul class="label__List">
                            <li>
                                <label class="label__">Seller : Username (Private Party or Dealer)</label>
                            </li>
                            <li>
                                <label class="label__">Seller : Username (Private Party or Dealer)</label>
                            </li>
                            <li>
                                <label class="label__">Seller : Username (Private Party or Dealer)</label>
                            </li>
                            <li>
                                <label class="label__">Seller : Username (Private Party or Dealer)</label>
                            </li>
                            <li>
                                <label class="label__">Seller : Username (Private Party or Dealer)</label>
                            </li>
                            <li>
                                <label class="label__">Seller : Username (Private Party or Dealer)</label>
                            </li>
                            <li>
                                <label class="label__">Seller : Username (Private Party or Dealer)</label>
                            </li>


                        </ul>
                    </div>


                    <div className="bg-dark1 p-3 mt-2 p-4">
                        <button type='btn' className='btn '>CONTACT SELLER</button>
                    </div>

                    <div class="bg-dark1 p-4 mt-3 mb-3">
                        <div class="sidebarPostHead">
                            <h6 className='text-color'>Latest Guzzlrs Auctions</h6>
                            <hr />
                        </div>

                        <div class="sidebarPost ">
                            <a href="#">
                                <div class="sidebarPost_Img"><img src={car_01} className="img-fluid" /></div>
                                <div class="sidebarPost_text">Event Coverage: BaT Alumni Gathering at The Shop in Dallas</div>
                            </a>
                        </div>
                        <div class="sidebarPost">
                            <a href="#">
                                <div class="sidebarPost_Img"><img src={car_02} className="img-fluid" /></div>
                                <div class="sidebarPost_text">Event Coverage: BaT Alumni Gathering at The Shop in Dallas</div>
                            </a>
                        </div>
                        <div class="sidebarPost">
                            <a href="#">
                                <div class="sidebarPost_Img"><img src={car_03} className="img-fluid" /></div>
                                <div class="sidebarPost_text">Event Coverage: BaT Alumni Gathering at The Shop in Dallas</div>
                            </a>
                        </div>
                        <div class="sidebarPost">
                            <a href="#">
                                <div class="sidebarPost_Img"><img src={car_04} className="img-fluid" /></div>
                                <div class="sidebarPost_text">Event Coverage: BaT Alumni Gathering at The Shop in Dallas</div>
                            </a>
                        </div>

                        <div class="sidebarPostFooter text-center">
                            <a href="#" class="text-color">More</a>
                        </div>
                    </div>



                    <div class="mt-4 pb-3 sidebarPostRow sidebarAuctions">



                        <div class="sidebarPost background_color col-12">

                            <div class="sidebarPost_Img img-fluid ">
                                <img src={lamborghini} />
                            </div>
                            <div class="px-3">
                                <div class="">Lamborghini Urus 2019</div>
                                <div class="">Current Bid: $25,000</div>
                                <div class="">Ends in: 12 hours, 30 minutes</div>
                            </div>
                        </div>
                        <div class="sidebarPost background_color col-12">

                            <div class="sidebarPost_Img img-fluid ">
                                <img src={lamborghini} />
                            </div>
                            <div class="px-3">
                                <div class="">Lamborghini Urus 2019</div>
                                <div class="">Current Bid: $25,000</div>
                                <div class="">Ends in: 12 hours, 30 minutes</div>
                            </div>
                        </div> <div class="sidebarPost background_color col-12">

                            <div class="sidebarPost_Img img-fluid ">
                                <img src={lamborghini} />
                            </div>
                            <div class="px-3">
                                <div class="">Lamborghini Urus 2019</div>
                                <div class="">Current Bid: $25,000</div>
                                <div class="">Ends in: 12 hours, 30 minutes</div>
                            </div>
                        </div> <div class="sidebarPost background_color col-12">

                            <div class="sidebarPost_Img img-fluid ">
                                <img src={lamborghini} />
                            </div>
                            <div class="px-3">
                                <div class="">Lamborghini Urus 2019</div>
                                <div class="">Current Bid: $25,000</div>
                                <div class="">Ends in: 12 hours, 30 minutes</div>
                            </div>
                        </div> <div class="sidebarPost background_color col-12">

                            <div class="sidebarPost_Img img-fluid ">
                                <img src={lamborghini} />
                            </div>
                            <div class="px-3">
                                <div class="">Lamborghini Urus 2019</div>
                                <div class="">Current Bid: $25,000</div>
                                <div class="">Ends in: 12 hours, 30 minutes</div>
                            </div>
                        </div> <div class="sidebarPost background_color col-12">

                            <div class="sidebarPost_Img img-fluid ">
                                <img src={lamborghini} />
                            </div>
                            <div class="px-3">
                                <div class="">Lamborghini Urus 2019</div>
                                <div class="">Current Bid: $25,000</div>
                                <div class="">Ends in: 12 hours, 30 minutes</div>
                            </div>
                        </div> <div class="sidebarPost background_color col-12">

                            <div class="sidebarPost_Img img-fluid ">
                                <img src={lamborghini} />
                            </div>
                            <div class="px-3">
                                <div class="">Lamborghini Urus 2019</div>
                                <div class="">Current Bid: $25,000</div>
                                <div class="">Ends in: 12 hours, 30 minutes</div>
                            </div>
                        </div> <div class="sidebarPost background_color col-12">

                            <div class="sidebarPost_Img img-fluid ">
                                <img src={lamborghini} />
                            </div>
                            <div class="px-3">
                                <div class="">Lamborghini Urus 2019</div>
                                <div class="">Current Bid: $25,000</div>
                                <div class="">Ends in: 12 hours, 30 minutes</div>
                            </div>
                        </div>


                    </div>


                </div>
                <div className="col-md-9 py-5">
                    <p className=''>
                        <div class="detailPostOption p-3 background_color">
                            <div class=" text-center   ">
                                <h4 class="title_combo title_Center">{vehicle.make} {vehicle.model} {vehicle.year}</h4>
                            </div>
                            <div class="">
                                <ul class="labelList">
                                    
                                    <li><label className='text-color'>Sold :</label> <span>$126,888</span> <span> <span className='text-color'>ON</span> 21/02/2023</span></li>
                                    {/* <li><label>Ends In:</label> <span>5 days</span></li> */}
                                    <li>
                                        {/* <a href="#"><i class="fa-solid fa-comment"></i></a> */}
                                        <img src={chatIcon} alt="" className='img-fluid'/>
                                    </li>

                                    <li>
                                        <button href="#" class="gry_btn mr-2"><i class=""></i> View result</button>
                                    </li>
                                </ul>
                            </div>


                        </div>
                    </p>
                    <img src={VehicleDetail} alt="" className='img-fluid' />

                    <div className='img-buttom-gap mt-5'>
                        <div class="dropdown mr-2">
                            <button type="button" class="gry_btn " data-toggle="dropdown">
                                Make: McLaren
                            </button>

                        </div>
                        <div class="dropdown mr-2">
                            <button type="button" class="gry_btn " data-toggle="dropdown">
                                Model: Urus
                            </button>

                        </div>
                        <div class="dropdown mr-2">
                            <button type="button" class="gry_btn dropdown-toggle" data-toggle="dropdown">
                                Era: 2010s
                            </button>

                        </div>

                    </div>


                    <p className='desp background_color p-4'>
                        <h5 className='text-color'>Description</h5>
                        <hr />
                        <p>
                            This 2017 Lamborghini Huracan LP 580-2 is finished in Arancio Borealis Pearl over black leather and is powered by a 5.2-liter V10 paired with a seven-speed dual-clutch transmission. Features include a carbon-fiber rear spoiler and ground effects in addition to a front-axle lift system, 20″ aftermarket wheels, heated and power-adjustable seats, automatic climate contr ol, navigation, a rearview camera, and parking sensors. <br /> <br />

                            The car spent much of its life in Georgia before being acquired by the selling dealer in May 2022. This LP 580-2 has 6k miles and is now  offered in North Carolina with the removed factory wheels, a clean Carfax report, and a clean Georgia title.This 2017 Lamborghini Huracan LP 580-2 is finished in Arancio Borealis Pearl over black leather and is powered by a 5.2-liter V10 paired with a seven-speed dual-clutch transmission. Features include a carbon-fiber rear spoiler and ground effects in addition to a front-axle lift system, 20″ aftermarket wheels, heated and power-adjustable seats, automatic climate control, navigation, a rearview camera, and parking sensors.
                            <br /> <br />
                            The car spent much of its life in Georgia before being acquired by the selling dealer in May 2022. This LP 580-2 has 6k miles and is now offered in North Carolina with the removed factory wheels, a clean Carfax report, and a clean Georgia title.This 2017 Lamborghini Huracan LP 580-2 is finished in Arancio Borealis Pearl over black leather and is powered by a 5.2-liter V10 paired with a seven-speed dual-clutch transmission. Features include
                            <br /> <br />
                            a carbon-fiber rear spoiler and ground effects in addition to a front-axle lift system, 20″ aftermarket wheels, heated and power-adjustable seats, automatic climate control, navigation, a rearview camera, and parking sensors. The car spent much of its life in Georgia before being acquired by This 2017 Lamborghini Huracan LP 580-2 is finished in Arancio Borealis Pearl over black leather and is powered by a 5.2-liter V10 paired with a seven-speed dual-clutch

                        </p>
                    </p>



                    <div class="card text_black"
                        style={{ width: "25rem" }}
                    >
                        <div class="card-body ">
                            <p><span><i class="bi bi-check-square-fill"></i></span> Lorem ipsum dolor sit amet consectetur</p>
                            <p><span><i class="bi bi-check-square-fill"></i></span> Lorem ipsum dolor sit amet consectetur</p>
                            <p><span><i class="bi bi-check-square-fill"></i></span> Lorem ipsum dolor sit amet consectetur</p>
                            <p><span><i class="bi bi-check-square-fill"></i></span> Lorem ipsum dolor sit amet consectetur</p>
                            <p><span><i class="bi bi-check-square-fill"></i></span> Lorem ipsum dolor sit amet consectetur</p>
                            <p><span><i class="bi bi-check-square-fill"></i></span> Lorem ipsum dolor sit amet consectetur</p>
                            <hr />
                            <button type='btn' className="btn btn-success btn1">Free Carfex report</button>
                            <p className='pt-2'>Lorem ipsum dolor sit amet consectetur</p>
                        </div>
                    </div>



                    <p className='desp background_color p-4 mt-4'>
                        <h5 className='text-color'>Shipping</h5>
                        <hr />
                        <p>
                            <p>Destination Zip </p>
                            <p>Lorem ipsum dolor sit, amet consectetur Lorem ipsum dolor sit amet. <br /> perspiciatis architecto animi cum molestiae  </p>

                        </p>
                    </p>


                    <p className='desp background_color p-4 mt-4'>
                        <h5 className='text-color'>Gallery</h5>
                        <hr />
                        <div class="row row_gap_5 mt-2">


                            <div class="col-6 col-sm-6 col-lg-4 mt-2">

                                <img src={car_01} />

                            </div>
                            <div class="col-6 col-sm-6 col-lg-4 mt-2">

                                <img src={car_02} />

                            </div>
                            <div class="col-6 col-sm-6 col-lg-4 mt-2">

                                <img src={car_03} />

                            </div>
                            <div class="col-6 col-sm-6 col-lg-4 mt-2">

                                <img src={car_04} />

                            </div>
                            <div class="col-6 col-sm-6 col-lg-4 mt-2">

                                <img src={car_02} />

                            </div>
                            <div class="col-6 col-sm-6 col-lg-4 mt-2">

                                <img src={car_03} />

                            </div>
                        </div>
                    </p>



                    <p className='desp background_color p-4 mt-4'>
                        <h5 className='text-color'>Video</h5>
                        <hr />
                        <div class="row row_gap_5 mt-2">

                            <div class="col-6 col-sm-6 col-lg-4 mt-2">

                                <img src={car_01} />

                            </div>
                            <div class="col-6 col-sm-6 col-lg-4 mt-2">

                                <img src={car_02} />

                            </div>
                            <div class="col-6 col-sm-6 col-lg-4 mt-2">

                                <img src={car_03} />

                            </div>
                            <div class="col-6 col-sm-6 col-lg-4 mt-2">

                                <img src={car_04} />

                            </div>
                            <div class="col-6 col-sm-6 col-lg-4 mt-2">

                                <img src={car_02} />

                            </div>
                            <div class="col-6 col-sm-6 col-lg-4 mt-2">

                                <img src={car_03} />

                            </div>
                        </div>
                    </p>

                    <p className='desp background_color p-4 mt-4'>
                        <div class="col-12">
                            <h5>Guzzlr Chat</h5>
                            <hr className='hr' />
                            <form class="mb-3">
                                <div class="form-group">
                                    <textarea placeholder="add comment here" class="field"></textarea>
                                </div>
                                <div class="form-group">
                                    <button type="button" class="gry_btn">Submit</button>
                                </div>
                            </form>
                        </div>
                        <div class="col-12 pt-3">
                            <div class="commentRow">
                                <div class="commentHead">
                                    <div class="com_byPic">
                                        <img src={menface} />
                                    </div>
                                    <div class="com_by">Z32kerber</div>
                                    <div class="com_date"><i class="fa-solid fa-clock mr-1"></i> Sep 23 at 7:31 PM</div>
                                </div>
                                <div class="commentBody">
                                    <p>Amazing car but the drive video was a disappointment.</p>
                                </div>
                                <div class="commentFooter">
                                    <a href="#" class="mr-3"><i class="fa-solid fa-thumbs-up"></i> 349</a>
                                    <a href="#" class="mr-3"><i class="fa-solid fa-thumbs-down"></i> 20</a>
                                </div>
                            </div>
                            <div class="commentRow">
                                <div class="commentHead">
                                    <div class="com_byPic">
                                        <img src={menface} />
                                    </div>
                                    <div class="com_by">Wolfenhaus</div>
                                    <div class="com_date"><i class="fa-solid fa-clock mr-1"></i> Sep 23 at 7:31 PM</div>
                                </div>
                                <div class="commentBody">
                                    <p>Fastest around the track bragging rights means something…and it’s name is Senna.</p>
                                </div>
                                <div class="commentFooter">
                                    <a href="#" class="mr-3"><i class="fa-solid fa-thumbs-up"></i> 349</a>
                                    <a href="#" class="mr-3"><i class="fa-solid fa-thumbs-down"></i> 20</a>
                                </div>
                            </div>
                            <div class="commentRow">
                                <div class="commentHead">
                                    <div class="com_byPic">
                                        <img src={menface} />
                                    </div>
                                    <div class="com_by">NobleMotorGroup</div>
                                    <div class="com_date"><i class="fa-solid fa-clock mr-1"></i> Sep 23 at 7:31 PM</div>
                                </div>
                                <div class="commentBody">
                                    <p>I’ve sold this car a couple times. It’s an amazing, beautiful spec. Whoever ends up with it will be immensely happy. Good luck bidders!</p>
                                </div>
                                <div class="commentFooter">
                                    <a href="#" class="mr-3"><i class="fa-solid fa-thumbs-up"></i> 349</a>
                                    <a href="#" class="mr-3"><i class="fa-solid fa-thumbs-down"></i> 20</a>
                                </div>
                            </div>
                            <div class="commentRow">
                                <div class="commentHead">
                                    <div class="com_byPic">
                                        <img src={menface} />
                                    </div>
                                    <div class="com_by">DaveBrewer</div>
                                    <div class="com_date"><i class="fa-solid fa-clock mr-1"></i> Sep 23 at 7:31 PM</div>
                                </div>
                                <div class="commentBody">
                                    <p>Dang, and to think I was scared to list my Mustang “No Reserve”…</p>
                                </div>
                                <div class="commentFooter">
                                    <a href="#" class="mr-3"><i class="fa-solid fa-thumbs-up"></i> 349</a>
                                    <a href="#" class="mr-3"><i class="fa-solid fa-thumbs-down"></i> 20</a>
                                </div>
                            </div>

                            <div class="pt-4">
                                <button type="button" class="gry_btn">Read More</button>
                            </div>
                        </div>
                    </p>

                </div>

            </div>
        </div>

    )
}

export default DetailNew