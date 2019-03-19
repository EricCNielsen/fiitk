import React, {Component} from 'react'
import axios from 'axios'
import './../Dashboard/Dashboard.css'
import {updateUser} from './../../../ducks/reducer'
import {connect} from 'react-redux'

import { v4 as randomString } from 'uuid'
import Dropzone from 'react-dropzone'
import Spinner from 'react-spinkit'
import Dropdown from './Dropdown/Dropdown'
// import Spinner from './Photoupload/Spinner'
// import Images from './Photoupload/Images'
// import Buttons from './Photoupload/Buttons'

class Dashboard extends Component{
  state={
    image_url: '',
    isUploading: false,
    product_name: 'Item Name',
    product_desc: 'Item description',
    file: {},
    category: '',
    sub_category: '',
    loading: true
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
            
  

  getSignedRequest = ([file]) => {
    this.setState({isUploading: true})
  
    const fileName = `${randomString()}-${file.name.replace(/\s/g, '-')}`
  
    axios.get('/sign-s3', {
      params: {
        'file-name': fileName,
        'file-type': file.type
      }
    }).then( (response) => {
      console.log(response)
      const { signedRequest, url } = response.data 
      this.uploadFile(file, signedRequest, url)
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
    .then(response => { console.log(response)
      this.setState({ isUploading: false, url });
      // axios.post('/api/createProduct', product)
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

  handleMainCategoryChange = (e) => {
    this.setState({
      category: e.target.value
    })
  }

  handleSubCategoryChange = (e) => {
    this.setState({
      sub_category: e.target.value
    })
  }

  handleChange (prop, val) {
  this.setState({
      [prop]:val
  })
}

handleCancel = () => {
  window.location.reload()
}

handleSubmit = async () => { console.log('hit on submit!')
  let product = {
    user_id: this.props.user_id,
    category: this.state.category,
    sub_category: this.state.sub_category,
    image_url: this.state.image_url,
    product_name: this.state.product_name,
    product_desc: this.state.product_desc,
  }
  try { let res = await axios.post('/api/createProduct', product)
  this.props.updateUser(res.data)
  this.setState({
    user_id: 0,
    category: '',
    sub_category: '',
    image_url: '',
    product_name: '',
    product_desc: ''
  })
  } catch(err) {
      alert('Something went wrong')
    }
}
  
  render(){ 
    const {
      category,
      sub_category,
    } = this.state;
    if (this.state.loading) {
      return (
        <div>
          <h1>loading...</h1>
        </div>
      )
    }
    return ( 
      <div className="Dashboard"> 
        <h1 className='dashboard_title'>Dashboard</h1>
        <form className='dashboard_inputs'>
          <Dropzone 
            style={{border: 'solid ', padding:'50px', borderRadius:'25px'}}
            onDrop={this.getSignedRequest}
            accept='image/*'
            multiple={false} >
            
            { this.state.isUploading 
                ?  <Spinner name="ball-grid-beat" />
                : <p style={{fontSize: '12px'}}>Drop File or Click Here</p>
              }
          </Dropzone>

          <Dropdown options={ MAIN_CATEGORY_OPTIONS} onChange={(e) => this.handleChange("category", e.target.value) } selectedValue={ category } />
          

          <Dropdown options={ SUB_CATEGORY_OPTIONS_OBJECT [category] } onChange={(e) => this.handleChange("sub_category", e.target.value) } selectedValue={ sub_category } />

          <p><input placeholder="item name" onChange={(e) => this.handleChange("product_name",e.target.value)}/></p>
          <p><input placeholder="item description" onChange={(e) => this.handleChange("product_desc",e.target.value)} style={{}}/></p>


        </form>
        <div className='line'></div>

        <div className='dashboard_example'>
          <img src={this.state.image_url ? this.state.image_url : 'https://imgplaceholder.com/420x320/ff7f7f/333333/fa-image'} style={{width:'300px', height:'300px'}}/>
          <p>{category} || {sub_category}</p>
          <h1>{this.state.product_name}</h1>
          <p>{this.state.product_desc}</p>
          <div className='login_buttons'>
            <button onClick={this.handleSubmit}>submit</button>
            <button onClick={this.handleCancel}>cancel</button> 
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

export default connect( mapStateToProps , {updateUser})(Dashboard)

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