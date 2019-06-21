import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'antd/dist/antd.css';
import './App.css';
import UserApp from './component/UserApp';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container">
        <UserApp />
      </div>
    );
  }
}

const mapStateToProps = ({ users }) => ({ ...users });
export default connect(mapStateToProps)(App);
