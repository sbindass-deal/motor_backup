import React from "react";
import { Link } from "react-router-dom";

const Data = ({ curElem, addFabrity }) => {
  return (
    <>
      <div className="col-12 col-lg-6 col-md-6 pb-3 auctionLive">
        <div className="card_post">
          <div className="card_postImg">
            <div className="list_wrapper">
              <Link className="auction_image" to={`/detail/${curElem.id}`}>
                {curElem.image_banner.length > 0 ? (
                  <>
                    <img
                      loading="lazy"
                      src={
                        curElem.image_banner[0] &&
                        `${process.env.REACT_APP_URL}/${curElem.image_banner[0].imagePath}/${curElem.image_banner[0].imageName}`
                      }
                      onError={({ currentTarget }) => {
                        currentTarget.onError = null;
                        currentTarget.src =
                          "http://www.freeiconspng.com/uploads/no-image-icon-11.PNG";
                      }}
                      alt="Maskgroup1"
                    />
                  </>
                ) : (
                  <>
                    <img
                      loading="lazy"
                      src="http://www.freeiconspng.com/uploads/no-image-icon-11.PNG"
                      alt="Maskgroup1"
                    />
                  </>
                )}
              </Link>
            </div>
          </div>
          <div className="card_postInfo">
            <h4 className="car_title">
              <Link to={`/detail/${curElem.id}`}>
                {curElem.make} {curElem.model}-{curElem.year}-{curElem.odmeter}
              </Link>

              <button
                onClick={() => addFabrity(curElem.id)}
                type="button"
                className="watchedIc"
              >
                <i
                  className={`fa-solid fa-star ${
                    curElem.like >= 1 ? "faList" : ""
                  }`}
                ></i>
              </button>
            </h4>
            <p className="color_grey">
              {curElem?.moreDescription.substr(0, 123)}
            </p>

            <ul
              className="labelList"
              style={{
                display: "flex",
                justifyContent: "flex-start",
              }}
            >
              <li className="w-auto">
                {curElem.currentAmount ? (
                  <span>
                    <label>Current&nbsp;Bid :</label>
                    <span className="px-1">
                      ${curElem.currentAmount.auctionAmmount}
                    </span>
                  </span>
                ) : curElem.documentFee ? (
                  <span>
                    <label>Current Bid : ${curElem.documentFee}</label>
                  </span>
                ) : null}
              </li>
              <li>
                <label>Ends In:</label>{" "}
                <span>{new Date(curElem.EndTime).toLocaleTimeString()}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Data;
