//Employee page
import Orders from './comp/allOrders';
import React, { Component } from 'react'
import { Redirect } from 'react-router';

class Emp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            passwordConfirm: "",
            suc: '',
            redirect: '',
            error: ''
        }

        this.onUserChange = this.onUserChange.bind(this)
        this.onPassChange = this.onPassChange.bind(this)
        this.onPassConChange = this.onPassConChange.bind(this)
        this.onSignUp = this.onSignUp.bind(this)
    }
    //functions to handle input change
    onUserChange(event) {
        this.setState({
            username: event.target.value
        })
    }

    onPassChange(event) {
        this.setState({
            password: event.target.value
        })
    }

    onPassConChange(event) {
        console.log("changed")
        this.setState({
            passwordConfirm: event.target.value
        })
    }

    //redirect to logout
    onLogout = () => {
        this.setState({ redirect: '/logout' })
    }

    //signs employee up
    onSignUp = () => {

        // console.log()

        const {
            username,
            password,
            passwordConfirm
        } = this.state;

        if (password !== passwordConfirm) {
            this.setState({
                error: "Passwords mus be the same."
            })
        } else {
            fetch('http://localhost:5000/user/sign-up', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user: username,
                    pass: password,
                    emp: "y"
                })
            })
                .then(r => r.json())
                .then(json => {
                    console.log('session', json)
                    if (json.success) {
                        this.setState({
                            error: "",
                            suc: "Employee Created"
                        })
                        console.log('Success')
                    } else {
                        this.setState({ error: json.message })
                        console.log('Fail')
                    }
                })
        }
    }


    render() {
        const e = localStorage.getItem('emp')
        //check for correct validation
        if (!localStorage.getItem('user')) {
            return <Redirect to='/' />
        }
        if(e === "n"){
            console.log('redirect')
            return <Redirect to= '/user' />
        }
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        return (
            <div>
                <div className="contianer-fluid">
                    <div className="row">
                        <div className="-sm-auto text-center">
                            <h4>Add new employee to system.</h4>
                            <input type="text" id="new_username" placeholder="Username" onChange={this.onUserChange} />
                            <br />
                            <input type="password" id="new_password" placeholder="Password" onChange={this.onPassChange} />
                            <br />
                            <input type="password" id="new_password_confirm" placeholder="Confirm Password" onChange={this.onPassConChange} />
                            <br />
                            <button className='btn btn-primary' id="su" value="Sign-Up" onClick={this.onSignUp}>Add Employee</button>
                            <br />
                            <h6 className="text-success">{this.state.suc}</h6>
                            <h6 className='text-danger'>{this.state.error}</h6>
                        </div>
                    </div>
                </div>
                <div className='contianer-fluid'>
                    <Orders />
                </div>
                <button className="btn btn-danger" id="logout" onClick={this.onLogout}>Logout</button>
            </div>

        );
    }
}

export default Emp;
