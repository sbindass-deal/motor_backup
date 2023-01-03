import axios from "axios";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

import img_01 from "../../../Assets/images/th.jpeg";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import EastIcon from "@mui/icons-material/East";
import WestIcon from "@mui/icons-material/West";


const UserVehicleDetails = () => {
  const [viewAll,setViewAll]=useState(false)
  const [descValue,setDescValue]=useState({
    description1:"",
    description2:""
  })
  const handleDescription=(e)=>{
    setDescValue((pre)=>({...pre,[e.target.name]:e.target.value}))
  }
  const submitApprove=(e)=>{
    e.preventDefault();

    console.log("******",descValue)

  }

  const slide = useRef(null);
  const { id } = useParams();
  const [vehicle, setVehicle] = useState({});
  const fetchVehicleApi = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_URL}vehicle/${id}`
      );
      if (response.data.data) {
        setVehicle(response.data.data[0]);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchVehicleApi();
  }, [id]);
  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "red" }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "green" }}
        onClick={onClick}
      />
    );
  }

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    // autoplay: true,
    // speed: 10000,
    // pauseOnHover: true,
    // cssEase: "linear"
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
// console.log("vehicle##",vehicle)

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
              <div className="detailPostOption"></div>
            </div>
          </div>

          <div className="row">
            <div className="col-6 sticky-direction=up">
              <div className="postHero ">
                <img
                  src="https://tse4.mm.bing.net/th?id=OIP.vf11XywUrdCTiM2RtALitAHaFU&pid=Api&P=0"
                  alt="details-images"
                />
              </div>
            </div> 
            <div className="col-6 dropdownCol">
              <div className="dropdown mr-2">
                <button
                  type="button"
                  className="gry_btn"
                  data-toggle="dropdown"
                >
                  Make: make
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
                  Model: model name
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
                  Era: era
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
              <div className="pb_40" id="placeBid_col">
                  <div className="card_Gray">
                      <h5 className="cardTitle">CAR INFORMATION</h5>
                      <ul className="bidList_ info_">
                       

                        <li>
                        vehicle finished in Interstellar White <label htmlFor=""> {vehicle.Interstellar}</label>
                        </li>

                        <li>
                        city is the vehicle located in<label htmlFor="">{vehicle.city}</label>
                        </li>
                        <li>
                        country is the vehicle currently located in<label htmlFor="">{vehicle.country}</label>
                        </li>

                        <li>
                        accessories are included in the sale<label htmlFor="">{vehicle.accessories} </label>
                        </li>
                            
                           
                         
                        <li>
                          <label htmlFor="">vehicle details</label>
                        </li>

                        <li>
                        vehicle have any history of paint or bodywork <label htmlFor=""> {vehicle.bodywork}</label>
                        </li>

                        <li>
                        provide reserve amount<label htmlFor=""> Reserve {vehicle.reserve}</label>
                        </li>

                        <li>
                        size of tires are on the vehicle <label htmlFor="">{vehicle.sizetires}</label>
                        </li>
                        <li>
                        pickOne<label htmlFor="">{vehicle.pickOne}</label>
                        </li>

                        <li>
                        brand and model of tires are currently mounted <label htmlFor="">{vehicle.brandandmodel}</label>
                        </li>
                        <li>
                          createdAt <label htmlFor="">{vehicle.created_at}</label>
                        </li>
                        <li>
                          current Amount <label htmlFor="">{vehicle.currentAmount}</label>
                        </li>
                        <li>
                          Amount on document <label htmlFor="">{vehicle.ammountOnDocument}</label>
                        </li>
                        <li>
                        amount of the document fee that you will charge buyers  <label htmlFor="">{vehicle.documentFee}</label>
                        </li>
                        {viewAll ? <div>
                        <li>
                          meter <label htmlFor="">{vehicle.km}</label>
                        </li>
                        <li>
                        your vehicle <label htmlFor="">{vehicle.make}</label>
                        </li>
                        <li>
                        model of vehicle <label htmlFor="">{vehicle.model}</label>
                        </li>
                        <li>
                          Fuel Type <label htmlFor="">{vehicle.fuel}</label>
                        </li>
                        <li>
                        current odometer reading <label htmlFor="">{vehicle.odmeter}</label>
                        </li>
                        <li>
                          engineSize <label htmlFor="">{vehicle.engineSize}</label>
                        </li>
                        <li>
                          OgEngine <label htmlFor="">{vehicle.ogEngine}</label>
                        </li>
                        <li>
                        issues or problems does it currently have <label htmlFor="">{vehicle.issuesorproblems}</label>
                        </li>
                        <li>
                        the interior upholstered in Jet Black and Light Gray leather <label htmlFor="">{vehicle.interior}</label>
                        </li>
                        <li>
                           dealer Description <label htmlFor="">{vehicle.dealerDescription}</label>
                        </li>
                        <li>
                          Dealer id: <label htmlFor="">{vehicle.dealerId}</label>
                        </li>
                        <li>
                        name of your dealership: <label htmlFor="">{vehicle.dealerName}</label>
                        </li>
                        <li>
                          Description <label htmlFor="">{vehicle.description}</label>
                        </li>
                        <li>
                          displayInAuction <label htmlFor="">{vehicle.displayInAuction}</label>
                        </li>
                        <li>
                          documentFee <label htmlFor="">{vehicle.documentFee}</label>
                        </li>
                        <li>
                          Email <label htmlFor="">{vehicle.email}</label>
                        </li>
                        <li>
                          hereFrom <label htmlFor="">{vehicle.hereFrom}</label>
                        </li>
                        <li>
                          kmacc <label htmlFor="">{vehicle.kmacc}</label>
                        </li>
                        <li>
                        provide link to the listing <label htmlFor="">{vehicle.link}</label>
                        </li>
                        <li>
                          modificationOnTrck <label htmlFor="">{vehicle.modificationOnTruck}</label>
                        </li>
                        <li>
                        modifications details<label htmlFor="">{vehicle.modificationstock}</label>
                        </li>
                        <li>
                        list and describe services performed and when they were performed <label htmlFor="">{vehicle.moreDescription}</label>
                        </li>
                        <li>
                           name <label htmlFor="">{vehicle.name}</label>
                        </li>
                        <li>
                          other <label htmlFor="">{vehicle.other}</label>
                        </li>
                        <li>
                          otherStatus <label htmlFor="">{vehicle.otherStatus}</label>
                        </li>
                        <li>
                          otherTruckTitle <label htmlFor="">{vehicle.otherTrucktitle}</label>
                        </li>
                        <li>
                        you have owned it <label htmlFor="">{vehicle.owned}</label>
                        </li>
                        <li>
                          ownerDetail <label htmlFor="">{vehicle.ownerDetail}</label>
                        </li>
                        <li>
                          pickOne <label htmlFor="">{vehicle.pickOne}</label>
                        </li>
                        <li>
                          premium <label htmlFor="">{vehicle.premium}</label>
                        </li>
                        <li>
                          reservAmount <label htmlFor="">{vehicle.reserveAmount}</label>
                        </li>
                        
                        <li>
                        rust details <label htmlFor="">{vehicle.rustDetails}</label>
                        </li>
                        <li>
                        rust present on the vehicle <label htmlFor="">{vehicle.rustpresent}</label>
                        </li>
                        <li>
                          servicesperformed <label htmlFor="">{vehicle.servicesperformed}</label>
                        </li>
                        <li>
                          sizetires <label htmlFor="">{vehicle.sizetires}</label>
                        </li>
                        <li>
                          sold <label htmlFor="">{vehicle.sold}</label>
                        </li>
                        <li>
                          state <label htmlFor="">{vehicle.state}</label>
                        </li>
                        <li>
                          stepFourImage <label htmlFor="">{vehicle.stepFourImage}</label>
                        </li>
                        <li>
                          stepOneImage <label htmlFor="">{vehicle.stepOneImage}</label>
                        </li>
                        <li>
                          stepThreeImage <label htmlFor="">{vehicle.stepThreeImage}</label>
                        </li>
                        <li>
                          stepTwoImage <label htmlFor="">{vehicle.stepTwoImage}</label>
                        </li>
                        <li>
                        vehicle title <label htmlFor="">{vehicle.title}</label>
                        </li>
                        <li>
                        status of the title <label htmlFor="">{vehicle.titleStatus}</label>
                        </li>
                        <li>
                          transmission <label htmlFor="">{vehicle.transmission}</label>
                        </li>
                        <li>
                          truckDetails <label htmlFor="">{vehicle.truckDetails}</label>
                        </li>
                        <li>
                        vehicle history, paint or bodywork <label htmlFor="">{vehicle.truckHistory}</label>
                        </li>
                        <li>
                          truckfromnew <label htmlFor="">{vehicle.truckfromnew}</label>
                        </li>
                        <li>
                          understand <label htmlFor="">{vehicle.understand}</label>
                        </li>
                        <li>
                          understandCondition <label htmlFor="">{vehicle.understandCondition}</label>
                        </li>
                        <li>
                          updatedAt <label htmlFor="">{vehicle.updated_at}</label>
                        </li>
                        <li>
                          userId <label htmlFor="">{vehicle.userId}</label>
                        </li>
                        <li>
                          View <label htmlFor="">{vehicle.View}</label>
                        </li>
                        <li>
                        year of your vehicle <label htmlFor="">{vehicle.year}</label>
                        </li>
                        <li>
                          EndTime <label htmlFor="">{vehicle.EndTime}</label>
                        </li>
                        <li>
                          accept <label htmlFor="">{vehicle.accept}</label>
                        </li>
                        <li>
                          acceptTerms <label htmlFor="">{vehicle.acceptTerms}</label>
                        </li>
                        <li>
                          Approve <label htmlFor="">{vehicle.approved}</label>
                        </li>
                        <li>
                        Auction type <label htmlFor="">{vehicle.auctionType}</label>
                        </li>
                        <li>
                          Bat <label htmlFor="">{vehicle.bat}</label>
                        </li>
                        <li>
                          Bat Description <label htmlFor="">{vehicle.batDescription}</label>
                        </li>
                        <li>
                        vehicle being sold on consignment <label htmlFor="">{vehicle.consignment}</label>
                        </li>
                        <li>
                          Detailvin <label htmlFor="">{vehicle.detailvin}</label>
                        </li>
                        <li>
                          DeletedAt <label htmlFor="">{vehicle.deleted_at}</label>
                        </li> 
                       
                        </div>:null}
                        <li>
                          <label htmlFor="">
                            Private Party or Dealer :dealer
                          </label>
                        </li>
                      </ul>
                      <div className="col-12 text-center">

            <button className="btn btn-warning " onClick={()=>setViewAll(!viewAll)} > {viewAll ?"View Less" :"View All"}</button>
            </div>    
                    
                  </div>

              </div>
              

             
            </div>
            <div className="container">
              <form  onSubmit={submitApprove}>
              <div className="col-12 w-100">
                <label>Description 1</label> <br/>

                <textarea 
                name="description1"
                value={descValue.description1}
                onChange={handleDescription}></textarea> <br/>
                <label>Description 2</label> <br/>
                <textarea 
                name="description2"
                value={descValue.description2}
                onChange={handleDescription}></textarea> <br/>
            <button className="btn btn-warning m-3" type="submit" >Approve</button>
            </div>
            </form></div>

            <div className="col-12">
             <h3>PHOTO GALLERY</h3>
             <div className="col-12">
              <div
                style={{
                  position: "absolute",
                  right: "4%",
                  cursor: "pointer",
                  top: "-8%",
                }}
              >
                <span onClick={() => slide.current.slickPrev()}>
                  <span>
                    <WestIcon />
                  </span>
                  <span>Prev</span>
                </span>
                <span
                  onClick={() => slide.current.slickNext()}
                  style={{ marginLeft: 50 }}
                >
                  <span>Next</span>
                  <span style={{ height: "100px" }}>
                    <EastIcon />
                  </span>
                </span>
              </div>

              <div
                className="fore_Slide arrowTop_Slide"
                style={{ height: "350px" }}
              >
                <Slider ref={slide} {...settings}>
                  <div>
                    <div className="card_post">
                      <div className="card_postImg">
                        <img src={img_01} alt="car_01" />
                      </div>
                     
                    </div>
                  </div>

                  <div>
                    <div className="card_post">
                      <div className="card_postImg">
                        <img src={img_01} alt="car_02" />
                      </div>
                      
                    </div>
                  </div>
                  <div>
                    <div className="card_post">
                      <div className="card_postImg">
                        <img src={img_01} alt="car_03" />
                      </div>
                      
                    </div>
                  </div>
                  <div>
                    <div className="card_post">
                      <div className="card_postImg">
                        <img src={img_01} alt="car_04" />
                      </div>
                      
                    </div>
                  </div>
                  <div>
                    <div className="card_post">
                      <div className="card_postImg">
                        <img src={img_01} alt="car_01" />
                      </div>
                      
                    </div>
                  </div>
                  <div>
                    <div className="card_post">
                      <div className="card_postImg">
                        <img src={img_01} alt="car_02" />
                      </div>
                      
                    </div>
                  </div>
                  <div>
                    <div className="card_post">
                      <div className="card_postImg">
                        <img src={img_01} alt="car_03" />
                      </div>
                      
                    </div>
                  </div>
                  <div>
                    <div className="card_post">
                      <div className="card_postImg">
                        <img src={img_01} alt="car_04" />
                      </div>
                     
                    </div>
                  </div>
                </Slider>
              </div>
            </div>
            </div>
           
          </div>

         
        </div>
      </section>
    </div>
  );
};

export default UserVehicleDetails;
