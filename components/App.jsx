import React, { useState, useEffect, useRef } from 'react';
import Light from './Light';
import ControlButton from './ControlButton';
import db from './../index.js';
var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://localhost:1883');

function useInterval(callback, delay) {
  const savedCallback = useRef();
  
  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }

    if(delay > 0) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

function writeColorFirebase(color) {
  /* var database = db.database();
  db.database().ref("/").set({
    color: color
  }); */

  client.on('connect', () => {
    client.subscribe('time');
  });

  client.on('message', (topic, message) =>{
    console.log("Hello")
    setIsStarted(true);
    setCounter(message.parseInt()*1000)
    setTimeout(
    client.publish('color_inverse', color), message.parseInt()*1000)
  })
  
}

export default function App() {
  const SIGNAL_DELAY = 5;
  const [lightOn, setLightOn] = useState('red');
  const [delay, setDelay] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [counter, setCounter] = useState(0);

  useInterval(()=>{
    if(counter > 1) {
      setCounter(counter-1);
    } else {
      if(lightOn == 'red') {
        setLightOn('green');
        // codigo para guardar en fb
        setCounter(5);
        writeColorFirebase('green');
      } else if(lightOn == 'yellow') {
        setLightOn('red');
        setCounter(5);
        writeColorFirebase('red');
      } else if(lightOn == 'green') {
        setLightOn('yellow');
        setCounter(3);
        writeColorFirebase('yellow');
      }
    }
  }, delay);

  useEffect(()=>{
    if(isStarted) {
      setLightOn('red');
      writeColorFirebase('red');
      setCounter(SIGNAL_DELAY);
      setDelay(1000);
    } else {
      setLightOn(null);
      setCounter(0);
      setDelay(0);
    }
  }, [isStarted])


  return (
    <>
      <div><h1>Traffic Lights simulator</h1></div>
      <div className="traffic-lights-container">
        <Light on={lightOn == 'red'} color="#cc3232" />
        <Light on={lightOn == 'yellow'} color="#e7b416" />
        <Light on={lightOn == 'green'} color="#2dc937" />
      </div>
      <div>
        <ControlButton label="Start" disabled={isStarted} onClick={()=>{setIsStarted(true)}} />
        <ControlButton label={counter.toString().padStart(2, '0')} />
        <ControlButton label="Stop" disabled={!isStarted} onClick={()=>{setIsStarted(false)}}/>
      </div>
    </>
  )
}