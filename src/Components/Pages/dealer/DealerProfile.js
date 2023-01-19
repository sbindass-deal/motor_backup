import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Gallery_1 from "../../../Assets/images/g-1.png";
import Gallery_2 from "../../../Assets/images/g-2.png";
import Gallery_3 from "../../../Assets/images/g-3.png";
import Gallery_4 from "../../../Assets/images/g-4.png";
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

    const filteredImage = vehicleData.filter(
      (item) => item.userId === parseInt(id, 10)
    );
    setUserVehicleImage(filteredImage);
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
                  We help you find your dream car. Choose from our exclusive
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
                <div className="col-4 verticle">
                  <div className="galleryImgSect">
                    <img src={Gallery_1} />
                  </div>
                </div>
                <div className="col-8">
                  <div className="row">
                    <div className="col-6">
                      <div className="galleryImgSect">
                        <img src={Gallery_2} />
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="galleryImgSect">
                        <img src={Gallery_3} />
                      </div>
                    </div>
                    <div className="col-12 mt-50">
                      <div className="galleryImgSect">
                        <img src={Gallery_4} />
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
