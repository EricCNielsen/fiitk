import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {updateUser} from './../../ducks/reducer'
import axios from 'axios'
import './Nav.css'


class Nav extends Component{
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
        const {user_id} = this.props
        if (user_id) {
            return (
            <div className="Nav">
                <div className="nav_home_button">
                    <Link to="/dashboard"><button>Home</button></Link>
                </div>
                <div className="nav_brand">
                    <a href="/dashboard">Org Name</a>
                </div>
                <div className="nav_menu_items">
                    <Link to='/dashboard'><button>Dashboard</button></Link>
                    <Link to ='/edit'><button>Edit Items</button></Link>
                </div>
            </div> 
            )
        } else {
        return (
            <div className="Nav">
                <div className="nav_home_button">
                    <Link to="/"><button>Home</button></Link>
                </div>
                <div className="nav_brand">
                    <a href="/">Org Name</a>
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
        user_id: state.user_id
    }
}

export default connect(mapStateToProps, {updateUser})(Nav)