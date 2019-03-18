import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import './Nav.css'


class UserNav extends Component{


    render() {
        return(
            <div className="Nav">
                <div className="nav_home_button">
                    <Link to="/dashboard"><button>Home</button></Link>
                </div>
                <div className="nav_brand">
                    <a href="/dashboard">Org Name</a>
                </div>
                <div className="nav_menu_items">
                    <Link to ='/edit'><button>Edit Items</button></Link>
                </div>
            </div> 
        )
    }
}

export default UserNav