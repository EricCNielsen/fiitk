import React, {Component} from 'react'
import axios from 'axios'
import userimage from '../../../assets/images/user-image.png'
import {Link} from 'react-router-dom'
import User from './User'
import './Users.css'
import {updateUser} from '../../../ducks/reducer'
import {connect} from 'react-redux'

class ViewUsers extends Component{
    constructor (props){
        super(props)

        this.state={
            users: [],
            loading: true,
        }
    }

    componentDidMount(){
        this.checkUser()
        this.getUsers()
    }
  
    checkUser = async () => { 
      const {user_id} = this.props
      if (!user_id) {
        try{
          let res = await axios.get('/auth/authorized')
          this.props.updateUser(res.data)
          this.setState({loading: false})
        } catch(err) {
          this.props.history.push('/auth/viewUsers')
        }
      } else {
        this.setState({loading: false})
      }
    }

    getUsers(){
        axios.get('/auth/viewUsers').then(resp => {
            this.setState({
                users: resp.data
            })
        })
    }

    render() {
        console.log(this.state.users)
        let mappedUsers = this.state.users
        .map((user, i) => {
            return ( 
            <div key={i}>
                <User 
                    user_id={user.user_id}
                    username={user.username}
                    image_url={user.user_image}
                    email={user.email}
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
        return(
            <div>
                <Link to='/dashboard/createuser'><button>Add User</button></Link>
                <Link to='/dashboard/viewusers'><button>View All Users</button></Link>
                <div>
                    <h1 style={{fontSize: '30px'}}>View Users</h1>
                </div>

                <div>
                    View Users
                </div>
                <div className="Users">
                {mappedUsers}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        user_id: state.user_id
    }
}

export default connect(mapStateToProps, {updateUser}) (ViewUsers)