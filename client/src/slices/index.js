import { combineReducers } from "redux"
import postsReducer from './posts'
import registerReducer from './register'

const rootReducer = combineReducers({
    posts: postsReducer,
    register: registerReducer,
})

export default rootReducer