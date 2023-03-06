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
            <small> (Private Party or Dealer ): #NA</small>
          </div>
          <a onClick={handleSubscribe}>
            <img src={bellIcon} alt="bellIcon" />
          </a>
        </div>
        <ul className="listFund">
          <li>
            Location:{" "}
            <span>
              <a href={`https://www.google.com/maps/place/${vehicle.country}`}>
                {vehicle.country}
              </a>
            </span>
          </li>
          <li>
            VIN/ID: <span>{vehicle.detailvin}</span>
          </li>
          <li>
            Lot: <span>#NA</span>
          </li>
          <li>
            Miles: <span>{vehicle.odmeter} Miles Shown, TMU</span>
          </li>
          <li>
            Engine :<span>#NA</span>
          </li>
          <li>
            Transmission: <span>#NA</span>
          </li>
          <li>
            Brakes: <span>#NA</span>
          </li>
          <li>
            Differential: <span>#NA</span>
          </li>
          <li>
            Special Modifications: <span>#NA</span>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Fundamental;
