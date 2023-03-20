import React from "react";
import { Link } from "react-router-dom";

const Data = ({ curElem }) => {
  return (
    <>
      <div key={curElem?.id} className="col-lg-6 col-sm-12 inner-slider drl">
        {curElem?.displayInAuction === "classified" ? (
          <a target="_blank" rel="noopener" href={curElem?.externalLink}>
            <div className="card_post">
              <div className="card_postImg dlr">
                {curElem?.image_banner ? (
                  <img
                    src={
                      curElem?.image_banner[0] &&
                      `${process.env.REACT_APP_URL}/${curElem?.image_banner[0].imagePath}/${curElem?.image_banner[0].imageName}`
                    }
                    onError={({ currentTarget }) => {
                      currentTarget.onError = null;
                      currentTarget.src =
                        "http://www.freeiconspng.com/uploads/no-image-icon-11.PNG";
                    }}
                    alt="Maskgroup1"
                  />
                ) : (
                  <img
                    src="http://www.freeiconspng.com/uploads/no-image-icon-11.PNG"
                    alt="Maskgroup1"
                  />
                )}
              </div>
              <div className="card_postInfo">
                <h5>
                  {curElem?.make} &nbsp;
                  {curElem?.model} &nbsp;
                  {curElem?.year}
                </h5>

                <ul className="labelList">
                  <li>
                    <label>Current Bid:</label>{" "}
                    <span>
                      $
                      {curElem?.currentAmount
                        ? curElem?.currentAmount.auctionAmmount
                        : 0}
                    </span>
                  </li>
                  <li>
                    <label>Ends In:</label>{" "}
                    <span>
                      {curElem?.EndTime &&
                        new Date(curElem.EndTime).toDateString()}
                    </span>
                  </li>
                </ul>
                <button className="btn bidnW">
                  Bid now <i class="fa-solid fa-arrow-right"></i>
                </button>
              </div>
            </div>
            <small>
              {curElem?.displayInAuction === "Yes"
                ? "For Auction"
                : curElem?.displayInAuction === "classified"
                ? "Guzzlrs AD"
                : null}
            </small>
          </a>
        ) : (
          <Link
            to={
              curElem?.displayInAuction === "Yes"
                ? `/detail/${curElem?.id}`
                : `/showroom/${curElem?.id}`
            }
          >
            <div className="card_post">
              <div className="card_postImg dlr">
                {curElem?.image_banner ? (
                  <img
                    src={
                      curElem?.image_banner[0] &&
                      `${process.env.REACT_APP_URL}/${curElem?.image_banner[0].imagePath}/${curElem?.image_banner[0].imageName}`
                    }
                    onError={({ currentTarget }) => {
                      currentTarget.onError = null;
                      currentTarget.src =
                        "http://www.freeiconspng.com/uploads/no-image-icon-11.PNG";
                    }}
                    alt="Maskgroup1"
                  />
                ) : (
                  <img
                    src="http://www.freeiconspng.com/uploads/no-image-icon-11.PNG"
                    alt="Maskgroup1"
                  />
                )}
              </div>
              <div className="card_postInfo">
                <h5>
                  {curElem?.make} &nbsp;
                  {curElem?.model} &nbsp;
                  {curElem?.year}
                </h5>

                <ul className="labelList">
                  <li>
                    <label>Current Bid:</label>{" "}
                    <span>
                      $
                      {curElem?.currentAmount
                        ? curElem?.currentAmount.auctionAmmount
                        : 0}
                    </span>
                  </li>
                  <li>
                    <label>Ends In:</label>{" "}
                    <span>
                      {curElem?.EndTime &&
                        new Date(curElem.EndTime).toDateString()}
                    </span>
                  </li>
                </ul>
                <button className="btn bidnW">
                  Bid now <i class="fa-solid fa-arrow-right"></i>
                </button>
              </div>
            </div>
            <small>
              {curElem?.displayInAuction === "Yes"
                ? "For Auction"
                : curElem?.displayInAuction === "classified"
                ? "Guzzlrs AD"
                : null}
            </small>
          </Link>
        )}
      </div>
    </>
  );
};

export default Data;
