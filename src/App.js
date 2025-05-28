import logo from './logo.svg';
import './App.css';

function App() {
  return (
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
          <a href="#">Item 1</a>
          <a href="#">Item 2</a>
          <a href="#">Item 3</a>
        </div>
      </div>
      <div name='ranking' id='ranking'>
        <h2>RANKING</h2>
        <p>do you know there's a game?</p>
      </div>
    </div>
  );
}

export default App;
