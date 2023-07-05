import React, { Component } from 'react'
import HomeScreenLayout from '..'
import { AppComponent } from '../../../layouts/AppComponent'

interface IHomeScreenContainerProps {

}

interface IHomeScreenContainerState {

}

class HomeScreenContainer extends Component<IHomeScreenContainerProps, IHomeScreenContainerState> {
    render() {
        return (
            <AppComponent>
                <HomeScreenLayout />
            </AppComponent>
        )
    }
}

export default HomeScreenContainer
