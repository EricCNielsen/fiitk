import React from 'react'
import './User.css'


function User(props) {
    let {user_id, username, image_url, email} = props
    return (
        <div className="User">
            <div className="user_container">
                <div className="">
                    <img src={image_url ? image_url : 'https://imgplaceholder.com/420x320/ff7f7f/333333/fa-image'}  alt='product' />
                </div>
                <div>
                    <h1 className="user_username">{username}</h1>
                </div>
                <div>
                    <h1 className="user_email">{email}</h1>
                </div>
            </div>
        </div> 
    )
}


export default User