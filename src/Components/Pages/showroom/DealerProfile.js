import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import DealerAuction from "./DealerAuction";
import { Link, useParams } from "react-router-dom";
import DealerVehicleList from "./DealerVehicleList";
import axios from "axios";
import { useSelector } from "react-redux";
import Carousal from "./Carousal";
import Dabout from "../../../Assets/images/Dabout.jpg"
import caer from "../../../Assets/images/caer.gif"

const DealerProfile = () => {
  const { id } = useParams();
  const logingUser = useSelector((state) => state);
  const vehicleData = logingUser.vehicleReducer.vehicleData;

  const [dealerData, setDealerData] = useState({});
  const [userVehicleImage, setUserVehicleImage] = useState([]);

  useEffect(() => {
    const fetchDealer = async () => {
      axios
        .post(`${process.env.REACT_APP_URL}getuserDetailById`, {
          id,
        })
        .then(function (response) {
          if (response.data.data) {
            setDealerData({ ...response.data.data[0] });
          } else {
            setDealerData({});
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    fetchDealer();

    // const vehicleDataAfterFilter = vehicleData
    //   .filter((item) => item.userId === parseInt(id, 10))
    //   .map((data) => data);
    // let initialState = [];
    // vehicleDataAfterFilter.map((data) => {
    //   initialState = [...data.images, ...initialState];
    // });

    // setUserVehicleImage(initialState);
  }, [id]);

  return (
    <>
      <Carousal dealerData={dealerData} />

      <section className="pt_80 mobileSpec" id="">
        <div className="container">
          <div className="row ">
            <div className="col-12 text-center pb_30">
              <h2>Gallery</h2>
            </div>
            <div className="col-12 gallery">
              <div className="row">
                {/* <div className="col-lg-4 col-mg-6 col-sm-12 verticle">
                  <div className="galleryImgSect">
                    <img
                      src={
                        userVehicleImage[0] &&
                        `${process.env.REACT_APP_URL}/${userVehicleImage[0].imagePath}/${userVehicleImage[0].imageName}`
                      }
                      onError={({ currentTarget }) => {
                        currentTarget.onError = null;
                        currentTarget.src =
                          "http://www.freeiconspng.com/uploads/no-image-icon-11.PNG";
                      }}
                      alt="Maskgroup1"
                    />
                  </div>
                </div> */}
                <div className="col-lg-8 col-md-8 col-sm-12">
                  <div className="row">
                    {dealerData?.image_gallery &&
                      dealerData?.image_gallery.map((curElem, i) => {
                        return (
                          <div key={i} className="col-6 col-md-6 col-sm-12">
                            <div className="galleryImgSect">
                              <img
                                src={
                                  curElem.logo &&
                                  `${process.env.REACT_APP_URL}/${curElem.logo}`
                                }
                                onError={({ currentTarget }) => {
                                  currentTarget.onError = null;
                                  currentTarget.src =
                                    "http://www.freeiconspng.com/uploads/no-image-icon-11.PNG";
                                }}
                                alt="Maskgroup1"
                              />
                            </div>
                          </div>
                        );
                      })}

                    {/* <div className="col-6 col-md-6 col-sm-12">
                      <div className="galleryImgSect">
                        <img
                          src={
                            userVehicleImage[2] &&
                            `${process.env.REACT_APP_URL}/${userVehicleImage[2].imagePath}/${userVehicleImage[2].imageName}`
                          }
                          onError={({ currentTarget }) => {
                            currentTarget.onError = null;
                            currentTarget.src =
                              "http://www.freeiconspng.com/uploads/no-image-icon-11.PNG";
                          }}
                          alt="Maskgroup1"
                        />
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>

            <div
              className="col-12"
              style={{ textAlign: "center", margin: "20px auto" }}
            >
              <Link class="btn mt-2" t0="">
                VIEW MORE
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="pt_80 mobileSpec" id="">
        <div className="container">
          <div className="row ">
              <div className="col-lg-6 col-md-6 col-sm-12" style={{padding: "0"}}>
                <img src={Dabout} alt="aboutImg"/>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12 bgOrange">
                 
                    <h3>About Us</h3>
                    <p>
                    For nearly 20 years, residents throughout the local area have turned to Car Repair for all of their automotive repair needs. With free estimates and 
fast turnaround, we are known for our personal service and expertise in all forms of specialized engine repair. We use the latest and most modern 
diagnostic technology to have you back in your car.

                    </p>
                    <button className="btn">View More</button>
                  
              </div>
          </div>
        </div>
      </section>
      <DealerAuction dealerName={dealerData.name} userId={id} />
      <DealerVehicleList dealerName={dealerData.name} userId={id} />
      <section className="pt_80 mobileSpec contactD" id="">
        <div className="container">
          <div className="row ">
            <div className="col-6">
              <img src={caer}/>
            </div>
            <div className="col-6 ">
              <div className="contactInfo">
              <h2>CONTACTS US</h2>
              <ul>
                <li><i class="fa-solid fa-location-dot"></i> ADDRESS:</li>
                <li>4578 MARMORA ROAD, GLASGOW D04 89GR</li>
                </ul>
                <ul>
                <li><i class="fa-solid fa-phone"></i> NUMBER:</li>
                <li>800-2345-6789</li>
              </ul>
              </div>
            
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DealerProfile;
