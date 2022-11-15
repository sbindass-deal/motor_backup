import axios from "axios";
import React from "react";
import { useState } from "react";
import MyAccountLeftNav from "./MyAccountLeftNav";
import car_01 from "../../../Assets/images/car_01.jpg";

function MyListings() {
  const [data, setData] = useState([]);
  React.useEffect(() => {
    axios.get(process.env.REACT_APP_URL + "vehicles").then((response) => {
      setData(response.data.data);
    });
  }, []);

  return (
    <div>
      {data.length > 0 ? (
        <section className="ptb_80 pt_sm_50">
          <div className="container">
            <div className="row">
              <div className="col-12 col-md-4 col-lg-3">
                <div className="card_Gray mb-5 mb-md-0">
                  <h5>My Account</h5>
                  <hr />
                  <MyAccountLeftNav />
                </div>
              </div>
              <div className="col-12 col-md-8 col-lg-9">
                <div class="FlexCol">
                  <h3>My Bids & Win</h3>
                  {/* <select class="field">
                  <option>Recent Bid</option>
                  <option>Winner Bid</option>
                </select> */}
                </div>
                <hr />

                <div className="row">
                  <div className="col-12">
                    {data.map((curElem) => {
                      return (
                        <div key={curElem.id} className="bidsListRow">
                          <div className="bidsImg">
                            <img src={car_01} alt="car_01" />
                          </div>
                          <div className="bidsInfo">
                            <div className="">
                              <h6>{curElem.name}</h6>
                              <ul className="bidsLabelList">
                                {/* <li>
                                <i className="fa-solid fa-dollar-sign"></i>{" "}
                                {curElem.ammountOnDocument}
                              </li> */}
                                {/* <li>
                                <i className="fa-solid fa-calendar-days"></i>{" "}
                                {curElem.created_at}
                              </li> */}
                              </ul>
                              <p>{curElem.description}</p>
                            </div>
                            <div className="pl-md-3">
                              <a
                                href={`detail/${curElem.id}`}
                                className="gry_btn"
                              >
                                <i className="fa-solid fa-eye mr-2"></i> View
                              </a>
                            </div>
                          </div>
                        </div>
                      );
                    })}

                    {/* <div className="bidsListRow">
                                    <div className="bidsImg">
                                        <img src={car_02} alt="car_02"/>
                                    </div>
                                    <div className="bidsInfo">
                                        <div className="">
                                            <h6>2008 BMW M3 Sedan 6-Speed</h6>
                                            <ul className="bidsLabelList">
                                                <li><i className="fa-solid fa-dollar-sign"></i> 15,000</li>
                                                <li><i className="fa-solid fa-calendar-days"></i> 10-10-2022</li>
                                            </ul>
                                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry...</p>
                                        </div>
                                        <div className="pl-md-3">
                                            <a href="#" className="gry_btn"><i className="fa-solid fa-eye mr-2"></i> View</a>
                                        </div>
                                    </div>
                                </div> */}

                    {/* <div className="bidsListRow">
                                    <div className="bidsImg">
                                    <img src={car_03} alt="car_03"/>
                                    </div>
                                    <div className="bidsInfo">
                                        <div className="">
                                            <h6>2008 BMW M3 Sedan 6-Speed</h6>
                                            <ul className="bidsLabelList">
                                                <li><i className="fa-solid fa-dollar-sign"></i> 15,000</li>
                                                <li><i className="fa-solid fa-calendar-days"></i> 10-10-2022</li>
                                            </ul>
                                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry...</p>
                                        </div>
                                        <div className="pl-md-3">
                                            <a href="#" className="gry_btn"><i className="fa-solid fa-eye mr-2"></i> View</a>
                                        </div>
                                    </div>
                                </div> */}

                    {/* <div className="bidsListRow">
                                    <div className="bidsImg">
                                    <img src={car_04} alt="car_04"/>
                                    </div>
                                    <div className="bidsInfo">
                                        <div className="">
                                            <h6>2008 BMW M3 Sedan 6-Speed</h6>
                                            <ul className="bidsLabelList">
                                                <li><i className="fa-solid fa-dollar-sign"></i> 15,000</li>
                                                <li><i className="fa-solid fa-calendar-days"></i> 10-10-2022</li>
                                            </ul>
                                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry...</p>
                                        </div>
                                        <div className="pl-md-3">
                                            <a href="#" className="gry_btn"><i className="fa-solid fa-eye mr-2"></i> View</a>
                                        </div>
                                    </div>
                                </div> */}

                    {/* <div className="bidsListRow">
                                    <div className="bidsImg">
                                    <img src={car_01} alt="car_01"/>
                                    </div>
                                    <div className="bidsInfo">
                                        <div className="">
                                            <h6>2008 BMW M3 Sedan 6-Speed</h6>
                                            <ul className="bidsLabelList">
                                                <li><i className="fa-solid fa-dollar-sign"></i> 15,000</li>
                                                <li><i className="fa-solid fa-calendar-days"></i> 10-10-2022</li>
                                            </ul>
                                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry...</p>
                                        </div>
                                        <div className="pl-md-3">
                                            <a href="#" className="gry_btn"><i className="fa-solid fa-eye mr-2"></i> View</a>
                                        </div>
                                    </div>
                                </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="ptb_80 pt_sm_50">
          <div className="container">
            <div className="row">
              <div className="col-12 col-md-4 col-lg-3">
                <div className="card_Gray mb-5 mb-md-0">
                  <h5>My Account</h5>
                  <hr />
                  <MyAccountLeftNav />
                </div>
              </div>
              <div className="col-12 col-md-8 col-lg-9">
                <h5>Interested in selling your vehicle on Bring a Trailer?</h5>
                <p>Bring a Trailer has three ways to sell a vehicle.</p>
                <ul className="labelList_">
                  <li>
                    <div className="labelList_label">classNameic</div>
                    <div className="labelList_text">
                      Our tried and true listing service for $99.
                    </div>
                  </li>
                  <li>
                    <div className="labelList_label">Plus</div>
                    <div className="labelList_text">
                      An at-your-door vehicle photography shoot added to your
                      classNameic listing.
                    </div>
                  </li>
                  <li>
                    <div className="labelList_label">White Glove</div>
                    <div className="labelList_text">
                      For significant cars and collections, give us a call and
                      we'll handle the rest.
                    </div>
                  </li>
                </ul>
                <a href="submit" className="gry_btn mt-3">
                  START A VEHICLE SUBMISSION
                </a>

                <div className="card_Gray mt-5 pt-5 pb-5 text-center">
                  <h4>
                    Have a part, engine, or automobilia to sell? Just $99 to
                    list.
                  </h4>
                  <a href="submit" className="gry_btn mt-3">
                    START A PART SUBMISSION
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default MyListings;
