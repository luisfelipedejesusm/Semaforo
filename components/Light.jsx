import React from 'react';

export default function Light({on, color}) {
  return (
    <div className="traffic-light" style={{background: (on ? color : 'unset')}}></div>
  )
}