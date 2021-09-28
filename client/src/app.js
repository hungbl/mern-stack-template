import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Dashboard from './views/dashboard'
import Layout from './components/layout'
import PrivateRoute from './components/router/private-router'
import PublicRoute from './components/router/public-router'
import Register from './views/register'
import Login from './views/login'
import { getUser } from './slices/auth'

const App = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        if(!localStorage.token){
            return
        }

        dispatch(getUser(localStorage.token))
    }, [dispatch])
    return (
        <Router>
            <Switch>
                <PublicRoute exact path='/register' component={Register} />
                <PublicRoute exact path='/login' component={Login} />
                <Layout>
                    <Switch>
                        <PrivateRoute exact path="/" component={Dashboard} />
                    </Switch>
                </Layout>
            </Switch>
        </Router>
    )
}

export default App