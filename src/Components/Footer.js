import React from "react";
// import shibnobiMotors from '../Assets/images/shibnobiMotors.png'
// import shibnobiMotors from "../Assets/images/moters-logo.png";
import shibnobiMotors from "../Assets/images/transparent.png";
import shibnobiMotorsW from "../Assets/images/lightmode-logo.png";

function Footer() {
  return (
    <div>
      <footer>
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-3 col-lg-3 pb-4">
              <a href="/" className="mb-3">
              <img src={shibnobiMotors} alt="shibnobiMotors" className="darkLogo"/>
                  <img src={shibnobiMotorsW} alt="shibnobiMotors" className="whiteLogo"/>
              </a>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.{" "}
              </p>
            </div>
            <div className="col-12 col-md-6 col-lg-7 pb-4">
              <h6>Useful links</h6>
              <ul className="fLinks fLinks_row">
                {/* <li><a href="#">Auctions</a></li> */}
                <li>
                  <a href="shipping">Shipping</a>
                </li>
                <li>
                  <a href="feautres">Gas guzzlrs Features</a>
                </li>
                <li>
                  <a href="submit">Submit a Vehicle</a>
                </li>
                {/* <li><a href="makeamodel">Makes and Models</a></li> */}
                {/* <li><a href="#">Event Calendar</a></li> */}
                {/* <li><a href="works">How Gasguzzlers Works</a></li> */}
                {/* <li><a href="showroom">Show Room</a></li> */}
                <li>
                  <a href="carraffle">Car Raffle</a>
                </li>
                {/* <li><a href="javascript:void(0)" data-toggle="modal" data-target="#loginModal">Log In</a></li> */}
                <li>
                  <a href="getalerts">Get Alerts</a>
                </li>
                <li>
                  <a href="aboutGas Guzzlrs">About Gas guzzlrs</a>
                </li>
              </ul>
            </div>
            <div className="col-12 col-md-3 col-lg-2 pb-3">
              <h6>Social Links</h6>
              <ul className="fLinks">
                <li>
                  <a
                    target="_blank"
                    href="https://www.facebook.com/GasGuzzlrs/"
                  >
                    <i className="fa-brands fa-facebook"></i> Facebook
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    href="https://www.instagram.com/gasguzzlrs/"
                  >
                    <i className="fa-brands fa-instagram"></i> Instagram
                  </a>
                </li>
                <li>
                  <a target="_blank" href="https://www.tiktok.com/@gasguzzlrs">
                    <i className="fa-brands fa-linkedin-in"></i> Tiktok
                  </a>
                </li>
                <li>
                  <a target="_blank" href="https://twitter.com/GasGuzzlrs">
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
                <a href="/privacy">PRIVACY POLICY</a>
                <a href="/termsandconditions">TERMS AND CONDITIONS</a>
                <a href="amlpolicy">AML Policy</a>
              </div>
              <div className="col-12 col-md-6 text-center text-md-left order-md-0">
                <p>©2022 Gas guzzlrs Motors | All Rights Reserved.</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
