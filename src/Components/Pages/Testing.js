import React,{useState} from 'react'
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import events from "./Testing1";
import "react-big-calendar/lib/css/react-big-calendar.css";


moment.locale("en-GB");
const localizer = momentLocalizer(moment);
const Testing = () => {

    const [eventsData, setEventsData] = useState(events);

  return (
      <div>
          <Calendar
              views={["day", "agenda", "work_week", "month"]}
              selectable
              localizer={localizer}
              defaultDate={new Date()}
              defaultView="month"
              events={eventsData}
              style={{ height: "100vh" }}
              onSelectEvent={(event) => alert(event.title)}

          />
    </div>
  )
}

export default Testing