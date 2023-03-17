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
        console.log(56565, res.data.data);
        console.log(56565, "r", res.data.data.recentEvents);
        console.log(56565, "u", res.data.data.upcommingEvents);
      } catch (err) {
        console.log(err);
      }
    };
    fetchMeeting();
  }, []);

  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-md-3">
          <h6 className="textHeading">Recent Event</h6>
          {getRecentEventdata.map((curVal) => {
            console.log(787989, curVal);
            return (
              <p className="imagepart ">
                <p>
                  <img
                    width={200}
                    src={`https://api.gasguzzlrs.com/upload/event/${curVal.image}`}
                    alt=""
                  />
                  <p>
                    {curVal.description && parse(curVal.description, strToHtml)}
                  </p>
                  <p>
                    <span>Start Date : {curVal.start_date}</span> -{" "}
                    <span>End Date : {curVal.end_date}</span>
                  </p>
                </p>
              </p>
            );
          })}

          <div>
            <h5 class="widget-title">Upcoming Events</h5>
            {getUpcomingEventdata.map((curVal) => {
              console.log(888, curVal);
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
        <div className="col-md-7">
          <p>All Event</p>
          <h1 className="textHeading">{getEventdata.title}</h1>
          <p>
            <img
              className="img-fluid"
              src={`https://api.gasguzzlrs.com/upload/event/${getEventdata.image}`}
              alt=""
            />
          </p>

          <br />
          <br />
          <hr />
          <h3>From the organizer:</h3>
          <p>
            {getEventdata.description &&
              parse(getEventdata.description, strToHtml)}
          </p>
          <br />
          <br />
          <hr />
          <h5 className="textHeading">details</h5>
          <div>
            <span>Start</span>
            <p>{getEventdata.start_date}</p>
          </div>

          <div>
            <span>End</span>
            <p>{getEventdata.end_date}</p>
          </div>

          <div>
            <span>Website</span>
            <p>{getEventdata.url}</p>
          </div>
          <br />
          <br />
          <hr />

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
              <img
                src="https://bringatrailer.com/wp-content/themes/bringatrailer/assets/img/social-facebook.svg"
                alt="Facebook icon"
                aria-hidden="true"
              />{" "}
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
              <img
                src="https://bringatrailer.com/wp-content/themes/bringatrailer/assets/img/social-twitter.svg"
                alt="Twitter icon"
                aria-hidden="true"
              />{" "}
            </a>

            <a
              class="post-share-link post-share-link-email poppable-link"
              href={getEventdata.email}
              target="_blank"
              aria-label="Share this listing on email"
            >
              <img
                src="https://bringatrailer.com/wp-content/themes/bringatrailer/assets/img/social-email.svg"
                alt="Email icon"
                aria-hidden="true"
              />{" "}
            </a>
          </div>

          <div class="comments-header">
            <a id="comments-anchor"></a>
            <h4
              class="comments-title"
              data-realtime_id="54577401"
              data-realtime_prop="comments-updated.display"
            >
              No Comments
            </h4>
          </div>

          <div>
            <form action="" onSubmit={handleSubmit}>
              <textarea name="" id="" cols="74" rows="3"></textarea>
              <div class="comment-submission-actions">
                <div class="comment-submission-actions-subscribe">
                  <span class="subscribe-to-comments">
                    Keep me in this conversation via email
                  </span>
                </div>
                <div class="comment-submission-actions-submit">
                  <input
                    type="submit"
                    class="submit button button-white button-narrow "
                    value="Submit"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailPage;
