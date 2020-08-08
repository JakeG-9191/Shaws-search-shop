import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import jhuCovid from '../src/json/jhucovid.json';
import hackernews from '../src/json/hackernews.json';

function App() {
  const [info, setInfo] = useState([]);
  const [hnInfo, sethnInfo] = useState([]);
  const [jhCount, setjhCount] = useState(0);
  const [hnCount, sethnCount] = useState(0);

  const callJHInfo = () => {
    let myArray = [];
    for (let i = 0; i < jhuCovid.length; i++) {
      let newTitle = jhuCovid[i].title;
      let newNum = jhuCovid[i].nums;
      myArray.push(newTitle, newNum);
    }
    setInfo([...info, myArray]);
  };

  const callHNInfo = () => {
    let myArray = [];
    for (let i = 0; i < hackernews.length; i++) {
      let newTitle = hackernews[i].title;
      let newLink = hackernews[i].link;
      let newNum = hackernews[i].score;
      myArray.push(newTitle, newLink, newNum);
    }
    sethnInfo([...hnInfo, myArray]);
  };

  const grabUpdatedInfo = () => {
    axios.get('/api/members').then((res) => console.log(res));
  };

  useEffect(() => {
    callJHInfo();
    callHNInfo();
  }, []);

  return (
    <>
      <div className='App'>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <h1 className='App-title'>Welcome to the Thunder Dome</h1>
          <button onClick={grabUpdatedInfo}>Begin Scrape</button>
        </header>
        <div className='App-intro'>
          <button onClick={() => setjhCount(jhCount + 2)}>Next Stats</button>
          <button onClick={() => setjhCount(0)}>Reset Stats</button>
          <div>{3 - jhCount / 2} Statistics Remaining</div>
          {info.map((info) => (
            <div>
              <h4>{info[jhCount]}</h4>
              <p>{info[jhCount + 1]}</p>
            </div>
          ))}
        </div>
        <hr />
        <div className='App-intro'>
          <button onClick={() => sethnCount(hnCount + 3)}>Next Article</button>
          <button onClick={() => sethnCount(0)}>Reset Articles</button>
          {hnInfo.map((info) => (
            <div>
              <h4>{info[hnCount]}</h4>
              <a
                target='_blank'
                rel='noopener noreferrer'
                href={info[hnCount + 1]}
              >
                {info[hnCount + 1]}
              </a>
              <p>{info[hnCount + 2]}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
