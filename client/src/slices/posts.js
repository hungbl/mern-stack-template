import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
    loading: false,
    hasErrors: false,
    posts: []
}

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        getPosts: (state) => {
            return { ...state, loading: true }
        },
        getPostsSuccess: (state, { payload }) => {
            return { ...state, posts: payload, loading: false, hasErrors: false }
        },
        getPostsFailure: (state) => {
            return { ...state, loading: false, hasErrors: true }
        },
    }
})

export const { getPosts, getPostsSuccess, getPostsFailure } = postsSlice.actions

export const postsSelector = (state) => state.posts

export default postsSlice.reducer

export function fetchPosts() {
    return async (dispatch) => {
        dispatch(getPosts())

        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts')
            const data = await response.json()

            dispatch(getPostsSuccess(data))
        } catch (error) {
            dispatch(getPostsFailure())
        }
    }
}