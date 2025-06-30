import React, { useEffect, useState, useRef } from 'react';
import gifImg from './star.gif'

function RandomObject({ x, y }) {
  return (
    <img
      src={gifImg}
      style={{
        position: 'fixed',
        top: y,
        left: x,
        width: '50px',
        height: '50px',
        zIndex: 9997,
        pointerEvents: 'none',
      }}
    />
  );
}

export default RandomObject
