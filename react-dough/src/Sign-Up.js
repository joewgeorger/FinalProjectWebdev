//user signup
import React, { Component } from 'react'
import { Redirect } from 'react-router';

class SU extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            username: "",
            password: "",
            passwordConfirm: "",
            redirect: null,
            error: ''
        }

        this.onUserChange = this.onUserChange.bind(this)
        this.onPassChange = this.onPassChange.bind(this)
        this.onPassConChange = this.onPassConChange.bind(this)
        this.onSignUp = this.onSignUp.bind(this)
    }

    //functions to handle changes in text fields
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
        this.setState({
            passwordConfirm: event.target.value
        })
    }


    //signs user up and redirects
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
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    user: username,
                    pass: password,
                    emp: "n"
                })
            })
                .then(r => r.json())
                .then(json => {
                    console.log('Sessino', json)
                    if (json.success) {
                        localStorage.setItem('user', json.user)
                        localStorage.setItem('emp', 'n')
                        this.setState({
                            error: json.message,
                            redirect: '/user'
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
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        return (
            <div className='container-fluid text-center'>
                <div className="row">
                    <div className="col-sm-4 offset-sm-4 border border-2">
                        <h1>Sign-Up</h1>
                        <p>Enter your choice of username and password below to create your account.</p>
                        <input type="text" name="username" placeholder="Username" onChange={this.onUserChange} /><br /><br />
                        <input type="password" name="password" placeholder="Password" onChange={this.onPassChange} /><br /><br />
                        <input type="password" name="passwordConfirm" placeholder="Confirm Password" onChange={this.onPassConChange} /><br /><br />
                        <button className="btn btn-primary" id="SignUp" onClick={this.onSignUp}>Sign-Up</button>
                    </div>
                </div>
            </div>

        );
    }
}

export default SU;
