import React, {Component} from 'react'
import axios from 'axios'
import Product from './Product/Product'
import './Edit.css'
import {updateUser} from './../../../ducks/reducer'
import {connect} from 'react-redux'
import Popup from './Popup/Popup'

class Edit extends Component{
    constructor (props){
        super(props)

        this.state = {
            products: [],
            userInput: '',
            loading: true,
            id: 0,
            editing: false,
            showPopup: false,
            product: {}
        }
        this.deleteProd=this.deleteProd.bind(this)
        this.togglePopup=this.togglePopup.bind(this)
    }

    componentDidMount() {
        this.checkUser()
        this.getProducts()
    }
  
    checkUser = async () => { 
      const {user_id} = this.props
      if (!user_id) {
        try{
          let res = await axios.get('/auth/authorized')
          this.props.updateUser(res.data)
          this.setState({loading: false})
        } catch(err) {
          this.props.history.push('/dashboard/edit')
        }
      } else {
        this.setState({loading: false})
      }
    }

    getProducts(){ 
        axios.get('/api/viewAllProducts').then(res => {
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

    deleteProd(id) { 
        axios.delete(`/api/product/${id}`).then(res => {
            this.getProducts()
        })
    }

    togglePopup(id) {
        axios.get(`/api/product/${id}`).then(res => {
            this.setState({
                showPopup: !this.state.showPopup,
                product: res.data[0]
            })
        })
    }
    popup() {
      this.setState({
        showPopup: !this.state.showPopup
      });
    }

    // setEdit(id){
    //     const {product_name, product_desc, image_url, category, sub_category} = this.state

        
    // }

    render(){
        let mappedProducts = this.state.products
        .filter(e => e.product_name.toLowerCase().includes(this.state.userInput.toLowerCase())) 
        .map((product, i) => {
            return ( 
            <div key={i}>
                <Product 
                    deleteProd={this.deleteProd}
                    togglePopup={this.togglePopup}
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
        if (this.state.loading) {
            return (
                <div>
                    <h1>loading...</h1>
                </div>
            )
        }
        return (
            <div>
                <h1>Edit Page</h1>

                <div>
                    <input type="text" onChange={e => this.handleInput(e.target.value)}></input>
                </div>
                <div>
                    <div className="Products">
                        {mappedProducts}
                     {this.state.showPopup ?  
                        (
                         <Popup
                            product_name={this.state.product.product_name}
                            image_url={this.state.product.image_url}
                            category={this.state.product.category}
                            sub_category={this.state.product.sub_category}
                            product_desc={this.state.product.product_desc}
                            closePopup={this.popup.bind(this)}
                         />
                        )
                        : null 
                    }
                    </div>
                </div>



            </div>

            
        )
    }
}

function mapStateToProps (state) {
    return {
        user_id: state.user_id
    }
}

export default connect(mapStateToProps, {updateUser}) (Edit)

