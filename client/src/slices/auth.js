import { createSlice } from "@reduxjs/toolkit"
import api from '../utils/api'

export const initialState = {
    authenticated: false,
    token: '',
    errors: [],
    user: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        authUser: (state, action) => {
            return { ...state, token: action.payload }
        },

        getUserSuccess: (state, action) => {
            return { ...state, authenticated: true, user: action.payload }
        },

        getUserError: (state, action) => {
            let { errors } = state
            errors = [...errors, ...action.payload]
            return { ...state, authenticated: false, errors }
        },

        unauthuser: () => {
            return initialState
        }
    }
})

export const { authUser, unauthuser, getUserSuccess, getUserError } = authSlice.actions

export const authSelector = (state) => state.auth

export default authSlice.reducer

export function getUser(payload) {
    return async (dispatch) => {
        try {
            dispatch(authUser(payload))
            const res = await api.get('/auth')
            if (res && res.data) {
                dispatch(getUserSuccess(res.data))
            }

        } catch (err) {
            const { response: { data: { errors } } } = err
            dispatch(getUserError(errors))
        }

    }
}

