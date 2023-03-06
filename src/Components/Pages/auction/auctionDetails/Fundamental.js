import React from "react";
import bellIcon from "../../../../Assets/images/bellIcon.svg";

const Fundamental = ({ vehicle, handleSubscribe }) => {
  return (
    <>
      <div className="box_backgroundD">
        <h3 className="cardTitle">Fundamental</h3>
        <div className="sellerBox">
          <div>
            Seller: <a href="#">{vehicle.name}</a>
            {/* <small>{vehicle.dealerId ? "Dealer" : "Private"}</small> */}
          </div>
          <a onClick={handleSubscribe}>
            <img src={bellIcon} alt="bellIcon" />
          </a>
        </div>
        <ul className="listFund">
        <li>
        Private Party or Dealer: <span>{vehicle.dealerId ? "Dealer " : "Private Party"}</span>
          </li>
          <li>
            Location: {" "}
            <span>
              <a href={`https://www.google.com/maps/place/${vehicle.country_name},${vehicle.city}`}>
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
            Engine :<span>{vehicle.fuel}</span>
          </li>
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