import React, {Component} from 'react'
import axios from 'axios'
import Frontproduct from './../Frontproduct/Frontproduct'
import '../Frontproducts.css'

class WeddingCakes extends Component{
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
        let mappedProducts = this.state.products
        .filter(e => e.sub_category.includes("Wedding"))
        .map((product, i) => {
            return(
                <div key={i}>
                    <Frontproduct 
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
                <div>
                    <h1>Wedding Cakes</h1> 

                </div>
                <div className="Frontproducts">
                    {mappedProducts}
                </div>
            </div>
            )
    }
}

export default WeddingCakes