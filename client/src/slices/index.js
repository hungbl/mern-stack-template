import { combineReducers } from "redux"
import postsReducer from './posts'
import registerReducer from './register'
import authReducer from './auth'

const rootReducer = combineReducers({
    posts: postsReducer,
    register: registerReducer,
    auth: authReducer
})

export default rootReducer