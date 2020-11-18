import React, { Component } from "react";
import ReactDOM from 'react-dom';
import client from './client';

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

class Main extends Component {
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
            <UserList users={this.state.users}/>
        );
    }
}

ReactDOM.render(
    <Main />,
    document.getElementById('react')
);