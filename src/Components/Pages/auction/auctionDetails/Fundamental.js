import React from "react";
import bellIcon from "../../../../Assets/images/bellIcon.svg";
import { Link } from "react-router-dom";

const Fundamental = ({ vehicle, handleSubscribe }) => {
  return (
    <>
      <div className="box_backgroundD">
        <h3 className="cardTitle">Fundamental</h3>
        <div className="sellerBox">
          <div>
            Seller:{" "}
            {vehicle.dealer == "No" ? (
              <Link to={`/garages-user-details/${vehicle.userId}`}>
                {vehicle.name}
              </Link>
            ) : (
              <Link to="">{vehicle.name}</Link>
            )}
            {/* <small>{vehicle.dealerId ? "Dealer" : "Private"}</small> */}
          </div>
          {/* subscribed_to_seller */}
          <a onClick={handleSubscribe}>
            <img
              style={{
                backgroundColor: `${
                  vehicle.subscribed_to_seller == 1 ? "gray" : ""
                }`,
                cursor: "pointer",
              }}
              src={bellIcon}
              alt="bellIcon"
            />
          </a>
        </div>
        <ul className="listFund">
          <li>
            Private Party or Dealer:{" "}
            <span>{vehicle.dealer == "No" ? "Private Party" : "Dealer "}</span>
          </li>
          <li>
            Location:{" "}
            <span>
              <a
                target="_blank"
                href={`https://www.google.com/maps/place/${vehicle.country_name},${vehicle.city}`}
              >
                {vehicle.country_name} , {vehicle.city}
              </a>
            </span>
          </li>
          <li>
            VIN/ID: <span>{vehicle.detailvin}</span>
          </li>
          {/* <li>
            Lot: <span>#</span>
          </li> */}
          <li>
            Miles: <span>{vehicle.odmeter} Miles Shown, TMU</span>
          </li>
          <li>
            Engine : <span>{vehicle.fuel}</span>
          </li>
          {vehicle.displayInAuction === "classified" && (
            <li>
              Document fee : <span>{vehicle.documentFee}</span>
            </li>
          )}
          {/* <li>
            Transmission: <span>#NA</span>
          </li> */}
          {/* <li>
            Brakes: <span>#NA</span>
          </li> */}
          {/* <li>
            Differential: <span>#NA</span>
          </li> */}
          {/* <li>
            Special Modifications: <span>#NA</span>
          </li> */}
        </ul>
      </div>
    </>
  );
};

export default Fundamental;
