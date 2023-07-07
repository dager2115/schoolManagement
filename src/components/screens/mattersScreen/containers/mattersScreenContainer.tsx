import React, { Component } from 'react'
import { AppComponent } from '../../../layouts/AppComponent'
import MattersScreenLayout from '..'
import { IMatter } from '../../../../services/mattersService/matterService'

interface IMatterScreenState {
    matters: IMatter[]
}

class MattersScreenContainer extends Component<any, IMatterScreenState>{

    constructor(props: any) {
        super(props)

        this.state = {
            matters: []
        }
    }

    componentDidMount() {
        //@ts-ignore
        this.setState({ matters: JSON.parse(localStorage.getItem('matters')) })
    }

    render(){
        return (
            <AppComponent>
                <MattersScreenLayout matters={this.state.matters}/>
            </AppComponent>
        )
    }
}

export default MattersScreenContainer