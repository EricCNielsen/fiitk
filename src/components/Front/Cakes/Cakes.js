import React, {Component} from 'react'
import axios from 'axios'
import Product from './../../Back/Edit/Product/Product'

class Cakes extends Component{
    state= {
        products:[]
    }

    componentDidMount() {
        this.getCakes()
    }

    getCakes(){
        axios.get('/api/products/cakes').then(res => {
            this.setState({
                products:res.data
            })
        })
    }

    render(){
        console.log(this.state.products)
        let mappedProducts = this.state.products
        .map((product, i) => {
            return(
                <div key={i}>
                    <Product 
                    id={product.id}
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
                {mappedProducts}
            </div>
            )
    }
}

export default Cakes