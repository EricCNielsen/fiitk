import React, { Component } from 'react'
import './Login.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { connect } from 'react-redux'
import {updateUser} from './../../../ducks/reducer'
import { Redirect } from 'react-router-dom'



class Login extends Component{
    constructor(props){
        super(props)

        this.state = {
            email: '',
            password:'',
            redirect: false,
        }
    }

    componentDidMount() {
        this.checkUser()
    }

    checkUser = async () => { 
        const {user_id} = this.props
        if (!user_id){
            try{
                let res = await axios.get('/auth/authorized')
                this.props.updateUser(res.data)
                this.props.history.push('/dashboard')
            } catch(err) {
                this.props.history.push('/login')
            } 
        } else {
            this.props.history.push('/dashboard')
        }
    }
    

        
    
    

    handleChange (prop, val) {
        this.setState({
            [prop]:val
        })
    }

    login = async (e) => { 
        e.preventDefault()
        let {user_id} = this.props
        let user = {
            email: this.state.email,
            password: this.state.password,
            user_id
        }
        try {
            let res = await axios.post('/auth/login', user)
            this.props.updateUser(res.data)
            // console.log(234234, res.data)
            this.props.history.push('/dashboard')
        } catch(err) {
            alert(err)
        }    
    }

    

    render(){
        const{email, password} = this.state

        if (this.props.user_id) {
            return <Redirect to='/dashboard' />
        }

        return(
            <div className="Login">
                <form className="login_container" onSubmit={this.login}>
                    <h1>Login</h1>
                    <input placeholder="email" value={email} onChange={(e) => this.handleChange('email', e.target.value)} />
                    <input placeholder="password" value={password} type="password" onChange={(e) => this.handleChange('password', e.target.value)} />
                    <div className="login_buttons">
                        <button type='submit'>Login</button>
                        <Link to ="/"><button>Cancel</button></Link>
                    </div>
                </form>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return{
        user_id: state.user_id
    }
}

export default connect(mapStateToProps, {updateUser})(Login)