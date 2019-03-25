import React, {Component} from 'react'
import axios from 'axios'
import Product from './Product/Product'
import './Edit.css'
import {updateUser} from './../../../ducks/reducer'
import {connect} from 'react-redux'
import Popup from './Popup/Popup'
import { v4 as randomString } from 'uuid'
import {updateProd} from './../../../ducks/prodReducer'



class Edit extends Component{
    constructor (props){
        super(props)

        this.state = {
            products: [],
            userInput: '',
            loading: true,
            id: this.props.id,
            editing: false,
            showPopup: false,
            product: {},

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
                product: res.data[0],
            })
            this.props.updateProd(res.data[0])
            console.log('togglePopup data',res.data)
        })
    }
    popup() {
      this.setState({
        showPopup: !this.state.showPopup
      });
    }
    
    refreshPage = () => {
        window.location.reload()
    }


    updateProduct = async() => {
        const {id, product_name, image_url, category, sub_category, product_desc} = this.props
        let res = await axios.put(`/api/updateProduct/${id}`, {image_url, category, sub_category, product_name, product_desc})
            this.setState({
                products: res.data,
                showPopup: !this.state.showPopup
            })
            this.refreshPage()
    
    }

    render(){
        let mappedProducts = this.state.products
        .filter(e => e.product_name.toLowerCase().includes(this.state.userInput.toLowerCase())|| e.category.toLowerCase().includes(this.state.userInput.toLowerCase())
        || e.sub_category.toLowerCase().includes(this.state.userInput.toLowerCase()))
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
                <div className="edit_title">
                    <h1>Edit Page</h1>
                    
                        <input type="text" placeholder="Search for product here..." onChange={e => this.handleInput(e.target.value)}></input>
                    
                </div>
                <div>
                    <div className="Products">
                        {mappedProducts}
                     {this.state.showPopup ?  
                        (
                         <Popup
                            updateProduct={this.updateProduct.bind(this)}
                            closePopup={this.popup.bind(this)}
                            togglePopup={this.togglePopup}
                            product={this.state.product}
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
        user_id: state.reducer.user_id,
        id: state.prodReducer.id,
        category: state.prodReducer.category,
        sub_category: state.prodReducer.sub_category,
        image_url: state.prodReducer.image_url,
        product_name: state.prodReducer.product_name,
        product_desc: state.prodReducer.product_desc

    }
}

export default connect(mapStateToProps, {updateUser, updateProd}) (Edit)

