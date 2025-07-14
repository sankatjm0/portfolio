import React, { useEffect, useState, useRef } from 'react';
import './App.css';
import SlideShow from './component/SlideShow.js';
import gifImg from './img/butterfly.gif';
import RandomObject from './component/RandomObject.js';
import { createClient } from '@supabase/supabase-js'


function App() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [objects, setObjects] = useState([]);
  const [score, setScore] = useState(0);
  const [showGame, setShowGame] = useState(true);
  const [playerName, setPlayerName] = useState('');
  const supabaseUrl = 'https://qjqkznyvvktlozcmbsjf.supabase.co'
  const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFqcWt6bnl2dmt0bG96Y21ic2pmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIyMDY5MDcsImV4cCI6MjA2Nzc4MjkwN30.gAppGJBCRhYdt03F4L5q1zLLjrC1Y98kZqWcQqEAV_o'

  const supabase = createClient(supabaseUrl, supabaseAnonKey)

  const saveScoreToSupabase = async (playerName, newScore) => {
    const { error: updateError } = await supabase
      .from('ranking')
      .update({ score: newScore })
      .eq('name', playerName);

    if (updateError) {
      console.error('Update score error:', updateError);
      return;
    }

    const { data: topPlayers, error: refreshError } = await supabase
      .from('ranking')
      .select('*')
      .order('score', { ascending: false });

    if (refreshError) {
      console.error('Refresh error:', refreshError);
      return;
    }

    if (topPlayers.length > 3) {
      const excessEntries = topPlayers.slice(3);

      for (const entry of excessEntries) {
        await supabase.from('ranking').delete().match({ name: entry.name });
      }
    }

    setTopScores(topPlayers.slice(0, 3));
  };


  const [topScores, setTopScores] = useState([]);
  const [angle, setAngle] = useState(0);
  const [currentPage, setCurrentPage] = useState("home");
  const lastX = useRef(0);
  const timeoutRef = useRef(null);
  const butterflyRef = useRef({ x: 0, y: 0 });
  const butterflySize = 60;
  const objectSize = 30;

  const createRandomObject = () => {
    const x = Math.random() * (window.innerWidth - objectSize);
    const y = Math.random() * (window.innerHeight - objectSize);
    return { id: Math.random(), x, y };
  };

  const refillObjects = (currentObjects) => {
    const newObjects = [...currentObjects];
    while (newObjects.length < 10) {
      newObjects.push(createRandomObject());
    }
    return newObjects;
  };

  useEffect(() => {
    const names = ['Alice', 'Bob', 'Charlie', 'Diem', 'Tom', 'Jerry'];
    const randomName = names[Math.floor(Math.random() * names.length)];
    setPlayerName(randomName);

    const checkAndCreatePlayer = async () => {
      const { data, error } = await supabase
        .from('ranking')
        .select('score')
        .eq('name', randomName)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') {
        console.error('Fetch error:', error);
        return;
      }

      if (!data) {
        await supabase.from('ranking').insert([{ name: randomName, score: 0 }]);
      }
    };

    checkAndCreatePlayer();

    const initialObjects = Array.from({ length: 10 }, createRandomObject);
    setObjects(initialObjects);
  }, []);


  useEffect(() => {
    if (!showGame || currentPage !== "home") return;
    const moveDelay = 0.5;
    let animationFrameId;

    const moveButterfly = () => {
      butterflyRef.current.x += (pos.x - butterflyRef.current.x) * moveDelay;
      butterflyRef.current.y += (pos.y - butterflyRef.current.y) * moveDelay;

      setObjects((prevObjects) => {
        const remaining = prevObjects.filter((obj) => {
          const isColliding =
            butterflyRef.current.x < obj.x + objectSize &&
            butterflyRef.current.x + butterflySize > obj.x &&
            butterflyRef.current.y < obj.y + objectSize &&
            butterflyRef.current.y + butterflySize > obj.y;
          if (isColliding) {
            setScore((prev) => {
              const newScore = prev + 1;

              saveScoreToSupabase(playerName, newScore);

              return newScore;
            });
          }

          return !isColliding;
        });
        return refillObjects(remaining);
      });

      animationFrameId = requestAnimationFrame(moveButterfly);
    };

    moveButterfly();

    return () => cancelAnimationFrame(animationFrameId);
  }, [pos, showGame, currentPage]);

  const handleMouseMove = (e) => {
    const newX = e.clientX;
    const newY = e.clientY;
    const dx = newX - lastX.current;

    if (Math.abs(dx) > 10) {
      setAngle(dx > 0 ? 30 : -30);
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setAngle(0), 300);
      lastX.current = newX;
    }

    setPos({ x: newX, y: newY });
  };

  useEffect(() => {
    const fetchTopScores = async () => {
      const { data, error } = await supabase
        .from('ranking')
        .select('*')
        .order('score', { ascending: false })
        .limit(3);

      if (error) {
        console.error('Fetch top scores error:', error);
      } else {
        setTopScores(data);
      }
    };

    fetchTopScores();
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timeoutRef.current);
    };
  }, []);

  const toggleGame = () => setShowGame(!showGame);
  const goToProjectDetail = () => setCurrentPage("projectDetail");
  const goBackHome = () => setCurrentPage("home");

  return (
    <div>

      {currentPage === "home" && (
        <>
          {showGame && (
            <img
              src={gifImg}
              alt="butterfly"
              style={{
                position: 'fixed',
                width: `${butterflySize}px`,
                height: `${butterflySize}px`,
                left: pos.x + 50,
                top: pos.y + 50,
                pointerEvents: 'none',
                zIndex: 9999,
                transform: `translate(-50%, -50%) rotate(${angle}deg)`,
                transition: 'transform 0.5s linear',
              }}
            />
          )}

          {showGame &&
            objects.map((obj) => (
              <RandomObject key={obj.id} x={obj.x} y={obj.y} />
            ))}

          <div className="session">
            <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css" integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/" crossorigin="anonymous"></link>
            <div name="about-me" id="about">
              <h2>ABOUT ME</h2>
              <p>wanna hear something?</p>

              <div className="about-dropdown">
                <p>Hello! I'm Diem — a creative and passionate developer (i love databases).</p>
                <p>I love building interactive webs and telling stories through code and design.</p>
              </div>
            </div>


            <div className="contact" id="contact">
          <h2>CONTACT</h2>
          <p>get in touch w/ me</p>
          <div className="dropdown-content">
              <ul className='social-icons'>
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
          </div>
        </div>

            <div name="toggle-effect" id="toggle-effect">
              <h2>Show Effect</h2>
              <label className="switch">
                <input onClick={toggleGame} type="checkbox" defaultChecked />
                <span className="slider round"></span>
              </label>
            </div>

            <div className="projects">
              <h2>PROJECTS</h2>
              <p>what I've done (probably not my life)</p>
              <div className="dropdown-content">
                <a href="https://sankatimo.github.io/portfolio">My Portfolio</a>
                <a href="#" onClick={goToProjectDetail}>Mau Nguoi Cua Cau La Gi ?</a>
              </div>
            </div>

            <div name="ranking" id="ranking">
              <h2>RANKING</h2>
              <p>do you know there's a game?</p>
              <div className="ranking-content">
                
                <ul className="ranking-list">
                  {topScores.map((entry, idx) => (
                    <li key={idx}>{entry.name}: {entry.score}</li>
                  ))}
                </ul>

              </div>
            </div>
            <h4>{playerName}</h4>
            <p>{score}</p>
          </div>
        </>
      )}

      {currentPage === "projectDetail" && (
        <div style={{ padding: '20px'}}>
          <h2 style={{margin: '20px'}}>Mẫu Người Của Cậu Là Gì ?</h2>

          <div style={{ marginBottom: '20px' }}>
            <SlideShow />
          </div>


          <div style={{ fontSize: '18px', lineHeight: '1.6', marginBottom: '20px' }}>
            <p><strong>About the Product<br/><br/></strong>
              What's Your Type? is a creative personality book that helps you discover which 'type of person' you are based on your habits, quirks, and little truths about yourself.<br/><br/>
              From 'The Crybaby Lord' to 'The Overthinking Commander,' it captures the fun and relatable traits of Gen Z with humor and warmth.<br/><br/>
              Loved by over 1 million followers, this book turns those personal traits into a fun way to describe yourself and your friends.
            </p>
          </div>

          <button onClick={goBackHome} style={{ padding: '10px 20px', borderRadius: '5px', background: '#e990ffaf', color: '#9c36b5', border: 'none', cursor: 'pointer' }}>
            Home
          </button>
        </div>
        
      )}

    </div>
  );
}

export default App;
