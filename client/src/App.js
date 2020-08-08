import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import jhuCovid from '../src/json/jhucovid.json';

class App extends Component {
  state = {
    title: [],
    nums: '',
    length: '',
  };

  callAPI() {
    this.setState({
      length: jhuCovid.length,
      title: jhuCovid.title,
    });
  }

  componentDidMount() {
    this.callAPI();
  }

  render() {
    return (
      <div className='App'>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <h1 className='App-title'>Welcome to the Thunder Dome</h1>
        </header>
        <p className='App-intro'>{this.state.length}</p>
        <p className='App-intro'>{this.state.title}</p>
        <p className='App-intro'>{this.state.nums}</p>
      </div>
    );
  }
}

export default App;
