import React, { Component } from 'react'
import { AppComponent } from '../../../layouts/AppComponent'
import MattersScreenLayout from '..'
import MatterService, { IMatter } from '../../../../services/mattersService/matterService'
import store from '../../../../store/redux-storage'
import { updateMattersAction } from '../../../../reducers/mattersReducer/actions'

interface IMatterScreenState {
    matters: IMatter[]

}

class MattersScreenContainer extends Component<any, IMatterScreenState>{

    private matterService = new MatterService()

    constructor(props: any) {
        super(props)

        this.state = {
            matters: [],
        }
    }

    componentDidMount() {
        this.getMatters()
    }

    getMatters = () => {
        const matters = store.getState().mattersReducers.matters
        if (!matters?.length) {

            const response = this.matterService.getMatters()
            if (response.code === 200) {
                this.setState({ matters: response.matters })
                store.dispatch(updateMattersAction(response.matters))
            }
        } else {
            this.setState({ matters })
        }
    }


    render() {
        return (
            <AppComponent>
                <MattersScreenLayout matters={this.state.matters} />
            </AppComponent>
        )
    }
}

export default MattersScreenContainer