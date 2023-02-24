import React from "react";
import car_02 from "../../../Assets/images/car_02.jpg";
import car_01 from "../../../Assets/images/car_01.jpg";
import car_03 from "../../../Assets/images/car_03.jpg";
import MyAccountLeftNav from "./MyAccountLeftNav";

function MyShipments() {
  return (
    <>
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
              <h3>My Shipments</h3>
              <hr />

              <div className="row">
                <div className="col-12">
                  <div className="orderListRow">
                    <a href="#" className="orderImg">
                      <img src={car_02} alt="car_02" />
                    </a>
                    <div className="orderInfo">
                      <h5>
                        <a href="#">1966 Porsche 912 Coupe</a>
                      </h5>
                      <div className="price__">
                        <i className="fa-solid fa-dollar-sign"></i> 15,000
                      </div>
                      <ul className="orderStep">
                        <li className="active">
                          <div className="orderTitle">Ordered</div>
                          <div className="orderDate">Oct 28th Mon, 2022</div>
                        </li>
                        <li>
                          <div className="orderTitle">Order Confirmed</div>
                          <div className="orderDate">Oct 28th Mon, 2022</div>
                        </li>
                        <li>
                          <div className="orderTitle">Order Shipped</div>
                          <div className="orderDate">Oct 30th Wed, 2022</div>
                        </li>
                        <li>
                          <div className="orderTitle">Delivered</div>
                          <div className="orderDate">Nov 3rd Thu, 2022</div>
                        </li>
                      </ul>
                      <div className="">
                        {/* <button type="button" className="gry_btn">Cancel</button> */}
                        <button type="button" className="gry_btn ml-2">
                          For any query you can contact on mail &nbsp; &nbsp;
                          <span className="text-warning">
                            xavier@GasGuzzlrs.com
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-12">
                  <div className="orderListRow">
                    <a href="#" className="orderImg">
                      <img src={car_01} alt="car_01" />
                    </a>
                    <div className="orderInfo">
                      <h5>
                        <a href="#">2008 BMW M3 Sedan 6-Speed</a>
                      </h5>
                      <div className="price__">
                        <i className="fa-solid fa-dollar-sign"></i> 15,000
                      </div>
                      <ul className="orderStep">
                        <li className="active">
                          <div className="orderTitle">Ordered</div>
                          <div className="orderDate">Oct 28th Mon, 2022</div>
                        </li>
                        <li className="active">
                          <div className="orderTitle">Order Confirmed</div>
                          <div className="orderDate">Oct 28th Mon, 2022</div>
                        </li>
                        <li>
                          <div className="orderTitle">Order Shipped</div>
                          <div className="orderDate">Oct 30th Wed, 2022</div>
                        </li>
                        <li>
                          <div className="orderTitle">Delivered</div>
                          <div className="orderDate">Nov 3rd Thu, 2022</div>
                        </li>
                      </ul>
                      <div className="">
                        {/* <button type="button" className="gry_btn">
                          Cancel
                        </button> */}
                        <button type="button" className="gry_btn ml-2">
                          For any query you can contact on mail &nbsp; &nbsp;
                          <span className="text-warning">
                            xavier@GasGuzzlrs.com
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-12">
                  <div className="orderListRow">
                    <a href="#" className="orderImg">
                      <img src={car_03} alt="car_03" />
                    </a>
                    <div className="orderInfo">
                      <h5>
                        <a href="#">1999 Mercedes-Benz SL500</a>
                      </h5>
                      <div className="price__">
                        <i className="fa-solid fa-dollar-sign"></i> $16,250
                      </div>
                      <ul className="orderStep">
                        <li className="active">
                          <div className="orderTitle">Ordered</div>
                          <div className="orderDate">Oct 28th Mon, 2022</div>
                        </li>
                        <li className="active">
                          <div className="orderTitle">Order Confirmed</div>
                          <div className="orderDate">Oct 28th Mon, 2022</div>
                        </li>
                        <li className="active">
                          <div className="orderTitle">Order Shipped</div>
                          <div className="orderDate">Oct 30th Wed, 2022</div>
                        </li>
                        <li className="active">
                          <div className="orderTitle">Delivered</div>
                          <div className="orderDate">Nov 3rd Thu, 2022</div>
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
    </>
  );
}

export default MyShipments;
