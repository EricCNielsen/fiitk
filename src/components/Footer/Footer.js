import React, { Component } from 'react'
import './Footer.css'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {logout} from './../../ducks/reducer'
import axios from 'axios'
import facebook from '../../assets/images/facebook.png'
import instagram from '../../assets/images/instagram.png'
import twitter from '../../assets/images/twitter.png'
import pinterest from '../../assets/images/pinterest.png'


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
                <div>    
                    {this.props.user_id ? <Link to='/' className="footer_login_link"><p onClick={() => this.logout()}>logout</p></Link> : <Link to='/login' className="footer_login_link">
                        <p>login</p>
                    </Link>}
                </div>
                <div className="footer_social">
                    <a href="https://www.facebook.com/lilymakesit"><img src={facebook} alt="facebook"/></a>
                    <a href="https://www.instagram.com/_lily_makes_it_"><img src={instagram} alt="instagram"/></a>
                    <a href="https://twitter.com/LilyMakes"><img src={twitter} alt="twitter"/></a>
                    <a href="https://www.pinterest.com/lily_makes_it"><img src={pinterest} alt=""/></a>
                </div>
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