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
      <div className="row pt-4 row_gridList false">
        {garagesVehicle.length > 0 ? (
          garagesVehicle.map((curElem) => {
            return (
              <div
                key={curElem.id}
                class="col-12 col-lg-4 col-md-4 pb-3 auctionLive"
              >
                <div class="card_post">
                  <div class="card_postImg">
                    <div class="list_wrapper">
                      <Link to={`/detail/${curElem.id}`} class="auction_image">
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
                  </div>
                  <div class="card_postInfo">
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

        {/* <div class="col-12 col-lg-4 col-md-4 pb-3 auctionLive">
          <div class="card_post">
            <div class="card_postImg">
              <div class="list_wrapper">
                <a class="auction_image" href="/detail/125">
                  <img
                    loading="lazy"
                    src="https://api.GasGuzzlrs.com//./upload/vehicles//Vehicle-41309003081.webp"
                    alt="Ferrari"
                  />
                </a>
              </div>
            </div>
            <div class="card_postInfo">
              <h4 class="car_title">
                <a href="/detail/125"> Ferrari Spyder 2020</a>
              </h4>
            </div>
          </div>
        </div>
        <div class="col-12 col-lg-4 col-md-4 pb-3 auctionLive">
          <div class="card_post">
            <div class="card_postImg">
              <div class="list_wrapper">
                <a class="auction_image" href="/detail/125">
                  <img
                    loading="lazy"
                    src="https://api.GasGuzzlrs.com//./upload/vehicles//Vehicle-41309003081.webp"
                    alt="Ferrari"
                  />
                </a>
              </div>
            </div>
            <div class="card_postInfo">
              <h4 class="car_title">
                <a href="/detail/125"> Ferrari Spyder 2020</a>
              </h4>
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default GaragesVehicle;
