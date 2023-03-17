import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { noImage, strToHtml } from "../../UI/globaleVar";
import parse from "html-react-parser";

const DealerList = ({handleDealerCount}) => {
  const [dealerData, setDealerData] = useState([]);

  useEffect(() => {
    const fetchDealer = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_URL}get_all_dealers`
        );
        setDealerData([...res.data.featured_dealer]);
        handleDealerCount(res.data.featured_dealer.length)
      } catch (err) {
        console.log(err);
      }
    };
    fetchDealer();
  }, []);

  return (
    <>
      <div className="col-12 ListDealer mt-50">
        <div className="row  pt-4 row_gridList">
          {dealerData.length > 0 &&
            dealerData.map((curElem) => {
              return (
                <>
                  <div class="col-12 col-md-4 pb-3">
                    <div class="card_post">
                      <div class="card_postImg">
                        <Link to={`/dealerprofile/${curElem?.id}`}>
                          {curElem?.image_logo && (
                            <img
                              loading="lazy"
                              src={
                                curElem?.image_logo[0]
                                  ? `${process.env.REACT_APP_URL}/${curElem?.image_logo[0]?.logo}`
                                  : noImage
                              }
                              onError={({ currentTarget }) => {
                                currentTarget.onError = null;
                                currentTarget.src = noImage;
                              }}
                              alt={curElem?.username}
                            />
                          )}
                        </Link>
                      </div>
                      <div class="card_postInfo">
                        <h4>
                          <Link to={`/dealerprofile/${curElem?.id}`}>
                            {curElem?.title}
                          </Link>
                        </h4>
                        <ul class="labelList">
                          <li>October 14, 2022</li>
                          <li>
                            <i class="fa-solid fa-user mr-2"></i> {curElem?.name}
                          </li>
                        </ul>
                        <p>
                          {curElem?.dealerDescription &&
                            parse(
                              curElem?.dealerDescription?.substr(0, 125),
                              strToHtml
                            )}
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default DealerList;
