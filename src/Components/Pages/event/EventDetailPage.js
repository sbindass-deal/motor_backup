import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { strToHtml } from "../../UI/globaleVar";
import parse from "html-react-parser";

const EventDetailPage = () => {
  const { id } = useParams();
  const [getEventdata, setGetEventdata] = useState([]);
  const [getRecentEventdata, setRecentGetEventdata] = useState([]);
  const [getUpcomingEventdata, setUpcomingGetEventdata] = useState([]);
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    const fetchMeeting = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_URL}getEventBYId/${id}`
        );
        setGetEventdata(res.data.data);
        setUpcomingGetEventdata(res.data.data.upcommingEvents);
        setRecentGetEventdata(res.data.data.recentEvents);
      } catch (err) {
        console.log(err);
      }
    };
    fetchMeeting();
  }, []);

  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-md-3 ">
          <div className="box_backgroundD">
            <h3 class="cardTitle">Recent Event</h3>
            {getRecentEventdata.map((curVal) => {
              return (
                <p className="carFlx ">
                  <p>
                    <img
                      src={`https://api.gasguzzlrs.com/upload/event/${curVal.image}`}
                      alt=""
                    />
                    <p>
                      {curVal?.description &&
                        parse(curVal?.description?.substr(0, 150), strToHtml)}
                    </p>
                    <p>
                      <span>Start Date : {curVal.start_date}</span>
                      <br />
                      <span>End Date : {curVal.end_date}</span>
                    </p>
                  </p>
                </p>
              );
            })}
          </div>

          <div className="box_backgroundD mt-15">
            <h3 class="cardTitle">Upcoming Events</h3>
            {getUpcomingEventdata.map((curVal) => {
              return (
                <ol>
                  <li>
                    <span>{curVal.title} </span>

                    <div>
                      <span>Start Date : {curVal.start_date}</span> -{" "}
                      <span>End Date : {curVal.end_date}</span>{" "}
                    </div>

                    <hr />
                  </li>
                </ol>
              );
            })}
          </div>
        </div>
        <div className="col-md-9 eventRightSide">
          {/* <p>All Event</p> */}
          <div class="col-12 ">
            <h2>{getEventdata.title}</h2>
          </div>
          {/* <h1 className="textHeading"></h1> */}
          <div className="postHero pb_30 detail">
            <img
              className="img-fluid"
              src={`https://api.gasguzzlrs.com/upload/event/${getEventdata.image}`}
              alt=""
            />
          </div>
          <div class="card_">
            <h3 class="cardTitle">From the organizer</h3>

            <p>
              {" "}
              {getEventdata?.description &&
                parse(getEventdata?.description, strToHtml)}
            </p>
          </div>
          <div class="card_">
            <h3 class="cardTitle">Details</h3>
            <p>
              <span>Start</span> {getEventdata.start_date}
            </p>
            <p>
              <span>End</span> {getEventdata.end_date}
            </p>
            <p>
              <span>Website</span> {getEventdata.url}
            </p>
          </div>
          <div class="card_">
            <h3 class="cardTitle">Share Post</h3>
            <div class="post-share">
              <a
                class="post-share-link post-share-link-facebook"
                href={getEventdata.facebook}
                target="_blank"
                title="Facebook"
                aria-label="Share this listing on Facebook"
                data-share-height="300"
                data-share-width="609"
              >
                <i class="fa-brands fa-facebook"></i>
              </a>

              <a
                class="post-share-link post-share-link-twitter"
                href={getEventdata.twitter}
                target="_blank"
                title="Twitter"
                aria-label="Share this listing on Twitter"
                data-share-height="257"
                data-share-width="626"
              >
                <i class="fa-brands fa-twitter"></i>
              </a>

              <a
                class="post-share-link post-share-link-email poppable-link"
                href={getEventdata.email}
                target="_blank"
                aria-label="Share this listing on email"
              >
                <i class="fa-solid fa-envelope"></i>
              </a>
            </div>
          </div>
          <div className="card_ ">
            <div className="row">
              <div className="col-12">
                <h3 class="cardTitle">Comments</h3>
                <form action="" onSubmit={handleSubmit}>
                  <textarea
                    name=""
                    id=""
                    cols="74"
                    rows="3"
                    class="field"
                  ></textarea>
                  <span class="subscribe-to-comments">
                    Keep me in this conversation via email
                  </span>
                  <br />
                  <br />
                  <input type="submit" class="btn" value="Submit" />
                  <div class="comment-submission-actions">
                    <div class="comment-submission-actions-subscribe"></div>
                    <div class="comment-submission-actions-submit"></div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailPage;
