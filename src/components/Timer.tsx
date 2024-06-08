import React, { useState, useEffect } from 'react';
import {styled} from "goober";

const DigitalClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerID = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timerID);
    };
  }, []);

  return (
    <Container>
      <p>{time.toLocaleTimeString()}</p>
    </Container>  );
};

export default DigitalClock;

const Container = styled("div")`
    margin: 24px 0 0 40px;
`