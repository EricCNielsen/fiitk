import React, {Component} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {updateUser} from '../../../ducks/reducer'

class CreateUser extends Component{
    constructor (props){
        super(props)

        this.state={
            username:'',
            email:'',
            password:'',
            admin:false,
            user_image:''
        }
    }

    handleToggle = () => {
        this.setState({
            admin: !this.state.admin
        })
    }

    componentDidMount() {
        this.checkUser()
        this.getImage()
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

    getImage = async () => {
       let user_image = await axios.get('http://hp-api.herokuapp.com/api/characters')
       console.log(user_image)
        user_image = user_image.data[Math.floor(Math.random()*user_image.data.length)]
        console.log(111, user_image.image)
        this.setState({
            user_image:user_image.image
        })
    }

    handleChange (prop, val) {  console.log([prop], val)
        this.setState({
            [prop]:val
        })
    }

    handleSubmit = async () => {
        let user ={
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            admin: this.state.admin,
            user_image: this.state.user_image
        }
        try { let res = await axios.post('/auth/register', user)
        console.log(user)
        this.setState({
            username: '',
            email:'',
            password:'',
            admin:false
        })

        } catch(err) {
            alert('Could not create user')
        }
    }

    render() {
        console.log(this.state.admin)
        return(
            <div>
                <Link to='/dashboard/createuser'><button>Add User</button></Link>
                <Link to='/dashboard/viewusers'><button>View All Users</button></Link>
                <div>
                    <h1 style={{fontSize: '30px'}}>Add User</h1>
                </div>

                <div>
                    <input placeholder="Username" onChange={e => this.handleChange("username", e.target.value)}></input>
                    <input placeholder="Email" onChange={e => this.handleChange("email", e.target.value)}></input>
                    <input placeholder="Password" type="password" onChange={e => this.handleChange("password", e.target.value)}></input>
                    <input type='checkbox' name='authorized' value="false" onChange={this.handleToggle  }/>
                    <label for='authorized'>Authorized</label>
                </div>
                <div>
                    <button onClick={this.handleSubmit}>Submit</button>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return{
        user_id:state.user_id
    }
}

export default connect(mapStateToProps, {updateUser})(CreateUser)