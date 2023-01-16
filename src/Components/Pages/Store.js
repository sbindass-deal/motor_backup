import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Dealer from "./dealer/Dealer";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Inventory from "./dealer/Inventory";

const Store = () => {
  const navigate = useNavigate();
  const logingUser = useSelector((state) => state);
  const vehicleData = logingUser.vehicleReducer.showroomData;
  const [howerImage, setHowerImage] = useState({});

  const handleHowerImage = async (id = 1) => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_URL + "/vehicle-image/" + id
      );
      setHowerImage(response.data.data);
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
              <h2>Latest Bids</h2>
            </div>
            <div className="col-12 Latest_B ">
              <ul className="img_sec">
                <li>
                  <Link to="/showroom" className="img_1">
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
                    {vehicleData.length > 0 &&
                      vehicleData.slice(0, 7).map((curElem) => {
                        return (
                          <tr
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              navigate(
                                curElem.displayInAuction === "Yes"
                                  ? `/detail/${curElem.id}`
                                  : `/showroom/${curElem.id}`
                              );
                            }}
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

      <Inventory />
    </>
  );
};

export default Store;
