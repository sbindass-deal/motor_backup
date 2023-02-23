import React,{useState} from 'react'
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import events from "./Testing1";
import "react-big-calendar/lib/css/react-big-calendar.css";


moment.locale("en-GB");
const localizer = momentLocalizer(moment);
const Testing = () => {

    const [eventsData, setEventsData] = useState(events);
    const handleSelect = ({ start, end }) => {
      console.log(start);
      console.log(end);
      const title = window.prompt("New Event name");
      if (title)
        setEventsData([
          ...eventsData,
          {
            start,
            end,
            title
          }
        ]);
    };

  return (
      <div className='container' style={{zIndex:"999"}} >
          <Calendar
          onSelectSlot={handleSelect}
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