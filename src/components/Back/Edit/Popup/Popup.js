import React, {Component} from 'react'
import './Popup.css'
import axios from 'axios'
import {updateUser} from '../../../../ducks/reducer'
import { connect } from 'react-redux';
import Dropdown from './../../Dashboard/Dropdown/Dropdown'
import {updateProd} from './../../../../ducks/prodReducer'
import { v4 as randomString } from 'uuid'
import Dropzone from 'react-dropzone'
import Spinner from 'react-spinkit'


class Popup extends Component {
    constructor(props){
        super(props)

        this.state={
          signedRequest: '',
          file: {},
          url: '',
          isUploading: false,
          product_name: '',
          image_url: '', 
          category: '', 
          sub_category: '', 
          product_desc: '',
          id: 0
        }
      }
      
      componentDidMount() {
        this.checkUser()
        this.setState({
          id: this.props.product.id,
          product_name: this.props.product.product_name,
          product_desc: this.props.product.product_desc,
          image_url: this.props.product.image_url,
          category: this.props.product.category,
          sub_category: this.props.product.sub_category
        })
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
      
      handleChange = async (prop, val) => {
        await this.setState({
          [prop]:val
        })
        console.log(this.state)
      }
      
      getSignedRequest = ([file]) => {
        this.setState({isUploading: true})
        
        const fileName = `${randomString()}-${file.name.replace(/\s/g, '-')}`
        
        axios.get('/sign-s3', {
          params: {
            'file-name': fileName,
            'file-type': file.type
          }
        }).then( (response) => {
          const { signedRequest, url } = response.data 
          this.setState({
            file,
            signedRequest,
            url,
            image_url: file.preview
          })
          console.log(111, url)
        }).catch( err => {
          console.log(err)
        })
      }
      
      uploadFile = (file, signedRequest, url) => {
        const options = {
          headers: {
            'Content-Type': file.type,
          },
        };
        this.setState({
          image_url: url
        })
        axios
        .put(signedRequest, file, options)
        .then(response => {
          this.setState({ 
            isUploading: false,
            url
          })
          alert('Upload Successful');
        })
        .catch(err => {
          this.setState({
            isUploading: false,
          });
          if (err.response.status === 403) {
            alert(
              `Your request for a signed URL failed with a status 403. Double check the CORS configuration and bucket policy in the README. You also will want to double check your AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY in your .env and ensure that they are the same as the ones that you created in the IAM dashboard. You may need to generate new keys\n${
                err.stack
              }`
              );
            } else {
              alert(`ERROR: ${err.status}\n ${err.stack}`);
            }
          });
        };
        
        
        
        onDrop = (acceptedFiles) => { 
          console.log(acceptedFiles)
          const file = acceptedFiles[0]; 
        this.setState({
          image_url: file.preview
        })
      };
      
      
      
      handleSubmit = async () => {
        await this.uploadFile(this.state.file, this.state.signedRequest, this.state.image_url)
        let {id, product_name, category, sub_category, product_desc} = this.state;
        let image_url = this.state.url
        
        console.log("submit", this.state)
        
        await this.props.updateProd({id, image_url, product_name, category, sub_category, product_desc}) 
        this.props.updateProduct()
      }
      
      
      render() {
        let {product_name, image_url, category, sub_category, product_desc} = this.props
        return (
          <div className='popup'>
          <div className='popup_inner'>
            <form className='popup_inputs'>
            <div className='dropzone'>
              <Dropzone 
                style={{padding:'15px'}}
                onDrop={this.getSignedRequest}
                accept='image/*'
                multiple={false} 
                value={image_url}>
                
                { this.state.isUploading 
                    ?  <Spinner name="ball-grid-beat" className='dropzone_spinner'/>
                    : <p style={{fontSize: '12px'}}>Drop File<br/> or <br/>Click Here</p>
                      
                  }
              </Dropzone>
            </div>
              <Dropdown options={ MAIN_CATEGORY_OPTIONS} onChange={(e) => this.handleChange("category", e.target.value) } selectedValue={ this.state.category } />
              <Dropdown options={ SUB_CATEGORY_OPTIONS_OBJECT [this.state.category] } onChange={(e) => this.handleChange("sub_category", e.target.value) } selectedValue={ this.state.sub_category }/>
              <p><input placeholder={product_name} onChange={(e) => this.handleChange("product_name",e.target.value)}/></p>
              <p><input placeholder={product_desc} onChange={(e) => this.handleChange("product_desc",e.target.value)}/></p>

            </form>
            <div className='line'></div>
            <div className='prod_display'>
              <img src={this.state.image_url ? this.state.image_url : image_url}  alt='product' />
                <div>
                  <p>{this.state.category ? this.state.category : category} || {this.state.sub_category ? this.state.sub_category : sub_category }</p>
                  <h1>{this.state.product_name ? this.state.product_name : product_name}</h1>
                  <p>{this.state.product_desc ? this.state.product_desc : product_desc}</p>
              </div>
              <button onClick={this.handleSubmit}>Submit</button>
              <button onClick={this.props.closePopup}>Cancel</button>
           </div>
          </div>
          <button onClick={this.props.closePopup} className="button_killer">x</button>
        </div>
      );
    }
  }

  // function mapStateToProps (state) {
  //   return {
  //     id: state.prodReducer.id,
  //     category: state.prodReducer.category,
  //     sub_category: state.prodReducer.sub_category,
  //     image_url: state.prodReducer.image_url,
  //     product_name: state.prodReducer.product_name,
  //     product_desc: state.prodReducer.product_desc
  //   }
  // }

  export default connect(null, {updateUser, updateProd}) (Popup)


  const MAIN_CATEGORY_OPTIONS = [
    {
      displayText: 'Cakes',
      value: 'Cakes'
    },
    {
      displayText: 'Cupcakes',
      value: 'Cupcakes'
    },
    {
      displayText: 'Specialty Items',
      value: 'Specialty Items'
    }
  ]
  
  const CAKE_OPTIONS = [
    {
      displayText: 'Wedding',
      value: 'Wedding'
    },
    {
      displayText: 'Birthday',
      value: 'Birthday'
    },
    {
      displayText: 'Special Order',
      value: 'Special Order'
    },
  ]
  
  const CUPCAKE_OPTIONS = [
    {
      displayText: 'Custom',
      value: 'Custom'
    },
    {
      displayText: 'Simple and Delicious',
      value: 'Simple and Delicious'
    }
  ]
  
  const SPECIALTY_ITEMS = [
    {
      displayText: 'Unique Desserts',
      value: 'Unique Desserts'
    },
    {
      displayText: 'Savory Party Platers',
      value: 'Savory Party Platers'
    },
    {
      displayText: 'Diet Friendly',
      value: 'Diet Friendly'
    },
  ]
  
  const SUB_CATEGORY_OPTIONS_OBJECT = {
    'Cakes': CAKE_OPTIONS,
    'Cupcakes': CUPCAKE_OPTIONS,
    'Specialty Items': SPECIALTY_ITEMS
  }