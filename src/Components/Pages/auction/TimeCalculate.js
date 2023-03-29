import React, { useEffect } from 'react'
import { useState } from 'react';

const TimeCalculate = ({ endTime }) => {
    // countdown time start
    const [days, setDays] = useState();
    const [hours, setHours] = useState();
    const [minutes, setMinutes] = useState();
    const [seconds, setSeconds] = useState();
    const [newTiem, setNewTiem] = useState(
        new Date(endTime).getTime()
    );

    // new Date("2022-11-30 14:57:00").getTime()
    const now = new Date().getTime();
    const t = parseInt(newTiem - now, 10);
    useEffect(() => {
        const interval = setInterval(() => {
            setDays(Math.floor(t / (1000 * 60 * 60 * 24)));
            setHours(Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
            setMinutes(Math.floor((t % (1000 * 60 * 60)) / (1000 * 60)));
            setSeconds(Math.floor((t % (1000 * 60)) / 1000));
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [days, hours, minutes, seconds, newTiem]);

  // countdown time end
  return (
      <div>
          {t > 0 ? (
              <li>
                  <span>
                      <label>Ends In:&nbsp;</label>
                      {days > 0 && days+""+"days"}, {hours <= 9 && "0"}
                      {/* {days}days, {hours <= 9 && "0"} */}
                      {hours > 0 && hours+""+"h"} : {minutes <= 9 && "0"}
                      {minutes > 0 && minutes+""+"m"} : {seconds <= 9 && "0"}
                      {seconds}s
                  </span>
              </li>
          ) : (
              <>
                      <li className="text-danger">BIDDING CLOSED</li>
              </>
          )}
    </div>
  )
}

export default TimeCalculate