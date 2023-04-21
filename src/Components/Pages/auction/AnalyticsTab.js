import React from "react";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import Analytics from "./Analytics";
import Mitsubishi from "../../../Assets/images/Mitsubishi.webp";
import Mitsubishi_300 from "../../../Assets/images/land_rover_range_rover.webp";
import Data from "./Data";

function AnalyticsTab() {
  return (
    <section className="ptb_80 pt_sm_50">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="col-12 col-lg-12 mb-50">
              <ul className="postTopOption">
                <li className="post_search">
                  <input
                    type="text"
                    autoComplete="off"
                    name="search"
                    placeholder="Search for a make or model"
                  />
                </li>
                <li className="">
                  <button type="button" className="gry_btn">
                    <i className="fa-solid fa-filter mr-2"></i>
                    Filters
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-12 text-center pb_30 TbAanaletics">
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
              <Row>
                <Col sm={2}>
                  <Nav variant="pills" className="flex-column">
                    <Nav.Item>
                      <Nav.Link eventKey="first">
                        <div className="carImg">
                          <img src={Mitsubishi} />
                          <p>Mitsubishi 3000GT</p>
                        </div>
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="second">
                        <div className="carImg">
                          <img src={Mitsubishi_300} />
                          <p>Mitsubishi 3000GT</p>
                        </div>
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="three">
                        <div className="carImg">
                          <img src={Mitsubishi} />
                          <p>Mitsubishi 3000GT</p>
                        </div>
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Col>
                <Col sm={10}>
                  <Tab.Content>
                    <Tab.Pane eventKey="first">
                      <Analytics />
                    </Tab.Pane>
                    <Tab.Pane eventKey="second">
                      <Analytics />
                    </Tab.Pane>
                    <Tab.Pane eventKey="three">
                      <Analytics />
                    </Tab.Pane>
                  </Tab.Content>
                </Col>
              </Row>
            </Tab.Container>
          </div>
        </div>
        <div className="row addSection mt-50">
          <div class="col-12 ListDealer ">
            <h2 className="title_combo">Results</h2>
            <div class="row  pt-4 row_gridList">
              <div class="col-12 col-md-3 pb-3">
                <div className="card_post">
                  <div class="card_postImg">
                    <a href="#">
                      <img
                        loading="lazy"
                        src="https://api.GasGuzzlrs.com//./upload/garage_image/Dealer-67317912452.jpg"
                        alt="ketu"
                      />
                    </a>
                  </div>
                  <div class="card_postInfo">
                    <h4 className="car_title">
                      <a href="/garages/291">ketu motors</a>
                    </h4>
                    <ul class="labelList btnListShap">
                      <li class="w-auto">
                        <span>
                          <label>Current Bid : $460,000</label>
                        </span>
                      </li>
                      <li>
                        <span>
                          <div>
                            <li>
                              <span>
                                <label>Ends In:&nbsp;</label>28 days
                              </span>
                            </li>
                          </div>
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="col-12 col-md-3 pb-3">
                <div className="card_post">
                  <div class="card_postImg">
                    <a href="#">
                      <img
                        loading="lazy"
                        src="https://api.GasGuzzlrs.com//./upload/garage_image/Dealer-67317912452.jpg"
                        alt="ketu"
                      />
                    </a>
                  </div>
                  <div class="card_postInfo">
                    <h4 className="car_title">
                      <a href="/garages/291">ketu motors</a>
                    </h4>
                    <ul class="labelList btnListShap">
                      <li class="w-auto">
                        <span>
                          <label>Current Bid : $460,000</label>
                        </span>
                      </li>
                      <li>
                        <span>
                          <div>
                            <li>
                              <span>
                                <label>Ends In:&nbsp;</label>28 days
                              </span>
                            </li>
                          </div>
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="col-12 col-md-3 pb-3">
                <div className="card_post">
                  <div class="card_postImg">
                    <a href="#">
                      <img
                        loading="lazy"
                        src="https://api.GasGuzzlrs.com//./upload/garage_image/Dealer-67317912452.jpg"
                        alt="ketu"
                      />
                    </a>
                  </div>
                  <div class="card_postInfo">
                    <h4 class="car_title">
                      <a href="/garages/291">ketu motors</a>
                    </h4>
                    <ul class="labelList btnListShap">
                      <li class="w-auto">
                        <span>
                          <label>Current Bid : $460,000</label>
                        </span>
                      </li>
                      <li>
                        <span>
                          <div>
                            <li>
                              <span>
                                <label>Ends In:&nbsp;</label>28 days
                              </span>
                            </li>
                          </div>
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="col-12 col-md-3 pb-3">
                <div className="card_post">
                  <div class="card_postImg">
                    <a href="#">
                      <img
                        loading="lazy"
                        src="https://api.GasGuzzlrs.com//./upload/garage_image/Dealer-67317912452.jpg"
                        alt="ketu"
                      />
                    </a>
                  </div>
                  <div class="card_postInfo">
                  <h4 class="car_title">
                      <a href="/garages/291">ketu motors</a>
                    </h4>
                    <ul class="labelList btnListShap">
                      <li class="w-auto">
                        <span>
                          <label>Current Bid : $460,000</label>
                        </span>
                      </li>
                      <li>
                        <span>
                          <div>
                            <li>
                              <span>
                                <label>Ends In:&nbsp;</label>28 days
                              </span>
                            </li>
                          </div>
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AnalyticsTab;
