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
          <p className='App-intro'>{this.state.length}</p>
          <p className='App-intro'>
            {this.state.info.map((info) => (
              <p>{info}</p>
            ))}
          </p>
          <hr />
          <div className='App-intro'>
            {this.state.info2.map((info) => (
              <p>{info}</p>
            ))}
          </div>
        </div>
      </>
    );
  }
}

export default App;
