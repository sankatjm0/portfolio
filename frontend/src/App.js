import React, { useEffect, useState } from 'react';
import './App.css';
import gifImg from './butterfly.gif';


function App() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [angle, setAngle] = useState(0);
  const [lastPos, setLastPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const newX = e.clientX;
      const newY = e.clientY;

      const dx = newX - lastPos.x;
      const dy = newY - lastPos.y;

      const newAngle = Math.atan2(dy, dx) * (180 / Math.PI);

      setAngle(newAngle);
      setPos({ x: newX, y: newY });
      setLastPos({ x: newX, y: newY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [lastPos]);

  return (
    <div>
      <img src={gifImg}
        alt="follow-cursor"
        style={{
          position: 'fixed',
          left: pos.x+30,
          top: pos.y+30,
          width: '80px',
          height: '80px',
          pointerEvents: 'none',
          zIndex: 9999,
          transform: `translate(-50%, -50%) rotate(${angle}deg)`,
          transition: 'transform 0.000001s linear, left 0.000001s linear, top 0.000001s linear',
        }}
      />

      <div class='session'>
        <div name='about-me' id='about'>
          <h2>ABOUT ME</h2>
          <p>wanna hear something?</p>
        </div>
        <div name='contact' id='contact'>
          <h2>CONTACT</h2>
          <p>get in touch w/ me</p>
        </div>
        <div class="projects">
          <h2>PROJECTS</h2>
          <p>what I've done (probably not my life)</p>
          <div class="dropdown-content">
            <a href="https://sankatjm0.github.io/portfolio">My Portfolio</a>
            <a href="#">Mau Nguoi Cua Cau La Gi ?</a>
            <a href="#">Telegram Bot</a>
          </div>
        </div>
        <div name='ranking' id='ranking'>
          <h2>RANKING</h2>
          <p>do you know there's a game?</p>
        </div>
      </div>
    </div>
  );
}

export default App;
