import React, { Component } from "react";
import { AppComponent } from "../../../layouts/AppComponent";
import TeachersScreenLayout from "..";
import { IUser } from "../../../../services/userService/userService";

interface ITeachersScreenState {
    teachers: IUser[]
}

class TeachersScreenContainer extends Component<any, ITeachersScreenState> {

    constructor(props: any) {
        super(props)

        this.state = {
            teachers: []
        }
    }

    componentDidMount() {
        //@ts-ignore
        this.setState({ teachers: JSON.parse(localStorage.getItem('teachers')) })
    }

    render() {
        return (
            <AppComponent>
                <TeachersScreenLayout teachers={this.state.teachers} />
            </AppComponent>
        )
    }
}

export default TeachersScreenContainer