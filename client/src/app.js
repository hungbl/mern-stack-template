import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom'

import Dashboard from './views/dashboard'
import Posts from './views/posts'
import NavBar from './components/navbar'

const App = () => {
    return (
        <Router>
            <NavBar />
            <Switch>
                <Route exact path="/" component={Dashboard} />
                <Route exact path="/posts" component={Posts} />
                <Redirect to="/" />
            </Switch>
        </Router>
    )
}

export default App