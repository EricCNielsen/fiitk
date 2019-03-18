import React, {Component} from 'react'
import axios from 'axios'
import Product from './Product/Product'
import './Edit.css'
import Dropdown from './../Dashboard/Dropdown/Dropdown'

class Edit extends Component{
    constructor (props){
        super(props)

        this.state = {
            products: [],
            userInput: '',
        }
    }

    componentDidMount() {
        this.getProducts()
    }

    getProducts(){ 
        axios.get('/products/viewAllProducts').then(res => {
            this.setState({
                products: res.data
            })
        })
    }

    handleChange(prop, val) {
        this.setState({
            [prop]:val
        })
    }

    handleInput(val){
        this.setState({
            userInput: val
        })
    }

    render(){
        let mappedProducts = this.state.products
        .filter(e => e.product_name.toLowerCase().includes(this.state.userInput.toLowerCase())) 
        .map((product, i) => {
            return ( 
            <div key={i}>
                <Product 
                    product_name={product.product_name}
                    image_url={product.image_url}
                    category={product.category}
                    sub_category={product.sub_category}
                    product_desc={product.product_desc}
                />
            </div>
            )
        })
        return (
            <div>
                <h1>Edit Page</h1>

                <div>
                    {/* <Dropdown options=/>
                    <Dropdown /> */}
                    <input type="text" onChange={e => this.handleInput(e.target.value)}></input>
                </div>
                <div>
                    <div className="Products">
                        {mappedProducts}
                    </div>
                </div>



            </div>

            
        )
    }
}

export default Edit

