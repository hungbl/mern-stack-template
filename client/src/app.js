import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Dashboard from './views/dashboard'
import Posts from './views/posts'
import NavBar from './components/navbar'
import Register from './views/register'
import { getUser } from './slices/auth'
import { setAuthToken } from './utils/api'

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
            <NavBar />
            <Switch>
                <Route exact path="/" component={Dashboard} />
                <Route exact path='/register' component={Register} />
                <Route exact path='/login' component={Dashboard} />
                <Route exact path="/posts" component={Posts} />
            </Switch>
        </Router>
    )
}

export default App