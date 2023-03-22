import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import events from "./Data";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import ShowMeeting from "../Dashboard/ShowMeeting";
import { useDispatch, useSelector } from "react-redux";
import { showModalLogin } from "../../../redux/reducers/login";

const Event = () => {
  moment.locale("en-GB");
  const localizer = momentLocalizer(moment);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [eventsData, setEventsData] = useState(events);
  const [getId, setGetId] = useState("");
  const logingUser = useSelector((state) => state);

  useEffect(() => {
    const fetchEventApi = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_URL}getAllEvent`);
        console.log(1019, res.data.data);

        const eventData = res.data.data.map((curElem) => {
          setGetId(curElem.id);
          // console.log(1019, res)
          return {
            title: curElem.title,
            start: new Date(curElem.start_date),
            end: new Date(curElem.end_date),
            resource: curElem.id,
          };
        });
        setEventsData(eventData);
      } catch (err) {
        console.log(err);
      }
    };
    fetchEventApi();
  }, []);

  const handleSelect = ({ start, end }) => {
    console.log(500, start);
    console.log(500, end);
    const title = window.prompt("New Event name");
    if (title)
      setEventsData([
        ...eventsData,
        {
          start,
          end,
          title,
        },
      ]);
  };

  const handleShow = () => {};

  const handleClick = () => {
    if (logingUser.login.token === null) {
      dispatch(showModalLogin());
    } else {
      navigate("/add-user-meeting-event");
    }
  };

  return (
    <div className="container clenderStyle ">
      <div className="text-right mb-1">
        {/* {logingUser.login.token && ( */}
        <button onClick={handleClick} className="orange_btn">
          Add Create Event
        </button>
        {/* )} */}
      </div>

      <Calendar
        // onSelectSlot={handleSelect}
        views={["day", "agenda", "work_week", "month"]}
        selectable
        localizer={localizer}
        defaultDate={new Date()}
        defaultView="month"
        events={eventsData}
        style={{ height: "100vh" }}
        onSelectEvent={(event) => navigate("/eventdetail/" + event.resource)}
        // onSelectEvent={(event) => alert(event.id)}
      />

      <ShowMeeting />
    </div>
  );
};

export default Event;
