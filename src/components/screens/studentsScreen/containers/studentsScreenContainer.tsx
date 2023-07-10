import React, { Component } from "react";
import { AppComponent } from "../../../layouts/AppComponent";
import StudentsScreenLayout from "..";
import UserService, { IUser } from "../../../../services/userService/userService";

interface IStudentsScreenState {
    students: IUser[]
}

class StudentsScreenContainer extends Component<any, IStudentsScreenState> {

    private userService = new UserService()

    constructor(props: any) {
        super(props)

        this.state = {
            students: []
        }
    }

    componentDidMount() {
        this.getStudents()
    }

    getStudents = () => {
        const response = this.userService.getUsers('students')
        if (response.code === 200) {
            this.setState({ students: response.users })
        }
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