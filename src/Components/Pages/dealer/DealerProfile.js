import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import DealerAuction from "./DealerAuction";
import { Link, useParams } from "react-router-dom";
import DealerVehicleList from "./DealerVehicleList";
import axios from "axios";
import { useSelector } from "react-redux";

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
            setDealerData(response.data.data);
          } else {
            setDealerData({});
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    fetchDealer();

    const vehicleDataAfterFilter = vehicleData
      .filter((item) => item.userId === parseInt(id, 10))
      .map((data) => data);

    // create image array
    let initialState = [];
    vehicleDataAfterFilter.map((data) => {
      initialState = [...data.images, ...initialState];
    });

    setUserVehicleImage(initialState);
  }, []);

  return (
    <>
      <section className="storeHeroSection dealer detail align-items-center">
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-12">
              <div className="heroText">
                <h1>{dealerData.name}</h1>
                <h5>
                  We help you find your dream car. Select from our exclusive
                  <br /> list of showrooms.
                </h5>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pt_80 mobileSpec" id="">
        <div className="container">
          <div className="row ">
            <div className="col-12 text-center pb_30">
              <h2>Gallery</h2>
            </div>
            <div className="col-12 gallery">
              <div className="row">
                <div className="col-lg-4 col-mg-6 col-sm-12 verticle">
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
                </div>
                <div className="col-lg-8 col-md-8 col-sm-12">
                  <div className="row">
                    <div className="col-6 col-md-6 col-sm-12">
                      <div className="galleryImgSect">
                        <img
                          src={
                            userVehicleImage[1] &&
                            `${process.env.REACT_APP_URL}/${userVehicleImage[1].imagePath}/${userVehicleImage[1].imageName}`
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
                    <div className="col-6 col-md-6 col-sm-12">
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
                    </div>
                    <div className="col-lg-12 col-md-12  mt-50">
                      <div className="galleryImgSect">
                        <img
                          src={
                            userVehicleImage[3] &&
                            `${process.env.REACT_APP_URL}/${userVehicleImage[3].imagePath}/${userVehicleImage[3].imageName}`
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
      <DealerAuction dealerName={dealerData.name} userId={id} />
      <DealerVehicleList dealerName={dealerData.name} userId={id} />
    </>
  );
};

export default DealerProfile;
