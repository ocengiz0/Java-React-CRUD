import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux';
import ListUsersComponent from './ListUsersComponent';

class UserApp extends Component {
    render() {
        return (
            <Router>
                <>
                <h1>User CRUD</h1>
                    <Switch>
                        <Route path="/" exact component={ListUsersComponent} />
                        <Route path="/users" exact component={ListUsersComponent} />
                    </Switch>
                </>
            </Router>
        )
    }
}

const mapStateToProps = ({ users }) => ({ ...users });
export default connect(mapStateToProps)(UserApp);