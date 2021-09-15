import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchPosts, postsSelector } from '../slices/posts'
import Post from '../components/post'

const Posts = () => {
    const dispatch = useDispatch()
    const posts = useSelector(postsSelector)

    useEffect(() => {
        dispatch(fetchPosts())
    }, [dispatch])

    const renderPosts = () => {
        if (posts.loading) return <p>Loading posts...</p>
        if (posts.hasErrors) return <p>Unable to display posts.</p>
        return posts.posts.map((post) => <Post key={post.id} post={post} excerpt />)
    }

    return (
        <section>
            <h1>Posts</h1>
            {renderPosts()}
        </section>
    )
}

export default Posts
