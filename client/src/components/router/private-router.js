import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { authSelector } from '../../slices/auth'

const PrivateRouter = ({ ...props }) => {
    const { authenticated } = useSelector(authSelector)

    if (!authenticated) {
        return <Redirect to="/login" />
    }

    return (
        <Route {...props} />
    )
}

export default PrivateRouter