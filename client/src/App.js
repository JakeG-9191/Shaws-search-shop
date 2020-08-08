import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import jhuCovid from '../src/json/jhucovid.json';
import hackernews from '../src/json/hackernews.json';

function App() {
  const [info, setInfo] = useState([]);
  const [num, setNum] = useState(0);

  const callAPI = () => {
    let myArray = [];
    for (let i = 0; i < jhuCovid.length; i++) {
      let newTitle = jhuCovid[i].title;
      let newNum = jhuCovid[i].nums;
      myArray.push(newTitle, newNum);
    }
    setInfo([...info, myArray]);
  };

  const grabUpdatedInfo = () => {
    axios.get('/api/members').then((res) => console.log(res));
  };

  useEffect(() => {
    callAPI();
  }, []);

  return (
    <>
      <div className='App'>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <h1 className='App-title'>Welcome to the Thunder Dome</h1>
        </header>
        <button onClick={grabUpdatedInfo}>Begin Scrape</button>
        <div className='App-intro'>
          <button onClick={() => setNum(num + 2)}>Next Stats</button>
          <button onClick={() => setNum(0)}>Reset Stats</button>
          {info.map((info) => (
            <div>
              <h4>{info[num]}</h4>
              <p>{info[num + 1]}</p>
            </div>
          ))}
        </div>
        <hr />
        {/* <div className='App-intro'>
            {this.state.info2.map((info) => (
              <div>
                <p>{info}</p>
                <hr />
              </div>
            ))}
          </div> */}
      </div>
    </>
  );
}

export default App;
