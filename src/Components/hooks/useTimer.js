import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';

const useTimer = (time) => {
    const [days, setDays] = useState();
    const [hours, setHours] = useState();
    const [minutes, setMinutes] = useState();
    const [seconds, setSeconds] = useState();
    const [newTiem] = useState(
     time || new Date("2022-11-17 12:30:00").getTime()
    );
    const now = new Date().getTime();
    const t = newTiem - now + 432000000;
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
    }, [days, hours, minutes, seconds]);
  
  return (
    {
        days, hours, minutes, seconds
    }
  )
}

export default useTimer