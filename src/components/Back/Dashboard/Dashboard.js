import React, {Component} from 'react'
import axios from 'axios'
import './../Dashboard/Dashboard.css'
import {updateUser} from './../../../ducks/reducer'
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom'
import { v4 as randomString } from 'uuid'
import Dropzone from 'react-dropzone'
import Spinner from 'react-spinkit'
// import Spinner from './Photoupload/Spinner'
// import Images from './Photoupload/Images'
// import Buttons from './Photoupload/Buttons'

class Dashboard extends Component{
        state={
            image: '',
            isUploading: false,
            product_name: '',
            product_desc: '',
            file: {},
            loading:true,
            redirect:false
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
                this.setState({
                    loading:false
                })
            } catch (err) {
                this.setState({
                    redirect:true
                })
            }
        } else {
            this.setState({
                redirect:true
            })
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
        const { signedRequest, url } = response.data 
        this.uploadFile(file, signedRequest, url)
      }).catch( err => {
        console.log(err)
      })
   }

   onDrop = (acceptedFiles) => { 
     console.log(acceptedFiles)
     const file = acceptedFiles[0]; 
     this.setState({
       image: file.preview
     })
    };

   handleChange (prop, val) {
    this.setState({
        [prop]:val
    })
}
    
    render(){
        if (this.state.redirect) {
            return <Redirect to='/login' />
        }
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
                    <p><input placeholder="item name" onChange={(e) => this.handleChange("product_name",e.target.value)}/></p>
                    <p><input placeholder="item description" onChange={(e) => this.handleChange("product_desc",e.target.value)}/></p>
                    <div>
                      <Dropzone 
                        style={{border: 'solid ', padding:'50px', borderRadius:'25px'}}
                         onDrop={this.onDrop}
                        accept='image/*'
                        multiple={false} >
                        
                        { this.state.isUploading 
                            ?  <Spinner name="ball-grid-beat" />
                            : <p style={{fontSize: '12px'}}>Drop File or Click Here</p>
                        }
                      </Dropzone>
                    </div>
                </form>
                <div className='line'></div>

                <div className='dashboard_example'>
          
                      <img src={this.state.image ? this.state.image : 'https://imgplaceholder.com/420x320/ff7f7f/333333/fa-image'} style={{width:'300px', height:'300px'}}/>
                      <h1>{this.state.product_name}</h1>
                      <p>{this.state.product_desc}</p>

                </div>
            </div>
        )
    }
}


export default connect(null, {updateUser})(Dashboard)

