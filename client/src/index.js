import React from 'react'
import { render } from 'react-dom'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'

import App from './app'
import rootReducer from './slices'

import 'bootstrap/dist/css/bootstrap.min.css'

const store = configureStore({
    reducer: rootReducer
})

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)
