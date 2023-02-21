import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import rrm_logo from "../../../Assets/images/rrm-logo.png";
import txautodealer from "../../../Assets/images/txautodealer.png";
import custombanner5 from "../../../Assets/images/custombanner5.webp";
import img_01 from "../../../Assets/images/img_01.jpg";


const DealerList = () => {
  const [dealerData, setDealerData] = useState([]);

  useEffect(() => {
    const fetchDealer = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_URL}get_all_dealers`
        );
        setDealerData([...res.data.featured_dealer, ...res.data.user_dealer]);
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







          {/* <div className="col-lg-4 col-sm-12 inner-slider">
            <a
              target="_blank"
              rel="noopener"
              href="https://www.texascarsdirect.com/"
            >
              <div className="card_post">
                <div className="card_postImg dlr">
                
                  <img src={custombanner5} alt="Img_bmw" />
                </div>
                <div className="card_postInfo">
                  <h5 className="auction_heading">Texas Cars Direct   <small>AD</small></h5>
                  <p>
                    While we are happy to welcome you to our newly remodeled and
                    distanced showroom-We are also providing additional safety
                    measures to keep us all safe...from safely signing digital
                    paperwork via email to delivering your vehicle right to your
                    home or work!
                  </p>
                </div>
              </div>
            </a>
          </div> */}

          {/* <div className="col-lg-4 col-sm-12 inner-slider">
            <a
              target="_blank"
              rel="noopener"
              href="https://www.txautodealer.com/"
            >
              <div className="card_post">
                <div className="card_postImg dlr">
                  <small>AD</small>
                  <img src={txautodealer} alt="Img_bmw" />
                </div>
                <div className="card_postInfo">
                  <h5>Txauto Dealer</h5>
                  <p>
                    While we are happy to welcome you to our newly remodeled and
                    distanced showroom-We are also providing additional safety
                    measures to keep us all safe...from safely signing digital
                    paperwork via email to delivering your vehicle right to your
                    home or work!
                  </p>
                </div>
              </div>
            </a>
          </div>
          <div className="col-lg-4 col-sm-12 inner-slider">
            <a
              target="_blank"
              rel="noopener"
              href="https://www.ruizranchmotors.com/"
            >
              <div className="card_post">
                <div className="card_postImg dlr">
                  <small>AD</small>
                  <img src={rrm_logo} alt="Img_bmw" />
                </div>
                <div className="card_postInfo">
                  <h5>Ruiz Ranch Dealer</h5>
                  <p>
                    While we are happy to welcome you to our newly remodeled and
                    distanced showroom-We are also providing additional safety
                    measures to keep us all safe...from safely signing digital
                    paperwork via email to delivering your vehicle right to your
                    home or work!
                  </p>
                </div>
              </div>
            </a>
          </div> */}
          {dealerData.length > 0 &&
            dealerData.map((curElem) => {
              return (
                <>
 

                  <div class="col-12 col-md-6 col-lg-4 pb-3">
                    
                    <Link to={`/dealerprofile/${curElem.id}`}>

                      {
                        curElem.image && (
                          <>
                            <div class="card_post">
                              <div class="card_postImg">
                                <div class="card_postImg_labe">ADS</div>
                                {/* <button type="button" class="watchedIc"><i class="fa-solid fa-star"></i></button> */}
                                <img
                                  loading="lazy"
                                  src={
                                    curElem.image[0] &&
                                    `${process.env.REACT_APP_URL}/${curElem.image[0]?.logo}`
                                  }
                                  onError={({ currentTarget }) => {
                                    currentTarget.onError = null;
                                    currentTarget.src =
                                      "http://www.freeiconspng.com/uploads/no-image-icon-11.PNG";
                                  }}
                                  alt={curElem.name}
                                />
                              </div>
                              <div class="card_postInfo">
                                <h4><a href="detail.html">{curElem.title}</a></h4>
                               
                                {/* <ul class="labelList priceDateList">
                                  <li class="price__"><span>$126,888</span></li>
                                  <li class="Date__"><label><i class="fa-solid fa-clock"></i></label> <span>5 days</span></li>
                                </ul> */}
                              </div>
                            </div>
                          </>
                        )
                      }

                     
                    </Link>

      
      </div>
                
                


                
                
                {/* <div className="col-lg-6 col-sm-12 inner-slider showrroom_wrap">
                  <Link to={`/dealerprofile/${curElem.id}`}>
                    <div className="card_post">
                      <div className="card_postImg dlr">
                        {curElem.image && (
                          <>
                            <small className="">ADS</small>
                         
                          <img
                            loading="lazy"
                            src={
                              curElem.image[0] &&
                              `${process.env.REACT_APP_URL}/${curElem.image[0]?.logo}`
                            }
                            onError={({ currentTarget }) => {
                              currentTarget.onError = null;
                              currentTarget.src =
                                "http://www.freeiconspng.com/uploads/no-image-icon-11.PNG";
                            }}
                            alt={curElem.name}
                          />
                             </>
                        )}
                      </div>
                      <div className="card_postInfo">
                        <div className="auction_wrapper forOction">
                          <h5 className="auction_heading">{curElem.title} </h5>
                          <small >ADS</small>
                        </div>
                        <p>{curElem?.dealerDescription.substr(0, 200)}</p>

                        <button className="orange_btn opening_bid_btn">
                          View Details <i class="fa fa-arrow-right"></i>
                        </button>
                      </div>
                    </div>
                  </Link>
                </div> */}


                </>
              );
            })}
        </div>
      </div>
      {/* <nav aria-label="Page navigation example " className="pgNtion">
        <ul className="pagination">
          <li className="page-item">
            <a className="page-link" href="#" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
              <span className="sr-only">Previous</span>
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              1
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              2
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              3
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
              <span className="sr-only">Next</span>
            </a>
          </li>
        </ul>
      </nav> */}
    </>
  );
};

export default DealerList;
