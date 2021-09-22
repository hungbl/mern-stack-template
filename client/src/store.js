import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './slices'
import { setAuthToken } from './utils/api'

const store = configureStore({
    reducer: rootReducer
})

let currentState = store.getState()
store.subscribe(() => {
    const previousState = currentState
    currentState = store.getState()
    if (previousState.auth.token === currentState.auth.token) {
        return
    }

    const { auth: { token } } = currentState
    setAuthToken(token)
})

export default store