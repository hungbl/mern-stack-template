import React from 'react'
import { useSelector } from 'react-redux'
import { authSelector } from '../slices/auth'

const Dashboard = () => {
    const { authenticated, user } = useSelector(authSelector)
    return (
        <section>
            <h1>Dashboard</h1>
            {
                authenticated && user
                    ? <p>Welcome {user.name} your email is {user.email}</p>
                    : <p>This is the dashboard.</p>
            }
        </section>
    )
}

export default Dashboard