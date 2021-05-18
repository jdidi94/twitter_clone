
import { combineReducers } from 'redux'
import errorReducer from './error-reducers'
import authReducer from './auth-reducers.js'


export default combineReducers({
	errors: errorReducer,
	auth: authReducer,

})