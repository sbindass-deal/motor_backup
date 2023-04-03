import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import caer from "../../../Assets/images/caer.gif";
import { strToHtml } from "../../UI/globaleVar";
import parse from "html-react-parser";
import { Image } from "antd";
import CarousalGarages from "./Carousel";
import Videos from "./Videos";
import GaragesAuction from "./GaragesAuction";
import DealerVehicleList from "./GaragesVehicleList";
import { Avatar, Space } from "antd";

const GaragesListDetails = () => {
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
      <CarousalGarages dealerData={dealerData} />
      <section className="pt_80 mobileSpec" id="">
        <div className="container">
          <div
            className="row "
            style={{ display: "flex", justifyContent: "center" }}
          >
            {/* <div className="col-lg-6 col-md-12 col-sm-12 logoImg">
              <img
                className="slidImg"
                src={
                  dealerData.image_logo &&
                  `${process.env.REACT_APP_URL}/${dealerData?.image_logo[0]?.logo}`
                }
                alt="aboutImg"
              />
            </div> */}
            <div
              className="col-lg-10 col-md-12 col-sm-12 bgOrange"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Link to={`/garages-user-details/${dealerData.id}`}>
                <Space direction="vertical" size={16}>
                  <Space wrap size={16}>
                    <Avatar
                      size={200}
                      icon={
                        <img
                          className="slidImg"
                          loading="lazy"
                          src={
                            dealerData?.image_logo &&
                            `${process.env.REACT_APP_URL}/${dealerData?.image_logo[0]?.logo}`
                          }
                          alt="Logo"
                        />
                      }
                    />
                  </Space>
                </Space>
              </Link>
              <div className="pl-4">
                <h3>{dealerData.name}</h3>
                <p>
                  {dealerData?.about_us &&
                    parse(dealerData?.about_us, strToHtml)}
                </p>
                <Link
                  to={`/garages-user-details/${dealerData.id}`}
                  className="btn"
                >
                  View Profile
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pt_80 mobileSpec" id="">
        <div className="container">
          <div className="row ">
            <div className="col-12 text-center pb_30">
              {/* <h2>Gallery</h2> */}
            </div>

            <div className="col-12 Videos ghhh">
              <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12">
                  <div className="row">
                    <Image.PreviewGroup>
                      {dealerData?.image_gallery &&
                        [...dealerData?.image_gallery].map((curElem, i) => {
                          return (
                            <div key={i} className="col-md-6">
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
                                  alt="Garages"
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
              <button class="btn mt-2">VIEW MORE</button>
            </div>
          </div>
        </div>
      </section>
      <section className="pt_80 mobileSpec" id="">
        <div className="container">
          <div className="row">
            <Videos data={dealerData} />
          </div>
        </div>
      </section>
      <GaragesAuction dealerName={dealerData.name} userId={id} />
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

export default GaragesListDetails;
