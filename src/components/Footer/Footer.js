import React, { Component } from 'react'
import './Footer.css'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {logout} from './../../ducks/reducer'
import axios from 'axios'


class Footer extends Component {

    componentDidMount() {
        this.checkUser()
    }

    checkUser = async () => {
        const {user_id} = this.props
        if (!user_id) {
            try{
                let res = await axios.get('/auth/authorized')
                this.props.updateUser(res.data)
                this.props.history.push('/dashboard')
            } catch (err) {
            }
        } else {
            this.props.history.push('/')
        }
    }

    logout = async () => {
        await axios.post('/auth/logout')
        this.props.logout()
        this.props.history.push('/login')
    }

    render() {
        return(
            <div className="Footer">
                
                {this.props.user_id ? <Link to='/' className="footer_login_link"><p onClick={() => this.logout()}>logout</p></Link> : <Link to='/login' className="footer_login_link">
                    <p>login</p>
                </Link>}
            
            </div>
        )
    }
}

function mapStateToProps (state) {
    return {
        user_id: state.reducer.user_id
    }
}

export default connect(mapStateToProps, {logout})(Footer)