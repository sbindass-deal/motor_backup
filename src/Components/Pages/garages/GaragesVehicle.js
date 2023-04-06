import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { noImage } from "../../UI/globaleVar";

const GaragesVehicle = ({ id }) => {
  const [garagesVehicle, setGaragesVehicle] = useState([]);
  const fetchGaragesVehicle = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_URL}garagesVehiclesByUser/${id}`
      );
      if (res.data.status === 200) {
        setGaragesVehicle(res.data.data);
      } else {
        setGaragesVehicle([]);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchGaragesVehicle();
  }, [id]);

  return (
    <>
      <section className="mobileSpec dlr">
        <div className="container">
          <div className="row ">
            <div className="col-12 col-md-8 col-lg-9">
              <div className="row pt-4 row_gridList ">
                {garagesVehicle.length > 0 ? (
                  garagesVehicle.map((curElem) => {
                    return (
                      <div
                        key={curElem.id}
                        className="col-12 col-md-4 pb-3 charityOct"
                      >
                        <div className="card_post">
                          <div className="card_postImg">
                            <Link
                              to={`/detail/${curElem.id}`}
                              className="card_postImg card_postImg_200"
                            >
                              <img
                                loading="lazy"
                                src={
                                  curElem?.image_banner &&
                                  `${process.env.REACT_APP_URL}/${curElem?.image_banner[0]?.imagePath}/${curElem?.image_banner[0]?.imageName}`
                                }
                                onError={({ currentTarget }) => {
                                  currentTarget.onError = null;
                                  currentTarget.src = noImage;
                                }}
                                alt="garages-image"
                              />
                            </Link>
                          </div>
                          <div className="card_postInfo">
                            <h4 class="car_title">
                              <Link to={`/detail/${curElem.id}`}>
                                {curElem?.make} {curElem?.model} {curElem?.year}
                              </Link>
                            </h4>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div>Add vehicle to your garage</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default GaragesVehicle;
