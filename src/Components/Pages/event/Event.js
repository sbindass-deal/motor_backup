import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import events from "./Data";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import ShowMeeting from "../Dashboard/ShowMeeting";

moment.locale("en-GB");
const localizer = momentLocalizer(moment);
const Event = () => {
  const navigate = useNavigate();
  const [eventsData, setEventsData] = useState(events);
  const [getId, setGetId] = useState('')
  

  useEffect(() => {
    const fetchEventApi = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_URL}getAllEvent`);
        console.log(1019, res.data.data)

        const eventData = res.data.data.map((curElem) => {
          setGetId(curElem.id)
          // console.log(1019, res)
          return {
            title: curElem.title,
            start: new Date(curElem.start_date),
            end: new Date(curElem.end_date),
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
    console.log(500,start);
    console.log(500,end);
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

  return (
    
    <div className="container clenderStyle pb-5 mb-5 px-5">
      <Calendar
        // onSelectSlot={handleSelect}
        views={["day", "agenda", "work_week", "month"]}
        selectable
        localizer={localizer}
        defaultDate={new Date()}
        defaultView="month"
        events={eventsData}
        style={{ height: "100vh" }}
        onSelectEvent={(event) => navigate("/eventdetail/" + getId)}
        // onSelectEvent={(event) => alert(event.id)}
      />

      <ShowMeeting/>
    </div>
  );
};

export default Event;
