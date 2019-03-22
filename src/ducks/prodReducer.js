const initialState = {
    id: 0,
    category: '',
    sub_category: '',
    image_url: '',
    product_name: '',
    product_desc: ''
}

const UPDATE_PROD = 'UPDATE_PROD'


export function updateProd({id, product_name, image_url, category, sub_category, product_desc}){
    return {
        type: UPDATE_PROD,
        payload: {
            id,
            product_name, 
            image_url, 
            category, 
            sub_category, 
            product_desc
        }
    }
}

export default function reducer(state = initialState, action){
    const {type, payload} = action
    
    switch(type){
        case UPDATE_PROD:
            const{id, category, sub_category, image_url, product_name, product_desc} = payload
            return{...state, id, category, sub_category, image_url, product_name, product_desc}
        default:
            return state
    }
}