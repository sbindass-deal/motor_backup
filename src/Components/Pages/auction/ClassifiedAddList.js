import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { strToHtml } from "../../UI/globaleVar";
import parse from "html-react-parser";
import Data from "./Data";

function ClassifiedAddList() {
  const [userInfo, setUserinfo] = useState({});
  const [dealer, setDealer] = useState([]);
  const [classifiedAds, setClassifiedAds] = useState([]);
  const [addName, setAddName] = useState("All");
  useEffect(() => {
    axios.get(process.env.REACT_APP_URL + `user`).then((res) => {
      if (res.data.data) {
        setUserinfo(res.data.data);
      } else {
        setUserinfo(userInfo);
      }
    });
  }, []);
  useEffect(() => {
    const fetchClassifiedAd = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_URL}classified_vehicle`
        );
        setClassifiedAds(res.data.data.classified_Vehicles);
        setDealer(res.data.data.dealers);
      } catch (err) {
        console.log(err);
      }
    };
    fetchClassifiedAd();
  }, []);

  const handleDealerVehicle = async (dealerId, name) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_URL}classifiedByDealerId/${dealerId}`
      );
      setClassifiedAds(res.data.data.classified_Vehicles);
    } catch (err) {
      console.log(err);
    }
    setAddName(name);
  };

  return (
    <div>
      <section className="ptb_80 pt_sm_50">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-4 col-lg-3">
              <div className="card_Gray mb-5 mb-md-0 divSticky">
                <h5>Dealer Name</h5>
                <hr />
                <ul className="sideBar__">
                  <li onClick={() => window.location.reload(false)}>
                    <span style={{ cursor: "pointer" }}>All</span>
                  </li>
                  {dealer?.map((curElem, i) => {
                    return (
                      <li
                        onClick={() =>
                          handleDealerVehicle(curElem?.id, curElem?.name)
                        }
                        key={curElem?.id}
                      >
                        <span style={{ cursor: "pointer" }}>
                          {curElem?.name}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

            <div className="col-12 col-md-8 col-lg-9">
              <h3 className="p-15">{addName}</h3>
              <hr />
              <div className="row pt-4 row_gridList ">
                {classifiedAds?.length > 0 &&
                  classifiedAds?.map((curElem, i) => {
                    return (
                      <div
                        key={curElem.id}
                        className="col-12 col-md-4 pb-3 charityOct"
                      >
                        <div className="card_post">
                          <div className="card_postImg">
                            <Link
                              to={`/detail/${curElem.id}`}
                              className="card_postImg card_postImg_200"
                            >
                              {curElem.stepOneImage ? (
                                <img
                                  loading="lazy"
                                  src={
                                    curElem.stepOneImage &&
                                    `${process.env.REACT_APP_URL}/${curElem.stepOneImage}`
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
                                  loading="lazy"
                                  src="http://www.freeiconspng.com/uploads/no-image-icon-11.PNG"
                                  alt="Maskgroup1"
                                />
                              )}
                            </Link>
                          </div>
                          <div className="card_postInfo">
                            <h4 className="auction_heading header_size">
                              <a
                                target="_blank"
                                rel="noopener"
                                href={curElem.externalLink}
                              >
                                {curElem.make} {curElem.model} {curElem.year}
                              </a>
                            </h4>

                            <ul>
                              <li>
                                <span className="">
                                  {curElem?.moreDescription &&
                                    parse(
                                      curElem?.moreDescription?.substr(0, 150) +
                                        "...",
                                      strToHtml
                                    )}
                                </span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ClassifiedAddList;
