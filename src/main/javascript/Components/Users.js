import React, { Component } from "react";
import client from '../client';
import ReactDOM from 'react-dom';
import { Route, Router } from "react-router-dom";

class User extends Component {
    render() {
        return (
            <tr>
                <td>{this.props.user.login}</td>
                <td>{this.props.user.password}</td>
            </tr>
        );
    }
}

class UserList extends Component {
    render() {
        const users = this.props.users.map(user => <User key={user._links.self.href} user={user}/>);

        return (
            <table>
                <tbody>
                    <tr>
                        <th>Login</th>
                        <th>Password</th>
                    </tr>
                    {users}
                </tbody>
            </table>
        );
    }
}

class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {users: []};
    }

    componentDidMount() {
        client({method: 'GET', path: '/api/users'}).done(
            response => this.setState({users: response.entity._embedded.users})
        );
    }

    render() {
        return (
            <div>
                <h1>USERSS</h1>
                <UserList users={this.state.users}/>
            </div>
        );
    }
}


export default Users;