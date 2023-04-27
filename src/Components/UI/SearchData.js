import React, { useState } from "react";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Link } from "react-router-dom";

const SearchData = ({ curElem }) => {
  const [vehicleBaill, setVehicleBaill] = useState(false);

  return (
    <>
      <div className="col-12 col-md-6 col-lg-3" key={curElem.id}>
        <div className="card_post SearchResult auction">
          {curElem.displayInAuction === "Yes" ? (
            <div class="bestSellerRgt Featured">
              <span class="">For Auction</span>
            </div>
          ) : null}
          {vehicleBaill ? (
            <div
              onClick={() => setVehicleBaill(!vehicleBaill)}
              className="notiFicIcon"
            >
              <NotificationsIcon />
            </div>
          ) : (
            <div
              onClick={() => setVehicleBaill(!vehicleBaill)}
              className="notiFicIcon"
            >
              <NotificationsNoneIcon />
            </div>
          )}

          <Link
            to={
              curElem.displayInAuction === "Yes"
                ? `/detail/${curElem.id}`
                : `/showroom/${curElem.id}`
            }
            className="card_postImg card_postImg_200"
          >
            {curElem?.image_banner && (
              <img
                src={
                  process.env.REACT_APP_URL +
                  `${curElem?.image_banner[0]?.imagePath}${curElem?.image_banner[0]?.imageName}`
                }
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null;
                  currentTarget.src =
                    "http://www.freeiconspng.com/uploads/no-image-icon-11.PNG";
                }}
                alt={curElem.make}
              />
            )}
          </Link>
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
            </h6>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchData;
