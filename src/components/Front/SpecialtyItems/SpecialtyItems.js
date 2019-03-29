import React, {Component} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import './SpecialtyItems.css'
import specialty1 from '../../../assets/images/brigadeiros.jpg'
import specialty2 from '../../../assets/images/salgadinhos.jpg'
import specialty3 from '../../../assets/images/healthy-cookies.jpg'


class Specialty extends Component{
    state= {
        products:[]
    }

    componentDidMount() {
        this.getSpecialty()
    }
    getSpecialty(){
        axios.get('/api/products/specialty').then(res => {
            this.setState({
                products:res.data
            })
        })
    }


    render(){

        return (
            <div>
                <h1 className="specialty_title">Specialty Items</h1>
                <div className='Specialty'>
                    <div className='specialty_thumbnails'>
                        <div>
                            <Link to='/specialty/unique'><img src={specialty1} alt='unique desserts main' /><h1>Unique Desserts</h1></Link>
                        </div>
                        <div>
                            <Link to='/specialty/savory'><img src={specialty2} alt='savory party platters main'/><h1>Savory Party Platters</h1></Link>
                        </div>
                        <div>
                            <Link to='/specialty/diet'><img src={specialty3} alt='diet friendly main'/><h1>Diet Friendly</h1></Link>
                        </div>
                    </div>
                </div>
            </div>
            )
    }
}

export default Specialty