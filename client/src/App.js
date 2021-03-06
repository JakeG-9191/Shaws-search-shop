import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jhuCovid from '../src/json/jhucovid.json';
import hackernews from '../src/json/hackernews.json';
import drscrape from '../src/json/dRboats.json';
import bbcscrape from '../src/json/bbc.json';
import './App.css';

function App() {
  const [info, setInfo] = useState([]);
  const [hnInfo, sethnInfo] = useState([]);
  const [drInfo, setDrInfo] = useState([]);
  const [bbcInfo, setBBCInfo] = useState([]);
  const [jhCount, setjhCount] = useState(0);
  const [hnCount, sethnCount] = useState(0);
  const [drCount, setDrCount] = useState(0);
  const [bbcCount, setBBCCount] = useState(0);

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

  const callDrInfo = () => {
    let myArray = [];
    for (let i = 0; i < drscrape.length; i++) {
      let newItem = drscrape[i].name;
      let newBrand = drscrape[i].brand;
      let newPrice = drscrape[i].price;
      let newImage = drscrape[i].image;
      myArray.push(newItem, newBrand, newPrice, newImage);
    }
    setDrInfo([...drInfo, myArray]);
  };

  const callBBCInfo = () => {
    let myArray = [];
    for (let i = 0; i < bbcscrape.length; i++) {
      let newTitle = bbcscrape[i].title;
      let newLink = bbcscrape[i].link;
      myArray.push(newTitle, newLink);
    }
    setBBCInfo([...bbcInfo, myArray]);
  };

  const grabUpdatedInfo = () => {
    axios.get('/api/members').then((res) => console.log(res));
  };

  useEffect(() => {
    callJHInfo();
    callHNInfo();
    callDrInfo();
    callBBCInfo();
  }, []);

  return (
    <>
      <div className='App'>
        <h1 className='App-title'>Welcome to the Thunder Dome</h1>
        <button onClick={grabUpdatedInfo}>Begin Scrape</button>

        <div className='App-intro'>
          {jhCount < jhuCovid.length * 2 - 2 ? (
            <button variant='primary' onClick={() => setjhCount(jhCount + 2)}>
              Next Stat
            </button>
          ) : (
            ''
          )}
          {jhCount > 0 ? (
            <button onClick={() => setjhCount(jhCount - 2)}>Last Stat</button>
          ) : (
            ''
          )}
          <button onClick={() => setjhCount(0)}>Reset Stats</button>
          <div>{jhuCovid.length - 1 - jhCount / 2} Statistics Remaining</div>
          {info.map((info) => (
            <div key={info.length}>
              <h4>{info[jhCount]}</h4>
              <p>{info[jhCount + 1]}</p>
            </div>
          ))}
        </div>

        <hr />

        <div className='App-intro'>
          {hnCount < hackernews.length * 3 - 3 ? (
            <button onClick={() => sethnCount(hnCount + 3)}>
              Next Article
            </button>
          ) : (
            ''
          )}
          {hnCount > 0 ? (
            <button onClick={() => sethnCount(hnCount - 3)}>
              Last Article
            </button>
          ) : (
            ''
          )}
          <button onClick={() => sethnCount(0)}>Reset Articles</button>
          <div>{hackernews.length - 1 - hnCount / 3} Articles Remaining</div>
          {hnInfo.map((info) => (
            <div key={info.length}>
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

        <hr />

        <div className='App-intro'>
          {bbcCount < bbcscrape.length * 2 - 2 ? (
            <button onClick={() => setBBCCount(bbcCount + 2)}>
              Next Article
            </button>
          ) : (
            ''
          )}
          {bbcCount > 0 ? (
            <button onClick={() => setBBCCount(bbcCount - 2)}>
              Last Article
            </button>
          ) : (
            ''
          )}
          <button onClick={() => setBBCCount(0)}>Reset Articles</button>
          <div>{bbcscrape.length - 1 - bbcCount / 2} Articles Remaining</div>
          {bbcInfo.map((info) => (
            <div key={info.length}>
              <h2>{info[bbcCount]}</h2>
              <a
                target='_blank'
                rel='noopener noreferrer'
                href={`https://www.bbc.com${info[bbcCount + 1]}`}
              >
                {info[bbcCount + 1]}
              </a>
            </div>
          ))}
        </div>

        <hr />

        <div className='App-intro'>
          {drCount < drscrape.length * 4 - 4 ? (
            <button onClick={() => setDrCount(drCount + 4)}>Next Item</button>
          ) : (
            ''
          )}
          {drCount > 0 ? (
            <button onClick={() => setDrCount(drCount - 4)}>Last Item</button>
          ) : (
            ''
          )}
          <button onClick={() => setDrCount(0)}>Reset Item Search</button>
          <div>{drscrape.length - 1 - drCount / 4} Items Remaining</div>
          {drInfo.map((info) => (
            <div key={info.length}>
              <h2>{info[drCount]}</h2>
              <h4>{info[drCount + 1]}</h4>
              <p>{info[drCount + 2]}</p>
              <img src={info[drCount + 3]} alt={info[drCount]}></img>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
