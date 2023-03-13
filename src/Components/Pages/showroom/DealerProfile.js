import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import DealerAuction from "./DealerAuction";
import { Link, useParams } from "react-router-dom";
import DealerVehicleList from "./DealerVehicleList";
import axios from "axios";
import { useSelector } from "react-redux";
import Carousal from "./Carousal";

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
      <DealerAuction dealerName={dealerData.name} userId={id} />
      <DealerVehicleList dealerName={dealerData.name} userId={id} />
    </>
  );
};

export default DealerProfile;
