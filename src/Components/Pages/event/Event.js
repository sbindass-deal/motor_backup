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
import { toast } from "react-toastify";

const Event = () => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  moment.locale("en-GB");
  const localizer = momentLocalizer(moment);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [eventsData, setEventsData] = useState(events);
  const [getId, setGetId] = useState("");
  const logingUser = useSelector((state) => state);
  const [loading, setLoading]=useState(false)
  
  const [getDateYear, setGetDateYear] = useState({
    datemonth: "",
    eventtitle: "",
  });

  const handleChangedate = (e) => {
    setGetDateYear({ ...getDateYear, [e.target.name]: e.target.value});
  }

 

  const d = new Date(getDateYear?.datemonth);
  console.log(98080, d.getFullYear());
  console.log(98080, d.getMonth() + 1);

  const notify = (val) =>
  toast.success(val, {
    position: "bottom-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
  const handleEventData = () => {
   setLoading(true)
    axios
      .post(`${process.env.REACT_APP_URL}getEventsByMonthYear`, {
        year: d.getFullYear(),
        month: d.getMonth() + 1,
        title: getDateYear.eventtitle,
      })
      .then(function (response) {
        console.log(998, response.data.data);
        if (response.data.status === 200) {
          // setEventsData(response?.data?.data);
          setLoading(false)
          notify(response.data.message);
          setGetDateYear({
            datemonth: "",
            eventtitle: "",
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  console.log(9789, eventsData);

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
    <>
      <section class="heroSection event d-flex align-items-center">
        <div class="container">
          <div class="row">
            <div class="col-12 col-lg-6 ">
              <div class="heroText textAlignLeft">
                <h1>
                  Events for {monthNames[new Date().getMonth()]}{" "}
                  {new Date().getFullYear()}
                </h1>
                {/* <h5>
                    Are you interested in benefitting a charity by offering a
                    vehicle on Gas Guzzlrs Auctions? We can do that!
                  </h5> */}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container clenderStyle ">
        <div className="inputData">
          <div>
            <input
              onChange={handleChangedate}
              className="inputDataInput"
              type="month"
              name="datemonth"
              id=""
              value={getDateYear.datemonth}
            />
          </div>
          <div className="ml-3">
            <input
              className="inputDataInput"
              type="text"
              name="eventtitle"
              id=""
              placeholder="Enter Event Name"
              onChange={handleChangedate}
              value={getDateYear.eventtitle}
            />
          </div>
          <div className="ml-3">
            {loading ? (
              <div class="text-center">
                <div class="spinner-border" role="status">
                  <span class="sr-only">Loading...</span>
                </div>
              </div>
            ) : (
              <button onClick={handleEventData} className="inputDataInput">
                Search
              </button>
            )}
          </div>
        </div>
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
    </>
  );
};

export default Event;
