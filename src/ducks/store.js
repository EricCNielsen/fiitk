import { createStore, combineReducers } from 'redux'
import reducer from './reducer'
import prodReducer from './prodReducer'



const reducers = combineReducers({
    reducer,
    prodReducer
})
export default createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
