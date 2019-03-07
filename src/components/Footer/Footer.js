import React, { Component } from 'react'
import './Footer.css'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'


class Footer extends Component {

    render() { console.log(this.props)
        return(
            <div className="Footer">
                
                {this.props.id ? <Link to='/'><p>logout</p></Link> : <Link to='/login' className="footer_login_link">
                    <p>login</p>
                </Link>}
                
                
            </div>
        )
    }
}

function mapStateToProps ({id}) {
    return {
        id
    }
}

export default connect(mapStateToProps, null)(Footer)