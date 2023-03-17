import React from "react";
import { Link } from "react-router-dom";
import { noImage, strToHtml } from "../../UI/globaleVar";
import parse from "html-react-parser";

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
                        curElem.image_banner[0]
                          ? `${process.env.REACT_APP_URL}/${curElem.image_banner[0].imagePath}/${curElem.image_banner[0].imageName}`
                          : noImage
                      }
                      onError={({ currentTarget }) => {
                        currentTarget.onError = null;
                        currentTarget.src = noImage;
                      }}
                      alt="Maskgroup1"
                    />
                  </>
                ) : (
                  <>
                    <img loading="lazy" src={noImage} alt="Maskgroup1" />
                  </>
                )}
              </Link>
            </div>
          </div>
          <div className="card_postInfo">
            <h4 className="car_title">
              <Link to={`/detail/${curElem.id}`}>{curElem.make}</Link>

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
              {curElem?.moreDescription &&
                parse(curElem?.moreDescription?.substr(0, 300), strToHtml)}
            </p>

            <ul
              className="labelList"
              style={{
                display: "flex",
                justifyContent: "flex-start",
              }}
            >
              <li className="w-auto">
                {curElem?.currentBid && curElem?.currentBid?.last_bid > 0 && (
                  <span>
                    <label>
                      Current Bid : ${curElem?.currentBid?.last_bid}
                    </label>
                  </span>
                )}
              </li>
              <li>
                <label>Ends In:</label>{" "}
                <span>{new Date(curElem.EndTime).toLocaleDateString()}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Data;
