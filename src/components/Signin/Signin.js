import React, { Component } from 'react';
import theme from './Signin.css';
import Logo from './../common/icons/AdexIconTxt';
import { BrowserRouter as Router, Link } from 'react-router-dom'

class Signin extends Component {
  render() {
    console.log('theme.signinContainer', theme);
    return (
      <div className={theme.signinContainer} style={{backgroundImage: `url(${require('./../../resources/background.png')})`}}>

        <div className="App-header">
          {<Logo  width={370} height={144} />}
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Link to="/dashboard" > Go to dashboard to dashboard </Link>
      </div>
    );
  }
}

export default Signin;
