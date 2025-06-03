import React, { useEffect, useState, useRef } from 'react';
import './App.css';
import gifImg from './butterfly.gif';

function App() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [angle, setAngle] = useState(0);
  const lastX = useRef(0);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const newX = e.clientX;
      const dx = newX - lastX.current;

      if (Math.abs(dx) > 10) {
        if (dx > 0) {
          setAngle(30);
        } else {
          setAngle(-30);
        }

        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
          setAngle(0);
        }, 300);

        lastX.current = newX;
      }

      setPos({ x: newX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    
    <div>
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css" integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/" crossorigin="anonymous"></link>
      <img
        src={gifImg}
        alt="follow-cursor"
        style={{
          position: 'fixed',
          width: '80px',
          height: '80px',
          pointerEvents: 'none',
          zIndex: 9999,
          transform: `translate3d(${pos.x-1000}px, ${pos.y-400}px, 0) rotate(${angle}deg)`,
          transition: 'transform 0.2s ease',
        }}
      />

      <div className="session">
        <div name="about-me" id="about">
          <h2>ABOUT ME</h2>
          <p>wanna hear something?</p>
        </div>
        <div className="contact" id="contact">
          <h2>CONTACT</h2>
          <p>get in touch w/ me</p>
          <div className="dropdown-content">
            <a href="#">
              <ul>
                <li>
                  <a href="https://facebook.com/sankatimo">
                    <i class="fab fa-facebook-f icon"></i>    </a>
                </li>
                <li>
                  <a href="#"><i class="fab fa-linkedin icon"></i></a>
                </li>
                <li>
                  <a href="https://github.com/sankatjm0"><i class="fab fa-github icon"></i></a></li>
                <li>
                  <a href="https://www.instagram.com/sankatjm0/"><i class="fab fa-instagram icon"></i></a></li>
              </ul>
            </a>
          </div>
        </div>
        <div className="projects">
          <h2>PROJECTS</h2>
          <p>what I've done (probably not my life)</p>
          <div className="dropdown-content">
            <a href="https://sankatjm0.github.io/portfolio">My Portfolio</a>
            <a href="#">Mau Nguoi Cua Cau La Gi ?</a>
            <a href="#">Telegram Bot</a>
          </div>
        </div>
        <div name="ranking" id="ranking">
          <h2>RANKING</h2>
          <p>do you know there's a game?</p>
        </div>
      </div>
    </div>
  );
}

export default App;
