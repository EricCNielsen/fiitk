import React, {Component} from 'react'
import cake1 from '../../../assets/images/lego-cake.jpg'

class Landing extends Component{


    render(){
        return (
            <div style={{width: '500px', height: '500px', margin: '0 auto', border: '1px solid red', borderRadius: '5px'}}>
            <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                < ol className="carousel-indicators">
                    <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                </ol>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                    <img src={cake1} className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item">
                    <img src="https://baking-blog.s3.amazonaws.com/ecbd5bd3-391e-4196-8c66-938b9d365c08-birthday-chocolate-cake-recipes-for-adults-recipe-ideas-mom-decorating-also-cool-cakes-icing-ay-easy.jpg" className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item">
                    <img src="https://baking-blog.s3.amazonaws.com/ecbd5bd3-391e-4196-8c66-938b9d365c08-birthday-chocolate-cake-recipes-for-adults-recipe-ideas-mom-decorating-also-cool-cakes-icing-ay-easy.jpg" className="d-block w-100" alt="..." />
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
        )
    }
}

export default Landing