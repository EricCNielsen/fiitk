import React from 'react'
import './Product.css'


function Product(props) {
    let {togglePopup, deleteProd, id, product_name, image_url, category, sub_category, product_desc} = props
    return (
        <div className="Product">
            <div className="product_container">
                <img src={image_url ? image_url : 'https://imgplaceholder.com/420x320/ff7f7f/333333/fa-image'}  alt='product' />
                <div>
                    <p>{category} || {sub_category}</p>
                    <h1>{product_name}</h1>
                    <p>{product_desc}</p>
                </div>
            </div>
                <div className="product_buttons">
                    <button onClick={() => togglePopup(id)}>View/Edit</button>
                    <button onClick={() => deleteProd(id)}>Delete</button>
                </div>
        </div> 
    )
}


export default Product