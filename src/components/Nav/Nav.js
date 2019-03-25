import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {updateUser} from './../../ducks/reducer'
import axios from 'axios'
import './Nav.css'
import logo from '../../assets/images/lily-makes-it.png'


class Nav extends Component{
        componentDidUpdate(prevProps) {
            if(prevProps !== this.props) {
                this.checkUser()
            }
        }

        componentDidMount() {
        this.checkUser()
    }

    checkUser = async () => { 
        const {user_id} = this.props
        if (!user_id) {
            try{
                let res = await axios.get('/auth/authorized')
                this.props.updateUser(res.data)
                this.setState({
                    loading:false
                })
            } catch (err) {
                this.setState({
                    redirect:true
                })
            }
        } else {
            this.setState({
                redirect:true
            })
        }
    }

    render() {
        const {user_id, username} = this.props
        if (user_id) {
            return (
                <div >
                    <h1 className="nav_welcome_user">Welcome, {username}!!!</h1>
                
            <div className="Nav">
                <div className="nav_brand">
                <Link to='/'><img src={logo} /></Link>
                </div>
                <div className="nav_menu_items">
                    <Link to='/dashboard'><button>Dashboard</button></Link>
                    <Link to ='/dashboard/edit'><button>Edit Items</button></Link>
                </div>
            </div>
            </div> 
            )
        } else {
        return (
            <div className="Nav">
                <div className="nav_brand">
                    <Link to='/'><img src={logo} /></Link>
                </div>
                <div className="nav_menu_items">
                    <Link to ='/cakes'><button>Cakes</button></Link>
                    <Link to ='/cupcakes'><button>Cupcakes</button></Link>
                    <Link to='/specialty'><button>Specialty</button></Link>
                    <Link to='/contact'><button>Contact</button></Link>
                </div>
            </div>
             
        )
    }
}
}


function mapStateToProps(state) {
    return{
        user_id: state.reducer.user_id,
        username: state.reducer.username
    }
}

export default connect(mapStateToProps, {updateUser})(Nav)