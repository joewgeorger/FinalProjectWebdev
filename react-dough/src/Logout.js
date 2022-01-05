//logs users out
import React, { Component } from 'react'
import { Redirect } from 'react-router';

class Logout extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            user: [],
            redirect: null,
            error: ''
        }

        this.onLogOut = this.onLogOut.bind(this)
    }

    //logs out in db and storage
    onLogOut() {
        fetch('http://localhost:5000/user/logout?token=' + localStorage.getItem('user'), {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        })
            .then((response) => response.json())
            .then((messages) => {console.log("messages");});
        localStorage.clear();
        console.log(localStorage)
        this.setState({ redirect: '/login' })
    }

    render() {
        console.log(localStorage.getItem('user'));
        if (localStorage.getItem('user') == null) {
            return <Redirect to='/' />
        }
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        return (
            <div className='container-fluid text-center'>
                <div className="row">
                    <div className="col-sm-4 offset-sm-4 border border-2">
                        <p>Click here to logout.</p>
                        <button className="btn btn-danger" id="logout" onClick={this.onLogOut}>Logout</button>
                    </div>
                </div>
            </div>

        );
    }
}

export default Logout;