import React, { Component } from 'react'
import './Login.css'
import {Link} from 'react-router-dom'
import axios from 'axios'
import { connect } from 'react-redux'
import {updateUser} from './../../../ducks/reducer'


class Login extends Component{
    constructor(props){
        super(props)

        this.state = {
            email: '',
            password:''
        }
        this.login =  this.login.bind(this)
    }

    handleChange (prop, val) {
        this.setState({
            [prop]:val
        })
    }

    login() {
        axios.post('/auth/login', this.state).then(res => {
            this.props.updateUser(res.data)
            this.props.history.push('/dashboard')
        })
    }

    

    render(){
        return(
            <div className="Login">
                <div className="login_container">
                    <h1>Login</h1>
                    <input placeholder="email" onChange={(e) => this.handleChange('email', e.target.value)} />
                    <input placeholder="password" type="password" onChange={(e) => this.handleChange('password', e.target.value)} />
                    <div className="login_buttons">
                        <button onClick={() => this.login()}>Login</button>
                        <Link to ="/"><button>Cancel</button></Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(null, {updateUser})(Login)