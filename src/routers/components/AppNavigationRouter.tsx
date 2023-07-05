import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { routes } from '../AppRoutes'



class AppNavigationRouter extends Component<any, any> {
    render() {
        return (
            <Router>
                <Routes>
                    {routes.map((route: any, i:number) => (
                        <Route key={i} path={route.path} {...route} />
                    ))}
                </Routes>
            </Router>
        )
    }
}

export default AppNavigationRouter
