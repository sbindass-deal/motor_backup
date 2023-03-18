import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import DealerAuction from "./DealerAuction";
import { Link, useParams } from "react-router-dom";
import DealerVehicleList from "./DealerVehicleList";
import axios from "axios";
import { useSelector } from "react-redux";
import Carousal from "./Carousal";
import Dabout from "../../../Assets/images/Dabout.jpg";
import caer from "../../../Assets/images/caer.gif";
import { strToHtml } from "../../UI/globaleVar";
import parse from "html-react-parser";
import { Image } from "antd";
import Dealer from "../../../Assets/images/Dealer-1.jpg";
import Dealer2 from "../../../Assets/images/Dealer-2.jpg";
import Dealer3 from "../../../Assets/images/Dealer-3.jpg";

const DealerProfile = () => {
  const { id } = useParams();
  const logingUser = useSelector((state) => state);
  const vehicleData = logingUser.vehicleReducer.vehicleData;

  const [dealerData, setDealerData] = useState({});
  const [userVehicleImage, setUserVehicleImage] = useState([]);
  const [showMore, setShowMore] = useState(false);

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
            {dealerData?.image_gallery && (
              <div className="col-lg-12">
                <div className="row showGallery">
                  <div className="col-lg-5 col-sm-12">
                    <Image.PreviewGroup>
                      <Image
                        loading="lazy"
                        src={
                          dealerData?.image_gallery[0]?.logo &&
                          `${process.env.REACT_APP_URL}/${dealerData?.image_gallery[0]?.logo}`
                        }
                        onError={({ currentTarget }) => {
                          currentTarget.onError = null;
                          currentTarget.src =
                            "http://www.freeiconspng.com/uploads/no-image-icon-11.PNG";
                        }}
                        alt="gallery"
                      />
                    </Image.PreviewGroup>
                  </div>
                  <div className="col-lg-7 col-sm-12">
                    <div className="row">
                      <div className="col-lg-6 col-sm-12">
                        <Image.PreviewGroup>
                          <Image
                            loading="lazy"
                            src={
                              dealerData?.image_gallery[1]?.logo &&
                              `${process.env.REACT_APP_URL}/${dealerData?.image_gallery[1]?.logo}`
                            }
                            onError={({ currentTarget }) => {
                              currentTarget.onError = null;
                              currentTarget.src =
                                "http://www.freeiconspng.com/uploads/no-image-icon-11.PNG";
                            }}
                            alt="gallery"
                          />
                        </Image.PreviewGroup>
                      </div>
                      <div className="col-lg-6 col-sm-12">
                        <Image.PreviewGroup>
                          <Image
                            loading="lazy"
                            src={
                              dealerData?.image_gallery[2]?.logo &&
                              `${process.env.REACT_APP_URL}/${dealerData?.image_gallery[2]?.logo}`
                            }
                            onError={({ currentTarget }) => {
                              currentTarget.onError = null;
                              currentTarget.src =
                                "http://www.freeiconspng.com/uploads/no-image-icon-11.PNG";
                            }}
                            alt="gallery"
                          />
                        </Image.PreviewGroup>
                      </div>
                      <div className="col-lg-12">
                        <Image.PreviewGroup>
                          <Image
                            loading="lazy"
                            src={
                              dealerData?.image_gallery[3]?.logo &&
                              `${process.env.REACT_APP_URL}/${dealerData?.image_gallery[3]?.logo}`
                            }
                            onError={({ currentTarget }) => {
                              currentTarget.onError = null;
                              currentTarget.src =
                                "http://www.freeiconspng.com/uploads/no-image-icon-11.PNG";
                            }}
                            alt="gallery"
                          />
                        </Image.PreviewGroup>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className="col-12 gallery ghhh">
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
                <div className="col-lg-12 col-md-12 col-sm-12">
                  <div
                    className="row"
                    style={{
                      height: `${showMore ? "100%" : "0px"}`,
                      overflow: "hidden",
                    }}
                  >
                    <Image.PreviewGroup>
                      {dealerData?.image_gallery &&
                        dealerData?.image_gallery.map((curElem, i) => {
                          return (
                            <div key={i} className="col-6 col-md-2">
                              <div className="galleryImgSect gg">
                                <Image
                                  loading="lazy"
                                  src={
                                    curElem?.logo &&
                                    `${process.env.REACT_APP_URL}/${curElem?.logo}`
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
                    </Image.PreviewGroup>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="col-12"
              style={{ textAlign: "center", margin: "20px auto" }}
            >
              <button onClick={() => setShowMore(!showMore)} class="btn mt-2">
                {!showMore ? "VIEW MORE" : "VIEW LESS"}
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className="pt_80 mobileSpec" id="">
        <div className="container">
          <div className="row ">
            <div className="col-lg-6 col-md-12 col-sm-12 logoImg">
              <img
                className="slidImg"
                src={
                  dealerData.image_logo &&
                  `${process.env.REACT_APP_URL}/${dealerData?.image_logo[0]?.logo}`
                }
                alt="aboutImg"
              />
            </div>
            <div className="col-lg-6 col-md-12 col-sm-12 bgOrange">
              <h3>About Us</h3>
              <p>
                {dealerData?.about_us && parse(dealerData?.about_us, strToHtml)}
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
            <div className="col-lg-6 col-md-6 col-sm-12">
              <img src={caer} />
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12">
              <div className="contactInfo">
                <h2>Contact Us</h2>
                <ul>
                  <li>
                    <i class="fa-solid fa-location-dot"></i> ADDRESS:
                  </li>
                  <li>4578 MARMORA ROAD, GLASGOW D04 89GR</li>
                </ul>
                <ul>
                  <li>
                    <i class="fa-solid fa-phone"></i> NUMBER:
                  </li>
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
