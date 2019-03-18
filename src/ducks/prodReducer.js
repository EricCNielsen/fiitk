const initialState = {
    user_id: 0,
    category: '',
    sub_category: '',
    image_url: '',
    product_name: '',
    product_desc: ''
}

const UPDATE_PROD = 'UPDATE_PROD'

export function updateProd(prod){
    return {
        type: UPDATE_PROD,
        payload: prod
    }
}

export default function reducer(state = initialState, action){
    const {type, payload} = action

    switch(type){
        case UPDATE_PROD:
            const{user_id, category, sub_category, image_url, product_name, product_desc} = payload
            return{...state, user_id, category, sub_category, image_url, product_name, product_desc}
        default:
            return state
    }
}