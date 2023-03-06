import React from "react";
import shibnobiMotors from "../Assets/images/transparent.png";
import shibnobiMotorsW from "../Assets/images/lightmode-logo.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <footer>
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-3 col-lg-3 pb-4">
              <Link to="/" className="mb-3">
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
              </Link>
              {/* <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.{" "}
              </p> */}
            </div>
            <div className="col-12 col-md-6 col-lg-7 pb-4">
              <h6>Useful links</h6>
              <ul className="fLinks fLinks_row">
                {/* <li><Link to="#">Auctions</Link></li> */}
                <li>
                  <Link to="/shipping">Shipping</Link>
                </li>
                <li>
                  <Link to="/feautres">Gas Guzzlrs Features</Link>
                </li>
                <li>
                  <Link to="/submit">List Your Vehicle</Link>
                </li>
                {/* <li><Link to="makeamodel">Makes and Models</Link></li> */}
                {/* <li><Link to="#">Event Calendar</Link></li> */}
                {/* <li><Link to="works">How Gasguzzlers Works</Link></li> */}
                {/* <li><Link to="showroom">Show Room</Link></li> */}
                <li>
                  <Link to="/carraffle">Car Raffle</Link>
                </li>
                {/* <li><Link to="javascript:void(0)" data-toggle="modal" data-target="#loginModal">Log In</Link></li> */}
                <li>
                  <Link to="/getalerts">Get Alerts</Link>
                </li>
                <li>
                  <Link to="/about">About Gas Guzzlrs</Link>
                </li>
              </ul>
            </div>
            <div className="col-12 col-md-3 col-lg-2 pb-3">
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
          </div>
        </div>
        <div className="copyRight mt-4">
          <div className="container">
            <div className="row">
              <div className="col-12 col-md-6 copyrightLinks text-center text-md-right order-md-1">
                <Link to="/privacy">Privacy policy</Link>
                <Link to="/termsandconditions">Term of Condition</Link>
                <Link to="/amlpolicy">AML Policy</Link>
              </div>
              <div className="col-12 col-md-6 text-center text-md-left order-md-0">
                <p>©2022 Gas Guzzlrs | All Rights Reserved.</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
