import React, {Component} from 'react'
import cake1 from '../../../assets/images/lego-cake.jpg'
import cake2 from '../../../assets/images/wedding-cake-main.jpg'
import cake3 from '../../../assets/images/staches-or-lashes.png'
import './Landing.css'

class Landing extends Component{


    render(){
        return (
            <div className="Landing">
                <div className="Landing_container">
                    <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                        < ol className="carousel-indicators">
                            <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                            <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                        </ol>
                        <div className="carousel-inner" style={{ borderRadius: '50%', border: '1px solid white'}}>
                            <div className="carousel-item active">
                            <img src={cake1} className="d-block w-100" alt="..." />
                            </div>
                            <div className="carousel-item">
                            <img src={cake2} className="d-block w-100" alt="..." />
                            </div>
                            <div className="carousel-item">
                            <img src={cake3} className="d-block w-100" alt="..." />
                            </div>
                        </div>
                        <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="sr-only">Previous</span>
                        </a>
                        <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="sr-only">Next</span>
                        </a>
                    </div>
                </div>
            </div>
        )
    }
}

export default Landing