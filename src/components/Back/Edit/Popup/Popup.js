import React, {Component} from 'react'
import './Popup.css'
import axios from 'axios'
import {updateUser} from '../../../../ducks/reducer'
import { connect } from 'react-redux';

class Popup extends Component {
    constructor(props){
        super(props)

        this.state={
          product: []
        }
    }

    componentDidMount() {
        this.checkUser()
    }
  
    checkUser = async () => { 
      const {user_id} = this.props
      if (!user_id) {
        try{
          let res = await axios.get('/auth/authorized')
          this.props.updateUser(res.data)
          this.setState({loading: false})
        } catch(err) {
          this.props.history.push('/login')
        }
      } else {
        this.setState({loading: false})
      }
    }

    


    render() {
      let {product_name, image_url, category, sub_category, product_desc} = this.props
      return (
        <div className='popup'>
          <div className='popup_inner'>
            <form className='popup_inputs'>
              <h1>dropzone here</h1>
              <h1>dropdown 1 here</h1>
              <h1>dropdown 2 here</h1>
              <h1>input box 1 here</h1>
              <h1>input box 2 here</h1>
            </form>
            <div className='line'></div>
            <div className='prod_display'>
              <img src={image_url ? image_url : 'https://imgplaceholder.com/420x320/ff7f7f/333333/fa-image'}  alt='product' />
                <div>
                  <p>{category} || {sub_category}</p>
                  <h1>{product_name}</h1>
                  <p>{product_desc}</p>
              </div>
           </div>
          </div>
          <button onClick={this.props.closePopup} className="button_killer">x</button>
        </div>
      );
    }
  }

  function mapStateToProps (state) {
    return {
      user_id: state.user_id
    }
  }

  export default connect(mapStateToProps, {updateUser}) (Popup)
//   class UmProduct extends Component {
//     constructor() {
//       super();
//       this.state = {
//         showPopup: false
//       };
//     }
//     togglePopup() {
//       this.setState({
//         showPopup: !this.state.showPopup
//       });
//     }
//     render() {
//       return (
//         <div className='app'>
//           <h1>hihi</h1>
//           <button onClick={this.togglePopup.bind(this)}>show popup</button>
//           <button onClick={() => {alert('woooooooot?');}}>try me when popup is open</button>
//           <p>sup dawg</p>
//           {this.state.showPopup ? 
//             <Popup
//               text='Close Me'
//               closePopup={this.togglePopup.bind(this)}
//             />
//             : null
//           }
//         </div>
//       );
//     }
//   };