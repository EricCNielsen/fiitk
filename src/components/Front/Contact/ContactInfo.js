import React, { Component } from 'react';
import './ContactInfo.css'

class ContactInfo extends Component{

    render(){
        return(
            <div className='ContactInfo'>
                <h1>Lily Makes It</h1>
                <h1>555.555.5555</h1>
                <br/>
                <br/>
                <h1>lilymakesit@gmail.com</h1>
            </div>
        )
    }
}

export default ContactInfo