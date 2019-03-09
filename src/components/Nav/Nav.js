import React, { Component } from 'react'
import {Link} from 'react-router-dom'
// import {connect} from 'react-redux'
// import {updateUser} from './../../ducks/reducer'
import './Nav.css'


class Nav extends Component{


    render() {
        return(
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

export default Nav