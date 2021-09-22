import { createSlice } from "@reduxjs/toolkit"
import api from '../utils/api'
import { getUser } from './auth'

export const initialState = {
    loading: false,
    hasErrors: false,
    validated: false,
    messages: [],
    name: 'hungbl',
    email: 'abc@gmail.com',
    password: '123456',
    confirmPassword: '123456'
}

const registerSlice = createSlice({
    name: 'register',
    initialState,
    reducers: {
        saveUser: (state) => {
            return { ...state, loading: true }
        },

        saveUserError: (state, action) => {
            let { messages } = state
            messages = [...messages, ...action.payload]
            return { ...state, loading: false, hasErrors: true, messages }
        },

        changeUsername: (state, action) => {
            return { ...state, name: action.payload }
        },

        changeEmail: (state, action) => {
            return { ...state, email: action.payload }
        },

        changePassword: (state, action) => {
            return { ...state, password: action.payload }
        },

        changeConfirmPassword: (state, action) => {
            return { ...state, confirmPassword: action.payload }
        },

        validatedInput: (state) => {
            return { ...state, validated: true }
        }
    }
})

export const { changeUsername, changeEmail, changePassword,
    changeConfirmPassword, saveUser, saveUserError, validatedInput } = registerSlice.actions

export const registerSelector = (state) => state.register

export default registerSlice.reducer

export function createUser(payload) {
    return async (dispatch) => {
        dispatch(saveUser())

        try {
            const { name, email, password } = payload
            const res = await api.post('/users', { name, email, password })
            if (res && res.data && res.data.token) {
                dispatch(getUser(res.data.token))
            }

        } catch (err) {
            const { response: { data: { errors } } } = err
            dispatch(saveUserError(errors))
        }

    }
}

