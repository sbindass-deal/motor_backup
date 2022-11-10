import React from 'react'
// import shibnobiMotors from '../Assets/images/shibnobiMotors.png'
import shibnobiMotors from "../Assets/images/SibnobiMotors-logo.png";
function Footer() {
  return (
    <div>
        <footer>
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-3 col-lg-3 pb-4">
                        <a href="/" className="mb-3">
                            <img src={shibnobiMotors}/>
                        </a>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>
                    </div>
                    <div className="col-12 col-md-6 col-lg-7 pb-4">
                        <h6>Useful links</h6>
                        <ul className="fLinks fLinks_row">
                            {/* <li><a href="#">Auctions</a></li> */}
                            <li><a href="shipping">Shipping</a></li>
                            <li><a href="feautres">Shibnobi Features</a></li>
                            <li><a href="submit">Submit a Vehicle</a></li>
                            {/* <li><a href="makeamodel">Makes and Models</a></li> */}
                            {/* <li><a href="#">Event Calendar</a></li> */}
                            {/* <li><a href="works">How Shibnobi Works</a></li> */}
                            {/* <li><a href="showroom">Show Room</a></li> */}
                            <li><a href="carraffle">Car Raffle</a></li>
                            {/* <li><a href="javascript:void(0)" data-toggle="modal" data-target="#loginModal">Log In</a></li> */}
                            <li><a href="getalerts">Get Alerts</a></li>
                            <li><a href="aboutshibnobi">About Shibnobi</a></li>
                        </ul>
                    </div>
                    <div className="col-12 col-md-3 col-lg-2 pb-3">
                        <h6>Social Links</h6>
                        <ul className="fLinks">
                            <li><a href="#"><i className="fa-brands fa-facebook"></i> Facebook</a></li>
                            <li><a href="#"><i className="fa-brands fa-instagram"></i> Instagram</a></li>
                            <li><a href="#"><i className="fa-brands fa-linkedin-in"></i> Linkedin</a></li>
                            <li><a href="#"><i className="fa-brands fa-twitter"></i> Twitter</a></li>
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
                            <p>©2022 SHIBNOBI Motors  |  All Rights Reserved.</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    </div>
  )
}

export default Footer