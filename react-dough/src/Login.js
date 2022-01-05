//logs users in 
import React, { Component } from 'react'
import { Redirect } from 'react-router';


class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            redirect: null,
            error: ''
        }
        this.onUserChange = this.onUserChange.bind(this)
        this.onPassChange = this.onPassChange.bind(this)
        this.onLogin = this.onLogin.bind(this)
        this.onSignUp = this.onSignUp.bind(this)
    }

    //functions that handle changes in text fields
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

    //redirect to signup
    onSignUp = () => {
        console.log('go to sign-up')
        this.setState({ redirect: '/sign-up' })
    }

    //logs users in and redirects them
    onLogin = () => {

        // console.log()

        const {
            username,
            password
        } = this.state;

        fetch('http://localhost:5000/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: username,
                pass: password
            })
        })
            .then(r => r.json())
            .then(json => {
                console.log('json', json)
                if (json.success) {
                    localStorage.setItem('user', json.user)
                    localStorage.setItem('emp', json.emp)
                    this.setState({ error: json.message })
                    console.log('Success')
                    if(json.emp === "n"){
                        this.setState({ redirect: '/user' })
                    } else{
                        this.setState({ redirect: '/emp' })
                    }
                } else {
                    this.setState({ error: json.message })
                    console.log('Fail')
                }
            })

    }
    render() {
        if(localStorage.getItem('user')){
            if(localStorage.getItem('emp') === 'n'){
                return <Redirect to= '/user' />
            } else{
                return <Redirect to= '/emp' />
            }
            
        }
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        return (
            <div className='container-fluid text-center'>
                <div className="row">
                    <div className="col-sm-4 offset-sm-4 border border-2">
                        <h1>Login</h1>
                        <p>Enter your username and password below to login in to your account.</p>
                        <input type="text" id="username" placeholder="Username" onChange={this.onUserChange} /><br /><br />
                        <input type="password" id="password" placeholder="Password" onChange={this.onPassChange} /><br /><br />
                        <button className="btn btn-primary" id="login" onClick={this.onLogin}>Login</button>
                        <br />
                        <h6 className="text-danger">{this.state.error}</h6>
                    </div>
                </div>
                <br />
                <div className="row">
                    <div className="col-sm-4 offset-sm-4 border border-2">
                        <p>Click here to Sign-up.</p>
                        <button className="btn btn-success" id="su" onClick={this.onSignUp}>Sign-up</button>
                    </div>
                </div>
            </div>

        );
    }
}

export default Login;
