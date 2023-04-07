import React from "react";
import { Link } from "react-router-dom";
import about_1 from "../../Assets/images/about-1.jpg";
import about_2 from "../../Assets/images/about-2.jpeg";
import about_3 from "../../Assets/images/sssddeee.avif";

function AboutShibanobi() {
  return (
    <div>
      <section className="ptb_80">
        <div className="auction_container">
          <div className="row pt_80">
            <div className="col-12 col-md-6 order-md-1">
              <img src={about_2} loading="lazy" />
            </div>
            <div className="col-12 col-md-6 order-md-0 d-flex align-items-center mission_section">
              <div>
                <h3 className="orangeTextDark">Our mission</h3>
                <p>
                  “To provide a mutually fair, respectful, and efficient
                  automotive experience to all customers, everytime, all the
                  time.”
                </p>
                {/* <p>
                  With years of experience serving the area, our dealership is
                  dedicated to offering high-quality, pre-owned vehicles to our
                  customers.
                </p>
                <p>
                  From the moment you walk through our door, we’re committed to
                  providing you with a great car-buying experience. With our
                  skilled sales staff and financing options, we’ll help you get
                  the vehicle you want, at the great price you deserve.
                </p> */}
              </div>
            </div>
          </div>
          <div className="row pt_80">
            <div className="col-12 col-md-6">
              <img src={about_1} loading="lazy" />
            </div>
            <div className="col-12 col-md-6 d-flex align-items-center mission_section">
              <div>
                <h3 className="orangeTextDark">Our vision</h3>
                <p>
                  An auction experience the serves and protects buyers and
                  sellers alike.
                </p>
                {/* <p>
                The auction process starts with sellers submitting their cars through the website. We select the most interesting and work with the seller to compile a thorough listing for the vehicle. Auctions typically run for 7 days and 14 days.
                </p> */}
              </div>
            </div>
          </div>
          <div className="row pt_80">
            <div className="col-12 col-md-6 order-md-1">
              <img src={about_2} loading="lazy" />
            </div>
            <div className="col-12 col-md-6 order-md-0 d-flex align-items-center mission_section">
              <div>
                <h3 className="orangeTextDark">Our Values</h3>
                <p>
                  Fair Pricing, Reduced Risk, Professional Experience, Customer
                  Focused
                </p>
              </div>
            </div>
          </div>

          <div className="row pt_80">
            <div className="col-12 col-md-12">
              <img src={about_3} loading="lazy" />
            </div>
            <div className="col-12 col-md-10 offset-md-1 pt_80 text-center ">
              <h2>
                Our mission is to act as personal advisors to empower in your
                car buying, selling and servicing needs.
              </h2>
            </div>
          </div>
        </div>
      </section>

      <section className="ptb_80 bgHolder bgImg04 d-flex align-items-center">
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-4 offset-md-1 text-center text-md-left">
              <h1 className="text-back">Find Your Dream Car</h1>
              <Link to="/showroom" className="btn mt-2">
                VIEW INVENTORY
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutShibanobi;
