import React from "react";
import { Link } from "react-router-dom";
import about_1 from "../../Assets/images/about-1.jpg";
import about_2 from "../../Assets/images/about-2.jpeg";
import about_3 from "../../Assets/images/about-3.jpg";

function AboutShibanobi() {
  return (
    <div>
      <section className="ptb_80">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-6">
              <img src={about_1} />
            </div>
            <div className="col-12 col-md-6 d-flex align-items-center">
              <div>
                <h3>Our vision</h3>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum
                  passages, and more recently with desktop publishing software
                  like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text.
                </p>
              </div>
            </div>
          </div>
          <div className="row pt_80">
            <div className="col-12 col-md-6 order-md-1">
              <img src={about_2} />
            </div>
            <div className="col-12 col-md-6 order-md-0 d-flex align-items-center">
              <div>
                <h3>Our mission</h3>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum
                  passages, and more recently with desktop publishing software
                  like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text.
                </p>
              </div>
            </div>
          </div>
          <div className="row pt_80">
            <div className="col-12 col-md-12">
              <img src={about_3} />
            </div>
            <div className="col-12 col-md-10 offset-md-1 pt_80 text-center">
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
