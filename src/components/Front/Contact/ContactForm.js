import React, { Component } from 'react';
import './ContactForm.css'
import {Link} from 'react-router-dom'

class ContactForm extends Component{
    constructor(){
        super()

        this.state={
            name: '',
            phoneNumber: '',
            email: '',
            comments: '',
            subscribed: false,

        }
    }

    render(){
        return(
            <div className="ContactForm">
            
                <form>
                
                    <input type="text" placeholder= "Name" />
                    <br/>
                    <input type="number" placeholder= "Phone" />
                    <br/>
                    <input type="text" placeholder= "Email" />
                    <br/>
                    <input type="text" placeholder= "Comments" />
                
                </form>

                <button>Submit</button>
            </div>
        )
    }
}

export default ContactForm