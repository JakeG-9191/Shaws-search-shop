import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { apiResposnse: '' };
  }

  callAPI() {
    fetch('http://localhost:8080/hello')
      .then((res = res.text()))
      .then((res) => this.setState({ apiResposnse: res }))
      .catch((err) => err);
  }

  componentDidMount() {
    this.callAPI();
  }

  redner() {
    return (
      <div className='App'>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <h1 className='App-title'>Welcome to the Thunder Dome</h1>
        </header>
        <p className='App-intro'>{this.state.apiResposnse}</p>
      </div>
    );
  }
}

export default App;
