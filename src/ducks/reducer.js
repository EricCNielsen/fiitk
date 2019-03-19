const initialState = {
    user_id: 0,
    username: '',
    email: ''
}

const UPDATE_USER = 'UPDATE_USER'
const LOGOUT = 'LOGOUT'

export function updateUser(user) {
    return {
        type: UPDATE_USER,
        payload: user
    }
}
export function logout() {
    return {
        type: LOGOUT
    }
}

export default function reducer(state = initialState, action){
    const {type, payload} = action
    
    switch (type) {
        case UPDATE_USER:
            const{user_id, username, email} = payload
            return {...state, user_id, username, email}
        case LOGOUT:
            return {...state, user_id: 0, email:''}
        default: 
            return state
    }
}