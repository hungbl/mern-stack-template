import { createSlice } from "@reduxjs/toolkit"

export const initialState = {
    loading: false,
    hasErrors: false,
    message: [],
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const registerSlice = createSlice({
    name: 'register',
    initialState,
    reducers: {
        saveUser: (state) => {
            return { ...state, loading: true }
        },

        saveUserError: (state, action) => {
            let { message } = state
            message = message.unshift(action.payload)
            return { ...state, loading: false, hasErrors: true, message }
        },

        changeUsername: (state, action) => {
            return { ...state, username: action.payload }
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
    }
})

export const { changeUsername, changeEmail, changePassword,
    changeConfirmPassword, saveUser, saveUserError } = registerSlice.actions

export const registerSelector = (state) => state

export default registerSlice.reducer

export function createUser(state) {
    return async (dispatch) => {
        dispatch(saveUser())

        const { username, email, password, confirmPassword } = state
        if (password !== confirmPassword) {
            dispatch(saveUserError())
        }

        console.log(`Create user ${username} email ${email} password ${password}`)
    }
}

