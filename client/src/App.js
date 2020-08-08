import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import jhuCovid from '../src/json/jhucovid.json';
import hackernews from '../src/json/hackernews.json';

class App extends Component {
  state = {
    info: [],
    info2: [],
  };

  callAPI() {
    let myArray = [];
    for (let i = 0; i < jhuCovid.length; i++) {
      let newTitle = jhuCovid[i].title;
      let nemNum = jhuCovid[i].nums;
      myArray.push(newTitle, nemNum);
    }
    this.setState({
      info: myArray,
    });
  }

  callAPI2() {
    let myArray = [];
    for (let i = 0; i < hackernews.length; i++) {
      let newTitle = hackernews[i].title;
      let nemLink = hackernews[i].link;
      let newScore = hackernews[i].score;
      myArray.push(newTitle, nemLink, newScore);
    }
    this.setState({
      info2: myArray,
    });
  }

  callAPI3() {
    fetch('http://localhost:8080/api/members');
  }

  componentDidMount() {
    this.callAPI();
    this.callAPI2();
  }

  render() {
    return (
      <>
        <div className='App'>
          <header className='App-header'>
            <img src={logo} className='App-logo' alt='logo' />
            <h1 className='App-title'>Welcome to the Thunder Dome</h1>
          </header>
          <button onClick={this.callAPI3}>Begin Scrape</button>
          <div className='App-intro'>
            {this.state.info.map((info) => (
              <ul>
                <li>{info}</li>
              </ul>
            ))}
          </div>
          <hr />
          <div className='App-intro'>
            {this.state.info2.map((info) => (
              <ul>
                <li>{info}</li>
              </ul>
            ))}
          </div>
        </div>
      </>
    );
  }
}

export default App;
