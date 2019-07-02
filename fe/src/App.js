import React, { Component } from 'react';
import 'antd/dist/antd.css';
import './App.css';
import UserApp from './component/UserApp';

class App extends Component {
  render() {
    return (
      <div className="container">
        <UserApp />
      </div>
    );
  }
}

export default App;
