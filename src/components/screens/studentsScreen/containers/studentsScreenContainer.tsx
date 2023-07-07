import React, { Component } from "react";
import { AppComponent } from "../../../layouts/AppComponent";
import StudentsScreenLayout from "..";
import { IUser } from "../../../../services/userService/userService";

interface IStudentsScreenState {
    students: IUser[]
}

class StudentsScreenContainer extends Component<any, IStudentsScreenState> {

    constructor(props: any) {
        super(props)

        this.state = {
            students: []
        }
    }

    componentDidMount() {
        //@ts-ignore
        this.setState({ students: JSON.parse(localStorage.getItem('students')) })
    }

    render() {
        return (
            <AppComponent>
                <StudentsScreenLayout students={this.state.students} />
            </AppComponent>
        )
    }
}

export default StudentsScreenContainer