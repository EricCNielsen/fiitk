import React from 'react'
import './Product.css'
// import {updateProd} from './../../../ducks/prodReducer'
// import { connect } from 'react-redux';

function Product(props) {
    let {product_name, image_url, category, sub_category, product_desc} = props
    return (
        <div className="Product">
            <div className="product_container">
                <img src={image_url ? image_url : 'https://imgplaceholder.com/420x320/ff7f7f/333333/fa-image'}  alt='product' />
                <div>
                    <p>{category} || {sub_category}</p>
                    <h1>{product_name}</h1>
                    <p>{product_desc}</p>
                </div>
                <div>
                    <button>Edit</button>
                    <button>Delete</button>
                </div>
            </div>
        </div> 
    )
}

// function mapStateToProps(state){
//     return {
//         user_id: state.user_id,
//         category: state.category,
//         sub_category: state.sub_category,
//         image_url: state.image_url,
//         product_name: state.product_name,
//         product_desc: state.product_desc
//     }
// }

export default Product