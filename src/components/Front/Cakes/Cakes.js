import React, {Component} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import weddingCake from '../../../assets/images/wedding-cake-main.jpg'
import birthdayCake from '../../../assets/images/elsa-birthday.jpg'
import specialCake from '../../../assets/images/Stashes-or-Lashes.jpg'
import './Cakes.css'

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

        return (
        
            <div className='Cakes'>
                <div className='cake_thumbnails'>
                    <div>
                        <Link to='/cakes/wedding'><img src={weddingCake} alt='wedding cake main' /><h1>Wedding Cakes</h1></Link>
                        
                    </div>
                    <div>
                        <Link to='/cakes/birthday'><img src={birthdayCake} alt='birthday cake main'/><h1>Birthday Cakes</h1></Link>
                    </div>
                    <div>
                        <Link to='/cakes/special'><img src={specialCake} alt='birthday cake main'/><h1>Special Events</h1></Link>
                    </div>
                </div>
            </div>
            )
    }
}

export default Cakes