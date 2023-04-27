import React from "react";
import { Link } from "react-router-dom";
import about_1 from "../../Assets/images/woman-driving-sports-car-with-a-digital-touchscree-2021-09-02-02-11-52-utc.jpg";
import about_2 from "../../Assets/images/handsome-young-african-american-business-man-worki-2022-04-27-03-29-18-utc-min.jpg";
import about_3 from "../../Assets/images/male-driver-in-a-convertible-sports-car-driving-on-2022-03-04-02-22-18-utc.jpg";
import about_4 from "../../Assets/images/man-driving-his-car-during-phone-conversation-2022-09-02-16-59-02-utc.jpg"

function AboutShibanobi() {
  return (
    <div>
      <section className="ptb_80 ab">
        <div className="auction_container">
          <div className="row pt_80">
            <div className="col-12 col-md-6 order-md-1">
              <img src={about_2} loading="lazy" />
            </div>
            <div className="col-12 col-md-6 order-md-0 d-flex align-items-center mission_section">
              <div>
                <h2 className="orangeTextDark">Mission</h2>
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
                <h2 className="orangeTextDark">Vision</h2>
                <p>
                  "An auction experience the serves and protects buyers and sellers alike."
                </p>
                {/* <p>
                The auction process starts with sellers submitting their cars through the website. We select the most interesting and work with the seller to compile a thorough listing for the vehicle. Auctions typically run for 7 days and 14 days.
                </p> */}
              </div>
            </div>
          </div>
          <div className="row pt_80">
            <div className="col-12 col-md-6 order-md-1">
              <img src={about_4} loading="lazy" />
            </div>
            <div className="col-12 col-md-6 order-md-0 d-flex align-items-center mission_section">
              <div>
                <h2 className="orangeTextDark">Values</h2>
                <p>
                  "Fair Pricing, Reduced Risk, Professional Experience, Customer
                  Focused."
                </p>
              </div>
            </div>
          </div>

          <div className="row pt_80">
            <div className="col-12 col-md-12">
              <img src={about_3} loading="lazy" />
            </div>
            {/* <div className="col-12 col-md-10 offset-md-1 pt_80 text-center ">
              <h2>
                Our mission is to act as personal advisors to empower in your
                car buying, selling and servicing needs.
              </h2>
            </div> */}
          </div>
        </div>
      </section>

      <section className="ptb_80 bgHolder bgImg04 d-flex align-items-center">
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-4 offset-md-1 text-center text-md-left">
              <h1 className="text-back">Find Your Dream Car</h1>
              {/* <Link to="/showroom" className="btn mt-2">
                VIEW AUCTIONS
              </Link> */}
              <Link to="/auctionlive" className="orange_btn"> View Auctions </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutShibanobi;
