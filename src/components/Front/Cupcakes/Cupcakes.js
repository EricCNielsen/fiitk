import React, {Component} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import cupcakes1 from '../../../assets/images/flower-cupcakes.jpg'
import cupcakes2 from '../../../assets/images/vanilla-cupcakes.jpg'
import './Cupcakes.css'

class Cupcakes extends Component{
    state= {
        products:[]
    }

    componentDidMount() {
        this.getCupcakes()
    }
    getCupcakes(){
        axios.get('/api/products/cakes').then(res => {
            this.setState({
                products:res.data
            })
        })
    }


    render(){

        return (
            <div>
                <h1 className="cupcake_title">Cupcakes</h1>
                <div className='Cupcakes'>
                    <div className='cupcake_thumbnails'>
                        <div>
                            <Link to='/cupcakes/custom'><img src={cupcakes1} alt='custom cupcake main' /><h1>Custom Cupcakes</h1></Link>
                            
                        </div>
                        <div>
                            <Link to='/cupcakes/simple'><img src={cupcakes2} alt='simple cupcake main'/><h1>Simple and Delicious</h1></Link>
                        </div>
                    </div>
                </div>
            </div>
            )
    }
}

export default Cupcakes