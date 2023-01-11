import React from "react";
import { Link } from "react-router-dom";
import Dealer from "./dealer/Dealer";
import Img_01 from "../../Assets/images/img_01.jpg";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const Store = () => {
  const logingUser = useSelector((state) => state);
  const vehicleData = logingUser.vehicleReducer.showroomData;
  const [howerImage, setHowerImage] = useState({});

  const handleHowerImage = async (id = 1) => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_URL + "/vehicle-image/" + id
      );
      setHowerImage(response.data.data);
      console.log(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    handleHowerImage();
  }, []);

  return (
    <>
      <Dealer />

      <section className="pt_80 mobileSpec" id="">
        <div className="container">
          <div className="row ">
            <div className="col-12 text-center pb_30">
              <h2>Just In Showroom!</h2>
            </div>
            <div className="col-12 Latest_B ">
              <ul className="img_sec">
                <li>
                  <Link to="/showroom" className="img_1">
                    {/* <img src={Img_01} /> */}

                    <img
                      src={
                        process.env.REACT_APP_URL +
                        "/" +
                        howerImage.imagePath +
                        "/" +
                        howerImage.imageName
                      }
                      onError={({ currentTarget }) => {
                        currentTarget.onerror = null;
                        currentTarget.src =
                          "http://www.freeiconspng.com/uploads/no-image-icon-11.PNG";
                      }}
                      alt={howerImage.make}
                    />
                  </Link>
                </li>
              </ul>

              <div className="infoCar">
                <div className="table-responsive">
                  <table className="" width={"100%"}>
                    {vehicleData &&
                      vehicleData.slice(0, 7).map((curElem) => {
                        return (
                          <tr
                            style={{ cursor: "pointer" }}
                            // onMouseOver={() => handleHowerImage(curElem.id)}
                            key={curElem.id}
                          >
                            <td>
                              {curElem.make}
                              {curElem.modal}
                              {curElem.year}
                            </td>
                            <td>${curElem.documentFee}</td>
                            <td>3 days</td>
                          </tr>
                        );
                      })}
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="col-12 text-center pt_80 pb_30">
        <h2>More Inventory</h2>
      </div>

      <section className="pt_40">
        <div className="container">
          <div className="row">
            {vehicleData.map((curElem) => {
              return (
                <div className="col-12 col-md-6 col-lg-4" key={curElem.id}>
                  <div className="card_post store auction">
                    {curElem.displayInAuction === "Yes" ? (
                      <p className="forOction">For Auction</p>
                    ) : curElem.displayInAuction === "classified" ? (
                      <p className="forOction">Ad</p>
                    ) : null}

                    {curElem.displayInAuction === "classified" ? (
                      <a
                        target="_blank"
                        rel="noopener"
                        href={curElem.externalLink}
                        className="card_postImg card_postImg_200"
                      >
                        <img
                          src={process.env.REACT_APP_URL + curElem.stepOneImage}
                          onError={({ currentTarget }) => {
                            currentTarget.onerror = null;
                            currentTarget.src =
                              "http://www.freeiconspng.com/uploads/no-image-icon-11.PNG";
                          }}
                          alt={curElem.make}
                        />
                      </a>
                    ) : (
                      <Link
                        to={
                          curElem.displayInAuction === "Yes"
                            ? `/detail/${curElem.id}`
                            : `/showroom/${curElem.id}`
                        }
                        className="card_postImg card_postImg_200"
                      >
                        <img
                          src={process.env.REACT_APP_URL + curElem.stepOneImage}
                          onError={({ currentTarget }) => {
                            currentTarget.onerror = null;
                            currentTarget.src =
                              "http://www.freeiconspng.com/uploads/no-image-icon-11.PNG";
                          }}
                          alt={curElem.make}
                        />
                      </Link>
                    )}
                    <div className="card_postInfo pt-3">
                      <h6 className="name_price">
                        <Link
                          to={
                            curElem.displayInAuction === "Yes"
                              ? `/detail/${curElem.id}`
                              : `/showroom/${curElem.id}`
                          }
                        >
                          {curElem.make} {curElem.model} {curElem.year}
                        </Link>
                        <p className="price__">${curElem.documentFee}</p>
                      </h6>
                      <table className="showroomCol">
                        <tbody>
                          <tr>
                            <td>Odometer Reading </td>
                            <td>{curElem.odmeter}</td>
                          </tr>
                          <tr>
                            <td>Fuel Type</td>
                            <td>{curElem.fuel}</td>
                          </tr>
                          <tr>
                            <td>Seller</td>
                            <td>{curElem.name}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default Store;
