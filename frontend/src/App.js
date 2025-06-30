import React, { useEffect, useState, useRef } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import gifImg from './butterfly.gif';
import RandomObject from './component/RandomObject.js';

function App() {
  const [targetPos, setTargetPos] = useState({ x: 0, y: 0 });
  const [butterflyPos, setButterflyPos] = useState({ x: 0, y: 0 });
  const [angle, setAngle] = useState(0);
  const [objects, setObjects] = useState([]);
  const lastX = useRef(0);
  const timeoutRef = useRef(null);
  const butterflySize = 80;
  const objectSize = 30;

  // const createRandomObject = () => {
  //   const x = Math.random() * (window.innerWidth - objectSize);
  //   const y = Math.random() * (window.innerHeight - objectSize);
  //   return { id: Math.random(), x, y };
  // };

  // const refillObjects = (currentObjects) => {
  //   const newObjects = [...currentObjects];
  //   while (newObjects.length < 10) {
  //     newObjects.push(createRandomObject());
  //   }
  //   return newObjects;
  // };

  // useEffect(() => {
  //   const initialObjects = Array.from({ length: 10 }, createRandomObject);
  //   setObjects(initialObjects);
  // }, []);

  // // Update butterfly position smoothly and check collisions
  // useEffect(() => {
  //   let animationFrameId;

  //   const moveButterfly = () => {
  //     setButterflyPos((prev) => {
  //       const dx = targetPos.x - prev.x;
  //       const dy = targetPos.y - prev.y;
  //       const speed = 0.95; // Increased speed to make butterfly stay very close to cursor
  //       const newX = prev.x + dx * speed;
  //       const newY = prev.y + dy * speed;

  //       // Check collision using butterfly's position (not cursor)
  //       setObjects((prevObjects) => {
  //         const remaining = prevObjects.filter((obj) => {
  //           const isColliding =
  //             newX < obj.x + objectSize &&
  //             newX + butterflySize > obj.x &&
  //             newY < obj.y + objectSize &&
  //             newY + butterflySize > obj.y;
  //           return !isColliding;
  //         });
  //         return refillObjects(remaining);
  //       });

  //       return { x: newX, y: newY };
  //     });

  //     animationFrameId = requestAnimationFrame(moveButterfly);
  //   };

  //   moveButterfly();

  //   return () => cancelAnimationFrame(animationFrameId);
  // }, [targetPos]);

  // const handleMouseMove = (e) => {
  //   const newX = e.clientX;
  //   const newY = e.clientY;
  //   const dx = newX - lastX.current;

  //   if (Math.abs(dx) > 10) {
  //     setAngle(dx > 0 ? 30 : -30);
  //     clearTimeout(timeoutRef.current);
  //     timeoutRef.current = setTimeout(() => setAngle(0), 300);
  //     lastX.current = newX;
  //   }

  //   setTargetPos({ x: newX, y: newY });
  // };

  // useEffect(() => {
  //   window.addEventListener('mousemove', handleMouseMove);
  //   return () => {
  //     window.removeEventListener('mousemove', handleMouseMove);
  //     clearTimeout(timeoutRef.current);
  //   };
  // }, []);

  return (
    <div>
      <img
        src={gifImg}
        alt="butterfly"
        style={{
          position: 'fixed',
          width: `${butterflySize}px`,
          height: `${butterflySize}px`,
          pointerEvents: 'none',
          zIndex: 9999,
          transform: `translate(${butterflyPos.x}px, ${butterflyPos.y}px) rotate(${angle}deg)`,
          transition: 'transform 0.05s linear',
        }}
      />

      {/* {objects.map((obj) => (
        <RandomObject key={obj.id} x={obj.x} y={obj.y} />
      ))} */}

      <div className="session">
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css" integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/" crossorigin="anonymous"></link>
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
                    <i className="fab fa-facebook-f icon"></i>
                  </a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/in/di%E1%BB%85m-tr%E1%BA%A7n-th%E1%BB%8B-ki%E1%BB%81u-797516336/">
                    <i className="fab fa-linkedin icon"></i>
                  </a>
                </li>
                <li>
                  <a href="https://github.com/sankatjm0">
                    <i className="fab fa-github icon"></i>
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com/sankatjm0/">
                    <i className="fab fa-instagram icon"></i>
                  </a>
                </li>
              </ul>
            </a>
          </div>
        </div>
        <div className="projects">
          <h2>PROJECTS</h2>
          <p>what I've done (probably not my life)</p>
          <div className="dropdown-content">
            {/* <Link to="/portfolio">My Portfolio</Link>
            <Link to="/maunguoi">Mau Nguoi Cua Cau La Gi ?</Link> */}
          </div>
        </div>

        <div name="ranking" id="ranking">
          <h2>RANKING</h2>
          <p>do you know there's a game?</p>
        </div>
        {/* <Routes>
          <Route path="/portfolio" element={<MyPortfolio />} />
          <Route path="/maunguoi" element={<MauNguoi />} />
          <Route path="/telegrambot" element={<TelegramBot />} />
        </Routes> */}
      </div>
    </div>
  );
}

export default App;