import React from "react";
import { Link } from "react-router-dom";
import { noImage, strToHtml, toCommas } from "../../UI/globaleVar";
import parse from "html-react-parser";
import TimeCalculate from "./TimeCalculate";

const Data = ({ curElem, addFabrity }) => {
  console.log(787878, curElem);
  return (
    <>
      <div className="col-12 col-lg-3 col-md-3 pb-3 auctionLive">
        <div className="card_post">
          <div className="card_postImg">
            <div className="list_wrapper">
              <Link className="auction_image" to={`/detail/${curElem.id}`}>
                {curElem.image_banner.length > 0 ? (
                  <>
                    {curElem.category === "auction_live" && (
                      <>
                        {curElem.auctionType === "charity" && (
                          <div class="bestSellerRgt">
                            <span class="">Charity</span>
                          </div>
                        )}
                        {curElem.auctionType === "Premium listing" && (
                          <div class="bestSellerRgt">
                            <span class="">Featured</span>
                          </div>
                        )}
                      </>
                    )}

                    <img
                      loading="lazy"
                      src={
                        curElem?.image_banner[0]
                          ? `${process.env.REACT_APP_URL}/${curElem?.image_banner[0]?.imagePath}/${curElem?.image_banner[0]?.imageName}`
                          : noImage
                      }
                      onError={({ currentTarget }) => {
                        currentTarget.onError = null;
                        currentTarget.src = noImage;
                      }}
                      alt={curElem.make}
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
              <Link to={`/detail/${curElem?.id}`}>
                {curElem?.reserve === "No" ? "No Reserve :" : null}{" "}
                {curElem?.make + " " + curElem?.model + " " + curElem?.year}
              </Link>

              <button
                onClick={() => addFabrity(curElem?.id)}
                type="button"
                className="watchedIc"
              >
                <i
                  className={`fa-solid fa-star  ${
                    curElem.like >= 1 ? "faList" : ""
                  }`}
                ></i>
              </button>
            </h4>

            {/* <p className="color_grey ">
              {curElem?.moreDescription &&
                parse(curElem?.moreDescription?.substr(0, 120)+"...", strToHtml)}
            </p> */}

            <ul className="labelList btnListShap">
              <li className="w-auto">
                {curElem?.currentBid && curElem?.currentBid?.last_bid > 0 ? (
                  <span>
                    <label>
                      Current Bid : $
                      {curElem?.currentBid?.last_bid &&
                        toCommas(curElem?.currentBid?.last_bid)}
                    </label>
                  </span>
                ) : curElem?.displayInAuction === "classified" ? (
                  <span>Document fee : ${curElem?.documentFee}</span>
                ) : (
                  <label>Biding Open</label>
                )}
              </li>
              <li>
                <span>
                  <TimeCalculate endTime={new Date(curElem?.EndTime)} />
                  {/* Ends In: {new Date(curElem?.EndTime)?.toDateString()} */}
                  {/* Ends In: {curElem?.EndTime} */}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Data;
