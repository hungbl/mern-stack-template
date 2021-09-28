import { combineReducers } from "redux"
import postsReducer from './posts'
import registerReducer from './register'
import loginReducer from './login'
import authReducer from './auth'

const rootReducer = combineReducers({
    posts: postsReducer,
    register: registerReducer,
    login: loginReducer,
    auth: authReducer
})

export default rootReducer