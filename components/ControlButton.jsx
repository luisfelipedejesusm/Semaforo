import React from 'react';

export default function ControlButton({label, disabled, onClick}) {
  return (
    <button className="control-btn" onClick={onClick} disabled={disabled}>{label}</button>
  )
}