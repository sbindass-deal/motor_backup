import React from "react";
import results_digest from "../../Assets/images/results-digest.png";
import nr from "../../Assets/images/nr.png";
import premium from "../../Assets/images/premium.png";
import auction_list from "../../Assets/images/auction_list.jpg";
import axios from "axios";
import { Link } from "react-router-dom";

const GetAlerts = () => {
  const handleSubmitApi = () => {
    // axios
    //   .post(`${process.env.REACT_APP_URL}sendMail`, {
    //     email: email,
    //   })
    //   .then((result) => {})
    //   .catch((error) => {});
  };

  return (
    <div>
      <section className="pt_80 text-center">
        <div className="container">
          <div className="daily_mail">
            <h2
              className="text title_combo title_Center"
              style={{ color: "#fff" }}
            >
              {/* Gas Guzzlrs Daily Mail */}
              Daily Mail of the Gas Guzzlrs
            </h2>
            <p
              className="title_combo title_Center py-2"
              style={{ color: "#fff" }}
            >
              {/* All the most relevant new content on Gas Guzzlrs at 5am Pacific
              each day, including: */}
              Every day at 5am Pacific, we curate and deliver the latest and
              most pertinent Gas Guzzlrs content, ensuring you stay up-to-date
              with the most relevant news.
            </p>
            <button
                    onClick={handleSubmitApi}
                    type="button"
                    className="results_subscribe btn"
                  >
                    <i className="fa-regular fa-envelope"></i>{" "}
                    <span>Subscribe</span>
                  </button>
            <div className="row mt-4">
              <div className="col-md-8 offset-lg-2 center-align">
                <div className="daily_mail_box">
                  {/* <input
                    type="text"
                    className="form-control"
                    name="email"
                    placeholder="Enter email address"
                  /> */}
                 
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
                  {/* <h4>Results Digest</h4> */}
                  <h4>Result Insights</h4>
                  <p>
                    {/* Yesterday’s completed auction results are sent to you at 5am
                    Pacific each day. */}
                    You receive the results of the auction held the day before
                    every morning at 5 a.m. Pacific time.
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
                  {/* <h4>No Reserve Digest</h4> */}
                  <h4>No Reserve Insights</h4>
                  <p>
                    {/* No Reserve listings that went live in the past 24 hours are
                    sent to you at 5pm Pacific each day. */}
                    A daily summary of No Reserve listings that have gone live
                    over the past 24 hours is emailed to you at 5pm Pacific.
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
                  {/* <h4>Gas Guzzlrs Premium Listings</h4> */}
                  <h4>Premium Listings on Gas Guzzlrs</h4>
                  <p>
                    {/* Each Premium listing is sent to you as soon as the auction
                    goes live. */}
                    You will receive every Premium listing as soon as the
                    auction goes live.
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
              {/* <h3>Watch an auction to follow the action start to finish.</h3> */}
              <h3>
                If you wish to follow an auction from beginning to end, you
                should watch it
              </h3>
              <p>
                {/* Click a Watch star Star icon to watch that listing. When you
                watch a listing: */}
                Click the Watch Bell icon to watch that listing. Watching a
                listing involves:
              </p>
              <ul className="dotList mb-3">
                {/* <li>It appears on My Watchlist.</li> */}
                <li>It's listed in My Watchlist.</li>
                <li>
                  {/* New photos or videos added to the listing are emailed to you. */}
                  You receive emails when new images or videos are posted to the
                  listing.
                </li>
                <li>
                  {/* A one-hour email reminder or 30 minute text reminder can be
                  sent to you before the auction closes. */}
                  You can receive a 30-minute text or 1-hour email reminder
                  before the auction closes.
                </li>
                <li>
                  {/* A summary of the auction result is emailed to you when it
                  closes. */}
                  When the auction concludes, you receive an email with a
                  summary of the results.
                </li>
                <li>
                  {/* Well email you if the vehicle is listed again on Gas Guzzlrs. */}
                  If the vehicle is listed on Gas Guzzlrs once more, we'll email
                  you.
                </li>
              </ul>
              <Link to="/settings" className="btn">
                <i className="fa-solid fa-list mr-2"></i>Go to My Watchlist
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GetAlerts;
