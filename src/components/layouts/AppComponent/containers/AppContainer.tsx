import React, { Component } from 'react'
import AppLayout from '..'

interface IAppContainerProps {
    children: React.ReactNode
}


class AppContainer extends Component<IAppContainerProps, any> {
    render() {
        return (
            <AppLayout {...this.props} />
        )
    }
}

export default AppContainer
