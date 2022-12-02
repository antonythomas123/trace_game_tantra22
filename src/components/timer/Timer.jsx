import React, { useEffect, useState } from 'react'

function Timer() {

    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);

    var timer;
    useEffect(() => {
        timer = setInterval(()=> {
            setSeconds(seconds+1);
            if(seconds === 59){
                setMinutes(minutes + 1);
                setSeconds(0);
            }
        },1000)
        return () => clearInterval(timer);
    })
  return (
    <div>
        <span>{minutes < 10 ? '0'+ minutes : minutes}:{seconds < 10 ? '0' + seconds: seconds}</span>
    </div>
  )
}

export default Timer