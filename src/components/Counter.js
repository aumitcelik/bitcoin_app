import React from 'react'
import { useState, useEffect } from 'react';
import CounterItem from './CounterItem';
import "./components.css";

function Counter() {
  const [hours, setHours] = useState(10);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds == 0) {
        if (minutes == 0) {
          if (hours == 0) {
            clearInterval(myInterval);
          } else {
            setHours(hours - 1);
            setMinutes(59);
            setSeconds(59);
          }
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  function increase(type) {
    switch (type) {
      case "hours":
        setHours(hours + 1);
        break;
      case "minutes":
        if (minutes == 59) {
          setHours(hours + 1);
          setMinutes(0);
          break;
        }
        setMinutes(minutes + 1);
        break;
      case "seconds":
        if (seconds == 59) {
          if (minutes == 59) {
            setHours(hours + 1);
            setMinutes(0);
            setSeconds(0);
            break;
          }
          setMinutes(minutes + 1);
          setSeconds(0);
          break;
        }
        setSeconds(seconds + 1);
        break;
    }
  }

  function decrease(type) {
    switch (type) {
      case "hours":
        if (hours > 0) {
          setHours(hours - 1);
          break;
        }
        break;
      case "minutes":
        if (minutes > 0) {
          setMinutes(minutes - 1);
          break;
        }
        if (hours > 0) {
          setHours(hours - 1);
          setMinutes(59);
          break;
        }
        break;
      case "seconds":
        if (seconds > 0) {
          setSeconds(seconds - 1);
          break
        }
        if (minutes > 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
          break;
        }
        if (hours > 0) {
          setHours(hours - 1);
          setMinutes(59);
          setSeconds(59);
          break;
        }
        break;
    }
  }

  return (
    <div className='parent' >
      <div className='counter-items'>
        <CounterItem counter={hours < 10 ? `0${hours}` : hours.toString()} increase={() => increase("hours")} decrease={() => decrease("hours")} />
        :
        <CounterItem counter={minutes < 10 ? `0${minutes}` : minutes.toString()} increase={() => increase("minutes")} decrease={() => decrease("minutes")} />
        :
        <CounterItem counter={seconds < 10 ? `0${seconds}` : seconds.toString()} increase={() => increase("seconds")} decrease={() => decrease("seconds")} />
      </div>
    </div>
  );
}

export default Counter;