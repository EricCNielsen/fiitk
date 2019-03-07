const initialState = {
    id: 0,
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

export default function reducer(state = initialState, action){
    const {type, payload} = action
    
    switch (type) {
        case UPDATE_USER:
            const{id, email} = payload
            return {...state, id, email}
        case LOGOUT:
            return {...state, id:0, email:''}
        default: 
            return state
    }
}