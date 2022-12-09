import React from "react";
import results_digest from "../../Assets/images/results-digest.png";
import nr from "../../Assets/images/nr.png";
import premium from "../../Assets/images/premium.png";
import auction_list from "../../Assets/images/auction_list.jpg";
// import auction_list from "../../Assets/images/auction_list.jpg";

function GetAlerts() {
  return (
    <div>
      <section className="pt_80 text-center">
        <div className="container">
          <div className="daily_mail">
            <h2 className="title_combo title_Center">Gas guzzlrs Daily Mail</h2>
            <p className="title_combo title_Center">
              All the most relevant new content on Gas guzzlrs at 5am Pacific
              each day, including:
            </p>

            <div className="row mt-4">
              <div className="col-md-8 offset-lg-2">
                <div className="daily_mail_box">
                  <input
                    type="text"
                    className="form-control"
                    name="email"
                    placeholder="Enter email address"
                  />
                  <button type="submit" className="results_subscribe btn">
                    <i className="fa-regular fa-envelope"></i>{" "}
                    <span>Subscribe</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pt_80">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-6 col-lg-4 mb-4">
              <div className="card_ic text-center">
                <div className="card_icHead">
                  <img src={results_digest} />
                </div>
                <div className="card_icBody">
                  <h4>Results Digest</h4>
                  <p>
                    Yesterday’s completed auction results are sent to you at 5am
                    Pacific each day.
                  </p>
                  <button type="submit" className="results_subscribe btn">
                    <i className="fa-regular fa-envelope"></i>{" "}
                    <span>Subscribe</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4 mb-4">
              <div className="card_ic text-center">
                <div className="card_icHead">
                  <img src={nr} />
                </div>
                <div className="card_icBody">
                  <h4>No Reserve Digest</h4>
                  <p>
                    No Reserve listings that went live in the past 24 hours are
                    sent to you at 5pm Pacific each day.
                  </p>
                  <button type="submit" className="results_subscribe btn">
                    <i className="fa-regular fa-envelope"></i>{" "}
                    <span>Subscribe</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4 mb-4">
              <div className="card_ic text-center">
                <div className="card_icHead">
                  <img src={premium} />
                </div>
                <div className="card_icBody">
                  <h4>Gas guzzlrs Premium Listings</h4>
                  <p>
                    Each Premium listing is sent to you as soon as the auction
                    goes live.
                  </p>
                  <button type="submit" className="results_subscribe btn">
                    <i className="fa-regular fa-envelope"></i>{" "}
                    <span>Subscribe</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="row pt_80 pb_80">
            <div className="col-12 col-lg-6 col-md-6">
              <img src={auction_list} />
            </div>
            <div className="col-12 col-lg-6 col-md-6 align-items-center pt_80 pb_80">
              <h3>Watch an auction to follow the action start to finish.</h3>
              <p>
                Click a Watch star Star icon to watch that listing. When you
                watch a listing:
              </p>
              <ul className="dotList mb-3">
                <li>It appears on My Watchlist.</li>
                <li>
                  New photos or videos added to the listing are emailed to you.
                </li>
                <li>
                  A one-hour email reminder or 30 minute text reminder can be
                  sent to you before the auction closes.
                </li>
                <li>
                  A summary of the auction result is emailed to you when it
                  closes.
                </li>
                <li>
                  Well email you if the vehicle is listed again on Gas guzzlrs.
                </li>
              </ul>
              <a className="btn" href="#">
                <i className="fa-solid fa-list mr-2"></i>Go to My Watchlist
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default GetAlerts;
