import React from "react";
import ic_01 from "../../Assets/images/ic_01.svg";
import ic_02 from "../../Assets/images/ic_02.svg";
import ic_03 from "../../Assets/images/ic_03.svg";
import ic_04 from "../../Assets/images/ic_04.svg";
import HIW from "../../Assets/images/HIW.jpg";
import HIW3 from "../../Assets/images/HIW3.jpg";
import HIW2 from "../../Assets/images/HIW2.jpg";
import HIW4 from "../../Assets/images/HIW4.jpeg";

function HowShibnobiMotorWorks() {
  return (
    <div>
      <section className="howItWorkSection d-flex align-items-center">
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-8 offset-lg-2">
              <div className="heroText">
                <h1>How Gas Guzzlrs Works</h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pt_80">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center pb_30">
              <h2 className="title_combo title_Center">
                What makes Gas Guzzlrs different?
              </h2>
            </div>

            <div className="col-12 col-md-6 col-lg-3 mb-4">
              <div className="card_ic text-center">
                <div className="card_icHead">
                  <img src={ic_01} alt="ic_01" />
                </div>
                <div className="card_icBody">
                  <h5>We represent each car honestly</h5>
                  <p>
                    with objectively-written listings and comprehensive photo
                    galleries.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-3 mb-4">
              <div className="card_ic text-center">
                <div className="card_icHead">
                  <img src={ic_02} alt="ic_02" />
                </div>
                <div className="card_icBody">
                  <h5>Each seller is provided</h5>
                  <p>
                    a dedicated point of contact throughout the auction process.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-3 mb-4">
              <div className="card_ic text-center">
                <div className="card_icHead">
                  <img src={ic_03} alt="ic_03" />
                </div>
                <div className="card_icBody">
                  <h5>Comment threads on each listing</h5>
                  <p>
                    with objectively-written listings and comprehensive photo
                    galleries.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-3 mb-4">
              <div className="card_ic text-center">
                <div className="card_icHead">
                  <img src={ic_04} alt="ic_04" />
                </div>
                <div className="card_icBody">
                  <h5>Sniping protection extends</h5>
                  <p>
                    with objectively-written listings and comprehensive photo
                    galleries.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="ptb_80">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-6">
              <img src={HIW} alt="HIW" />
            </div>
            <div className="col-12 col-md-6 d-flex align-items-center">
              <div>
                <h3>Submitting a Vehicle for Auction</h3>
                <p>
                  If you're looking to sell your car, get it ready for auction
                  and see what you can get, you can sell your car for the
                  highest price possible. Its fast, it's easy.
                </p>
                <h6>1. Classic</h6>
                <p>
                  Make the introduction for you and write a compelling
                  description of your item. Our car experts will help you sell
                  faster and for a higher price.
                </p>
                <hr />
                <h6>2. Plus Photography</h6>
                <p>
                  Bringing your car to life and unleashing its full potential is
                  our passion. Enjoy the true value of your car by choosing to
                  add ultra-sharp high resolution panoramic photographs as part
                  of the listing process.
                </p>
                <hr />
                <h6>3. White Glove Service</h6>
                <p>
                  We aim to deliver premium-quality customer service and
                  workmanship, setting new customer experience standards for
                  automotive industry.
                </p>
              </div>
            </div>
          </div>
          <div className="row pt_80">
            <div className="col-12 col-md-6 order-md-1">
              <img src={HIW3} alt="HIW3" />
            </div>
            <div className="col-12 col-md-6 order-md-0 d-flex align-items-center">
              <div>
                <h3>How it will work for the giveway</h3>
                <p style={{ lineHeight: "2rem" }}>
                  Every dollar amount spent or equivalent ( CRYPTO BUY IN ) on
                  your favorite products in the Gas Guzzlrs store/ticket site
                  gives you the allotted amount of automatic entries for the
                  chance to WIN our current giveaway. All your entries are
                  calculated realtime for you to see in your personal account
                  dashboard during each giveaway.
                </p>
                {/* <ul className="dotList">
                  <li>Lorem Ipsum has been the industry's standard</li>
                  <li>dummy text ever since the 1500s</li>
                  <li>When an unknown printer took a galley of type</li>
                  <li>Scrambled it to make a type specimen book.</li>
                  <li>It has survived not only five centuries.</li>
                </ul> */}
              </div>
            </div>
          </div>
          <div className="row pt_80">
            <div className="col-12 col-md-6">
              <img src={HIW4} alt="HIW4" />
            </div>
            <div className="col-12 col-md-6 d-flex align-items-center">
              <div>
                <h3>How we will choose the winner</h3>
                <p style={{ lineHeight: "2rem" }}>
                  At the completion of the contest, a regulated 3rd party
                  contest agent conducts a computer randomized drawing and
                  immediately provides us with the winner information in which
                  we will then upload to Youtube, Facebook, Instagram and
                  Twitter. Of course, the winner will FIRST be announced on the
                  Gas Guzzlrs YouTube Channel
                </p>
                {/* <ul className="dotList">
                  <li>Lorem Ipsum has been the industry's standard</li>
                  <li>dummy text ever since the 1500s</li>
                  <li>When an unknown printer took a galley of type</li>
                  <li>Scrambled it to make a type specimen book.</li>
                  <li>It has survived not only five centuries.</li>
                </ul> */}
              </div>
            </div>
          </div>
          <div className="row pt_80">
            <div className="col-12 col-md-8 offset-md-2 text-center">
              <h2>The Submission Process</h2>
              <p style={{ lineHeight: "2rem" }}>
                The car auction submission process is designed to ensure that
                every submitted vehicle is properly cataloged and documented
                with photographs, video documentation and any other information
                necessary to accurately represent the vehicle description. The
                eAuction system will review your listing before it goes live on
                the auction site. After you submit it we will send you an email
                confirming that it has been received and may be ready for
                auction 24/7.
              </p>
            </div>
            <div className="col-12 col-md-12 mt-4">
              <img src={HIW2} alt="HIW2" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HowShibnobiMotorWorks;
