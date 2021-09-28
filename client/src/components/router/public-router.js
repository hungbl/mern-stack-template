import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { authSelector } from '../../slices/auth'

const PublicRouter = ({ ...props }) => {
    const { authenticated } = useSelector(authSelector)
    if (authenticated) {
        return <Redirect to="/" />
    }

    return (
        <Route {...props} />
    )
}

export default PublicRouter