import { createSlice } from "@reduxjs/toolkit"
import api from '../utils/api'
import { getUser } from './auth'

const initialState = {
    email: '',
    password: '',
    isLoading: false,
    hasError: false,
    validated: false,
    messages: [],
}

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        changeEmail: (state, action) => {
            return { ...state, email: action.payload }
        },
        changePassword: (state, action) => {
            return { ...state, password: action.payload }
        },
        validateInput: (state, action) => {
            return { ...state, validated: true }
        },
        startlogin: (state, action) => {
            return { ...state, isLoading: true }
        },
        loginError: (state, action) => {
            let { messages } = state
            messages = [...messages, ...action.payload]
            return { ...state, loading: false, hasErrors: true, messages }
        }
    }
})

export const { changeEmail, changePassword, validateInput, startlogin, loginError } = loginSlice.actions

export const loginSelector = (state) => state.login

export default loginSlice.reducer

export function logUserIn(payload) {
    return async (dispatch) => {
        dispatch(startlogin())

        const { email, password } = payload
        try {
            const res = await api.post('/auth', { email, password })
            if (res && res.data && res.data.token) {
                dispatch(getUser(res.data.token))
            }
        } catch (err) {
            const { response: { data: { errors } } } = err
            dispatch(loginError(errors))
        }
    }
}