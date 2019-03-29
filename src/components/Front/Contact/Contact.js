import React, {Component} from 'react'
import ContactForm from './ContactForm'
import ContactInfo from './ContactInfo';
import './Contact.css'

class Contact extends Component{


    render(){
        return (
            <div>
                <div className="contact_title">Contact Us</div>
                <div className="Contact">
                    <ContactForm />
                    <div className='contact_line'></div>
                    <ContactInfo />
                </div>
            </div>
        )
    }
}

export default Contact