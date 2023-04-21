import React from "react";
import shibnobiMotors from "../Assets/images/transparent.png";
import shibnobiMotorsW from "../Assets/images/lightmode-logo.png";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <footer>
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-3 col-lg-3 pb-4">
              <NavLink to="/"  className="mb-3">
                <img
                  loading="lazy"
                  src={shibnobiMotors}
                  alt="shibnobiMotors"
                  className="darkLogo"
                />
                <img
                  loading="lazy"
                  src={shibnobiMotorsW}
                  alt="shibnobiMotors"
                  className="whiteLogo"
                />
              </NavLink>
              {/* <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.{" "}
              </p> */}
            </div>
            <div className="col-12 col-md-3 col-lg-3 pb-4">
              <h6>Useful links</h6>
              <ul className="fLinks fLinks_row">
                {/* <li><Link to="#">Auctions</Link></li> */}
                <li>
                  <NavLink to="/shipping" >
                    Shipping
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/feautres" >
                    Featured
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/submit" >
                    List Your Vehicle
                  </NavLink>
                </li>
                {/* <li><Link to="makeamodel">Makes and Models</Link></li> */}
                {/* <li><Link to="#">Event Calendar</Link></li> */}
                {/* <li><Link to="works">How Gasguzzlers Works</Link></li> */}
                {/* <li><Link to="showroom">Show Room</Link></li> */}
                <li>
                  <NavLink to="/carraffle" >
                    Giveaways
                  </NavLink>
                </li>
                {/* <li><Link to="javascript:void(0)" data-toggle="modal" data-target="#loginModal">Log In</Link></li> */}
                <li>
                  <NavLink to="/getalerts" >
                    Get Alerts
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/about" >
                    About Gas Guzzlrs
                  </NavLink>
                </li>
              </ul>
            </div>
            <div className="col-12 col-md-2 col-lg-2 pb-3">
              <h6>Social Links</h6>
              <ul className="fLinks">
                <li>
                  <a
                    target="_blank"
                    href="https://www.facebook.com/Gas Guzzlrs/"
                  >
                    <i className="fa-brands fa-facebook"></i> Facebook
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    href="https://www.instagram.com/Gas Guzzlrs/"
                  >
                    <i className="fa-brands fa-instagram"></i> Instagram
                  </a>
                </li>
                <li>
                  <a target="_blank" href="#">
                    <i className="fa-brands fa-linkedin-in"></i> LinkedIn
                  </a>
                </li>
                <li>
                  <a target="_blank" href="https://twitter.com/Gas Guzzlrs">
                    <i className="fa-brands fa-twitter"></i> Twitter
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-12 col-md-4 col-lg-4 pb-3">
              <h6>Gas Guzzlrs Giveaway 1</h6>
              <p>
                No purchase necessary to enter or win. A purchase or payment of
                any kind will not increase your chances of winning. Open to
                legal residents of the 48 continental United States, the
                District of Columbia and Canada. Void in Puerto Rico, Quebec and
                US territories and where prohibited by law. Promotion ends 11:59
                PM (MST) on 04/20/2023. Odds of winning depend upon the number
                of eligible entries received. See the
                <NavLink
                  to="/giveaway-official-rules"
                  style={{ color: "orange" }}
                >
                  &nbsp;Official Rules
                </NavLink>{" "}
                for details.
              </p>
            </div>
          </div>
        </div>
        <div className="copyRight mt-4">
          <div className="container">
            <div className="row">
              <div className="col-12 col-md-6 copyrightLinks text-center text-md-right order-md-1">
                <NavLink to="/privacy">Privacy policy</NavLink>
                <NavLink to="/termsandconditions" >
                  Term of Condition
                </NavLink>
                <NavLink to="/amlpolicy" >
                  AML Policy
                </NavLink>
              </div>
              <div className="col-12 col-md-6 text-center text-md-left order-md-0">
                <p>©2023 Gas Guzzlrs | All Rights Reserved.</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
